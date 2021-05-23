// Interface of the reponse turned by service menthods
export interface ServiceReponse<T> {
  success: boolean;
  data?: T;
}

export interface Lookup<R = unknown> {
  [key: string]: R;
}
