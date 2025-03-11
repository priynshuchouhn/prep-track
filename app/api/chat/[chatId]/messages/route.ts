import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { sendMessage } from "@/lib/message";
import { revalidatePath } from "next/cache";

// ✅ Get all messages in a chat
export async function GET(req: Request, { params }: { params: Promise<{ chatId: string }>}) {
    try {
        const {chatId} = await params
        const session = await auth(); // Get logged-in user
        if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const userId = session.user.id;
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const messages = await prisma.message.findMany({
            where: { chatId: chatId },
            orderBy: { createdAt: "asc" }
        });
        revalidatePath('/chat/[chatId]', 'page');
        return NextResponse.json(messages, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ Send a message
export async function POST(req: Request, { params }: { params: Promise<{ chatId: string }>}) {
    try {
        const session = await auth(); // Get logged-in user
        const {chatId} = await params;
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
        await sendMessage(chatId, userId, receiverId, content);
    
        revalidatePath('/chat/[chatId]', 'page');
        return NextResponse.json({ status: 201 });

    } catch (error) {
        console.log("[Send Message]"+error);
        return NextResponse.json({ error: "Internal Server Error", data: error }, { status: 500 });
    }
}
