import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin",
      password: "Admin123", // Plaintext password as requested
    },
  });

  // Create a TaskTable for the admin user
  const taskTable = await prisma.taskTable.create({
    data: {
      name: "Admin's Tasks",
      description: "Task table for Admin",
      userId: admin.id,
    },
  });

  // Create MiniTables
  const miniTableNames = ["To Do", "In Progress", "Done"];
  const miniTables = [];
  for (const name of miniTableNames) {
    const miniTable = await prisma.miniTable.create({
      data: {
        name,
        taskTableId: taskTable.id,
      },
    });
    miniTables.push(miniTable);
  }

  // Create Tasks for each MiniTable
  for (const miniTable of miniTables) {
    for (let i = 1; i <= 2; i++) {
      await prisma.task.create({
        data: {
          title: `${miniTable.name} Task ${i}`,
          description: `Description for ${miniTable.name} Task ${i}`,
          taskTableId: taskTable.id,
          miniTableId: miniTable.id,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
