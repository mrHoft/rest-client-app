import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { useState } from 'react';
import type { HistoryRecord } from './useHistory';
import useHistory from './useHistory';

const Component = () => {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const { pushHistory, getHistory } = useHistory();

  const handlePushHistory = () => {
    pushHistory({ method: 'GET', url: 'test', date: Date.now() });
    setHistory(getHistory() ?? []);
  };

  return (
    <>
      <button data-testid="button" onClick={handlePushHistory}>
        Push history
      </button>
      <div data-testid="history">{JSON.stringify(history)}</div>
    </>
  );
};

describe('useHistory', () => {
  it('must retrieve history', async () => {
    const { getByTestId } = render(<Component />);

    await act(() => {
      getByTestId('button').click();
    });
    const el = getByTestId('history');
    expect(el.textContent?.includes('"method":"GET","url":"test"')).toBeTruthy();
  });
});
