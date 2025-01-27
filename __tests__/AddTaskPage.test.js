import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useToast } from '../__mocks__/use-toast';
import AddTaskPage from "../src/app/todos/add/page";

jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('AddTaskPage', () => {
  it('renders the form correctly', () => {
    render(<AddTaskPage />);
    
    expect(screen.getByText('Add Task')).toBeInTheDocument();
    expect(screen.getByLabelText('Task Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Due Date')).toBeInTheDocument();
  });

  it('shows success toast on successful task addition', async () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue({ toast: mockToast });

    render(<AddTaskPage />);

    fireEvent.change(screen.getByLabelText('Task Title'), {
      target: { value: 'Test Task' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Test Description' },
    });
    fireEvent.change(screen.getByLabelText('Due Date'), {
      target: { value: '2025-01-31' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save task/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Test Task',
          description: 'Test Description',
          dueDate: '2025-01-31',
        }),
      });
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Success.',
        description: 'A new task has been added successfully',
      });
    });
  });
});
