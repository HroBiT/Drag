import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

const getUserTables = async (userId: number) => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
      return [];
    }

    const userMainTables = await prisma.user.findUnique({
      where: { id: userId },
      select: {
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
                  where: {
                    NOT: {
                      miniTableId: null,
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
                },
              },
            },
          },
          orderBy: {
            updatedAt: "desc",
          },
        },
      },
    });

    if (!userMainTables) {
      return [];
    }

    // Fixed: Always return the taskTables
    return userMainTables.taskTables;
  } catch (error) {
    console.error("Error fetching user tables:", error);
    return [];
  }
};

export { getUserTables };
