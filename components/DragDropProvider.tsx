"use client";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { ReactNode, useState } from "react";

interface DragDropProviderProps {
  children: ReactNode;
  onTaskMove?: (taskId: number, newMiniTableId: number | null) => void;
}

export default function DragDropProvider({
  children,
  onTaskMove,
}: DragDropProviderProps) {
  const [activeId, setActiveId] = useState<string | number | null>(null);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const taskId = active.id as number;
    const overId = over.id;

    if (over.data.current?.type === "column") {
      const newMiniTableId = over.data.current.miniTableId;

      if (onTaskMove) {
        onTaskMove(taskId, newMiniTableId);
      }
    }

    if (over.data.current?.type === "unassigned" || overId === "unassigned") {
      if (onTaskMove) {
        onTaskMove(taskId, null);
      }
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay>
        {activeId ? (
          <div className="p-4 bg-white border-2 border-blue-400 rounded-2xl shadow-lg opacity-80">
            <div className="font-bold text-gray-800">Moving task...</div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
