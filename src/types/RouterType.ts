import { ErrorHandler } from './ErrorHandler'
import { IRequest } from './IRequest'
import { IttyRouterType } from './IttyRouterType'
import { RequestHandler } from './RequestHandler'
import { ResponseHandler } from './ResponseHandler'

export type RouterType<R = IRequest, Args extends any[] = any[], ResponseType = any> = {
  before?: RequestHandler<any>[]
  catch?: ErrorHandler
  finally?: ResponseHandler[]
} & IttyRouterType<R, Args, ResponseType>
