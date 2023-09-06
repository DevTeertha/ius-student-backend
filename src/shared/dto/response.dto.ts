export class ResponseDTO<T = any> {
  status: boolean;
  message: string;
  data: T;
}
