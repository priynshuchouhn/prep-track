import prisma from "@/lib/prisma";
import axios from "axios";
import { Server } from "socket.io";
import { WS_BASE_URL } from "./utils";

export async function sendMessage(chatId: string, senderId: string, receiverId: string, content: string) {
  try {
    // Save message in the database
    const message = await prisma.message.create({
      data: {
        chatId,
        senderId,
        content,
      },
      include: {
        sender: {
          select: {
            id: true,
            image: true,
            name: true
          }
        }
      }
    });

    try {
      await axios.post(`${WS_BASE_URL}/send-message`, {
        senderId,
        receiverId,
        message
      });

      console.log("📩 Message sent to WebSocket server.");
    } catch (err) {
      console.error("⚠️ Failed to send message to WebSocket server:", err);
    }

    return message;
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
