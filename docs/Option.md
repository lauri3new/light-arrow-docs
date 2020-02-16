---
id: Option
title: Option
sidebar_label: Option
---

Option represents a value of type A that may be present or absent.

```ts
interface Option<A> {
  _tag: string
  get: () => A | null
  map:<B>(f:(_: A) => B) => Option<B>
  getOrElse:<B>(_:B) => A | B
  flatMap:<B>(f:(_: A) => Option<B>) => Option<B>
  orElse:<B>(_: Option<B>) => Option<A> | Option<B>
  filter:(f:(_:A) => boolean) => Option<A>
  match:<B, C>(f:(_:A) => B, g:() => C) => B | C
}
```

Example usage

```ts
import { Some } from 'light-fp/dist/Option'

const divideByZero = (a: number) => {
  if (a === 0) return None()
  return Some(a / 0)
}

const example = (n: number) => divideByZero(n)
  .map(n => n + 1)
  .flatMap(divideByZero)
```

| Interfaces & Types      | Description |
| :---        |:---         |
| ```Option<A>```   | Represents a value that may or may not be present     |

| Functions      | Description |
| :---        |:---         |
| Some   | ```Some<A>(a: A): Option<A>```     |
| None   | ```None<never>(a: never): Option<never>```        |
| isNone   | ```isNone = <A>(a: Option<A>): a is Option<A>```        |
| isSome   | ```isSome = <A>(a: Option<A>): a is Option<A>```        |
| fromNullable   | ```fromNullable = <A>(a: A or Nullable)```        |