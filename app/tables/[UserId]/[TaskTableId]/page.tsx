import Forms from "@/components/forms";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { getUserTables } from "@/scripts/getUserTables";
import Link from "next/link";
import { redirect } from "next/navigation";

interface TaskTableProps {
  params: {
    userId: string;
    taskTableId: string;
  };
}

export default async function TaskTable({ params }: TaskTableProps) {
  const session = await getSession();
  console.log("session", session);

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
  const MiniTables = tables[0].miniTables;
  console.log("MiniTables", MiniTables);
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-8">
        <div className="space-y-4 mb-8">
          <Link className="" href={`/tables/${session.userId}`}>
            <Button> go back with this button</Button>
          </Link>
        </div>
        <div>
          <h2>
            Tabele {session.userId} - Zadania {}
          </h2>
        </div>
        <div className="flex flex-row justify-center gap-x-56 my-10">
          {MiniTables.map((table: any) => (
            <div key={table.id}>
              <h3>{table.name}</h3>
              <p>{table.description}</p>
              <div>
                <ul>
                  {table.tasks.map((task: any) => (
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
          <Forms />
        </div>
      </div>
    </main>
  );
}
