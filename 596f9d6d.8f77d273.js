(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{74:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return s})),r.d(t,"rightToc",(function(){return c})),r.d(t,"default",(function(){return h}));var a=r(2),n=r(6),o=(r(0),r(92)),i={id:"light-arrow-1",title:"Light Arrow - composable and type safe asynchronous programming for Typescript",published:!0,author:"Laurence Newman",author_title:"Founder @ Disaster check in",author_url:"https://github.com/lauri3new",author_image_url:"https://avatars2.githubusercontent.com/u/22150857?s=460&u=eeddb00e96c24ccb9a40810a791de544beb4a59b&v=4",canonical_url:"https://itnext.io/light-arrow-composable-and-type-safe-asynchronous-programming-for-typescript-6d6b3380b8d0",tags:["light-arrow","functional programming","async","IO"]},s={permalink:"/light-arrow-docs/blog/2020/11/06/light-arrow",source:"@site/blog/2020-11-06-light-arrow.md",description:"Originally published at itnext.io",date:"2020-11-06T00:00:00.000Z",tags:[{label:"light-arrow",permalink:"/light-arrow-docs/blog/tags/light-arrow"},{label:"functional programming",permalink:"/light-arrow-docs/blog/tags/functional-programming"},{label:"async",permalink:"/light-arrow-docs/blog/tags/async"},{label:"IO",permalink:"/light-arrow-docs/blog/tags/io"}],title:"Light Arrow - composable and type safe asynchronous programming for Typescript",readingTime:5.445,truncated:!1,nextItem:{title:"Welcome",permalink:"/light-arrow-docs/blog/2020/05/25/welcome"}},c=[{value:"Originally published at itnext.io",id:"originally-published-at-itnextio",children:[]},{value:"Arrows and Promises",id:"arrows-and-promises",children:[]},{value:"Arrows",id:"arrows",children:[]},{value:"Error Handling",id:"error-handling",children:[]},{value:"Referential Transparency",id:"referential-transparency",children:[]},{value:"Dependency Injection",id:"dependency-injection",children:[]},{value:"Composability",id:"composability",children:[]},{value:"Performance",id:"performance",children:[]},{value:"Interoperability",id:"interoperability",children:[]}],l={rightToc:c};function h(e){var t=e.components,r=Object(n.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h3",{id:"originally-published-at-itnextio"},"Originally published at ",Object(o.b)("a",Object(a.a)({parentName:"h3"},{href:"https://itnext.io/light-arrow-composable-and-type-safe-asynchronous-programming-for-typescript-6d6b3380b8d0"}),"itnext.io")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Welcome")," to part 1 of this series on using the typescript library Light Arrow for functional programming in Typescript. In part 1 we will cover the Arrow data type. In part 2 we will build a fully type-safe http server."),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"I am the author of Light Arrow and the project is still in its early stages, please ",Object(o.b)("a",Object(a.a)({parentName:"em"},{href:"https://github.com/lauri3new"}),"get in touch")," if you have any feedback, thanks!")),Object(o.b)("p",{align:"center"},Object(o.b)("img",{src:"https://miro.medium.com/max/668/1*db8Jt0pwXFjQaPWTJ8IB6g.png"}),Object(o.b)("br",null),Object(o.b)("em",null,"The Arrow data type")),Object(o.b)("h3",{id:"arrows-and-promises"},"Arrows and Promises"),Object(o.b)("p",null,"Arrows are data structures that describe asynchronous operations that can succeed with a result value R or error with a value E that depend on some dependencies D. Practically many programs or parts of programs we write fit that description, and often Promises are used for this purpose. However, there are some drawbacks with Promises."),Object(o.b)("p",null,"Lets first look take a look at the Promise Type signature."),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"Promise<A>")," represents an asynchronous operation that can succeed with a value of type A. But what about failure? this isn\u2019t represented in the type signature, so we have to look inside the implementation of our particular promise and determine what types our catch error handler needs to handle. Promises are also eagerly evaluated and not referentially transparent which can cause issues when we are refactoring. Referential transparency means we can replace all expressions in our program with the values returned from those expressions, without changing the programs behaviour. For more on potential issues with Promises check out this ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://medium.com/@avaq/broken-promises-2ae92780f33"}),"article"),"."),Object(o.b)("p",{align:"center"},Object(o.b)("img",{src:"https://miro.medium.com/max/878/0*wLHA2_YwkwxoV3o9"}),Object(o.b)("br",null),Object(o.b)("em",null,"Async code and side effects can get complicated\u2026 we all know the feeling")),Object(o.b)("h3",{id:"arrows"},"Arrows"),Object(o.b)("p",null,"Arrows have a number of benefits over Promises including referential transparency, typed errors and built in dependency injection capabilities. Each of these are discussed in more detail below. Arrows have a discoverable \u2018fluent\u2019 chain-able API, similar to native Promises and Arrays. To see a list of the full API of an Arrow check out the ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://lauri3new.github.io/light-arrow-docs/docs/Arrow/"}),"documentation site"),"."),Object(o.b)("p",null,"More generally than just asynchronous operations, Arrows can be used to model synchronous or asynchronous side effects and compose them together in a type safe way without actually performing any side effects, for this reason data structures such as Arrow are also known as \u2018functional effects\u2019. For those familiar with functional programming, Arrows are a kind of ReaderTaskEither."),Object(o.b)("p",null,"Arrows can essentially be seen as useful wrappers around the function type\nD => Promise<Either<E, R>>, that make working with such types more convenient and providing helper methods for composability and convenience. To convert existing data types to Arrows there are several draw functions provided that make this easier. We can also construct Arrows as we would for promises using new Promise, also optionally specifying a 'tidy up' callback (e.g. to clear up timeouts), see ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://lauri3new.github.io/light-arrow-docs/docs/Arrow/#arrows"}),"here")," for examples."),Object(o.b)("p",{align:"center"},Object(o.b)("img",{src:"https://miro.medium.com/max/2000/1*hJhCKM_FQRflyKnHWqUnAA.png"}),Object(o.b)("br",null),Object(o.b)("em",null,"An example function `sendEmail` returning an Arrow, depending on a promise based emailService")),Object(o.b)("p",null,"Let\u2019s now look at some of those benefits I mentioned with examples. In the examples all of the types are inferred but are written out just for demonstration purposes."),Object(o.b)("h3",{id:"error-handling"},"Error Handling"),Object(o.b)("p",null,"Arrows use the Either data type to enable centralised type safe error handling. By tracking the error type we can know from the type signature how our program might fail and cover all cases in the error handling function we pass to the run method (similar to a catch handler we might add at the end of a promise)."),Object(o.b)("p",{align:"center"},Object(o.b)("img",{src:"https://miro.medium.com/max/1400/1*eEfSNcTf0laDlcb_sPhNTQ.png"})),Object(o.b)("h3",{id:"referential-transparency"},"Referential Transparency"),Object(o.b)("p",null,"Arrows won\u2019t actually perform any operation until the run method is called, this means that Arrows have the nice property of being referentially transparent. This means we can refactor expressions involving Arrows, such as calling a function returning an Arrow, and replace them with the value returned without changing the meaning of the program. As it turns out by representing all side effects in our program, whether they are asynchronous or synchronous and fail-able or non fail-able, as Arrows we can maintain referential transparency throughout our program making it easier to reason about.\nAs our programs side effects are now represented by Arrows, we can compose them together to become one Arrow that describes the entire program, waiting to be executed through the run method, in which we provide dependencies and success, failure and exception handlers."),Object(o.b)("p",{align:"center"},Object(o.b)("img",{src:"https://miro.medium.com/max/2000/1*rZ43AnqRmRvWxvSvzQzf8Q.png"})),Object(o.b)("p",{align:"center"},Object(o.b)("img",{src:"https://miro.medium.com/max/1000/1*TplQcyUfMnA6RBPk-slaKw.png"}),Object(o.b)("br",null),Object(o.b)("em",null,"Running our program with mock and production dependencies")),Object(o.b)("h3",{id:"dependency-injection"},"Dependency Injection"),Object(o.b)("p",null,"By delaying execution until the run method is called, Arrows provide a convenient way to perform dependency injection as we can group all the dependencies of the program into a single object type and provide test and production implementations of these in the run method as we wish."),Object(o.b)("h3",{id:"composability"},"Composability"),Object(o.b)("p",null,"Arrows are highly composable through their various methods (see ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://lauri3new.github.io/light-arrow-docs/docs/Arrow/#cancellation"}),"documentation")," for all of them). The orElse and andThen methods are also provided as combinator functions that accept n number of Arrows. orElse can be used for 'horizontal' composition, such as building up the routes of a express App. andThen can be used for 'vertical' composition, such as changing the context of a request for example in an authorisation middleware where the user making the requests details are added to the context for use by subsequent middleware. Some more combinators are also included such as retry and repeat."),Object(o.b)("h3",{id:"performance"},"Performance"),Object(o.b)("p",null,"Arrows are stack safe and perform similarly to native promises under performance testing, but have all of the benefits listed in this article. Arrows also support ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://lauri3new.github.io/light-arrow-docs/docs/Arrow/#cancellation"}),"cancellation")," and resource tidy up."),Object(o.b)("h3",{id:"interoperability"},"Interoperability"),Object(o.b)("p",null,"There are a number of helper functions to convert existing types, including basic values, functions, async functions, to Arrows. These are all listed in the ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://lauri3new.github.io/light-arrow-docs/docs/Arrow/#cancellation"}),"documentation"),"."),Object(o.b)("p",{align:"center"},Object(o.b)("img",{src:"https://miro.medium.com/max/960/0*04NgJRiboqEAjatT"}),Object(o.b)("br",null),Object(o.b)("em",null,"Becoming an Arrow Programmer, keeping async code and side effects in check")),Object(o.b)("p",null,"Light Arrow aims to be a practical library with a small API based around the Arrow data type, so that those using it can get many of the benefits of functional programming without too much overhead in theory. To get started check out the documentation ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://lauri3new.github.io/light-arrow-docs/docs/Arrow"}),"here")," and install the ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.npmjs.com/package/@light-arrow/arrow"}),"npm module"),". For those interested in learning more about functional programming I would highly recommend starting with the first few chapters of the excellent book ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.oreilly.com/library/view/functional-programming-in/9781617290657/"}),"Functional programming in Scala"),"."),Object(o.b)("p",null,"In Part 2, we will be building a type safe express server using Arrows for routing, middleware and handlers. Thanks for reading, hope to see you next time!"))}h.isMDXComponent=!0}}]);