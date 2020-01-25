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

  React.useEffect(() => {
    onFetch();
  }, []);

  const onFetch = () => request(API(), { concat: data.titles.length > 0 && 'titles' });

  const onClear = () => setData(initialData);

  if (loading) {
    return <span>Loading ...</span>;
  }

  return (
    <div>
      <h1>Title:</h1>

      {useList(data.titles, item => (
        <p>{item}</p>
      ))}

      <div>
        <button onClick={onFetch}>view more</button>
        <button onClick={onClear}>clear all</button>
      </div>
    </div>
  );
};
