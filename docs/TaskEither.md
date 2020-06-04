---
id: TaskEither
title: TaskEither
sidebar_label: TaskEither
---

:::info
It should be noted that TaskEithers are not currently stack safe, I am working on a stack safe implementation
:::

TaskEithers are data structures that describe asynchronous operations that can succeed with a value A or fail with a value E. TaskEithers won't actually perform any operation until the run method is called, this means that TaskEithers have the nice property of being referentially transparent. By delaying execution until the run method is called.

```ts
interface TaskEither<E, A> {
  __val: () => Promise<Either<E, A>>
  map: <B>(f: (_:A) => B) => TaskEither<E, B>
  leftMap: <E2>(f: (_:E) => E2) => TaskEither<E2, A>
  biMap: <E2, B>(f: (_:E) => E2, g: (_:A) => B) => TaskEither<E2, B>
  flatMap: <E2, B>(f: (_:A) => TaskEither<E | E2, B>) => TaskEither<E | E2, B>
  flatMapF: <E2, B>(f: (_:A) => () => Promise<Either<E2, B>>) => TaskEither<E | E2, B>
  andThen: <E2, B>(_: TaskEither<A, E2, B>) => TaskEither<E | E2, B>
  andThenF: <E2, B>(f: (_:A) => Promise<Either<E2, B>>) => TaskEither<E | E2, B>
  andThenMerge: <E2, B>(_: TaskEither<A, E2, B>) => TaskEither<E | E2, A & B>
  combine: <E2, B>(f:TaskEither<E2, B>) => TaskEither<E2, A | B>
  runP: (
    context: Ctx
  ) => Promise<A>
  run: <B, E2, ER>(
    context: Ctx,
    f: (_:A) => B,
    g: (_:E) => E2,
    j: (_?: Error) => ER
  ) => Promise<B | E2 | ER>
}
```

Example usage

```ts

import { TaskEither, sequence } from 'light-arrow/taskEither'

interface userService: {
  getById: (id: number) => TaskEither<string, User>
  getFriendsOf: (email: string) => TaskEither<string, User[]>
  emailInvite: (emails: string[]) => TaskEither<string, string>
}

const inviteFriendsOfUser = (id: number) => userService.getById(id)
  .flatMap((user) => userService.getFriendsOf(user.email))
  .flatMap((usersEmails) => userService.emailInvite(usersEmails))

const inviteFriendsOfUsers = sequence([
  inviteFriendsOfUser(1),
  inviteFriendsOfUser(5),
  inviteFriendsOfUser(7)
])
// no side effects performed yet, we have just described what we are going to do

// run as promise
inviteFriendsOfUsers
  .runP()

```

| Interface      | Description |
| :---        |:---         |
| ```TaskEither<E, A>```   | TaskEithers are data types that describe asynchronous operations that can succeed with a value A or fail with a value E. |

| Functions      | Type |
| :---        |:---         |
| TaskEither   | ```TaskEither<E, A>(() => Promise<Either<E, A>>): TaskEither<E, A>```     |
| resolve   | ```<A>(a: A):TaskEither<never, A>```        |
| reject   | ```<A>(a: A):TaskEither<A, never>```        |
| ofContext   | ```<A>():TaskEither<never, A>```        |
| fromPromise   | ```<A, E>(a: Promise<A>):TaskEither<E, A>```        |
| fromFailablePromise   | ```<A>(a: Promise<A>):TaskEither<E, A>```        |
| fromEither   | ```<E, A>(a:Either<E, A>):TaskEither<E, A>```        |
| fromPEither   | ```<E, A>(a:Promise<Either<E, A>>):TaskEither<E, A>```        |
| fromKP   | ```<A>(a:() => Promise<A>):TaskEither<never, A>```        |
| fromFailableKP   | ```<E, A>(a:() => Promise<A>):TaskEither<E, A>```        |
| sequence   | ```<E, A>(as: TaskEither<E, A>[]): TaskEither<E, A[]>```        |
| combine   | ```<B, C>(...as: TaskEither<B, C>[]): TaskEither<B, C>```        |
| retry   | ```(n: number) => <B, C>(a: TaskEither<B, C>): TaskEither<B, C>```        |