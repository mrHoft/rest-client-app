import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { useMemo } from 'react';
import HeadersEditor from './editor';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useMemo: jest.fn().mockImplementation(fn => fn()),
}));

describe('HeadersEditor', () => {
  const mockDict = { headers: 'Headers', add: 'Add' };
  const mockHeaders = [
    { key: 'Connection', value: 'keep-alive', enabled: true },
    { key: 'Authorization', value: 'Bearer token123', enabled: false },
  ];
  const setHeadersMock = jest.fn();

  beforeEach(() => {
    useMemo.mockClear();
    jest.clearAllMocks();
  });

  it('renders the title and the initial headers', () => {
    const { getByText, getByDisplayValue } = render(
      <HeadersEditor dict={mockDict} headers={mockHeaders} setHeaders={setHeadersMock} />
    );

    expect(getByText(mockDict.headers)).toBeInTheDocument();

    expect(getByDisplayValue('Connection')).toBeInTheDocument();

    expect(getByDisplayValue('keep-alive')).toBeInTheDocument();
  });

  it('renders the add button', () => {
    const { getByText } = render(<HeadersEditor dict={mockDict} headers={mockHeaders} setHeaders={setHeadersMock} />);

    expect(getByText(mockDict.add)).toBeInTheDocument();
  });

  it('deletes a header when the delete button is clicked', () => {
    const initialHeaders = [{ key: 'Header1', value: 'Value1', enabled: true }];
    const { getByRole } = render(
      <HeadersEditor dict={mockDict} headers={initialHeaders} setHeaders={setHeadersMock} />
    );
    const deleteButton = getByRole('button', { name: 'delete' });

    fireEvent.click(deleteButton);

    expect(setHeadersMock).toHaveBeenCalled();
  });

  it('calls setHeaders when the Add button is clicked', () => {
    const { getByText } = render(<HeadersEditor dict={mockDict} headers={mockHeaders} setHeaders={setHeadersMock} />);

    fireEvent.click(getByText(mockDict.add));

    expect(setHeadersMock).toHaveBeenCalled();
  });

  it('calls setHeaders when a header value is changed', () => {
    const { getAllByRole } = render(
      <HeadersEditor dict={mockDict} headers={mockHeaders} setHeaders={setHeadersMock} />
    );

    const input = getAllByRole('textbox')[1];

    fireEvent.change(input, { target: { value: 'New Value' } });

    expect(setHeadersMock).toHaveBeenCalled();
  });

  it('calls setHeaders when checkbox is clicked', () => {
    const { getAllByRole } = render(
      <HeadersEditor dict={mockDict} headers={mockHeaders} setHeaders={setHeadersMock} />
    );
    const checkbox = getAllByRole('checkbox')[1];

    fireEvent.click(checkbox);

    expect(setHeadersMock).toHaveBeenCalled();
  });
});
