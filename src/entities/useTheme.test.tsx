import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { useTheme } from './useTheme';

const Component = () => {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    setTheme('dark');
  };

  return (
    <>
      <button data-testid="button" onClick={handleChangeTheme}>
        Change theme
      </button>
      <div data-testid="theme">{theme}</div>
    </>
  );
};

describe('useTheme', () => {
  it('must retrieve right theme value', () => {
    const { getByTestId } = render(<Component />);
    const el = getByTestId('theme');

    expect(el.textContent).toBe('light');

    act(() => {
      getByTestId('button').click();
    });
    expect(el.textContent).toBe('dark');
  });
});
