import * as React from 'react';
import { useList, useRequest } from 'estafette';

const API = () => ({
  data: {
    titles: ['Hello world', 'Hello'],
  },
});

const initialData = { titles: [] };

export const App: React.FC = () => {
  const { request, data, loading, setData } = useRequest<{ titles: string[] }>({ data: initialData });

  const [foo, setFoo] = React.useState(0);

  React.useEffect(() => {
    onFetch();
  }, []);

  const onFetch = () => request(API(), { concat: data.titles.length > 0 && 'titles' });

  const onClear = () => setData(initialData);

  const onIncreaseFoo = () => setFoo((prevFoo) => prevFoo + 1);

  // if (loading) {
  //   return (
  //     <span>
  //       Uncaught Error: Rendered fewer hooks than expected. This may be caused by an accidental early return statement
  //     </span>
  //   );
  // }

  return (
    <div>
      <h1>Title:</h1>

      {useList(
        data.titles,
        (item) => (
          <p>
            {item} {foo}
          </p>
        ),
        [foo],
      )}

      {loading ? <span>Loading ...</span> : null}

      <div>
        <button onClick={onIncreaseFoo}>increase foo</button>
        <button onClick={onFetch}>view more</button>
        <button onClick={onClear}>clear all</button>
      </div>
    </div>
  );
};
