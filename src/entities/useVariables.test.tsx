import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { useState } from 'react';
import useVariables from './useVariables';

const Component = () => {
  const [variables, setVariables] = useState<Record<string, string>>({});
  const { setVariable, getVariables, setAllVariables } = useVariables();

  const handleAddVariable = () => {
    setVariable('test1', 'test-value1');
    setVariables(getVariables() ?? {});
  };
  const handleUpdateVariables = () => {
    setAllVariables({ test2: 'test-value2' });
    setVariables(getVariables() ?? {});
  };

  return (
    <>
      <button data-testid="button1" onClick={handleAddVariable}>
        Set test variable
      </button>
      <button data-testid="button2" onClick={handleUpdateVariables}>
        Set test variable
      </button>
      <div data-testid="variables">{JSON.stringify(variables)}</div>
    </>
  );
};

describe('useVariables', () => {
  it('must retrieve variables', async () => {
    const { getByTestId } = render(<Component />);
    const el = getByTestId('variables');

    await act(() => {
      getByTestId('button1').click();
    });
    expect(el.textContent?.includes('"test1":"test-value1"')).toBeTruthy();

    await act(() => {
      getByTestId('button2').click();
    });
    expect(el.textContent?.includes('"test2":"test-value2"')).toBeTruthy();
  });
});
