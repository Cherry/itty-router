import {
  Router,               // the router itself
  IRequest,             // lightweight/generic Request type
  RouterType,           // generic Router type
  Route,                // generic Route type
} from './itty-router'

// declare a custom Router type with used methods
interface CustomRouter extends RouterType {
  puppy: Route,
}

// declare a custom Request type to allow request injection from middleware
type RequestWithAuthors = {
  authors?: string[]
} & IRequest

// middleware that modifies the request
const withAuthors = (request: IRequest) => {
  request.authors = ['foo', 'bar']
}

const router = Router({ base: '/' })

router
  .all('*', () => {})
  .get<CustomRouter>('/authors', withAuthors, (request: RequestWithAuthors) => {
    return request.authors?.[0]
  })
  .puppy('/:name', (request) => {
    const name = request.params.name
    const foo = request.query.foo
  })

// CF ES6 module syntax
export default {
  fetch: (request, env, context) => router.handle(request, env, context)
}

// test traditional eventListener Worker syntax
addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(router.handle(event.request))
})
