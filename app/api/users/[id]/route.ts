import prisma  from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const id = ""
  const user = await prisma.user.findUnique({ where: { id: id } });
  return user ? NextResponse.json(user) : NextResponse.json({ error: "User not found" }, { status: 404 });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const id = ""
  const updatedUser = await prisma.user.update({ where: { id: id }, data: body });
  return NextResponse.json(updatedUser);
}

export async function DELETE(req: Request) {
  const id = ""
  await prisma.user.delete({ where: { id: id } });
  return NextResponse.json({ message: "User deleted" });
}
