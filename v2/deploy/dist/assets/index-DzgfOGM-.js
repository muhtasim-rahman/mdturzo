const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DBLVxIkL.js","assets/vendor-mcV3incF.js","assets/Home-KoEfRVsz.js","assets/motion-B0YflK6s.js","assets/seo-CyJD-hJA.js","assets/analytics-zM0Q7Z3t.js","assets/firebase-DPKIO6Ex.js","assets/icons-BjCj3aWE.js","assets/supabase-vrwWM04E.js","assets/About-RSBBHPmP.js","assets/Projects-WN13fqCi.js","assets/VisibilityGuard-_j5GXg2z.js","assets/ProjectDetail-CZr0u8hw.js","assets/Feed-CFMZFL4O.js","assets/Blogs-CXseuyQy.js","assets/BlogDetail-CHeGaRzP.js","assets/Posts-ByEPWdsY.js","assets/PostDetail-2mbZhvWp.js","assets/Contact-0ezVzTCW.js","assets/Login-DbGog_1n.js","assets/Signup-DvMbA3nR.js","assets/AuthAction-BeJ1UJpF.js","assets/Profile-FIHLzq6v.js","assets/PublicProfile-CJ4vqm_X.js","assets/Admin-Dn8S0FEe.js","assets/PrivacyPolicy-CVZ1xIs3.js","assets/CookiesPolicy-D8XwMJpO.js","assets/NotFound-BQtKAfJD.js"])))=>i.map(i=>d[i]);
var Gt=Object.defineProperty;var Xt=(t,r,a)=>r in t?Gt(t,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[r]=a;var L=(t,r,a)=>Xt(t,typeof r!="symbol"?r+"":r,a);import{j as e,c as j}from"./motion-B0YflK6s.js";import{a as Kt,g as me,r as f,R,u as J,b as xe,N as ye,L as A,O as Wt,c as Jt,d as S,B as Qt}from"./vendor-mcV3incF.js";import{g as Zt,i as er,b as tr,c as rr,d as ar,e as nr,f as sr,G as or,h as ir,F as lr,o as cr,r as V,u as ht,j as Ie,k as De,s as dr,l as bt,m as gt,n as ue,p as ur,q as fr}from"./firebase-DPKIO6Ex.js";import{c as pr}from"./supabase-vrwWM04E.js";import{f as vt,a as yt,b as $e,c as wt,d as jt,F as g,e as $,g as re,h as fe,i as pe,j as mr,k as Me,l as X,m as Ve,n as kt,o as Fe,p as xr,q as hr,r as br,s as gr,t as vr,u as yr,v as wr,w as jr,x as kr,y as Nr,z as Sr,A as Tr,B as Er,C as Ar,D as Cr,E as _r,G as Rr,H as zr,I as Pr,J as Lr,K as Or,L as Ir,M as Dr,N as $r,O as Mr,P as Vr,Q as Fr}from"./icons-BjCj3aWE.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();const Hr="modulepreload",Ur=function(t){return"/"+t},We={},E=function(r,a,n){let s=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),l=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));s=Promise.allSettled(a.map(c=>{if(c=Ur(c),c in We)return;We[c]=!0;const d=c.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":Hr,d||(p.as="script"),p.crossOrigin="",p.href=c,l&&p.setAttribute("nonce",l),document.head.appendChild(p),d)return new Promise((v,h)=>{p.addEventListener("load",v),p.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(i){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=i,window.dispatchEvent(l),!l.defaultPrevented)throw i}return s.then(i=>{for(const l of i||[])l.status==="rejected"&&o(l.reason);return r().catch(o)})};var Ce={},Je=Kt;Ce.createRoot=Je.createRoot,Ce.hydrateRoot=Je.hydrateRoot;var Br=typeof Element<"u",Yr=typeof Map=="function",qr=typeof Set=="function",Gr=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function ce(t,r){if(t===r)return!0;if(t&&r&&typeof t=="object"&&typeof r=="object"){if(t.constructor!==r.constructor)return!1;var a,n,s;if(Array.isArray(t)){if(a=t.length,a!=r.length)return!1;for(n=a;n--!==0;)if(!ce(t[n],r[n]))return!1;return!0}var o;if(Yr&&t instanceof Map&&r instanceof Map){if(t.size!==r.size)return!1;for(o=t.entries();!(n=o.next()).done;)if(!r.has(n.value[0]))return!1;for(o=t.entries();!(n=o.next()).done;)if(!ce(n.value[1],r.get(n.value[0])))return!1;return!0}if(qr&&t instanceof Set&&r instanceof Set){if(t.size!==r.size)return!1;for(o=t.entries();!(n=o.next()).done;)if(!r.has(n.value[0]))return!1;return!0}if(Gr&&ArrayBuffer.isView(t)&&ArrayBuffer.isView(r)){if(a=t.length,a!=r.length)return!1;for(n=a;n--!==0;)if(t[n]!==r[n])return!1;return!0}if(t.constructor===RegExp)return t.source===r.source&&t.flags===r.flags;if(t.valueOf!==Object.prototype.valueOf&&typeof t.valueOf=="function"&&typeof r.valueOf=="function")return t.valueOf()===r.valueOf();if(t.toString!==Object.prototype.toString&&typeof t.toString=="function"&&typeof r.toString=="function")return t.toString()===r.toString();if(s=Object.keys(t),a=s.length,a!==Object.keys(r).length)return!1;for(n=a;n--!==0;)if(!Object.prototype.hasOwnProperty.call(r,s[n]))return!1;if(Br&&t instanceof Element)return!1;for(n=a;n--!==0;)if(!((s[n]==="_owner"||s[n]==="__v"||s[n]==="__o")&&t.$$typeof)&&!ce(t[s[n]],r[s[n]]))return!1;return!0}return t!==t&&r!==r}var Xr=function(r,a){try{return ce(r,a)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}};const Kr=me(Xr);var Wr=function(t,r,a,n,s,o,i,l){if(!t){var c;if(r===void 0)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var d=[a,n,s,o,i,l],u=0;c=new Error(r.replace(/%s/g,function(){return d[u++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}},Jr=Wr;const Qe=me(Jr);var Qr=function(r,a,n,s){var o=n?n.call(s,r,a):void 0;if(o!==void 0)return!!o;if(r===a)return!0;if(typeof r!="object"||!r||typeof a!="object"||!a)return!1;var i=Object.keys(r),l=Object.keys(a);if(i.length!==l.length)return!1;for(var c=Object.prototype.hasOwnProperty.bind(a),d=0;d<i.length;d++){var u=i[d];if(!c(u))return!1;var p=r[u],v=a[u];if(o=n?n.call(s,p,v,u):void 0,o===!1||o===void 0&&p!==v)return!1}return!0};const Zr=me(Qr);var Nt=(t=>(t.BASE="base",t.BODY="body",t.HEAD="head",t.HTML="html",t.LINK="link",t.META="meta",t.NOSCRIPT="noscript",t.SCRIPT="script",t.STYLE="style",t.TITLE="title",t.FRAGMENT="Symbol(react.fragment)",t))(Nt||{}),we={link:{rel:["amphtml","canonical","alternate"]},script:{type:["application/ld+json"]},meta:{charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}},Ze=Object.values(Nt),He={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},ea=Object.entries(He).reduce((t,[r,a])=>(t[a]=r,t),{}),_="data-rh",q={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate",PRIORITIZE_SEO_TAGS:"prioritizeSeoTags"},G=(t,r)=>{for(let a=t.length-1;a>=0;a-=1){const n=t[a];if(Object.prototype.hasOwnProperty.call(n,r))return n[r]}return null},ta=t=>{let r=G(t,"title");const a=G(t,q.TITLE_TEMPLATE);if(Array.isArray(r)&&(r=r.join("")),a&&r)return a.replace(/%s/g,()=>r);const n=G(t,q.DEFAULT_TITLE);return r||n||void 0},ra=t=>G(t,q.ON_CHANGE_CLIENT_STATE)||(()=>{}),je=(t,r)=>r.filter(a=>typeof a[t]<"u").map(a=>a[t]).reduce((a,n)=>({...a,...n}),{}),aa=(t,r)=>r.filter(a=>typeof a.base<"u").map(a=>a.base).reverse().reduce((a,n)=>{if(!a.length){const s=Object.keys(n);for(let o=0;o<s.length;o+=1){const l=s[o].toLowerCase();if(t.indexOf(l)!==-1&&n[l])return a.concat(n)}}return a},[]),na=t=>console&&typeof console.warn=="function"&&console.warn(t),ee=(t,r,a)=>{const n={};return a.filter(s=>Array.isArray(s[t])?!0:(typeof s[t]<"u"&&na(`Helmet: ${t} should be of type "Array". Instead found type "${typeof s[t]}"`),!1)).map(s=>s[t]).reverse().reduce((s,o)=>{const i={};o.filter(c=>{let d;const u=Object.keys(c);for(let v=0;v<u.length;v+=1){const h=u[v],m=h.toLowerCase();r.indexOf(m)!==-1&&!(d==="rel"&&c[d].toLowerCase()==="canonical")&&!(m==="rel"&&c[m].toLowerCase()==="stylesheet")&&(d=m),r.indexOf(h)!==-1&&(h==="innerHTML"||h==="cssText"||h==="itemprop")&&(d=h)}if(!d||!c[d])return!1;const p=c[d].toLowerCase();return n[d]||(n[d]={}),i[d]||(i[d]={}),n[d][p]?!1:(i[d][p]=!0,!0)}).reverse().forEach(c=>s.push(c));const l=Object.keys(i);for(let c=0;c<l.length;c+=1){const d=l[c],u={...n[d],...i[d]};n[d]=u}return s},[]).reverse()},sa=(t,r)=>{if(Array.isArray(t)&&t.length){for(let a=0;a<t.length;a+=1)if(t[a][r])return!0}return!1},oa=t=>({baseTag:aa(["href"],t),bodyAttributes:je("bodyAttributes",t),defer:G(t,q.DEFER),encode:G(t,q.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:je("htmlAttributes",t),linkTags:ee("link",["rel","href"],t),metaTags:ee("meta",["name","charset","http-equiv","property","itemprop"],t),noscriptTags:ee("noscript",["innerHTML"],t),onChangeClientState:ra(t),scriptTags:ee("script",["src","innerHTML"],t),styleTags:ee("style",["cssText"],t),title:ta(t),titleAttributes:je("titleAttributes",t),prioritizeSeoTags:sa(t,q.PRIORITIZE_SEO_TAGS)}),St=t=>Array.isArray(t)?t.join(""):t,ia=(t,r)=>{const a=Object.keys(t);for(let n=0;n<a.length;n+=1)if(r[a[n]]&&r[a[n]].includes(t[a[n]]))return!0;return!1},ke=(t,r)=>Array.isArray(t)?t.reduce((a,n)=>(ia(n,r)?a.priority.push(n):a.default.push(n),a),{priority:[],default:[]}):{default:t,priority:[]},et=(t,r)=>({...t,[r]:void 0}),la=["noscript","script","style"],_e=(t,r=!0)=>r===!1?String(t):String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),Tt=t=>Object.keys(t).reduce((r,a)=>{const n=typeof t[a]<"u"?`${a}="${t[a]}"`:`${a}`;return r?`${r} ${n}`:n},""),ca=(t,r,a,n)=>{const s=Tt(a),o=St(r);return s?`<${t} ${_}="true" ${s}>${_e(o,n)}</${t}>`:`<${t} ${_}="true">${_e(o,n)}</${t}>`},da=(t,r,a=!0)=>r.reduce((n,s)=>{const o=s,i=Object.keys(o).filter(d=>!(d==="innerHTML"||d==="cssText")).reduce((d,u)=>{const p=typeof o[u]>"u"?u:`${u}="${_e(o[u],a)}"`;return d?`${d} ${p}`:p},""),l=o.innerHTML||o.cssText||"",c=la.indexOf(t)===-1;return`${n}<${t} ${_}="true" ${i}${c?"/>":`>${l}</${t}>`}`},""),Et=(t,r={})=>Object.keys(t).reduce((a,n)=>{const s=He[n];return a[s||n]=t[n],a},r),ua=(t,r,a)=>{const n={key:r,[_]:!0},s=Et(a,n);return[R.createElement("title",s,r)]},de=(t,r)=>r.map((a,n)=>{const s={key:n,[_]:!0};return Object.keys(a).forEach(o=>{const l=He[o]||o;if(l==="innerHTML"||l==="cssText"){const c=a.innerHTML||a.cssText;s.dangerouslySetInnerHTML={__html:c}}else s[l]=a[o]}),R.createElement(t,s)}),C=(t,r,a=!0)=>{switch(t){case"title":return{toComponent:()=>ua(t,r.title,r.titleAttributes),toString:()=>ca(t,r.title,r.titleAttributes,a)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>Et(r),toString:()=>Tt(r)};default:return{toComponent:()=>de(t,r),toString:()=>da(t,r,a)}}},fa=({metaTags:t,linkTags:r,scriptTags:a,encode:n})=>{const s=ke(t,we.meta),o=ke(r,we.link),i=ke(a,we.script);return{priorityMethods:{toComponent:()=>[...de("meta",s.priority),...de("link",o.priority),...de("script",i.priority)],toString:()=>`${C("meta",s.priority,n)} ${C("link",o.priority,n)} ${C("script",i.priority,n)}`},metaTags:s.default,linkTags:o.default,scriptTags:i.default}},pa=t=>{const{baseTag:r,bodyAttributes:a,encode:n=!0,htmlAttributes:s,noscriptTags:o,styleTags:i,title:l="",titleAttributes:c,prioritizeSeoTags:d}=t;let{linkTags:u,metaTags:p,scriptTags:v}=t,h={toComponent:()=>{},toString:()=>""};return d&&({priorityMethods:h,linkTags:u,metaTags:p,scriptTags:v}=fa(t)),{priority:h,base:C("base",r,n),bodyAttributes:C("bodyAttributes",a,n),htmlAttributes:C("htmlAttributes",s,n),link:C("link",u,n),meta:C("meta",p,n),noscript:C("noscript",o,n),script:C("script",v,n),style:C("style",i,n),title:C("title",{title:l,titleAttributes:c},n)}},Re=pa,ie=[],At=!!(typeof window<"u"&&window.document&&window.document.createElement),ze=class{constructor(t,r){L(this,"instances",[]);L(this,"canUseDOM",At);L(this,"context");L(this,"value",{setHelmet:t=>{this.context.helmet=t},helmetInstances:{get:()=>this.canUseDOM?ie:this.instances,add:t=>{(this.canUseDOM?ie:this.instances).push(t)},remove:t=>{const r=(this.canUseDOM?ie:this.instances).indexOf(t);(this.canUseDOM?ie:this.instances).splice(r,1)}}});this.context=t,this.canUseDOM=r||!1,r||(t.helmet=Re({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},ma={},Ct=R.createContext(ma),U,_t=(U=class extends f.Component{constructor(a){super(a);L(this,"helmetData");this.helmetData=new ze(this.props.context||{},U.canUseDOM)}render(){return R.createElement(Ct.Provider,{value:this.helmetData.value},this.props.children)}},L(U,"canUseDOM",At),U),Y=(t,r)=>{const a=document.head||document.querySelector("head"),n=a.querySelectorAll(`${t}[${_}]`),s=[].slice.call(n),o=[];let i;return r&&r.length&&r.forEach(l=>{const c=document.createElement(t);for(const d in l)if(Object.prototype.hasOwnProperty.call(l,d))if(d==="innerHTML")c.innerHTML=l.innerHTML;else if(d==="cssText")c.styleSheet?c.styleSheet.cssText=l.cssText:c.appendChild(document.createTextNode(l.cssText));else{const u=d,p=typeof l[u]>"u"?"":l[u];c.setAttribute(d,p)}c.setAttribute(_,"true"),s.some((d,u)=>(i=u,c.isEqualNode(d)))?s.splice(i,1):o.push(c)}),s.forEach(l=>{var c;return(c=l.parentNode)==null?void 0:c.removeChild(l)}),o.forEach(l=>a.appendChild(l)),{oldTags:s,newTags:o}},Pe=(t,r)=>{const a=document.getElementsByTagName(t)[0];if(!a)return;const n=a.getAttribute(_),s=n?n.split(","):[],o=[...s],i=Object.keys(r);for(const l of i){const c=r[l]||"";a.getAttribute(l)!==c&&a.setAttribute(l,c),s.indexOf(l)===-1&&s.push(l);const d=o.indexOf(l);d!==-1&&o.splice(d,1)}for(let l=o.length-1;l>=0;l-=1)a.removeAttribute(o[l]);s.length===o.length?a.removeAttribute(_):a.getAttribute(_)!==i.join(",")&&a.setAttribute(_,i.join(","))},xa=(t,r)=>{typeof t<"u"&&document.title!==t&&(document.title=St(t)),Pe("title",r)},tt=(t,r)=>{const{baseTag:a,bodyAttributes:n,htmlAttributes:s,linkTags:o,metaTags:i,noscriptTags:l,onChangeClientState:c,scriptTags:d,styleTags:u,title:p,titleAttributes:v}=t;Pe("body",n),Pe("html",s),xa(p,v);const h={baseTag:Y("base",a),linkTags:Y("link",o),metaTags:Y("meta",i),noscriptTags:Y("noscript",l),scriptTags:Y("script",d),styleTags:Y("style",u)},m={},y={};Object.keys(h).forEach(k=>{const{newTags:N,oldTags:O}=h[k];N.length&&(m[k]=N),O.length&&(y[k]=h[k].oldTags)}),r&&r(),c(t,m,y)},te=null,ha=t=>{te&&cancelAnimationFrame(te),t.defer?te=requestAnimationFrame(()=>{tt(t,()=>{te=null})}):(tt(t),te=null)},ba=ha,rt=class extends f.Component{constructor(){super(...arguments);L(this,"rendered",!1)}shouldComponentUpdate(r){return!Zr(r,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:r}=this.props.context;r.remove(this),this.emitChange()}emitChange(){const{helmetInstances:r,setHelmet:a}=this.props.context;let n=null;const s=oa(r.get().map(o=>{const i={...o.props};return delete i.context,i}));_t.canUseDOM?ba(s):Re&&(n=Re(s)),a(n)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:r}=this.props.context;r.add(this),this.emitChange()}render(){return this.init(),null}},Ae,Ns=(Ae=class extends f.Component{shouldComponentUpdate(t){return!Kr(et(this.props,"helmetData"),et(t,"helmetData"))}mapNestedChildrenToProps(t,r){if(!r)return null;switch(t.type){case"script":case"noscript":return{innerHTML:r};case"style":return{cssText:r};default:throw new Error(`<${t.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(t,r,a,n){return{...r,[t.type]:[...r[t.type]||[],{...a,...this.mapNestedChildrenToProps(t,n)}]}}mapObjectTypeChildren(t,r,a,n){switch(t.type){case"title":return{...r,[t.type]:n,titleAttributes:{...a}};case"body":return{...r,bodyAttributes:{...a}};case"html":return{...r,htmlAttributes:{...a}};default:return{...r,[t.type]:{...a}}}}mapArrayTypeChildrenToProps(t,r){let a={...r};return Object.keys(t).forEach(n=>{a={...a,[n]:t[n]}}),a}warnOnInvalidChildren(t,r){return Qe(Ze.some(a=>t.type===a),typeof t.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${Ze.join(", ")} are allowed. Helmet does not support rendering <${t.type}> elements. Refer to our API for more information.`),Qe(!r||typeof r=="string"||Array.isArray(r)&&!r.some(a=>typeof a!="string"),`Helmet expects a string as a child of <${t.type}>. Did you forget to wrap your children in braces? ( <${t.type}>{\`\`}</${t.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(t,r){let a={};return R.Children.forEach(t,n=>{if(!n||!n.props)return;const{children:s,...o}=n.props,i=Object.keys(o).reduce((c,d)=>(c[ea[d]||d]=o[d],c),{});let{type:l}=n;switch(typeof l=="symbol"?l=l.toString():this.warnOnInvalidChildren(n,s),l){case"Symbol(react.fragment)":r=this.mapChildrenToProps(s,r);break;case"link":case"meta":case"noscript":case"script":case"style":a=this.flattenArrayTypeChildren(n,a,i,s);break;default:r=this.mapObjectTypeChildren(n,r,i,s);break}}),this.mapArrayTypeChildrenToProps(a,r)}render(){const{children:t,...r}=this.props;let a={...r},{helmetData:n}=r;if(t&&(a=this.mapChildrenToProps(t,a)),n&&!(n instanceof ze)){const s=n;n=new ze(s.context,!0),delete a.helmetData}return n?R.createElement(rt,{...a,context:n.value}):R.createElement(Ct.Consumer,null,s=>R.createElement(rt,{...a,context:s}))}},L(Ae,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),Ae);const ga={},at=t=>{let r;const a=new Set,n=(u,p)=>{const v=typeof u=="function"?u(r):u;if(!Object.is(v,r)){const h=r;r=p??(typeof v!="object"||v===null)?v:Object.assign({},r,v),a.forEach(m=>m(r,h))}},s=()=>r,c={setState:n,getState:s,getInitialState:()=>d,subscribe:u=>(a.add(u),()=>a.delete(u)),destroy:()=>{(ga?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),a.clear()}},d=r=t(n,s,c);return c},va=t=>t?at(t):at;var Rt={exports:{}},zt={},Pt={exports:{}},Lt={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var K=f;function ya(t,r){return t===r&&(t!==0||1/t===1/r)||t!==t&&r!==r}var wa=typeof Object.is=="function"?Object.is:ya,ja=K.useState,ka=K.useEffect,Na=K.useLayoutEffect,Sa=K.useDebugValue;function Ta(t,r){var a=r(),n=ja({inst:{value:a,getSnapshot:r}}),s=n[0].inst,o=n[1];return Na(function(){s.value=a,s.getSnapshot=r,Ne(s)&&o({inst:s})},[t,a,r]),ka(function(){return Ne(s)&&o({inst:s}),t(function(){Ne(s)&&o({inst:s})})},[t]),Sa(a),a}function Ne(t){var r=t.getSnapshot;t=t.value;try{var a=r();return!wa(t,a)}catch{return!0}}function Ea(t,r){return r()}var Aa=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?Ea:Ta;Lt.useSyncExternalStore=K.useSyncExternalStore!==void 0?K.useSyncExternalStore:Aa;Pt.exports=Lt;var Ca=Pt.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var he=f,_a=Ca;function Ra(t,r){return t===r&&(t!==0||1/t===1/r)||t!==t&&r!==r}var za=typeof Object.is=="function"?Object.is:Ra,Pa=_a.useSyncExternalStore,La=he.useRef,Oa=he.useEffect,Ia=he.useMemo,Da=he.useDebugValue;zt.useSyncExternalStoreWithSelector=function(t,r,a,n,s){var o=La(null);if(o.current===null){var i={hasValue:!1,value:null};o.current=i}else i=o.current;o=Ia(function(){function c(h){if(!d){if(d=!0,u=h,h=n(h),s!==void 0&&i.hasValue){var m=i.value;if(s(m,h))return p=m}return p=h}if(m=p,za(u,h))return m;var y=n(h);return s!==void 0&&s(m,y)?(u=h,m):(u=h,p=y)}var d=!1,u,p,v=a===void 0?null:a;return[function(){return c(r())},v===null?void 0:function(){return c(v())}]},[r,a,n,s]);var l=Pa(t,o[0],o[1]);return Oa(function(){i.hasValue=!0,i.value=l},[l]),Da(l),l};Rt.exports=zt;var $a=Rt.exports;const Ma=me($a),Ot={},{useDebugValue:Va}=R,{useSyncExternalStoreWithSelector:Fa}=Ma;let nt=!1;const Ha=t=>t;function Ua(t,r=Ha,a){(Ot?"production":void 0)!=="production"&&a&&!nt&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),nt=!0);const n=Fa(t.subscribe,t.getState,t.getServerState||t.getInitialState,r,a);return Va(n),n}const st=t=>{(Ot?"production":void 0)!=="production"&&typeof t!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const r=typeof t=="function"?va(t):t,a=(n,s)=>Ua(r,n,s);return Object.assign(a,r),a},be=t=>t?st(t):st,ne=be((t,r)=>({user:null,profile:null,isAdmin:!1,authLoading:!0,profileLoading:!1,setUser:a=>t({user:a}),setProfile:a=>t({profile:a}),setIsAdmin:a=>t({isAdmin:a}),setAuthLoading:a=>t({authLoading:a}),setProfileLoading:a=>t({profileLoading:a}),clearAuth:()=>t({user:null,profile:null,isAdmin:!1,authLoading:!1,profileLoading:!1}),isLoggedIn:()=>!!r().user,isEmailVerified:()=>{var a;return((a=r().user)==null?void 0:a.emailVerified)===!0},getUID:()=>{var a;return((a=r().user)==null?void 0:a.uid)||null},getDisplayName:()=>{var a,n;return((a=r().profile)==null?void 0:a.display_name)||((n=r().user)==null?void 0:n.displayName)||"Anonymous"},getAvatar:()=>{var a,n;return((a=r().profile)==null?void 0:a.photo_url)||((n=r().user)==null?void 0:n.photoURL)||null}})),Ba={apiKey:"AIzaSyAh9PtrVo1UWApQw3oLT-Ol2Cu4iA5wawA",authDomain:"mdturzo.firebaseapp.com",databaseURL:"https://mdturzo-default-rtdb.firebaseio.com",projectId:"mdturzo",storageBucket:"mdturzo.firebasestorage.app",messagingSenderId:"13751895485",appId:"1:13751895485:web:be068cfd6f46f945d3fed4",measurementId:"G-SHM2013GKK"},Ue=Zt().length===0?er(Ba):tr(),It=rr(Ue),F=ar(Ue);let Ya=null;nr().then(t=>{t&&(Ya=sr(Ue))}).catch(()=>{});const Dt=new or,qa=new ir,P=new lr;Dt.addScope("profile");Dt.addScope("email");qa.addScope("user:email");P.addScope("email");P.addScope("public_profile");P.addScope("user_age_range");P.addScope("user_birthday");P.addScope("user_friends");P.addScope("user_gender");P.addScope("user_hometown");P.addScope("user_likes");P.addScope("user_link");P.addScope("user_location");const Be=()=>dr(It),Ga=t=>cr(It,t),Xa=t=>{const r=V(F,`presence/${t}`);gt(r,{online:!0,lastSeen:ue()}),fr(r).update({online:!1,lastSeen:ue()})},Ka=t=>{const r=V(F,`presence/${t}`);ht(r,{online:!1,lastSeen:ue()})},Wa=async t=>{try{const r=await bt(V(F,`admins/${t}`));return r.exists()&&r.val()===!0}catch{return!1}},Ja=t=>t.trim().toLowerCase().replace(/\./g,","),Qa=async t=>{const r=t.trim().toLowerCase(),a=Ja(r),n=V(F,`subscribers/${a}`),s=V(F,"subscriberCount");return(await bt(n)).exists()?{success:!1,duplicate:!0}:(await gt(n,{email:r,subscribedAt:ue(),active:!0}),await ht(s,{count:ur(1)}),{success:!0,duplicate:!1})},Za=t=>{const r=V(F,"subscriberCount");return Ie(r,a=>{const n=a.val();t((n==null?void 0:n.count)??0)}),()=>De(r)},en=t=>{const r=V(F,"notifications");return Ie(r,a=>{const n=[];a.exists()&&a.forEach(s=>{n.push({id:s.key,...s.val()})}),t(n)}),()=>De(r)},tn=(t,r)=>{const a=V(F,`notificationReads/${t}`);return Ie(a,n=>{r(n.val()||{})}),()=>De(a)},rn="https://kddyucerqiwvjmuwebjv.supabase.co",an="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkZHl1Y2VycWl3dmptdXdlYmp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNjAxODAsImV4cCI6MjA5MzczNjE4MH0.hKz4BGIzFyAmuDdEQJsRbTu42eARtNLty81JJY4c3y8",B=pr(rn,an,{auth:{persistSession:!1,autoRefreshToken:!1,detectSessionInUrl:!1},global:{headers:{"X-Client-Info":"mdturzo-portfolio/2.0.0"}},db:{schema:"public"},realtime:{params:{eventsPerSecond:10}}});async function Ss(){const{data:t,error:r}=await B.from("site_settings").select("key, value");if(r)throw r;return t.reduce((a,n)=>(a[n.key]=n.value,a),{})}async function Ts(){const{data:t,error:r}=await B.from("page_visibility").select("page, visibility");if(r)throw r;return t.reduce((a,n)=>(a[n.page]=n.visibility,a),{})}async function Es(){const{data:t,error:r}=await B.from("projects").select("*").eq("status","published").eq("visibility","public").eq("is_featured",!0).order("featured_order",{ascending:!0}).limit(6);if(r)throw r;return t}async function As({limit:t,offset:r=0,category:a,tag:n,type:s}={}){let o=B.from("feed").select("*").eq("status","published").eq("visibility","public").order("created_at",{ascending:!1});s&&(o=o.eq("type",s)),a&&(o=o.eq("category",a)),n&&(o=o.contains("tags",[n])),t&&(o=o.range(r,r+t-1));const{data:i,error:l}=await o;if(l)throw l;return i}async function nn(t){const{data:r,error:a}=await B.from("users").select("*").eq("id",t).single();if(a&&a.code!=="PGRST116")throw a;return r}async function Cs({limit:t=10,offset:r=0}={}){const{data:a,error:n}=await B.from("reviews").select("*, users:user_id (display_name, avatar_url, username)").eq("status","approved").order("created_at",{ascending:!1}).range(r,r+t-1);if(n)throw n;return a}async function _s(t,r=null,a=null){const{error:n}=await B.from("analytics").insert({page:t,event:"page_view",user_id:r,ip_address:a});n&&console.warn("[Analytics] Track failed:",n.message)}function sn(){const{setUser:t,setProfile:r,setIsAdmin:a,setAuthLoading:n,setProfileLoading:s,clearAuth:o}=ne();f.useEffect(()=>{const i=Ga(async l=>{if(l){t(l),s(!0);try{const c=await nn(l.uid);r(c||null);const d=await Wa(l.uid);a(d),Xa(l.uid)}catch(c){console.warn("[useAuth] Profile/admin load failed:",c.message),r(null),a(!1)}finally{s(!1),n(!1)}}else o()});return()=>{const{user:l}=ne.getState();l&&Ka(l.uid),i()}},[])}function on(){return ne(t=>({user:t.user,profile:t.profile,isAdmin:t.isAdmin,authLoading:t.authLoading,profileLoading:t.profileLoading,isLoggedIn:t.isLoggedIn(),isEmailVerified:t.isEmailVerified(),uid:t.getUID(),displayName:t.getDisplayName(),avatar:t.getAvatar()}))}const Ye=be((t,r)=>({notifications:[],reads:{},unreadCount:0,isOpen:!1,unsubscribe:null,setNotifications:a=>{const{reads:n}=r(),s=a.filter(o=>o.active&&!n[o.id]).length;t({notifications:a,unreadCount:s})},setReads:a=>{const{notifications:n}=r(),s=n.filter(o=>o.active&&!a[o.id]).length;t({reads:a,unreadCount:s})},markRead:a=>{t(n=>{const s={...n.reads,[a]:!0},o=n.notifications.filter(i=>i.active&&!s[i.id]).length;return{reads:s,unreadCount:o}})},markAllRead:()=>{const{notifications:a}=r(),n=a.reduce((s,o)=>(s[o.id]=!0,s),{});t({reads:n,unreadCount:0})},toggleOpen:()=>t(a=>({isOpen:!a.isOpen})),setOpen:a=>t({isOpen:a}),setUnsubscribe:a=>t({unsubscribe:a}),cleanup:()=>{const{unsubscribe:a}=r();a&&a(),t({notifications:[],reads:{},unreadCount:0,isOpen:!1,unsubscribe:null})}}));function ln(){const t=ne(o=>o.getUID()),{setNotifications:r,setReads:a,setUnsubscribe:n,cleanup:s}=Ye();f.useEffect(()=>{const o=en(l=>{const c=Date.now(),d=l.filter(u=>u.active!==!1&&(!u.expires_at||new Date(u.expires_at).getTime()>c));r(d)});let i=()=>{};return t&&(i=tn(t,l=>a(l||{}))),n(()=>{o(),i()}),()=>{o(),i()}},[t])}function $t(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function cn(){return localStorage.getItem("theme")||"dark"}function Le(t){const r=t==="system"?$t():t;document.documentElement.setAttribute("data-theme",r),r==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}const Mt=be((t,r)=>{const a=cn();return Le(a),{theme:a,setTheme:n=>{localStorage.setItem("theme",n),Le(n),t({theme:n})},toggleTheme:()=>{const s=r().theme==="dark"?"light":"dark";r().setTheme(s)},isDark:()=>{const n=r().theme;return n==="dark"||n==="system"&&$t()==="dark"}}});typeof window<"u"&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{const{theme:t}=Mt.getState();t==="system"&&Le("system")});function Vt(){const{isAdmin:t,authLoading:r}=ne(a=>({isAdmin:a.isAdmin,authLoading:a.authLoading}));return{isAdmin:t,authLoading:r}}const w={version:"v2.2.4",siteName:"Muhtasim Rahman",navName:"Muhtasim",siteTagline:"Web Developer & Designer",siteURL:"https://mdturzo.web.app",workerURL:"https://portfolio.programs-turzo.workers.dev",owner:{fullName:"Md Muhtasim Rahman Mahmud",displayName:"Muhtasim Rahman",nickname:"Turzo",email:"mdturzo.dev@gmail.com",location:"Nilphamari, Bangladesh",fakeDOB:"2007-09-13",github:"https://github.com/muhtasim-rahman",oldPortfolio:"https://mdturzo.odoo.com",bio:"A dedicated web developer passionate about creating user-friendly and visually stunning websites. Focused on quality, innovation, and transforming complex ideas into simple, elegant solutions."},social:{facebook:"https://facebook.com/mdturzo999",instagram:"https://instagram.com/mdturzo999",youtube:"https://youtube.com/@mdturzo999",twitter:"https://twitter.com/mdturzo999",linkedin:"https://linkedin.com/in/mdturzo999",tiktok:"https://tiktok.com/@mdturzo16",telegram:"https://t.me/mdturzo16",github:"https://github.com/muhtasim-rahman",threads:"https://www.threads.net/mdturzo999"},seo:{defaultOGImage:"https://mdturzo.web.app/preview.webp",defaultDescription:"Self-taught web developer & designer from Bangladesh — building clean, fast and meaningful digital experiences.",defaultKeywords:"Muhtasim Rahman, Turzo, web developer, Bangladesh, portfolio, mdturzo",twitterHandle:"@mdturzo999"},defaults:{statsYearsDev:"3+",statsYearsDesign:"6+",statsProjects:"16+",availableForWork:!0,cvEnabled:!1,cvUrl:""}};function Rs(t=w.owner.fakeDOB){const r=new Date(t),a=new Date;let n=a.getFullYear()-r.getFullYear();const s=a.getMonth()-r.getMonth();return(s<0||s===0&&a.getDate()<r.getDate())&&n--,n}let dn=0;const un={success:3e3,info:3e3,warning:3e3,error:3e3},z=be((t,r)=>({toasts:[],addToast:({type:a="info",title:n,message:s,duration:o})=>{const i=++dn,l=o??un[a],c={id:i,type:a,title:n,message:s,duration:l};return t(d=>({toasts:[c,...d.toasts].slice(0,3)})),l&&setTimeout(()=>r().removeToast(i),l),i},removeToast:a=>{t(n=>({toasts:n.toasts.filter(s=>s.id!==a)}))},success:(a,n)=>z.getState().addToast({type:"success",title:a,message:n}),error:(a,n)=>z.getState().addToast({type:"error",title:a,message:n}),warning:(a,n)=>z.getState().addToast({type:"warning",title:a,message:n}),info:(a,n)=>z.getState().addToast({type:"info",title:a,message:n})})),W={success:(t,r)=>z.getState().success(t,r),error:(t,r)=>z.getState().error(t,r),warning:(t,r)=>z.getState().warning(t,r),info:(t,r)=>z.getState().info(t,r)};function ge(){const[t,r]=f.useState([]),a=f.useCallback(n=>{const o=n.currentTarget.getBoundingClientRect(),i=Math.max(o.width,o.height)*2,l=n.clientX-o.left-i/2,c=n.clientY-o.top-i/2,d=`${Date.now()}-${Math.random()}`;r(u=>[...u,{id:d,x:l,y:c,size:i}]),setTimeout(()=>r(u=>u.filter(p=>p.id!==d)),580)},[]);return{ripples:t,createRipple:a}}function ve({ripples:t,color:r}){return e.jsx(e.Fragment,{children:t.map(({id:a,x:n,y:s,size:o})=>e.jsx("span",{"aria-hidden":!0,style:{position:"absolute",left:n,top:s,width:o,height:o,borderRadius:"50%",background:`radial-gradient(circle, ${r} 0%, ${r} 42%, transparent 72%)`,boxShadow:`0 0 ${Math.round(o/5)}px ${r}`,transform:"scale(0)",animation:"ripple-expand 0.62s cubic-bezier(0.16, 1, 0.3, 1) forwards",pointerEvents:"none"}},a))})}const fn=450,ot={active:{color:"#22c55e",label:"Active",pulse:!0},busy:{color:"#ef4444",label:"Busy",pulse:!1},away:{color:"#f59e0b",label:"Away",pulse:!1},offline:{color:"#6b7280",label:"Offline",pulse:!1}},pn="active",Se=[{label:"Home",path:"/",icon:vt,title:"Go back to the main homepage"},{label:"About",path:"/about",icon:yt,title:"Learn about my journey and skills"},{label:"Projects",path:"/projects",icon:$e,title:"Browse projects I have built"},{label:"Feed",path:"/feed",icon:wt,title:"Read my blogs and latest posts"},{label:"Contact",path:"/contact",icon:jt,title:"Send me a message or say hello"}],mn=[{label:"Pages",items:[{label:"Home",path:"/",icon:vt},{label:"About",path:"/about",icon:yt},{label:"Projects",path:"/projects",icon:$e},{label:"Feed",path:"/feed",icon:wt},{label:"Contact",path:"/contact",icon:jt}]},{label:"Account",items:[{label:"My Profile",path:"/profile",icon:Me},{label:"Admin Panel",path:"/admin",icon:X},{label:"Sign In",path:"/login",icon:fe},{label:"Sign Up",path:"/signup",icon:gr}]},{label:"Legal",items:[{label:"Privacy Policy",path:"/privacy-policy",icon:X},{label:"Cookies Policy",path:"/cookies-policy",icon:Ve},{label:"Terms of Use",path:"/terms",icon:vr},{label:"Sitemap",path:"/sitemap.xml",icon:yr,external:!0}]}],it=[{icon:kr,url:w.social.youtube,label:"@mdturzo999",cls:"text-red-500"},{icon:Nr,url:w.social.facebook,label:"mdturzo999",cls:"text-blue-500"},{icon:Sr,url:w.social.instagram,label:"@mdturzo999",cls:"text-pink-500"},{icon:Tr,url:w.social.github,label:"muhtasim-rahman",cls:"text-purple-400"},{icon:Er,url:w.social.twitter,label:"@mdturzo999",cls:"text-sky-400"},{icon:Ar,url:w.social.linkedin,label:"mdturzo999",cls:"text-blue-400"},{icon:Cr,url:w.social.telegram,label:"@mdturzo16",cls:"text-sky-400"},{icon:_r,url:w.social.tiktok,label:"@mdturzo16",cls:"text-pink-400"}],xn={hidden:{y:-80,opacity:0},visible:{y:0,opacity:1,transition:{type:"spring",stiffness:320,damping:28}},exit:{y:-80,opacity:0,transition:{duration:.2,ease:"easeIn"}}},hn={hidden:{opacity:0,y:-10,scaleY:.96,transformOrigin:"top"},visible:{opacity:1,y:0,scaleY:1,transition:{duration:.22,ease:[.16,1,.3,1]}},exit:{opacity:0,y:-10,scaleY:.96,transition:{duration:.14}}},bn={closed:{x:"100%",transition:{type:"tween",duration:.28,ease:[.4,0,.2,1]}},open:{x:"0%",transition:{type:"tween",duration:.28,ease:[.4,0,.2,1]}}},Ft={hidden:{opacity:0,y:-6,scale:.96,transformOrigin:"top right"},visible:{opacity:1,y:0,scale:1,transition:{duration:.18}},exit:{opacity:0,y:-6,scale:.96,transition:{duration:.12}}};function gn({mode:t=pn,size:r="md"}){const a=ot[t]||ot.active,n=r==="sm"?"w-2.5 h-2.5 border-[1.5px]":"w-3 h-3 border-2";return e.jsx("span",{className:`absolute -bottom-0.5 -right-0.5 ${n} rounded-full border-[var(--bg-page)] transition-colors`,style:{background:a.color},title:a.label,"aria-label":`Status: ${a.label}`})}function Te({size:t="md",showName:r=!0,rounded:a=!1,onClick:n}){const[s,o]=f.useState("/logo.webp"),i=t==="sm"?"w-7 h-7 text-sm":"w-9 h-9 text-base",l=a?"rounded-full":"rounded-[10px]";return e.jsxs(A,{to:"/",onClick:n,className:"flex-shrink-0 flex items-center gap-2.5 select-none group h-9",children:[e.jsxs("div",{className:`relative ${i} ${l} flex items-center justify-center flex-shrink-0 overflow-visible`,children:[e.jsx("img",{src:s,alt:"Muhtasim logo",onError:()=>o("/android-chrome-192x192.png"),className:`${i} ${l} object-cover border border-[var(--border-color)] bg-[var(--bg-surface-2)]`}),e.jsx(gn,{size:t})]}),r&&e.jsxs("div",{className:"flex flex-col leading-none",children:[e.jsx("span",{className:"font-mono font-bold text-[16px] text-[var(--text-primary)] transition-colors leading-none",children:w.navName}),e.jsx("span",{className:"text-[10px] text-[var(--text-tertiary)] font-mono leading-none mt-[3px]",children:w.seo.twitterHandle})]})]})}function ae({size:t="md",className:r=""}){const{toggleTheme:a,isDark:n}=Mt(),s=n(),o=t==="sm"?"w-8 h-8 text-sm":"w-9 h-9 text-base",{ripples:i,createRipple:l}=ge(),c=d=>{l(d),a()};return e.jsxs("button",{onClick:c,className:`${o} relative overflow-hidden flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors ${r}`,"aria-label":"Toggle theme","data-tooltip":s?"Light mode":"Dark mode","data-ripple-managed":"true",children:[e.jsx(ve,{ripples:i,color:"rgba(59,130,246,0.2)"}),e.jsx(j.AnimatePresence,{mode:"wait",initial:!1,children:s?e.jsx(j.motion.span,{initial:{opacity:0,rotate:-90,scale:.5},animate:{opacity:1,rotate:0,scale:1},exit:{opacity:0,rotate:90,scale:.5},transition:{duration:.18},children:e.jsx(g,{icon:hr})},"sun"):e.jsx(j.motion.span,{initial:{opacity:0,rotate:90,scale:.5},animate:{opacity:1,rotate:0,scale:1},exit:{opacity:0,rotate:-90,scale:.5},transition:{duration:.18},children:e.jsx(g,{icon:br})},"moon")})]})}function M({icon:t,onClick:r,label:a,badge:n,active:s,className:o="",tooltipSide:i}){const{ripples:l,createRipple:c}=ge(),d=u=>{c(u),r==null||r(u)};return e.jsxs("button",{onClick:d,className:`relative overflow-hidden w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors ${s?"bg-[var(--accent-light)] text-[var(--accent-primary)] border-[var(--accent-primary)]":"bg-[var(--bg-surface-2)]"} ${o}`,"aria-label":a,"data-tooltip":a,"data-tooltip-side":i,"data-ripple-managed":"true",children:[e.jsx(ve,{ripples:l,color:"rgba(59,130,246,0.2)"}),e.jsx(g,{icon:t}),n>0&&e.jsx("span",{className:"absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[var(--clr-error)] text-white text-[9px] font-bold leading-none",children:n>9?"9+":n})]})}function Oe({className:t=""}){const{ripples:r,createRipple:a}=ge();return e.jsxs(A,{to:"/login",onClick:a,title:"Sign in to your account","data-ripple-managed":"true",className:`relative overflow-hidden h-9 flex items-center gap-1.5 px-4 py-0 rounded-full bg-[var(--accent-primary)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors ${t}`,children:[e.jsx(ve,{ripples:r,color:"rgba(255,255,255,0.3)"}),e.jsx(g,{icon:fe,className:"text-xs"}),"Sign In"]})}function vn({onClose:t}){const{notifications:r,reads:a,markRead:n,markAllRead:s,unreadCount:o}=Ye(),i=Date.now(),l=r.filter(c=>c.active&&(!c.expires_at||new Date(c.expires_at).getTime()>i));return e.jsxs(j.motion.div,{variants:Ft,initial:"hidden",animate:"visible",exit:"exit",className:"notif-panel absolute right-0 top-full mt-2 w-80 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-xl)] overflow-hidden z-[9999]",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)]",children:[e.jsxs("span",{className:"font-semibold text-sm text-[var(--text-primary)]",children:["Notifications",o>0&&e.jsx("span",{className:"ml-1.5 px-1.5 py-0.5 rounded-full bg-[var(--clr-error)] text-white text-[9px] font-bold",children:o})]}),o>0&&e.jsx("button",{onClick:s,className:"text-xs text-[var(--accent-primary)] hover:underline",children:"Mark all read"})]}),e.jsx("div",{className:"max-h-64 overflow-y-auto",children:l.length===0?e.jsxs("div",{className:"py-8 text-center text-[var(--text-tertiary)] text-sm",children:[e.jsx(g,{icon:Fe,className:"text-2xl mb-2 opacity-30"}),e.jsx("p",{children:"No notifications"})]}):l.map(c=>e.jsxs("button",{onClick:()=>{n(c.id),c.link&&(window.location.href=c.link),t()},className:`w-full text-left px-4 py-3 flex gap-3 hover:bg-[var(--bg-surface-2)] transition-colors border-b border-[var(--border-color)] last:border-0 ${a[c.id]?"":"bg-[var(--accent-light)]"}`,children:[e.jsx("span",{className:"w-2 h-2 rounded-full flex-shrink-0 mt-1.5",style:{background:a[c.id]?"transparent":"var(--accent-primary)"}}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"text-sm font-medium text-[var(--text-primary)] truncate",children:c.title}),e.jsx("p",{className:"text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2",children:c.message})]})]},c.id))})]})}function yn({user:t,profile:r,isAdmin:a,avatar:n,displayName:s,onClose:o}){var c;const i=xe(),l=async()=>{try{await Be(),o(),i("/")}catch(d){W.error("Logout failed",d.message)}};return e.jsxs(j.motion.div,{variants:Ft,initial:"hidden",animate:"visible",exit:"exit",className:"user-panel absolute right-0 top-full mt-2 w-52 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-xl)] overflow-hidden z-[9999]",children:[e.jsxs("div",{className:"px-4 py-3 border-b border-[var(--border-color)] flex items-center gap-2.5",children:[e.jsx("div",{className:"w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-[var(--border-color)]",children:n?e.jsx("img",{src:n,alt:s,className:"w-full h-full object-cover"}):e.jsx("div",{className:"w-full h-full bg-[var(--accent-light)] flex items-center justify-center",children:e.jsx("span",{className:"text-[var(--accent-primary)] text-xs font-bold",children:(c=s==null?void 0:s[0])==null?void 0:c.toUpperCase()})})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("p",{className:"text-sm font-semibold text-[var(--text-primary)] truncate",children:s}),e.jsx("p",{className:"text-xs text-[var(--text-tertiary)] truncate",children:r!=null&&r.username?`@${r.username}`:t==null?void 0:t.email})]})]}),e.jsxs("div",{className:"py-1",children:[e.jsxs(A,{to:"/profile",onClick:o,className:"flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors",children:[e.jsx(g,{icon:Me,className:"w-4 text-center opacity-60"})," My Profile"]}),a&&e.jsxs(A,{to:"/admin",onClick:o,className:"flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--accent-primary)] hover:bg-[var(--accent-light)] transition-colors",children:[e.jsx(g,{icon:X,className:"w-4 text-center"})," Admin Panel"]}),e.jsxs("button",{onClick:l,className:"w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--clr-error)] hover:bg-red-500/10 transition-colors",children:[e.jsx(g,{icon:kt,className:"w-4 text-center"})," Sign Out"]})]})]})}function wn({compact:t=!1}){const r=f.useRef(null),a=f.useRef(!1),n=f.useRef({active:!1,startX:0,offset:0,currentOffset:0}),s=[...it,...it],o=()=>{r.current&&(r.current.style.animationPlayState="paused"),a.current=!0},i=()=>{r.current&&(r.current.style.animationPlayState="running"),a.current=!1},l=m=>{n.current={...n.current,active:!0,startX:m.pageX,offset:n.current.currentOffset},o(),m.preventDefault()},c=m=>{if(!n.current.active)return;const y=m.pageX-n.current.startX;n.current.currentOffset=n.current.offset+y,r.current&&(r.current.style.transform=`translateX(${n.current.currentOffset}px)`)},d=()=>{n.current.active&&(n.current.active=!1,i())},u=m=>{m.preventDefault(),o(),n.current.currentOffset=(n.current.currentOffset||0)-m.deltaY*.6,r.current&&(r.current.style.transform=`translateX(${n.current.currentOffset}px)`),clearTimeout(n.current.wheelTimer),n.current.wheelTimer=setTimeout(i,700)},p=m=>{n.current={...n.current,active:!0,startX:m.touches[0].pageX,offset:n.current.currentOffset},o()},v=m=>{if(!n.current.active)return;const y=m.touches[0].pageX-n.current.startX;n.current.currentOffset=n.current.offset+y,r.current&&(r.current.style.transform=`translateX(${n.current.currentOffset}px)`)},h=()=>{n.current.active=!1,i()};return f.useEffect(()=>(window.addEventListener("mousemove",c),window.addEventListener("mouseup",d),()=>{window.removeEventListener("mousemove",c),window.removeEventListener("mouseup",d)}),[]),e.jsx("div",{onMouseEnter:o,onMouseLeave:i,onWheel:u,style:{position:"relative",overflow:"hidden",height:t?28:34,borderRadius:8,maskImage:"linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%)",WebkitMaskImage:"linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%)"},children:e.jsx("div",{ref:r,onMouseDown:l,onTouchStart:p,onTouchMove:v,onTouchEnd:h,style:{display:"inline-flex",gap:t?10:16,alignItems:"center",height:"100%",whiteSpace:"nowrap",animation:"marquee-scroll 22s linear infinite",cursor:"grab",willChange:"transform",touchAction:"pan-x"},children:s.map((m,y)=>e.jsxs("a",{href:m.url,target:"_blank",rel:"noopener noreferrer",onClick:k=>{n.current.currentOffset!==n.current.offset&&k.preventDefault()},className:`inline-flex items-center gap-1.5 ${t?"px-1.5 py-0.5":"px-2 py-1"} rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors no-underline flex-shrink-0`,children:[e.jsx(g,{icon:m.icon,className:m.cls,style:{fontSize:t?12:13}}),e.jsx("span",{className:t?"text-[11px]":"",children:m.label})]},y))})})}function lt({onClose:t,isLoggedIn:r,floating:a=!1}){const n=J(),s=typeof window<"u"?window.location.href:w.siteURL,o=`Explore ${w.owner.displayName}'s portfolio`,i=async()=>{try{await navigator.clipboard.writeText(s),W.success("Copied","Current page URL copied.")}catch{W.error("Copy failed","Could not copy this URL.")}},l=async()=>{try{if(navigator.share){await navigator.share({title:w.siteName,text:o,url:s});return}i()}catch(d){(d==null?void 0:d.name)!=="AbortError"&&i()}},c=d=>`relative overflow-hidden flex items-center gap-2.5 px-2.5 py-2 rounded-lg border transition-all duration-150 group ${(d==="/"?n.pathname==="/":n.pathname.startsWith(d))?"is-mega-active bg-[var(--accent-light)] text-[var(--accent-primary)] border-[rgba(59,130,246,0.2)]":"border-transparent hover:bg-[var(--bg-surface-3)] hover:border-[var(--border-color)]"}`;return e.jsx(j.AnimatePresence,{children:e.jsx(j.motion.div,{variants:hn,initial:"hidden",animate:"visible",exit:"exit",className:"mega-panel absolute left-0 right-0 top-full z-[10000]",children:e.jsx("div",{className:"max-w-[1120px] mx-auto px-4 pt-2",children:e.jsxs("div",{className:`rounded-2xl overflow-hidden ${a?"mega-floating":""}`,style:{background:"var(--bg-surface)",border:"1px solid var(--border-color)",boxShadow:"var(--shadow-xl)"},children:[e.jsx("div",{className:"h-[1.5px] w-full",style:{background:"linear-gradient(90deg,transparent,rgba(99,102,241,0.5) 35%,rgba(59,130,246,0.5) 65%,transparent)"}}),e.jsx("div",{className:"grid grid-cols-3 divide-x divide-[var(--border-color)] p-2",children:mn.map(d=>e.jsxs("div",{className:"px-3 py-3",children:[e.jsx("p",{className:"text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)] mb-2 px-2",children:d.label}),e.jsx("div",{className:"space-y-0.5",children:d.items.map(u=>u.external?e.jsxs("a",{href:u.path,target:"_blank",rel:"noopener noreferrer",onClick:t,className:c(u.path),children:[e.jsx(g,{icon:u.icon,className:"w-3.5 text-center text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors flex-shrink-0 text-xs"}),e.jsx("span",{className:"text-[13px] font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight",children:u.label})]},u.path):e.jsxs(A,{to:u.path,onClick:t,className:c(u.path),children:[e.jsx(g,{icon:u.icon,className:"w-3.5 text-center text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors flex-shrink-0 text-xs"}),e.jsx("span",{className:"text-[13px] font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight",children:u.label})]},u.path))})]},d.label))}),e.jsxs("div",{className:"mega-footer px-3 py-2 border-t border-[var(--border-color)] flex items-center gap-2",children:[e.jsxs("button",{type:"button",onClick:l,className:"mega-share-action","aria-label":"Share this page","data-tooltip":"Share this page",children:[e.jsx(g,{icon:wr,className:"text-[11px]"}),e.jsx("span",{children:"Share"})]}),e.jsxs("div",{className:"mega-url-field",title:s,children:[e.jsx("span",{children:s}),e.jsx("button",{type:"button",onClick:i,className:"mega-url-copy","aria-label":"Copy URL","data-tooltip":"Copy URL",children:e.jsx(g,{icon:jr})})]}),e.jsxs("span",{className:"mega-version-pill",children:["Web ",e.jsx("strong",{children:w.version})]})]})]})})})})}function ct({user:t,profile:r,isAdmin:a,avatar:n,displayName:s,isLoggedIn:o,authLoading:i,unreadCount:l,openSearch:c,notifOpen:d,setNotifOpen:u,userOpen:p,setUserOpen:v,megaOpen:h,setMegaOpen:m,onMenuOpen:y,onMobileSearch:k}){var I;const{ripples:N,createRipple:O}=ge();return e.jsxs("div",{className:"flex items-center gap-1.5 flex-shrink-0","data-nav-right":!0,children:[e.jsx(M,{icon:$,onClick:c,label:"Search",className:"hidden lg:flex",tooltipSide:"right"}),e.jsx(M,{icon:$,onClick:k,label:"Search",className:"lg:hidden"}),e.jsxs("div",{className:"notif-anchor relative",children:[e.jsx(M,{icon:Fe,onClick:()=>{u(!d),v(!1),m(!1)},label:"Notifications",badge:l,active:d,tooltipSide:"right"}),e.jsx(j.AnimatePresence,{children:d&&e.jsx(vn,{onClose:()=>u(!1)})})]}),e.jsx(ae,{}),i?e.jsx("div",{className:"w-9 h-9 rounded-full sk"}):o?e.jsxs("div",{className:"user-anchor relative",children:[e.jsx("button",{onClick:()=>{v(!p),u(!1),m(!1)},className:`w-9 h-9 rounded-full overflow-hidden border-2 transition-colors ${p?"border-[var(--accent-primary)]":"border-[var(--border-color)] hover:border-[var(--border-strong)]"}`,children:n?e.jsx("img",{src:n,alt:s,className:"w-full h-full object-cover"}):e.jsx("div",{className:"w-full h-full bg-[var(--accent-light)] flex items-center justify-center",children:e.jsx("span",{className:"text-[var(--accent-primary)] text-sm font-bold",children:(I=s==null?void 0:s[0])==null?void 0:I.toUpperCase()})})}),e.jsx(j.AnimatePresence,{children:p&&e.jsx(yn,{user:t,profile:r,isAdmin:a,avatar:n,displayName:s,onClose:()=>v(!1)})})]}):e.jsx(Oe,{}),e.jsx("div",{className:"mega-anchor",children:e.jsx(M,{icon:xr,onClick:()=>{m(!h),u(!1),v(!1)},label:"All pages",active:h,tooltipSide:"right"})}),e.jsxs("button",{onClick:Q=>{O(Q),y()},className:"lg:hidden relative overflow-hidden w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors","aria-label":"Menu","data-tooltip":"Menu","data-ripple-managed":"true",children:[e.jsx(ve,{ripples:N,color:"rgba(59,130,246,0.2)"}),e.jsx(g,{icon:re})]})]})}function jn(){var Xe;const t=J(),r=xe(),{user:a,profile:n,isLoggedIn:s,avatar:o,displayName:i,authLoading:l}=on(),{unreadCount:c,isOpen:d,setOpen:u}=Ye(),{isAdmin:p}=Vt(),[v,h]=f.useState(!1),[m,y]=f.useState(!1),[k,N]=f.useState(!1),[O,I]=f.useState(!1),[Q,se]=f.useState(""),oe=f.useRef(null),Bt=t.pathname==="/"||t.pathname==="/home";f.useEffect(()=>{const x=()=>h(window.scrollY>fn);return window.addEventListener("scroll",x,{passive:!0}),()=>window.removeEventListener("scroll",x)},[]),f.useEffect(()=>{y(!1),N(!1),I(!1),u(!1),se("")},[t.pathname]),f.useEffect(()=>(document.body.style.overflow=m?"hidden":"",()=>{document.body.style.overflow=""}),[m]);const Z=()=>{y(!0),setTimeout(()=>{var x,T;(x=oe.current)==null||x.focus(),(T=oe.current)==null||T.select()},320)},Yt=()=>{W.info("Search coming soon","Full search will be available in a future update.")};f.useEffect(()=>{const x=T=>{!T.target.closest(".mega-anchor")&&!T.target.closest(".mega-panel")&&N(!1),!T.target.closest(".notif-anchor")&&!T.target.closest(".notif-panel")&&u(!1),!T.target.closest(".user-anchor")&&!T.target.closest(".user-panel")&&I(!1)};return document.addEventListener("mousedown",x),()=>document.removeEventListener("mousedown",x)},[]);const qe={user:a,profile:n,isAdmin:p,avatar:o,displayName:i,isLoggedIn:s,authLoading:l,unreadCount:c,openSearch:Yt,notifOpen:d,setNotifOpen:u,userOpen:O,setUserOpen:I,megaOpen:k,setMegaOpen:N,onMenuOpen:()=>y(!0),onMobileSearch:Z},qt=x=>T=>`top-nav-link${(x==="/"?t.pathname==="/":T)?" active":""}`,Ge=Q.trim().length>0;return e.jsxs(e.Fragment,{children:[e.jsxs("nav",{className:`relative z-10 w-full ${Bt?"border-b border-transparent bg-transparent":"border-b border-[var(--navbar-border)] bg-[var(--navbar-bg)] backdrop-blur-md"}`,style:{height:"var(--navbar-h)"},children:[e.jsxs("div",{className:"navbar-inner flex items-center h-full max-w-[1120px] mx-auto gap-5",children:[e.jsx(Te,{}),e.jsx("div",{className:"hidden lg:flex flex-1 items-center justify-center gap-0.5",children:Se.map(x=>e.jsxs(ye,{to:x.path,end:x.path==="/",className:({isActive:T})=>qt(x.path)(T),title:x.title,"data-click-fx":"true",children:[e.jsx(g,{icon:x.icon,className:"text-xs opacity-80"}),x.label]},x.path))}),e.jsx("div",{className:"hidden lg:flex ml-auto",children:e.jsx(ct,{...qe})}),e.jsxs("div",{className:"hidden md:flex lg:hidden items-center gap-1.5 ml-auto",children:[!l&&!s&&e.jsx(Oe,{className:"h-8 text-xs px-3 py-0"}),e.jsx(ae,{size:"sm"}),e.jsx(M,{icon:$,onClick:Z,label:"Search",className:"w-8 h-8 text-sm"}),e.jsx("button",{onClick:()=>y(!0),className:"w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]","aria-label":"Menu","data-tooltip":"Menu",children:e.jsx(g,{icon:re})})]}),e.jsxs("div",{className:"flex md:hidden items-center gap-1.5 ml-auto",children:[!l&&!s&&e.jsx(A,{to:"/login",className:"w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white flex-shrink-0 hover:bg-[var(--accent-hover)] transition-colors","aria-label":"Sign in","data-tooltip":"Sign In",children:e.jsx(g,{icon:fe,className:"text-xs"})}),e.jsx(ae,{size:"sm"}),e.jsx(M,{icon:$,onClick:Z,label:"Search",className:"w-8 h-8 text-sm"}),e.jsx("button",{onClick:()=>y(!0),className:"w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]","aria-label":"Menu","data-tooltip":"Menu",children:e.jsx(g,{icon:re})})]})]}),k&&e.jsx("div",{className:"relative",children:e.jsx(lt,{onClose:()=>N(!1),isLoggedIn:s})})]}),e.jsx(j.AnimatePresence,{children:v&&e.jsx(j.motion.div,{variants:xn,initial:"hidden",animate:"visible",exit:"exit",className:"fixed top-0 left-0 right-0 z-[var(--z-sticky)] flex justify-center px-4 pt-3 pointer-events-none",children:e.jsxs("nav",{className:"float-nav relative pointer-events-auto flex items-center gap-4 w-full max-w-[1120px] h-[52px] px-4 rounded-full",children:[e.jsx(Te,{size:"sm",rounded:!0}),e.jsx("div",{className:"hidden lg:flex flex-1 items-center justify-center gap-0.5",children:Se.map(x=>e.jsxs(ye,{to:x.path,end:x.path==="/",className:({isActive:T})=>`relative overflow-hidden flex items-center gap-1.5 h-9 px-3.5 rounded-full text-sm font-medium leading-none transition-all float-nav-link ${(x.path==="/"?t.pathname==="/":T)?"float-nav-link-active":""}`,title:x.title,children:[e.jsx(g,{icon:x.icon,className:"text-xs opacity-80"}),e.jsx("span",{className:"text-[13.5px]",children:x.label})]},x.path))}),e.jsx("div",{className:"hidden lg:flex ml-auto float-nav-right",children:e.jsx(ct,{...qe})}),e.jsxs("div",{className:"hidden md:flex lg:hidden items-center gap-1.5 ml-auto float-nav-right",children:[!l&&!s&&e.jsx(Oe,{className:"h-8 text-xs px-3 py-0"}),e.jsx(ae,{size:"sm"}),e.jsx(M,{icon:$,onClick:Z,label:"Search",className:"w-8 h-8 text-sm"}),e.jsx("button",{onClick:()=>y(!0),className:"w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]",children:e.jsx(g,{icon:re,className:"text-sm"})})]}),e.jsxs("div",{className:"flex md:hidden items-center gap-1.5 ml-auto float-nav-right",children:[!l&&!s&&e.jsx(A,{to:"/login",className:"w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white flex-shrink-0 hover:bg-[var(--accent-hover)] transition-colors","aria-label":"Sign in",children:e.jsx(g,{icon:fe,className:"text-xs"})}),e.jsx(ae,{size:"sm"}),e.jsx(M,{icon:$,onClick:Z,label:"Search",className:"w-8 h-8 text-sm"}),e.jsx("button",{onClick:()=>y(!0),className:"w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]",children:e.jsx(g,{icon:re,className:"text-sm"})})]}),k&&e.jsx("div",{className:"absolute inset-x-0 top-full",children:e.jsx(lt,{onClose:()=>N(!1),isLoggedIn:s,floating:!0})})]})})}),e.jsx(j.AnimatePresence,{children:m&&e.jsxs(e.Fragment,{children:[e.jsx(j.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>y(!1),className:"fixed inset-0 bg-black/60 backdrop-blur-sm z-[390] lg:hidden"},"backdrop"),e.jsxs(j.motion.aside,{variants:bn,initial:"closed",animate:"open",exit:"closed",className:"fixed top-0 right-0 bottom-0 w-[min(340px,88vw)] bg-[var(--bg-surface)] border-l border-[var(--border-color)] z-[395] flex flex-col lg:hidden overflow-hidden",children:[e.jsxs("div",{className:"flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)] flex-shrink-0",children:[e.jsx(Te,{size:"sm",onClick:()=>y(!1)}),e.jsx("button",{onClick:()=>y(!1),className:"w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors",children:e.jsx(g,{icon:pe})})]}),s&&!Ge&&e.jsxs(A,{to:"/profile",onClick:()=>y(!1),className:"flex items-center gap-3 mx-4 mt-3 p-3 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors",children:[e.jsx("div",{className:"w-10 h-10 rounded-full overflow-hidden flex-shrink-0",children:o?e.jsx("img",{src:o,alt:"",className:"w-full h-full object-cover"}):e.jsx("div",{className:"w-full h-full bg-[var(--accent-light)] flex items-center justify-center",children:e.jsx("span",{className:"text-[var(--accent-primary)] font-bold",children:(Xe=i==null?void 0:i[0])==null?void 0:Xe.toUpperCase()})})}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"text-sm font-semibold text-[var(--text-primary)] truncate",children:i}),e.jsx("p",{className:"text-xs text-[var(--text-tertiary)]",children:n!=null&&n.username?`@${n.username}`:""})]}),e.jsx(g,{icon:mr,className:"text-[var(--text-tertiary)] text-xs"})]}),e.jsx("div",{className:"px-4 mt-3 flex-shrink-0",children:e.jsxs("div",{className:"sidebar-search-field flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-200",style:{background:"var(--bg-surface-2)",borderColor:"var(--border-color)"},children:[e.jsx(g,{icon:$,className:"text-[var(--text-tertiary)] text-xs flex-shrink-0"}),e.jsx("input",{ref:oe,type:"text",placeholder:"Search pages...",value:Q,onChange:x=>se(x.target.value),onKeyDown:x=>{var T;x.key==="Escape"&&(se(""),(T=oe.current)==null||T.blur())},className:"flex-1 bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] min-w-0"}),Q&&e.jsx("button",{onClick:()=>se(""),className:"w-5 h-5 flex items-center justify-center rounded-full bg-[var(--bg-surface-3)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0",children:e.jsx(g,{icon:pe,className:"text-[9px]"})})]})}),e.jsx("div",{className:"flex-1 overflow-y-auto py-3 sidebar-scroll",children:Ge?e.jsxs("div",{className:"flex flex-col items-center gap-3 px-4 py-10 text-center",children:[e.jsx("div",{className:"w-12 h-12 rounded-2xl bg-[var(--accent-light)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)]",children:e.jsx(g,{icon:$,className:"text-lg"})}),e.jsx("p",{className:"text-sm font-semibold text-[var(--text-primary)]",children:"Search coming soon"}),e.jsx("span",{className:"text-xs text-[var(--text-tertiary)] leading-relaxed max-w-[200px]",children:"Full search will be available in a future update."})]}):e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"px-5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-tertiary)]",children:"Navigation"}),Se.map(x=>e.jsxs(ye,{to:x.path,end:x.path==="/",onClick:()=>y(!1),className:({isActive:T})=>`flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${(x.path==="/"?t.pathname==="/":T)?"bg-[var(--accent-light)] text-[var(--accent-primary)]":"text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)]"}`,children:[e.jsx(g,{icon:x.icon,className:"w-4 text-center text-xs"}),x.label]},x.path)),e.jsx("div",{className:"my-3 mx-4 h-px bg-[var(--border-color)]"}),e.jsx("p",{className:"px-5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-tertiary)]",children:"More"}),[{label:"My Profile",path:"/profile",icon:Me},{label:"Privacy Policy",path:"/privacy-policy",icon:X},{label:"Cookies Policy",path:"/cookies-policy",icon:Ve}].map(x=>e.jsxs(A,{to:x.path,onClick:()=>y(!1),className:"flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)] transition-colors",children:[e.jsx(g,{icon:x.icon,className:"w-4 text-center text-xs"}),x.label]},x.path)),p&&e.jsxs(A,{to:"/admin",onClick:()=>y(!1),className:"flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm text-[var(--accent-primary)] hover:bg-[var(--accent-light)] transition-colors",children:[e.jsx(g,{icon:X,className:"w-4 text-center text-xs"})," Admin Panel"]})]})}),e.jsxs("div",{className:"flex-shrink-0 border-t border-[var(--border-color)] p-4 space-y-2.5",children:[s?e.jsxs("button",{onClick:async()=>{await Be(),y(!1),r("/")},className:"w-full py-2 rounded-full border border-red-500/30 text-center text-sm text-[var(--clr-error)] hover:bg-red-500/10 transition-colors",children:[e.jsx(g,{icon:kt,className:"mr-2"})," Sign Out"]}):e.jsxs("div",{className:"flex gap-2",children:[e.jsx(A,{to:"/login",onClick:()=>y(!1),className:"flex-1 py-2 rounded-full border border-[var(--border-color)] text-center text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-colors",children:"Sign In"}),e.jsx(A,{to:"/signup",onClick:()=>y(!1),className:"flex-1 py-2 rounded-full bg-[var(--accent-primary)] text-center text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors",children:"Sign Up"})]}),e.jsx(wn,{compact:!0})]})]},"sidebar")]})}),e.jsx("style",{children:`
        .navbar-inner {
          padding-inline: 1.75rem;
          max-width: 1120px;
          margin-inline: auto;
          width: 100%;
        }
        @media (min-width: 1250px) {
          .navbar-inner {
            padding-inline: 2rem;
          }
        }
        @media (min-width: 1440px) {
          .navbar-inner {
            padding-inline: 0;
          }
        }

        /* ── Top navbar right icon buttons: minimal bg ─────── */
        [data-nav-right] button:not([class*="bg-[var(--accent"]),
        [data-nav-right] a:not([class*="bg-[var(--accent"]):not([class*="bg-red"]) {
          background: var(--bg-surface-2) !important;
          transition: background .18s ease, border-color .18s ease, color .18s ease;
        }
        [data-nav-right] button:not([class*="bg-[var(--accent"]):hover,
        [data-nav-right] a:not([class*="bg-[var(--accent"]):not([class*="bg-red"]):hover {
          background: var(--bg-surface-3) !important;
          border-color: var(--border-strong) !important;
          color: var(--text-primary) !important;
        }

        /* ── Floating navbar: improved glass effect ──────────── */
        .float-nav {
          background: rgba(10,18,40,0.72);
          border: 1px solid rgba(148,163,184,0.14);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.38),
            inset 0 1px 0 rgba(255,255,255,0.1);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          overflow: visible;
        }
        [data-theme="light"] .float-nav {
          background: rgba(237,242,248,0.88);
          border: 1px solid rgba(203,213,225,0.8);
          box-shadow:
            0 6px 24px rgba(15,23,42,0.1),
            inset 0 1px 0 rgba(255,255,255,0.9);
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
        }

        /* ── Float-nav center links: glass hover/active ──────── */
        .float-nav-link {
          color: rgba(226,232,240,0.75);
          border: 1px solid transparent;
          transition: background .18s ease, border-color .18s ease, color .18s ease;
        }
        .float-nav-link:hover {
          background: rgba(255,255,255,0.09) !important;
          border-color: rgba(255,255,255,0.12) !important;
          color: #f1f5f9 !important;
          backdrop-filter: blur(12px);
        }
        .float-nav-link-active {
          background: rgba(59,130,246,0.18) !important;
          border-color: rgba(59,130,246,0.32) !important;
          color: rgba(147,197,253,1) !important;
        }
        [data-theme="light"] .float-nav-link {
          color: rgba(30,41,59,0.72);
        }
        [data-theme="light"] .float-nav-link:hover {
          background: rgba(0,0,0,0.06) !important;
          border-color: rgba(0,0,0,0.1) !important;
          color: #0f172a !important;
          backdrop-filter: none;
        }
        [data-theme="light"] .float-nav-link-active {
          background: rgba(59,130,246,0.12) !important;
          border-color: rgba(59,130,246,0.25) !important;
          color: var(--accent-primary) !important;
        }

        /* ── Float-nav right buttons: glass style ────────────── */
        .float-nav-right button:not([class*="bg-[var(--accent"]),
        .float-nav-right a:not([class*="bg-[var(--accent"]):not([class*="bg-red"]) {
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(255,255,255,0.11) !important;
          color: rgba(226,232,240,0.8) !important;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .float-nav-right button:not([class*="bg-[var(--accent"]):hover,
        .float-nav-right a:not([class*="bg-[var(--accent"]):not([class*="bg-red"]):hover {
          background: rgba(255,255,255,0.14) !important;
          border-color: rgba(255,255,255,0.2) !important;
          color: #f1f5f9 !important;
        }
        [data-theme="light"] .float-nav-right button:not([class*="bg-[var(--accent"]),
        [data-theme="light"] .float-nav-right a:not([class*="bg-[var(--accent"]):not([class*="bg-red"]) {
          background: rgba(15,23,42,0.05) !important;
          border-color: rgba(15,23,42,0.1) !important;
          color: rgba(30,41,59,0.75) !important;
          backdrop-filter: none;
        }
        [data-theme="light"] .float-nav-right button:not([class*="bg-[var(--accent"]):hover,
        [data-theme="light"] .float-nav-right a:not([class*="bg-[var(--accent"]):not([class*="bg-red"]):hover {
          background: rgba(15,23,42,0.09) !important;
          border-color: rgba(15,23,42,0.15) !important;
          color: #0f172a !important;
        }

        /* ── Mega menu glass: always applied (top + floating) ── */
        .mega-panel .rounded-2xl {
          background: rgba(10,16,40,0.92) !important;
          backdrop-filter: blur(28px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(28px) saturate(180%) !important;
          border-color: rgba(148,163,184,0.14) !important;
        }
        [data-theme="light"] .mega-panel .rounded-2xl {
          background: rgba(235,241,250,0.96) !important;
          backdrop-filter: blur(24px) saturate(160%) !important;
          -webkit-backdrop-filter: blur(24px) saturate(160%) !important;
          border-color: rgba(180,196,218,0.85) !important;
        }
        /* Legacy floating class kept for compatibility */
        .mega-floating {
          background: rgba(8,15,38,0.88) !important;
          backdrop-filter: blur(28px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(28px) saturate(180%) !important;
          border-color: rgba(148,163,184,0.16) !important;
        }
        [data-theme="light"] .mega-floating {
          background: rgba(241,245,249,0.92) !important;
          backdrop-filter: blur(22px) saturate(160%) !important;
          -webkit-backdrop-filter: blur(22px) saturate(160%) !important;
          border-color: rgba(203,213,225,0.85) !important;
        }

        /* ── Status dot pulse (active mode only) ─────────────── */
        .status-dot-pulse {
          animation: status-pulse 2.5s ease-in-out infinite;
        }
        @keyframes status-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50%       { box-shadow: 0 0 0 4px rgba(34,197,94,0); }
        }
        .is-mega-active svg,
        .is-mega-active span {
          color: var(--accent-primary) !important;
        }

        /* ── Tooltip (data-tooltip attr) — with scale animation ─ */
        [data-tooltip] { position: relative; }
        [data-tooltip]::after,
        [data-tooltip]::before {
          position: absolute;
          pointer-events: none;
          opacity: 0;
          transition: opacity .16s ease, transform .16s ease;
          z-index: 1020;
        }
        [data-tooltip]::after {
          content: attr(data-tooltip);
          bottom: -38px;
          left: 50%;
          transform: translateX(-50%) translateY(5px) scale(0.93);
          background: rgba(8, 15, 35, .97);
          color: #f1f5f9;
          border: 1px solid rgba(148,163,184,.18);
          box-shadow: 0 6px 20px rgba(0,0,0,.32), 0 2px 6px rgba(0,0,0,.2);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-size: 11.5px;
          line-height: 1;
          padding: 6px 11px;
          border-radius: 8px;
          white-space: nowrap;
          font-weight: 600;
          letter-spacing: 0.01em;
        }
        [data-tooltip]::before {
          content: "";
          bottom: -10px;
          left: 50%;
          width: 7px; height: 7px;
          transform: translateX(-50%) translateY(5px) rotate(45deg);
          background: rgba(8,15,35,.97);
          border-left: 1px solid rgba(148,163,184,.18);
          border-top: 1px solid rgba(148,163,184,.18);
        }
        [data-theme="light"] [data-tooltip]::after {
          background: rgba(15,23,42,.97);
          border-color: rgba(100,116,139,.25);
          box-shadow: 0 6px 20px rgba(15,23,42,.22), 0 2px 6px rgba(15,23,42,.12);
        }
        [data-theme="light"] [data-tooltip]::before {
          background: rgba(15,23,42,.97);
          border-color: rgba(100,116,139,.25);
        }
        [data-tooltip]:hover::after {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1);
        }
        [data-tooltip]:hover::before {
          opacity: 1;
          transform: translateX(-50%) translateY(0) rotate(45deg);
        }
        [data-nav-right] [data-tooltip]::after,
        [data-tooltip-side="right"]::after {
          left: auto; right: 0;
          transform: translateY(5px) scale(0.93);
        }
        [data-nav-right] [data-tooltip]::before,
        [data-tooltip-side="right"]::before {
          left: auto; right: 12px;
          transform: translateY(5px) rotate(45deg);
        }
        [data-nav-right] [data-tooltip]:hover::after,
        [data-tooltip-side="right"]:hover::after {
          transform: translateY(0) scale(1);
        }
        [data-nav-right] [data-tooltip]:hover::before,
        [data-tooltip-side="right"]:hover::before {
          transform: translateY(0) rotate(45deg);
        }


        /* ── Top navbar: improved link hover pill effect ─────── */
        .top-nav-link {
          position: relative;
          overflow: hidden;
          display: flex; align-items: center; gap: 6px;
          height: 36px; padding: 0 14px;
          border-radius: 99px;
          font-size: 13.5px; font-weight: 500; line-height: 1;
          border: 1px solid transparent;
          color: var(--text-secondary);
          transition: color .18s ease, background .18s ease, border-color .18s ease;
        }
        .top-nav-link:hover {
          background: var(--bg-surface-2);
          border-color: var(--border-color);
          color: var(--text-primary);
        }
        .top-nav-link.active {
          background: var(--accent-light);
          border-color: rgba(59,130,246,.25);
          color: var(--accent-primary);
        }

        /* ── Sidebar search: whole bar glows on focus ─────────── */
        .sidebar-search-field:focus-within {
          border-color: var(--accent-primary) !important;
          box-shadow: 0 0 0 3px rgba(59,130,246,.15) !important;
        }

        @media (max-width: 640px) {
          .fixed.top-0.right-0.bottom-0 { width: 100vw !important; }
        }
      `})]})}const kn={active:{color:"#22c55e",label:"Active",shadow:"rgba(34,197,94,0.35)"},busy:{color:"#ef4444",label:"Busy",shadow:"rgba(239,68,68,0.35)"},away:{color:"#f59e0b",label:"Away",shadow:"rgba(245,158,11,0.35)"},offline:{color:"#6b7280",label:"Offline",shadow:"rgba(107,114,128,0.35)"}},Nn="active",Sn=[{label:"Home",path:"/"},{label:"About",path:"/about"},{label:"Projects",path:"/projects"},{label:"Feed",path:"/feed"},{label:"Contact",path:"/contact"}],Tn=[{label:"Privacy Policy",path:"/privacy-policy"},{label:"Cookies Policy",path:"/cookies-policy"},{label:"Terms of Use",path:"/terms"},{label:"Sitemap",path:"/sitemap.xml",external:!0}];function En({target:t}){const[r,a]=f.useState(0),n=f.useRef(null),s=j.useInView(n,{once:!0,margin:"-80px"});return f.useEffect(()=>{if(!s)return;const o=Math.max(0,t-300),i=performance.now(),l=1800;function c(d){const u=d-i,p=Math.min(u/l,1),v=1-Math.pow(1-p,3),h=Math.round(o+(t-o)*v);a(h),p<1?requestAnimationFrame(c):a(t)}requestAnimationFrame(c)},[s,t]),e.jsx("strong",{ref:n,id:"subCount",children:r.toLocaleString()})}const D=({href:t,label:r,children:a})=>e.jsx("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:"nf-social-icon",title:r,"aria-label":r,children:e.jsx("svg",{viewBox:"0 0 24 24",children:a})});function An(){const[t,r]=f.useState(""),[a,n]=f.useState(2847),[s,o]=f.useState(!1),[i,l]=f.useState(!1),[c,d]=f.useState(!1),[u,p]=f.useState("/logo.webp"),v=new Date().getFullYear(),h=kn[Nn];f.useEffect(()=>Za(N=>{N>0&&n(N)}),[]);const m=async k=>{k==null||k.preventDefault();const N=t.trim();if(!N||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(N)){d(!0),setTimeout(()=>d(!1),2200);return}o(!0);try{(await Qa(N)).duplicate?W.info("Already subscribed","This email is already in the list!"):(l(!0),r(""),n(I=>I+1),setTimeout(()=>l(!1),3500))}catch{W.error("Failed","Could not subscribe. Try again.")}finally{o(!1)}},y=k=>{k.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"nf-sc-wrap",children:e.jsxs("div",{className:"nf-sc",children:[e.jsxs("div",{className:"nf-sc-left",children:[e.jsxs("h2",{children:["Stay ",e.jsx("em",{children:"Connected"}),e.jsx("br",{}),"with My Work"]}),e.jsx("p",{className:"nf-sc-sub",children:"Follow my journey · Get updates on new projects & posts"})]}),e.jsxs("div",{className:"nf-sc-right",children:[i?e.jsxs("div",{className:"nf-success-msg",children:[e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"#4ade80",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})}),"Subscribed! Check your inbox."]}):e.jsx("form",{onSubmit:m,noValidate:!0,children:e.jsxs("div",{className:`nf-form-wrap ${c?"nf-form-invalid":""}`,children:[e.jsx("div",{className:"nf-input-icon","aria-hidden":!0,children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"#fff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),e.jsx("path",{d:"M2 7l8.5 6.5a2 2 0 002.5 0L22 7"})]})}),e.jsx("input",{id:"nf-sub-email",type:"email",placeholder:"Enter your email",value:t,onChange:k=>{r(k.target.value),c&&d(!1)},required:!0,autoComplete:"email"}),e.jsxs("button",{type:"submit",className:"nf-submit-btn",disabled:s,children:[s?e.jsx("span",{className:"nf-spinner"}):e.jsx("svg",{viewBox:"0 0 20 20",width:"15",height:"15",fill:"currentColor",children:e.jsx("path",{d:"M10 2a6 6 0 00-6 6v1H3a1 1 0 000 2h1v1a6 6 0 0012 0v-1h1a1 1 0 000-2h-1V8a6 6 0 00-6-6zm0 2a4 4 0 014 4v2a4 4 0 01-8 0V8a4 4 0 014-4z"})}),e.jsx("span",{children:s?"...":"Subscribe"})]})]})}),e.jsxs("p",{className:"nf-count-text",children:[e.jsx("span",{className:"nf-count-dot","aria-hidden":!0}),e.jsx(En,{target:a})," curious minds already subscribed"]})]})]})}),e.jsx("footer",{className:"nf-footer",children:e.jsxs("div",{className:"nf-inner",children:[e.jsxs("div",{className:"nf-main",children:[e.jsxs("div",{className:"nf-brand-col",children:[e.jsxs(A,{to:"/",className:"nf-logo-row",children:[e.jsxs("div",{className:"nf-logo-mark",style:{position:"relative"},children:[e.jsx("img",{src:u,alt:"Muhtasim logo",onError:()=>p("/android-chrome-192x192.png"),className:"nf-logo-img"}),e.jsx("span",{className:"nf-logo-status-dot",title:h.label,style:{background:h.color,boxShadow:`0 0 0 2px var(--nf-footer-bg), 0 0 0 4px ${h.shadow}`}})]}),e.jsxs("div",{children:[e.jsx("div",{className:"nf-logo-name",children:w.owner.displayName}),e.jsx("div",{className:"nf-logo-handle",children:"@mdturzo999 · Portfolio"})]})]}),e.jsx("p",{className:"nf-brand-desc",children:w.seo.defaultDescription}),e.jsxs("div",{className:"nf-social-row",children:[e.jsx(D,{href:w.social.github,label:"GitHub",children:e.jsx("path",{d:"M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"})}),e.jsx(D,{href:w.social.linkedin,label:"LinkedIn",children:e.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})}),e.jsx(D,{href:w.social.twitter,label:"X / Twitter",children:e.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"})}),e.jsx(D,{href:w.social.instagram,label:"Instagram",children:e.jsx("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"})}),e.jsx(D,{href:w.social.youtube,label:"YouTube",children:e.jsx("path",{d:"M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"})}),e.jsx(D,{href:w.social.facebook,label:"Facebook",children:e.jsx("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})}),e.jsx(D,{href:w.social.threads,label:"Threads",children:e.jsx("path",{d:"M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.49a8.16 8.16 0 004.77 1.52V7.56a4.85 4.85 0 01-1-.87z"})}),e.jsx(D,{href:w.social.tiktok,label:"TikTok",children:e.jsx("path",{d:"M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.49a8.16 8.16 0 004.77 1.52V7.56a4.85 4.85 0 01-1-.87z"})})]}),e.jsxs("div",{className:"nf-location-row",children:[e.jsx("svg",{viewBox:"0 0 24 24",children:e.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"})}),w.owner.location]})]}),e.jsxs("div",{className:"nf-nav-col",children:[e.jsx("div",{className:"nf-nav-col-title",children:"Explore"}),e.jsx("ul",{className:"nf-nav-list",children:Sn.map(({label:k,path:N})=>e.jsx("li",{children:e.jsx(A,{to:N,children:k})},N))})]}),e.jsxs("div",{className:"nf-nav-col",children:[e.jsx("div",{className:"nf-nav-col-title",children:"Legal"}),e.jsx("ul",{className:"nf-nav-list",children:Tn.map(({label:k,path:N,external:O})=>e.jsx("li",{children:O?e.jsx("a",{href:N,target:"_blank",rel:"noopener noreferrer",children:k}):e.jsx(A,{to:N,children:k})},N))})]}),e.jsxs("div",{className:"nf-contact-col",children:[e.jsx("div",{className:"nf-nav-col-title",children:"Get in Touch"}),e.jsxs(A,{to:"/contact",className:"nf-contact-card",children:[e.jsx("div",{className:"nf-cc-label",children:"Open for work"}),e.jsx("div",{className:"nf-cc-title",children:"Let's Collaborate"}),e.jsx("div",{className:"nf-cc-sub",children:"Have a project in mind? I'd love to hear about it."}),e.jsxs("span",{className:"nf-cc-arrow",children:["Visit Contact Page",e.jsx("svg",{viewBox:"0 0 20 20",children:e.jsx("path",{d:"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"})})]})]}),e.jsxs("a",{href:`mailto:${w.owner.email}`,className:"nf-email-card",children:[e.jsx("div",{className:"nf-email-icon",children:e.jsx("svg",{viewBox:"0 0 24 24",children:e.jsx("path",{d:"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})})}),e.jsxs("div",{children:[e.jsx("div",{className:"nf-email-label",children:"Email me"}),e.jsx("div",{className:"nf-email-addr",children:w.owner.email})]})]})]})]}),e.jsx("div",{className:"nf-scroll-border",children:e.jsx("button",{onClick:y,className:"nf-scroll-btn","aria-label":"Scroll to top",title:"Back to top",children:e.jsx("svg",{viewBox:"0 0 20 20",children:e.jsx("path",{d:"M10 4l-6 6h4v6h4v-6h4l-6-6z"})})})}),e.jsxs("div",{className:"nf-bottom",children:[e.jsxs("p",{className:"nf-copyright",children:["© ",v," ",e.jsx(A,{to:"/",children:w.siteName}),". All rights reserved."]}),e.jsxs("div",{className:"nf-bottom-right",children:[e.jsx("span",{className:"nf-version",children:w.version}),e.jsx("button",{onClick:y,className:"nf-scroll-btn nf-desktop-only","aria-label":"Scroll to top",title:"Back to top",children:e.jsx("svg",{viewBox:"0 0 20 20",children:e.jsx("path",{d:"M10 4l-6 6h4v6h4v-6h4l-6-6z"})})})]})]})]})}),e.jsx("style",{children:`
        /* ── Google Fonts ──────────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

        /* ── CSS Variables ─────────────────────────────────── */
        /* Dark mode (default) */
        :root, [data-theme="dark"] {
          --nf-footer-bg:   #0f172a;
          --nf-surface-1:   #1e293b;
          --nf-surface-2:   #273449;
          --nf-surface-3:   #334155;
          --nf-ink-1:       #f1f5f9;
          --nf-ink-2:       #e2e8f0;
          --nf-ink-3:       #cbd5e1;
          --nf-ink-4:       #94a3b8;
          --nf-blue-600:    #3b82f6;
          --nf-blue-700:    #2563eb;
          --nf-blue-400:    #60a5fa;
          --nf-shadow-hover: 0 4px 20px rgba(59,130,246,.3);
          --nf-shadow-card:  0 1px 3px rgba(0,0,0,.2), 0 4px 16px rgba(0,0,0,.25);
          --nf-shadow-lg:    0 8px 28px rgba(0,0,0,.35);
        }
        /* Light mode */
        [data-theme="light"] {
          --nf-footer-bg:   #edf2f7;
          --nf-surface-1:   #f4f7fb;
          --nf-surface-2:   #e8edf5;
          --nf-surface-3:   #d6dfe8;
          --nf-ink-1:       #0f172a;
          --nf-ink-2:       #1e293b;
          --nf-ink-3:       #475569;
          --nf-ink-4:       #94a3b8;
          --nf-blue-600:    #2563eb;
          --nf-blue-700:    #1d4ed8;
          --nf-blue-400:    #3b82f6;
          --nf-shadow-hover: 0 4px 20px rgba(37,99,235,.18);
          --nf-shadow-card:  0 1px 3px rgba(15,23,42,.06), 0 4px 16px rgba(15,23,42,.06);
          --nf-shadow-lg:    0 8px 28px rgba(0,0,0,.18);
        }

        /* ── Base ──────────────────────────────────────────── */
        .nf-footer {
          font-family: 'Sora', var(--font-body, sans-serif);
          background: var(--nf-footer-bg);
          color: var(--nf-ink-1);
          padding: 0 1.75rem;
          transition: background .35s ease, color .35s ease;
        }
        @media(min-width:1440px){ .nf-footer { padding: 0; } }
        .nf-inner { max-width: 1120px; margin: 0 auto; }

        /* ══ STAY CONNECTED BANNER ═══════════════════════════ */
        .nf-sc-wrap {
          font-family: 'Sora', var(--font-body, sans-serif);
          padding: 0 1.75rem;
          margin-bottom: -1px;
          animation: nf-fade-up .55s ease both;
        }
        .nf-sc {
          position: relative;
          overflow: hidden;
          max-width: 1120px;
          margin-inline: auto;
          background: linear-gradient(135deg, var(--nf-blue-700) 0%, var(--nf-blue-600) 60%, #38bdf8 100%);
          padding: clamp(28px, 5vw, 52px) clamp(24px, 5vw, 60px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          flex-wrap: wrap;
        }
        .nf-sc::before {
          content: '';
          position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Ccircle cx='40' cy='40' r='40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          pointer-events: none;
        }
        .nf-sc::after {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 260px; height: 260px; border-radius: 50%;
          background: rgba(255,255,255,.06);
          pointer-events: none;
        }
        .nf-sc-left { position: relative; z-index: 1; flex: 1 1 280px; min-width: 240px; }
        .nf-sc-left h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(1.4rem, 3.2vw, 2.3rem);
          color: #fff; line-height: 1.15; margin-bottom: 8px;
        }
        .nf-sc-left h2 em { font-style: italic; opacity: .85; }
        .nf-sc-sub { font-size: .8rem; color: rgba(255,255,255,.65); margin-top: 8px; }

        .nf-sc-right { position: relative; z-index: 1; flex: 0 1 420px; min-width: 260px; display: flex; flex-direction: column; gap: 10px; }

        /* Form */
        .nf-form-wrap {
          background: rgba(255,255,255,.12);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,.22);
          border-radius: 100px; padding: 6px;
          display: flex; align-items: center; gap: 4px;
          transition: all .28s cubic-bezier(.4,0,.2,1);
          box-shadow: 0 2px 12px rgba(0,0,0,.08);
        }
        .nf-form-wrap:focus-within {
          border-color: rgba(255,255,255,.55);
          background: rgba(255,255,255,.18);
          box-shadow: 0 0 0 5px rgba(255,255,255,.07), 0 4px 18px rgba(0,0,0,.12);
        }
        .nf-form-wrap.nf-form-invalid {
          border-color: rgba(248,113,113,.85);
          box-shadow: 0 0 0 5px rgba(239,68,68,.14), 0 4px 18px rgba(0,0,0,.12);
        }
        .nf-input-icon {
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,.18);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #fff;
          transition: all .28s cubic-bezier(.4,0,.2,1);
        }
        .nf-form-wrap:focus-within .nf-input-icon { background: rgba(255,255,255,.28); box-shadow: 0 0 0 3px rgba(255,255,255,.12); }
        .nf-input-icon svg { width: 16px; height: 16px; fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .nf-form-wrap input[type="email"] {
          flex: 1; min-width: 120px; padding: 10px 8px 10px 2px;
          border: none; background: transparent;
          color: #fff; font-family: 'Sora', sans-serif;
          font-size: .88rem; font-weight: 400; outline: none;
          caret-color: #fff; letter-spacing: .01em;
        }
        .nf-form-wrap input[type="email"]::placeholder { color: rgba(255,255,255,.5); font-weight: 300; }
        .nf-form-wrap.nf-form-invalid input[type="email"],
        .nf-form-wrap.nf-form-invalid input[type="email"]::placeholder { color: rgba(255,190,190,.95); }
        .nf-form-wrap input[type="email"]:-webkit-autofill,
        .nf-form-wrap input[type="email"]:-webkit-autofill:hover,
        .nf-form-wrap input[type="email"]:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
          -webkit-text-fill-color: #fff !important;
          transition: background-color 9999s ease-in-out 0s;
          caret-color: #fff;
        }
        .nf-submit-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; color: var(--nf-blue-700);
          font-family: 'Sora', sans-serif; font-size: .85rem; font-weight: 600;
          padding: 11px 20px; border-radius: 100px;
          border: none; cursor: pointer;
          transition: all .28s cubic-bezier(.4,0,.2,1);
          white-space: nowrap; box-shadow: 0 2px 10px rgba(0,0,0,.1);
          flex-shrink: 0; letter-spacing: .01em;
        }
        .nf-submit-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(0,0,0,.18); background: #f8fafc; }
        .nf-submit-btn:active { transform: translateY(0); box-shadow: 0 1px 6px rgba(0,0,0,.12); }
        .nf-form-wrap.nf-form-invalid .nf-submit-btn { color: #dc2626; }
        .nf-submit-btn:disabled { opacity: .7; cursor: default; }
        .nf-submit-btn svg { flex-shrink: 0; width: 15px; height: 15px; }
        .nf-spinner {
          width: 14px; height: 14px; border-radius: 50%;
          border: 2px solid rgba(30,64,175,.3);
          border-top-color: var(--nf-blue-700);
          animation: nf-spin .7s linear infinite; flex-shrink: 0;
        }
        @keyframes nf-spin { to { transform: rotate(360deg); } }

        /* Count text */
        .nf-count-text { font-size: .8rem; color: rgba(255,255,255,.6); font-weight: 400; letter-spacing: .01em; line-height: 1.4; }
        .nf-count-text strong { color: #fff; font-weight: 700; font-size: .85rem; }
        .nf-count-dot {
          display: inline-block; width: 7px; height: 7px; border-radius: 50%;
          background: #4ade80; box-shadow: 0 0 0 2px rgba(74,222,128,.35);
          animation: nf-pulse 2s infinite;
          margin-right: 6px; vertical-align: middle; position: relative; top: -1px;
        }
        @keyframes nf-pulse {
          0%,100% { box-shadow: 0 0 0 2px rgba(74,222,128,.35); }
          50%      { box-shadow: 0 0 0 5px rgba(74,222,128,.0); }
        }

        /* Success */
        .nf-success-msg {
          display: flex; align-items: center; gap: 8px;
          color: #fff; font-weight: 600; font-size: .9rem;
          background: rgba(255,255,255,.12); backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,.22);
          border-radius: 100px; padding: 12px 22px; justify-content: center;
          animation: nf-fade-up .35s ease;
        }

        /* ══ FOOTER MAIN GRID ════════════════════════════════ */
        .nf-main {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.6fr;
          align-items: start;
          gap: 40px 32px;
          padding: 52px 0 44px;
          border-bottom: 1px solid var(--nf-surface-3);
          transition: border-color .35s ease;
        }

        /* ── Brand ─────────────────────────────────────────── */
        .nf-logo-row {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 16px; text-decoration: none;
        }
        .nf-logo-mark {
          width: 42px; height: 42px; border-radius: 12px;
          background: linear-gradient(135deg, var(--nf-blue-600), var(--nf-blue-400));
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; box-shadow: 0 4px 14px rgba(37,99,235,.28);
          position: relative;
          overflow: visible;
        }
        .nf-logo-img {
          width: 42px; height: 42px; border-radius: 10px;
          object-fit: cover; border: 1px solid var(--nf-surface-3);
          background: var(--nf-surface-2);
        }
        .nf-logo-status-dot {
          position: absolute; bottom: -4px; right: -4px;
          width: 12px; height: 12px; border-radius: 50%;
          transition: background .3s ease, box-shadow .3s ease;
          cursor: default;
        }
        .nf-logo-name { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 1.05rem; color: var(--nf-ink-1); line-height: 1.1; letter-spacing: -.01em; }
        .nf-logo-handle { font-size: .7rem; color: var(--nf-ink-4); font-weight: 400; letter-spacing: .04em; }
        .nf-brand-desc { font-size: .83rem; line-height: 1.7; color: var(--nf-ink-3); margin-bottom: 22px; max-width: 280px; }

        /* Social icons */
        .nf-social-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
        .nf-social-icon {
          width: 28px; height: 28px; border-radius: 9px;
          background: var(--nf-surface-2); border: 1px solid var(--nf-surface-3);
          display: flex; align-items: center; justify-content: center;
          color: var(--nf-ink-3); text-decoration: none;
          transition: all .28s cubic-bezier(.4,0,.2,1); cursor: pointer;
        }
        .nf-social-icon:hover { background: var(--nf-blue-600); border-color: var(--nf-blue-600); color: #fff; transform: translateY(-2px); box-shadow: var(--nf-shadow-hover); }
        .nf-social-icon:active { transform: scale(.96); }
        .nf-nav-list a:active { transform: scale(.97); }
        .nf-contact-card:active { transform: scale(.97) !important; box-shadow: none !important; }
        .nf-email-card:active,
        .nf-submit-btn:active,
        .nf-scroll-btn:active { transform: scale(.96); }
        .nf-social-icon svg { width: 13px; height: 13px; fill: currentColor; }

        /* Location */
        .nf-location-row { display: flex; align-items: center; gap: 7px; font-size: .8rem; color: var(--nf-ink-4); }
        .nf-location-row svg { width: 14px; height: 14px; fill: var(--nf-blue-600); flex-shrink: 0; }

        /* ── Nav cols ──────────────────────────────────────── */
        .nf-nav-col-title { font-size: .68rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--nf-ink-4); margin-bottom: 16px; }
        .nf-nav-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .nf-nav-list a {
          font-size: .845rem; color: var(--nf-ink-3); text-decoration: none;
          font-weight: 400; transition: all .28s cubic-bezier(.4,0,.2,1);
          display: inline-flex; align-items: center; gap: 6px;
        }
        .nf-nav-list a:hover { color: var(--nf-blue-600); padding-left: 4px; }

        /* ── Contact col ───────────────────────────────────── */
        .nf-contact-card {
          background: linear-gradient(135deg, var(--nf-blue-600) 0%, var(--nf-blue-700) 100%);
          border-radius: 14px; padding: 18px 20px; margin-bottom: 10px;
          text-decoration: none; display: block;
          position: relative; overflow: hidden;
          transition: all .28s cubic-bezier(.4,0,.2,1);
          box-shadow: 0 4px 18px rgba(37,99,235,.22);
        }
        .nf-contact-card::before {
          content: ''; position: absolute; top: -30px; right: -30px;
          width: 100px; height: 100px; border-radius: 50%;
          background: rgba(255,255,255,.07);
        }
        .nf-contact-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(37,99,235,.32); }
        .nf-cc-label { font-size: .66rem; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.65); margin-bottom: 5px; }
        .nf-cc-title { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 4px; }
        .nf-cc-sub { font-size: .75rem; color: rgba(255,255,255,.65); margin-bottom: 12px; }
        .nf-cc-arrow { display: inline-flex; align-items: center; gap: 5px; font-size: .78rem; font-weight: 600; color: #fff; }
        .nf-cc-arrow svg { width: 14px; height: 14px; fill: #fff; transition: transform .28s; }
        .nf-contact-card:hover .nf-cc-arrow svg { transform: translateX(3px); }

        .nf-email-card {
          background: var(--nf-surface-1); border: 1px solid var(--nf-surface-3);
          border-radius: 14px; padding: 14px 18px;
          display: flex; align-items: center; gap: 12px;
          text-decoration: none; transition: all .28s cubic-bezier(.4,0,.2,1);
        }
        .nf-email-card:hover { border-color: var(--nf-blue-400); background: rgba(59,130,246,.05); box-shadow: 0 2px 12px rgba(37,99,235,.1); }
        .nf-email-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(59,130,246,.1); border: 1px solid rgba(59,130,246,.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all .28s;
        }
        .nf-email-card:hover .nf-email-icon { background: var(--nf-blue-600); border-color: var(--nf-blue-600); }
        .nf-email-icon svg { width: 15px; height: 15px; fill: var(--nf-blue-600); transition: fill .28s; }
        .nf-email-card:hover .nf-email-icon svg { fill: #fff; }
        .nf-email-label { font-size: .66rem; font-weight: 600; color: var(--nf-ink-4); letter-spacing: .08em; text-transform: uppercase; }
        .nf-email-addr { font-size: .8rem; font-weight: 500; color: var(--nf-ink-2); }

        /* ══ BOTTOM BAR ══════════════════════════════════════ */
        .nf-bottom {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 0 22px; gap: 16px; flex-wrap: wrap;
        }
        .nf-copyright { font-size: .78rem; color: var(--nf-ink-4); }
        .nf-copyright a { color: var(--nf-ink-3); font-weight: 500; text-decoration: none; transition: color .2s; }
        .nf-copyright a:hover { color: var(--nf-ink-1); }
        .nf-bottom-right { display: flex; align-items: center; gap: 12px; }
        .nf-version { font-size: .68rem; font-weight: 600; letter-spacing: .06em; background: var(--nf-surface-2); border: 1px solid var(--nf-surface-3); color: var(--nf-ink-4); padding: 3px 10px; border-radius: 100px; }

        /* Scroll to top btn */
        .nf-scroll-btn {
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--nf-blue-600); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #fff; transition: all .28s cubic-bezier(.4,0,.2,1);
          box-shadow: 0 4px 14px rgba(37,99,235,.28); text-decoration: none; flex-shrink: 0;
        }
        .nf-scroll-btn:hover { background: var(--nf-blue-700); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,99,235,.38); }
        .nf-scroll-btn svg { width: 16px; height: 16px; fill: #fff; }

        /* Mobile border scroll btn */
        .nf-scroll-border {
          display: none; justify-content: center; position: relative;
          z-index: 5; margin-top: -22px; margin-bottom: 0;
        }
        .nf-scroll-border .nf-scroll-btn {
          width: 44px; height: 44px;
          box-shadow: 0 2px 12px rgba(37,99,235,.25), 0 0 0 4px var(--nf-footer-bg);
        }

        /* ══ RESPONSIVE ══════════════════════════════════════ */

        /* Tablet (≤1024px) */
        @media (max-width: 1024px) {
          .nf-main { grid-template-columns: 1.5fr 1fr 1fr; grid-template-rows: auto auto; }
          .nf-brand-col { grid-column: 1 / -1; }
          .nf-contact-col {
            grid-column: 1 / -1;
            display: grid; grid-template-columns: 1fr 1fr; gap: 10px; align-items: stretch;
          }
          .nf-contact-col .nf-nav-col-title { grid-column: 1 / -1; margin-bottom: 0; }
          .nf-brand-desc { max-width: 100%; }
          .nf-contact-card { margin-bottom: 0; }
          .nf-sc-right { flex: 0 1 380px; }
        }

        /* Small tablet (≤860px) */
        @media (max-width: 860px) {
          .nf-main { grid-template-columns: 1fr 1fr; }
          .nf-brand-col { grid-column: 1 / -1; }
          .nf-contact-col { grid-column: 1 / -1; grid-template-columns: 1fr 1fr; align-items: stretch; }
          .nf-sc-left h2 { font-size: 1.4rem; }
          .nf-sc { gap: 20px; }
          .nf-sc-right { flex: 1 1 100%; min-width: 100%; }
        }

        /* Mobile (≤600px) */
        @media (max-width: 600px) {
          .nf-sc { flex-direction: column; align-items: flex-start; gap: 20px; padding: 28px 24px; }
          .nf-sc-left, .nf-sc-right { flex: 1 1 auto; min-width: 100%; }
          .nf-main { grid-template-columns: 1fr 1fr; padding: 36px 0 32px; gap: 28px 20px; }
          .nf-brand-col { grid-column: 1 / -1; }
          .nf-nav-col { text-align: left; }
          .nf-contact-col { grid-column: 1 / -1; grid-template-columns: 1fr 1fr; gap: 10px; align-items: stretch; }
          .nf-contact-col .nf-nav-col-title { grid-column: 1 / -1; }
          .nf-contact-card { grid-column: 1 / -1; }
          .nf-email-card { grid-column: 1 / -1; }

          /* Social: 4-col grid */
          .nf-social-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; width: 100%; margin-bottom: 22px; }
          .nf-social-icon { width: 100%; height: 40px; border-radius: 8px; background: transparent; }
          .nf-social-icon:hover { background: rgba(59,130,246,.08); border-color: var(--nf-blue-400); transform: none; box-shadow: none; }
          .nf-social-icon svg { width: 15px; height: 15px; }

          /* Bottom */
          .nf-bottom { text-align: center; padding: 16px 0 20px; flex-direction: column; gap: 10px; align-items: center; }
          .nf-bottom-right { flex-direction: column; gap: 8px; align-items: center; }
          .nf-desktop-only { display: none !important; }
          .nf-scroll-border { display: flex; }

          /* Form: icon-only submit on mobile */
          .nf-form-wrap { padding: 4px; gap: 2px; }
          .nf-submit-btn { width: 38px; height: 38px; padding: 0; border-radius: 50%; min-width: 38px; justify-content: center; }
          .nf-submit-btn span { display: none; }
          .nf-submit-btn svg { margin: 0; width: 15px; height: 15px; }
          .nf-input-icon { width: 34px; height: 34px; }
          .nf-form-wrap input[type="email"] { font-size: .8rem; padding: 8px 4px 8px 2px; }
          .nf-count-text { font-size: .74rem; text-align: center; }
        }

        /* Extra narrow (≤340px) */
        @media (max-width: 340px) {
          .nf-social-row { gap: 4px; }
          .nf-social-icon { height: 30px; border-radius: 6px; }
          .nf-social-icon svg { width: 12px; height: 12px; }
        }

        /* Narrow (≤300px) */
        @media (max-width: 300px) {
          .nf-main { grid-template-columns: 1fr; gap: 26px; }
          .nf-contact-col { grid-template-columns: 1fr; }
        }

        /* Entrance animation */
        @keyframes nf-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nf-footer, .nf-sc-wrap { animation: nf-fade-up .55s ease both; }
      `})]})}const Cn=[{label:"Add Blog",icon:Rr,tab:"blogs",color:"#8b5cf6"},{label:"Add Project",icon:$e,tab:"projects",color:"#3b82f6"},{label:"Add Post",icon:zr,tab:"posts",color:"#ef4444"},{label:"Add Notification",icon:Fe,tab:"notifications",color:"#f59e0b"},{label:"View Reports",icon:Pr,tab:"reports",color:"#ec4899"},{label:"Page Visibility",icon:Lr,tab:"visibility",color:"#22c55e"}],_n={hidden:{},visible:{transition:{staggerChildren:.05}},exit:{transition:{staggerChildren:.03,staggerDirection:-1}}},Rn={hidden:{opacity:0,x:20,scale:.8},visible:{opacity:1,x:0,scale:1,transition:{type:"spring",stiffness:400,damping:28}},exit:{opacity:0,x:20,scale:.8,transition:{duration:.15}}};function zn(){const{isAdmin:t}=Vt(),r=xe(),[a,n]=f.useState(!1);return t?e.jsxs("div",{className:"fixed bottom-6 right-6 z-[var(--z-toast)] flex flex-col items-end gap-2 pointer-events-none",children:[e.jsx(j.AnimatePresence,{children:a&&e.jsx(j.motion.div,{variants:_n,initial:"hidden",animate:"visible",exit:"exit",className:"flex flex-col items-end gap-2 pointer-events-auto",children:Cn.map(s=>e.jsxs(j.motion.button,{variants:Rn,onClick:()=>{r(`/admin/${s.tab}`),n(!1)},className:"flex items-center gap-2.5 pr-3.5 pl-2.5 py-2 rounded-full shadow-[var(--shadow-lg)] border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-2)] transition-colors",children:[e.jsx("span",{className:"w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",style:{background:s.color+"22"},children:e.jsx(g,{icon:s.icon,style:{color:s.color},className:"text-xs"})}),e.jsx("span",{className:"text-sm font-medium text-[var(--text-primary)] whitespace-nowrap",children:s.label})]},s.tab))})}),e.jsx(j.motion.button,{onClick:()=>n(!a),whileHover:{scale:1.05},whileTap:{scale:.95},className:"pointer-events-auto w-12 h-12 rounded-full bg-[var(--accent-primary)] text-white shadow-[0_4px_20px_rgba(59,130,246,0.5)] hover:bg-[var(--accent-hover)] transition-colors flex items-center justify-center","aria-label":"Admin quick actions",children:e.jsx(j.AnimatePresence,{mode:"wait",initial:!1,children:a?e.jsx(j.motion.span,{initial:{opacity:0,rotate:-90},animate:{opacity:1,rotate:0},exit:{opacity:0,rotate:90},transition:{duration:.15},children:e.jsx(g,{icon:pe,className:"text-lg"})},"x"):e.jsx(j.motion.span,{initial:{opacity:0,rotate:90},animate:{opacity:1,rotate:0},exit:{opacity:0,rotate:-90},transition:{duration:.15},children:e.jsx(g,{icon:X,className:"text-base"})},"shield")})})]}):null}const Ee="mdturzo_cookie_consent_v1";function Pn({enabled:t=!0}){const[r,a]=f.useState(!1);f.useEffect(()=>{if(t)try{if(!localStorage.getItem(Ee)){const i=setTimeout(()=>a(!0),1800);return()=>clearTimeout(i)}}catch{}},[t]);function n(){try{localStorage.setItem(Ee,"accepted")}catch{}a(!1)}function s(){try{localStorage.setItem(Ee,"declined")}catch{}a(!1)}return e.jsx(j.AnimatePresence,{children:r&&e.jsx(j.motion.div,{className:"fixed bottom-4 left-4 right-4 sm:left-auto sm:right-5 sm:max-w-sm z-[9990]",initial:{opacity:0,y:28,scale:.96},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:18,scale:.96},transition:{duration:.32,ease:[.16,1,.3,1]},children:e.jsx("div",{className:"rounded-2xl p-5 shadow-[var(--shadow-xl)] border border-[var(--border-strong)] bg-[var(--bg-surface)]",children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("div",{className:"w-9 h-9 rounded-xl bg-amber-400/15 flex items-center justify-center flex-shrink-0 mt-0.5",children:e.jsx(g,{icon:Ve,className:"text-amber-400 text-base"})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"font-semibold text-sm text-[var(--text-primary)] mb-1",children:"We use cookies"}),e.jsxs("p",{className:"text-xs text-[var(--text-secondary)] leading-relaxed",children:["This site uses cookies for analytics and to improve your experience."," ",e.jsx(A,{to:"/cookies-policy",className:"text-[var(--accent-primary)] hover:underline",children:"Learn more"})]}),e.jsxs("div",{className:"flex gap-2 mt-3",children:[e.jsx("button",{onClick:n,className:`px-4 py-1.5 rounded-lg bg-[var(--accent-primary)] text-white
                      text-xs font-semibold hover:bg-[var(--accent-hover)] active:scale-95 transition-all duration-150`,children:"Accept all"}),e.jsx("button",{onClick:s,className:`px-4 py-1.5 rounded-lg border border-[var(--border-color)]
                      text-xs font-medium text-[var(--text-secondary)]
                      hover:border-[var(--border-strong)] active:scale-95 transition-all duration-150`,children:"Decline"})]})]}),e.jsx("button",{onClick:s,"aria-label":"Close",className:`w-6 h-6 flex items-center justify-center rounded-full text-[var(--text-tertiary)]
                  hover:text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)]
                  transition-colors duration-150 flex-shrink-0 -mt-0.5`,children:e.jsx(g,{icon:pe,className:"text-xs"})})]})})})})}function Ln(){return e.jsxs("div",{className:"min-h-screen flex flex-col",style:{background:"var(--bg-page)"},children:[e.jsx(jn,{}),e.jsx("main",{className:"flex-1",children:e.jsx(Wt,{})}),e.jsx(An,{}),e.jsx(zn,{}),e.jsx(Pn,{})]})}const dt={success:{icon:$r,color:"text-emerald-400",bg:"bg-emerald-500/10 border-emerald-500/30",bar:"bg-emerald-400"},error:{icon:Dr,color:"text-red-400",bg:"bg-red-500/10 border-red-500/30",bar:"bg-red-400"},warning:{icon:Ir,color:"text-amber-400",bg:"bg-amber-500/10 border-amber-500/30",bar:"bg-amber-400"},info:{icon:Or,color:"text-blue-400",bg:"bg-blue-500/10 border-blue-500/30",bar:"bg-blue-400"}};function On({toast:t}){const{removeToast:r}=z(),a=dt[t.type]||dt.info;return e.jsxs(j.motion.div,{layout:!0,initial:{opacity:0,x:60,scale:.95},animate:{opacity:1,x:0,scale:1},exit:{opacity:0,x:60,scale:.9,transition:{duration:.15}},className:`
        relative overflow-hidden rounded-lg border backdrop-blur-xl shadow-lg
        pointer-events-auto w-full max-w-[320px]
        ${a.bg}
      `,children:[e.jsxs("div",{className:"flex items-start gap-2.5 px-3 py-2.5",children:[e.jsx(g,{icon:a.icon,className:`${a.color} text-base flex-shrink-0 mt-0.5`}),e.jsxs("div",{className:"flex-1 min-w-0",children:[t.title&&e.jsx("p",{className:"text-[13px] font-semibold text-[var(--text-primary)] leading-tight",children:t.title}),t.message&&e.jsx("p",{className:"text-xs text-[var(--text-secondary)] mt-0.5 leading-snug",children:t.message})]}),e.jsx("button",{onClick:()=>r(t.id),className:"text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0 p-0.5",children:e.jsx(g,{icon:Mr,className:"text-xs"})})]}),t.duration&&e.jsx(j.motion.div,{className:`absolute bottom-0 left-0 h-0.5 ${a.bar}`,initial:{width:"100%"},animate:{width:"0%"},transition:{duration:t.duration/1e3,ease:"linear"}})]})}function In(){const t=z(r=>r.toasts);return e.jsx("div",{id:"toast-container","aria-live":"polite","aria-atomic":"false",children:e.jsx(j.AnimatePresence,{mode:"popLayout",children:t.map(r=>e.jsx(On,{toast:r},r.id))})})}function Dn(){const t=J(),[r,a]=f.useState(0),[n,s]=f.useState(!1),o=f.useRef(null),i=f.useRef(null),l=f.useRef(null);return f.useEffect(()=>(clearTimeout(o.current),clearTimeout(i.current),clearTimeout(l.current),s(!0),a(0),o.current=setTimeout(()=>a(30),50),i.current=setTimeout(()=>a(70),300),l.current=setTimeout(()=>{a(100),setTimeout(()=>{s(!1),a(0)},300)},700),()=>{clearTimeout(o.current),clearTimeout(i.current),clearTimeout(l.current)}),[t.pathname,t.search]),!n&&r===0?null:e.jsx("div",{id:"page-progress",className:n?"is-visible":"",style:{width:`${r}%`,opacity:n?1:0},children:e.jsx("span",{className:"page-progress-head"})})}class $n extends f.Component{constructor(r){super(r),this.state={hasError:!1,error:null}}static getDerivedStateFromError(r){return{hasError:!0,error:r}}componentDidCatch(r,a){console.error("[ErrorBoundary]",r,a);try{window.__SENTRY_INITIALIZED__&&E(async()=>{const{captureException:n}=await import("./index-DBLVxIkL.js");return{captureException:n}},__vite__mapDeps([0,1])).then(({captureException:n})=>{n(r,{extra:a})})}catch{}}render(){return this.state.hasError?e.jsxs("div",{className:"min-h-[60vh] flex flex-col items-center justify-center p-8 text-center",children:[e.jsx("div",{className:"text-red-400 mb-4",children:e.jsx(g,{icon:Vr,className:"text-5xl"})}),e.jsx("h2",{className:"text-xl font-bold text-[var(--text-primary)] mb-2",children:"Something went wrong"}),e.jsx("p",{className:"text-[var(--text-secondary)] mb-6 max-w-sm",children:"An unexpected error occurred. Please try refreshing the page."}),e.jsxs("button",{onClick:()=>window.location.reload(),className:"inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-colors",children:[e.jsx(g,{icon:Fr}),"Refresh Page"]}),!1]}):this.props.children}}function H({lines:t=3,className:r=""}){const a=["w-full","w-4/5","w-3/4","w-2/3","w-1/2","w-5/6"];return e.jsx("div",{className:`space-y-2.5 ${r}`,children:Array.from({length:t},(n,s)=>e.jsx("div",{className:`sk h-4 rounded ${a[s%a.length]}`,style:{animationDelay:`${s*.08}s`}},s))})}function le({size:t=48,className:r=""}){return e.jsx("div",{className:`sk rounded-full flex-shrink-0 ${r}`,style:{width:t,height:t}})}function b({w:t="w-full",h:r="h-4",rounded:a="rounded",className:n="",delay:s=0}){return e.jsx("div",{className:`sk ${t} ${r} ${a} ${n}`,style:{animationDelay:`${s}s`}})}function Ht({className:t=""}){return e.jsxs("div",{className:`card p-5 space-y-4 ${t}`,children:[e.jsx(b,{h:"h-44",rounded:"rounded-lg"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(b,{w:"w-16",h:"h-5",rounded:"rounded-full",delay:.05}),e.jsx(b,{w:"w-20",h:"h-5",rounded:"rounded-full",delay:.1})]}),e.jsx(b,{w:"w-3/4",h:"h-5",delay:.12}),e.jsx(b,{w:"w-1/2",h:"h-4",delay:.15}),e.jsx(H,{lines:2}),e.jsxs("div",{className:"flex items-center justify-between pt-2",children:[e.jsx(b,{w:"w-20",h:"h-4",delay:.18}),e.jsx(b,{w:"w-24",h:"h-8",rounded:"rounded-lg",delay:.2})]})]})}function Mn({className:t=""}){return e.jsxs("div",{className:`flex items-center gap-4 p-4 border-b border-[var(--border-color)] ${t}`,children:[e.jsx(b,{w:"w-12",h:"h-12",rounded:"rounded-lg"}),e.jsxs("div",{className:"flex-1 space-y-2",children:[e.jsx(b,{w:"w-2/3",h:"h-4"}),e.jsx(b,{w:"w-1/2",h:"h-3",delay:.08})]}),e.jsx(b,{w:"w-20",h:"h-8",rounded:"rounded-lg",delay:.12})]})}function Vn({className:t=""}){return e.jsx("div",{className:`sk h-52 w-full rounded-xl ${t}`})}function ut({className:t=""}){return e.jsxs("div",{className:`card p-5 text-center space-y-2 ${t}`,children:[e.jsx(b,{w:"w-20",h:"h-10",rounded:"rounded-lg",className:"mx-auto"}),e.jsx(b,{w:"w-16",h:"h-3",className:"mx-auto"})]})}function Fn({count:t=6}){return e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:Array.from({length:t},(r,a)=>e.jsx(Ht,{},a))})}function Hn({rows:t=5,cols:r=4,className:a=""}){return e.jsxs("div",{className:a,children:[e.jsx("div",{className:"flex gap-3 p-3 border-b border-[var(--border-color)] mb-1",children:Array.from({length:r},(n,s)=>e.jsx(b,{h:"h-4",className:"flex-1"},s))}),Array.from({length:t},(n,s)=>e.jsx("div",{className:"flex gap-3 p-3 border-b border-[var(--border-color)]",children:Array.from({length:r},(o,i)=>e.jsx(b,{h:"h-4",className:"flex-1",delay:i*.04},i))},s))]})}const ft={hero:()=>e.jsxs("div",{className:"container py-16 space-y-10",children:[e.jsxs("div",{className:"flex flex-col lg:flex-row gap-10 items-center py-8",children:[e.jsxs("div",{className:"flex-1 space-y-5",children:[e.jsx(b,{w:"w-1/3",h:"h-5",rounded:"rounded-full"}),e.jsx(b,{w:"w-5/6",h:"h-12",delay:.05}),e.jsx(b,{w:"w-4/6",h:"h-12",delay:.08}),e.jsx(H,{lines:2}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(b,{w:"w-32",h:"h-11",rounded:"rounded-full",delay:.1}),e.jsx(b,{w:"w-36",h:"h-11",rounded:"rounded-full",delay:.12})]}),e.jsx("div",{className:"flex gap-2",children:[...Array(5)].map((t,r)=>e.jsx(le,{size:36},r))})]}),e.jsx(le,{size:280,className:"flex-shrink-0"})]}),e.jsx("div",{className:"grid grid-cols-3 gap-4",children:[...Array(3)].map((t,r)=>e.jsx(ut,{},r))})]}),grid:()=>e.jsxs("div",{className:"container py-10 space-y-8",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(b,{w:"w-40",h:"h-8"}),e.jsx(b,{w:"w-32",h:"h-10",rounded:"rounded-full"})]}),e.jsx("div",{className:"flex gap-2",children:[...Array(5)].map((t,r)=>e.jsx(b,{w:"w-20",h:"h-8",rounded:"rounded-full",delay:r*.04},r))}),e.jsx(Fn,{count:6})]}),list:()=>e.jsxs("div",{className:"container py-10 space-y-6",children:[e.jsx(b,{w:"w-48",h:"h-8"}),e.jsx("div",{className:"card overflow-hidden",children:[...Array(6)].map((t,r)=>e.jsx(Mn,{},r))})]}),detail:()=>e.jsx("div",{className:"container py-10 max-w-3xl mx-auto",children:e.jsxs("div",{className:"space-y-6",children:[e.jsx(b,{w:"w-24",h:"h-5",rounded:"rounded-full"}),e.jsx(b,{w:"w-5/6",h:"h-10",delay:.05}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(le,{size:44}),e.jsxs("div",{className:"flex-1 space-y-2",children:[e.jsx(b,{w:"w-36",h:"h-4"}),e.jsx(b,{w:"w-24",h:"h-3",delay:.06})]})]}),e.jsx(Vn,{}),e.jsx(H,{lines:6}),e.jsx(H,{lines:4}),e.jsx(H,{lines:3})]})}),profile:()=>e.jsxs("div",{className:"container py-10 space-y-8 max-w-4xl mx-auto",children:[e.jsxs("div",{className:"card p-8 flex gap-6 items-start",children:[e.jsx(le,{size:88}),e.jsxs("div",{className:"flex-1 space-y-3",children:[e.jsx(b,{w:"w-48",h:"h-7"}),e.jsx(b,{w:"w-32",h:"h-4",delay:.05}),e.jsx(H,{lines:2}),e.jsx("div",{className:"flex gap-2",children:[...Array(4)].map((t,r)=>e.jsx(b,{w:"w-8",h:"h-8",rounded:"rounded-full"},r))})]})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[...Array(4)].map((t,r)=>e.jsx(Ht,{},r))})]}),admin:()=>e.jsxs("div",{className:"flex gap-0 min-h-[80vh]",children:[e.jsxs("div",{className:"w-60 flex-shrink-0 border-r border-[var(--border-color)] p-4 space-y-2",children:[e.jsx(b,{w:"w-full",h:"h-10",rounded:"rounded-xl"}),[...Array(8)].map((t,r)=>e.jsx(b,{w:"w-full",h:"h-9",rounded:"rounded-xl",delay:r*.03},r))]}),e.jsxs("div",{className:"flex-1 p-8 space-y-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(b,{w:"w-40",h:"h-8"}),e.jsx(b,{w:"w-28",h:"h-10",rounded:"rounded-xl"})]}),e.jsx("div",{className:"grid grid-cols-4 gap-4",children:[...Array(4)].map((t,r)=>e.jsx(ut,{},r))}),e.jsx(Hn,{rows:6})]})]}),form:()=>e.jsx("div",{className:"container py-10 max-w-xl mx-auto",children:e.jsxs("div",{className:"card p-8 space-y-6",children:[e.jsx(b,{w:"w-40",h:"h-7"}),e.jsx(H,{lines:1}),[...Array(4)].map((t,r)=>e.jsxs("div",{className:"space-y-2",children:[e.jsx(b,{w:"w-24",h:"h-4",delay:r*.05}),e.jsx(b,{w:"w-full",h:"h-11",rounded:"rounded-xl",delay:r*.06})]},r)),e.jsx(b,{w:"w-full",h:"h-11",rounded:"rounded-xl",delay:.2})]})}),blank:()=>e.jsx("div",{className:"container py-10 space-y-4",children:[...Array(3)].map((t,r)=>e.jsx(b,{w:"w-full",h:"h-32",rounded:"rounded-2xl",delay:r*.08},r))})};function Un({layout:t="blank"}){const r=ft[t]||ft.blank;return e.jsx("div",{className:"animate-in fade-in duration-300 min-h-[60vh]","aria-hidden":!0,"aria-label":"Loading...",children:e.jsx(r,{})})}const pt=f.lazy(()=>E(()=>import("./Home-KoEfRVsz.js"),__vite__mapDeps([2,3,1,4,5,6,7,8]))),Bn=f.lazy(()=>E(()=>import("./About-RSBBHPmP.js"),__vite__mapDeps([9,3,1,4,6,8,7]))),Yn=f.lazy(()=>E(()=>import("./Projects-WN13fqCi.js"),__vite__mapDeps([10,3,1,11,4,5,6,8,7]))),qn=f.lazy(()=>E(()=>import("./ProjectDetail-CZr0u8hw.js"),__vite__mapDeps([12,3,1,4,6,8,7]))),Gn=f.lazy(()=>E(()=>import("./Feed-CFMZFL4O.js"),__vite__mapDeps([13,3,1]))),Xn=f.lazy(()=>E(()=>import("./Blogs-CXseuyQy.js"),__vite__mapDeps([14,3,1,11,4,5,6,8,7]))),Kn=f.lazy(()=>E(()=>import("./BlogDetail-CHeGaRzP.js"),__vite__mapDeps([15,3,1,4,6,8,7]))),Wn=f.lazy(()=>E(()=>import("./Posts-ByEPWdsY.js"),__vite__mapDeps([16,3,1,11,4,5,6,8,7]))),Jn=f.lazy(()=>E(()=>import("./PostDetail-2mbZhvWp.js"),__vite__mapDeps([17,3,1,4,6,8,7]))),Qn=f.lazy(()=>E(()=>import("./Contact-0ezVzTCW.js"),__vite__mapDeps([18,3,1,4,6,8,7]))),Zn=f.lazy(()=>E(()=>import("./Login-DbGog_1n.js"),__vite__mapDeps([19,3,1,4,6,8,7]))),es=f.lazy(()=>E(()=>import("./Signup-DvMbA3nR.js"),__vite__mapDeps([20,3,1,4,6,8,7]))),ts=f.lazy(()=>E(()=>import("./AuthAction-BeJ1UJpF.js"),__vite__mapDeps([21,3,1,6,8,7]))),rs=f.lazy(()=>E(()=>import("./Profile-FIHLzq6v.js"),__vite__mapDeps([22,3,1,4,6,8,7]))),as=f.lazy(()=>E(()=>import("./PublicProfile-CJ4vqm_X.js"),__vite__mapDeps([23,3,1,6,8,7]))),mt=f.lazy(()=>E(()=>import("./Admin-Dn8S0FEe.js"),__vite__mapDeps([24,3,1,6,8,7]))),ns=f.lazy(()=>E(()=>import("./PrivacyPolicy-CVZ1xIs3.js"),__vite__mapDeps([25,3,1,4,6,8,7]))),ss=f.lazy(()=>E(()=>import("./CookiesPolicy-D8XwMJpO.js"),__vite__mapDeps([26,3,1,4,6,8,7]))),xt=f.lazy(()=>E(()=>import("./NotFound-BQtKAfJD.js"),__vite__mapDeps([27,3,1,7,6,8]))),os={initial:{opacity:0,y:8},enter:{opacity:1,y:0,transition:{duration:.25,ease:[.16,1,.3,1]}},exit:{opacity:0,transition:{duration:.12,ease:"easeIn"}}},is=["button:not(:disabled)",'[role="button"]',".card",".nf-email-card","[data-click-fx]"].join(","),ls=["input","textarea","select","option",'[contenteditable="true"]','[data-click-fx-ignore="true"]','[data-ripple-managed="true"]'].join(",");function cs(){return f.useEffect(()=>{const t=r=>{if(r.button!=null&&r.button!==0||!(r.target instanceof Element)||r.target.closest(ls))return;const a=r.target.closest(is);if(!a)return;const n=a.getBoundingClientRect();if(!n.width||!n.height)return;const s=Math.max(n.width,n.height)*1.5,o=document.createElement("span");o.className="click-fx-burst",o.style.width=`${s}px`,o.style.height=`${s}px`,o.style.left=`${r.clientX-n.left-s/2}px`,o.style.top=`${r.clientY-n.top-s/2}px`,a.classList.add("click-fx-host"),a.appendChild(o),window.setTimeout(()=>o.remove(),680)};return document.addEventListener("pointerdown",t,{passive:!0}),()=>document.removeEventListener("pointerdown",t)},[]),null}function ds({children:t}){return e.jsx(j.motion.div,{variants:os,initial:"initial",animate:"enter",exit:"exit",children:t})}function Ut({fullscreen:t=!1}){return e.jsx("div",{className:t?"fixed inset-0 z-[99999] flex items-center justify-center bg-[var(--bg-page)] px-4":"min-h-[60vh] flex items-center justify-center px-4",children:e.jsx("div",{style:{width:34,height:34,border:"3px solid var(--border-strong)",borderTopColor:"var(--accent-primary)",borderRadius:"50%",animation:"spin 0.7s linear infinite",flexShrink:0}})})}function us({children:t,onReady:r}){return f.useEffect(()=>{r==null||r()},[r]),t}function fs({children:t,layout:r="blank",initialPending:a,onReady:n}){return e.jsx(f.Suspense,{fallback:a?e.jsx(Ut,{fullscreen:!0}):e.jsx(Un,{layout:r}),children:e.jsx(us,{onReady:n,children:t})})}function ps(){const t=J();return f.useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"auto"}),document.documentElement.scrollTop=0,document.body.scrollTop=0},[t.pathname,t.search]),null}function ms(){const t=J(),r=f.useRef(null),a=t.pathname==="/"||t.pathname==="/home";return f.useEffect(()=>{if(!a)return;const n=60,s=80,o=420,i=()=>{clearTimeout(r.current),r.current=setTimeout(()=>{const l=document.querySelectorAll("section[id], .section[id]");if(!l.length)return;let c=null,d=1/0;l.forEach(u=>{const p=u.getBoundingClientRect().top+window.scrollY-n,v=Math.abs(window.scrollY-p);v<d&&(d=v,c={el:u,top:p})}),c&&d<s&&d>6&&window.scrollTo({top:c.top,behavior:"smooth"})},o)};return window.addEventListener("scroll",i,{passive:!0}),()=>{window.removeEventListener("scroll",i),clearTimeout(r.current)}},[a,t.pathname]),null}function xs(){const t=xe();return f.useEffect(()=>{Be().finally(()=>t("/",{replace:!0}))},[]),e.jsx(Ut,{})}function hs(){const t=J(),[r,a]=f.useState(!1),n=f.useCallback(()=>a(!0),[]),s=(o,i="blank")=>e.jsx(fs,{layout:i,initialPending:!r,onReady:n,children:e.jsx(ds,{children:o})});return e.jsx(j.AnimatePresence,{mode:"wait",initial:!1,children:e.jsxs(Jt,{location:t,children:[e.jsxs(S,{element:e.jsx(Ln,{}),children:[e.jsx(S,{path:"/home",element:s(e.jsx(pt,{}),"hero")}),e.jsx(S,{path:"/",element:s(e.jsx(pt,{}),"hero")}),e.jsx(S,{path:"/about",element:s(e.jsx(Bn,{}),"profile")}),e.jsx(S,{path:"/projects",element:s(e.jsx(Yn,{}),"grid")}),e.jsx(S,{path:"/projects/:slug",element:s(e.jsx(qn,{}),"detail")}),e.jsx(S,{path:"/feed",element:s(e.jsx(Gn,{}),"list")}),e.jsx(S,{path:"/blogs",element:s(e.jsx(Xn,{}),"list")}),e.jsx(S,{path:"/blogs/:slug",element:s(e.jsx(Kn,{}),"detail")}),e.jsx(S,{path:"/posts",element:s(e.jsx(Wn,{}),"list")}),e.jsx(S,{path:"/posts/:slug",element:s(e.jsx(Jn,{}),"detail")}),e.jsx(S,{path:"/contact",element:s(e.jsx(Qn,{}),"form")}),e.jsx(S,{path:"/login",element:s(e.jsx(Zn,{}),"form")}),e.jsx(S,{path:"/signup",element:s(e.jsx(es,{}),"form")}),e.jsx(S,{path:"/logout",element:e.jsx(xs,{})}),e.jsx(S,{path:"/profile",element:s(e.jsx(rs,{}),"profile")}),e.jsx(S,{path:"/@:username",element:s(e.jsx(as,{}),"profile")}),e.jsx(S,{path:"/admin",element:s(e.jsx(mt,{}),"admin")}),e.jsx(S,{path:"/admin/:tab",element:s(e.jsx(mt,{}),"admin")}),e.jsx(S,{path:"/privacy-policy",element:s(e.jsx(ns,{}),"detail")}),e.jsx(S,{path:"/cookies-policy",element:s(e.jsx(ss,{}),"detail")}),e.jsx(S,{path:"/404",element:s(e.jsx(xt,{}),"blank")}),e.jsx(S,{path:"*",element:s(e.jsx(xt,{}),"blank")})]}),e.jsx(S,{path:"/auth/action",element:s(e.jsx(ts,{}),"form")})]},t.pathname)})}function bs(){return sn(),ln(),e.jsx(_t,{children:e.jsxs($n,{children:[e.jsx(cs,{}),e.jsx(ps,{}),e.jsx(ms,{}),e.jsx(Dn,{}),e.jsx(In,{}),e.jsx(hs,{})]})})}Ce.createRoot(document.getElementById("root")).render(e.jsx(R.StrictMode,{children:e.jsx(Qt,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:e.jsx(bs,{})})}));export{Ns as H,Un as P,w as S,Es as a,Ht as b,Rs as c,Cs as d,b as e,le as f,Ss as g,As as h,Ts as i,on as j,Ya as k,Vt as l,_s as t,Mt as u};
