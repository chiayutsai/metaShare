(self.webpackChunkreact_web_starter_kit=self.webpackChunkreact_web_starter_kit||[]).push([[757],{69280:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return E}});var n,o=t(90013),i=t(94184),a=t.n(i),l=t(84751),c=t(24936),s=(t(45697),t(67294)),f=t(16155),d=t(80599),u=t(34350),v=t(6048),m=t(82508),p=t(94705),y=t(95169);function b(e,r,t,o){n||(n="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=e&&e.defaultProps,a=arguments.length-3;if(r||0===a||(r={children:void 0}),1===a)r.children=o;else if(a>1){for(var l=new Array(a),c=0;c<a;c++)l[c]=arguments[c+3];r.children=l}if(r&&i)for(var s in i)void 0===r[s]&&(r[s]=i[s]);else r||(r=i||{});return{$$typeof:n,type:e,key:void 0===t?null:""+t,ref:null,props:r,_owner:null}}var h,w,x,k,g=function(e){var r=e.user,t=e.followAt,n=(0,l.I0)(),o=(0,s.useCallback)((function(){n((0,f.cf)({name:p.zJ,user:r}))}),[n,r]);return b("div",{className:"w-full flex flex-col mini:flex-row items-start justify-between mini:items-center"},void 0,b("div",{className:"flex items-center mb-2 mini:mb-0"},void 0,b("div",{className:"w-10 h-10 mr-2 xs:w-14 xs:h-14 xs:mr-3 shrink-0"},void 0,b(d.Z,{avatorUrl:r.avator,isRounded:!0})),b("div",{},void 0,b(v.Z,{to:"/metaShare/profile/".concat(r._id),className:"text-lg font-bold leading-none hover:text-primary-800 dark:hover:text-primary-400"},void 0,r.name),b("p",{className:"text-sm "},void 0,"你已追蹤",b("span",{className:"font-bold text-base text-primary-900 dark:text-primary-500 mx-0.5 "},void 0,(0,y.Fb)(t)),"天"),b("p",{className:"text-sm text-gray-800 dark:text-white/40"},void 0,"追蹤時間: ",(0,y.bU)(t)))),b("div",{className:"ml-12 mini:ml-0"},void 0,b(u.ZP,{type:m.yu,content:"取消追蹤",onClick:o})))},O=t(31149),j=t(97339),P=t(85893);function N(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function S(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function _(e,r,t,n){k||(k="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(r||0===i||(r={children:void 0}),1===i)r.children=n;else if(i>1){for(var a=new Array(i),l=0;l<i;l++)a[l]=arguments[l+3];r.children=a}if(r&&o)for(var c in o)void 0===r[c]&&(r[c]=o[c]);else r||(r=o||{});return{$$typeof:k,type:e,key:void 0===t?null:""+t,ref:null,props:r,_owner:null}}var $,C,Z=function(){var e=(0,l.v9)(O.E2),r=(0,l.v9)(j.mX),t=r.length%2==0,n=0===(null==r?void 0:r.length)&&!e;return _("div",{className:"bg-white dark:bg-dark-bg shadow-card dark:shadow-dark-card py-3 px-4 rounded"},void 0,h||(h=_("p",{className:"font-bold text-primary-900 text-xl mb-4"},void 0,"追蹤名單")),w||(w=_("div",{className:"mb-3"},void 0,_(c.Z,{}))),n&&(x||(x=_("p",{className:"text-sm text-center text-gray-600 my-14"},void 0,"還沒有追蹤任何人喔"))),!n&&_("div",{className:"flex justify-between flex-wrap"},void 0,r.map((function(e,r){return _("div",{className:a()("w-full 2xl:w-1/2 py-4 2xl:even:pl-4 2xl:odd:pr-4 border-b border-gray-400 dark:border-dark-primary-500/50 last:border-none ",{"nth-last-child-two ":t})},"post".concat(r+1),(0,P.jsx)(g,function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?N(Object(t),!0).forEach((function(r){S(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):N(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}({},e)))}))))};function A(e,r,t,n){C||(C="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(r||0===i||(r={children:void 0}),1===i)r.children=n;else if(i>1){for(var a=new Array(i),l=0;l<i;l++)a[l]=arguments[l+3];r.children=a}if(r&&o)for(var c in o)void 0===r[c]&&(r[c]=o[c]);else r||(r=o||{});return{$$typeof:C,type:e,key:void 0===t?null:""+t,ref:null,props:r,_owner:null}}function D(e,r,t,n,o,i,a){try{var l=e[i](a),c=l.value}catch(e){return void t(e)}l.done?r(c):Promise.resolve(c).then(n,o)}var E=function(){var e,r=(e=regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",{title:"metaShare",chunks:["follow"],needCheckUser:!0,component:$||($=A(o.Z,{view:"home"},void 0,A(Z,{})))});case 1:case"end":return e.stop()}}),e)})),function(){var r=this,t=arguments;return new Promise((function(n,o){var i=e.apply(r,t);function a(e){D(i,n,o,a,l,"next",e)}function l(e){D(i,n,o,a,l,"throw",e)}a(void 0)}))});return function(){return r.apply(this,arguments)}}()}}]);