import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Loading from './loading';

describe('Loading', () => {
  it('successful renders', () => {
    const { container } = render(<Loading />);

    expect(container.querySelector('div')?.className).toBe('loader');
  });
});
