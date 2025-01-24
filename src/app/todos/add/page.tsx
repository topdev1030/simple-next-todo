'use client';

import { InputField, TextAreaField } from '@/components/atoms';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useState } from 'react';

export default function AddTaskPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, dueDate }),
    });

    toast({
      title: 'Success.',
      description: 'A new task has been added successfully',
    });

    window.location.href = '/';
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-beige w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <Link
          href="/"
          className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          passHref>
          Back
        </Link>
        <h1 className="mb-6 mt-6 flex justify-center text-2xl font-bold text-gray-800">Add Task</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Task Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <TextAreaField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <InputField
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600">
            Save Task
          </button>
          <Toaster />
        </form>
      </div>
    </div>
  );
}
