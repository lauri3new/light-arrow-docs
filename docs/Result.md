---
id: Result
title: Result
sidebar_label: Result
---

Either represents a computation that can succeed with a value A or fail with a value E.

```ts
export interface Result<A extends object | Buffer | string | undefined = any> {
  contentType?: string
  body: A
  status: httpStatus
  headers?: { [key: string]: string }
  cookies?: Cookie[]
  clearCookies?: Cookie[]
  action?: [ resultAction, string] | [ resultAction, string, object] | [ resultAction, string, object, (error: any, html: any) => void ]
  map: <B extends object | Buffer | string | undefined = any>(f: (_: Result<A>) => Result<B>) => Result<B>
}
```

Example usage

```ts
import { Result, httpStatus, OK } from 'Light-Arrow/server/result'

// construct succesful result with status code 200
const result = OK({ data, object })
const resultTwo = Result(httpStatus.OK, { data, object )

```

| Interfaces and enums      | Description |
| :---        |:---         |
| ```Result<A extends object | Buffer | string | undefined = any>```   | Represents a http response. |
| ```Cookie```   | Represents a http response. |
| ```resultAction```   | Represents a http response. |
| ```httpStatus```   | Represents a http response. |

| Functions      | Type |
| :---        |:---         |
| Either   | ```Either<E, A>```     |
| Right   | ```<A>(a: A):Right<A>```        |
| Left   | ```<A>(a: A):Left<A>```        |