import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ButtonPrettify } from './prettify';

describe('ButtonPrettify', () => {
  it('successful renders button', () => {
    const mockOnClick = jest.fn();
    const { getByRole } = render(<ButtonPrettify name="body" onClick={mockOnClick} />);

    expect(getByRole('checkbox', { name: /prettify/i })).toBeInTheDocument();
  });
});
