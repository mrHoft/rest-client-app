import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import HeadersEditor from './editor';

describe('HeadersEditor', () => {
  const mockDict = { headers: 'Headers', add: 'Add' };

  it('renders the headers title', () => {
    const { getByText } = render(<HeadersEditor dict={mockDict} headers={[]} setHeaders={() => {}} />);

    expect(getByText('Headers')).toBeInTheDocument();
  });

  it('renders the add button', () => {
    const { getByText } = render(<HeadersEditor dict={mockDict} headers={[]} setHeaders={() => {}} />);

    expect(getByText('Add')).toBeInTheDocument();
  });

  it('deletes a header when the delete button is clicked', () => {
    const mockSetHeaders = jest.fn();
    const initialHeaders = [{ key: 'Header1', value: 'Value1', enabled: true }];
    const { getByRole } = render(
      <HeadersEditor dict={mockDict} headers={initialHeaders} setHeaders={mockSetHeaders} />
    );
    const deleteButton = getByRole('button', { name: 'delete' });

    fireEvent.click(deleteButton);

    expect(mockSetHeaders).toHaveBeenCalled();
  });
});
