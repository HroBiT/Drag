import Forms from "@/components/forms";
import { getSession } from "@/lib/auth";
import { getSpecificTaskTable } from "@/scripts/getSpecificTaskTable";
import { getUnTakenTasks } from "@/scripts/PrismasScripts";
import { redirect } from "next/navigation";
import TaskBoardClient from "@/components/TaskBoardClient";

interface TaskTableProps {
  params: {
    UserId: string;
    TaskTableId: string;
  };
}

export default async function TaskTable({ params }: TaskTableProps) {
  const session = await getSession();
  console.log("session", session);

  const resolvedParams = await params;
  console.log("params:", resolvedParams);
  console.log(
    "params.TaskTableId:",
    resolvedParams.TaskTableId,
    "Type:",
    typeof resolvedParams.TaskTableId
  );

  if (!session) {
    redirect("/login");
  }

  const taskTable = await getSpecificTaskTable(
    session.userId,
    Number(resolvedParams.TaskTableId)
  );

  if (!taskTable) {
    console.error("Failed to fetch task table or table not found");
    return <div>Error loading table or table not found</div>;
  }

  const unassignedTasks = await getUnTakenTasks(
    Number(resolvedParams.TaskTableId)
  );

  console.log("taskTable", taskTable);
  console.log("unassignedTasks", unassignedTasks);
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-8">
        {/* Task Board with Drag & Drop */}
        <TaskBoardClient
          taskTable={taskTable}
          unassignedTasks={unassignedTasks}
        />

        <hr className="my-8 border-gray-300" />

        {/* Add New Task Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800">
              Create new task
            </h2>
          </div>
          <Forms TableId={Number(resolvedParams.TaskTableId)} />
        </div>
      </div>
    </main>
  );
}
