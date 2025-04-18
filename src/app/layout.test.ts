import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import RootLayout, { metadata } from './layout';

jest.mock('next/headers', () => ({
  cookies: () => ({
    get: jest.fn(),
  }),
}));

describe('RootLayout', () => {
  it('correct metadata', () => {
    expect(metadata).toEqual({
      title: 'Restman',
      description: 'REST api testing tool',
      icons: {
        icon: '/logo.svg',
      },
    });
  });

  it('renders correctly', async () => {
    const layout = await RootLayout({ children: 'test' });
    const { getByText } = render(layout, { container: document });

    expect(getByText('test')).toBeInTheDocument();
  });
});
