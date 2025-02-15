import { RequestHandler } from './RequestHandler'

export type RouteEntry = [
  httpMethod: string,
  match: RegExp,
  handlers: RequestHandler[],
  path?: string,
]
