---
id: Either
title: Either
sidebar_label: Either
---

Either represents a computation that can succeed with a value R or fail with a value E. Either allows chaining, via the flatMap method, of successive computations that may fail. This enables centralised error handling in a typesafe way.

```ts
export interface Either<E, R> {
  _tag: string
  get: () => E | R
  map:<R2>(f:(_: R) => R2) => Either<E, R2>
  leftMap:<E2>(f:(_: E) => E2) => Either<E2, R>
  biMap:<E2, R2>(f:(_:E) => E2, g:(_:R) => R2) => Either<E2, R2>
  flatMap:<E2, R2>(f:(_: R) => Either<E | E2, R2>) => Either<E | E2, R2>
  match:<R2, E2>(f:(_:E) => E2, g:(_:R) => R2) => E2 | R2
}

export type Right<R> = Either<never, R>
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
| ```Either<E, R>```   | Either represents a computation that can succeed with a value R or fail with a value E. |

| Functions      | Type |
| :---        |:---         |
| Either   | ```Either<E, R>```     |
| Right   | ```<R>(a: R):Right<R>```        |
| Left   | ```<E>(a: E):Left<E>```        |