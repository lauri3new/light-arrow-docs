---
id: HttpApp
title: HttpApp
sidebar_label: HttpApp
---

Light-arrow provides bindings for writing type safe http apps. Bindings are provided for TaskEither and Arrow datatypes. Instead of using native response methods we can instead describe the http response using a Result datatype - see https://lauri3new.github.io/light-arrow-docs/docs/Result.

Please note that all functions described in this doc are also provided for TaskEither - a ```TaskEither<E, A>``` can essentially be thought of as an ```Arrow<never, E, A>```.
An HttpApp is simply ```(ctx: Context) => Promise<Result>```. To help with type safety and composability we can define HttpRoutes as ```<A extends Context>(ctx: A) => Arrow<dependencies, notFound | Result, Result>```.

```ts
interface Context {
  req: Request
}
```

Middlewares can be defined as ```<A extends Context, B extends Context>(ctx: A) => Arrow<dependencies, notFound | Result, B>```. By defining our middleware this way we can expand and transform the context, for example attaching services or authorisation data to the context, in a type safe and composable manner. We can compose multiple middleware together and with handler functions using the composeK function. Handlers can be defined as ```<A extends Context>(ctx: A) => Arrow<dependencies, notFound | Result, Result<any>>```. We can combine httpRoutes together (similar to how we would use an express Router) using the Arrow combineK function in a type safe manner. 

Once we have all the routes described we can convert the HttpRoutes to an HttpApp using the seal function, providing functions for converting the notFound type and runtime exceptions into http Results. We can then use the bindApp function to attach our httpApp to an express application instance and inject dependencies.

Example usage

```ts
import { OK, BadRequest, NotFound, InternalServerError } from 'light-arrow/express/result'
import { get, seal, bindApp } from 'light-arrow/express/taskEither'
import { composeK, combineK } from 'light-arrow/express/taskEither'

const myRoute = composeK(get('/user'), (ctx) => ctx.services.getUsers()
  .biMap(
    (reason) => BadRequest({ reason }),
    (data) => OK({ data, object: 'User' })
  ))

// we can compose in a type safe manner different http routes and middlewares
const routes = composeK(myGlobalMiddlewares, combineK(
  myRoute,
  combineK(myLocalMiddleware, myOtherUserRoute),
  myOtherRoutes
))

const myHttpApp = seal(
  routes,
  (nf: notFound) => NotFound({}),
  (e?: Error) => InternalServerError({})
)

bindApp(myHttpApp)(expressInstance) // incoming expressInstance requests will use myHttpApp


```

| Interfaces and enums      | Description |
| :---        |:---         |
| ```<Context>```   | ```{ req: Request }``` |
| ```notFound```   | ```{ path: string, method: string }``` |
| ```HttpMethods```   | ```enum of http methods``` |
| ```httpRoutes```   | ```Arrow<A, notFound / Result, Result>``` where A extends Context |
| ```httpApp```   | ```(ctx: Context) => Promise<Result>``` 

| Functions      | Description |
| :---        |:---         |
| get, post, patch, put, delete   |  functions that filter the matching of an incoming request by method and a supplied path string, returning an Arrow of type ```Arrow<A, notFound, Result>``` where A extends Context  |
| bindApp   | used to attach the http app to an express app instance ```bindApp<A = {}>(a: Arrow<A & Context, Result, Result>,onError: (e?: Error) => Result,dependencies: A) => (expressApp: Express):void```        |
| runResponse   | internally used by bindApp ```runResponse(res: Response, result: Result): void``` sends an http response from a result using the express response object       |