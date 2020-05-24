(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{100:function(t,e,a){"use strict";a.r(e),a.d(e,"frontMatter",(function(){return c})),a.d(e,"metadata",(function(){return l})),a.d(e,"rightToc",(function(){return s})),a.d(e,"default",(function(){return o}));var n=a(1),r=a(6),b=(a(0),a(118)),c={id:"Result",title:"Result",sidebar_label:"Result"},l={id:"Result",title:"Result",description:"Either represents a computation that can succeed with a value A or fail with a value E.",source:"@site/docs/Result.md",permalink:"/light-arrow-docs/docs/Result",editUrl:"https://github.com/lauri3new/light-arrow-docs/tree/master/docs/Result.md",sidebar_label:"Result",sidebar:"someSidebar",previous:{title:"HttpApp",permalink:"/light-arrow-docs/docs/HttpApp"}},s=[],i={rightToc:s};function o(t){var e=t.components,a=Object(r.a)(t,["components"]);return Object(b.b)("wrapper",Object(n.a)({},i,a,{components:e,mdxType:"MDXLayout"}),Object(b.b)("p",null,"Either represents a computation that can succeed with a value A or fail with a value E."),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"export interface Result<A extends object | Buffer | string | undefined = any> {\n  contentType?: string\n  body: A\n  status: httpStatus\n  headers?: { [key: string]: string }\n  cookies?: Cookie[]\n  clearCookies?: Cookie[]\n  action?: [ resultAction, string] | [ resultAction, string, object] | [ resultAction, string, object, (error: any, html: any) => void ]\n  map: <B extends object | Buffer | string | undefined = any>(f: (_: Result<A>) => Result<B>) => Result<B>\n}\n")),Object(b.b)("p",null,"Example usage"),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import { Result, httpStatus, OK } from 'Light-Arrow/server/result'\n\n// construct succesful result with status code 200\nconst result = OK({ data, object })\nconst resultTwo = Result(httpStatus.OK, { data, object )\n\n")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Interfaces and enums"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"```Result<A extends object"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Buffer")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"Cookie")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Represents a http response.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"resultAction")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Represents a http response.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"httpStatus")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Represents a http response.")))),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Functions"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Either"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"Either<E, A>"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Right"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"<A>(a: A):Right<A>"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Left"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"<A>(a: A):Left<A>"))))))}o.isMDXComponent=!0}}]);