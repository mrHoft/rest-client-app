import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { act } from 'react';
import Storage from '~/utils/storage';
import ThemeSwitcher from './theme';

const storage = new Storage();

describe('ThemeSwitcher', () => {
  it('must change theme', () => {
    const { container } = render(<ThemeSwitcher />);
    const checkbox = container.querySelector<HTMLInputElement>('input[type="checkbox"]');

    act(() => {
      checkbox?.click();
    });

    expect(storage.get('theme')).toBe('dark');
  });
});
