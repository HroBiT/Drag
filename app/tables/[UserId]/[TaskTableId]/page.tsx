import Forms from "@/components/forms";
import { getSession } from "@/lib/auth";
import { getSpecificTaskTable } from "@/scripts/getSpecificTaskTable";
import { redirect } from "next/navigation";
import DragDropProvider from "@/components/DragDropProvider";

interface TaskTableProps {
  params: Promise<{
    UserId: string;
    TaskTableId: string;
  }>;
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

  console.log("taskTable", taskTable);
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-8">
        <DragDropProvider>
          <div className="flex flex-row justify-center gap-x-56 my-10">
            <div className="border p-10" key={taskTable.id}>
              <h3>{taskTable.name}</h3>
              <p>{taskTable.description}</p>

              <div className="flex flex-row gap-x-10 mt-4">
                {taskTable.miniTables?.map((miniTable: any) => (
                  <div key={miniTable.id}>
                    <h4>{miniTable.name}</h4>
                    <ul>
                      {miniTable.tasks?.map((task: any) => (
                        <li
                          key={task.id}
                          className="my-4 p-4 border rounded-2xl"
                        >
                          <h5 className=" font-bold">{task.title}</h5>
                          {task.name}
                          <p className="text-sm text-slate-500">
                            {task.description}
                          </p>
                          <p className="text-xs mt-[15px] text-slate-400">
                            Created at:{" "}
                            {new Date(task.createdAt).toLocaleDateString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr className="my-6 font-bold" />
          {/* Add New Task Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">
                Dodaj nowe zadanie
              </h2>
            </div>
            <Forms TableId={Number(resolvedParams.TaskTableId)} />
          </div>
        </DragDropProvider>
      </div>
    </main>
  );
}
