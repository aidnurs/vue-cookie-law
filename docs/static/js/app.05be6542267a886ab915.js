webpackJsonp([1,2],[,,function(e,t,n){n(9);var i=n(0)(n(4),n(14),null,null);e.exports=i.exports},,function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(12),s=i(o);t.default={name:"app",components:{CookieLaw:s.default}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{buttonText:{type:String,default:"Got it!"},message:{type:String,default:"This website uses cookies to ensure you get the best experience on our website."},theme:{type:String,default:"base"},position:{type:String,default:"bottom"},transitionName:{type:String,default:"slideFromBottom"}},data:function(){return{isOpen:!1}},computed:{containerPosition:function(){return"Cookie--"+this.position},cookieTheme:function(){return"Cookie--"+this.theme}},created:function(){!this.getVisited()==!0&&(this.isOpen=!0)},methods:{setVisited:function(){localStorage.setItem("cookie:accepted",!0)},getVisited:function(){return localStorage.getItem("cookie:accepted")},accept:function(){this.setVisited(),this.isOpen=!1}}}},,,function(e,t){},function(e,t){},,,function(e,t,n){n(8);var i=n(0)(n(5),n(13),null,null);e.exports=i.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{appear:"",name:e.transitionName}},[e.isOpen?n("div",{staticClass:"Cookie",class:[e.containerPosition,e.cookieTheme]},[n("div",{staticClass:"Cookie__content"},[e._v("\n      "+e._s(e.message)+"\n    ")]),e._v(" "),n("div",{staticClass:"Cookie__button",on:{click:e.accept}},[e._v(e._s(e.buttonText))])]):e._e()])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("cookie-law")],1)},staticRenderFns:[]}},,function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var o=n(3),s=i(o),r=n(2),a=i(r);s.default.config.productionTip=!1,new s.default({el:"#app",render:function(e){return e(a.default)}})}],[16]);
//# sourceMappingURL=app.05be6542267a886ab915.js.map