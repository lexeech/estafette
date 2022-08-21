# Installation

With [`yarn`](https://yarnpkg.com/):

```
yarn add estafette
```

With [`npm`](https://npmjs.org/):

```
npm install estafette
```

# `useRequest(initialValues)`

Hook function for fetching data.
Every request will save data or validation errors and turn on/off loading.

#### Arguments

`initialValues` (_Object_): an object with initial values

```jsx
const estafette = useRequest({
  loading: true,
  data: { title: 'Initial title' },
  errors: { title: 'This field is required' },
});
```

#### Returns

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

# Concat data in `request(data, params)`

- `request(fn: Function, { concat: boolean | string })` from `useRequest` as the second argument accepts object params with concat which can be a boolean, it means every new data from callback will concatinate with current data. Also, it can be a string in case when necessary to concatinate just some property from object in data.

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useList, useRequest } from 'estafette';

const App = () => {
  const [page, setPage] = useState(1);
  const { request, data, loading } = useRequest();

  useEffect(() => {
    request(axios.get('https://jsonplaceholder.typicode.com/posts'), { concat: page > 1 });
  }, [page]);

  const onChangePage = () => setPage(page + 1);

  return (
    <>
      <ul>
        {useList(data, (item) => (
          <li>{item.title}</li>
        ))}
      </ul>

      <button onClick={onChangePage}>{!loading ? 'View more' : 'Loading'}</button>
    </>
  );
};
```

# Skip loading or errors steps in `request(data, params)`

In the code bellow with additional parameters for request function we can switch off loading toggle and prevent errors reseting.
Can be useful for seamless loading or for keeping validation errors in a form.

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useList, useRequest } from 'estafette';

const App = () => {
  const [page, setPage] = useState(1);
  const { request, data, loading } = useRequest();

  useEffect(() => {
    request(axios.get('https://jsonplaceholder.typicode.com/posts'), { toggleLoading: false, resetErrors: false });
  }, [page]);

  return (
    <>
      <span>{errors.details}</span>

      <ul>
        {useList(data, (item) => (
          <li>{item.title}</li>
        ))}
      </ul>
    </>
  );
};
```

# `useList(data, renderItem)`

Hook function for rendering list of data.
Every item will be memoized and updated only when their data changes.

#### Arguments

1. `list` (_Array_): Data
2. `render` (_Function_): Render function which will be called for every item in list

```jsx
<ul>
  {useList(['a', 'b', 'c', 'd'], (item, i) => (
    <li>
      {i + 1}. {item}
    </li>
  ))}
</ul>
```

#### Use direct in JSX

You can get the error `Uncaught Error: Rendered fewer hooks than expected. This may be caused by an accidental early return statement.` if you show or hide HOOK after first rendering, for this case you have to save into a variable, like this:

```jsx
const renderList = useList(['a', 'b', 'c', 'd'], (item, i) => (
  <li>
    {i + 1}. {item}
  </li>
));

return <ul>{renderlist}</ul>;
```
