(this["webpackJsonpcrypto-funnel"]=this["webpackJsonpcrypto-funnel"]||[]).push([[17],{168:function(e,t,s){"use strict";s.r(t);var a=s(16),c=s.n(a),n=s(26),r=s(6),o=s(1),l=s(13),d=s(5),i=s(27),j=s(32),u=s.n(j),b=s(0);t.default=function(){var e=Object(l.i)().token,t=Object(o.useState)(""),s=Object(r.a)(t,2),a=s[0],j=s[1],O=Object(o.useState)(""),x=Object(r.a)(O,2),h=x[0],p=x[1],f=Object(o.useState)(""),w=Object(r.a)(f,2),m=(w[0],w[1]),g=Object(o.useState)(!1),y=Object(r.a)(g,2),v=y[0],k=y[1],N=Object(o.useState)(""),C=Object(r.a)(N,2),P=C[0],S=C[1],M=Object(o.useState)(!1),B=Object(r.a)(M,2),F=(B[0],B[1],Object(o.useState)(!1)),R=Object(r.a)(F,2),E=R[0],H=R[1],J=Object(l.g)(),L=function(){var t=Object(n.a)(c.a.mark((function t(){var s;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,s={pass:a},t.next=4,u.a.post("".concat(i.a,"/mail/resetpasswordbytoken"),s,{headers:{Authorization:"Bearer ".concat(e)}});case 4:t.sent,H(!0),t.next=13;break;case 8:t.prev=8,t.t0=t.catch(0),console.log("VERIFY ERROR",t.t0),S("Sorry, an error occured."),k(!0);case 13:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(){return t.apply(this,arguments)}}();Object(o.useEffect)((function(){}),[]);var z=Object(o.useState)("Loading..."),A=Object(r.a)(z,2);A[0],A[1];return Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)("div",{className:"flex items-center min-h-screen p-6 bg-gray-50 bg-gray-900",children:[Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)(d.Modal,{isOpen:v,onClose:function(){return k(!1)},children:[Object(b.jsx)(d.ModalHeader,{children:P}),Object(b.jsx)(d.ModalBody,{}),Object(b.jsx)(d.ModalFooter,{children:Object(b.jsx)(d.Button,{className:"w-full sm:w-auto",onClick:function(){return k(!1)},children:"Okay!"})})]})}),Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)(d.Modal,{isOpen:E,onClose:function(){return H(!1)},children:[Object(b.jsx)(d.ModalHeader,{children:"Password Reset Successfully"}),Object(b.jsx)(d.ModalBody,{}),Object(b.jsx)(d.ModalFooter,{children:Object(b.jsx)(d.Button,{className:"w-full sm:w-auto",onClick:function(){J.push("/signin")},children:"Login to continue"})})]})}),Object(b.jsx)("div",{className:"flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-gray-900  shadow-xl dark:bg-gray-800",children:Object(b.jsxs)("div",{className:" overflow-y-auto md:flex-row  text-white  font-semibold",children:[Object(b.jsx)("div",{className:"text-xl",children:"Reset Password"}),Object(b.jsx)("div",{children:Object(b.jsxs)("div",{className:"px-4 py-3 mb-8  rounded-lg shadow-md dark:bg-gray-800",children:[Object(b.jsxs)("label",{children:[Object(b.jsx)("span",{children:"New Password"}),Object(b.jsx)("input",{className:"w-full px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded",type:"password",value:a,onChange:function(e){return j(e.target.value)},placeholder:"New Password"})]})," ",Object(b.jsxs)("label",{children:[Object(b.jsx)("span",{children:"Confirm Password"}),Object(b.jsx)("input",{className:"w-full px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded",type:"password",placeholder:"Confirm Password",resetPasswordvalue:h,onChange:function(e){p(e.target.value),e.target.value!=a?m("Passwords do not match!"):m("")}})]})]})}),Object(b.jsx)("div",{children:Object(b.jsx)(d.Button,{className:" m-2 w-full sm:w-auto",onClick:function(){if(a!==h)return S("Passwords do not match"),void k(!0);L()},children:"Change Password"})})]})})]})})}}}]);
//# sourceMappingURL=17.9ad4ee4e.chunk.js.map