---
id: Result
title: Result
sidebar_label: Result
---

Result describes an http response. Results are translated into actual http responses when the http app is bound to the express app instance.

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
| ```Result<A extends body = any>```   | Represents a http response. |
| ```Cookie```   | Represents a http response. |
| ```resultAction```   | Represents a http response. |
| ```httpStatus```   | Represents a http response. |

| Functions      | Type |
| :---        |:---         |
| withCookies   | ```<A extends Result<any>>(cookies: Cookie[]) => (a: A) => A & { cookies: Cookie[]; ```     |
| clearCookies   | ```<A extends Result<any>>(cookies: ClearCookie[]) => (a: A) => A & { clearCookies:ClearCookie[];}```        |
| withContentType   | ```<A extends Result<any>>(contentType: string) => (a: A) => A & {contentType: string;}```        |
| withHeaders   | ```<A extends Result<any>>(headers: {[key: string]: string;}) => (a: A) => A & {headers: {[x: string]: string;};}```        |
| withAction   | ```<A extends Result<any>>(action: [resultAction, string] \ [resultAction, string, object]) => (a: A) => A & {action: [resultAction, string] \ [resultAction, string, object];}```        |