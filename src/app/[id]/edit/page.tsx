'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [task, setTask] = useState({ title: '', description: '', dueDate: '' });

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`/api/todos/${params.id}`);
      const data = await res.json();
      setTask(data);
    };

    fetchTask();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/todos/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({ id: params.id, ...task }),
    });

    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-beige w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Edit Task</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Task Description
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="Description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="due-date" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
