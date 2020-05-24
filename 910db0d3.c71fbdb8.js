(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{103:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return b})),a.d(t,"metadata",(function(){return i})),a.d(t,"rightToc",(function(){return c})),a.d(t,"default",(function(){return d}));var r=a(1),n=a(6),o=(a(0),a(118)),b={id:"Arrow",title:"Arrow",sidebar_label:"Arrow"},i={id:"Arrow",title:"Arrow",description:"Arrows are data structures that describe asynchronous operations that can succeed with a value Sout or fail with a value E that depends on some input state S. Arrows won't actually perform any operation until the run method is called, this means that Arrows have the nice property of being referentially transparent. By delaying execution until the run method is called, Arrows provide a way to perform dependency injection as we can group all the dependencies of the program into a single object type and provide test and production implementations of these in the run method as we wish.",source:"@site/docs/Arrow.md",permalink:"/light-arrow-docs/docs/Arrow",editUrl:"https://github.com/lauri3new/light-arrow-docs/tree/master/docs/Arrow.md",sidebar_label:"Arrow",sidebar:"someSidebar",next:{title:"Either",permalink:"/light-arrow-docs/docs/Either"}},c=[],l={rightToc:c};function d(e){var t=e.components,a=Object(n.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,a,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Arrows are data structures that describe asynchronous operations that can succeed with a value Sout or fail with a value E that depends on some input state S. Arrows won't actually perform any operation until the run method is called, this means that Arrows have the nice property of being referentially transparent. By delaying execution until the run method is called, Arrows provide a way to perform dependency injection as we can group all the dependencies of the program into a single object type and provide test and production implementations of these in the run method as we wish."),Object(o.b)("p",null,"As well as the Arrow data type this module exposes helper functions for building type safe http apps using the express framework. Please see this section of the documentation for more detail."),Object(o.b)("p",null,"For functional programmers this is a kind of kleisli datatype with immutable methods, with some additional constructor and combinator functions."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"export interface Arrow<S, E, Sout> {\n  __val: (_:S) => Promise<Either<E, Sout>>\n  map: <S2out>(f: (_:Sout) => S2out) => Arrow<S, E, S2out>\n  combineA: (f:Arrow<S, E, Sout>) => Arrow<S, E, Sout>\n  leftMap: <E2>(f: (_:E) => E2) => Arrow<S, E2, Sout>\n  flatMap: <E2, S2Out>(f: (_:Sout) => Arrow<S, E | E2, S2Out>) => Arrow<S, E | E2, S2Out>\n  andThen: <E2, S2Out>(_: Arrow<Sout, E2, S2Out>) => Arrow<S, E | E2, S2Out>\n  andThenMerge: <E2, S2Out>(_: Arrow<Sout, E2, S2Out>) => Arrow<S, E | E2, Sout & S2Out>\n  andThenF: <E2, S2Out>(f: (_:Sout) => Promise<Either<E, S2Out>>) => Arrow<S, E | E2, S2Out>\n  runP: (\n    context: S\n  ) => Promise<Sout>\n  run: <A, B, C>(\n    context: S,\n    f: (_:Sout) => A,\n    g: (_:E) => B,\n    j: (_?: Error) => C\n  ) => Promise<A | B | C>\n}\n")),Object(o.b)("p",null,"Example usage"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"import { ofContext } from 'Light-Arrow'\n\ninterface UserService {\n  getUser: () => Promise<User>\n}\n\nconst arrow = ofContext<UserService>()\n\n")),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",Object(r.a)({parentName:"tr"},{align:"left"}),"Interface"),Object(o.b)("th",Object(r.a)({parentName:"tr"},{align:"left"}),"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(o.b)("inlineCode",{parentName:"td"},"Arrow<S, E, Sout>")),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"Arrows are data types that describe asynchronous operations that can succeed with a value Sout or fail with a value E that depends on some input state S")))),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",Object(r.a)({parentName:"tr"},{align:"left"}),"Functions"),Object(o.b)("th",Object(r.a)({parentName:"tr"},{align:"left"}),"Type"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"Arrow"),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(o.b)("inlineCode",{parentName:"td"},"Arrow<S, E, Sout>((_:S) => Promise<Either<E, Sout>>): Arrow<S, E, Sout>"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"resolve"),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(o.b)("inlineCode",{parentName:"td"},"<A>(a: A):Arrow<any, never, A>"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"reject"),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(o.b)("inlineCode",{parentName:"td"},"<A>(a: A):Arrow<any, A, never>"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"ofContext"),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(o.b)("inlineCode",{parentName:"td"},"<A>():Arrow<A, never, A>"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"fromPromise"),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(o.b)("inlineCode",{parentName:"td"},"<A, E, C = any>(a: Promise<A>):Arrow<C, E, A>"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"fromFailablePromise"),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(o.b)("inlineCode",{parentName:"td"},"<A, E, C = any>(a: Promise<A>):Arrow<C, E, A>"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"fromEither"),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(o.b)("inlineCode",{parentName:"td"},"<E, A, C = any>(a:Either<E, A>):Arrow<C, E, A>"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"fromPEither"),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(o.b)("inlineCode",{parentName:"td"},"<E, A, C = any>(a:Promise<Either<E, A>>):Arrow<C, E, A>"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"fromKP"),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(o.b)("inlineCode",{parentName:"td"},"<S, A>(a:(_:S) => Promise<A>):Arrow<S, never, A>"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"fromFailableKP"),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(o.b)("inlineCode",{parentName:"td"},"<S, E, A>(a:(_:S) => Promise<A>):Arrow<S, E, A>"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"sequence"),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(o.b)("inlineCode",{parentName:"td"},"<A, B, C>(as: Arrow<A, B, C>[]): Arrow<A, B, C[]>"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"combine"),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(o.b)("inlineCode",{parentName:"td"},"<A, B, C>(...as: Arrow<A, B, C>[]): Arrow<A, B, C>"))),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"retry"),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(o.b)("inlineCode",{parentName:"td"},"(n: number) => <A, B, C>(a: Arrow<A, B, C>): Arrow<A, B, C>"))))))}d.isMDXComponent=!0}}]);