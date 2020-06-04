---
id: Arrow
title: Arrow
sidebar_label: Arrow
---

:::info
It should be noted that Arrows are not currently stack safe, I am working on a stack safe implementation
:::

Arrows are data structures that describe asynchronous operations that can succeed with a value A or fail with a value E that depends on some input context Ctx. Arrows won't actually perform any operation until the run method is called, this means that Arrows have the nice property of being referentially transparent. By delaying execution until the run method is called, Arrows provide a way to perform dependency injection as we can group all the dependencies of the program into a single object type and provide test and production implementations of these in the run method as we wish, see the example below.

```ts
interface Arrow<Ctx, E, A> {
  __val: (_:Ctx) => Promise<Either<E, A>>
  map: <B>(f: (_:A) => B) => Arrow<Ctx, E, B>
  leftMap: <E2>(f: (_:E) => E2) => Arrow<Ctx, E2, A>
  biMap: <E2, B>(f: (_:E) => E2, g: (_:A) => B) => Arrow<Ctx, E2, B>
  flatMap: <E2, B>(f: (_:A) => Arrow<Ctx, E | E2, B>) => Arrow<Ctx, E | E2, B>
  flatMapF: <E2, B>(f: (_:A) => (_:Ctx) => Promise<Either<E2, B>>) => Arrow<Ctx, E | E2, B>
  andThen: <E2, B>(_: Arrow<A, E2, B>) => Arrow<Ctx, E | E2, B>
  andThenF: <E2, B>(f: (_:A) => Promise<Either<E2, B>>) => Arrow<Ctx, E | E2, B>
  andThenMerge: <E2, B>(_: Arrow<A, E2, B>) => Arrow<Ctx, E | E2, A & B>
  combine: (f:Arrow<Ctx, E, A>) => Arrow<Ctx, E, A>
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

interface hasDb {
  db: db
}

interface hasEmailService {
  emailService: {
    send: Promise<string>
  }
}

interface userService: {
  getById: <A extends hasDb>(id: number) => Arrow<A, string, User>
  getFriendsOf: <A extends hasDb>(email: string) => Arrow<A, string, User[]>
  emailInvite: <A extends hasDb & hasEmailService>(emails: string[]) => Arrow<A, string, string>
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

// we can now run our program at our leisure with test or production implementations of our dependencies
// test
inviteFriendsOfUsers
  .runP({
    db: mockDb,
    emailService: mockEmailService
  })

// production
inviteFriendsOfUsers
  .runP({ db, emailService })

```

| Interface      | Description |
| :---        |:---         |
| ```Arrow<Ctx, E, A>```   | Arrows are data types that describe asynchronous operations that can succeed with a value A or fail with a value E that require some dependencies S. |

| Functions      | Type |
| :---        |:---         |
| Arrow   | ```Arrow<Ctx, E, A>((_:Ctx) => Promise<Either<E, A>>): Arrow<Ctx, E, A>```     |
| resolve   | ```<A>(a: A):Arrow<any, never, A>```        |
| reject   | ```<A>(a: A):Arrow<any, A, never>```        |
| ofContext   | ```<A>():Arrow<A, never, A>```        |
| fromPromise   | ```<A, E, C = any>(a: Promise<A>):Arrow<C, E, A>```        |
| fromFailablePromise   | ```<A, E, C = any>(a: Promise<A>):Arrow<C, E, A>```        |
| fromEither   | ```<E, A, C = any>(a:Either<E, A>):Arrow<C, E, A>```        |
| fromPEither   | ```<E, A, C = any>(a:Promise<Either<E, A>>):Arrow<C, E, A>```        |
| fromKP   | ```<Ctx, A>(a:(_:Ctx) => Promise<A>):Arrow<Ctx, never, A>```        |
| fromFailableKP   | ```<Ctx, E, A>(a:(_:Ctx) => Promise<A>):Arrow<Ctx, E, A>```        |
| sequence   | ```<A, B, C>(as: Arrow<A, B, C>[]): Arrow<A, B, C[]>```        |
| combine   | ```<A, B, C>(...as: Arrow<A, B, C>[]): Arrow<A, B, C>```        |
| retry   | ```(n: number) => <A, B, C>(a: Arrow<A, B, C>): Arrow<A, B, C>```        |