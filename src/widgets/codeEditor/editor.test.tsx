import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { CodeEditor } from './editor';

describe('CodeEditor', () => {
  it('renders correctly with initial data', () => {
    const { getByRole } = render(<CodeEditor data='{"userId": 55, "text": "test"}' name="body" />);
    const editor = getByRole('textbox');

    expect(editor).toHaveTextContent('{"userId": 55, "text": "test"}');
  });

  it('toggles prettify mode', () => {
    const { getByRole } = render(<CodeEditor data='{"userId": 55, "text": "test"}' name="body" />);
    const prettifyButton = getByRole('checkbox', { name: /prettify/i });

    fireEvent.click(prettifyButton);

    expect(prettifyButton).toBeChecked();
  });

  it('handles input correctly', () => {
    const handleInput = jest.fn();
    const { getByRole } = render(
      <CodeEditor data='{"userId": 55, "text": "test"}' name="body" onInput={handleInput} />
    );
    const editor = getByRole('textbox');

    fireEvent.input(editor, { target: { innerText: `{"userId": 55, "text": "test"}\nNew code` } });

    expect(handleInput).toHaveBeenCalledWith(`{"userId": 55, "text": "test"}\nNew code`);
  });

  it('updates line numbers on input', () => {
    const { getByRole, getAllByText } = render(<CodeEditor data='{"userId": 55,\n"text": "test"}' name="body" />);
    const editor = getByRole('textbox');

    fireEvent.input(editor, { target: { innerText: '{"userId": 55,\n"text": "test"\n}' } });
    const lineNumbers = getAllByText(/\d+/);

    expect(lineNumbers).toHaveLength(4);
  });

  it('calls onBlur correctly', () => {
    const handleBlur = jest.fn();
    const { getByRole } = render(<CodeEditor data='{"userId": 55, "text": "test"}' name="body" onBlur={handleBlur} />);
    const editor = getByRole('textbox');

    fireEvent.blur(editor, { target: { innerText: 'updated data' } });

    expect(handleBlur).toHaveBeenCalledWith('updated data');
  });
});
