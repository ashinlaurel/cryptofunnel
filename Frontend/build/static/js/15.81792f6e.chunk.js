(this["webpackJsonpcrypto-funnel"]=this["webpackJsonpcrypto-funnel"]||[]).push([[15],{178:function(e,t,a){"use strict";a(1);var s=a(0);t.a=function(e){var t=e.children;return Object(s.jsx)("h1",{className:"my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200",children:t})}},188:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return p}));var s=a(17),c=a.n(s),n=a(27),r=a(6),l=a(1),o=a(15),d=a(26),i=a(5),j=a(178),x=a(32),b=a.n(x),m=a(14),u=a(0);function p(){Object(o.g)(),Object(o.i)().id;var e=Object(l.useState)(!1),t=Object(r.a)(e,2),a=(t[0],t[1],Object(l.useState)(!1)),s=Object(r.a)(a,2),x=s[0],p=s[1],O=Object(l.useState)(!1),h=Object(r.a)(O,2),f=h[0],y=h[1],g=Object(l.useState)(""),N=Object(r.a)(g,2),w=N[0],v=N[1],k=Object(l.useState)(""),C=Object(r.a)(k,2),P=C[0],S=C[1],I=Object(l.useState)(""),M=Object(r.a)(I,2),B=M[0],T=M[1],F=Object(l.useState)({employeeID:"",username:"",email:"",customerName:"",address:"",district:"",state:"",locationType:"",pincode:"",GSTnumber:"",contactPerson:"",contactNo:"",altContact:"",WhatsappNo:"",role:0,parentCustomerId:"",show_password:""}),D=Object(r.a)(F,2),H=D[0],E=D[1],J=Object(l.useState)({email:"",name:"",enc_password:"",confpassword:""}),L=Object(r.a)(J,2),_=(L[0],L[1],function(){var e=Object(n.a)(c.a.mark((function e(){var t,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={id:m.a.getId(),pass:w},e.prev=1,e.next=4,b()({url:"".concat(d.a,"/").concat(m.a.getId(),"/resetpassword"),method:"POST",data:t});case 4:a=e.sent,y(!0),p(!1),console.log("Done",a),e.next=13;break;case 10:throw e.prev=10,e.t0=e.catch(1),e.t0;case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}()),z=function(){var e=Object(n.a)(c.a.mark((function e(){var t,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={id:m.a.getId()},e.prev=1,e.next=4,b()({url:"".concat(d.a,"/userinfo"),method:"POST",data:t});case 4:a=e.sent,console.log("Done",a.data),E(a.data[0]),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.log("error",e.t0);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(){return e.apply(this,arguments)}}();Object(l.useEffect)((function(){z()}),[]);return Object(u.jsxs)("div",{children:[Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)(i.Modal,{isOpen:x,onClose:function(){return p(!1)},children:[Object(u.jsxs)(i.ModalHeader,{children:["Change Password for ",H.username,"!"]}),Object(u.jsx)(i.ModalBody,{children:Object(u.jsxs)("div",{className:"px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800",children:[Object(u.jsxs)(i.Label,{children:[Object(u.jsx)("span",{children:"New Password"}),Object(u.jsx)(i.Input,{className:"mt-5",type:"password",value:w,onChange:function(e){return v(e.target.value)},placeholder:"New Password"})]})," ",Object(u.jsxs)(i.Label,{children:[Object(u.jsx)("span",{children:"Confirm Password"}),Object(u.jsx)(i.Input,{className:"my-5",type:"password",placeholder:"Confirm Password",value:P,onChange:function(e){S(e.target.value),e.target.value!=w?T("Passwords do not match!"):T("")}})]}),Object(u.jsx)(i.HelperText,{valid:!1,children:B})]})}),Object(u.jsx)(i.ModalFooter,{children:Object(u.jsx)(i.Button,{className:"w-full sm:w-auto",onClick:function(){w===P&&_()},children:"Change Password"})})]})}),Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)(i.Modal,{isOpen:f,onClose:function(){return y(!1)},children:[Object(u.jsx)(i.ModalHeader,{children:"Password Updated Successfully!"}),Object(u.jsx)(i.ModalBody,{}),Object(u.jsx)(i.ModalFooter,{children:Object(u.jsx)(i.Button,{className:"w-full sm:w-auto",onClick:function(){return y(!1)},children:"Okay!"})})]})}),Object(u.jsxs)(j.a,{children:["Profile Information ",H.employeeName]}),Object(u.jsx)(i.Card,{className:"mb-8 shadow-md",children:Object(u.jsxs)(i.CardBody,{children:[Object(u.jsxs)("div",{className:"flex flex-row flex-wrap ",children:[Object(u.jsxs)("div",{className:"w-1/2",children:[Object(u.jsxs)("p",{className:"text-lg  text-gray-800 dark:text-gray-100",children:[Object(u.jsx)("span",{className:"font-semibold",children:" Personal Information"})," "]}),Object(u.jsxs)("p",{className:"text-md text-gray-700 dark:text-gray-100 py-2",children:[Object(u.jsx)("span",{className:"font-semibold",children:" Name:"})," ",m.a.getName()]}),Object(u.jsxs)("p",{className:"text-md text-gray-700 dark:text-gray-100 py-2",children:[Object(u.jsx)("span",{className:"font-semibold",children:" Email:"})," ",H.email]}),Object(u.jsxs)("p",{className:"text-md text-gray-700 dark:text-gray-100 py-2",children:[Object(u.jsx)("span",{className:"font-semibold",children:" Phone:"})," ",H.phone]})]}),Object(u.jsxs)("div",{className:" w-1/2",children:[Object(u.jsxs)("p",{className:"text-lg  text-gray-800 dark:text-gray-100",children:[Object(u.jsx)("span",{className:"font-semibold",children:" Contact Information"})," "]}),Object(u.jsxs)("p",{className:"text-md text-gray-700 dark:text-gray-100 py-2",children:[Object(u.jsx)("span",{className:"font-semibold",children:" Address:"})," ",H.address]}),Object(u.jsxs)("p",{className:"text-md text-gray-700 dark:text-gray-100 py-2",children:[Object(u.jsx)("span",{className:"font-semibold",children:" City:"})," ",H.city]}),Object(u.jsxs)("p",{className:"text-md text-gray-700 dark:text-gray-100 py-2",children:[Object(u.jsx)("span",{className:"font-semibold",children:" State:"})," ",H.state]}),Object(u.jsxs)("p",{className:"text-md text-gray-700 dark:text-gray-100 py-2",children:[Object(u.jsx)("span",{className:"font-semibold",children:" Country:"})," ",H.country]}),Object(u.jsxs)("p",{className:"text-md text-gray-700 dark:text-gray-100 py-2",children:[Object(u.jsx)("span",{className:"font-semibold",children:" Zip:"})," ",H.zip]})]})]}),Object(u.jsx)("div",{className:"my-10",children:Object(u.jsx)(i.Button,{className:"",onClick:function(){return p(!0)},children:"Reset Password"})})]})})]})}}}]);
//# sourceMappingURL=15.81792f6e.chunk.js.map