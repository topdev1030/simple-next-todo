'use client';

import Spinner from '@/components/Spinner';
import { TodoItem } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TodoDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [task, setTask] = useState<TodoItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the task details when the component loads
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/todos/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setTask(data);
        } else {
          console.error('Failed to fetch task details');
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [params.id]);

  // Handle delete task
  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/todos/${params.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Task deleted successfully');
        router.push('/');
      } else {
        alert('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!task) {
    return <p>Task not found.</p>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-beige w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <a
          href="/"
          className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Back
        </a>

        <h1 className="mb-4 mt-6 text-center text-2xl font-bold text-gray-800">{task.title}</h1>
        <p className="mb-2 text-gray-600">
          <span className="font-medium text-gray-700">Description:</span> {task.description}
        </p>
        <p className="mb-2 text-gray-600">
          <span className="font-medium text-gray-700">Due Date:</span> {task.dueDate}
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-700">Created At:</span>{' '}
          {new Date(task.createdAt).toLocaleString()}
        </p>
        <div className="mt-6 flex space-x-4">
          <a
            href={`/${task.id}/edit`}
            className="flex w-full justify-center rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600">
            Edit Task
          </a>
          <button
            onClick={handleDelete}
            className="w-full rounded-lg bg-red-500 py-2 text-white transition hover:bg-red-600">
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
