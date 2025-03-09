import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'

export async function POST() {
    try {
      const session = await auth();
      if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      await prisma.notification.updateMany({
        where: { userId: session.user.id },
        data: { read: true },
      });
  
      return NextResponse.json({ message: "Notifications marked as read" });
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      return NextResponse.json({ error: "Failed to update notifications" }, { status: 500 });
    }
  }
  