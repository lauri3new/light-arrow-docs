---
id: HttpApp
title: HttpApp
sidebar_label: HttpApp
---

Light-arrow provides bindings for writing type safe http apps. Bindings are provided for TaskEither and Arrow datatypes. Instead of using native response methods we can instead describe the http response using a Result datatype - see https://lauri3new.github.io/light-arrow-docs/docs/Result.

Please note that all functions described in this doc are also provided for TaskEither.
An HttpApp is simply ```(ctx: Context) => Promise<Result>```. To help with type safety and composability we can define HttpRoutes as ```<A extends Context>(ctx: Context) => Arrow<A, notFound | Result, Result>``` where A extends Context.

Middlewares can be defined as ```<A extends Context>(ctx: Context) => Arrow<A, notFound | Result, Context>```. We can combine httpRoutes together (similar to how we would use an express Router) using the Arrow combineK function in a type safe manner. We can also compose middleware together and with handler functions using the Arrow composeK method. Once we have all the routes described we can convert the HttpRoutes to an HttpApp using the seal function, providing functions for converting the notFound type and runtime exceptions into http Results.

Example usage

```ts

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