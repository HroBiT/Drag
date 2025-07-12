import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";

const getUnTakenTasksUncached = async (taskTableId: number) => {
  try {
    if (!taskTableId || isNaN(taskTableId)) {
      console.error("Invalid taskTableId provided:", taskTableId);
      return [];
    }

    const unassignedTasks = await prisma.task.findMany({
      where: {
        taskTableId: taskTableId,
        State: false,
      },
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
        createdAt: true,
        updatedAt: true,
        taskTableId: true,
        miniTableId: true,
        State: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return unassignedTasks;
  } catch (error) {
    console.error("Error getting unassigned tasks:", error);
    throw error;
  }
};

// Cache the unassigned tasks
const getUnTakenTasks = unstable_cache(
  getUnTakenTasksUncached,
  ["untaken-tasks"],
  {
    revalidate: 60, // 1 minute
    tags: ["tasks"],
  }
);

const GetTasks = async (currentUserId: string): Promise<any[]> => {
  const taskData = await prisma.taskTable.findMany({
    where: {
      userId: Number(currentUserId),
    },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
      miniTables: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          taskTableId: true,
          tasks: {
            select: {
              id: true,
              title: true,
              description: true,
              completed: true,
              createdAt: true,
              updatedAt: true,
              taskTableId: true,
              miniTableId: true,
              State: true,
            },
            orderBy: { updatedAt: "desc" },
          },
        },
      },
    },
  });
  return taskData;
};

const GetTaskTable = async (
  currentUserId: string,
  taskTableId: string
): Promise<any> => {
  const taskTable = await prisma.taskTable.findUnique({
    where: {
      id: Number(taskTableId),
      userId: Number(currentUserId),
    },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
      miniTables: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          taskTableId: true,
          tasks: {
            select: {
              id: true,
              title: true,
              description: true,
              completed: true,
              createdAt: true,
              updatedAt: true,
              taskTableId: true,
              miniTableId: true,
              State: true,
            },
            orderBy: { updatedAt: "desc" },
          },
        },
      },
    },
  });

  return taskTable;
};

const getCurrentUser = async (userId: number, email: string): Promise<any> => {
  try {
    const cookieStore = await cookies();

    if (!userId || !email) {
      return null;
    }

    // Pobierz użytkownika z bazy z optymalizowanym select
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        taskTables: {
          select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            miniTables: {
              select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
                taskTableId: true,
                tasks: {
                  select: {
                    id: true,
                    title: true,
                    description: true,
                    completed: true,
                    createdAt: true,
                    updatedAt: true,
                    taskTableId: true,
                    miniTableId: true,
                    State: true,
                  },
                  orderBy: { updatedAt: "desc" },
                },
              },
            },
          },
        },
      },
    });

    console.log("Current user:", user);
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

//update stanu tasku itd
const updateTaskState = async (taskId: number, miniTableId: number | null) => {
  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        miniTableId: miniTableId,
        updatedAt: new Date(),
      },
    });
    return updatedTask;
  } catch (error) {
    console.error("Error updating task state:", error);
    throw error;
  }
};

export {
  GetTasks,
  GetTaskTable,
  getCurrentUser,
  getUnTakenTasks,
  updateTaskState,
};
