import { useState } from 'react';

const flat = (flatten, dataToFlat = {}) => {
  let newDataToFlat = { ...dataToFlat };

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

      if (flatten.data) {
        const flattenedData = flat(flatten.data, data);

        setData(flattenedData);

        return flattenedData;
      }

      setData(data);

      return data;
    } catch ({ response = {} }) {
      if (flatten.errors) {
        const flattenedResponse = flat(flatten.errors, response);

        setData(flattenedResponse);

        return flattenedResponse;
      }

      setErrors(response);

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
