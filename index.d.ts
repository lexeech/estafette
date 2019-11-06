interface RequestResponse<T> {
  request: (
    fn: { data: T },
    options?: {
      concat?: boolean | string;
    },
  ) => Promise<T>;
  data: T;
  errors: { [key: string]: string };
  loading: boolean;
}

interface RequestOptions {
  data?: any;
  errors?: { [key: string]: string };
}

export function useRequest<T>(options?: RequestOptions): RequestResponse<T>;
