// Interface of the response returned by service methods
export interface ServiceResponse<T> {
  success: boolean;
  errorCode?: string;
  errorMessage?: string;
  data?: T;
}

export interface EndpointResponse extends ServiceResponse<any> {
}
export interface Lookup<R = unknown> {
  [key: string]: R;
}

export const Base10 = 10;
