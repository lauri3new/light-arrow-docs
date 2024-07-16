---
id: Task
title: Task
sidebar_label: Task
---

### Tasks

Tasks are data structures that describe asynchronous operations that can succeed with a result value R or fail with a value E. Practically many programs or parts of programs we write fit that description. For those familiar to functional programming, Tasks are a kind of TaskEither. Tasks have a discoverable 'fluent' chain-able API, similar to native Promises and Arrays. To see a list of the full API of a Task check out the 'Methods' table at the bottom of this page.

```ts
                                  Task<E, R>                                  
```

Tasks can be seen as useful wrappers around a function of type `() => Promise<Either<E, R>>`, that make working with such functions more convenient and providing lots of helper methods for composability. The primary way of creating tasks is with `task`.

**The primary way of creating Tasks**
```ts
const myTask = task(({ right, left }) => Math.random() > 0.5 ? Promise.resolve(right(5)) : Promise.resolve(left(null)))
```
:::info Cancellation behaviour
It's worth noting that Cancellation behaviour can vary based on how the Task was created,c see the cancellation section below.
:::

**An example function `sendEmail` returning a Task, depending on a promise based emailService**
```ts
type HasEmailService = {
  emailService: {
    send: (email: string) => Promise<void>
  }
}

const sendEmail = (email: string) => Task<HasEmailService, Error, string>(async ({ right, left }) => {
  try {
    await emailService.send(email)
    return right('sent succesfully')
  } catch (e) {
    return left(e)
  }
})
```

### Error handling

Typically errors are thrown from within promises to represent failure cases, however these are mixed with runtime errors. Neither of these types are tracked in the type signature. We have to inspect the particular promise to understand what errors may be thrown from it. Tasks use the [Either data type](Either.md) to enable centralised type safe error handling. By tracking the error type we can know from the type signature how our program might fail and cover all cases in the error handling function we pass to the run method (similiar to a catch at the end of a promise).

**Note**: in the examples below all of the types are inferred but are written out just for demonstration purposes.

