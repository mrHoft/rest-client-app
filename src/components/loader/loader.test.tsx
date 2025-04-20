import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { act } from 'react';
import { Loader } from './loader';

describe('Loader', () => {
  it('renders loader on "show" method', () => {
    const { container } = render(<Loader />);

    expect(container.querySelector('.loader')).toBeNull();

    act(() => {
      Loader.show();
    });

    expect(container.querySelector('.loader')).toBeInTheDocument();
  });
});
