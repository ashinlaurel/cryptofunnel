(this["webpackJsonpcrypto-funnel"]=this["webpackJsonpcrypto-funnel"]||[]).push([[14],{178:function(e,t,c){"use strict";c(1);var a=c(0);t.a=function(e){var t=e.children;return Object(a.jsx)("h1",{className:"my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200",children:t})}},194:function(e,t,c){"use strict";c.r(t);var a=c(8),n=c.n(a),r=c(17),l=c(6),s=c(1),o=c(178),d=c(14),i=c(5),j=c(20),u=c.n(j),b=c(16),O=c(0);t.default=function(){var e=Object(s.useState)(1),t=Object(l.a)(e,2),c=(t[0],t[1],Object(s.useState)([])),a=Object(l.a)(c,2),j=a[0],h=a[1],x=Object(s.useState)(""),f=Object(l.a)(x,2),p=f[0],m=f[1],g=Object(s.useState)("10"),y=Object(l.a)(g,2),v=y[0],C=y[1],k=Object(s.useState)(!0),w=Object(l.a)(k,2),N=w[0],S=w[1],T=Object(s.useState)(!1),I=Object(l.a)(T,2),B=I[0],M=I[1],A=Object(s.useState)(!1),R=Object(l.a)(A,2),F=R[0],q=R[1],z=Object(s.useState)(""),D=Object(l.a)(z,2),H=D[0],Y=D[1];console.log("ROLE",d.a.getRole());var E=Object(s.useState)(20),J=Object(l.a)(E,2),L=(J[0],J[1]),P=Object(s.useState)(!1),G=Object(l.a)(P,2),K=G[0],Q=G[1];function U(){Q(!1)}Object(s.useEffect)((function(){!function(){var e=Object(r.a)(n.a.mark((function e(){var t,c;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("checker called"),t={pages:{page:1,limit:10},filters:{creatorId:d.a.getId()}},e.prev=2,e.next=5,u()({url:"".concat(b.a,"/refferal/").concat(d.a.getId(),"/getbyuser"),method:"POST",data:t});case 5:c=e.sent,console.log(c.data.out),L(c.data.total),h(c.data.out),0!=c.data.out.length&&M(!0),e.next=15;break;case 12:throw e.prev=12,e.t0=e.catch(2),e.t0;case 15:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(){return e.apply(this,arguments)}}()()}),[N]);var V=function(){var e=Object(r.a)(n.a.mark((function e(){var t;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d.a.getId(),e.prev=1,e.next=4,u.a.post("".concat(b.a,"/user/").concat(d.a.getId(),"/requestInfluencer"));case 4:t=e.sent,console.log(t.data),Y("Request Send!"),q(!0),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(1),Y("Sorry, an error occured!"),q(!0);case 14:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}(),W=function(){var e=Object(r.a)(n.a.mark((function e(){var t,c,a,r;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=d.a.getId(),c=d.a.getName(),console.log(t),a={creatorName:c,creatorId:t,refCode:p,discount:v},e.next=6,u.a.post("".concat(b.a,"/refferal/").concat(d.a.getId(),"/createnew"),a);case 6:r=e.sent,console.log(r.data),m(""),C(""),S(!N),Q(!1);case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)(i.Modal,{isOpen:K,onClose:U,children:[Object(O.jsx)(i.ModalHeader,{children:"New Refferal Code"}),Object(O.jsxs)(i.ModalBody,{children:["You can use the following refferal code to get a discount !!",Object(O.jsx)("div",{className:"flex items-center justify-center my-2",children:Object(O.jsx)("div",{className:"bg-gray-200 my-2 flex font-bold py-2 px-32 text-lg  items-center justify-center rounded-lg",children:Object(O.jsx)("div",{children:p})})})]}),Object(O.jsxs)(i.ModalFooter,{children:[Object(O.jsx)("div",{className:"hidden sm:block",children:Object(O.jsx)(i.Button,{layout:"outline",onClick:U,children:"Cancel"})}),Object(O.jsx)("div",{className:"hidden sm:block",children:Object(O.jsx)(i.Button,{onClick:W,children:"Accept"})}),Object(O.jsx)("div",{className:"block w-full sm:hidden",children:Object(O.jsx)(i.Button,{block:!0,size:"large",layout:"outline",onClick:U,children:"Cancel"})}),Object(O.jsx)("div",{className:"block w-full sm:hidden",children:Object(O.jsx)(i.Button,{onClick:W,block:!0,size:"large",children:"Accept"})})]})]}),Object(O.jsx)(O.Fragment,{children:Object(O.jsxs)(i.Modal,{isOpen:F,onClose:function(){return q(!1)},children:[Object(O.jsx)(i.ModalHeader,{children:H}),Object(O.jsx)(i.ModalBody,{}),Object(O.jsx)(i.ModalFooter,{children:Object(O.jsx)(i.Button,{className:"w-full sm:w-auto",onClick:function(){return q(!1)},children:"Okay!"})})]})}),Object(O.jsx)(o.a,{children:"Refferals"}),B?Object(O.jsx)(i.TableContainer,{children:Object(O.jsxs)(i.Table,{children:[Object(O.jsx)(i.TableHeader,{children:Object(O.jsxs)("tr",{children:[Object(O.jsx)(i.TableCell,{children:"Code"}),Object(O.jsx)(i.TableCell,{children:"Discount"}),Object(O.jsx)(i.TableCell,{children:"Status"}),Object(O.jsx)(i.TableCell,{children:"Created At"})]})}),Object(O.jsx)(i.TableBody,{children:j.map((function(e,t){return Object(O.jsxs)(i.TableRow,{children:[Object(O.jsx)(i.TableCell,{children:Object(O.jsx)("span",{className:"text-sm bg-gray-200 py-1 px-2 font-bold rounded-lg",children:e.refCode})}),Object(O.jsx)(i.TableCell,{children:Object(O.jsxs)("span",{className:"text-sm ",children:[e.discount,"%"]})}),Object(O.jsx)(i.TableCell,{children:Object(O.jsx)(i.Badge,{type:e.status,children:"Active"})}),Object(O.jsx)(i.TableCell,{children:Object(O.jsx)("span",{className:"text-sm",children:new Date(e.createdAt).toLocaleDateString()})})]},t)}))})]})}):null,4!=d.a.role?Object(O.jsxs)("div",{className:" w-1/2 mt-6 mb-4 text-gray-100",children:[Object(O.jsx)("p",{children:"You can get your own referal codes only with an Influencer account. Click the button to apply and reach out to us at support@thecfsquad.com with your resume to get your Influencer account."}),Object(O.jsx)(i.Button,{onClick:V,size:"small",className:"mt-5",children:"Apply for Influencer"})]}):Object(O.jsx)("p",{className:"text-white",children:"You have been approved as an Influencer"})]})}}}]);
//# sourceMappingURL=14.a4cfbe20.chunk.js.map