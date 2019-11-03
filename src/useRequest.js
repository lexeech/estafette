import { useState } from 'react';

const flat = (flatten = {}, dataToFlat = {}) => {
  let newDataToFlat = { ...dataToFlat };

  if (flatten) {
    if (typeof flatten === 'string' && newDataToFlat[flatten]) {
      delete newDataToFlat[flatten];

      newDataToFlat = {
        ...newDataToFlat,
        ...dataToFlat[flatten],
      };
    }

    if (Array.isArray(flatten)) {
      flatten.forEach(key => {
        if (newDataToFlat[key]) {
          delete newDataToFlat[key];

          newDataToFlat = {
            ...newDataToFlat,
            ...dataToFlat[key],
          };
        }
      });
    }
  }

  return newDataToFlat;
};

export const useRequest = (options = {}) => {
  const [data, setData] = useState(options.data || []);
  const [errors, setErrors] = useState(options.errors || {});
  const [loading, setLoading] = useState(options.loading || false);

  const request = async fn => {
    const { flatten = {} } = options;

    setLoading(true);

    try {
      const { data = options.data || [] } = await fn;

      setData(flat(flatten.data, data));

      return data;
    } catch ({ response = {} }) {
      setErrors(flat(flatten.errors, data));

      return response;
    } finally {
      setLoading(false);
    }
  };

  return {
    request,
    data,
    errors,
    loading,
  };
};
