import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Palette } from './palette';

describe('Palette', () => {
  it('successful renders', () => {
    const { container } = render(<Palette />);

    expect(container.querySelectorAll('li').length).toBe(10);
  });
});
