'use client';

import { TodoItem as TodoItemType } from '@/types';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import TodoItem from './todoItem';

const TodoList = () => {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/todos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTodoList(data.todoItems);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const updateTodoCompletion = (id: number, isCompleted: boolean) => {
    setTodoList((prevList) =>
      prevList.map((todo) => (todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo))
    );
  };

  const deleteTodoCompletion = (id: number) => {
    setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
  };

  return (
    <div className="bg-beige w-70 mx-auto flex items-center justify-center rounded-lg bg-gray-100 p-6">
      <div className="w-full max-w-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">Todo List</h1>
        <a
          href="/add"
          className="mb-6 block flex justify-center rounded-lg bg-blue-500 px-4 py-2 text-white shadow-lg hover:bg-blue-600">
          Add New Todo
        </a>
        {todoList.length === 0 ? (
          <Spinner />
        ) : (
          <div className="space-y-4">
            {todoList.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={updateTodoCompletion}
                onDeleteTodoComplete={deleteTodoCompletion}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
