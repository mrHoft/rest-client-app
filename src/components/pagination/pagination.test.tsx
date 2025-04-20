import '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import Pagination from './pagination';

const state = { page: 0 };
const onClick = (page: number) => {
  state.page = page;
};

describe('Pagination', () => {
  it('2 pages', async () => {
    const { getAllByRole } = render(<Pagination page={0} total={20} pageSize={10} onChange={onClick} />);
    const buttons = getAllByRole('button') as HTMLButtonElement[];

    expect(buttons.length).toBe(4);

    const [left, btn1, btn2, right] = buttons;
    expect(left.disabled).toBeTruthy();
    expect(btn1.disabled).toBeTruthy();

    act(() => {
      right.click();
    });
    expect(state.page).toBe(1);

    act(() => {
      btn2.click();
    });
    expect(state.page).toBe(1);
  });

  it('10 pages', async () => {
    state.page = 0;
    const { getAllByRole } = render(<Pagination page={5} total={100} pageSize={10} onChange={onClick} />);
    const buttons = getAllByRole('button') as HTMLButtonElement[];

    expect(buttons.length).toBe(9);
    act(() => {
      buttons[buttons.length - 2].click();
    });
    expect(state.page).toBe(9);
  });
});
