import { NextResponse } from "next/server";
import { assignments } from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  let result = assignments;
  if (status) result = result.filter(a => a.status === status);

  return NextResponse.json({
    success: true,
    message: "Assignments retrieved successfully",
    data: result,
    total: result.length
  });
}

export async function POST(req) {
  const body = await req.json();
  const { title, description, dueDate, status } = body;

  if (!title || !dueDate) {
    return NextResponse.json(
      { success: false, message: "Validation error", errors: { ...(!title && { title: "Title is required" }), ...(!dueDate && { dueDate: "Due date is required" }) } },
      { status: 400 }
    );
  }

  const validStatuses = ["Create", "On Process", "Submitted"];
  if (status && !validStatuses.includes(status)) {
    return NextResponse.json(
      { success: false, message: `Status must be one of: ${validStatuses.join(", ")}` },
      { status: 400 }
    );
  }

  const newAssignment = {
    id: assignments.length + 1,
    title,
    description: description || null,
    status: status || "Create",
    assignmentDate: new Date().toISOString(),
    dueDate,
  };

  assignments.push(newAssignment);

  return NextResponse.json({
    success: true,
    message: "Assignment created successfully",
    data: newAssignment
  }, { status: 201 });
}