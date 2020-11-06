---
id: light-arrow-1
title: Light Arrow - composable and type safe asynchronous programming for Typescript
author: Laurence Newman
author_title: Founder @ Disaster check in
author_url: https://github.com/lauri3new
author_image_url: https://avatars2.githubusercontent.com/u/22150857?s=460&u=eeddb00e96c24ccb9a40810a791de544beb4a59b&v=4
tags: [light-arrow, functional programming, async, IO]
---

### Also published on [itnext.io](https://itnext.io/light-arrow-composable-and-type-safe-asynchronous-programming-for-typescript-6d6b3380b8d0)

**Welcome** to part 1 of this series on using the typescript library Light Arrow for functional programming in Typescript. In part 1 we will cover the Arrow data type. In part 2 we will build a fully type-safe http server.

*I am the author of Light Arrow and the project is still in its early stages, please [get in touch](https://github.com/lauri3new) if you have any feedback, thanks!*

<p align="center">
  <img src="https://miro.medium.com/max/668/1*db8Jt0pwXFjQaPWTJ8IB6g.png" />
  <br/>
  <em>
  The Arrow data type
  </em>
</p>

### Arrows and Promises

Arrows are data structures that describe asynchronous operations that can succeed with a result value R or error with a value E that depend on some dependencies D. Practically many programs or parts of programs we write fit that description, and often Promises are used for this purpose. However, there are some drawbacks with Promises.

Lets first look take a look at the Promise Type signature.

`Promise<A>` represents an asynchronous operation that can succeed with a value of type A. But what about failure? this isn’t represented in the type signature, so we have to look inside the implementation of our particular promise and determine what types our catch error handler needs to handle. Promises are also eagerly evaluated and not referentially transparent which can cause issues when we are refactoring. Referential transparency means we can replace all expressions in our program with the values returned from those expressions, without changing the programs behaviour. For more on potential issues with Promises check out this [article](https://medium.com/@avaq/broken-promises-2ae92780f33).

<p align="center">
  <img src="https://miro.medium.com/max/878/0*wLHA2_YwkwxoV3o9" />
  <br/>
  <em>
  Async code and side effects can get complicated… we all know the feeling
  </em>
</p>

### Arrows

Arrows have a number of benefits over Promises including referential transparency, typed errors and built in dependency injection capabilities. Each of these are discussed in more detail below. Arrows have a discoverable ‘fluent’ chain-able API, similar to native Promises and Arrays. To see a list of the full API of an Arrow check out the [documentation site](https://lauri3new.github.io/light-arrow-docs/docs/Arrow/).

More generally than just asynchronous operations, Arrows can be used to model synchronous or asynchronous side effects and compose them together in a type safe way without actually performing any side effects, for this reason data structures such as Arrow are also known as ‘functional effects’. For those familiar with functional programming, Arrows are a kind of ReaderTaskEither.

Arrows can essentially be seen as useful wrappers around the function type
D => Promise<Either<E, R>>, that make working with such types more convenient and providing helper methods for composability and convenience. To convert existing data types to Arrows there are several draw functions provided that make this easier. We can also construct Arrows as we would for promises using new Promise, also optionally specifying a 'tidy up' callback (e.g. to clear up timeouts), see [here](https://lauri3new.github.io/light-arrow-docs/docs/Arrow/#arrows) for examples.

<p align="center">
  <img src="https://miro.medium.com/max/2000/1*hJhCKM_FQRflyKnHWqUnAA.png" />
  <br/>
  <em>
  An example function `sendEmail` returning an Arrow, depending on a promise based emailService
  </em>
</p>

Let’s now look at some of those benefits I mentioned with examples. In the examples all of the types are inferred but are written out just for demonstration purposes.

### Error Handling

Arrows use the Either data type to enable centralised type safe error handling. By tracking the error type we can know from the type signature how our program might fail and cover all cases in the error handling function we pass to the run method (similar to a catch handler we might add at the end of a promise).

<p align="center">
  <img src="https://miro.medium.com/max/1400/1*eEfSNcTf0laDlcb_sPhNTQ.png" />
</p>

### Referential Transparency

Arrows won’t actually perform any operation until the run method is called, this means that Arrows have the nice property of being referentially transparent. This means we can refactor expressions involving Arrows, such as calling a function returning an Arrow, and replace them with the value returned without changing the meaning of the program. As it turns out by representing all side effects in our program, whether they are asynchronous or synchronous and fail-able or non fail-able, as Arrows we can maintain referential transparency throughout our program making it easier to reason about.
As our programs side effects are now represented by Arrows, we can compose them together to become one Arrow that describes the entire program, waiting to be executed through the run method, in which we provide dependencies and success, failure and exception handlers.

<p align="center">
  <img src="https://miro.medium.com/max/2000/1*rZ43AnqRmRvWxvSvzQzf8Q.png" />
</p>

<p align="center">
  <img src="https://miro.medium.com/max/1000/1*TplQcyUfMnA6RBPk-slaKw.png" />
  <br/>
  <em>
  Running our program with mock and production dependencies
  </em>
</p>


### Dependency Injection

By delaying execution until the run method is called, Arrows provide a convenient way to perform dependency injection as we can group all the dependencies of the program into a single object type and provide test and production implementations of these in the run method as we wish.

### Composability

Arrows are highly composable through their various methods (see [documentation](https://lauri3new.github.io/light-arrow-docs/docs/Arrow/#cancellation) for all of them). The orElse and andThen methods are also provided as combinator functions that accept n number of Arrows. orElse can be used for 'horizontal' composition, such as building up the routes of a express App. andThen can be used for 'vertical' composition, such as changing the context of a request for example in an authorisation middleware where the user making the requests details are added to the context for use by subsequent middleware. Some more combinators are also included such as retry and repeat.

### Performance

Arrows are stack safe and perform similarly to native promises under performance testing, but have all of the benefits listed in this article. Arrows also support [cancellation](https://lauri3new.github.io/light-arrow-docs/docs/Arrow/#cancellation) and resource tidy up.

### Interoperability

There are a number of helper functions to convert existing types, including basic values, functions, async functions, to Arrows. These are all listed in the [documentation](https://lauri3new.github.io/light-arrow-docs/docs/Arrow/#cancellation).

<p align="center">
  <img src="https://miro.medium.com/max/960/0*04NgJRiboqEAjatT" />
  <br/>
  <em>
  Becoming an Arrow Programmer, keeping async code and side effects in check
  </em>
</p>


Light Arrow aims to be a practical library with a small API based around the Arrow data type, so that those using it can get many of the benefits of functional programming without too much overhead in theory. To get started check out the documentation [here](https://lauri3new.github.io/light-arrow-docs/docs/Arrow) and install the [npm module](https://www.npmjs.com/package/light-arrow). For those interested in learning more about functional programming I would highly recommend starting with the first few chapters of the excellent book [Functional programming in Scala](https://www.oreilly.com/library/view/functional-programming-in/9781617290657/).

In Part 2, we will be building a type safe express server using Arrows for routing, middleware and handlers. Thanks for reading, hope to see you next time!