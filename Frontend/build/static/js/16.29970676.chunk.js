(this["webpackJsonpcrypto-funnel"]=this["webpackJsonpcrypto-funnel"]||[]).push([[16],{166:function(e,t,n){"use strict";n.r(t);var r=n(6),c=n(16),a=n.n(c),s=n(27),o=n(1),i=n(13),l=n(5),u=n(28),f=n(33),x=n.n(f),d=n(0);t.default=function(){var e=Object(i.i)().token,t=Object(i.g)(),n=function(){var t=Object(s.a)(a.a.mark((function t(){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n={token:e},t.next=4,x.a.post("".concat(u.a,"/mail/verifyUser"),n,{headers:{Authorization:"Bearer ".concat(e)}});case 4:t.sent,h("Email verified successfully."),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(0),console.log("VERIFY ERROR",t.t0),h("Sorry, an error occured.");case 12:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(){return t.apply(this,arguments)}}();Object(o.useEffect)((function(){n()}),[]);var c=Object(o.useState)("Loading..."),f=Object(r.a)(c,2),b=f[0],h=f[1];return Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("div",{className:"flex items-center min-h-screen p-6 bg-gray-50 bg-gray-900",children:Object(d.jsxs)("div",{className:"flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-gray-900  shadow-xl dark:bg-gray-800",children:[Object(d.jsx)("div",{className:"flex flex-col overflow-y-auto md:flex-row text-4xl text-white text-center font-semibold",children:b}),Object(d.jsx)(l.Button,{className:"w-full sm:w-auto m-5",onClick:function(){t.push("/signin")},children:"Login"})]})})})}}}]);
//# sourceMappingURL=16.29970676.chunk.js.map