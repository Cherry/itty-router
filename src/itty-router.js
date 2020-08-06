const Router = (options = {}) =>
  new Proxy(options, {
    get: (obj, prop, receiver) => prop === 'handle'
      ? async request => {
          for ([route, handlers] of obj[(request.method || 'GET').toLowerCase()] || []) {
            if (match = (url = new URL(request.url)).pathname.match(route)) {
              request.params = match.groups
              request.query = Object.fromEntries(url.searchParams.entries())

              for (handler of handlers) {
                if ((response = await handler(request)) !== undefined) return response
              }
            }
          }
        }
      : (route, ...handlers) =>
          (obj[prop] = obj[prop] || []).push([
            `^${(options.base || '')+route
              .replace(/(\/?)\*/g, '($1.*)?')
              .replace(/:([^\/\?]+)(\?)?/g, '$2(?<$1>[^/]+)$2') // works
              // .replace(/:([^\/\?]+(?:\.:)?)(\?)?/g, '$2(?<$1>[^/]+)$2')
            }\/?$`,
            handlers
          ]) && receiver
  })

module.exports = { Router }
