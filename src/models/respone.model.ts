export class ResponseModel<T> {
  meta?: any;
  data: T;
  link?: {
    prev: string;
    next: string;
  };
}
