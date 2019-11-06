export function useRequest<T>(options?: {
  data?: any;
  errors?: { [key: string]: string };
}): {
  request: (fn: any, options?: { concat?: boolean | string }) => Promise<T>;
  data: T;
  errors: { [key: string]: string };
  loading: boolean;
};
