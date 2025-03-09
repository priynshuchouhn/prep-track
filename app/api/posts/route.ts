
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const posts = await prisma.post.findMany({
        include: {
            user: {
                select: {
                    name:true,
                    email:true,
                    image:true,
                    password: false
                }
            },
        }
    });
    return NextResponse.json(posts);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session && session!.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { content, tags } = await req.json();

    const newPost = await prisma.post.create({
        data: {
            content,
            tags,
            userId: session!.user!.id!,
        },
    });

    return NextResponse.json(newPost, { status: 201 });
}
