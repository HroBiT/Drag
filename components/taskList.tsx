import { getUnTakenTasks } from "@/scripts/PrismasScripts";
import { unstable_cache } from "next/cache";
import TaskListClient from "./TaskListClient";

const getCachedUnTakenTasks = unstable_cache(
  async (tasktableId: number) => {
    return await getUnTakenTasks(tasktableId);
  },
  ["task-list"],
  {
    revalidate: 30,
    tags: ["tasks", "untaken-tasks"],
  }
);

export default async function TaskList({
  tasktableId,
}: {
  tasktableId: number;
}) {
  const tasks = await getCachedUnTakenTasks(tasktableId);

  return <TaskListClient tasks={tasks} />;
}
