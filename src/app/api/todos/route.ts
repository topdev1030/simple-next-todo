import { db } from "@/db/client";
import { tasks } from "@/db/schema";
import { TodoItem } from "@/types";
import { NextResponse } from "next/server";

// Next.js v14 App Router
// GET /todos
// app/api/todos/route.ts
export async function GET(req: Request) {
  const todoItems: TodoItem[] = await db.select().from(tasks);
  return NextResponse.json({ todoItems: todoItems }, { status: 200 });
}

// Next.js v14 App Router
// POST /todos
// app/api/todos/route.ts
export async function POST(req: Request) {
  const { title, description, dueDate } = await req.json();
  await db
    .insert(tasks)
    .values({ title, description, dueDate, isCompleted: false });
  return new Response("Task Added", { status: 200 });
}
