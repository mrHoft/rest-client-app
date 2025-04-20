import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Error from './error';

describe('Error', () => {
  it('renders a component with right heading', () => {
    const { getByRole } = render(<Error error={{ name: 'test error', message: 'test message' }} reset={() => {}} />);

    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
});
