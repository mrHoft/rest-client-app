import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { RestResponse } from '~/app/rest/actions';
import { ResponseViewer } from './response';

const mockDict = { response: 'Response' };

describe('ResponseViewer', () => {
  it('should render correctly', () => {
    const response: RestResponse = {
      data: 'Error data',
      status: 404,
      message: 'Not Found',
      contentType: 'text/html',
      lapse: 3000,
    };
    const { getByText } = render(<ResponseViewer dict={mockDict} response={response} />);

    expect(getByText('404')).toBeInTheDocument();

    expect(getByText('Not Found')).toBeInTheDocument();

    expect(getByText('text/html')).toBeInTheDocument();

    expect(getByText('3000ms')).toBeInTheDocument();
  });

  it('should render response with empty data when no data or message is provided', () => {
    const response: RestResponse = {
      data: null,
      status: 200,
      message: null,
      contentType: 'application/json',
      lapse: 1000,
    };
    const { getByRole } = render(<ResponseViewer dict={mockDict} response={response} />);

    expect(getByRole('textbox')).toHaveTextContent('');
  });
});
