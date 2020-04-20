/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

function withDisplayName<T>(name: string, Component: any): T {
  Component.displayName = name;
  return Component;
}

export function useList<T>(list: T[], renderItem: (item: T, index: number) => React.ReactNode) {
  const fnRef = React.useRef(renderItem);
  fnRef.current = renderItem;

  const Item = React.useMemo(() => {
    const Item = withDisplayName<T>('List.Item', ({ index }: { index: number }) => {
      const item = list[index];

      return fnRef.current(item, index);
    });

    return React.memo<any>(Item);
  }, [list]);

  return Array.from({ length: list.length }, (_, i) =>
    React.createElement(Item, {
      index: i,
      key: i,
    }),
  );
}
