'use client';

import { InputField, TextAreaField } from '@/components/atoms';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [task, setTask] = useState({ title: '', description: '', dueDate: '' });

  const { toast } = useToast();

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

    toast({
      title: 'Success.',
      description: 'A new task has been updated successfully',
    });

    router.push('/');
  };

  const redirectBackURL = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-beige w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <button
          type="button"
          onClick={redirectBackURL}
          className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Back
        </button>
        <h1 className="mb-6 mt-6 flex justify-center text-2xl font-bold text-gray-800">
          Edit Task
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Task Title"
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            placeholder="Title"
          />
          <TextAreaField
            label="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
          <InputField
            label="Due Date"
            type="date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600">
            Save Changes
          </button>
          <Toaster />
        </form>
      </div>
    </div>
  );
}
