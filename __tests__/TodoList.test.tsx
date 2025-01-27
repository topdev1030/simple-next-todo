import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../src/components/todoList';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
    redirected: false,
    json: () =>
      Promise.resolve({
        todoItems: [
          { id: 1, title: 'Task 1', isCompleted: false },
          { id: 2, title: 'Task 2', isCompleted: true },
        ],
      }),
    // Add any other fetch Response properties as needed
  } as Response)
);

describe('TodoList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the spinner when the list is loading', () => {
    (fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise(() =>
          // Simulate loading state
          setTimeout(() => {}, 1000)
        )
    );

    render(<TodoList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches and displays todos', async () => {
    render(<TodoList />);

    // Wait for todos to be fetched and displayed
    await waitFor(() => screen.getByTestId('todo-item'));

    expect(screen.getAllByTestId('todo-item')).toHaveLength(2);
    expect(screen.getByText(/Test Todo 1/)).toBeInTheDocument();
    expect(screen.getByText(/Test Todo 2/)).toBeInTheDocument();
  });

  it('handles toggle completion and deletion', async () => {
    render(<TodoList />);

    await waitFor(() => screen.getByTestId('todo-item'));

    // Simulate delete action
    const deleteButton = screen.getByText(/Delete/); // Adjust based on your `TodoItem` implementation
    userEvent.click(deleteButton);

    // Confirm that the todo item is deleted
    await waitFor(() => {
      expect(screen.queryByText(/Test Todo 1/)).not.toBeInTheDocument();
    });
  });
});
