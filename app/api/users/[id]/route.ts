import prisma  from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const id = ""
  const user = await prisma.user.findUnique({ where: { id: id } });
  return user ? NextResponse.json(user) : NextResponse.json({ error: "User not found" }, { status: 404 });
}

