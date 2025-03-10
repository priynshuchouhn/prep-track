import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// ✅ Create or get a chat between two users
export async function POST(req: Request) {
    try {
        const session = await auth(); // Get logged-in user
        if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const userId = session.user.id;
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { receiverId } = await req.json();
        if (!receiverId) return NextResponse.json({ error: "Receiver ID required" }, { status: 400 });

        // Check if chat already exists
        let chat = await prisma.chat.findFirst({
            where: {
                OR: [
                    { user1Id: userId, user2Id: receiverId },
                    { user1Id: receiverId, user2Id: userId }
                ]
            }
        });

        // If chat doesn't exist, create it
        if (!chat) {
            chat = await prisma.chat.create({
                data: {
                    user1Id: userId,
                    user2Id: receiverId
                }
            });
        }

        return NextResponse.json(chat, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ Get all chats of logged-in user
export async function GET() {
    try {
        const session = await auth(); // Get logged-in user
        if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const userId = session.user.id;
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const chats = await prisma.chat.findMany({
            where: {
                OR: [{ user1Id: userId }, { user2Id: userId }]
            },
            include: {
                user1: { select: { id: true, name: true, image: true } },
                user2: { select: { id: true, name: true, image:true } },
            }
        });
        revalidatePath('/chat', 'page');
        return NextResponse.json(chats, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

