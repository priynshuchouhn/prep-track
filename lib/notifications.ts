import  prisma  from "@/lib/prisma";
import { NotificationType } from "@prisma/client";
import { Server } from "socket.io";

export async function sendNotification(io: Server, userId: string, message: string, type: NotificationType) {
  try {
    // Save notification in the database
    const notification = await prisma.notification.create({
      data: {
        userId,
        message,
        type,
        read: false, // Mark as unread by default
      },
    });

    // Check if the user is connected
    const userSocket = io.sockets.adapter.rooms.get(userId); // Get active user connection
    if (userSocket && userSocket.size > 0) {
      io.to(userId).emit("newNotification", notification);
    }

  } catch (error) {
    console.error("Error sending notification:", error);
  }
}
