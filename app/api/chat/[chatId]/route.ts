import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: { chatId: string } }) {
    try {
        const chatId = params.chatId
        const session = await auth(); // Get logged-in user
        if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const userId = session.user.id;
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const chat = await prisma.chat.findFirst({
            where: {
                id: chatId,
                OR: [
                    { user1Id: userId },
                    { user2Id: userId }
                ]
            },
            include: {
                user1: {
                    select: {
                        id:true,
                        image: true,
                        name: true
                    }
                },
                user2: {
                    select: {
                        id:true,
                        image: true,
                        name: true
                    }
                },
                messages: {
                    include: {
                        sender: true
                    }
                }
            }
        });

        if (!chat) {
            throw new Error("Chat not found or you are not a participant");
        }

        // Determine the other user and rename the field to 'user'
        const result = {
            id: chat.id,
            user: chat.user1Id === userId ? chat.user2 : chat.user1,
            messages: chat.messages  // Select the other user
        };


        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}