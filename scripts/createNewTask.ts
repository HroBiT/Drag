//robienie nowego taska do danej tabeli danego uzytkownika

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

const createNewTask = async (
  taskTableId: number,
  taskTitle: string,
  taskDescription: string
) => {
  try {
    const newTask = await prisma.task.create({
      data: {
        title: taskTitle,
        description: taskDescription,
        taskTableId: taskTableId,
        miniTableId: undefined,
      },
    });

    // Invalidate cache tags when a new task is created
    revalidateTag("tasks");
    revalidateTag("untaken-tasks");
    revalidateTag("task-table");
    revalidateTag("user-tables");

    return newTask;
  } catch (error) {
    console.error("Error creating new task:", error);
    throw error;
  }
};
export { createNewTask };
