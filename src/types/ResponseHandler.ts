import { IRequest } from './IRequest'

export type ResponseHandler<
  ResponseType = Response,
  RequestType = IRequest,
  Args extends any[] = any[]
> = (
  response: ResponseType & any,
  request: RequestType & any,
  ...args: Args
) => any
