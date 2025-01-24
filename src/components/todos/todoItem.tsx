'use client';

import type { TodoItem } from '@/types';
import clsx from 'clsx';
import Link from 'next/link';

import { useToast } from '@/hooks/use-toast';
import { AlertDialogDemo } from '../atoms';
import { Toaster } from '../ui/toaster';

interface TodoItemProps {
  todo: TodoItem;
  onToggleComplete: (id: number, isCompleted: boolean) => void;
  onDeleteTodoComplete: (id: number) => void;
}

const TodoItem = ({ todo, onToggleComplete, onDeleteTodoComplete }: TodoItemProps) => {
  const { toast } = useToast();

  const handleToggleComplete = async (id: number, isCompleted: boolean) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ isCompleted: !isCompleted, toggle: true }),
      });

      if (res.ok) {
        onToggleComplete(id, isCompleted);
      } else {
        console.error('Failed to update todo:', res.statusText);
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        onDeleteTodoComplete(id);
        toast({
          title: 'Success.',
          description: 'Task has been removed successfully',
        });
      } else {
        toast({
          title: 'Failed.',
          description: 'Failed to remove task',
        });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div
      key={todo.id}
      className="flex items-center justify-between rounded-lg bg-white p-4 shadow-lg">
      <div
        className={clsx(
          todo.isCompleted ? 'line-through' : '',
          'text-lg font-medium text-gray-800'
        )}>
        {todo.title}
      </div>
      <div className="space-x-2">
        <button
          onClick={() => handleToggleComplete(todo.id, todo.isCompleted)}
          className="rounded-lg bg-green-500 px-3 py-2 text-white hover:bg-green-600">
          {todo.isCompleted ? 'Undo' : 'Complete'}
        </button>
        <Link
          href={`/todos/${todo.id}`}
          className="rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
          passHref>
          Details
        </Link>
        <AlertDialogDemo
          label="Delete"
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your task from our servers."
          className="rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600"
          handler={() => handleDeleteTodo(todo.id)}
        />
        <Toaster />
      </div>
    </div>
  );
};

export { TodoItem };
