(this["webpackJsonpcrypto-funnel"]=this["webpackJsonpcrypto-funnel"]||[]).push([[13],{178:function(e,t,c){"use strict";c(1);var a=c(0);t.a=function(e){var t=e.children;return Object(a.jsx)("h1",{className:"my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200",children:t})}},192:function(e,t,c){"use strict";c.r(t);var a=c(8),r=c.n(a),l=c(19),n=c(6),s=c(1),o=c(178),i=c(15),d=c(5),b=c(20),j=c.n(b),u=c(18),h=c(0);t.default=function(){var e=Object(s.useState)(1),t=Object(n.a)(e,2),c=t[0],a=t[1],b=Object(s.useState)([]),x=Object(n.a)(b,2),f=x[0],O=x[1],p=Object(s.useState)(""),g=Object(n.a)(p,2),m=g[0],y=g[1],v=Object(s.useState)("0"),w=Object(n.a)(v,2),C=w[0],k=w[1],N=Object(s.useState)(!0),S=Object(n.a)(N,2),T=S[0],B=S[1],D=Object(s.useState)(""),z=Object(n.a)(D,2),I=z[0],M=z[1],A=Object(s.useState)(""),F=Object(n.a)(A,2),R=F[0],P=F[1],H=Object(s.useState)(""),L=Object(n.a)(H,2),E=L[0],J=L[1],_=Object(s.useState)(!1),G=Object(n.a)(_,2),Y=G[0],q=G[1],K=Object(s.useState)(""),Q=Object(n.a)(K,2),U=Q[0],V=Q[1],W=Object(s.useState)(20),X=Object(n.a)(W,2),Z=X[0],$=X[1],ee=Object(s.useState)(!1),te=Object(n.a)(ee,2),ce=te[0],ae=te[1];function re(){ae(!1)}Object(s.useEffect)((function(){!function(){var e=Object(l.a)(r.a.mark((function e(){var t,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("getter called"),t={pages:{page:c,limit:10},filters:{creatorId:E,fromDate:I,toDate:R}},e.prev=2,e.next=5,j()({url:"".concat(u.a,"/refferal/").concat(i.a.getId(),"/getbyuser"),method:"POST",data:t});case 5:a=e.sent,console.log(a.data.out),$(a.data.total),O(a.data.out),e.next=14;break;case 11:throw e.prev=11,e.t0=e.catch(2),e.t0;case 14:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(){return e.apply(this,arguments)}}()()}),[c,T,I,R,E]);var le=function(){var e=Object(l.a)(r.a.mark((function e(){var t,c,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=i.a.getId(),c={creatorId:t},e.next=4,j.a.post("".concat(u.a,"/refferal/").concat(i.a.getId(),"/getNewCode"),c);case 4:a=e.sent,console.log(a.data),y(a.data),ae(!0);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ne=function(){var e=Object(l.a)(r.a.mark((function e(){var t,c,a,l;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=i.a.getId(),c=i.a.getName(),console.log(t),a={creatorName:c,creatorId:t,refCode:m,discount:C},e.next=6,j.a.post("".concat(u.a,"/refferal/").concat(i.a.getId(),"/createnew"),a);case 6:l=e.sent,console.log(l.data),y(""),k(""),B(!T),ae(!1);case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),se=function(){var e=Object(l.a)(r.a.mark((function e(t){var c,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.a.post("".concat(u.a,"/refferal/").concat(i.a.getId(),"/deleteRefferal"),{id:t});case 3:c=e.sent,console.log(c),a=f.filter((function(e){return e._id!=t})),O(a),V("Deleted"),q(!0),e.next=16;break;case 11:e.prev=11,e.t0=e.catch(0),console.log("Delete error",e.t0),V("Sorry,an error occured"),q(!0);case 16:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}();return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)(d.Modal,{isOpen:ce,onClose:re,children:[Object(h.jsx)(d.ModalHeader,{children:"New Refferal Code"}),Object(h.jsxs)(d.ModalBody,{children:["You can use the following refferal code to get a discount !!",Object(h.jsxs)("div",{className:"flex items-center justify-left my-2",children:[Object(h.jsxs)("label",{children:["Code:",Object(h.jsx)("div",{className:"bg-gray-200 my-2 flex font-bold py-2 px-32 text-lg  items-center justify-center rounded-lg",children:Object(h.jsx)("div",{children:m})})]}),Object(h.jsx)("div",{class:" relative ml-2",children:Object(h.jsx)("form",{onSubmit:function(e){e.preventDefault()},children:Object(h.jsxs)("label",{children:["Discount(%)",Object(h.jsx)("input",{value:C,onChange:function(e){return k(e.target.value)},placeholder:"Enter the discount %",class:"shadow-md z-20 my-2 appearance-none rounded border border-gray-400 border-b block pl-2 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"})]})})})]})]}),Object(h.jsxs)(d.ModalFooter,{children:[Object(h.jsx)("div",{className:"hidden sm:block",children:Object(h.jsx)(d.Button,{layout:"outline",onClick:re,children:"Cancel"})}),Object(h.jsx)("div",{className:"hidden sm:block",children:Object(h.jsx)(d.Button,{onClick:ne,children:"Accept"})}),Object(h.jsx)("div",{className:"block w-full sm:hidden",children:Object(h.jsx)(d.Button,{block:!0,size:"large",layout:"outline",onClick:re,children:"Cancel"})}),Object(h.jsx)("div",{className:"block w-full sm:hidden",children:Object(h.jsx)(d.Button,{onClick:ne,block:!0,size:"large",children:"Accept"})})]})]}),Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)(d.Modal,{isOpen:Y,onClose:function(){return q(!1)},children:[Object(h.jsx)(d.ModalHeader,{children:U}),Object(h.jsx)(d.ModalBody,{}),Object(h.jsx)(d.ModalFooter,{children:Object(h.jsx)(d.Button,{className:"w-full sm:w-auto",onClick:function(){return q(!1)},children:"Okay!"})})]})}),Object(h.jsx)(o.a,{children:"Refferals "}),Object(h.jsx)("div",{className:"mt-2 mb-4",children:Object(h.jsx)(d.Button,{onClick:le,size:"large",children:"Get New Refferal Code +"})}),Object(h.jsx)("div",{className:"mb-4",children:Object(h.jsxs)("div",{class:"my-2 flex sm:flex-row flex-col items-start sm:items-center sm:justify-left h-full space-x-2 ",children:[Object(h.jsxs)("label",{className:"text-gray-700 mb-1 text-sm",children:["Created By:",Object(h.jsxs)("div",{class:"relative  ",children:[Object(h.jsxs)("select",{class:" shadow-md h-full rounded border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none   focus:bg-white focus:border-gray-500",onChange:function(e){J(e.target.value)},children:[Object(h.jsx)("option",{selected:!0,value:"",children:"All"}),Object(h.jsx)("option",{value:i.a.getId(),children:"Admin"})]}),Object(h.jsx)("div",{class:"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700",children:Object(h.jsx)("svg",{class:"fill-current h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",children:Object(h.jsx)("path",{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"})})})]})]}),Object(h.jsxs)("label",{className:"text-gray-700 mb-1 text-sm",children:["Search:",Object(h.jsxs)("div",{class:"block relative ",children:[Object(h.jsx)("span",{class:"h-full absolute inset-y-0 left-0 flex items-center pl-2",children:Object(h.jsx)("svg",{viewBox:"0 0 24 24",class:"h-4 w-4 fill-current text-gray-500",children:Object(h.jsx)("path",{d:"M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"})})}),Object(h.jsx)("form",{onSubmit:function(e){e.preventDefault(),B(!T)},children:Object(h.jsx)("input",{placeholder:"Search",class:"shadow-md z-20 appearance-none rounded border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"})})]})]}),Object(h.jsxs)("label",{className:"text-gray-700 mb-1 text-sm",children:[Object(h.jsx)("span",{children:"From Date"}),Object(h.jsx)("input",{class:"shadow-md z-20 appearance-none rounded border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none",type:"date",value:I,onChange:function(e){return M(e.target.value)}})]}),Object(h.jsxs)("label",{className:"text-gray-700 mb-1 text-sm",children:[Object(h.jsx)("span",{children:"To Date"}),Object(h.jsx)("input",{class:"shadow-md z-20 appearance-none rounded border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none",type:"date",value:R,onChange:function(e){return P(e.target.value)}})]})]})}),Object(h.jsxs)(d.TableContainer,{children:[Object(h.jsxs)(d.Table,{children:[Object(h.jsx)(d.TableHeader,{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)(d.TableCell,{children:"Code"}),Object(h.jsx)(d.TableCell,{children:"Discount"}),Object(h.jsx)(d.TableCell,{children:"Status"}),Object(h.jsx)(d.TableCell,{children:"Created At"}),Object(h.jsx)(d.TableCell,{children:"Delete"})]})}),Object(h.jsx)(d.TableBody,{children:f.map((function(e,t){return Object(h.jsxs)(d.TableRow,{children:[Object(h.jsx)(d.TableCell,{children:Object(h.jsx)("span",{className:"text-sm bg-gray-200 py-1 px-2 font-bold rounded-lg",children:e.refCode})}),Object(h.jsx)(d.TableCell,{children:Object(h.jsxs)("span",{className:"text-sm ",children:[e.discount,"%"]})}),Object(h.jsx)(d.TableCell,{children:Object(h.jsx)(d.Badge,{type:e.status,children:"Active"})}),Object(h.jsx)(d.TableCell,{children:Object(h.jsx)("span",{className:"text-sm",children:new Date(e.createdAt).toLocaleDateString()})}),Object(h.jsx)(d.TableCell,{children:Object(h.jsx)(d.Button,{layout:"outline",onClick:function(){return se(e._id)},children:"Delete"})})]},t)}))})]}),Object(h.jsx)(d.TableFooter,{children:Object(h.jsx)(d.Pagination,{totalResults:Z,resultsPerPage:10,label:"Table navigation",onChange:function(e){a(e)}})})]})]})}}}]);
//# sourceMappingURL=13.e72a2581.chunk.js.map