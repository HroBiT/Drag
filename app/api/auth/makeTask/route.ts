import { NextRequest } from "next/server";
import { createNewTask } from "@/scripts/createNewTask";

export async function POST(request: NextRequest) {
  try {
    const { taskTableId, title, description } = await request.json();

    if (!taskTableId || !title) {
      return new Response(
        JSON.stringify({ error: "Task table ID and title are required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const newTask = await createNewTask(taskTableId, title, description);

    return new Response(
      JSON.stringify({
        message: "Task created successfully",
        task: newTask,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    return new Response(JSON.stringify({ error: "Failed to create task" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
