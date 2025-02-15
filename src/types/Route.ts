import { IRequest } from './IRequest'
import { IttyRouterType } from './IttyRouterType'
import { RequestHandler } from './RequestHandler'

export type Route<
  R = IRequest,
  A extends Array<any> = any[],
> = <
  RequestType = R,
  Args extends Array<any> = A,
>(
  path: string,
  ...handlers: RequestHandler<RequestType, Args>[]
) => IttyRouterType<RequestType, Args>
