import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { InputEmail } from './index';

describe('InputEmail', () => {
  it('renders a input element with right type', () => {
    const { container } = render(<InputEmail />);
    const input = container.querySelector<HTMLInputElement>('input');

    expect(input && input.type === 'email').toBeTruthy();
  });
});
