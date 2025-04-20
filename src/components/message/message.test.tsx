import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { act } from 'react';
import { Message } from './message';

describe('Message', () => {
  it('renders message on "show" method', () => {
    const { container } = render(<Message />);

    expect(container.querySelector('.messages__item')).toBeNull();

    act(() => {
      Message.show('test message', 'error');
    });

    expect(container.querySelector('.messages__item')).toBeInTheDocument();
  });
});
