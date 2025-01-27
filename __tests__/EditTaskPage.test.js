import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useToast } from '../__mocks__/use-toast';
import EditTaskPage from "../src/app/todos/[id]/edit/page";

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
  })),
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(() => ({ toast: jest.fn() })),
}));

describe('EditTaskPage', () => {
  it('renders the task form with preloaded data', async () => {
    render(<EditTaskPage params={{ id: '1' }} />);

    // Assert loading spinner initially
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Wait for task data to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
      expect(screen.getByDisplayValue('This is a test description')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2025-02-01')).toBeInTheDocument();
    });
  });

  it('allows editing the task and saving changes', async () => {
    const mockRouter = useRouter();
    const mockToast = useToast();

    render(<EditTaskPage params={{ id: '1' }} />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
    });

    // Modify task title
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Updated Task' },
    });
    expect(screen.getByDisplayValue('Updated Task')).toBeInTheDocument();

    // Submit form
    fireEvent.click(screen.getByText('Save Changes'));

    // Ensure fetch was called with correct payload
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/todos/1', {
        method: 'PUT',
        body: JSON.stringify({
          id: '1',
          title: 'Updated Task',
          description: 'This is a test description',
          dueDate: '2025-02-01',
        }),
      });

      // Ensure toast was shown and router navigated
      expect(mockToast.toast).toHaveBeenCalledWith({
        title: 'Success.',
        description: 'A new task has been updated successfully',
      });
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });
  });

  it('handles the back button correctly', () => {
    const mockRouter = useRouter();

    render(<EditTaskPage params={{ id: '1' }} />);

    // Click the back button
    fireEvent.click(screen.getByText('Back'));

    // Ensure router back was called
    expect(mockRouter.back).toHaveBeenCalled();
  });
});
