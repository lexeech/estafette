export function concatData<T>(concat: boolean | string, data: T, response: T) {
  if (typeof concat === 'string') {
    return { ...response, [concat]: [...(data[concat] || []), ...(response[concat] || [])] };
  }

  if (Array.isArray(data) && Array.isArray(response)) {
    return [...data, ...response];
  }

  return response;
}
