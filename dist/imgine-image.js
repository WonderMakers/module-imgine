(()=>{"use strict";var e={102:(e,t,r)=>{r.d(t,{default:()=>d});var o={};r.r(o);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("picture",[e._l(e.formats,(function(t){return r("source",{key:t,attrs:{srcset:e.getSrcset(t),sizes:e.sizes.join(", "),type:"image/"+t}})})),e._v(" "),r("source",{attrs:{srcset:e.getSrcset(),sizes:e.sizes.join(", ")}}),e._v(" "),r("img",{ref:"image",class:e.$style.image,attrs:{src:e.src,alt:e.alt,loading:e.loading},on:{load:e.onLoad,error:e.onError}})],2)};n._withStripped=!0;const s={name:"ImgineImage",mixins:[r(10).Z],computed:{currentSrc(){return this.$refs.image.currentSrc||this.$refs.image.src}},methods:{getSrcset(e=null){return this.map.map((t=>this.$imgine.format(this.src,{w:t,f:e})+` ${t}w`)).join(", ")},onLoad(){this.$emit("load")},onError(){this.$emit("error")}},mounted(){this.$emit("preload",{type:"image",src:this.currentSrc}),this.$refs.image.complete&&this.onLoad()}};var i=r(900);e=r.hmd(e);var a={};e.hot,e.hot;var l=(0,i.Z)(s,n,[],!1,(function(e){a.$style=o.default.locals||o.default,Object.defineProperty(this,"$style",{configurable:!0,get:function(){return a.$style}})}),null,null);l.options.__file="src/nuxt-components/imgine-image.vue";const d=l.exports},900:(e,t,r)=>{function o(e,t,r,o,n,s,i,a){var l,d="function"==typeof e?e.options:e;if(t&&(d.render=t,d.staticRenderFns=r,d._compiled=!0),o&&(d.functional=!0),s&&(d._scopeId="data-v-"+s),i?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},d._ssrRegister=l):n&&(l=a?function(){n.call(this,(d.functional?this.parent:this).$root.$options.shadowRoot)}:n),l)if(d.functional){d._injectStyles=l;var c=d.render;d.render=function(e,t){return l.call(t),c(e,t)}}else{var u=d.beforeCreate;d.beforeCreate=u?[].concat(u,l):[l]}return{exports:e,options:d}}r.d(t,{Z:()=>o})},10:(e,t,r)=>{r.d(t,{Z:()=>o});const o={props:{width:{type:[String,Number],default:1},height:{type:[String,Number],default:.66},formats:{type:Array,default:()=>["avif","webp"],validate:e=>["avif","webp","png","jpeg"].includes(e)},placeholder:{type:Boolean,default:!0},src:{type:String,default:""},map:{type:Array,default:()=>[360,640,730,960,1280,1536,1920,2048]},sizes:{type:Array,default:()=>["100vw"]},loading:{type:String,default:"",validate:e=>["auto","lazy","eager",""].includes(e)},alt:{type:String,default:""}}}}},t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={id:o,loaded:!1,exports:{}};return e[o](n,n.exports,r),n.loaded=!0,n.exports}r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o=r(102);module.exports=o.default})();