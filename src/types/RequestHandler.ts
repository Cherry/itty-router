import { IRequest } from './IRequest'

export type RequestHandler<R = IRequest, Args extends Array<any> = any[]> =
  (request: R, ...args: Args) => any
