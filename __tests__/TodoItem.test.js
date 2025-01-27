import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useToast } from '../__mocks__/use-toast';
import { TodoItem } from "../src/components/todos/todoItem";

jest.mock('@/hooks/use-toast');

describe('TodoItem', () => {
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    isCompleted: false,
  };

  const mockOnToggleComplete = jest.fn();
  const mockOnDeleteTodoComplete = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    useToast.mockReturnValue({ toast: mockToast });
    global.fetch.mockClear();
    mockToast.mockClear();
    mockOnToggleComplete.mockClear();
    mockOnDeleteTodoComplete.mockClear();
  });

  it('renders the todo item with correct title and actions', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockOnToggleComplete}
        onDeleteTodoComplete={mockOnDeleteTodoComplete}
      />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Complete')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('handles toggle complete action', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockOnToggleComplete}
        onDeleteTodoComplete={mockOnDeleteTodoComplete}
      />
    );

    const completeButton = screen.getByText('Complete');
    fireEvent.click(completeButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(`/api/todos/1`, {
        method: 'PUT',
        body: JSON.stringify({ isCompleted: true, toggle: true }),
      });
    });

    expect(mockOnToggleComplete).toHaveBeenCalledWith(1, false);
  });

  it('handles delete action', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggleComplete={mockOnToggleComplete}
        onDeleteTodoComplete={mockOnDeleteTodoComplete}
      />
    );

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(`/api/todos/1`, { method: 'DELETE' });
    });

    expect(mockOnDeleteTodoComplete).toHaveBeenCalledWith(1);
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Success.',
      description: 'Task has been removed successfully',
    });
  });
});
