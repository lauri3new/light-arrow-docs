---
id: Either
title: Either
sidebar_label: Either
---

:::info
It should be noted that Eithers are not currently stack safe, I am working on a stack safe implementation
:::

Either represents a computation that can succeed with a value A or fail with a value E.

```ts
export interface Either<E, A> {
  _tag: string
  get: () => E | A
  map:<B>(f:(_: A) => B) => Either<E, B>
  leftMap:<E2>(f:(_: E) => E2) => Either<E2, A>
  biMap:<E2, B>(f:(_:E) => E2, g:(_:A) => B) => Either<E2, B>
  flatMap:<E2, B>(f:(_: A) => Either<E | E2, B>) => Either<E | E2, B>
  match:<B, C>(f:(_:E) => B, g:(_:A) => C) => B | C
}

export type Right<A> = Either<never, A>
export type Left<E> = Either<E, never>
```

Example usage

```ts
import { Either, Right, Left } from 'Light-Arrow/either'

const safeDivide = (n: number, n2: number): Either<string, number> => (
  n2 === 0 ? Left('quotient was 0') : Right(n / n2)
)

const myResult = safeDivide(Math.random(), Math.random() - 0.5)
  .map(n => n * 100 - 56)
  .flatMap(n => safeDivide(n, Math.random() - 0.5))
  .leftMap(s => `This computation failed because: ${s}`)
  .match(
    failMessage => console.log(failMessage),
    result => console.log(result)
  )

```

| Interface      | Description |
| :---        |:---         |
| ```Either<E, A>```   | Either represents a computation that can succeed with a value A or fail with a value E. |

| Functions      | Type |
| :---        |:---         |
| Either   | ```Either<E, A>```     |
| Right   | ```<A>(a: A):Right<A>```        |
| Left   | ```<A>(a: A):Left<A>```        |