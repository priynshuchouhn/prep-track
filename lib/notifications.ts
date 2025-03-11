import  prisma  from "@/lib/prisma";
import { NotificationType } from "@prisma/client";
import axios from "axios";
import { Server } from "socket.io";
import { WS_BASE_URL } from "./utils";

export async function sendNotification(userId: string, message: string, type: NotificationType) {
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

    try {
      await axios.post(`${WS_BASE_URL}/send-notification`, {
        userId,
        notification
      });

      console.log("📢 Notification sent to WebSocket server.");
    } catch (err) {
      console.error("⚠️ Failed to send notification to WebSocket server:", err);
    }

    return notification;

  } catch (error) {
    console.error("Error sending notification:", error);
  }
}
