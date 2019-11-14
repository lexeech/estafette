import * as React from 'react';

export function useList<T>(list: T[], render: (item: T, index: number) => React.ReactNode): React.ReactNode {
  if (!Array.isArray(list)) {
    console.error(`useList expects an array but got ${typeof list}`);
    return null;
  }

  if (typeof render !== 'function') {
    console.error(`The second argument of useList (render function) expects a function but got ${typeof render}`);
    return null;
  }

  const Item = React.memo(({ children }: { children: React.ReactNode }) => <>{children}</>);

  return Array.from({ length: list.length }, (_, i) => <Item key={i}>{render(list[i], i)}</Item>);
}
