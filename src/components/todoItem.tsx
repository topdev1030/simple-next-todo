'use client';

import type { TodoItem } from '@/types';

interface TodoItemProps {
  todo: TodoItem;
  onToggleComplete: (id: number, isCompleted: boolean) => void;
  onDeleteTodoComplete: (id: number) => void;
}

const TodoItem = ({ todo, onToggleComplete, onDeleteTodoComplete }: TodoItemProps) => {
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
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        onDeleteTodoComplete(id);
      } else {
        alert('Failed to delete task');
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
        className={
          todo.isCompleted
            ? 'text-lg font-medium text-gray-800 line-through'
            : 'text-lg font-medium text-gray-800'
        }>
        {todo.title}
      </div>
      <div className="space-x-2">
        <button
          onClick={() => handleToggleComplete(todo.id, todo.isCompleted)}
          className="rounded-lg bg-green-500 px-3 py-2 text-white hover:bg-green-600">
          {todo.isCompleted ? 'Undo' : 'Complete'}
        </button>
        <a
          href={`/${todo.id}`}
          className="rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600">
          Details
        </a>
        <button
          onClick={() => handleDeleteTodo(todo.id)}
          className="rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
