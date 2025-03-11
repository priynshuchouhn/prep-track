import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { sendNotification } from "@/lib/notifications";


export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { postId, content } = await req.json();

        if (!postId || !content) {
            return NextResponse.json({ error: "Post ID and content are required" }, { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: { userId: true }, // Get post owner
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                postId,
                userId: session.user.id,
            },
        });

        if (post.userId !== session.user.id) {
            await sendNotification(post.userId, `${session.user.name} commented on your post.`, "COMMENT",);
        }

        return NextResponse.json(comment, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
