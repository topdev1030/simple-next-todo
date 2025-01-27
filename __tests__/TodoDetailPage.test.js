import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useToast } from "../__mocks__/use-toast";
import TodoDetailPage from "../src/app/todos/[id]/page";

jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('TodoDetailPage', () => {
  it('renders task details correctly', async () => {
    render(<TodoDetailPage params={{ id: '1' }} />);

    // Ensure loading spinner appears
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Test Task')).toBeInTheDocument();
      expect(screen.getByText('This is a test task')).toBeInTheDocument();
      expect(screen.getByText('2025-01-31')).toBeInTheDocument();
    });
  });

  it('handles task deletion correctly', async () => {
    const mockRouterPush = jest.fn();
    const mockToast = jest.fn();
    useRouter.mockReturnValue({ push: mockRouterPush });
    useToast.mockReturnValue({ toast: mockToast });

    render(<TodoDetailPage params={{ id: '1' }} />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Test Task')).toBeInTheDocument();
    });

    // Click the delete button
    fireEvent.click(screen.getByText('Delete Task'));

    // Confirm deletion in the alert dialog
    fireEvent.click(screen.getByText('Yes'));

    // Ensure the fetch request was made
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/todos/1', {
        method: 'DELETE',
      });

      // Ensure router redirection and toast notification
      expect(mockRouterPush).toHaveBeenCalledWith('/');
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Success.',
        description: 'Task has been removed successfully',
      });
    });
  });
});
