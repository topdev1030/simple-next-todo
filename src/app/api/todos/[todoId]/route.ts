import { db } from "@/db/client";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// app/api/todos/[id]/route.ts
export async function GET(
  req: NextRequest,
  { params }: { params: { todoId: string } }
) {
  try {
    const { todoId } = params;
    const task = await db
      .select()
      .from(tasks) // Specify the table to update
      .where(eq(tasks.id, parseInt(todoId, 10))); // Condition to find the correct task

    if (!task) {
      return new NextResponse(JSON.stringify({ message: "Task not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(task[0]), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

// app/api/todos/[id]/route.ts
export async function PUT(
  req: Request,
  { params }: { params: { todoId: string } }
) {
  try {
    const { todoId } = params;
    const { title, description, dueDate, isCompleted, toggle } =
      await req.json();
    let newTask;

    if (toggle === true) {
      newTask = { isCompleted };
    } else if (!title || !description || !dueDate) {
      return new Response("Invalid data", { status: 400 });
    } else {
      newTask = {
        title,
        description,
        dueDate,
      };
    }

    await db
      .update(tasks) // Specify the table to update
      .set(newTask) // Set the new values for specified columns
      .where(eq(tasks.id, parseInt(todoId, 10))) // Condition to find the correct task
      .execute(); // Execute the update query

    return new Response("Task updated successfully", { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

// app/api/todos/[id]/route.ts
export async function DELETE(
  req: Request,
  { params }: { params: { todoId: string } }
) {
  try {
    const { todoId } = params;
    const result = await db
      .delete(tasks) // Specify the table to update
      .where(eq(tasks.id, parseInt(todoId, 10))) // Condition to find the correct task
      .execute(); // Execute the update query

    return new Response("Task deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
