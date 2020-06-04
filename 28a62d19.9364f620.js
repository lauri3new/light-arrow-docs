(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{105:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return b})),a.d(t,"metadata",(function(){return c})),a.d(t,"rightToc",(function(){return s})),a.d(t,"default",(function(){return o}));var r=a(2),n=a(6),i=(a(0),a(125)),b={id:"TaskEither",title:"TaskEither",sidebar_label:"TaskEither"},c={id:"TaskEither",title:"TaskEither",description:"It should be noted that TaskEithers are not currently stack safe, I am working on a stack safe implementation",source:"@site/docs/TaskEither.md",permalink:"/light-arrow-docs/docs/TaskEither",editUrl:"https://github.com/lauri3new/light-arrow-docs/tree/master/docs/TaskEither.md",sidebar_label:"TaskEither",sidebar:"someSidebar",next:{title:"Arrow",permalink:"/light-arrow-docs/docs/Arrow"}},s=[],l={rightToc:s};function o(e){var t=e.components,a=Object(n.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},l,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("div",{className:"admonition admonition-info alert alert--info"},Object(i.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(r.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(r.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(i.b)("path",Object(r.a)({parentName:"svg"},{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})))),"info")),Object(i.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"It should be noted that TaskEithers are not currently stack safe, I am working on a stack safe implementation"))),Object(i.b)("p",null,"TaskEithers are data structures that describe asynchronous operations that can succeed with a value A or fail with a value E. TaskEithers won't actually perform any operation until the run method is called, this means that TaskEithers have the nice property of being referentially transparent. By delaying execution until the run method is called."),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"interface TaskEither<E, A> {\n  __val: () => Promise<Either<E, A>>\n  map: <B>(f: (_:A) => B) => TaskEither<E, B>\n  leftMap: <E2>(f: (_:E) => E2) => TaskEither<E2, A>\n  biMap: <E2, B>(f: (_:E) => E2, g: (_:A) => B) => TaskEither<E2, B>\n  flatMap: <E2, B>(f: (_:A) => TaskEither<E | E2, B>) => TaskEither<E | E2, B>\n  flatMapF: <E2, B>(f: (_:A) => () => Promise<Either<E2, B>>) => TaskEither<E | E2, B>\n  andThen: <E2, B>(_: TaskEither<A, E2, B>) => TaskEither<E | E2, B>\n  andThenF: <E2, B>(f: (_:A) => Promise<Either<E2, B>>) => TaskEither<E | E2, B>\n  andThenMerge: <E2, B>(_: TaskEither<A, E2, B>) => TaskEither<E | E2, A & B>\n  combine: <E2, B>(f:TaskEither<E2, B>) => TaskEither<E2, A | B>\n  runP: (\n    context: Ctx\n  ) => Promise<A>\n  run: <B, E2, ER>(\n    context: Ctx,\n    f: (_:A) => B,\n    g: (_:E) => E2,\n    j: (_?: Error) => ER\n  ) => Promise<B | E2 | ER>\n}\n")),Object(i.b)("p",null,"Example usage"),Object(i.b)("pre",null,Object(i.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"\nimport { TaskEither, sequence } from 'light-arrow/taskEither'\n\ninterface userService: {\n  getById: (id: number) => TaskEither<string, User>\n  getFriendsOf: (email: string) => TaskEither<string, User[]>\n  emailInvite: (emails: string[]) => TaskEither<string, string>\n}\n\nconst inviteFriendsOfUser = (id: number) => userService.getById(id)\n  .flatMap((user) => userService.getFriendsOf(user.email))\n  .flatMap((usersEmails) => userService.emailInvite(usersEmails))\n\nconst inviteFriendsOfUsers = sequence([\n  inviteFriendsOfUser(1),\n  inviteFriendsOfUser(5),\n  inviteFriendsOfUser(7)\n])\n// no side effects performed yet, we have just described what we are going to do\n\n// run as promise\ninviteFriendsOfUsers\n  .runP()\n\n")),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(r.a)({parentName:"tr"},{align:"left"}),"Interface"),Object(i.b)("th",Object(r.a)({parentName:"tr"},{align:"left"}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"TaskEither<E, A>")),Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"TaskEithers are data types that describe asynchronous operations that can succeed with a value A or fail with a value E.")))),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(r.a)({parentName:"tr"},{align:"left"}),"Functions"),Object(i.b)("th",Object(r.a)({parentName:"tr"},{align:"left"}),"Type"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"TaskEither"),Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"TaskEither<E, A>(() => Promise<Either<E, A>>): TaskEither<E, A>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"resolve"),Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"<A>(a: A):TaskEither<never, A>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"reject"),Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"<A>(a: A):TaskEither<A, never>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"ofContext"),Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"<A>():TaskEither<never, A>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"fromPromise"),Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"<A, E>(a: Promise<A>):TaskEither<E, A>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"fromFailablePromise"),Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"<A>(a: Promise<A>):TaskEither<E, A>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"fromEither"),Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"<E, A>(a:Either<E, A>):TaskEither<E, A>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"fromPEither"),Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"<E, A>(a:Promise<Either<E, A>>):TaskEither<E, A>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"fromKP"),Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"<A>(a:() => Promise<A>):TaskEither<never, A>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"fromFailableKP"),Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"<E, A>(a:() => Promise<A>):TaskEither<E, A>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"sequence"),Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"<E, A>(as: TaskEither<E, A>[]): TaskEither<E, A[]>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"combine"),Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"<B, C>(...as: TaskEither<B, C>[]): TaskEither<B, C>"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),"retry"),Object(i.b)("td",Object(r.a)({parentName:"tr"},{align:"left"}),Object(i.b)("inlineCode",{parentName:"td"},"(n: number) => <B, C>(a: TaskEither<B, C>): TaskEither<B, C>"))))))}o.isMDXComponent=!0}}]);