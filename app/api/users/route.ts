/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Get all users
 *      responses:
 *          200:
 *              description: List of users
 */

import { NextResponse } from "next/server";
import { users } from "@/lib/data";

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newUser = {
    id: Date.now(),
    ...body,
  };

  users.push(newUser);

  return NextResponse.json(newUser, { status: 201 });
}