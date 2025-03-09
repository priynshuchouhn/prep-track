import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany(
    {
        where: {
            role: 'STUDENT'
        },
        orderBy:{
            createdAt:"desc"
        },omit:{
            password:true
        }
    }
  );
  return NextResponse.json(users);
}
