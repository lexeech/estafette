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
- [ ] Tesing

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
