import { RequestHandler } from './RequestHandler'
import { ResponseHandler } from './ResponseHandler'
import { RouterOptions } from './RouterOptions'

export type AutoRouterOptions = {
  missing?: RequestHandler
  format?: ResponseHandler
} & RouterOptions
