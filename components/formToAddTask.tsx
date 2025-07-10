"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface FormToAddTaskProps {
  TableId: number;
}

export default function FormToAddTask({ TableId }: FormToAddTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/makeTask", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          taskTableId: TableId,
          title: title,
          description: description,
        }),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        window.location.reload();
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Enter a title of task"
        className="w-full"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
      />
      <Input
        type="text"
        placeholder="Enter a description of task"
        className="w-full"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      />
      <Button type="submit" className="px-3 py-2" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Task"}
      </Button>
    </form>
  );
}
