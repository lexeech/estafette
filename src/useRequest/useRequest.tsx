import { useCallback, useState, Dispatch, SetStateAction } from 'react';

type Data = { [key: string]: any } | any[];
const _concat = (concat: boolean | string, data: Data, response: Data): any => {
  if (typeof concat === 'string') {
    return { ...response, [concat]: [...(data[concat] || []), ...(response[concat] || [])] };
  }

  if (Array.isArray(data) && Array.isArray(response)) {
    return [...data, ...response];
  }

  return response;
};

interface Options {
  loading?: boolean;
  data?: any;
  errors?: any;
}

interface Params {
  /**
   * Concats data with previous one.
   * Pass a string to concat a certain proprety of object with.
   */
  concat?: boolean | string;

  /**
   * @default true
   * Toggles loading states before making request.
   */
  toggleLoading?: boolean;

  /**
   * @default true
   * Resets errors state before making request
   */
  resetErrors?: boolean;

  /**
   * @deprecated
   * Has been deprecated in favor of resetLoading prop.
   * */
  loading?: boolean;
}

interface RequestResponse<T> {
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

export function useRequest<T>(options?: Options): RequestResponse<T> {
  const [data, setData] = useState((options && options.data) || []);
  const [errors, setErrors] = useState<{ [key: string]: string | string[] }>((options && options.errors) || {});
  const [loading, setLoading] = useState<boolean>((options && options.loading) || false);

  const request = useCallback(async (fn: { data: T } | Promise<{ data: T }>, params?: Params): Promise<T> => {
    if (params?.resetErrors !== false) {
      setErrors({});
    }

    if (params?.toggleLoading !== false || params?.loading !== false) {
      setLoading(true);
    }

    try {
      const { data: response } = await fn;

      if (params && params.concat) {
        let newData = response;

        setData((prevState: Data) => {
          newData = _concat(params.concat!, prevState, response as Data);

          return newData;
        });

        return Promise.resolve(newData);
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

    /** no deps necessary */
  }, []);

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
