import { useState, Dispatch, SetStateAction } from 'react';
import { concatData } from 'libs/concatData';

interface RequestOptions {
  loading?: boolean;
  data?: any;
  errors?: any;
}

interface Params {
  concat?: boolean | string;
  loading?: false;
}

interface RequestReturn<T> {
  request: (fn: { data: T } | Promise<{ data: T }>, params?: Params) => Promise<T>;
  data: T;
  errors: { [key: string]: any };
  loading: boolean;
  setData: Dispatch<any>;
  setErrors: Dispatch<
    SetStateAction<{
      [key: string]: string | string[];
    }>
  >;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export function useRequest<T>(options: RequestOptions): RequestReturn<T> {
  const [data, setData] = useState<T>(options?.data || []);
  const [errors, setErrors] = useState<{ [key: string]: string | string[] }>(options?.errors || {});
  const [loading, setLoading] = useState<boolean>(options?.loading || false);

  const request = async (fn: { data: T } | Promise<{ data: T }>, params?: Params): Promise<T> => {
    setErrors({});

    if (!params || (params && params.loading !== false)) {
      setLoading(true);
    }

    try {
      const { data: response } = await fn;

      if (params && params.concat) {
        const concatResponse = concatData(params.concat, data, response);

        setData(concatResponse);

        return Promise.resolve(concatResponse);
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
