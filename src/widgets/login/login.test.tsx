import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { login } from '~/app/auth/actions';
import { Loader } from '~/components/loader/loader';
import { Message } from '~/components/message/message';
import Login from './login';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('~/app/auth/actions', () => ({
  login: jest.fn(),
}));

jest.mock('~/components/loader/loader', () => ({
  Loader: {
    show: jest.fn(),
    hide: jest.fn(),
  },
}));

jest.mock('~/components/message/message', () => ({
  Message: {
    show: jest.fn(),
  },
}));

describe('Login', () => {
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

  it('calls shows success message on successful registration', async () => {
    const { container, getByTitle, getByRole } = render(<Login dict={mockDict} locale="en" />);
    const mockData = {
      email: 'test@example.com',
      password: 'Password123@',
    };

    (login as jest.Mock).mockResolvedValueOnce({ success: true });

    fireEvent.change(getByTitle('example: email@domain.com'), { target: { value: mockData.email } });
    const password = container.querySelector('input.password') as HTMLElement;

    fireEvent.change(password, { target: { value: mockData.password } });

    fireEvent.click(getByRole('button', { name: mockDict.submit }));

    await waitFor(() => {
      expect(Message.show).toHaveBeenCalledWith(mockDict.success, 'regular');

      expect(Loader.hide).toHaveBeenCalled();
    });
  });

  it('shows error message on registration failure', async () => {
    const { container, getByTitle, getByRole } = render(<Login dict={mockDict} locale="en" />);
    const mockData = {
      email: 'test@example.com',
      password: 'Password123@',
    };

    (login as jest.Mock).mockResolvedValueOnce({ success: false });

    fireEvent.change(getByTitle('example: email@domain.com'), { target: { value: mockData.email } });
    const password = container.querySelector('input.password') as HTMLElement;

    fireEvent.change(password, { target: { value: mockData.password } });

    fireEvent.click(getByRole('button', { name: mockDict.submit }));

    await waitFor(() => {
      expect(Message.show).toHaveBeenCalledWith(undefined, 'error');
    });
  });
});
