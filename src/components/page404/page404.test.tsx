import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Page404 from './page404';

describe('Page404', () => {
  it('successful renders', () => {
    const { getByRole } = render(<Page404 />);

    expect(getByRole('heading', { level: 2 }).textContent).toBe('Page Not Found');
  });
});
