import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import { useRequest } from './useRequest';

describe('useRequest', () => {
  it('calls without crashing', () => {
    const Component = () => {
      useRequest();

      return null;
    };

    shallow(<Component />);
  });

  it("shouldn't rerender component for the first time", () => {
    const Component = () => {
      useRequest();

      const rerenderCounter = React.useRef(0);
      rerenderCounter.current += 1;

      return <div>{rerenderCounter.current}</div>;
    };

    const wrapper = mount(<Component />);

    expect(wrapper.text()).toBe('1');
  });

  describe('request function', () => {
    it('calls without crashing', () => {
      const Component = () => {
        const { request } = useRequest<string>();

        act(() => {
          React.useEffect(() => {
            const fetch = () => ({ data: 'Hello' });

            request(fetch());
          }, []);
        });

        return null;
      };

      shallow(<Component />);
    });
  });

  describe('setting initial states', () => {
    it('sets initial loading', () => {
      const Component = () => {
        const { loading } = useRequest({ loading: true });

        return <div>{loading ? 'Loading ...' : null}</div>;
      };

      const wrapper = shallow(<Component />);
      expect(wrapper.text()).toEqual('Loading ...');
    });

    it('sets initial data', () => {
      const Component = () => {
        const { data } = useRequest({ data: 'Data' });

        return <div>{data}</div>;
      };

      const wrapper = shallow(<Component />);
      expect(wrapper.text()).toEqual('Data');
    });

    it('sets initial errors', () => {
      const Component = () => {
        const { errors } = useRequest({ errors: { name: 'Name error' } });

        return <div>{errors.name}</div>;
      };

      const wrapper = shallow(<Component />);
      expect(wrapper.text()).toEqual('Name error');
    });
  });
});
