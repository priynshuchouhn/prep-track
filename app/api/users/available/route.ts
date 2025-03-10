import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth()
    const users = await prisma.user.findMany(
        {
            where: {
                id: { not: session?.user.id },
                role: 'STUDENT'
            },
            orderBy: {
                createdAt: "desc"
            },
            select:{
                id: true,
                name:true,
                image:true
            }
        }
    );
    return NextResponse.json(users);
}
