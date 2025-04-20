import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Welcome } from './welcome';

const dict = {
  greetingWithUser: 'Welcome Back,',
  greetingWithoutUser: 'Welcome',
  restClient: 'REST Client',
  history: 'History',
  variables: 'Variables',
  login: 'Login',
  signUp: 'Sign up',
};

let returnValue: Record<string, string> | null = null;

jest.mock('~/app/auth/actions.ts', () => ({
  getUser: () => Promise.resolve(returnValue),
}));

describe('Welcome', () => {
  it('renders "no user" page with correct links', async () => {
    const res = await Welcome({ dict, locale: 'en' });
    const { container } = render(res);
    const links = container.querySelectorAll<HTMLAnchorElement>('a');

    expect(links[0].href.endsWith('/login')).toBeTruthy();
    expect(links[1].href.endsWith('/register')).toBeTruthy();
  });

  it('renders "signed user" page with correct links', async () => {
    returnValue = { email: 'test' };
    const res = await Welcome({ dict, locale: 'en' });
    const { container } = render(res);
    const links = container.querySelectorAll<HTMLAnchorElement>('a');

    expect(links[0].href.endsWith('/client/GET')).toBeTruthy();
    expect(links[1].href.endsWith('/history')).toBeTruthy();
    expect(links[2].href.endsWith('/variables')).toBeTruthy();
  });
});
