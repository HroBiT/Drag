import { PrismaClient } from "@prisma/client";
import { cookies } from 'next/headers'

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


const GetTaskTable = async (currentUserId: string, taskTableId: string): Promise<any> => {
  const taskTable = await prisma.taskTable.findUnique({
    where: {
      id: Number(taskTableId),
      userId: Number(currentUserId)
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
  });

  return taskTable;
}

//const userId:number


const getCurrentUser = async(userId:number, email:string): Promise<any> => {
  try {
    const cookieStore = await cookies()


    // Dekoduj token (format: userId:email:timestamp)
    
    if (!userId || !email) {
      return null
    }

    // Pobierz użytkownika z bazy
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        taskTables: {
          include:{
            miniTables: {
              include: {
                tasks: {
                  orderBy: { updatedAt: 'desc' }
                }
              }
            }
          }
        }
      }
    })

    console.log('Current user:', user)
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export { GetTasks, GetTaskTable, getCurrentUser };