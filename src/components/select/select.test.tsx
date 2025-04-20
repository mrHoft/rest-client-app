import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { Select } from './select';

describe('Select', () => {
  it('renders select element with given number of options', () => {
    const { container } = render(<Select options={['test1', 'test2']} name="test" placeholder="test" />);
    const select = container.querySelector<HTMLSelectElement>('select');

    expect(select?.children.length).toBe(2);
  });

  it('triggers user choice based callbacks', () => {
    let selection = '';
    const onChange = (value: string) => {
      selection = value;
    };
    const onBlur = () => undefined;
    const { container } = render(
      <Select options={['test1', 'test2']} name="test" placeholder="test" onChange={onChange} onBlur={onBlur} />
    );
    const select = container.querySelector<HTMLSelectElement>('select');

    if (select) {
      fireEvent.change(select, { target: { value: 'test2' } });
    }
    expect(selection).toBe('test2');
  });
});
