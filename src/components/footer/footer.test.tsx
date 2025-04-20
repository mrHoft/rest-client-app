import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Footer } from './footer';

describe('Footer', () => {
  it('provides revelant links', () => {
    const { container } = render(<Footer />);
    const links = container.querySelectorAll<HTMLAnchorElement>('a');

    expect(links[0]?.href.startsWith('https://github.com/daytec-org')).toBeTruthy();
    expect(links[1]?.href === 'https://rs.school/courses/reactjs').toBeTruthy();
  });
});
