import { useState, Dispatch, SetStateAction } from 'react';

function isArray<T>(arr: T): arr is T {
  return Array.isArray(arr);
}

function _concat<T>(concat: boolean | string, data: T, response: T): T | undefined {
  if (typeof data === 'object' && typeof concat === 'string') {
    return { ...data, [concat]: [...(data[concat] || []), ...(response[concat] || [])] };
  }

  if (isArray(data) && isArray(response)) {
    return [...data, ...response];
  }

  return undefined;
}

interface Options {
  loading?: boolean;
  data?: any;
  errors?: any;
}

interface Params {
  concat?: boolean | string;
  loading?: false;
}

export interface RequestResponse<T> {
  request: (fn: { data: T } | Promise<{ data: T }>, params?: Params) => Promise<T>;
  data: T;
  errors: { [key: string]: any };
  loading: boolean;
  setData: Dispatch<T>;
  setErrors: Dispatch<
    SetStateAction<{
      [key: string]: string | string[];
    }>
  >;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export function useRequest<T>(options?: Options): RequestResponse<T> {
  const [data, setData] = useState<T>((options && options.data) || []);
  const [errors, setErrors] = useState<{ [key: string]: string | string[] }>((options && options.errors) || {});
  const [loading, setLoading] = useState<boolean>((options && options.loading) || false);

  const request = async (fn: { data: T } | Promise<{ data: T }>, params?: Params): Promise<T> => {
    setErrors({});

    if (!params || (params && params.loading !== false)) {
      setLoading(true);
    }

    try {
      const { data: response } = await fn;

      if (params && params.concat) {
        const concatResponse = _concat(params.concat, data, response);

        if (concatResponse) {
          setData(concatResponse);

          return Promise.resolve(concatResponse);
        }
      }

      setData(response);

      return Promise.resolve(response);
    } catch ({ response = {} }) {
      if (response.data) {
        setErrors(response.data);

        return Promise.reject(response.data);
      }

      return Promise.reject({});
    } finally {
      setLoading(false);
    }
  };

  return {
    request,
    data,
    errors,
    loading,
    setData,
    setErrors,
    setLoading,
  };
}