```ts
const sendInvites: Task<{}, Error | string, void[]> = ...

sendInvites.run(
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

Tasks won't actually perform any operation until the run method is called, this means that Tasks have the nice property of being referentially transparent. This means we can refactor expressions involving Tasks, such as calling a function returning a Task, and replacing them with the value returned without changing the meaning of the program. As it turns out by representing all side effects in our program, whether they are asynchronous or synchronous and failable or non-failable, as Tasks we can maintain referential transparency throughout our program making it easier to reason about.

Our program can compose to become one Task waiting to be executed through the run method, in which we provide success, failure and exception handlers. Alternative run methods are provided, `runAsPromiseResult` which returns a discriminated union with a tag for the return type (success, error, failure) and associated data, and `runAsPromiseResult` which unsafely tries to get the success value (this method can throw errors).


### Dependency injection

unlike Arrow, Task does not provide a native way to perform dependency injection so this is left up to you to do in your preferred way.


### Performance

Tasks are stack safe and perform similiarly to native promises under performance testing, but have all of the benefits listed above.

### Interoperability

There are a number of helper functions to convert existing types to Tasks, including basic values, functions, async functions. See these in the table Functions (create Tasks from other types) below. Familiar helper functions such as `all` and `race` are provided as Task equivalents to `Promise.all` and `Promise.race`.

### Composability

Tasks are highly composable through their various methods listed below. `orElse` can be used for 'horizontal' composition, such as building up the routes of a express App. Some more combinators are included such as `retry` and `repeat`.

### Cancellation

Tasks support cancellation. Cancellation behaviour can vary based on how the Task was created, Tasks created with `construct` when cancelled will cancel the ongoing operation and call the optionally specified tidy up function, its important to use `construct` over other ways of creating Tasks when this immediate cancellation is needed and/or if resources need to be tidied up (e.g. timeouts). Other Tasks will complete the current operation but cancel the remaining operations.



| Interface      | Description |
| :---        |:---         |
| ```Task<E, R>```   | Tasks are data types that describe asynchronous operations that can succeed with a result value R or fail with an error value E. |

| Methods      | Type | Description |
| :---        |:---         |:---         |
| map   | ```<R2>(f: (_:R) => R2) => Task<E, R2>``` | Returns a Task with the result value mapped by the function f. |
| flatMap  | ```<E2, R2>(f: (_:R) => Task<E2, R2>) => Task<E\E2, R2>``` | Returns a new Task by passing the result of the first Task to the function f. |
| leftMap   | ```<E2>(f: (_:E) => E2) => Task<E2, R>``` | Returns a Task with the error value mapped by the function f. |
| biMap   | ```<E2, R2>(f: (_:E) => E2, g: (_:R) => R2) => Task<E2, R2>```        | Returns a Task with the error value mapped by the function f, and the result value mapped by function g. |
| group   | ```<E2, R2>(f:E2, R2>) => Task<E\E2, [A, B]>```        | Returns a Task with the result values in a tuple of the two grouped Tasks. |
| groupFirst   | ```<E2, R2>(f:Task<E2, R2>) => Task<E\E2, A>```        | Returns a Task with the first result value of the two grouped Tasks. |
| groupSecond   | ```<E2, R2>(f:Task< E2, R2>) => Task< E\E2, B>```        | Returns a Task with the second result value of the two grouped Tasks. |
| groupParallel   | ```<E2, R2>(f:Task< E2, R2>) => Task< E\E2, [A, B]>```        | Returns a Task with the result values in a tuple of the two grouped Tasks where they will be run in parallel. |
| orElse   | ```<E2, R2>(f:Task<E2, R2>) => Task< E2, A\R2>```        | Returns a Task that will run the second Task if the first fails. |
| flatMapF   | ```<E2, R2>(f: (_:R) => (2) => Promise<Either<E2, R2>>) => Task< E\E2, R2>```        | Like flatmap but accepts a function returning a `Promise<Either>`. |
| groupF   | ```<E2, R2>(f:Task< E2, R2>) => Task< E\E2, [A, B]>```        |  Like group but accepts a function returning a `Promise<Either>`. |
| groupFirstF   | ```<E2, R2>(f:Task< E2, R2>) => Task< E\E2, A>```        | Like groupFirst but accepts a function returning a `Promise<Either>`. |
| groupSecondF   | ```<E2, R2>(f:Task< E2, R2>) => Task< E\E2, B>```        | Like groupSecond but accepts a function returning a `Promise<Either>`. |
| orElseF   | ```<E2, R2>(f:(2) => Promise<Either<E2, R2>>) => Task< E2, R\R2>```        | Like orElse but accepts a function returning a `Promise<Either>`. |
| bracket | ```(f: (_: R) => Task<never, any>): <E2, R2>(g: (_: R) => Task<E2, R2>) => Task<E\E2, R2>``` | bracket is useful for modelling effects that consume resources that are used and then released, it accepts a 'release' function that always executes after the second argument 'usage' function has executed, regardless of if it has failed or succeeded. The return type is a Task with the result type determined by the 'usage' function. |
| runAsPromise | ```() => Promise<{tag: 'failure', value: unknown} \| { tag: 'error', value: E } \| {tag: 'result', value: R }>``` |  Executes this Task, returning a promise with an object of the outcomes. |
| run | ```<R21, E2, F, D2>(mapResult: (_:R) => R21, mapError: (_:E) => E2, handleFailure?: (_: Error) => F, handleContext?: () => D2) => () => void``` | Executes this Task with the given handler functions, returning a cancel function. |
| runAsPromiseResult | ```(context: D) => Promise<R>``` | Unsafely executes this Task, returning a promise with the result or throwing an Error with an object of type `{ tag: 'error' | 'failure' , value: E | Error }` in an error or exception case.|

| Functions (create Tasks)    | Type | Description |
| :---        |:---         |:---         |
| construct | ```<E, R>(f: () => (resolve: (_: R) => void, reject: (_: E) => void) => void | (() => void)): Task<E, R>``` | Similiar to `new Promise`, an optional 'tidy up' function can be returned to tidy up resources upon cancellation. |
| Task   | ```<E, R>(f: () => Promise<Either<E, R>>): Task<E, R>```     | The default constructor for a Task. Create a Task using an async function returning an Either (Right for success, Left for error). |
| resolve   | ```<R>(a: R): Task<never, R>```     | Create a Task from a value with the result type as the value type. |
| reject   | ```<E>(a: E): Task<E, never>```     | Create a Task from a value with the error type as the value type. |

| Functions (combinators)      | Type | Description |
| :---        |:---         |:---         |
| sequence   | ```<E, R>(as: Task<E, R>[]): Task<E, R[]>```     | Convert a list of Tasks into a single Task returning a list of result (R) values.  |
| group   | ```<E2, R2>(f:...Task< E2, R2>) => Task<E\E2, [R, R2]>```   | Group many Tasks into a single Task returning an n tupe of result (R) values.  |
| groupParallel   | ```<E2, R2>(f:...Task< E2, R2>) => Task< E\E2, [R, R2]>```   | 
Returns a Task with the result values in a tuple of the two grouped Tasks, running the operations in parallel. |
| orElse   | ```<E2, R2>(f:...Task<E2, R2>) => Task< E2, R\R2>```     | Returns a Task that will return the result value of the first succesful Task.  |
| retry   | ```(n: number) => <E, R>(a: Task<E, R>): Task<E, R>```     | Returns a Task that will repeat the operation and returns with the result value of the last Task.  |
| repeat   | ```(n: number) => <E, R>(a: Task<E, R>): Task<E, R>```     | Returns a Task that will repeat the operation until first succesful run.  |
| all   | ```(n: number) => <E, R>(a: Task<E, R>[]): Task<E, R[]>```     | Similiar to `Promise.all`, returns a Task that will return with an array of R values, if a Task rejects then all other Tasks waiting to return are cancelled.  |
| race   | ```(n: number) => <E, R>(a: Task<E, R>[]): Task<E, R>```     | Similiar to `Promise.race`, Returns a Task that will return with the R value of the first Task that succeeds, the other Tasks are cancelled.  |

| Utility types      | Type | Description |
| :---        |:---         |:---         |
| TasksResult   | ```Task<E, R>(() => Promise<Either<E, R>>): Task<E, R>```     | Extract the result (Right) type of the given Task type. |
| TasksError   | ```Task<E, R>(() => Promise<Either<E, R>>): Task<E, R>```     | Extract the error (Left) type of the given Task type. |
