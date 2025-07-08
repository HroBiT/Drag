import { getUserTables } from "@/scripts/getUserTables";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getUnTakenTasks } from "@/scripts/PrismasScripts";
import FormToAddTask from "./formToAddTask";
import TaskList from "./taskList";

interface FormsProps {
  TableId: number;
}

export default async function Forms({ TableId }: FormsProps) {
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

  const untakentask = await getUnTakenTasks(TableId);

  console.log("untakentask", untakentask);

  // Filter out tasks where miniTableId is null and ensure miniTableId is a number
  const filteredTasks = untakentask
    .filter((task: any) => task.miniTableId !== null)
    .map((task: any) => ({
      ...task,
      miniTableId: task.miniTableId as number,
    }));

  return (
    <div>
      <div>
        <FormToAddTask TableId={TableId} />
      </div>
      <div>
        <TaskList tasks={filteredTasks} />
      </div>
    </div>
  );
}
