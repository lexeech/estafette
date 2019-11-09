# Estafette

## Installation

With [`npm`](https://npmjs.org/):

```
npm install estafette
```

With [`yarn`](https://yarnpkg.com/):

```
yarn add estafette
```

## Things to do

- [x] useRequest HOOK
- [x] Typescript support
- [ ] Flowtype support
- [ ] Documentation
- [ ] Helpers for mutation
- [ ] useFocusEffect HOOK
- [ ] Testing

## Usage

### useRequest

- `request` a function which executes another callback function, stores request data, switches on/off loading and catches errors
- `data` stores all data from callback function
- `errors` catches all errors from callback function
- `loading` stores loading state

```jsx
import React, { useEffect } from 'react';
import axios from 'axios';
import { useRequest } from 'estafette';

const App = () => {
  const { request, data, loading, errors } = useRequest();

  useEffect(() => {
    request(axios.get('https://jsonplaceholder.typicode.com/todos/1'));
  }, []);

  if (loading) {
    return <span>Loading ...</span>;
  }

  return (
    <div>
      <h1>Title: {data.title}</h1>
    </div>
  );
};
```

### Initial values in useRequest

- `useRequest({ loading: boolean, data: any, errors: Object })`

```jsx
const { request, data, loading, errors } = useRequest({
  loading: true,
  data: { title: 'Initial title' },
});
```

### Concat data in useRequest

- `request(fn: Function, { concat: boolean | string })` from `useRequest` as the second argument accepts object params with concat which can be a boolean, it means every new data from callback will concatinate with current data. Also, it can be a string in case when necessary to concatinate just some property from object in data.

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRequest } from 'estafette';

const App = () => {
  const [page, setPage] = useState(1);
  const { request, data, loading } = useRequest();

  useEffect(() => {
    request(axios.get('https://jsonplaceholder.typicode.com/posts', { concat: page > 1 }));
  }, [page]);

  const onChangePage = () => setPage(page + 1);

  return (
    <>
      <ul>
        {data.map((item, key) => (
          <li key={key}>{item.title}</li>
        ))}
      </ul>

      <button onClick={onChangePage}>{!loading ? 'View more' : 'Loading'}</button>
    </>
  );
};
```
