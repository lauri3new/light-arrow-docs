---
id: Arrow
title: Arrow
sidebar_label: Arrow
---

### Arrows

Arrows are data structures that describe asynchronous operations that can succeed with a result value R or fail with a value E that depends on some dependencies D. Practically many programs or parts of programs we write fit that description. For those familiar to functional programming, Arrows are a kind of ReaderTaskEither. Arrows have a discoverable 'fluent' chain-able API, similar to native Promises and Arrays. To see a list of the full API of an Arrow check out the 'Methods' table at the bottom of this page.

```ts
                                  Arrow<D, E, R>                                  
```

Arrows can be seen as useful wrappers around a function of type `(_:D) => Promise<Either<E, R>>`, that make working with such functions more convenient and providing lots of helper methods for composability. To convert existing data types to Arrows there are several `draw` functions provided that make this easier (see interoperability below).

**An example function `sendEmail` returning an Arrow, depending on a promise based emailService**
```ts
type HasEmailService = {
  emailService: {
    send: (email: string) => Promise<void>
  }
}

const sendEmail = (email: string) => Arrow<HasEmailService, Error, string>(async ({ emailService }) => {
  try {
    await emailService.send(email)
    return Right('sent succesfully')
  } catch (e) {
    return Left(e)
  }
})
```

### Error handling

Typically errors are thrown from within promises to represent failure cases, however these are mixed with runtime errors. Neither of these types are tracked in the type signature. We have to inspect the particular promise to understand what errors may be thrown from it. Arrows use the [Either data type](Either.md) to enable centralised type safe error handling. By tracking the error type we can know from the type signature how our program might fail and cover all cases in the error handling function we pass to the run method (similiar to a catch at the end of a promise).

**Note**: in the examples below all of the types are inferred but are written out just for demonstration purposes.

```ts
const sendInvites: Arrow<{}, Error | string, void[]> = ...

sendInvites.run(
  {},
  () => console.log('success'),
  (error: string | Error) => {
    if (typeof error === 'string') {
      console.log('oops ', error)
    } else {
      console.log('doh', error.message)
    }
  }
)
```

### Referential transparency

Arrows won't actually perform any operation until the run method is called, this means that Arrows have the nice property of being referentially transparent. This means we can refactor expressions involving Arrows, such as calling a function returning an Arrow, and replacing them with the value returned without changing the meaning of the program. As it turns out by representing all side effects in our program, whether they are asynchronous or synchronous and failable or non-failable, as Arrows we can maintain referential transparency throughout our program making it easier to reason about.

Our program can compose to become one Arrow waiting to be executed through the run method, in which we provide dependencies and success, failure and exception handlers.

```ts
interface HasEmailService {
  emailService: {
    sendInvite: (email: string) => Arrow<{}, string, void>
  }
}

interface HasUserService {
  userService: {
    get: (id: number) => Arrow<{}, Error, User>
  }
}

const inviteUser = (id: number) => draw(({ userService }: HasUserService) => userService.get(id))
  .flatMap(({ email }) => draw(({ emailService }: HasEmailService) => emailService.sendInvite(email)))

const invites: Arrow<HasUserService & HasEmailService, Error | string, void[]> = sequence([
  inviteUser(1),
  inviteUser(2),
  inviteUser(3),
])
```

### Dependency injection

By delaying execution until the run method is called, Arrows provide a convenient type safe way to perform dependency injection as we can group all the dependencies of the program into a single object type and provide test and production implementations of these in the run method as we wish.

```ts
invites.runAsPromise({
  userService: mockUserService,
  emailService: mockEmailService
})

invites.runAsPromise({
  userService: productionUserService,
  emailService: productionEmailService
})
```


### Performance

Arrows are stack safe and perform similiarly to native promises under performance testing, but have all of the benefits listed above.

### Interoperability

There are a number of helper functions to convert existing types to Arrows, including basic values, functions, async functions. See these in the table Functions (create arrows from other types) below. Familiar helper functions such as `all` and `race` are provided as Arrow equivalents to `Promise.all` and `Promise.race`.

### Composability

