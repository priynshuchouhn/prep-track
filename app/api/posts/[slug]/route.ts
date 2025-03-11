import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest, {params}: {params: Promise<{slug:string}>}) {
    try {
        const {slug} = await params
        const post = await prisma.post.findUnique({
            where: {
                slug
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
                likes:true,
                comments: true
            }
        });
        revalidatePath('/posts/[slug]', 'page');
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json([]);
    }
}