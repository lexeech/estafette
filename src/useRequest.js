import { useState } from 'react';

export const useRequest = (options = {}) => {
  const [data, setData] = useState(options.data || []);
  const [errors, setErrors] = useState(options.errors || {});
  const [loading, setLoading] = useState(options.loading || false);

  const request = async (fn, { concat } = {}) => {
    setLoading(true);

    try {
      const { data: response = options.data || [] } = await fn;

      setLoading(false);

      if (concat) {
        let concatedResponse = null;

        if (typeof concat === 'string') {
          concatedResponse = { ...data, [concat]: [...data[concat], ...response[concat]] };
        } else {
          concatedResponse = [...data, ...response];
        }

        setData(concatedResponse);

        return Promise.resolve(concatedResponse);
      }

      setData(response);

      return Promise.resolve(response);
    } catch ({ response = {} }) {
      setErrors(response.data);
      setLoading(false);

      return Promise.reject(response.data);
    }
  };

  return {
    request,
    data,
    errors,
    loading,
  };
};
