import prisma from "@/lib/prisma";
import { Server } from "socket.io";

export async function sendMessage(io: Server, chatId: string, senderId: string, receiverId: string, content: string) {
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

    // Check if receiver is online
    const receiverSocket = io.sockets.adapter.rooms.get(receiverId);
    console.log("RecieverSocket" + receiverSocket?.size);
    if (receiverSocket && receiverSocket.size > 0) {
      io.to(receiverId).emit("newMessage", message);
    }
    io.to(senderId).emit("newMessage", message);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