Arrows are highly composable through their various methods listed below. The `orElse` and `andThen` methods are also provided as functions that accept n number of Arrows, `orElse` can be used for 'horizontal' composition, such as building up the routes of a express App. `andThen` can be used for 'vertical' composition, such as changing the context of a request for example in an authorisation middleware where the user making the requests details are added to the context for use by subsequent middlewares. Some more combinators are included such as `retry` and `repeat`.

### Cancellation

Arrows support cancellation, `run` returns a cancel function enabling early termination of executing Arrows.


| Interface      | Description |
| :---        |:---         |
| ```Arrow<D, E, R>```   | Arrows are data types that describe asynchronous operations that can succeed with a result value R or fail with an error value E that require some dependencies D. |

| Methods      | Type | Description |
| :---        |:---         |:---         |
| map   | ```<R2>(f: (_:R) => R2) => Arrow<D, E, R2>``` | Returns an Arrow with the result value mapped by the function f. |
| flatMap  | ```<D2, E2, R2>(f: (_:R) => Arrow<D2, E2, R2>) => Arrow<D & D2, E\E2, R2>``` | Returns a new Arrow requiring the dependencies of the first Arrow & the second Arrow, by passing the result of the first Arrow to the function f. |
| leftMap   | ```<E2>(f: (_:E) => E2) => Arrow<D, E2, R>``` | Returns an Arrow with the error value mapped by the function f. |
| biMap   | ```<E2, R2>(f: (_:E) => E2, g: (_:R) => R2) => Arrow<D, E2, R2>```        | Returns an Arrow with the error value mapped by the function f, and the result value mapped by function g. |
| group   | ```<D2, E2, R2>(f:Arrow<Partial<D> & D2, E2, R2>) => Arrow<D & D2, E\E2, [A, B]>```        | Returns an Arrow with the result values in a tuple of the two grouped Arrows. |
| groupFirst   | ```<D2, E2, R2>(f:Arrow<Partial<D> & D2, E2, R2>) => Arrow<D & D2, E\E2, A>```        | Returns an Arrow with the first result value of the two grouped Arrows. |
| groupSecond   | ```<D2, E2, R2>(f:Arrow<Partial<D> & D2, E2, R2>) => Arrow<D & D2, E\E2, B>```        | Returns an Arrow with the second result value of the two grouped Arrows. |
| andThen   | ```<E2, R2>(f: Arrow<A, E2, R2>) => Arrow<D, E\E2, R2>```        | Provides the result of the first Arrow as the dependencies of the next Arrow, allowing 'start to end' composition. |
| orElse   | ```<D2, E2, R2>(f:Arrow<D2, E2, R2>) => Arrow<D & D2, E2, A\R2>```        | Returns an Arrow that will run the second arrow if the first fails. |
| flatMapF   | ```<D2, E2, R2>(f: (_:R) => (_:D2) => Promise<Either<E2, R2>>) => Arrow<D & D2, E\E2, R2>```        | Like flatmap but accepts a function returning a `Promise<Either>`. |
| groupF   | ```<D2, E2, R2>(f:Arrow<Partial<D> & D2, E2, R2>) => Arrow<D & D2, E\E2, [A, B]>```        |  Like group but accepts a function returning a `Promise<Either>`. |
| groupFirstF   | ```<D2, E2, R2>(f:Arrow<Partial<D> & D2, E2, R2>) => Arrow<D & D2, E\E2, A>```        | Like groupFirst but accepts a function returning a `Promise<Either>`. |
| groupSecondF   | ```<D2, E2, R2>(f:Arrow<Partial<D> & D2, E2, R2>) => Arrow<D & D2, E\E2, B>```        | Like groupSecond but accepts a function returning a `Promise<Either>`. |
| andThenF   | ```<E2, R2>(_:(_:R) => Promise<Either<E2, R2>>) => Arrow<D, E\E2, R2>```        | Like andThen but accepts a function returning a `Promise<Either>`. |
| orElseF   | ```<D2, E2, R2>(f:(_:D2) => Promise<Either<E2, R2>>) => Arrow<D & D2, E2, R\R2>```        | Like orElse but accepts a function returning a `Promise<Either>`. |

