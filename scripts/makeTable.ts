import { getSession } from "@/lib/auth";

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
    const prisma = require("@prisma/client").PrismaClient;
    const prismaClient = new prisma();

    const newTable = await prismaClient.taskTable.create({
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
