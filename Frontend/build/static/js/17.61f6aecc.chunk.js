(this["webpackJsonpcrypto-funnel"]=this["webpackJsonpcrypto-funnel"]||[]).push([[17],{199:function(e,t,n){"use strict";n.r(t);var a=n(10),r=n(1),c=n(16),o=n(15),s=Object(r.lazy)((function(){return n.e(5).then(n.bind(null,202))})),i=Object(r.lazy)((function(){return n.e(15).then(n.bind(null,188))})),l=Object(r.lazy)((function(){return n.e(11).then(n.bind(null,189))})),u=Object(r.lazy)((function(){return n.e(12).then(n.bind(null,190))})),p=Object(r.lazy)((function(){return n.e(6).then(n.bind(null,191))})),m=Object(r.lazy)((function(){return n.e(13).then(n.bind(null,192))})),d=Object(r.lazy)((function(){return n.e(10).then(n.bind(null,193))})),h=Object(r.lazy)((function(){return n.e(14).then(n.bind(null,194))})),j=Object(r.lazy)((function(){return n.e(8).then(n.bind(null,195))})),b=Object(r.lazy)((function(){return Promise.all([n.e(16),n.e(7)]).then(n.bind(null,196))})),x=Object(r.lazy)((function(){return n.e(9).then(n.bind(null,197))})),f=Object(r.lazy)((function(){return n.e(4).then(n.bind(null,203))})),O=[];0==o.a.getRole()&&O.push({path:"/dashboard",component:s}),1==o.a.getRole()&&O.push({path:"/dashboard",component:p},{path:"/refferals",component:m},{path:"/influencers",component:j},{path:"/influencerpage/:id",component:b},{path:"/RefferalRequests",component:d},{path:"/paymenthistory",component:x}),2!=o.a.getRole()&&3!=o.a.getRole()&&4!=o.a.getRole()||O.push({path:"/dashboard",component:s},{path:"/myplan",component:f},{path:"/info",component:i},{path:"/paymenthistory",component:x},{path:"/userrefferal",component:h},{path:"/ConfirmPayment/:status/:sessionId/:refCode/:refStatus",component:l},{path:"/ConfirmPayment/paymentfailed",component:u}),4==o.a.getRole()&&O.push({path:"/influencerpage/:id",component:b});var y=O,g=n(71),v=[{path:"/app/dashboard",icon:"HomeIcon",name:"Dashboard"}];1==o.a.getRole()&&v.push({path:"/app/refferals",icon:"HomeIcon",name:"Refferals"},{path:"/app/influencers",icon:"HomeIcon",name:"Influencers"},{path:"/app/paymenthistory",icon:"HomeIcon",name:"Payment History"},{path:"/app/RefferalRequests",icon:"HomeIcon",name:"Influencer Requests"}),2!=o.a.getRole()&&3!=o.a.getRole()||v.push({path:"/app/myplan",icon:"HomeIcon",name:"My Plans"},{path:"/app/userrefferal",icon:"HomeIcon",name:"Refferal"},{path:"/app/paymenthistory",icon:"HomeIcon",name:"Payment History"},{path:"/app/info",icon:"HomeIcon",name:"Profile"}),4==o.a.getRole()&&v.push({path:"/app/myplan",icon:"HomeIcon",name:"My Plans"},{path:"/app/userrefferal",icon:"HomeIcon",name:"Refferal"},{path:"/app/paymenthistory",icon:"HomeIcon",name:"Payment History"},{path:"/app/influencerpage/".concat(o.a.getId()),icon:"HomeIcon",name:"Profile "});var w=v,N=n(7),k=n(79),I=n(6),R=n(5),z=n(0),H=["icon"];function C(e){var t=e.icon,n=Object(g.a)(e,H),r=k[t];return Object(z.jsx)(r,Object(a.a)({},n))}var P=function(e){var t=e.route,n=Object(r.useState)(!1),a=Object(I.a)(n,2),c=a[0],o=a[1];return Object(z.jsxs)("li",{className:"relative px-6 py-3",children:[Object(z.jsxs)("button",{className:"inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200",onClick:function(){o(!c)},"aria-haspopup":"true",children:[Object(z.jsxs)("span",{className:"inline-flex items-center",children:[Object(z.jsx)(C,{className:"w-5 h-5","aria-hidden":"true",icon:t.icon}),Object(z.jsx)("span",{className:"ml-4",children:t.name})]}),Object(z.jsx)(k.DropdownIcon,{className:"w-4 h-4","aria-hidden":"true"})]}),Object(z.jsx)(R.Transition,{show:c,enter:"transition-all ease-in-out duration-300",enterFrom:"opacity-25 max-h-0",enterTo:"opacity-100 max-h-xl",leave:"transition-all ease-in-out duration-300",leaveFrom:"opacity-100 max-h-xl",leaveTo:"opacity-0 max-h-0",children:Object(z.jsx)("ul",{className:"p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900","aria-label":"submenu",children:t.routes.map((function(e){return Object(z.jsx)("li",{className:"px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200",children:Object(z.jsx)(N.b,{className:"w-full",to:e.path,children:e.name})},e.name)}))})})]},t.name)},S=n(72),T=["icon"];function F(e){var t=e.icon,n=Object(g.a)(e,T),r=k[t];return Object(z.jsx)(r,Object(a.a)({},n))}var M=function(){return Object(z.jsxs)("div",{className:"py-4 text-gray-500 dark:text-gray-400",children:[Object(z.jsxs)("div",{className:"flex items-center justify-left",children:[Object(z.jsx)("img",{className:"h-8 w-8 ml-4 ",src:S.a,alt:"logo"}),Object(z.jsx)(N.b,{className:"  text-lg font-bold ml-3 text-gray-800 dark:text-gray-200",to:"/home",children:"CryptoFunnel"})]}),Object(z.jsx)("ul",{className:"mt-6",children:w.map((function(e){return e.routes?Object(z.jsx)(P,{route:e},e.name):Object(z.jsx)("li",{className:"relative px-6 py-3",children:Object(z.jsxs)(N.c,{exact:!0,to:e.path,className:"inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200",activeClassName:"text-gray-800 dark:text-gray-100",children:[Object(z.jsx)(c.b,{path:e.path,exact:e.exact,children:Object(z.jsx)("span",{className:"absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg","aria-hidden":"true"})}),Object(z.jsx)(F,{className:"w-5 h-5","aria-hidden":"true",icon:e.icon}),Object(z.jsx)("span",{className:"ml-4",children:e.name})]})},e.name)}))})]})};var q=function(e){return Object(z.jsx)("aside",{className:"z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white shadow-md dark:bg-gray-800 lg:block",children:Object(z.jsx)(M,{})})},D=n(97);var J=function(){var e=Object(r.useContext)(D.a),t=e.isSidebarOpen,n=e.closeSidebar;return Object(z.jsx)(R.Transition,{show:t,children:Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(R.Transition,{enter:"transition ease-in-out duration-150",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"transition ease-in-out duration-150",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:Object(z.jsx)(R.Backdrop,{onClick:n})}),Object(z.jsx)(R.Transition,{enter:"transition ease-in-out duration-150",enterFrom:"opacity-0 transform -translate-x-20",enterTo:"opacity-100",leave:"transition ease-in-out duration-150",leaveFrom:"opacity-100",leaveTo:"opacity-0 transform -translate-x-20",children:Object(z.jsx)("aside",{className:"fixed inset-y-0 z-50 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 lg:hidden",children:Object(z.jsx)(M,{})})})]})})};var B=function(){return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(q,{}),Object(z.jsx)(J,{})]})},E=n(32);var L=function(){Object(c.g)();var e=Object(r.useContext)(R.WindmillContext),t=(e.mode,e.toggleMode,Object(r.useContext)(D.a).toggleSidebar),n=Object(r.useState)(!1),a=Object(I.a)(n,2),o=(a[0],a[1],Object(r.useState)(!1)),s=Object(I.a)(o,2);return s[0],s[1],Object(z.jsx)("header",{className:"z-40 py-4 bg-white shadow-sm shadow-bottom dark:bg-gray-800",children:Object(z.jsxs)("div",{className:"container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300",children:[Object(z.jsx)("button",{className:"p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple",onClick:t,"aria-label":"Menu",children:Object(z.jsx)(k.MenuIcon,{className:"w-6 h-6","aria-hidden":"true"})}),Object(z.jsx)("div",{className:"flex justify-center flex-1 lg:mr-32"}),Object(z.jsx)("ul",{className:"flex items-center flex-shrink-0 space-x-6",children:Object(z.jsx)("a",{className:"text-gray-900 cursor-pointer font-semibold",onClick:function(){Object(E.c)()},href:"/",children:"Log Out"})})]})})};var W=function(e){var t=e.children;return Object(z.jsx)("main",{className:"h-full overflow-y-auto",children:Object(z.jsx)("div",{className:"container grid px-6 mx-auto",children:t})})},A=n(111),G=Object(r.lazy)((function(){return n.e(18).then(n.bind(null,187))}));t.default=function(){var e=Object(r.useContext)(D.a),t=e.isSidebarOpen,n=e.closeSidebar,o=Object(c.h)();return Object(r.useEffect)((function(){n()}),[o]),Object(z.jsxs)("div",{className:"flex h-screen bg-white dark:bg-gray-900 ".concat(t&&"overflow-hidden"),children:[Object(z.jsx)(B,{}),Object(z.jsxs)("div",{className:"flex flex-col flex-1 w-full",children:[Object(z.jsx)(L,{}),Object(z.jsx)(W,{children:Object(z.jsx)(r.Suspense,{fallback:Object(z.jsx)(A.a,{}),children:Object(z.jsxs)(c.d,{children:[y.map((function(e,t){return e.component?Object(z.jsx)(c.b,{exact:!0,path:"/app".concat(e.path),render:function(t){return Object(z.jsx)(e.component,Object(a.a)({},t))}},t):null})),Object(z.jsx)(c.a,{exact:!0,from:"/app",to:"/app/dashboard"}),Object(z.jsx)(c.b,{component:G})]})})})]})]})}}}]);
//# sourceMappingURL=17.61f6aecc.chunk.js.map