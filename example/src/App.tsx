import * as React from 'react';
import { useRequest } from 'estafette';

const API = () => ({
  data: {
    titles: ['Hello world'],
  },
});

export const App: React.FC = () => {
  const { request, data, loading } = useRequest<{ titles: string[] }>({ data: { titles: [] } });

  React.useEffect(() => {
    onFetch();
  }, []);

  const onFetch = () => request(API(), { concat: data.titles.length > 0 && 'titles' });

  if (loading) {
    return <span>Loading ...</span>;
  }

  return (
    <div>
      <h1>Title:</h1>

      {data.titles.map(title => (
        <p key={title}>{title}</p>
      ))}

      <div>
        <button onClick={onFetch}>view more</button>
      </div>
    </div>
  );
};
