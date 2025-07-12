"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import DragDropProvider from "./DragDropProvider";
import DroppableColumn from "./DroppableColumn";
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

interface TaskTable {
  id: number;
  name: string;
  description: string | null;
  miniTables: MiniTable[];
}

interface TaskBoardClientProps {
  taskTable: TaskTable;
  unassignedTasks: Task[];
}

export default function TaskBoardClient({
  taskTable,
  unassignedTasks,
}: TaskBoardClientProps) {
  const [localTaskTable, setLocalTaskTable] = useState(taskTable);
  const [localUnassignedTasks, setLocalUnassignedTasks] =
    useState(unassignedTasks);
  const [isUpdating, setIsUpdating] = useState(false);

  const { setNodeRef: unassignedDropRef, isOver: isUnassignedOver } =
    useDroppable({
      id: "unassigned",
      data: {
        type: "unassigned",
      },
    });

  const handleTaskMove = async (
    taskId: number,
    newMiniTableId: number | null
  ) => {
    setIsUpdating(true);

    try {
      const response = await fetch("/api/tables/updateTabels", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId,
          miniTableId: newMiniTableId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      if (newMiniTableId === null) {
        const taskToMove = findTaskById(taskId);
        if (taskToMove) {
          setLocalUnassignedTasks((prev) => [
            ...prev,
            { ...taskToMove, miniTableId: null },
          ]);
          removeTaskFromMiniTables(taskId);
        }
      } else {
        const taskToMove = findTaskById(taskId);
        if (taskToMove) {
          removeTaskFromMiniTables(taskId);
          setLocalUnassignedTasks((prev) =>
            prev.filter((t) => t.id !== taskId)
          );

          setLocalTaskTable((prev) => ({
            ...prev,
            miniTables: prev.miniTables.map((miniTable) =>
              miniTable.id === newMiniTableId
                ? {
                    ...miniTable,
                    tasks: [
                      ...miniTable.tasks,
                      { ...taskToMove, miniTableId: newMiniTableId },
                    ],
                  }
                : miniTable
            ),
          }));
        }
      }

      console.log(`Task ${taskId} moved to miniTable ${newMiniTableId}`);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const findTaskById = (taskId: number): Task | undefined => {
    const unassignedTask = localUnassignedTasks.find(
      (task) => task.id === taskId
    );
    if (unassignedTask) return unassignedTask;

    for (const miniTable of localTaskTable.miniTables) {
      const task = miniTable.tasks.find((task) => task.id === taskId);
      if (task) return task;
    }
    return undefined;
  };

  const removeTaskFromMiniTables = (taskId: number) => {
    setLocalTaskTable((prev) => ({
      ...prev,
      miniTables: prev.miniTables.map((miniTable) => ({
        ...miniTable,
        tasks: miniTable.tasks.filter((task) => task.id !== taskId),
      })),
    }));
  };

  return (
    <DragDropProvider onTaskMove={handleTaskMove}>
      {isUpdating && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Updating task...
        </div>
      )}

      <div className="flex flex-col gap-8">
        {/* Task Table Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800">
            {localTaskTable.name}
          </h3>
          <p className="text-gray-600">{localTaskTable.description}</p>
        </div>

        {/* MiniTables Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {localTaskTable.miniTables?.map((miniTable) => (
            <DroppableColumn key={miniTable.id} miniTable={miniTable} />
          ))}
        </div>

        {/* Unassigned Tasks Section */}
        <div className="mt-8">
          <div
            ref={unassignedDropRef}
            className={`min-h-[150px] p-6 border-2 border-dashed rounded-lg transition-colors ${
              isUnassignedOver
                ? "border-red-400 bg-red-50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              Unassigned Tasks ({localUnassignedTasks.length})
            </h4>
            {localUnassignedTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {localUnassignedTasks.map((task) => (
                  <DraggableTask key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic text-center py-8">
                No unassigned tasks. Drag tasks here to unassign them.
              </p>
            )}
          </div>
        </div>
      </div>
    </DragDropProvider>
  );
}
