import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import { Modal } from './modal';

describe('Modal', () => {
  it('successful renders', () => {
    const { container } = render(<Modal />);
    const inner = container.querySelector('.modal__inner');

    expect(inner?.children.length).toBe(1);

    act(() => {
      Modal.show(<div>test</div>);
    });

    expect(inner?.children.length).toBe(2);

    act(() => {
      inner?.querySelector<HTMLElement>('.modal__close')?.click();
    });

    expect(inner?.children.length).toBe(1);

    act(() => {
      Modal.close();
    });
  });
});
