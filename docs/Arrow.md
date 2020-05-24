---
id: Arrow
title: Arrow
sidebar_label: Arrow
---

Arrows are data structures that describe asynchronous operations that can succeed with a value Sout or fail with a value E that depends on some input state S. Arrows won't actually perform any operation until the run method is called, this means that Arrows have the nice property of being referentially transparent. By delaying execution until the run method is called, Arrows provide a way to perform dependency injection as we can group all the dependencies of the program into a single object type and provide test and production implementations of these in the run method as we wish.

As well as the Arrow data type this module exposes helper functions for building type safe http apps using the express framework. Please see this section of the documentation for more detail.

For functional programmers this is a kind of kleisli datatype with immutable methods, with some additional constructor and combinator functions.

```ts
export interface Arrow<S, E, Sout> {
  __val: (_:S) => Promise<Either<E, Sout>>
  map: <S2out>(f: (_:Sout) => S2out) => Arrow<S, E, S2out>
  combineA: (f:Arrow<S, E, Sout>) => Arrow<S, E, Sout>
  leftMap: <E2>(f: (_:E) => E2) => Arrow<S, E2, Sout>
  flatMap: <E2, S2Out>(f: (_:Sout) => Arrow<S, E | E2, S2Out>) => Arrow<S, E | E2, S2Out>
  andThen: <E2, S2Out>(_: Arrow<Sout, E2, S2Out>) => Arrow<S, E | E2, S2Out>
  andThenMerge: <E2, S2Out>(_: Arrow<Sout, E2, S2Out>) => Arrow<S, E | E2, Sout & S2Out>
  andThenF: <E2, S2Out>(f: (_:Sout) => Promise<Either<E, S2Out>>) => Arrow<S, E | E2, S2Out>
  runP: (
    context: S
  ) => Promise<Sout>
  run: <A, B, C>(
    context: S,
    f: (_:Sout) => A,
    g: (_:E) => B,
    j: (_?: Error) => C
  ) => Promise<A | B | C>
}
```

Example usage

```ts
import { ofContext } from 'Light-Arrow'

interface UserService {
  getUser: () => Promise<User>
}

const arrow = ofContext<UserService>()

```

| Interface      | Description |
| :---        |:---         |
| ```Arrow<S, E, Sout>```   | Arrows are data types that describe asynchronous operations that can succeed with a value Sout or fail with a value E that depends on some input state S |

| Functions      | Type |
| :---        |:---         |
| Arrow   | ```Arrow<S, E, Sout>((_:S) => Promise<Either<E, Sout>>): Arrow<S, E, Sout>```     |
| resolve   | ```<A>(a: A):Arrow<any, never, A>```        |
| reject   | ```<A>(a: A):Arrow<any, A, never>```        |
| ofContext   | ```<A>():Arrow<A, never, A>```        |
| fromPromise   | ```<A, E, C = any>(a: Promise<A>):Arrow<C, E, A>```        |
| fromFailablePromise   | ```<A, E, C = any>(a: Promise<A>):Arrow<C, E, A>```        |
| fromEither   | ```<E, A, C = any>(a:Either<E, A>):Arrow<C, E, A>```        |
| fromPEither   | ```<E, A, C = any>(a:Promise<Either<E, A>>):Arrow<C, E, A>```        |
| fromKP   | ```<S, A>(a:(_:S) => Promise<A>):Arrow<S, never, A>```        |
| fromFailableKP   | ```<S, E, A>(a:(_:S) => Promise<A>):Arrow<S, E, A>```        |
| sequence   | ```<A, B, C>(as: Arrow<A, B, C>[]): Arrow<A, B, C[]>```        |
| combine   | ```<A, B, C>(...as: Arrow<A, B, C>[]): Arrow<A, B, C>```        |
| retry   | ```(n: number) => <A, B, C>(a: Arrow<A, B, C>): Arrow<A, B, C>```        |