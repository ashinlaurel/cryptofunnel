(this["webpackJsonpcrypto-funnel"]=this["webpackJsonpcrypto-funnel"]||[]).push([[4],{178:function(e,t,n){"use strict";n(1);var a=n(0);t.a=function(e){var t=e.children;return Object(a.jsx)("h1",{className:"my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200",children:t})}},180:function(e,t,n){"use strict";n(1);var a=n(0);t.a=function(e){var t=e.children;return Object(a.jsx)("h2",{className:"mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300",children:t})}},181:function(e,t,n){"use strict";n(1);var a=n(0);t.a=function(){return Object(a.jsxs)("a",{className:"flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple",href:"https://github.com/estevanmaito/windmill-dashboard-react",children:[Object(a.jsxs)("div",{className:"flex items-center",children:[Object(a.jsx)("svg",{className:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20",children:Object(a.jsx)("path",{d:"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"})}),Object(a.jsx)("span",{children:"Star this project on GitHub"})]}),Object(a.jsxs)("span",{children:["View more ",Object(a.jsx)("span",{dangerouslySetInnerHTML:{__html:"&RightArrow;"}})]})]})}},203:function(e,t,n){"use strict";n.r(t);var a=n(8),c=n.n(a),r=n(19),s=n(6),l=n(1),o=n(178),i=(n(180),n(181),n(5)),u=n(0);n(79),n(67);var d=n(112),j=n(15),b=n(20),h=n.n(b),x=n(18);t.default=function(){var e=Object(l.useState)(0),t=Object(s.a)(e,2),n=t[0],a=t[1],b=Object(l.useState)(!1),p=Object(s.a)(b,2),O=p[0],m=p[1],f=Object(l.useState)(!1),g=Object(s.a)(f,2),y=g[0],v=g[1],w=Object(l.useState)(""),k=Object(s.a)(w,2),N=k[0],C=k[1],M=function(){var e=Object(r.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={id:j.a.getId()},e.prev=1,e.next=4,h()({url:"".concat(x.a,"/userinfo"),method:"POST",data:t});case 4:n=e.sent,console.log("Done",n.data[0].userId.plan),a(n.data[0].userId.plan),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.log("error",e.t0);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=Object(r.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.a.post("".concat(x.a,"/payment/").concat(j.a.getId(),"/deletePlan"),{id:j.a.getId()});case 3:e.sent,m(!1),C("Successfully deleted your plan"),v(!0),a(0),j.a.setRole(2),e.next=16;break;case 11:e.prev=11,e.t0=e.catch(0),C("Sorry and error occured"),v(!0),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}();Object(l.useEffect)((function(){M()}),[]);var F=function(){var e=Object(r.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.a.post("".concat(x.a,"/payment/").concat(j.a.getId(),"/getMangeSubscriptionURL"),{id:j.a.getId()});case 3:t=e.sent,console.log(t.data.url),window.location.assign(t.data.url),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)(i.Modal,{isOpen:O,onClose:function(){return m(!1)},children:[Object(u.jsx)(i.ModalHeader,{children:"You are perpemanently deleting your plan!"}),Object(u.jsx)(i.ModalBody,{}),Object(u.jsx)(i.ModalFooter,{children:Object(u.jsx)(i.Button,{className:"w-full sm:w-auto",onClick:function(){return S(!1)},children:"Okay!"})})]})}),Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)(i.Modal,{isOpen:y,onClose:function(){return v(!1)},children:[Object(u.jsx)(i.ModalHeader,{children:N}),Object(u.jsx)(i.ModalBody,{}),Object(u.jsx)(i.ModalFooter,{children:Object(u.jsx)(i.Button,{className:"w-full sm:w-auto",onClick:function(){return v(!1)},children:"Okay!"})})]})}),2==j.a.getRole()?Object(u.jsx)("div",{className:"",children:Object(u.jsx)(d.a,{})}):Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(o.a,{children:"Your Plan"}),Object(u.jsx)(i.Card,{className:"mb-5 text-gray-100  rounded-lg",children:Object(u.jsx)(i.CardBody,{children:Object(u.jsx)("div",{className:"flex items-center",children:Object(u.jsxs)("div",{children:[n?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("p",{className:"mb-4 font-semibold",children:"Congratulations!"}),Object(u.jsxs)("p",{children:["You have purchased our"," ",Object(u.jsxs)("span",{className:"font-semibold",children:[1==n?Object(u.jsx)(u.Fragment,{children:"Crypto 101"}):2==n?Object(u.jsx)(u.Fragment,{children:"Crypto 201"}):3==n?Object(u.jsx)(u.Fragment,{children:"Signals and Analysis"}):null," "]}),"plan. We will contact you with more details shortly."]})]}):null,4==n?Object(u.jsx)(i.Button,{className:"my-4 ",layout:"outline",onClick:F,children:"Manage Subscription"}):Object(u.jsx)(i.Button,{className:"my-4 ",layout:"outline",onClick:function(){return m(!0)},children:"Delete Plan"}),Object(u.jsx)("div",{})]})})})})]})]})}}}]);
//# sourceMappingURL=4.6df55a3c.chunk.js.map