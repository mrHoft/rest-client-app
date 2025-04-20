import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import useHistory from '~/entities/useHistory';
import History from './history';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname() {
    return {
      prefetch: () => null,
    };
  },
  useSearchParams: () => ({
    get: () => {},
  }),
}));

jest.mock('~/entities/useHistory');

describe('History', () => {
  const mockGetHistory = jest.fn();
  const mockClearHistory = jest.fn();
  const mockUpdateHistory = jest.fn();
  const mockDict = {
    title: 'History Requests',
    clear: 'Clear history',
    empty: "History is empty. It's time to",
    linkToClient: 'make your first request!',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    useHistory.mockReturnValue({
      getHistory: mockGetHistory,
      clearHistory: mockClearHistory,
      updateHistory: mockUpdateHistory,
    });

    mockGetHistory.mockReturnValue([
      {
        date: 1700000000000,
        method: 'GET',
        url: 'https://example.com',
      },
    ]);
  });

  it('renders correctly', () => {
    const { getByText } = render(<History dict={mockDict} locale="en" />);

    expect(getByText('History Requests')).toBeInTheDocument();

    expect(getByText('GET')).toBeInTheDocument();

    expect(getByText('https://example.com')).toBeInTheDocument();
  });

  it('clears history', () => {
    const { getByText } = render(<History dict={mockDict} locale="en" />);

    fireEvent.click(getByText('Clear history'));

    expect(mockClearHistory).toHaveBeenCalled();
  });

  it('removes history item', () => {
    const { getAllByRole } = render(<History dict={mockDict} locale="en" />);

    fireEvent.click(getAllByRole('button')[1]);

    expect(mockUpdateHistory).toHaveBeenCalled();
  });
});
