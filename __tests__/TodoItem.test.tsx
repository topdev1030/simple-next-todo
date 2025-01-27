import type { TodoItem as Todo } from '@/types';
import { fireEvent, render, screen } from '@testing-library/react';
import TodoItem from '../src/components/todoItem';

describe('TodoItem Component', () => {
  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    isCompleted: false,
    dueDate: '',
    description: '',
    createdAt: '',
    updatedAt: '',
  };

  const mockOnToggleComplete = jest.fn();
  const mockOnDeleteTodoComplete = jest.fn();

  it('renders the todo item correctly', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockOnToggleComplete}
        onDeleteTodoComplete={mockOnDeleteTodoComplete}
      />
    );

    // Check title
    const title = screen.getByText(/Test Todo/i);
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-lg font-medium text-gray-800');

    // Check buttons
    const completeButton = screen.getByText(/Complete/i);
    const deleteButton = screen.getByText(/Delete/i);
    const detailsLink = screen.getByRole('link', { name: /Details/i });

    expect(completeButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', '/1');
  });

  it('handles complete toggle action', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockOnToggleComplete}
        onDeleteTodoComplete={mockOnDeleteTodoComplete}
      />
    );

    const completeButton = screen.getByText(/Complete/i);

    // Simulate button click
    fireEvent.click(completeButton);

    expect(mockOnToggleComplete).toHaveBeenCalledTimes(1);
    expect(mockOnToggleComplete).toHaveBeenCalledWith(mockTodo.id, mockTodo.isCompleted);
  });

  it('handles delete action', () => {
    // Mock `window.confirm`
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);

    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockOnToggleComplete}
        onDeleteTodoComplete={mockOnDeleteTodoComplete}
      />
    );

    const deleteButton = screen.getByText(/Delete/i);

    // Simulate button click
    fireEvent.click(deleteButton);

    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(mockOnDeleteTodoComplete).toHaveBeenCalledTimes(1);
    expect(mockOnDeleteTodoComplete).toHaveBeenCalledWith(mockTodo.id);

    confirmSpy.mockRestore();
  });

  it('does not delete if cancel is pressed', () => {
    // Mock `window.confirm`
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);

    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockOnToggleComplete}
        onDeleteTodoComplete={mockOnDeleteTodoComplete}
      />
    );

    const deleteButton = screen.getByText(/Delete/i);

    // Simulate button click
    fireEvent.click(deleteButton);

    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(mockOnDeleteTodoComplete).not.toHaveBeenCalled();

    confirmSpy.mockRestore();
  });
});
