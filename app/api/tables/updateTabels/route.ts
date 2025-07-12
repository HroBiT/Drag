import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request) {
  try {
    const { taskId, miniTableId } = await request.json();

    const updatedTask = await prisma.task.update({
      where: { id: Number(taskId) },
      data: {
        miniTableId: miniTableId ? Number(miniTableId) : null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Failed to update task state:", error);
    return new NextResponse("Error updating task", { status: 500 });
  }
}
