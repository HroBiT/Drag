"use client";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface Task {
  id: number;
  title: string;
  description: string | null;
  createdAt: Date;
  completed: boolean;
  updatedAt: Date;
  taskTableId: number;
  miniTableId: number | null;
  State: boolean;
}

interface TaskListClientProps {
  tasks: Task[];
}

export default function TaskListClient({ tasks }: TaskListClientProps) {
  return (
    <div>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
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
      </SortableContext>
    </div>
  );
}
