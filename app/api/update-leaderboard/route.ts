import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            include: {
                posts: { select: { id: true } },
                likes: { select: { id: true } },
                comments: { select: { id: true } },
                streak: { select: { currentStreak: true, longestStreak:true, lastUpdated: true } },
            },
        });



        const now = new Date();
        const leaderboardUpdates = await Promise.all(users.map(async (user) => {
            const postCount = user.posts.length;
            const likeCount = user.likes.length;
            const commentCount = user.comments.length;
            const lastPostedAt = user.lastPostedAt ? new Date(user.lastPostedAt) : null;
            let currentStreak = user.streak?.currentStreak || 0;
            let longestStreak = user.streak?.longestStreak || 0;


            if (lastPostedAt) {
                const lastPostedDate = new Date(lastPostedAt.getFullYear(), lastPostedAt.getMonth(), lastPostedAt.getDate());
                const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                const diffInDays = Math.floor((nowDate.getTime() - lastPostedDate.getTime()) / (1000 * 60 * 60 * 24));

                if (diffInDays === 1) {
                    currentStreak += 1; // Continue the streak
                    longestStreak = Math.max(longestStreak, currentStreak);
                } else if (diffInDays > 1) {
                    currentStreak = 0; // Reset streak
                }
            }

            await prisma.streak.upsert({
                where: { userId: user.id },
                update: { currentStreak, longestStreak, lastUpdated: now },
                create: { userId: user.id, currentStreak, longestStreak, lastUpdated: now },
            });


            const newScore = (postCount * 10) + (likeCount * 2) + (commentCount * 3) + (currentStreak * 5);

            return {
                userId: user.id,
                score: newScore,
                postCount,
                streak: currentStreak,
            };
        }));

        leaderboardUpdates.sort((a, b) => b.score - a.score);
        let rank = 1;

        for (const entry of leaderboardUpdates) {
            // const existingEntry = await prisma.leaderboard.findUnique({
            //     where: { userId: entry.userId },
            // });

            // if (existingEntry) {
            //     await prisma.leaderboard.update({
            //         where: { userId: entry.userId },
            //         data: {
            //             score: entry.score,
            //             rank,
            //             postCount: entry.postCount,
            //             streak: entry.streak,
            //         },
            //     });
            // }
            // else {
            //     await prisma.leaderboard.create({
            //         data: {
            //             userId: entry.userId,
            //             score: entry.score,
            //             rank,
            //             postCount: entry.postCount,
            //             streak: entry.streak,
            //         },
            //     });
            // }

            // rank++;

            await prisma.leaderboard.upsert({
                where: { userId: entry.userId },
                update: {
                    score: entry.score,
                    rank,
                    postCount: entry.postCount,
                    streak: entry.streak,
                },
                create: {
                    userId: entry.userId,
                    score: entry.score,
                    rank,
                    postCount: entry.postCount,
                    streak: entry.streak,
                },
            });
            rank++;
        }
        return NextResponse.json({ message: "Leaderboard updated successfully!" });
    } catch (error) {
        console.error("Error updating leaderboard:", error);
        return NextResponse.json({ error: "Failed to update leaderboard" }, { status: 500 });
    }
}
