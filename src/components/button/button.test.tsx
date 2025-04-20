import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { ButtonSquare } from './square';

describe('ButtonSquare', () => {
  it('successful renders', () => {
    const { getByRole } = render(<ButtonSquare icon="copy" onClick={() => undefined} />);
    const button = getByRole('button');

    expect(button).toBeInTheDocument();

    act(() => {
      button.click();
    });

    expect(button.querySelector('.copy__msg')).toBeInTheDocument();
  });
});
