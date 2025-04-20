import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { useDebounce } from './useDebounce';

const Component = () => {
  const debounced = useDebounce('test', 100);
  return <div data-testid="debounced">{debounced}</div>;
};

describe('useDebounce', () => {
  it('must debounce given value', async () => {
    const { getByTestId } = render(<Component />);
    const el = getByTestId('debounced');

    await setTimeout(() => {
      expect(el.textContent).toBe('test');
    }, 150);
  });
});
