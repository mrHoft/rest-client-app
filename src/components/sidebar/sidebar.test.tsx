import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { Modal } from '../modal/modal';
import { Sidebar } from './sidebar';

let usePathnameMock = () => 'path/en';
const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  usePathname: () => usePathnameMock(),
  useSearchParams: () => ({
    get: () => ({}),
    entries: () => new URLSearchParams({}),
  }),
}));

const dict = {
  code: 'Generate code',
};

describe('Sidebar', () => {
  it('unauthorized user', () => {
    const { getAllByRole } = render(<Sidebar dict={dict} locale="en" user={null} />);

    expect(getAllByRole('button').length).toBe(1);
  });

  it('authorized user', () => {
    const { getAllByRole } = render(<Sidebar dict={dict} locale="en" user={{ id: '1', created_at: '' }} />);

    expect(getAllByRole('button').length).toBe(4);
  });

  it('opens code generator modal', () => {
    usePathnameMock = () => 'path/en/client/GET/test/?testHeader=testValue';
    const { getByTitle, queryByText } = render(
      <>
        <Sidebar dict={dict} locale="en" user={{ id: '1', created_at: '' }} />
        <Modal />
      </>
    );
    const generatorButton = getByTitle('Generate code');

    fireEvent.click(generatorButton);

    expect(queryByText('Generate code')).toBeInTheDocument();
  });

  it('navigates to history', () => {
    const { getByTitle } = render(<Sidebar dict={dict} locale="en" user={{ id: '1', created_at: '' }} />);
    const historyButton = getByTitle('History');

    fireEvent.click(historyButton);

    expect(pushMock).toHaveBeenCalled();
  });
});
