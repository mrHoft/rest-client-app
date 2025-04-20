import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react';
import { InputPassword } from './index';

describe('InputPassword', () => {
  it('renders a input element with right type', () => {
    const { container } = render(<InputPassword name="test" placeholder="test" />);
    const input = container.querySelector<HTMLInputElement>('input');
    const checkbox = container.querySelector<HTMLInputElement>('input[type="checkbox"]');

    expect(input && input.type === 'password').toBeTruthy();

    act(() => {
      checkbox?.click();
      expect(input && input.type === 'text').toBeTruthy();
    });
  });

  it('renders a password strength', () => {
    const { container } = render(<InputPassword name="test" placeholder="test" />);
    const input = container.querySelector<HTMLInputElement>('input');
    const strength = container.querySelector<HTMLDivElement>('.password__strength');
    expect(strength?.getAttribute('style')).toBeNull();
    if (input) {
      fireEvent.input(input, { target: { value: '123' } });
    }
    expect(strength?.getAttribute('style')).toBeDefined();
  });
});
