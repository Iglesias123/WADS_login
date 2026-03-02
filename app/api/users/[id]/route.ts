import { NextResponse } from "next/server";
import { users } from "@/lib/data";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = users.find((u) => u.id === Number(params.id));

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const index = users.findIndex((u) => u.id === Number(params.id));

  if (index === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  users[index] = {
    ...users[index],
    ...body,
  };

  return NextResponse.json(users[index]);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const index = users.findIndex((u) => u.id === Number(params.id));

  if (index === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const deleted = users.splice(index, 1);

  return NextResponse.json(deleted[0]);
}