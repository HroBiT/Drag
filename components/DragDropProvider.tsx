"use client";

import { DndContext, closestCenter } from "@dnd-kit/core";
import { ReactNode } from "react";

interface DragDropProviderProps {
  children: ReactNode;
}

export default function DragDropProvider({ children }: DragDropProviderProps) {
  const handleDragEnd = (event: any) => {
    console.log("Drag ended:", event);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  );
}
