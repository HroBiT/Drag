import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GetTasks = async (currentUserId: string, ):Promise<any[]> => {
const taskData = await prisma.taskTable.findMany({
  where: {
    userId: Number(currentUserId), // np. z sesji
  },
  include: {
    miniTables: {
      include: {
        tasks: {
          orderBy: { updatedAt: 'desc' }
        }
      }
    }
  }
})
    return taskData;
}