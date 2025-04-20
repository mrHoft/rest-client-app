import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { getCookie } from '~/utils/cookie';
import { useLocale } from './useLocale';

const Component = () => {
  const { lang, setLocale } = useLocale();

  const handlePushHistory = () => {
    setLocale('de');
  };

  return (
    <>
      <button data-testid="button" onClick={handlePushHistory}>
        Set locale
      </button>
      <div data-testid="lang">{JSON.stringify(lang)}</div>
    </>
  );
};

describe('useLocale', () => {
  it('must set and retrieve right locale value', async () => {
    const { getByTestId } = render(<Component />);
    const el = getByTestId('lang');

    expect(el.textContent).toBe('"en"');

    await act(() => {
      getByTestId('button').click();
    });
    expect(el.textContent).toBe('"de"');
    expect(getCookie('locale')).toBe('de');
  });
});
