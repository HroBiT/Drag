import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
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

  return (
    <div className="">
      <div>
        <FormToAddTask TableId={TableId} />
      </div>
    </div>
  );
}
