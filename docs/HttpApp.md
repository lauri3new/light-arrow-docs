---
id: HttpApp
title: HttpApp
sidebar_label: HttpApp
---

Light-arrow provides bindings for writing type safe http apps. Instead of using native response methods we can instead describe the http response using a [Result data type](Result.md).

An HttpApp is simply a ```(ctx: Context) => Promise<Result>```. To help with type safety and composability we can define HttpRoutes as ```Arrow<Context, notFound | Result, Result>``` and then use the seal function, providing handlers for 'not found' and exception cases. We can then bind an HttpApp to an express instance using the bindApp function, providing any dependencies the Arrows require at that time if we want.

```ts
interface Context {
  req: Request
}
```

We can express our whole express app using Arrows. Middlewares can be defined as ```Arrow<A, Result, B>``` where A and B extend the context. Multiple middlewares can be stacked together in a type safe manner using the `andThen` function. By defining our middleware this way we can expand and transform the context in a composable and type safe way, for example attaching services or authorisation data to the context.

**An example Middleware**
```ts
const authorizationMiddleware: Arrow<Context, Result, {
  loggedIn: boolean;
  req: Request;
}> = draw((ctx: Context) => {
  if (ctx.req.headers.authorization) {
    return succeed({ ...ctx, loggedIn: true })
  } else {
    return fail(Unauthorised({}))
  }
})
```

Handlers can be written as ```Arrow<A, Result, Result>``` where A is inferred from the middlewares. HttpRoutes are then Arrows of Type ```Arrow<A, notFound \ Result, Result>```, and we can combine HttpRoutes together (similar to how we would use an express Router) using the orElse function.

**An example HttpRoute**
```ts
const getUsers: Arrow<{
  loggedIn: boolean;
  req: Request;
}, NotFound, Result> = get('/users')
  .andThen(draw((ctx: Context) => ctx.services.getUsers()))
```

**Multiple routes and middlewares combined**
```ts
const routes: Arrow<Context, NotFound | Result, Result> = orElse(
  get('/healthcheck').map(() => OK({})),
  authorizationMiddleware.andThen(
    orElse(
      getUsers,
      getTimeline
    )
  )
)
```

**Converting HttpRoutes to an HttpApp**
```ts
const httpApp = seal(
  routes,
  () => NotFound({
    message: 'not found'
  }),
  () => InternalServerError({
    message: 'oops something went wrong'
  })
)
```

**Binding our HttpApp to an express instance**
```ts
const expressInstance = express()
const { app } = bindApp(httpApp)(expressInstance)

app.listen(8080)
```

Once we have all the routes described we can convert the HttpRoutes to an HttpApp using the seal function, providing functions for converting the notFound type and runtime exceptions into http Results. We can then use the bindApp function to attach our httpApp to an express application instance and inject dependencies.


| Names (types)      | Type | Description |
| :---        |:---         |:---         |
| ```<Context>```   | ```{ req: Request }``` | Context of a request, we can add properties into the context. |
| ```NotFound```   | ```{ path: string, method: string }``` | NotFound returned from a filter Arrow (get, post, patch, put, del, options) as the failure case.  |
| ```HttpMethods```   | ```enum of http methods``` | http methods GET \ POST \ PATCH \ PUT \ DELETE \ OPTIONS |
| ```HttpRoutes```   | ```<A extends Context = Context> = Arrow<A, NotFound\Result, Result> \ Arrow<A, NotFound, Result>``` | Arrows that returns a http Result that is translated into an response or fails with a NotFound. |
| ```HttpApp```   | ```<A extends Context = Context> = (ctx: A) => Promise<Result>``` | HttpApps are made by 'sealing' HttpRoutes using the seal functions, where handlers for NotFound and exceptions are added. |

| Functions       | Description |
| :---        |:---         |
| get, post, patch, put, del, options   |  functions that return an Arrow that will filter the matching of an incoming request by method and a supplied path string, returning an Arrow of type ```Arrow<A, notFound, A & { params: B }>``` where A extends Context  |
| bindApp   | used to attach the http app to an express app instance     |
| seal   | converts HttpRoutes into an HttpApp by providing handlers for NotFound and exceptions are added   |
| runResponse   | an internal function used by bindApp ```runResponse(res: Response, result: Result): void``` that translates a result into an http response using the express response object       |