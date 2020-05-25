(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{100:function(t,e,a){"use strict";a.r(e),a.d(e,"frontMatter",(function(){return c})),a.d(e,"metadata",(function(){return s})),a.d(e,"rightToc",(function(){return l})),a.d(e,"default",(function(){return i}));var n=a(1),r=a(6),b=(a(0),a(118)),c={id:"Result",title:"Result",sidebar_label:"Result"},s={id:"Result",title:"Result",description:"Result describes an http response. Results are translated into actual http responses when the http app is bound to the express app instance.",source:"@site/docs/Result.md",permalink:"/light-arrow-docs/docs/Result",editUrl:"https://github.com/lauri3new/light-arrow-docs/tree/master/docs/Result.md",sidebar_label:"Result",sidebar:"someSidebar",previous:{title:"HttpApp",permalink:"/light-arrow-docs/docs/HttpApp"}},l=[],p={rightToc:l};function i(t){var e=t.components,a=Object(r.a)(t,["components"]);return Object(b.b)("wrapper",Object(n.a)({},p,a,{components:e,mdxType:"MDXLayout"}),Object(b.b)("p",null,"Result describes an http response. Results are translated into actual http responses when the http app is bound to the express app instance."),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"export interface Result<A extends object | Buffer | string | undefined = any> {\n  contentType?: string\n  body: A\n  status: httpStatus\n  headers?: { [key: string]: string }\n  cookies?: Cookie[]\n  clearCookies?: Cookie[]\n  action?: [ resultAction, string] | [ resultAction, string, object] | [ resultAction, string, object, (error: any, html: any) => void ]\n  map: <B extends object | Buffer | string | undefined = any>(f: (_: Result<A>) => Result<B>) => Result<B>\n}\n")),Object(b.b)("p",null,"Example usage"),Object(b.b)("pre",null,Object(b.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import { Result, httpStatus, OK } from 'Light-Arrow/server/result'\n\n// construct succesful result with status code 200\nconst result = OK({ data, object })\nconst resultTwo = Result(httpStatus.OK, { data, object )\n\n")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Interfaces and enums"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Description"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"Result<A extends body = any>")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Represents a http response.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"Cookie")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Represents a http response.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"resultAction")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Represents a http response.")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"httpStatus")),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"Represents a http response.")))),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Functions"),Object(b.b)("th",Object(n.a)({parentName:"tr"},{align:"left"}),"Type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"withCookies"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"Either<E, A>"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"clearCookies"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"<A>(a: A):Right<A>"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"withContentType"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"<A>(a: A):Left<A>"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"withHeaders"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"<A>(a: A):Left<A>"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),"withAction"),Object(b.b)("td",Object(n.a)({parentName:"tr"},{align:"left"}),Object(b.b)("inlineCode",{parentName:"td"},"<A>(a: A):Left<A>"))))))}i.isMDXComponent=!0}}]);