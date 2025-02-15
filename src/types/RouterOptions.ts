import { ErrorHandler } from './ErrorHandler'
import { IttyRouterOptions } from './IttyRouterOptions'
import { RequestHandler } from './RequestHandler'
import { ResponseHandler } from './ResponseHandler'

export type RouterOptions = {
  before?: RequestHandler<any>[]
  catch?: ErrorHandler
  finally?: ResponseHandler[]
} & IttyRouterOptions
