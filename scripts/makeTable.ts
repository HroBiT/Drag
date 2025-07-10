import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function makeTable(
  userId: number,
  tableName: string,
  description: string
) {
  const session = await getSession();
  console.log("session", session);

  if (!session) {
    throw new Error("User not authenticated");
  }

  try {
    const newTable = await prisma.taskTable.create({
      data: {
        name: tableName,
        description: description,
        userId: userId,
      },
    });

    return newTable;
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
}
