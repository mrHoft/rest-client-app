import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import useHistory from '~/entities/useHistory';
import RestClient from './client';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('~/entities/useHistory');

describe('RestClient', () => {
  const pushMock = jest.fn();
  const mockPushHistory = jest.fn();
  const mockDict = {
    title: 'REST Client',
    methodPlaceholder: 'Method',
    urlPlaceholder: 'Enter URL',
    send: 'Send',
    headers: 'Headers',
    add: 'Add',
    body: 'Body',
    text: 'text',
    prettify: 'Prettify',
    code: 'Generate code',
    codePlaceholder: 'runtime',
    response: 'Response',
    status: 'Status',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockImplementation(() => ({
      push: pushMock,
    }));

    (useHistory as jest.Mock).mockReturnValue({
      pushHistory: mockPushHistory,
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <RestClient
        dict={mockDict}
        locale="en"
        initMethod="GET"
        initUrl="https://example.com"
        initBody='{"userId": 55, "text": "test"}'
        initQuery={{ testHeader: 'testValue' }}
        response={{ data: 'Error data', status: 200, message: 'OK', contentType: 'application/json', lapse: 3000 }}
      />
    );

    expect(getByText('REST Client')).toBeInTheDocument();

    expect(getByText('GET')).toBeInTheDocument();
  });

  it('pushes history', () => {
    const { getByText } = render(
      <RestClient
        dict={mockDict}
        locale="en"
        initMethod="GET"
        initUrl="https://example.com"
        initBody='{"userId": 55, "text": "test"}'
        initQuery={{ testHeader: 'testValue' }}
        response={{ data: 'Response data', status: 200, message: 'OK', contentType: 'application/json', lapse: 3000 }}
      />
    );

    fireEvent.click(getByText('Send'));

    expect(mockPushHistory).toHaveBeenCalled();
  });

  it('handles change URL', () => {
    const { getByDisplayValue, queryByDisplayValue } = render(
      <RestClient
        dict={mockDict}
        locale="en"
        initMethod="GET"
        initUrl="https://example.com"
        initBody='{"userId": 55, "text": "test"}'
        initQuery={{ testHeader: 'testValue' }}
        response={{ data: 'Response data', status: 200, message: 'OK', contentType: 'application/json', lapse: 3000 }}
      />
    );
    const url = getByDisplayValue('https://example.com');

    fireEvent.change(url, { target: { value: 'https://example.com/test' } });

    expect(queryByDisplayValue('https://example.com/test')).toBeInTheDocument();
  });

  it('handles change method', () => {
    const { getByDisplayValue, queryByDisplayValue } = render(
      <RestClient
        dict={mockDict}
        locale="en"
        initMethod="GET"
        initUrl="https://example.com"
        initBody='{"userId": 55, "text": "test"}'
        initQuery={{ testHeader: 'testValue' }}
        response={{ data: 'Response data', status: 200, message: 'OK', contentType: 'application/json', lapse: 3000 }}
      />
    );
    const method = getByDisplayValue('GET');

    fireEvent.change(method, { target: { value: 'POST' } });

    expect(queryByDisplayValue('POST')).toBeInTheDocument();
  });
});
