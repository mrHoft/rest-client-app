import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Card from './card';

const data = {
  id: 'test',
  image: undefined,
  link: 'test',
  name: 'test',
  role: 'test',
  about: 'test',
};

describe('Developer card', () => {
  it('successful renders', () => {
    const { getByRole } = render(<Card data={data} />);
    const link = getByRole('link');

    expect(link.getAttribute('href')).toBe(data.link);
  });
});
