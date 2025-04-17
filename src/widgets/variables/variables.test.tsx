import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import useVariables from '~/entities/useVariables';
import Variables from './variables';

jest.mock('~/entities/useVariables');

describe('Variables', () => {
  const mockSetVariable = jest.fn();
  const mockSetAllVariables = jest.fn();
  const mockGetVariables = jest.fn();
  const mockDict = {
    title: 'Variables',
    namePlaceholder: 'Name',
    valuePlaceholder: 'Value',
    add: 'Add',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useVariables.mockReturnValue({
      setVariable: mockSetVariable,
      setAllVariables: mockSetAllVariables,
      getVariables: mockGetVariables,
    });

    mockGetVariables.mockReturnValue({ var1: 'value1', var2: 'value2' });
  });

  it('renders correctly', () => {
    const { getByText, getByDisplayValue } = render(<Variables dict={mockDict} />);

    expect(getByText('Variables')).toBeInTheDocument();

    expect(getByDisplayValue('var1')).toBeInTheDocument();

    expect(getByDisplayValue('value1')).toBeInTheDocument();
  });

  it('adds a new row', () => {
    const { getByText, getAllByPlaceholderText } = render(<Variables dict={mockDict} />);
    const addButton = getByText('Add');

    fireEvent.click(addButton);

    expect(getAllByPlaceholderText('Name').length).toBe(4);

    expect(getAllByPlaceholderText('Value').length).toBe(4);
  });

  it('changes variable name and value', () => {
    const { getByDisplayValue } = render(<Variables dict={mockDict} />);
    const nameInput = getByDisplayValue('var1');
    const valueInput = getByDisplayValue('value1');

    fireEvent.change(nameInput, { target: { value: 'newName' } });

    fireEvent.change(valueInput, { target: { value: 'newValue' } });

    expect(mockSetVariable).toHaveBeenCalledWith('newName', 'newValue');
  });

  it('should remove a variable', () => {
    const { getAllByRole, queryByDisplayValue } = render(<Variables dict={mockDict} />);
    const removeButton = getAllByRole('button')[0];

    fireEvent.click(removeButton);

    expect(queryByDisplayValue('var1')).not.toBeInTheDocument();
  });
});
