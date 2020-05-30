(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{118:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return b})),a.d(t,"metadata",(function(){return c})),a.d(t,"rightToc",(function(){return o})),a.d(t,"default",(function(){return p}));var n=a(2),r=a(6),i=(a(0),a(125)),b={id:"Either",title:"Either",sidebar_label:"Either"},c={id:"Either",title:"Either",description:"It should be noted that Eithers are not currently stack safe, I am working on a stack safe implementation",source:"@site/docs/Either.md",permalink:"/light-arrow-docs/docs/Either",editUrl:"https://github.com/lauri3new/light-arrow-docs/tree/master/docs/Either.md",sidebar_label:"Either",sidebar:"someSidebar",previous:{title:"Arrow",permalink:"/light-arrow-docs/docs/Arrow"},next:{title:"HttpApp",permalink:"/light-arrow-docs/docs/HttpApp"}},o=[],l={rightToc:o};function p(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},l,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("div",{className:"admonition admonition-info alert alert--info"},Object(i.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(n.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(n.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(i.b)("path",Object(n.a)({parentName:"svg"},{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})))),"info")),Object(i.b)("div",Object(n.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"It should be noted that Eithers are not currently stack safe, I am working on a stack safe implementation"))),Object(i.b)("p",null,"Either represents a computation that can succeed with a value A or fail with a value E."),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"export interface Either<E, A> {\n  _tag: string\n  get: () => E | A\n  map:<B>(f:(_: A) => B) => Either<E, B>\n  leftMap:<E2>(f:(_: E) => E2) => Either<E2, A>\n  biMap:<E2, B>(f:(_:E) => E2, g:(_:A) => B) => Either<E2, B>\n  flatMap:<E2, B>(f:(_: A) => Either<E | E2, B>) => Either<E | E2, B>\n  match:<B, C>(f:(_:E) => B, g:(_:A) => C) => B | C\n}\n\nexport type Right<A> = Either<never, A>\nexport type Left<E> = Either<E, never>\n")),Object(i.b)("p",null,"Example usage"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import { Either, Right, Left } from 'Light-Arrow/either'\n\nconst safeDivide = (n: number, n2: number): Either<string, number> => (\n  n2 === 0 ? Left('quotient was 0') : Right(n / n2)\n)\n\nconst myResult = safeDivide(Math.random(), Math.random() - 0.5)\n  .map(n => n * 100 - 56)\n  .flatMap(n => safeDivide(n, Math.random() - 0.5))\n  .leftMap(s => `This computation failed because: ${s}`)\n  .match(\n    failMessage => console.log(failMessage),\n    result => console.log(result)\n  )\n\n")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Interface"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"Either<E, A>")),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Either represents a computation that can succeed with a value A or fail with a value E.")))),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Functions"),Object(i.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Type"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Either"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"Either<E, A>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Right"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"<A>(a: A):Right<A>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Left"),Object(i.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"<A>(a: A):Left<A>"))))))}p.isMDXComponent=!0}}]);