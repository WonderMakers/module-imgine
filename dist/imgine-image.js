(()=>{"use strict";var e={900:(e,t,r)=>{function n(e,t,r,n,o,s,i,a){var l,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=r,c._compiled=!0),n&&(c.functional=!0),s&&(c._scopeId="data-v-"+s),i?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},c._ssrRegister=l):o&&(l=a?function(){o.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:o),l)if(c.functional){c._injectStyles=l;var d=c.render;c.render=function(e,t){return l.call(t),d(e,t)}}else{var p=c.beforeCreate;c.beforeCreate=p?[].concat(p,l):[l]}return{exports:e,options:c}}r.d(t,{Z:()=>n})},10:(e,t,r)=>{r.d(t,{Z:()=>n});const n={props:{width:{type:[String,Number],default:1},height:{type:[String,Number],default:.66},formats:{type:Array,default:()=>["avif","webp"],validate:e=>["avif","webp","png","jpeg"].includes(e)},placeholder:{type:Boolean,default:!0},src:{type:String,default:""},map:{type:Array,default:()=>[360,640,730,960,1280,1536,1920,2048]},sizes:{type:Array,default:()=>["100vw"]},loading:{type:String,default:"",validate:e=>["auto","lazy","eager",""].includes(e)},alt:{type:String,default:""}}}}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,r),s.exports}r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var n={};(()=>{r.d(n,{default:()=>s});var e=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("picture",[e._l(e.formats,(function(t){return r("source",{key:t,attrs:{srcset:e.getSrcset(t),sizes:e.sizes.join(", "),type:"image/"+t}})})),e._v(" "),r("source",{attrs:{srcset:e.getSrcset(),sizes:e.sizes.join(", ")}}),e._v(" "),r("img",{ref:"image",class:e.$style.image,attrs:{src:e.src,alt:e.alt,loading:e.loading},on:{load:e.onLoad,error:e.onError}})],2)};e._withStripped=!0;const t={name:"ImgineImage",mixins:[r(10).Z],computed:{currentSrc(){return this.$refs.image.currentSrc||this.$refs.image.src}},methods:{getSrcset(e=null){return this.map.map((t=>this.$imgine.format(this.src,{w:t,f:e})+` ${t}w`)).join(", ")},onLoad(){this.$emit("load")},onError(){this.$emit("error")}},mounted(){this.$emit("preload",{type:"image",src:this.currentSrc}),this.$refs.image.complete&&this.onLoad()}};var o=(0,r(900).Z)(t,e,[],!1,null,null,null);o.options.__file="src/nuxt-components/imgine-image.vue";const s=o.exports})(),module.exports=n.default})();