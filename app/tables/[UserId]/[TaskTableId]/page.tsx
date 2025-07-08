import Forms from "@/components/forms";
import { getSession } from "@/lib/auth";
import { getUserTables } from "@/scripts/getUserTables";
import Link from "next/link";
import { redirect } from "next/navigation";

interface TaskTableProps {
  params: Promise<{
    UserId: string;
    TaskTableId: string;
  }>;
}

export default async function TaskTable({ params }: TaskTableProps) {
  const session = await getSession();
  console.log("session", session);

  // Await params before using its properties
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

  // Instead of fetch, directly import and use the function
  const tables = await getUserTables(session.userId);

  if (!tables) {
    console.error("Failed to fetch user tables");
    return <div>Error loading tables</div>;
  }

  console.log("userTables", tables);
  const MiniTables = tables;
  console.log("MiniTables", MiniTables);
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-row justify-center gap-x-56 my-10">
          {MiniTables.map((table: any) => (
            <div className="" key={table.id}>
              <h3>{table.name}</h3>
              <p>{table.description}</p>
              <div className="flex flex-row gap-x-10 mt-4">
                {table.miniTables?.map((miniTable: any) => (
                  <div key={miniTable.id}>
                    <h4>{miniTable.name}</h4>
                    <ul>
                      {miniTable.tasks?.map((task: any) => (
                        <li key={task.id} className="mb-2">
                          {task.name}
                          <p className="text-sm text-slate-500">
                            {task.description}
                          </p>
                          <p className="text-xs text-slate-400">
                            Created at:
                            {new Date(task.createdAt).toLocaleDateString()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Add New Task Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800">
              Dodaj nowe zadanie
            </h2>
          </div>
          <Forms TableId={Number(resolvedParams.TaskTableId)} />
        </div>
      </div>
    </main>
  );
}
