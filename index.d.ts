export function useRequest<T>(options?: {
  data?: any;
  errors?: { [key: string]: string };
  flatten?: {
    data?: string | string[];
    errors?: string | string[];
  };
}): {
  request: (fn: any) => Promise<T>;
  data: T;
  errors: { [key: string]: string };
  loading: boolean;
};
