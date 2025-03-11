import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import { auth } from "@/auth";
import { sendNotification } from "@/lib/notifications";


export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await req.json();
    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const userId = session.user.id;

    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { userId: true }, // Get post owner
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if the user has already liked the post
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (existingLike) {
      // Unlike the post
      await prisma.like.delete({
        where: { id: existingLike.id },
      });

      return NextResponse.json({ message: "Post unliked", liked: false });
    }

    // Like the post
    await prisma.like.create({
      data: { userId, postId },
    });

    await sendNotification(post.userId, `${session.user.name} liked your post.`, "LIKE",);

    return NextResponse.json({ message: "Post liked", liked: true });
  } catch (error) {
    console.error("Error liking/unliking post:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
