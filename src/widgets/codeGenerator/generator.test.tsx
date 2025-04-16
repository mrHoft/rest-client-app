import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { CodeGenerator } from './generator';

const mockDict = { code: 'Generate code' };

const mockData = {
  method: 'GET',
  url: 'https://example.com',
  body: '{"userId": 55, "text": "test"}',
  headers: [{ key: 'Content-Type', value: 'application/json', enabled: true }],
};

describe('CodeGenerator', () => {
  it('should render select', () => {
    const { getByRole } = render(<CodeGenerator dict={mockDict} data={mockData} />);
    const select = getByRole('combobox');

    expect(select).toBeInTheDocument();
  });

  it('should change runtime', () => {
    const { getByRole } = render(<CodeGenerator dict={mockDict} data={mockData} />);
    const select = getByRole('combobox');

    fireEvent.change(select, { target: { value: 'fetch' } });

    expect(select).toHaveValue('fetch');
  });

  it('should generate code if https:// is missing', () => {
    const mockData = {
      method: 'GET',
      url: 'example.com',
      body: '{"userId": 55, "text": "test"}',
      headers: [{ key: 'Content-Type', value: 'application/json', enabled: true }],
    };
    const { getByRole } = render(<CodeGenerator dict={mockDict} data={mockData} />);
    const editor = getByRole('textbox');

    expect(editor).toHaveTextContent(`https://${mockData.url}`);
  });
});
