import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { ButtonCopy } from './copy';

describe('Copy', () => {
  it('successful renders button', () => {
    const mockOnClick = jest.fn();
    const { container } = render(<ButtonCopy onClick={mockOnClick} />);

    expect(container.querySelector('button')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const mockOnClick = jest.fn();
    const { getByTitle } = render(<ButtonCopy onClick={mockOnClick} />);
    const button = getByTitle('copy');

    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
