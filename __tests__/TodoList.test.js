import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TodoList } from "../src/components/todos/todoList";

describe('TodoList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('renders the spinner while loading', () => {
    render(<TodoList />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays the todo list after loading', async () => {
    render(<TodoList />);

    // Wait for the todo items to be fetched
    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
      expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    });
  });

  it('updates todo completion status', async () => {
    render(<TodoList />);

    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    });

    const toggleButton = screen.getByText('Test Todo 1').closest('div').querySelector('button');
    fireEvent.click(toggleButton);

    // Assert the completion status change
    await waitFor(() => {
      expect(toggleButton).toHaveTextContent('Mark as Incomplete');
    });
  });

  it('deletes a todo', async () => {
    render(<TodoList />);

    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    });

    const deleteButton = screen.getByText('Test Todo 1').closest('div').querySelector('button.delete');
    fireEvent.click(deleteButton);

    // Assert the todo is removed from the UI
    await waitFor(() => {
      expect(screen.queryByText('Test Todo 1')).not.toBeInTheDocument();
    });
  });
});
