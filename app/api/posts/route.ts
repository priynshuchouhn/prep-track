
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
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
        revalidatePath('/', 'page');
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

    let slug = slugify(content.split(" ").slice(0, 5).join(" "));

    // Ensure the slug is unique
    let existingPost = await prisma.post.findUnique({ where: { slug } });
    let count = 1;
    while (existingPost) {
        slug = slugify(content.split(" ").slice(0, 5).join(" ")) + `-${count}`;
        existingPost = await prisma.post.findUnique({ where: { slug } });
        count++;
    }

    const now = new Date();

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { Streak: true, Leaderboard: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Fetch existing tags from the database
        const existingTags = await prisma.tag.findMany({
            where: { name: { in: tags } }, // Fetch only the tags that the user provided
        });
        
        const lastPostedAt = user.lastPostedAt ? new Date(user.lastPostedAt) : null;
        let currentStreak = user.Streak?.currentStreak || 0;
        let longestStreak = user.Streak?.longestStreak || 0;
        let postCount = user.Leaderboard?.postCount || 0;
        const leaderboardId = user.Leaderboard?.id;

        if (lastPostedAt) {
            const lastPostedDate = new Date(lastPostedAt.getFullYear(), lastPostedAt.getMonth(), lastPostedAt.getDate());
            const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const diffInDays = Math.floor((nowDate.getTime() - lastPostedDate.getTime()) / (1000 * 60 * 60 * 24));

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

        const newPost = await prisma.$transaction(async (tx) => {
            // Create post
            const post = await tx.post.create({
                data: {
                    content,
                    slug,
                    userId,
                },
            });

            // Link post with existing tags
            await tx.postTag.createMany({
                data: existingTags.map((tag) => ({
                    postId: post.id,
                    tagId: tag.id,
                })),
            });

            // Update user last posted date
            await tx.user.update({
                where: { id: userId },
                data: { lastPostedAt: now },
            });

            // Update streak
            await tx.streak.upsert({
                where: { userId },
                update: { currentStreak, longestStreak, lastUpdated: now },
                create: { userId, currentStreak, longestStreak, lastUpdated: now },
            });

            // Update or create leaderboard entry
            if (leaderboardId) {
                await tx.leaderboard.update({
                    where: { id: leaderboardId },
                    data: { postCount, streak: currentStreak },
                });
            } else {
                await tx.leaderboard.create({
                    data: { userId, rank: 0, score: 0, postCount, streak: currentStreak },
                });
            }

            return post;
        });

        revalidatePath('/', 'page');
        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}



