# itty-router
[![minified + gzipped size](https://badgen.net/bundlephobia/minzip/itty-router)](https://bundlephobia.com/result?p=itty-router)
[![Build Status via Travis CI](https://travis-ci.org/kwhitley/itty-router.svg?branch=v0.x)](https://travis-ci.org/kwhitley/itty-router)  

It's an itty bitty router. Like... super tiny, with zero dependencies. For reals.

## Installation

```
yarn add itty-router
```

or if you've been transported back to 2017...
```
npm install itty-router
```

## Our Goals
- [x] have a simple express-like (or better) interface
- [x] have a chainable interface!
- [x] be tiny
- [x] be easy to use/implement
- [x] have as few dependencies as possible (ZERO)
- [x] have test coverage
- [x] have a README
- [x] have a way to release
- [ ] have pretty code (right...)
- [ ] handle all the basics of routing within a serverless function
- [ ] be platform agnostic (or handle the responses of the major platforms)

## Example
```js
import { Router } from 'itty-router'

// create a Router
const router = Router()

// basic GET routs
router.get('/todos/:id', console.log)
  
// first match always wins, so be careful with order of registering routes
router
  .get('/todos/oops', () => console.log('you will never see this'))
  .get('/chainable', () => console.log('because why not?')) // this may be dropped to save characters...

// works with POST, DELETE, PATCH, etc
router.post('/todos', () => console.log('posted a todo'))

// ...or any other method we haven't yet thought of (thanks to @mvasigh implementation of Proxy <3)
router.future('/todos', () => console.log(`this caught using the FUTURE method!`))

// then handle a request!
router.handle({ method: 'GET', url: 'https://foo.com/todos/13?foo=bar' })
// {
//   method: 'GET',
//   url: 'http://foo.com/todos/13?foo=bar',
//   path: '/todos/13',
//   index: 0,
//   params: { id: '13' },
//   query: { foo: 'bar' }
// }
```

## Example Usage With Cloudflare Functions
```js
addEventListener('fetch', ({ request }) => router.handle(request))
```

## Testing & Contributing
1. fork repo
2. add code
3. run tests (and add your own) `yarn test`
4. submit PR
5. profit

## Entire Router Code (latest...)
```js
const Router = () => new Proxy({}, {
  get: (obj, prop) => prop === 'handle'
    ? (req) => {
      let { pathname: path, searchParams } = new URL(req.url)
      for (let [route, handler] of obj[req.method.toLowerCase()] || []) {
        if (hit = path.match(route)) {
          return handler({
            ...req,
            params: hit.groups,
            path,
            query: Object.fromEntries(searchParams.entries()) 
          })
        }
      }
    } 
    : (path, handler) => 
        (obj[prop] = obj[prop] || []).push([path.replace(/(\/:([^\/\?]+)(\?)?)/gi, '/$3(?<$2>[^\/]+)$3'), handler]) && obj
})
```

## Special Thanks
This repo goes out to my past and present colleagues at Arundo - who have brought me such inspiration, fun, 
and drive over the last couple years.  In particular, the absurd brevity of this code is thanks to a 
clever [abuse] of `Proxy`, courtesy of the brilliant [@mvasigh](https://github.com/mvasigh).  
This trick allows methods (e.g. "get", "post") to by defined dynamically by the router as they are requested, 
**drastically** reducing boilerplate.