import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";

const getUserTablesFromDb = unstable_cache(
  async (userId: number) => {
    try {
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

      return userMainTables?.taskTables || [];
    } catch (error) {
      console.error("Error fetching user tables from db:", error);
      return [];
    }
  },
  ["user-tables-db"],
  {
    revalidate: 300,
    tags: ["user-tables"],
  }
);

const getUserTables = async (userId: number) => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
      return [];
    }

    return await getUserTablesFromDb(userId);
  } catch (error) {
    console.error("Error fetching user tables:", error);
    return [];
  }
};

export { getUserTables };
