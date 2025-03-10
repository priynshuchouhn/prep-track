import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { sendMessage } from "@/lib/message";
import { getIO } from "@/lib/websocket";

// ✅ Get all messages in a chat
export async function GET(req: Request, { params }: { params: { chatId: string } }) {
    try {
        const chatId = params.chatId
        const session = await auth(); // Get logged-in user
        if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const userId = session.user.id;
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const messages = await prisma.message.findMany({
            where: { chatId: chatId },
            orderBy: { createdAt: "asc" }
        });

        return NextResponse.json(messages, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ Send a message
export async function POST(req: Request, { params }: { params: { chatId: string } }) {
    try {
        const session = await auth(); // Get logged-in user
        const chatId = params.chatId;
        if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const userId = session.user.id;
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { content } = await req.json();
        if (!content) return NextResponse.json({ error: "Message content required" }, { status: 400 });
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId
            }
        })
        if(!chat) return NextResponse.json({ error: "Chat not found" }, { status: 400 });
        const receiverId = chat?.user1Id ==  userId ? chat?.user2Id : chat?.user1Id
        const io = getIO();
        if (io) {
            await sendMessage(io, chatId, userId, receiverId, content);
        } else {
            // Save in database only if WebSocket is not available
            const message = await prisma.message.create({
                data: {
                    content,
                    senderId: userId,
                    chatId: chatId
                }
            });
        }


        return NextResponse.json({ status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
