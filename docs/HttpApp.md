---
id: HttpApp
title: HttpApp
sidebar_label: HttpApp
---

Either represents a computation that can succeed with a value A or fail with a value E.

```ts
export interface Either<E, A> {
  _tag: string
  get: () => E | A
  leftMap:<B>(f:(_: E) => B) => Either<B, A>
  map:<B>(f:(_: A) => B) => Either<E, B>
  flatMap:<EE, B>(f:(_: A) => Either<E | EE, B>) => Either<E | EE, B>
  match:<B, C>(f:(_:E) => B, g:(_:A) => C) => B | C
}

export type Right<A> = Either<never, A>
export type Left<E> = Either<E, never>
```

Example usage

```ts
import { Either, Right, Left } from 'Light-Arrow/either'

```

| Interface      | Description |
| :---        |:---         |
| ```Either<E, A>```   | Either represents a computation that can succeed with a value A or fail with a value E. |

| Functions      | Type |
| :---        |:---         |
| Either   | ```Either<E, A>```     |
| Right   | ```<A>(a: A):Right<A>```        |
| Left   | ```<A>(a: A):Left<A>```        |