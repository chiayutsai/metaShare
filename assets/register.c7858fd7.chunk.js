(self.webpackChunkreact_web_starter_kit=self.webpackChunkreact_web_starter_kit||[]).push([[685],{74527:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return P}});var n,a,o,i,l=t(90013),s=t(67294),u=t(84751),c=t(48966),m=t.n(c),f=t(96581),v=t(40326),d=t(88226),p=t(46320),y=t(63883),b=t(6048),h=t(82508),x=t(20808),g=t(22946),k=t(85893);function w(e,r,t,n){i||(i="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(r||0===o||(r={children:void 0}),1===o)r.children=n;else if(o>1){for(var l=new Array(o),s=0;s<o;s++)l[s]=arguments[s+3];r.children=l}if(r&&a)for(var u in a)void 0===r[u]&&(r[u]=a[u]);else r||(r=a||{});return{$$typeof:i,type:e,key:void 0===t?null:""+t,ref:null,props:r,_owner:null}}function N(e,r,t,n,a,o,i){try{var l=e[o](i),s=l.value}catch(e){return void t(e)}l.done?r(s):Promise.resolve(s).then(n,a)}function S(e){return function(){var r=this,t=arguments;return new Promise((function(n,a){var o=e.apply(r,t);function i(e){N(o,n,a,i,l,"next",e)}function l(e){N(o,n,a,i,l,"throw",e)}i(void 0)}))}}function C(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var t=[],n=!0,a=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(n=(i=l.next()).done)&&(t.push(i.value),!r||t.length!==r);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==l.return||l.return()}finally{if(a)throw o}}return t}(e,r)||function(e,r){if(!e)return;if("string"==typeof e)return A(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return A(e,r)}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var R,Z,_=function(){var e=(0,u.I0)(),r=(0,s.useRef)(),t=C((0,s.useState)(""),2),i=t[0],l=t[1],c=C((0,s.useState)(!0),2),N=c[0],A=c[1],R=C((0,s.useState)(""),2),Z=R[0],_=R[1],j=C((0,s.useState)(""),2),E=j[0],P=j[1],I=C((0,s.useState)(""),2),$=I[0],L=I[1],O=C((0,s.useState)(""),2),T=O[0],U=O[1],q=C((0,s.useState)(""),2),B=q[0],D=q[1],F=C((0,s.useState)(""),2),G=F[0],K=F[1],M=(0,u.v9)(g.Nl),Q=(0,s.useCallback)((function(e){var r="";return m().isEmpty(e)&&(r="暱稱為必填欄位"),P(r),r}),[]),Y=(0,s.useCallback)((function(e){var r="";return m().isEmpty(e)?r="Email為必填欄位":m().isEmail(e)||(r="請輸入正確的 Email 格式"),U(r),r}),[]),z=(0,s.useCallback)((function(e){var r="";return m().isEmpty(e)?r="密碼為必填欄位":m().isLength(e,{min:8})?(m().isNumeric(e)||m().isAlpha(e))&&(r="密碼需英數混合"):r="密碼字數低於 8 碼",D(r),r}),[]),H=(0,s.useCallback)((function(e){var r=e.target.value;_(r),N||Q(r)}),[Q,N]),J=(0,s.useCallback)((function(e){var r=e.target.value;L(r),N||Y(r)}),[Y,N]),V=(0,s.useCallback)((function(e){var r=e.target.value;K(r),N||z(r)}),[z,N]),W=(0,s.useCallback)(S(regeneratorRuntime.mark((function t(){var n,a,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(A(!1),n=Q(Z),a=Y($),o=z(G),!(n||a||o)){t.next=8;break}return r.current.focus(),r.current.select(0,-1),t.abrupt("return");case 8:return t.prev=8,t.next=11,e((0,f.cC)({name:Z,email:$,password:G}));case 11:t.next=19;break;case 13:t.prev=13,t.t0=t.catch(8),r.current.focus(),r.current.select(0,-1),l(t.t0.message);case 19:case"end":return t.stop()}}),t,null,[[8,13]])}))),[e,Q,Y,z,Z,$,G]),X=(0,s.useCallback)(S(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:e((0,f.yr)());case 1:case"end":return r.stop()}}),r)}))),[e]),ee=(0,s.useCallback)(S(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:e((0,f.Y0)());case 1:case"end":return r.stop()}}),r)}))),[e]);return(0,k.jsxs)(k.Fragment,{children:[n||(n=w("div",{className:"flex items-center  mb-6 xl:mb-9 "},void 0,w("div",{className:"login-line"}),w("h3",{className:"flex items-center font-bold text-primary-700 dark:text-primary-400 text-2xl sm:text-3xl"},void 0,"註冊",w("span",{className:"text-primary-600/60 dark:text-primary-200/80 text-xl sm:text-2xl ml-1.5"},void 0,"SIGN UP")))),w("div",{className:"flex-col sm:flex-row flex mb-6 xl:mb-9"},void 0,w("div",{className:"w-full mb-3 sm:mb-0 sm:mr-3"},void 0,w(d.Z,{type:h.Tr,onClick:ee})),w("div",{className:"w-full"},void 0,w(d.Z,{type:h.vq,onClick:X}))),a||(a=w("div",{className:"flex items-center mb-6 xl:mb-8"},void 0,w("span",{className:"w-full h-[1px] bg-gray-600 dark:bg-gray-600/70"}),w("p",{className:"mx-2 text-sm font-bold text-gray-600 dark:text-gray-600/70"},void 0,"Or"),w("span",{className:"w-full h-[1px] bg-gray-600 dark:bg-gray-600/70"}))),i&&w("div",{className:"mb-6 xl:mb-8"},void 0,w(p.Z,{content:i})),w("div",{className:" mb-12"},void 0,w(y.Z,{type:x.A1,setRef:r,showLabel:!0,handleChange:H,value:Z,errorContent:E})),w("div",{className:" mb-12"},void 0,w(y.Z,{type:x.xK,showLabel:!0,handleChange:J,value:$,errorContent:T})),w("div",{className:"mb-12"},void 0,w(y.Z,{type:x.Qj,showLabel:!0,value:G,handleChange:V,errorContent:B})),w("div",{className:"mb-6"},void 0,w(v.Z,{className:"w-full min-h-[48px] text-xl font-bold",content:"註冊",onClick:W,isDisabled:Boolean(E||T||B||M)})),o||(o=w("div",{className:"flex items-center justify-center"},void 0,w("p",{className:"text-gray-900 dark:text-gray-800 text-sm"},void 0,"已經有帳號了嗎?"),w(b.Z,{to:"/metaShare/login",className:"ml-0.5 text-primary-800 dark:text-primary-400  text-sm font-bold hover:text-primary-600 dark:hover:text-primary-600"},void 0,"前往登入")))]})};function j(e,r,t,n){Z||(Z="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var a=e&&e.defaultProps,o=arguments.length-3;if(r||0===o||(r={children:void 0}),1===o)r.children=n;else if(o>1){for(var i=new Array(o),l=0;l<o;l++)i[l]=arguments[l+3];r.children=i}if(r&&a)for(var s in a)void 0===r[s]&&(r[s]=a[s]);else r||(r=a||{});return{$$typeof:Z,type:e,key:void 0===t?null:""+t,ref:null,props:r,_owner:null}}function E(e,r,t,n,a,o,i){try{var l=e[o](i),s=l.value}catch(e){return void t(e)}l.done?r(s):Promise.resolve(s).then(n,a)}var P=function(){var e,r=(e=regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",{title:"metaShare",chunks:["register"],component:R||(R=j(l.Z,{view:"login"},void 0,j(_,{})))});case 1:case"end":return e.stop()}}),e)})),function(){var r=this,t=arguments;return new Promise((function(n,a){var o=e.apply(r,t);function i(e){E(o,n,a,i,l,"next",e)}function l(e){E(o,n,a,i,l,"throw",e)}i(void 0)}))});return function(){return r.apply(this,arguments)}}()}}]);