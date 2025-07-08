//robienie nowego taska do danje tabeli danego uzytkownika

import prisma from "@/lib/prisma";

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

    return newTask;
  } catch (error) {
    console.error("Error creating new task:", error);
    throw error;
  }
};
export { createNewTask };
