"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  miniTableId: number | null;
}

interface DraggableTaskProps {
  task: Task;
}

export default function DraggableTask({ task }: DraggableTaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`my-4 p-4 border rounded-2xl bg-white shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 ${
        isDragging ? "shadow-lg scale-105 z-10" : ""
      }`}
    >
      <h5 className="font-bold text-gray-800">{task.title}</h5>
      <p className="text-sm text-slate-500 mt-2">{task.description}</p>
      <p className="text-xs mt-3 text-slate-400">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
