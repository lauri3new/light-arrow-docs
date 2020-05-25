---
id: HttpApp
title: HttpApp
sidebar_label: HttpApp
---

An HttpApp is simply ```(ctx: Context) => Promise<Result>```. To help with type safety and composability we can define HttpRoutes as ```Arrow<A, notFound | Result, Result>``` where A extends Context. Middlewares can be defined as ```Arrow<A, notFound | Result, Context>```. We can combine httpRoutes together (similar to how we would use an express Router) using the Arrow combine function in a type safe manner. We can also compose middleware together using the Arrow ```andThen``` method.

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