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

    // Create notification for the post owner (if not the same user)
    // if (post.userId !== userId) {
    //   await prisma.notification.create({
    //     data: {
    //       userId: post.userId, // Notify post owner
    //       type: "LIKE",
    //       message: `${session.user.name} liked your post.`,
    //     },
    //   });

    // }

    if (post.userId !== userId) {
        // Fetch WebSocket instance
        const io = (global as any).io;
        if (io) {
          console.log("here");
          await sendNotification(io, post.userId, `${session.user.name} liked your post.`, "LIKE",);
        } else {
          // Save in database only if WebSocket is not available
          await prisma.notification.create({
            data: { userId: post.userId, message: `${session.user.name} liked your post.`,type: "LIKE", read: false },
          });
        }
      }

    return NextResponse.json({ message: "Post liked", liked: true });
  } catch (error) {
    console.error("Error liking/unliking post:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
