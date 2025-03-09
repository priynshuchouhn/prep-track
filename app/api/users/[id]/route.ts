import prisma  from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return user ? NextResponse.json(user) : NextResponse.json({ error: "User not found" }, { status: 404 });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const updatedUser = await prisma.user.update({ where: { id: params.id }, data: body });
  return NextResponse.json(updatedUser);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "User deleted" });
}
