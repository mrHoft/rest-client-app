import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { RestResponse } from '~/app/rest/actions';
import { ResponseViewer } from './response';

const mockDict = { response: 'Response' };

describe('ResponseViewer', () => {
  it('should render correctly', () => {
    const response: RestResponse = {
      data: 'Response data',
      status: 200,
      message: 'OK',
      contentType: 'application/json',
      lapse: 1000,
    };
    const { getByText } = render(<ResponseViewer dict={mockDict} response={response} />);

    expect(getByText('200')).toBeInTheDocument();

    expect(getByText('OK')).toHaveStyle('color: green');

    expect(getByText('application/json')).toBeInTheDocument();

    expect(getByText('1000ms')).toHaveStyle('color: green');
  });

  it('should change colors of status and lapse', () => {
    const response: RestResponse = {
      data: 'Error data',
      status: 404,
      message: 'Not Found',
      contentType: 'text/html',
      lapse: 3000,
    };
    const { getByText } = render(<ResponseViewer dict={mockDict} response={response} />);

    expect(getByText('Not Found')).toHaveStyle('color: unset');

    expect(getByText('3000ms')).toHaveStyle('color: red');
  });

  it('should not render status block if there is no status', () => {
    const response: RestResponse = {
      data: 'Error data',
      status: null,
      message: 'Not Found',
      contentType: 'text/html',
      lapse: 3000,
    };
    const { queryByText } = render(<ResponseViewer dict={mockDict} response={response} />);

    expect(queryByText('Not Found')).not.toBeInTheDocument();
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
