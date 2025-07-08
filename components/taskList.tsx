"use client";

interface Task {
  id: number;
  title: string;
  description: string | null;
  createdAt: Date;
  completed: boolean;
  State: boolean;
  taskTableId: number;
  miniTableId: number;
  updatedAt: Date;
}

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="mt-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">
            {task.description || "No description"}
          </p>
          <p className="text-xs text-gray-400">
            Created at: {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
