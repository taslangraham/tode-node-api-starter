// Interface of the response returned by service methods
export interface ServiceReponse<T> {
  success: boolean;
  errorCode?: string;
  errorMessage?: string;
  data?: T;
}

export interface EndpointResponse extends ServiceReponse<any> {
}
export interface Lookup<R = unknown> {
  [key: string]: R;
}

export const Base10 = 10;