| Functions (create arrows from other types)    | Type | Description |
| :---        |:---         |:---         |
| Arrow   | ```<D, E, R>(f: (_:D) => Promise<Either<E, R>>): Arrow<D, E, R>```     | The default constructor for an Arrow. Create an Arrow using an async function returning an Either (Right for success, Left for error). |
| draw   | ```<D, D2, E, R>(f: (_:D) => Arrow<D2, E, R>): Arrow<D & D2, E, R>```     |
| drawAsync   | ```<D, D2, E, R>(f: (_:D) => Arrow<D2, E, R>): Arrow<D & D2, E, R>```     | Create an Arrow from an async function that wont fail. |
| drawFailableAsync   | ```<R, D = {}, E = Error>(a:(_:D) => Promise<R>):Arrow<D, E, R>```     | Create an Arrow from an async function that may fail with error type E. |
| drawFunction   | ```<R, D = {}>(a:(_:D) => R): Arrow<D, never, R>```     | Create an Arrow from a regular function that wont fail. |
| drawFailableFunction   | ```<R, D = {}, E = Error>(a:(_:D) => R): Arrow<D, E, R>```     | Create an Arrow from a regular function that may fail with error type E. |
| resolve   | ```<R, D = {}>(a: R): Arrow<D, never, R>```     | Create an Arrow from a value with the result type as the value type. |
| reject   | ```<E, D = {}>(a: E): Arrow<D, E, never>```     | Create an Arrow from a value with the error type as the value type. |
| drawNullable   | ```<R>(a: R\null\undefined): Arrow<{}, null, R>```     | Create an Arrow from a nullable value with either the error type as null or the result type as the value type, depending on if the value is null or not. |
| drawEither   | ```<E, R>(a:Either<E, R>):Arrow<{}, E, R>```     | Create an Arrow from an Either type. |

| Functions (combinators)      | Type | Description |
| :---        |:---         |:---         |
| sequence   | ```<D, E, R>(as: Arrow<D, E, R>[]): Arrow<D, E, R[]>```     | Convert a list of arrows into a single Arrow returning a list of result (R) values.  |
| group   | ```<D2, E2, R2>(f:...Arrow<Partial<D> & D2, E2, R2>) => Arrow<D & D2, E\E2, [R, R2]>```   | Group many Arrows into a single Arrow returning an n tupe of result (R) values.  |
| orElse   | ```<D2, E2, R2>(f:...Arrow<D2, E2, R2>) => Arrow<D & D2, E2, R\R2>```     | Returns an Arrow that will return the result value of the first succesful Arrow.  |
| retry   | ```(n: number) => <D, E, R>(a: Arrow<D, E, R>): Arrow<D, E, R>```     | Returns an Arrow that will repeat the operation and returns with the result value of the last Arrow.  |
| repeat   | ```(n: number) => <D, E, R>(a: Arrow<D, E, R>): Arrow<D, E, R>```     | Returns an Arrow that will repeat the operation until first succesful run.  |
| all   | ```(n: number) => <D, E, R>(a: Arrow<D, E, R>[]): Arrow<D, E, R[]>```     | Similiar to `Promise.all`, returns an Arrow that will return with an array of R values, if an Arrow rejects then all other Arrows waiting to return are cancelled.  |
| race   | ```(n: number) => <D, E, R>(a: Arrow<D, E, R>[]): Arrow<D, E, R>```     | Similiar to `Promise.race`, Returns an Arrow that will return with the R value of the first arrow that succeeds, the other Arrows are cancelled.  |

| Utility types      | Type | Description |
| :---        |:---         |:---         |
| ArrowsRight   | ```Arrow<D, E, R>((_:D) => Promise<Either<E, R>>): Arrow<D, E, R>```     | Extract the result (Right) type of the given Arrow type. |
| ArrowsLeft   | ```Arrow<D, E, R>((_:D) => Promise<Either<E, R>>): Arrow<D, E, R>```     | Extract the error (Left) type of the given Arrow type. |
| ArrowsDepedencies   | ```Arrow<D, E, R>((_:D) => Promise<Either<E, R>>): Arrow<D, E, R>```     | Extract the dependencies D type of the given Arrow type. |
