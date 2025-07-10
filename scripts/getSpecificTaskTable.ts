import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getSpecificTaskTableUncached = async (
  userId: number,
  taskTableId: number
) => {
  try {
    const taskTable = await prisma.taskTable.findFirst({
      where: {
        id: taskTableId,
        userId: userId,
      },
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
              where: {
                miniTableId: {
                  not: null,
                },
              },
              select: {
                id: true,
                title: true,
                description: true,
                completed: true,
                createdAt: true,
                updatedAt: true,
                miniTableId: true,
              },
              orderBy: {
                updatedAt: "desc",
              },
            },
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    return taskTable;
  } catch (error) {
    console.error("Error fetching specific task table:", error);
    return null;
  }
};

export const getSpecificTaskTable = unstable_cache(
  getSpecificTaskTableUncached,
  ["specific-task-table"],
  {
    revalidate: 120,
    tags: ["task-table"],
  }
);
