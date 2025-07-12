"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableTask from "./DraggableTask";

interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  miniTableId: number | null;
}

interface MiniTable {
  id: number;
  name: string;
  tasks: Task[];
}

interface DroppableColumnProps {
  miniTable: MiniTable;
}

export default function DroppableColumn({ miniTable }: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: miniTable.id,
    data: {
      type: "column",
      miniTableId: miniTable.id,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[300px] p-4 border-2 border-dashed rounded-lg transition-all duration-200 ${
        isOver
          ? "border-blue-400 bg-blue-50 scale-105"
          : "border-gray-300 bg-gray-50"
      }`}
    >
      <h4 className="font-semibold text-lg mb-4 text-gray-700 text-center">
        {miniTable.name}
        <span className="ml-2 text-sm text-gray-500">
          ({miniTable.tasks.length})
        </span>
      </h4>
      <SortableContext
        items={miniTable.tasks}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {miniTable.tasks?.map((task) => (
            <DraggableTask key={task.id} task={task} />
          ))}
          {miniTable.tasks.length === 0 && (
            <div className="text-center py-8 text-gray-400 italic">
              Drop tasks here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}
