(this["webpackJsonpcrypto-funnel"]=this["webpackJsonpcrypto-funnel"]||[]).push([[8],{162:function(e,t,c){"use strict";c(1);var a=c(0);t.a=function(e){var t=e.children;return Object(a.jsx)("h1",{className:"my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200",children:t})}},171:function(e,t,c){"use strict";c.r(t);var a=c(16),n=c.n(a),r=c(27),l=c(6),s=c(1),o=c(162),d=c(31),i=c(5),j=c(33),b=c.n(j),u=c(28),O=c(0);t.default=function(){var e=Object(s.useState)(1),t=Object(l.a)(e,2),c=(t[0],t[1],Object(s.useState)([])),a=Object(l.a)(c,2),j=a[0],h=a[1],x=Object(s.useState)(""),f=Object(l.a)(x,2),p=f[0],m=f[1],g=Object(s.useState)("10"),v=Object(l.a)(g,2),C=v[0],y=v[1],k=Object(s.useState)(!0),w=Object(l.a)(k,2),N=w[0],T=w[1],S=Object(s.useState)(!1),I=Object(l.a)(S,2),B=I[0],A=I[1],M=Object(s.useState)(20),R=Object(l.a)(M,2),z=(R[0],R[1]),D=Object(s.useState)(!1),F=Object(l.a)(D,2),H=F[0],J=F[1];function E(){J(!1)}Object(s.useEffect)((function(){!function(){var e=Object(r.a)(n.a.mark((function e(){var t,c;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("checker called"),t={pages:{page:1,limit:10},filters:{creatorId:d.a.getId()}},e.prev=2,e.next=5,b()({url:"".concat(u.a,"/refferal/").concat(d.a.getId(),"/getbyuser"),method:"POST",data:t});case 5:c=e.sent,console.log(c.data.out),z(c.data.total),h(c.data.out),0!=c.data.out.length&&A(!0),e.next=15;break;case 12:throw e.prev=12,e.t0=e.catch(2),e.t0;case 15:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(){return e.apply(this,arguments)}}()()}),[N]);var G=function(){var e=Object(r.a)(n.a.mark((function e(){var t,c,a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=d.a.getId(),c={creatorId:t},e.next=4,b.a.post("".concat(u.a,"/refferal/").concat(d.a.getId(),"/getNewCode"),c);case 4:a=e.sent,console.log(a.data),m(a.data),J(!0);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),L=function(){var e=Object(r.a)(n.a.mark((function e(){var t,c,a,r;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=d.a.getId(),c=d.a.getName(),console.log(t),a={creatorName:c,creatorId:t,refCode:p,discount:C},e.next=6,b.a.post("".concat(u.a,"/refferal/").concat(d.a.getId(),"/createnew"),a);case 6:r=e.sent,console.log(r.data),m(""),y(""),T(!N),J(!1);case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)(i.Modal,{isOpen:H,onClose:E,children:[Object(O.jsx)(i.ModalHeader,{children:"New Refferal Code"}),Object(O.jsxs)(i.ModalBody,{children:["You can use the following refferal code to get a discount !!",Object(O.jsx)("div",{className:"flex items-center justify-center my-2",children:Object(O.jsx)("div",{className:"bg-gray-200 my-2 flex font-bold py-2 px-32 text-lg  items-center justify-center rounded-lg",children:Object(O.jsx)("div",{children:p})})})]}),Object(O.jsxs)(i.ModalFooter,{children:[Object(O.jsx)("div",{className:"hidden sm:block",children:Object(O.jsx)(i.Button,{layout:"outline",onClick:E,children:"Cancel"})}),Object(O.jsx)("div",{className:"hidden sm:block",children:Object(O.jsx)(i.Button,{onClick:L,children:"Accept"})}),Object(O.jsx)("div",{className:"block w-full sm:hidden",children:Object(O.jsx)(i.Button,{block:!0,size:"large",layout:"outline",onClick:E,children:"Cancel"})}),Object(O.jsx)("div",{className:"block w-full sm:hidden",children:Object(O.jsx)(i.Button,{onClick:L,block:!0,size:"large",children:"Accept"})})]})]}),Object(O.jsx)(o.a,{children:"Refferals"}),B?Object(O.jsx)(i.TableContainer,{children:Object(O.jsxs)(i.Table,{children:[Object(O.jsx)(i.TableHeader,{children:Object(O.jsxs)("tr",{children:[Object(O.jsx)(i.TableCell,{children:"Code"}),Object(O.jsx)(i.TableCell,{children:"Discount"}),Object(O.jsx)(i.TableCell,{children:"Status"}),Object(O.jsx)(i.TableCell,{children:"Created At"})]})}),Object(O.jsx)(i.TableBody,{children:j.map((function(e,t){return Object(O.jsxs)(i.TableRow,{children:[Object(O.jsx)(i.TableCell,{children:Object(O.jsx)("span",{className:"text-sm bg-gray-200 py-1 px-2 font-bold rounded-lg",children:e.refCode})}),Object(O.jsx)(i.TableCell,{children:Object(O.jsxs)("span",{className:"text-sm ",children:[e.discount,"%"]})}),Object(O.jsx)(i.TableCell,{children:Object(O.jsx)(i.Badge,{type:e.status,children:"Active"})}),Object(O.jsx)(i.TableCell,{children:Object(O.jsx)("span",{className:"text-sm",children:new Date(e.createdAt).toLocaleDateString()})})]},t)}))})]})}):Object(O.jsx)("div",{className:"mt-2 mb-4",children:Object(O.jsx)(i.Button,{onClick:G,size:"large",children:"Get New Refferal Code +"})})]})}}}]);
//# sourceMappingURL=8.db54eabc.chunk.js.map