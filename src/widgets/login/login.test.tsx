import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Login from './Login';

jest.mock('~/app/auth/actions');
jest.mock('~/components/loader/loader');
jest.mock('~/components/message/message');

describe('Login Component', () => {
  const mockDict = {
    title: 'Login',
    email: 'Email',
    password: 'Password',
    submit: 'Login',
    buttonToRegister: 'Register',
    success: "You've successfully logged in!",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<Login dict={mockDict} locale="en" />);

    expect(getByText(mockDict.email)).toBeInTheDocument();

    expect(getByText(mockDict.password)).toBeInTheDocument();
  });
});
