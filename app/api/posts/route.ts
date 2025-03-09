
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 10;
        const posts = await prisma.post.findMany({
            take: limit,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                        password: false
                    }
                },
                Like:true,
                Comment: true
            }
        });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json([]);
    }
}




export async function POST(req: Request) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content, tags } = await req.json();
    const userId = session.user.id;

    const now = new Date();

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { Streak: true, Leaderboard: true }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const lastPostedAt = user.lastPostedAt ? new Date(user.lastPostedAt) : null;
        let currentStreak = user.Streak?.currentStreak || 0;
        let longestStreak = user.Streak?.longestStreak || 0;
        let postCount = user.Leaderboard?.postCount || 0;
        const leaderboardId =  user.Leaderboard?.id;

        // Streak logic
        if (lastPostedAt) {
            const diffInDays = Math.floor((now.getTime() - lastPostedAt.getTime()) / (1000 * 60 * 60 * 24));
            if (diffInDays === 1) {
                currentStreak += 1; // Continue the streak
                longestStreak = Math.max(longestStreak, currentStreak);
            } else if (diffInDays > 1) {
                currentStreak = 1; // Reset streak
            }
        } else {
            currentStreak = 1; // First post
        }

        postCount += 1; // Increment total post count

        // Use transaction to ensure atomic updates
        const [newPost] = await prisma.$transaction([
            prisma.post.create({
                data: {
                    content,
                    tags,
                    userId,
                },
            }),
            prisma.user.update({
                where: { id: userId },
                data: { lastPostedAt: now },
            }),
            prisma.streak.upsert({
                where: { userId },
                update: { currentStreak, longestStreak, lastUpdated: now },
                create: { userId, currentStreak, longestStreak, lastUpdated: now },
            }),
            leaderboardId
                ? prisma.leaderboard.update({
                    where: { id: leaderboardId },
                    data: { postCount, streak: currentStreak },
                })
                : prisma.leaderboard.create({
                    data: { userId, rank: 0, score: 0, postCount, streak: currentStreak },
                }),
        ]);

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


