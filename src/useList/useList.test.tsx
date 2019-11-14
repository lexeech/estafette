import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { useList } from './useList';

const findText = (wrapper: ShallowWrapper, index: number) =>
  wrapper
    .find('li')
    .at(index)
    .text();

describe('useList', () => {
  describe("useList's render", () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      const Component: React.FC<{ list: string[] }> = ({ list }) => (
        <ul>
          {useList<string>(list, item => (
            <li>{item}</li>
          ))}
        </ul>
      );

      wrapper = shallow(<Component list={['a', 'b', 'c', 'd']} />);
    });

    it('renders a list', () => {
      expect(wrapper.find('li').length).toEqual(4);
    });

    it('renders contain of list', () => {
      expect(findText(wrapper, 0)).toEqual('a');
      expect(findText(wrapper, 1)).toEqual('b');
      expect(findText(wrapper, 2)).toEqual('c');
      expect(findText(wrapper, 3)).toEqual('d');
    });
  });
});
