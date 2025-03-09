
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 10;
        const posts = await prisma.post.findMany({
            take: limit,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                        password: false
                    }
                },
            }
        });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json([]);
    }
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
