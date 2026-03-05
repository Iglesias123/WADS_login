import { NextResponse } from "next/server";
import { assignments } from "@/lib/data";

export async function GET(req, { params }) {
  const assignment = assignments.find(a => a.id === Number(params.id));

  if (!assignment) {
    return NextResponse.json(
      { success: false, message: "Assignment not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Assignment retrieved successfully",
    data: assignment
  });
}

export async function PUT(req, { params }) {
  const index = assignments.findIndex(a => a.id === Number(params.id));

  if (index === -1) {
    return NextResponse.json(
      { success: false, message: "Assignment not found" },
      { status: 404 }
    );
  }

  const body = await req.json();
  const { title, description, dueDate, status } = body;

  const validStatuses = ["Create", "On Process", "Submitted"];
  if (status && !validStatuses.includes(status)) {
    return NextResponse.json(
      { success: false, message: `Status must be one of: ${validStatuses.join(", ")}` },
      { status: 400 }
    );
  }

  assignments[index] = {
    ...assignments[index],
    ...(title && { title }),
    ...(description !== undefined && { description }),
    ...(dueDate && { dueDate }),
    ...(status && { status }),
    updatedAt: new Date().toISOString()
  };

  return NextResponse.json({
    success: true,
    message: "Assignment updated successfully",
    data: assignments[index]
  });
}

export async function DELETE(req, { params }) {
  const index = assignments.findIndex(a => a.id === Number(params.id));

  if (index === -1) {
    return NextResponse.json(
      { success: false, message: "Assignment not found" },
      { status: 404 }
    );
  }

  const deleted = assignments.splice(index, 1);

  return NextResponse.json({
    success: true,
    message: "Assignment deleted successfully",
    data: deleted[0]
  });
}