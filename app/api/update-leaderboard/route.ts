import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            include: {
                posts: { select: { id: true } },
                Like: { select: { id: true } },
                Comment: { select: { id: true } },
                Streak: { select: { currentStreak: true } },
            },
        });

        const leaderboardUpdates = users.map(user => {
            const postCount = user.posts.length;
            const likeCount = user.Like.length;
            const commentCount = user.Comment.length;
            const currentStreak = user.Streak?.currentStreak || 0;

            const newScore = (postCount * 10) + (likeCount * 2) + (commentCount * 3) + (currentStreak * 5);

            return {
                userId: user.id,
                score: newScore,
                postCount,
                streak: currentStreak,
            };
        });

        leaderboardUpdates.sort((a, b) => b.score - a.score);
        let rank = 1;
        
        for (const entry of leaderboardUpdates) {
            const existingEntry = await prisma.leaderboard.findUnique({
                where: { userId: entry.userId },
            });
            
            if (existingEntry) {
                await prisma.leaderboard.update({
                    where: { userId: entry.userId },
                    data: {
                        score: entry.score,
                        rank,
                        postCount: entry.postCount,
                        streak: entry.streak,
                    },
                });
            } 
            else {
                await prisma.leaderboard.create({
                    data: {
                        userId: entry.userId,
                        score: entry.score,
                        rank,
                        postCount: entry.postCount,
                        streak: entry.streak,
                    },
                });
            }
            
            rank++;
        }
        return NextResponse.json({ message: "Leaderboard updated successfully!" });
    } catch (error) {
        console.error("Error updating leaderboard:", error);
        return NextResponse.json({ error: "Failed to update leaderboard" }, { status: 500 });
    }
}
