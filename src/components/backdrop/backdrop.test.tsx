import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Backdrop } from './backdrop';

describe('Backdrop', () => {
  it('successful renders', () => {
    const { container } = render(<Backdrop />);

    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
