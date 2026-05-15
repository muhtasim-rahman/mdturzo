const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-B3IBK3zd.js","assets/vendor-DGPDQUSB.js","assets/Home-Bpy68Bcd.js","assets/motion-BmXxBZ1x.js","assets/seo-CKgZW5G9.js","assets/analytics-D9YmjoTb.js","assets/firebase-DPKIO6Ex.js","assets/useSiteSettings-B-K_dMFR.js","assets/icons-DXJBqmWo.js","assets/supabase-vrwWM04E.js","assets/About-CJc2w2Dw.js","assets/VisibilityGuard-hQ1fJXzJ.js","assets/Projects-DCx2ZajE.js","assets/ProjectDetail-DroB5pNB.js","assets/Feed-C94f8IQq.js","assets/Blogs-kL4NdcOV.js","assets/BlogDetail-DY8wpfLn.js","assets/Posts-C3PWdu5q.js","assets/PostDetail-DWs3eR-F.js","assets/Contact-DB94FruC.js","assets/Login-DmhVOcwf.js","assets/Signup-D1zCmwEg.js","assets/AuthAction-DCyLyMqM.js","assets/Profile-a4lWdgDb.js","assets/PublicProfile-kFURaTTr.js","assets/Admin-DkOdgvWf.js","assets/PrivacyPolicy-CCKYQWHb.js","assets/CookiesPolicy-BtHVmoxH.js","assets/NotFound-Bp6Szb_q.js"])))=>i.map(i=>d[i]);
var tr=Object.defineProperty;var rr=(t,r,a)=>r in t?tr(t,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[r]=a;var I=(t,r,a)=>rr(t,typeof r!="symbol"?r+"":r,a);import{j as e,c as j}from"./motion-BmXxBZ1x.js";import{a as ar,g as ge,r as u,R as P,u as oe,b as be,N as ce,L as A,O as nr,c as sr,d as T,e as or,B as ir}from"./vendor-DGPDQUSB.js";import{g as lr,i as cr,b as dr,c as pr,d as ur,e as fr,f as mr,G as xr,h as hr,F as gr,o as br,r as V,u as Tt,j as Fe,k as He,s as vr,l as Et,m as At,n as me,p as yr,q as wr}from"./firebase-DPKIO6Ex.js";import{c as jr}from"./supabase-vrwWM04E.js";import{f as Ue,a as Be,b as ve,c as Ye,d as qe,F as x,e as z,g as te,h as ae,i as xe,j as he,k as ye,l as B,m as Ge,n as Ct,o as _t,p as zt,q as Xe,r as kr,s as Nr,t as Sr,u as Tr,v as Er,w as Ar,x as Cr,y as _r,z as zr,A as Pr,B as Rr,C as Lr,D as Or,E as Ir,G as Dr,H as $r,I as Mr,J as Vr,K as Fr,L as Hr,M as Ur,N as Br,O as Yr,P as qr,Q as Gr}from"./icons-DXJBqmWo.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();const Xr="modulepreload",Kr=function(t){return"/"+t},ot={},E=function(r,a,n){let s=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),l=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));s=Promise.allSettled(a.map(c=>{if(c=Kr(c),c in ot)return;ot[c]=!0;const d=c.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${p}`))return;const m=document.createElement("link");if(m.rel=d?"stylesheet":Xr,d||(m.as="script"),m.crossOrigin="",m.href=c,l&&m.setAttribute("nonce",l),document.head.appendChild(m),d)return new Promise((v,g)=>{m.addEventListener("load",v),m.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(i){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=i,window.dispatchEvent(l),!l.defaultPrevented)throw i}return s.then(i=>{for(const l of i||[])l.status==="rejected"&&o(l.reason);return r().catch(o)})};var Le={},it=ar;Le.createRoot=it.createRoot,Le.hydrateRoot=it.hydrateRoot;var Wr=typeof Element<"u",Qr=typeof Map=="function",Jr=typeof Set=="function",Zr=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function ue(t,r){if(t===r)return!0;if(t&&r&&typeof t=="object"&&typeof r=="object"){if(t.constructor!==r.constructor)return!1;var a,n,s;if(Array.isArray(t)){if(a=t.length,a!=r.length)return!1;for(n=a;n--!==0;)if(!ue(t[n],r[n]))return!1;return!0}var o;if(Qr&&t instanceof Map&&r instanceof Map){if(t.size!==r.size)return!1;for(o=t.entries();!(n=o.next()).done;)if(!r.has(n.value[0]))return!1;for(o=t.entries();!(n=o.next()).done;)if(!ue(n.value[1],r.get(n.value[0])))return!1;return!0}if(Jr&&t instanceof Set&&r instanceof Set){if(t.size!==r.size)return!1;for(o=t.entries();!(n=o.next()).done;)if(!r.has(n.value[0]))return!1;return!0}if(Zr&&ArrayBuffer.isView(t)&&ArrayBuffer.isView(r)){if(a=t.length,a!=r.length)return!1;for(n=a;n--!==0;)if(t[n]!==r[n])return!1;return!0}if(t.constructor===RegExp)return t.source===r.source&&t.flags===r.flags;if(t.valueOf!==Object.prototype.valueOf&&typeof t.valueOf=="function"&&typeof r.valueOf=="function")return t.valueOf()===r.valueOf();if(t.toString!==Object.prototype.toString&&typeof t.toString=="function"&&typeof r.toString=="function")return t.toString()===r.toString();if(s=Object.keys(t),a=s.length,a!==Object.keys(r).length)return!1;for(n=a;n--!==0;)if(!Object.prototype.hasOwnProperty.call(r,s[n]))return!1;if(Wr&&t instanceof Element)return!1;for(n=a;n--!==0;)if(!((s[n]==="_owner"||s[n]==="__v"||s[n]==="__o")&&t.$$typeof)&&!ue(t[s[n]],r[s[n]]))return!1;return!0}return t!==t&&r!==r}var ea=function(r,a){try{return ue(r,a)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}};const ta=ge(ea);var ra=function(t,r,a,n,s,o,i,l){if(!t){var c;if(r===void 0)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var d=[a,n,s,o,i,l],p=0;c=new Error(r.replace(/%s/g,function(){return d[p++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}},aa=ra;const lt=ge(aa);var na=function(r,a,n,s){var o=n?n.call(s,r,a):void 0;if(o!==void 0)return!!o;if(r===a)return!0;if(typeof r!="object"||!r||typeof a!="object"||!a)return!1;var i=Object.keys(r),l=Object.keys(a);if(i.length!==l.length)return!1;for(var c=Object.prototype.hasOwnProperty.bind(a),d=0;d<i.length;d++){var p=i[d];if(!c(p))return!1;var m=r[p],v=a[p];if(o=n?n.call(s,m,v,p):void 0,o===!1||o===void 0&&m!==v)return!1}return!0};const sa=ge(na);var Pt=(t=>(t.BASE="base",t.BODY="body",t.HEAD="head",t.HTML="html",t.LINK="link",t.META="meta",t.NOSCRIPT="noscript",t.SCRIPT="script",t.STYLE="style",t.TITLE="title",t.FRAGMENT="Symbol(react.fragment)",t))(Pt||{}),Ee={link:{rel:["amphtml","canonical","alternate"]},script:{type:["application/ld+json"]},meta:{charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}},ct=Object.values(Pt),Ke={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},oa=Object.entries(Ke).reduce((t,[r,a])=>(t[a]=r,t),{}),_="data-rh",X={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate",PRIORITIZE_SEO_TAGS:"prioritizeSeoTags"},K=(t,r)=>{for(let a=t.length-1;a>=0;a-=1){const n=t[a];if(Object.prototype.hasOwnProperty.call(n,r))return n[r]}return null},ia=t=>{let r=K(t,"title");const a=K(t,X.TITLE_TEMPLATE);if(Array.isArray(r)&&(r=r.join("")),a&&r)return a.replace(/%s/g,()=>r);const n=K(t,X.DEFAULT_TITLE);return r||n||void 0},la=t=>K(t,X.ON_CHANGE_CLIENT_STATE)||(()=>{}),Ae=(t,r)=>r.filter(a=>typeof a[t]<"u").map(a=>a[t]).reduce((a,n)=>({...a,...n}),{}),ca=(t,r)=>r.filter(a=>typeof a.base<"u").map(a=>a.base).reverse().reduce((a,n)=>{if(!a.length){const s=Object.keys(n);for(let o=0;o<s.length;o+=1){const l=s[o].toLowerCase();if(t.indexOf(l)!==-1&&n[l])return a.concat(n)}}return a},[]),da=t=>console&&typeof console.warn=="function"&&console.warn(t),Z=(t,r,a)=>{const n={};return a.filter(s=>Array.isArray(s[t])?!0:(typeof s[t]<"u"&&da(`Helmet: ${t} should be of type "Array". Instead found type "${typeof s[t]}"`),!1)).map(s=>s[t]).reverse().reduce((s,o)=>{const i={};o.filter(c=>{let d;const p=Object.keys(c);for(let v=0;v<p.length;v+=1){const g=p[v],h=g.toLowerCase();r.indexOf(h)!==-1&&!(d==="rel"&&c[d].toLowerCase()==="canonical")&&!(h==="rel"&&c[h].toLowerCase()==="stylesheet")&&(d=h),r.indexOf(g)!==-1&&(g==="innerHTML"||g==="cssText"||g==="itemprop")&&(d=g)}if(!d||!c[d])return!1;const m=c[d].toLowerCase();return n[d]||(n[d]={}),i[d]||(i[d]={}),n[d][m]?!1:(i[d][m]=!0,!0)}).reverse().forEach(c=>s.push(c));const l=Object.keys(i);for(let c=0;c<l.length;c+=1){const d=l[c],p={...n[d],...i[d]};n[d]=p}return s},[]).reverse()},pa=(t,r)=>{if(Array.isArray(t)&&t.length){for(let a=0;a<t.length;a+=1)if(t[a][r])return!0}return!1},ua=t=>({baseTag:ca(["href"],t),bodyAttributes:Ae("bodyAttributes",t),defer:K(t,X.DEFER),encode:K(t,X.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:Ae("htmlAttributes",t),linkTags:Z("link",["rel","href"],t),metaTags:Z("meta",["name","charset","http-equiv","property","itemprop"],t),noscriptTags:Z("noscript",["innerHTML"],t),onChangeClientState:la(t),scriptTags:Z("script",["src","innerHTML"],t),styleTags:Z("style",["cssText"],t),title:ia(t),titleAttributes:Ae("titleAttributes",t),prioritizeSeoTags:pa(t,X.PRIORITIZE_SEO_TAGS)}),Rt=t=>Array.isArray(t)?t.join(""):t,fa=(t,r)=>{const a=Object.keys(t);for(let n=0;n<a.length;n+=1)if(r[a[n]]&&r[a[n]].includes(t[a[n]]))return!0;return!1},Ce=(t,r)=>Array.isArray(t)?t.reduce((a,n)=>(fa(n,r)?a.priority.push(n):a.default.push(n),a),{priority:[],default:[]}):{default:t,priority:[]},dt=(t,r)=>({...t,[r]:void 0}),ma=["noscript","script","style"],Oe=(t,r=!0)=>r===!1?String(t):String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),Lt=t=>Object.keys(t).reduce((r,a)=>{const n=typeof t[a]<"u"?`${a}="${t[a]}"`:`${a}`;return r?`${r} ${n}`:n},""),xa=(t,r,a,n)=>{const s=Lt(a),o=Rt(r);return s?`<${t} ${_}="true" ${s}>${Oe(o,n)}</${t}>`:`<${t} ${_}="true">${Oe(o,n)}</${t}>`},ha=(t,r,a=!0)=>r.reduce((n,s)=>{const o=s,i=Object.keys(o).filter(d=>!(d==="innerHTML"||d==="cssText")).reduce((d,p)=>{const m=typeof o[p]>"u"?p:`${p}="${Oe(o[p],a)}"`;return d?`${d} ${m}`:m},""),l=o.innerHTML||o.cssText||"",c=ma.indexOf(t)===-1;return`${n}<${t} ${_}="true" ${i}${c?"/>":`>${l}</${t}>`}`},""),Ot=(t,r={})=>Object.keys(t).reduce((a,n)=>{const s=Ke[n];return a[s||n]=t[n],a},r),ga=(t,r,a)=>{const n={key:r,[_]:!0},s=Ot(a,n);return[P.createElement("title",s,r)]},fe=(t,r)=>r.map((a,n)=>{const s={key:n,[_]:!0};return Object.keys(a).forEach(o=>{const l=Ke[o]||o;if(l==="innerHTML"||l==="cssText"){const c=a.innerHTML||a.cssText;s.dangerouslySetInnerHTML={__html:c}}else s[l]=a[o]}),P.createElement(t,s)}),C=(t,r,a=!0)=>{switch(t){case"title":return{toComponent:()=>ga(t,r.title,r.titleAttributes),toString:()=>xa(t,r.title,r.titleAttributes,a)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>Ot(r),toString:()=>Lt(r)};default:return{toComponent:()=>fe(t,r),toString:()=>ha(t,r,a)}}},ba=({metaTags:t,linkTags:r,scriptTags:a,encode:n})=>{const s=Ce(t,Ee.meta),o=Ce(r,Ee.link),i=Ce(a,Ee.script);return{priorityMethods:{toComponent:()=>[...fe("meta",s.priority),...fe("link",o.priority),...fe("script",i.priority)],toString:()=>`${C("meta",s.priority,n)} ${C("link",o.priority,n)} ${C("script",i.priority,n)}`},metaTags:s.default,linkTags:o.default,scriptTags:i.default}},va=t=>{const{baseTag:r,bodyAttributes:a,encode:n=!0,htmlAttributes:s,noscriptTags:o,styleTags:i,title:l="",titleAttributes:c,prioritizeSeoTags:d}=t;let{linkTags:p,metaTags:m,scriptTags:v}=t,g={toComponent:()=>{},toString:()=>""};return d&&({priorityMethods:g,linkTags:p,metaTags:m,scriptTags:v}=ba(t)),{priority:g,base:C("base",r,n),bodyAttributes:C("bodyAttributes",a,n),htmlAttributes:C("htmlAttributes",s,n),link:C("link",p,n),meta:C("meta",m,n),noscript:C("noscript",o,n),script:C("script",v,n),style:C("style",i,n),title:C("title",{title:l,titleAttributes:c},n)}},Ie=va,de=[],It=!!(typeof window<"u"&&window.document&&window.document.createElement),De=class{constructor(t,r){I(this,"instances",[]);I(this,"canUseDOM",It);I(this,"context");I(this,"value",{setHelmet:t=>{this.context.helmet=t},helmetInstances:{get:()=>this.canUseDOM?de:this.instances,add:t=>{(this.canUseDOM?de:this.instances).push(t)},remove:t=>{const r=(this.canUseDOM?de:this.instances).indexOf(t);(this.canUseDOM?de:this.instances).splice(r,1)}}});this.context=t,this.canUseDOM=r||!1,r||(t.helmet=Ie({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},ya={},Dt=P.createContext(ya),U,$t=(U=class extends u.Component{constructor(a){super(a);I(this,"helmetData");this.helmetData=new De(this.props.context||{},U.canUseDOM)}render(){return P.createElement(Dt.Provider,{value:this.helmetData.value},this.props.children)}},I(U,"canUseDOM",It),U),G=(t,r)=>{const a=document.head||document.querySelector("head"),n=a.querySelectorAll(`${t}[${_}]`),s=[].slice.call(n),o=[];let i;return r&&r.length&&r.forEach(l=>{const c=document.createElement(t);for(const d in l)if(Object.prototype.hasOwnProperty.call(l,d))if(d==="innerHTML")c.innerHTML=l.innerHTML;else if(d==="cssText")c.styleSheet?c.styleSheet.cssText=l.cssText:c.appendChild(document.createTextNode(l.cssText));else{const p=d,m=typeof l[p]>"u"?"":l[p];c.setAttribute(d,m)}c.setAttribute(_,"true"),s.some((d,p)=>(i=p,c.isEqualNode(d)))?s.splice(i,1):o.push(c)}),s.forEach(l=>{var c;return(c=l.parentNode)==null?void 0:c.removeChild(l)}),o.forEach(l=>a.appendChild(l)),{oldTags:s,newTags:o}},$e=(t,r)=>{const a=document.getElementsByTagName(t)[0];if(!a)return;const n=a.getAttribute(_),s=n?n.split(","):[],o=[...s],i=Object.keys(r);for(const l of i){const c=r[l]||"";a.getAttribute(l)!==c&&a.setAttribute(l,c),s.indexOf(l)===-1&&s.push(l);const d=o.indexOf(l);d!==-1&&o.splice(d,1)}for(let l=o.length-1;l>=0;l-=1)a.removeAttribute(o[l]);s.length===o.length?a.removeAttribute(_):a.getAttribute(_)!==i.join(",")&&a.setAttribute(_,i.join(","))},wa=(t,r)=>{typeof t<"u"&&document.title!==t&&(document.title=Rt(t)),$e("title",r)},pt=(t,r)=>{const{baseTag:a,bodyAttributes:n,htmlAttributes:s,linkTags:o,metaTags:i,noscriptTags:l,onChangeClientState:c,scriptTags:d,styleTags:p,title:m,titleAttributes:v}=t;$e("body",n),$e("html",s),wa(m,v);const g={baseTag:G("base",a),linkTags:G("link",o),metaTags:G("meta",i),noscriptTags:G("noscript",l),scriptTags:G("script",d),styleTags:G("style",p)},h={},y={};Object.keys(g).forEach(N=>{const{newTags:S,oldTags:D}=g[N];S.length&&(h[N]=S),D.length&&(y[N]=g[N].oldTags)}),r&&r(),c(t,h,y)},ee=null,ja=t=>{ee&&cancelAnimationFrame(ee),t.defer?ee=requestAnimationFrame(()=>{pt(t,()=>{ee=null})}):(pt(t),ee=null)},ka=ja,ut=class extends u.Component{constructor(){super(...arguments);I(this,"rendered",!1)}shouldComponentUpdate(r){return!sa(r,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:r}=this.props.context;r.remove(this),this.emitChange()}emitChange(){const{helmetInstances:r,setHelmet:a}=this.props.context;let n=null;const s=ua(r.get().map(o=>{const i={...o.props};return delete i.context,i}));$t.canUseDOM?ka(s):Ie&&(n=Ie(s)),a(n)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:r}=this.props.context;r.add(this),this.emitChange()}render(){return this.init(),null}},Re,_s=(Re=class extends u.Component{shouldComponentUpdate(t){return!ta(dt(this.props,"helmetData"),dt(t,"helmetData"))}mapNestedChildrenToProps(t,r){if(!r)return null;switch(t.type){case"script":case"noscript":return{innerHTML:r};case"style":return{cssText:r};default:throw new Error(`<${t.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(t,r,a,n){return{...r,[t.type]:[...r[t.type]||[],{...a,...this.mapNestedChildrenToProps(t,n)}]}}mapObjectTypeChildren(t,r,a,n){switch(t.type){case"title":return{...r,[t.type]:n,titleAttributes:{...a}};case"body":return{...r,bodyAttributes:{...a}};case"html":return{...r,htmlAttributes:{...a}};default:return{...r,[t.type]:{...a}}}}mapArrayTypeChildrenToProps(t,r){let a={...r};return Object.keys(t).forEach(n=>{a={...a,[n]:t[n]}}),a}warnOnInvalidChildren(t,r){return lt(ct.some(a=>t.type===a),typeof t.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${ct.join(", ")} are allowed. Helmet does not support rendering <${t.type}> elements. Refer to our API for more information.`),lt(!r||typeof r=="string"||Array.isArray(r)&&!r.some(a=>typeof a!="string"),`Helmet expects a string as a child of <${t.type}>. Did you forget to wrap your children in braces? ( <${t.type}>{\`\`}</${t.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(t,r){let a={};return P.Children.forEach(t,n=>{if(!n||!n.props)return;const{children:s,...o}=n.props,i=Object.keys(o).reduce((c,d)=>(c[oa[d]||d]=o[d],c),{});let{type:l}=n;switch(typeof l=="symbol"?l=l.toString():this.warnOnInvalidChildren(n,s),l){case"Symbol(react.fragment)":r=this.mapChildrenToProps(s,r);break;case"link":case"meta":case"noscript":case"script":case"style":a=this.flattenArrayTypeChildren(n,a,i,s);break;default:r=this.mapObjectTypeChildren(n,r,i,s);break}}),this.mapArrayTypeChildrenToProps(a,r)}render(){const{children:t,...r}=this.props;let a={...r},{helmetData:n}=r;if(t&&(a=this.mapChildrenToProps(t,a)),n&&!(n instanceof De)){const s=n;n=new De(s.context,!0),delete a.helmetData}return n?P.createElement(ut,{...a,context:n.value}):P.createElement(Dt.Consumer,null,s=>P.createElement(ut,{...a,context:s}))}},I(Re,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),Re);const Na={},ft=t=>{let r;const a=new Set,n=(p,m)=>{const v=typeof p=="function"?p(r):p;if(!Object.is(v,r)){const g=r;r=m??(typeof v!="object"||v===null)?v:Object.assign({},r,v),a.forEach(h=>h(r,g))}},s=()=>r,c={setState:n,getState:s,getInitialState:()=>d,subscribe:p=>(a.add(p),()=>a.delete(p)),destroy:()=>{(Na?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),a.clear()}},d=r=t(n,s,c);return c},Sa=t=>t?ft(t):ft;var Mt={exports:{}},Vt={},Ft={exports:{}},Ht={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var W=u;function Ta(t,r){return t===r&&(t!==0||1/t===1/r)||t!==t&&r!==r}var Ea=typeof Object.is=="function"?Object.is:Ta,Aa=W.useState,Ca=W.useEffect,_a=W.useLayoutEffect,za=W.useDebugValue;function Pa(t,r){var a=r(),n=Aa({inst:{value:a,getSnapshot:r}}),s=n[0].inst,o=n[1];return _a(function(){s.value=a,s.getSnapshot=r,_e(s)&&o({inst:s})},[t,a,r]),Ca(function(){return _e(s)&&o({inst:s}),t(function(){_e(s)&&o({inst:s})})},[t]),za(a),a}function _e(t){var r=t.getSnapshot;t=t.value;try{var a=r();return!Ea(t,a)}catch{return!0}}function Ra(t,r){return r()}var La=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?Ra:Pa;Ht.useSyncExternalStore=W.useSyncExternalStore!==void 0?W.useSyncExternalStore:La;Ft.exports=Ht;var Oa=Ft.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var we=u,Ia=Oa;function Da(t,r){return t===r&&(t!==0||1/t===1/r)||t!==t&&r!==r}var $a=typeof Object.is=="function"?Object.is:Da,Ma=Ia.useSyncExternalStore,Va=we.useRef,Fa=we.useEffect,Ha=we.useMemo,Ua=we.useDebugValue;Vt.useSyncExternalStoreWithSelector=function(t,r,a,n,s){var o=Va(null);if(o.current===null){var i={hasValue:!1,value:null};o.current=i}else i=o.current;o=Ha(function(){function c(g){if(!d){if(d=!0,p=g,g=n(g),s!==void 0&&i.hasValue){var h=i.value;if(s(h,g))return m=h}return m=g}if(h=m,$a(p,g))return h;var y=n(g);return s!==void 0&&s(h,y)?(p=g,h):(p=g,m=y)}var d=!1,p,m,v=a===void 0?null:a;return[function(){return c(r())},v===null?void 0:function(){return c(v())}]},[r,a,n,s]);var l=Ma(t,o[0],o[1]);return Fa(function(){i.hasValue=!0,i.value=l},[l]),Ua(l),l};Mt.exports=Vt;var Ba=Mt.exports;const Ya=ge(Ba),Ut={},{useDebugValue:qa}=P,{useSyncExternalStoreWithSelector:Ga}=Ya;let mt=!1;const Xa=t=>t;function Ka(t,r=Xa,a){(Ut?"production":void 0)!=="production"&&a&&!mt&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),mt=!0);const n=Ga(t.subscribe,t.getState,t.getServerState||t.getInitialState,r,a);return qa(n),n}const xt=t=>{(Ut?"production":void 0)!=="production"&&typeof t!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const r=typeof t=="function"?Sa(t):t,a=(n,s)=>Ka(r,n,s);return Object.assign(a,r),a},je=t=>t?xt(t):xt,ne=je((t,r)=>({user:null,profile:null,isAdmin:!1,authLoading:!0,profileLoading:!1,setUser:a=>t({user:a}),setProfile:a=>t({profile:a}),setIsAdmin:a=>t({isAdmin:a}),setAuthLoading:a=>t({authLoading:a}),setProfileLoading:a=>t({profileLoading:a}),clearAuth:()=>t({user:null,profile:null,isAdmin:!1,authLoading:!1,profileLoading:!1}),isLoggedIn:()=>!!r().user,isEmailVerified:()=>{var a;return((a=r().user)==null?void 0:a.emailVerified)===!0},getUID:()=>{var a;return((a=r().user)==null?void 0:a.uid)||null},getDisplayName:()=>{var a,n;return((a=r().profile)==null?void 0:a.display_name)||((n=r().user)==null?void 0:n.displayName)||"Anonymous"},getAvatar:()=>{var a,n;return((a=r().profile)==null?void 0:a.photo_url)||((n=r().user)==null?void 0:n.photoURL)||null}})),Wa={apiKey:"AIzaSyAh9PtrVo1UWApQw3oLT-Ol2Cu4iA5wawA",authDomain:"mdturzo.firebaseapp.com",databaseURL:"https://mdturzo-default-rtdb.firebaseio.com",projectId:"mdturzo",storageBucket:"mdturzo.firebasestorage.app",messagingSenderId:"13751895485",appId:"1:13751895485:web:be068cfd6f46f945d3fed4",measurementId:"G-SHM2013GKK"},We=lr().length===0?cr(Wa):dr(),Bt=pr(We),F=ur(We);let Qa=null;fr().then(t=>{t&&(Qa=mr(We))}).catch(()=>{});const Yt=new xr,Ja=new hr,L=new gr;Yt.addScope("profile");Yt.addScope("email");Ja.addScope("user:email");L.addScope("email");L.addScope("public_profile");L.addScope("user_age_range");L.addScope("user_birthday");L.addScope("user_friends");L.addScope("user_gender");L.addScope("user_hometown");L.addScope("user_likes");L.addScope("user_link");L.addScope("user_location");const Qe=()=>vr(Bt),Za=t=>br(Bt,t),en=t=>{const r=V(F,`presence/${t}`);At(r,{online:!0,lastSeen:me()}),wr(r).update({online:!1,lastSeen:me()})},tn=t=>{const r=V(F,`presence/${t}`);Tt(r,{online:!1,lastSeen:me()})},rn=async t=>{try{const r=await Et(V(F,`admins/${t}`));return r.exists()&&r.val()===!0}catch{return!1}},an=t=>t.trim().toLowerCase().replace(/\./g,","),nn=async t=>{const r=t.trim().toLowerCase(),a=an(r),n=V(F,`subscribers/${a}`),s=V(F,"subscriberCount");return(await Et(n)).exists()?{success:!1,duplicate:!0}:(await At(n,{email:r,subscribedAt:me(),active:!0}),await Tt(s,{count:yr(1)}),{success:!0,duplicate:!1})},sn=t=>{const r=V(F,"subscriberCount");return Fe(r,a=>{const n=a.val();t((n==null?void 0:n.count)??0)}),()=>He(r)},on=t=>{const r=V(F,"notifications");return Fe(r,a=>{const n=[];a.exists()&&a.forEach(s=>{n.push({id:s.key,...s.val()})}),t(n)}),()=>He(r)},ln=(t,r)=>{const a=V(F,`notificationReads/${t}`);return Fe(a,n=>{r(n.val()||{})}),()=>He(a)},cn="https://kddyucerqiwvjmuwebjv.supabase.co",dn="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkZHl1Y2VycWl3dmptdXdlYmp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNjAxODAsImV4cCI6MjA5MzczNjE4MH0.hKz4BGIzFyAmuDdEQJsRbTu42eARtNLty81JJY4c3y8",Y=jr(cn,dn,{auth:{persistSession:!1,autoRefreshToken:!1,detectSessionInUrl:!1},global:{headers:{"X-Client-Info":"mdturzo-portfolio/2.0.0"}},db:{schema:"public"},realtime:{params:{eventsPerSecond:10}}});async function zs(){const{data:t,error:r}=await Y.from("site_settings").select("key, value");if(r)throw r;return t.reduce((a,n)=>(a[n.key]=n.value,a),{})}async function Ps(){const{data:t,error:r}=await Y.from("page_visibility").select("page, visibility");if(r)throw r;return t.reduce((a,n)=>(a[n.page]=n.visibility,a),{})}async function Rs(){const{data:t,error:r}=await Y.from("projects").select("*").eq("status","published").eq("visibility","public").eq("is_featured",!0).order("featured_order",{ascending:!0}).limit(6);if(r)throw r;return t}async function Ls({limit:t,offset:r=0,category:a,tag:n,type:s}={}){let o=Y.from("feed").select("*").eq("status","published").eq("visibility","public").order("created_at",{ascending:!1});s&&(o=o.eq("type",s)),a&&(o=o.eq("category",a)),n&&(o=o.contains("tags",[n])),t&&(o=o.range(r,r+t-1));const{data:i,error:l}=await o;if(l)throw l;return i}async function pn(t){const{data:r,error:a}=await Y.from("users").select("*").eq("id",t).single();if(a&&a.code!=="PGRST116")throw a;return r}async function Os({limit:t=10,offset:r=0}={}){const{data:a,error:n}=await Y.from("reviews").select("*, users:user_id (display_name, avatar_url, username)").eq("status","approved").order("created_at",{ascending:!1}).range(r,r+t-1);if(n)throw n;return a}async function Is(t,r=null,a=null){const{error:n}=await Y.from("analytics").insert({page:t,event:"page_view",user_id:r,ip_address:a});n&&console.warn("[Analytics] Track failed:",n.message)}function un(){const{setUser:t,setProfile:r,setIsAdmin:a,setAuthLoading:n,setProfileLoading:s,clearAuth:o}=ne();u.useEffect(()=>{const i=Za(async l=>{if(l){t(l),s(!0);try{const c=await pn(l.uid);r(c||null);const d=await rn(l.uid);a(d),en(l.uid)}catch(c){console.warn("[useAuth] Profile/admin load failed:",c.message),r(null),a(!1)}finally{s(!1),n(!1)}}else o()});return()=>{const{user:l}=ne.getState();l&&tn(l.uid),i()}},[])}function fn(){return ne(t=>({user:t.user,profile:t.profile,isAdmin:t.isAdmin,authLoading:t.authLoading,profileLoading:t.profileLoading,isLoggedIn:t.isLoggedIn(),isEmailVerified:t.isEmailVerified(),uid:t.getUID(),displayName:t.getDisplayName(),avatar:t.getAvatar()}))}const Je=je((t,r)=>({notifications:[],reads:{},unreadCount:0,isOpen:!1,unsubscribe:null,setNotifications:a=>{const{reads:n}=r(),s=a.filter(o=>o.active&&!n[o.id]).length;t({notifications:a,unreadCount:s})},setReads:a=>{const{notifications:n}=r(),s=n.filter(o=>o.active&&!a[o.id]).length;t({reads:a,unreadCount:s})},markRead:a=>{t(n=>{const s={...n.reads,[a]:!0},o=n.notifications.filter(i=>i.active&&!s[i.id]).length;return{reads:s,unreadCount:o}})},markAllRead:()=>{const{notifications:a}=r(),n=a.reduce((s,o)=>(s[o.id]=!0,s),{});t({reads:n,unreadCount:0})},toggleOpen:()=>t(a=>({isOpen:!a.isOpen})),setOpen:a=>t({isOpen:a}),setUnsubscribe:a=>t({unsubscribe:a}),cleanup:()=>{const{unsubscribe:a}=r();a&&a(),t({notifications:[],reads:{},unreadCount:0,isOpen:!1,unsubscribe:null})}}));function mn(){const t=ne(o=>o.getUID()),{setNotifications:r,setReads:a,setUnsubscribe:n,cleanup:s}=Je();u.useEffect(()=>{const o=on(l=>{const c=Date.now(),d=l.filter(p=>p.active!==!1&&(!p.expires_at||new Date(p.expires_at).getTime()>c));r(d)});let i=()=>{};return t&&(i=ln(t,l=>a(l||{}))),n(()=>{o(),i()}),()=>{o(),i()}},[t])}function qt(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function xn(){return localStorage.getItem("theme")||"dark"}function Me(t){const r=t==="system"?qt():t;document.documentElement.setAttribute("data-theme",r),r==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}const Gt=je((t,r)=>{const a=xn();return Me(a),{theme:a,setTheme:n=>{localStorage.setItem("theme",n),Me(n),t({theme:n})},toggleTheme:()=>{const s=r().theme==="dark"?"light":"dark";r().setTheme(s)},isDark:()=>{const n=r().theme;return n==="dark"||n==="system"&&qt()==="dark"}}});typeof window<"u"&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{const{theme:t}=Gt.getState();t==="system"&&Me("system")});function Xt(){const{isAdmin:t,authLoading:r}=ne(a=>({isAdmin:a.isAdmin,authLoading:a.authLoading}));return{isAdmin:t,authLoading:r}}const w={version:"v2.2.2",siteName:"Muhtasim Rahman",navName:"Muhtasim",siteTagline:"Web Developer & Designer",siteURL:"https://mdturzo.web.app",workerURL:"https://portfolio.programs-turzo.workers.dev",owner:{fullName:"Md Muhtasim Rahman Mahmud",displayName:"Muhtasim Rahman",nickname:"Turzo",email:"mdturzo.dev@gmail.com",location:"Nilphamari, Bangladesh",fakeDOB:"2007-09-13",github:"https://github.com/muhtasim-rahman",oldPortfolio:"https://mdturzo.odoo.com",bio:"A dedicated web developer passionate about creating user-friendly and visually stunning websites. Focused on quality, innovation, and transforming complex ideas into simple, elegant solutions."},social:{facebook:"https://facebook.com/mdturzo999",instagram:"https://instagram.com/mdturzo999",youtube:"https://youtube.com/@mdturzo999",twitter:"https://twitter.com/mdturzo999",linkedin:"https://linkedin.com/in/mdturzo999",tiktok:"https://tiktok.com/@mdturzo16",telegram:"https://t.me/mdturzo16",github:"https://github.com/muhtasim-rahman",threads:"https://www.threads.net/mdturzo999"},seo:{defaultOGImage:"https://mdturzo.web.app/preview.webp",defaultDescription:"Self-taught web developer & designer from Bangladesh — building clean, fast and meaningful digital experiences.",defaultKeywords:"Muhtasim Rahman, Turzo, web developer, Bangladesh, portfolio, mdturzo",twitterHandle:"@mdturzo999"},defaults:{statsYearsDev:"3+",statsYearsDesign:"6+",statsProjects:"16+",availableForWork:!0,cvEnabled:!1,cvUrl:""}};function Ds(t=w.owner.fakeDOB){const r=new Date(t),a=new Date;let n=a.getFullYear()-r.getFullYear();const s=a.getMonth()-r.getMonth();return(s<0||s===0&&a.getDate()<r.getDate())&&n--,n}let hn=0;const gn={success:3e3,info:3e3,warning:3e3,error:3e3},R=je((t,r)=>({toasts:[],addToast:({type:a="info",title:n,message:s,duration:o})=>{const i=++hn,l=o??gn[a],c={id:i,type:a,title:n,message:s,duration:l};return t(d=>({toasts:[c,...d.toasts].slice(0,3)})),l&&setTimeout(()=>r().removeToast(i),l),i},removeToast:a=>{t(n=>({toasts:n.toasts.filter(s=>s.id!==a)}))},success:(a,n)=>R.getState().addToast({type:"success",title:a,message:n}),error:(a,n)=>R.getState().addToast({type:"error",title:a,message:n}),warning:(a,n)=>R.getState().addToast({type:"warning",title:a,message:n}),info:(a,n)=>R.getState().addToast({type:"info",title:a,message:n})})),se={success:(t,r)=>R.getState().success(t,r),error:(t,r)=>R.getState().error(t,r),warning:(t,r)=>R.getState().warning(t,r),info:(t,r)=>R.getState().info(t,r)};function ke(){const[t,r]=u.useState([]),a=u.useCallback(n=>{const o=n.currentTarget.getBoundingClientRect(),i=Math.max(o.width,o.height)*2,l=n.clientX-o.left-i/2,c=n.clientY-o.top-i/2,d=`${Date.now()}-${Math.random()}`;r(p=>[...p,{id:d,x:l,y:c,size:i}]),setTimeout(()=>r(p=>p.filter(m=>m.id!==d)),580)},[]);return{ripples:t,createRipple:a}}function Ne({ripples:t,color:r}){return e.jsx(e.Fragment,{children:t.map(({id:a,x:n,y:s,size:o})=>e.jsx("span",{"aria-hidden":!0,style:{position:"absolute",left:n,top:s,width:o,height:o,borderRadius:"50%",background:`radial-gradient(circle, ${r} 0%, ${r} 42%, transparent 72%)`,boxShadow:`0 0 ${Math.round(o/5)}px ${r}`,transform:"scale(0)",animation:"ripple-expand 0.62s cubic-bezier(0.16, 1, 0.3, 1) forwards",pointerEvents:"none"}},a))})}const bn=450,ht={active:{color:"#22c55e",label:"Active",pulse:!0},busy:{color:"#ef4444",label:"Busy",pulse:!1},away:{color:"#f59e0b",label:"Away",pulse:!1},offline:{color:"#6b7280",label:"Offline",pulse:!1}},vn="active",ze=[{label:"Home",path:"/",icon:Ue,title:"Go back to the main homepage"},{label:"About",path:"/about",icon:Be,title:"Learn about my journey and skills"},{label:"Projects",path:"/projects",icon:ve,title:"Browse projects I have built"},{label:"Feed",path:"/feed",icon:Ye,title:"Read my blogs and latest posts"},{label:"Contact",path:"/contact",icon:qe,title:"Send me a message or say hello"}],yn=[{label:"Pages",items:[{label:"Home",path:"/",icon:Ue},{label:"About",path:"/about",icon:Be},{label:"Projects",path:"/projects",icon:ve},{label:"Feed",path:"/feed",icon:Ye},{label:"Contact",path:"/contact",icon:qe}]},{label:"Account",items:[{label:"My Profile",path:"/profile",icon:ye},{label:"Admin Panel",path:"/admin",icon:B},{label:"Sign In",path:"/login",icon:ae},{label:"Sign Up",path:"/signup",icon:_t}]},{label:"Legal",items:[{label:"Privacy Policy",path:"/privacy-policy",icon:B},{label:"Cookies Policy",path:"/cookies-policy",icon:Ge},{label:"Terms of Use",path:"/terms",icon:Tr},{label:"Sitemap",path:"/sitemap.xml",icon:zt,external:!0}]}],gt=[{label:"Home",path:"/",icon:Ue,group:"Page",keywords:"main homepage intro"},{label:"About",path:"/about",icon:Be,group:"Page",keywords:"journey skills profile"},{label:"Projects",path:"/projects",icon:ve,group:"Page",keywords:"portfolio work case study"},{label:"Feed",path:"/feed",icon:Ye,group:"Page",keywords:"blogs posts updates"},{label:"Contact",path:"/contact",icon:qe,group:"Page",keywords:"message email collaborate"},{label:"My Profile",path:"/profile",icon:ye,group:"Account",keywords:"account user dashboard"},{label:"Sign In",path:"/login",icon:ae,group:"Account",keywords:"login auth"},{label:"Sign Up",path:"/signup",icon:_t,group:"Account",keywords:"register create account"},{label:"Privacy Policy",path:"/privacy-policy",icon:B,group:"Legal",keywords:"privacy data policy"},{label:"Cookies Policy",path:"/cookies-policy",icon:Ge,group:"Legal",keywords:"cookie browser storage"},{label:"Sitemap",path:"/sitemap.xml",icon:zt,group:"Utility",keywords:"links xml map",external:!0}];function Kt(t){const r=t.trim().toLowerCase();return r?gt.filter(a=>`${a.label} ${a.group} ${a.path} ${a.keywords}`.toLowerCase().includes(r)).slice(0,8):gt.slice(0,6)}const bt=[{icon:Cr,url:w.social.youtube,label:"@mdturzo999",cls:"text-red-500"},{icon:_r,url:w.social.facebook,label:"mdturzo999",cls:"text-blue-500"},{icon:zr,url:w.social.instagram,label:"@mdturzo999",cls:"text-pink-500"},{icon:Pr,url:w.social.github,label:"muhtasim-rahman",cls:"text-purple-400"},{icon:Rr,url:w.social.twitter,label:"@mdturzo999",cls:"text-sky-400"},{icon:Lr,url:w.social.linkedin,label:"mdturzo999",cls:"text-blue-400"},{icon:Or,url:w.social.telegram,label:"@mdturzo16",cls:"text-sky-400"},{icon:Ir,url:w.social.tiktok,label:"@mdturzo16",cls:"text-pink-400"}],wn={hidden:{y:-80,opacity:0},visible:{y:0,opacity:1,transition:{type:"spring",stiffness:320,damping:28}},exit:{y:-80,opacity:0,transition:{duration:.2,ease:"easeIn"}}},jn={hidden:{opacity:0,y:-10,scaleY:.96,transformOrigin:"top"},visible:{opacity:1,y:0,scaleY:1,transition:{duration:.22,ease:[.16,1,.3,1]}},exit:{opacity:0,y:-10,scaleY:.96,transition:{duration:.14}}},kn={closed:{x:"100%",transition:{type:"tween",duration:.28,ease:[.4,0,.2,1]}},open:{x:"0%",transition:{type:"tween",duration:.28,ease:[.4,0,.2,1]}}},Wt={hidden:{opacity:0,y:-6,scale:.96,transformOrigin:"top right"},visible:{opacity:1,y:0,scale:1,transition:{duration:.18}},exit:{opacity:0,y:-6,scale:.96,transition:{duration:.12}}};function Nn({mode:t=vn,size:r="md"}){const a=ht[t]||ht.active,n=r==="sm"?"w-2.5 h-2.5 border-[1.5px]":"w-3 h-3 border-2";return e.jsx("span",{className:`absolute -bottom-0.5 -right-0.5 ${n} rounded-full border-[var(--bg-page)] transition-colors`,style:{background:a.color},title:a.label,"aria-label":`Status: ${a.label}`})}function Pe({size:t="md",showName:r=!0,rounded:a=!1,onClick:n}){const[s,o]=u.useState("/logo.webp"),i=t==="sm"?"w-7 h-7 text-sm":"w-9 h-9 text-base",l=a?"rounded-full":"rounded-[10px]";return e.jsxs(A,{to:"/",onClick:n,className:"flex-shrink-0 flex items-center gap-2.5 select-none group h-9",children:[e.jsxs("div",{className:`relative ${i} ${l} flex items-center justify-center flex-shrink-0 overflow-visible`,children:[e.jsx("img",{src:s,alt:"Muhtasim logo",onError:()=>o("/android-chrome-192x192.png"),className:`${i} ${l} object-cover border border-[var(--border-color)] bg-[var(--bg-surface-2)]`}),e.jsx(Nn,{size:t})]}),r&&e.jsxs("div",{className:"flex flex-col leading-none",children:[e.jsx("span",{className:"font-mono font-bold text-[16px] text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-none",children:w.navName}),e.jsx("span",{className:"text-[10px] text-[var(--text-tertiary)] font-mono leading-none mt-[3px]",children:w.seo.twitterHandle})]})]})}function re({size:t="md",className:r=""}){const{toggleTheme:a,isDark:n}=Gt(),s=n(),o=t==="sm"?"w-8 h-8 text-sm":"w-9 h-9 text-base",{ripples:i,createRipple:l}=ke(),c=d=>{l(d),a()};return e.jsxs("button",{onClick:c,className:`${o} relative overflow-hidden flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors ${r}`,"aria-label":"Toggle theme","data-tooltip":s?"Light mode":"Dark mode","data-ripple-managed":"true",children:[e.jsx(Ne,{ripples:i,color:"rgba(59,130,246,0.2)"}),e.jsx(j.AnimatePresence,{mode:"wait",initial:!1,children:s?e.jsx(j.motion.span,{initial:{opacity:0,rotate:-90,scale:.5},animate:{opacity:1,rotate:0,scale:1},exit:{opacity:0,rotate:90,scale:.5},transition:{duration:.18},children:e.jsx(x,{icon:Nr})},"sun"):e.jsx(j.motion.span,{initial:{opacity:0,rotate:90,scale:.5},animate:{opacity:1,rotate:0,scale:1},exit:{opacity:0,rotate:-90,scale:.5},transition:{duration:.18},children:e.jsx(x,{icon:Sr})},"moon")})]})}function M({icon:t,onClick:r,label:a,badge:n,active:s,className:o="",tooltipSide:i}){const{ripples:l,createRipple:c}=ke(),d=p=>{c(p),r==null||r(p)};return e.jsxs("button",{onClick:d,className:`relative overflow-hidden w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors ${s?"bg-[var(--accent-light)] text-[var(--accent-primary)] border-[var(--accent-primary)]":"bg-[var(--bg-surface-2)]"} ${o}`,"aria-label":a,"data-tooltip":a,"data-tooltip-side":i,"data-ripple-managed":"true",children:[e.jsx(Ne,{ripples:l,color:"rgba(59,130,246,0.2)"}),e.jsx(x,{icon:t}),n>0&&e.jsx("span",{className:"absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[var(--clr-error)] text-white text-[9px] font-bold leading-none",children:n>9?"9+":n})]})}function Ve({className:t=""}){const{ripples:r,createRipple:a}=ke();return e.jsxs(A,{to:"/login",onClick:a,title:"Sign in to your account","data-ripple-managed":"true",className:`relative overflow-hidden h-9 flex items-center gap-1.5 px-4 py-0 rounded-full bg-[var(--accent-primary)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors ${t}`,children:[e.jsx(Ne,{ripples:r,color:"rgba(255,255,255,0.3)"}),e.jsx(x,{icon:ae,className:"text-xs"}),"Sign In"]})}function Sn({onClose:t}){const{notifications:r,reads:a,markRead:n,markAllRead:s,unreadCount:o}=Je(),i=Date.now(),l=r.filter(c=>c.active&&(!c.expires_at||new Date(c.expires_at).getTime()>i));return e.jsxs(j.motion.div,{variants:Wt,initial:"hidden",animate:"visible",exit:"exit",className:"notif-panel absolute right-0 top-full mt-2 w-80 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-xl)] overflow-hidden z-[9999]",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)]",children:[e.jsxs("span",{className:"font-semibold text-sm text-[var(--text-primary)]",children:["Notifications",o>0&&e.jsx("span",{className:"ml-1.5 px-1.5 py-0.5 rounded-full bg-[var(--clr-error)] text-white text-[9px] font-bold",children:o})]}),o>0&&e.jsx("button",{onClick:s,className:"text-xs text-[var(--accent-primary)] hover:underline",children:"Mark all read"})]}),e.jsx("div",{className:"max-h-64 overflow-y-auto",children:l.length===0?e.jsxs("div",{className:"py-8 text-center text-[var(--text-tertiary)] text-sm",children:[e.jsx(x,{icon:Xe,className:"text-2xl mb-2 opacity-30"}),e.jsx("p",{children:"No notifications"})]}):l.map(c=>e.jsxs("button",{onClick:()=>{n(c.id),c.link&&(window.location.href=c.link),t()},className:`w-full text-left px-4 py-3 flex gap-3 hover:bg-[var(--bg-surface-2)] transition-colors border-b border-[var(--border-color)] last:border-0 ${a[c.id]?"":"bg-[var(--accent-light)]"}`,children:[e.jsx("span",{className:"w-2 h-2 rounded-full flex-shrink-0 mt-1.5",style:{background:a[c.id]?"transparent":"var(--accent-primary)"}}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"text-sm font-medium text-[var(--text-primary)] truncate",children:c.title}),e.jsx("p",{className:"text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2",children:c.message})]})]},c.id))})]})}function Tn({user:t,profile:r,isAdmin:a,avatar:n,displayName:s,onClose:o}){var c;const i=be(),l=async()=>{try{await Qe(),o(),i("/")}catch(d){se.error("Logout failed",d.message)}};return e.jsxs(j.motion.div,{variants:Wt,initial:"hidden",animate:"visible",exit:"exit",className:"user-panel absolute right-0 top-full mt-2 w-52 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-xl)] overflow-hidden z-[9999]",children:[e.jsxs("div",{className:"px-4 py-3 border-b border-[var(--border-color)] flex items-center gap-2.5",children:[e.jsx("div",{className:"w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-[var(--border-color)]",children:n?e.jsx("img",{src:n,alt:s,className:"w-full h-full object-cover"}):e.jsx("div",{className:"w-full h-full bg-[var(--accent-light)] flex items-center justify-center",children:e.jsx("span",{className:"text-[var(--accent-primary)] text-xs font-bold",children:(c=s==null?void 0:s[0])==null?void 0:c.toUpperCase()})})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("p",{className:"text-sm font-semibold text-[var(--text-primary)] truncate",children:s}),e.jsx("p",{className:"text-xs text-[var(--text-tertiary)] truncate",children:r!=null&&r.username?`@${r.username}`:t==null?void 0:t.email})]})]}),e.jsxs("div",{className:"py-1",children:[e.jsxs(A,{to:"/profile",onClick:o,className:"flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors",children:[e.jsx(x,{icon:ye,className:"w-4 text-center opacity-60"})," My Profile"]}),a&&e.jsxs(A,{to:"/admin",onClick:o,className:"flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--accent-primary)] hover:bg-[var(--accent-light)] transition-colors",children:[e.jsx(x,{icon:B,className:"w-4 text-center"})," Admin Panel"]}),e.jsxs("button",{onClick:l,className:"w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--clr-error)] hover:bg-red-500/10 transition-colors",children:[e.jsx(x,{icon:Ct,className:"w-4 text-center"})," Sign Out"]})]})]})}function En({compact:t=!1}){const r=u.useRef(null),a=u.useRef(!1),n=u.useRef({active:!1,startX:0,offset:0,currentOffset:0}),s=[...bt,...bt],o=()=>{r.current&&(r.current.style.animationPlayState="paused"),a.current=!0},i=()=>{r.current&&(r.current.style.animationPlayState="running"),a.current=!1},l=h=>{n.current={...n.current,active:!0,startX:h.pageX,offset:n.current.currentOffset},o(),h.preventDefault()},c=h=>{if(!n.current.active)return;const y=h.pageX-n.current.startX;n.current.currentOffset=n.current.offset+y,r.current&&(r.current.style.transform=`translateX(${n.current.currentOffset}px)`)},d=()=>{n.current.active&&(n.current.active=!1,i())},p=h=>{h.preventDefault(),o(),n.current.currentOffset=(n.current.currentOffset||0)-h.deltaY*.6,r.current&&(r.current.style.transform=`translateX(${n.current.currentOffset}px)`),clearTimeout(n.current.wheelTimer),n.current.wheelTimer=setTimeout(i,700)},m=h=>{n.current={...n.current,active:!0,startX:h.touches[0].pageX,offset:n.current.currentOffset},o()},v=h=>{if(!n.current.active)return;const y=h.touches[0].pageX-n.current.startX;n.current.currentOffset=n.current.offset+y,r.current&&(r.current.style.transform=`translateX(${n.current.currentOffset}px)`)},g=()=>{n.current.active=!1,i()};return u.useEffect(()=>(window.addEventListener("mousemove",c),window.addEventListener("mouseup",d),()=>{window.removeEventListener("mousemove",c),window.removeEventListener("mouseup",d)}),[]),e.jsx("div",{onMouseEnter:o,onMouseLeave:i,onWheel:p,style:{position:"relative",overflow:"hidden",height:t?28:34,borderRadius:8,maskImage:"linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%)",WebkitMaskImage:"linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%)"},children:e.jsx("div",{ref:r,onMouseDown:l,onTouchStart:m,onTouchMove:v,onTouchEnd:g,style:{display:"inline-flex",gap:t?10:16,alignItems:"center",height:"100%",whiteSpace:"nowrap",animation:"marquee-scroll 22s linear infinite",cursor:"grab",willChange:"transform",touchAction:"pan-x"},children:s.map((h,y)=>e.jsxs("a",{href:h.url,target:"_blank",rel:"noopener noreferrer",onClick:N=>{n.current.currentOffset!==n.current.offset&&N.preventDefault()},className:`inline-flex items-center gap-1.5 ${t?"px-1.5 py-0.5":"px-2 py-1"} rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors no-underline flex-shrink-0`,children:[e.jsx(x,{icon:h.icon,className:h.cls,style:{fontSize:t?12:13}}),e.jsx("span",{className:t?"text-[11px]":"",children:h.label})]},y))})})}function vt({onClose:t,isLoggedIn:r,floating:a=!1}){const n=oe(),s=typeof window<"u"?window.location.href:w.siteURL,o=`Explore ${w.owner.displayName}'s portfolio`,i=async()=>{try{await navigator.clipboard.writeText(s),se.success("Copied","Current page URL copied.")}catch{se.error("Copy failed","Could not copy this URL.")}},l=async()=>{try{if(navigator.share){await navigator.share({title:w.siteName,text:o,url:s});return}i()}catch(d){(d==null?void 0:d.name)!=="AbortError"&&i()}},c=d=>`relative overflow-hidden flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors group ${(d==="/"?n.pathname==="/":n.pathname.startsWith(d))?"is-mega-active bg-[var(--accent-light)] text-[var(--accent-primary)]":"hover:bg-[var(--bg-surface-2)]"}`;return e.jsx(j.AnimatePresence,{children:e.jsx(j.motion.div,{variants:jn,initial:"hidden",animate:"visible",exit:"exit",className:"mega-panel absolute left-0 right-0 top-full z-[9998]",children:e.jsx("div",{className:"max-w-[1120px] mx-auto px-4 pt-2",children:e.jsxs("div",{className:`rounded-2xl overflow-hidden ${a?"mega-floating":""}`,style:{background:"var(--bg-surface)",border:"1px solid var(--border-color)",boxShadow:"var(--shadow-xl)"},children:[e.jsx("div",{className:"h-[1.5px] w-full",style:{background:"linear-gradient(90deg,transparent,rgba(99,102,241,0.5) 35%,rgba(59,130,246,0.5) 65%,transparent)"}}),e.jsx("div",{className:"grid grid-cols-3 divide-x divide-[var(--border-color)] p-2",children:yn.map(d=>e.jsxs("div",{className:"px-3 py-3",children:[e.jsx("p",{className:"text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)] mb-2 px-2",children:d.label}),e.jsx("div",{className:"space-y-0.5",children:d.items.map(p=>p.external?e.jsxs("a",{href:p.path,target:"_blank",rel:"noopener noreferrer",onClick:t,className:c(p.path),children:[e.jsx(x,{icon:p.icon,className:"w-3.5 text-center text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors flex-shrink-0 text-xs"}),e.jsx("span",{className:"text-[13px] font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight",children:p.label})]},p.path):e.jsxs(A,{to:p.path,onClick:t,className:c(p.path),children:[e.jsx(x,{icon:p.icon,className:"w-3.5 text-center text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors flex-shrink-0 text-xs"}),e.jsx("span",{className:"text-[13px] font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight",children:p.label})]},p.path))})]},d.label))}),e.jsxs("div",{className:"mega-footer px-3 py-2 border-t border-[var(--border-color)] flex items-center gap-2",children:[e.jsxs("button",{type:"button",onClick:l,className:"mega-share-action","aria-label":"Share this page","data-tooltip":"Share this page",children:[e.jsx(x,{icon:Er,className:"text-[11px]"}),e.jsx("span",{children:"Share"})]}),e.jsxs("div",{className:"mega-url-field",title:s,children:[e.jsx("span",{children:s}),e.jsx("button",{type:"button",onClick:i,className:"mega-url-copy","aria-label":"Copy URL","data-tooltip":"Copy URL",children:e.jsx(x,{icon:Ar})})]}),e.jsxs("span",{className:"mega-version-pill",children:["Web ",e.jsx("strong",{children:w.version})]})]})]})})})})}function yt({user:t,profile:r,isAdmin:a,avatar:n,displayName:s,isLoggedIn:o,authLoading:i,unreadCount:l,openSearch:c,notifOpen:d,setNotifOpen:p,userOpen:m,setUserOpen:v,megaOpen:g,setMegaOpen:h,onMenuOpen:y,onMobileSearch:N}){var O;const{ripples:S,createRipple:D}=ke();return e.jsxs("div",{className:"flex items-center gap-1.5 flex-shrink-0","data-nav-right":!0,children:[e.jsx(M,{icon:z,onClick:c,label:"Search  Ctrl+K",className:"hidden lg:flex",tooltipSide:"right"}),e.jsx(M,{icon:z,onClick:N,label:"Search",className:"lg:hidden"}),e.jsxs("div",{className:"notif-anchor relative",children:[e.jsx(M,{icon:Xe,onClick:()=>{p(!d),v(!1),h(!1)},label:"Notifications",badge:l,active:d,tooltipSide:"right"}),e.jsx(j.AnimatePresence,{children:d&&e.jsx(Sn,{onClose:()=>p(!1)})})]}),e.jsx(re,{}),i?e.jsx("div",{className:"w-9 h-9 rounded-full sk"}):o?e.jsxs("div",{className:"user-anchor relative",children:[e.jsx("button",{onClick:()=>{v(!m),p(!1),h(!1)},className:`w-9 h-9 rounded-full overflow-hidden border-2 transition-colors ${m?"border-[var(--accent-primary)]":"border-[var(--border-color)] hover:border-[var(--border-strong)]"}`,children:n?e.jsx("img",{src:n,alt:s,className:"w-full h-full object-cover"}):e.jsx("div",{className:"w-full h-full bg-[var(--accent-light)] flex items-center justify-center",children:e.jsx("span",{className:"text-[var(--accent-primary)] text-sm font-bold",children:(O=s==null?void 0:s[0])==null?void 0:O.toUpperCase()})})}),e.jsx(j.AnimatePresence,{children:m&&e.jsx(Tn,{user:t,profile:r,isAdmin:a,avatar:n,displayName:s,onClose:()=>v(!1)})})]}):e.jsx(Ve,{}),e.jsx("div",{className:"mega-anchor",children:e.jsx(M,{icon:kr,onClick:()=>{h(!g),p(!1),v(!1)},label:"All pages",active:g,tooltipSide:"right"})}),e.jsxs("button",{onClick:q=>{D(q),y()},className:"lg:hidden relative overflow-hidden w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors","aria-label":"Menu","data-tooltip":"Menu","data-ripple-managed":"true",children:[e.jsx(Ne,{ripples:S,color:"rgba(59,130,246,0.2)"}),e.jsx(x,{icon:te})]})]})}function An({open:t,query:r,setQuery:a,onClose:n,inputRef:s}){if(!t)return null;const o=Kt(r),i=r.trim().length>0,l=o.reduce((c,d)=>(c[d.group]||(c[d.group]=[]),c[d.group].push(d),c),{});return e.jsxs(j.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 z-[410] hidden lg:flex items-start justify-center pt-[14vh] px-6",onMouseDown:n,children:[e.jsx("div",{className:"absolute inset-0 bg-black/40 backdrop-blur-[6px]"}),e.jsxs(j.motion.div,{initial:{opacity:0,y:-16,scale:.97},animate:{opacity:1,y:0,scale:1,transition:{duration:.2,ease:[.16,1,.3,1]}},exit:{opacity:0,y:-12,scale:.97,transition:{duration:.14}},className:"search-popup relative w-[min(620px,calc(100vw-48px))] rounded-[20px] overflow-hidden",onMouseDown:c=>c.stopPropagation(),children:[e.jsxs("div",{className:"search-popup-header flex items-center gap-3 px-5 py-4",children:[e.jsx(x,{icon:z,className:"text-[var(--accent-primary)] text-sm flex-shrink-0"}),e.jsx("input",{ref:s,value:r,onChange:c=>a(c.target.value),onKeyDown:c=>{c.key==="Escape"&&n()},placeholder:"Search pages, account, legal...",className:"flex-1 bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] font-medium"}),e.jsxs("div",{className:"flex items-center gap-2",children:[r&&e.jsx("button",{onClick:()=>a(""),className:"w-6 h-6 rounded-full flex items-center justify-center bg-[var(--bg-surface-2)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors",children:e.jsx(x,{icon:xe,className:"text-[10px]"})}),e.jsx("kbd",{className:"search-popup-esc",onClick:n,children:"Esc"})]})]}),e.jsx("div",{className:"search-popup-divider"}),e.jsx("div",{className:"search-popup-body p-3 max-h-[58vh] overflow-y-auto",children:o.length===0?e.jsxs("div",{className:"search-popup-empty",children:[e.jsx("div",{className:"search-popup-empty-icon",children:e.jsx(x,{icon:z})}),e.jsxs("p",{children:["No results for “",e.jsx("span",{children:r}),"”"]}),e.jsx("small",{children:"Try a page name like Projects, Feed, Contact…"})]}):e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"search-popup-label",children:i?"Results":"Quick open"}),Object.entries(l).map(([c,d])=>e.jsxs("div",{className:"mb-3 last:mb-0",children:[e.jsx("p",{className:"search-popup-group-label",children:c}),e.jsx("div",{className:"space-y-0.5",children:d.map(p=>p.external?e.jsxs("a",{href:p.path,target:"_blank",rel:"noopener noreferrer",onClick:n,className:"search-popup-item",children:[e.jsx("span",{className:"search-popup-item-icon",children:e.jsx(x,{icon:p.icon})}),e.jsx("span",{className:"search-popup-item-label",children:p.label}),e.jsx("span",{className:"search-popup-item-badge",children:p.group}),e.jsx(x,{icon:he,className:"search-popup-item-arrow"})]},p.path):e.jsxs(A,{to:p.path,onClick:n,className:"search-popup-item",children:[e.jsx("span",{className:"search-popup-item-icon",children:e.jsx(x,{icon:p.icon})}),e.jsx("span",{className:"search-popup-item-label",children:p.label}),e.jsx("span",{className:"search-popup-item-badge",children:p.group}),e.jsx(x,{icon:he,className:"search-popup-item-arrow"})]},p.path))})]},c))]})}),e.jsxs("div",{className:"search-popup-footer",children:[e.jsx("span",{children:"Navigate"}),e.jsx("kbd",{children:"↑ ↓"}),e.jsx("span",{className:"ml-2",children:"Select"}),e.jsx("kbd",{children:"↵"}),e.jsx("span",{className:"ml-2",children:"Close"}),e.jsx("kbd",{children:"Esc"}),e.jsx("span",{className:"ml-auto opacity-60 text-[10px]",children:"Ctrl + K"})]})]})]})}function Cn(){var nt;const t=oe(),r=be(),{user:a,profile:n,isLoggedIn:s,avatar:o,displayName:i,authLoading:l}=fn(),{unreadCount:c,isOpen:d,setOpen:p}=Je(),{isAdmin:m}=Xt(),[v,g]=u.useState(!1),[h,y]=u.useState(!1),[N,S]=u.useState(!1),[D,O]=u.useState(!1),[q,ie]=u.useState(""),[Se,Te]=u.useState(!1),[Zt,Ze]=u.useState(""),le=u.useRef(null),et=u.useRef(null);u.useEffect(()=>{const f=()=>g(window.scrollY>bn);return window.addEventListener("scroll",f,{passive:!0}),()=>window.removeEventListener("scroll",f)},[]),u.useEffect(()=>{y(!1),S(!1),O(!1),p(!1),ie(""),Te(!1)},[t.pathname]),u.useEffect(()=>(document.body.style.overflow=h?"hidden":"",()=>{document.body.style.overflow=""}),[h]),u.useEffect(()=>{const f=k=>{(k.ctrlKey||k.metaKey)&&k.key==="k"&&(k.preventDefault(),tt())};return window.addEventListener("keydown",f),()=>window.removeEventListener("keydown",f)},[]),u.useEffect(()=>{Se&&setTimeout(()=>{var f;return(f=et.current)==null?void 0:f.focus()},80)},[Se]),u.useEffect(()=>{const f=k=>{!k.target.closest(".mega-anchor")&&!k.target.closest(".mega-panel")&&S(!1),!k.target.closest(".notif-anchor")&&!k.target.closest(".notif-panel")&&p(!1),!k.target.closest(".user-anchor")&&!k.target.closest(".user-panel")&&O(!1)};return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[]);const Q=()=>{y(!0),setTimeout(()=>{var f,k;(f=le.current)==null||f.focus(),(k=le.current)==null||k.select()},320)},tt=()=>{Te(!0),S(!1),p(!1),O(!1)},rt={user:a,profile:n,isAdmin:m,avatar:o,displayName:i,isLoggedIn:s,authLoading:l,unreadCount:c,openSearch:tt,notifOpen:d,setNotifOpen:p,userOpen:D,setUserOpen:O,megaOpen:N,setMegaOpen:S,onMenuOpen:()=>y(!0),onMobileSearch:Q},er=f=>k=>`relative overflow-hidden flex items-center gap-1.5 h-9 px-3.5 rounded-full text-sm font-medium leading-none transition-colors ${(f==="/"?t.pathname==="/":k)?"bg-[var(--accent-light)] text-[var(--accent-primary)]":"text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]"}`,at=q.trim().length>0,J=Kt(q).filter(f=>!f.external);return e.jsxs(e.Fragment,{children:[e.jsxs("nav",{className:"relative z-10 w-full border-b border-[var(--navbar-border)] bg-[var(--navbar-bg)] backdrop-blur-md",style:{height:"var(--navbar-h)"},children:[e.jsxs("div",{className:"navbar-inner flex items-center h-full max-w-[1120px] mx-auto gap-5",children:[e.jsx(Pe,{}),e.jsx("div",{className:"hidden lg:flex flex-1 items-center justify-center gap-0.5",children:ze.map(f=>e.jsxs(ce,{to:f.path,end:f.path==="/",className:({isActive:k})=>er(f.path)(k),title:f.title,"data-click-fx":"true",children:[e.jsx(x,{icon:f.icon,className:"text-xs opacity-80"}),f.label]},f.path))}),e.jsx("div",{className:"hidden lg:flex ml-auto",children:e.jsx(yt,{...rt})}),e.jsxs("div",{className:"hidden md:flex lg:hidden items-center gap-1.5 ml-auto",children:[!l&&!s&&e.jsx(Ve,{className:"h-8 text-xs px-3 py-0"}),e.jsx(re,{size:"sm"}),e.jsx(M,{icon:z,onClick:Q,label:"Search",className:"w-8 h-8 text-sm"}),e.jsx("button",{onClick:()=>y(!0),className:"w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]","aria-label":"Menu","data-tooltip":"Menu",children:e.jsx(x,{icon:te})})]}),e.jsxs("div",{className:"flex md:hidden items-center gap-1.5 ml-auto",children:[!l&&!s&&e.jsx(A,{to:"/login",className:"w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white flex-shrink-0 hover:bg-[var(--accent-hover)] transition-colors","aria-label":"Sign in","data-tooltip":"Sign In",children:e.jsx(x,{icon:ae,className:"text-xs"})}),e.jsx(re,{size:"sm"}),e.jsx(M,{icon:z,onClick:Q,label:"Search",className:"w-8 h-8 text-sm"}),e.jsx("button",{onClick:()=>y(!0),className:"w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]","aria-label":"Menu","data-tooltip":"Menu",children:e.jsx(x,{icon:te})})]})]}),N&&e.jsx("div",{className:"relative",children:e.jsx(vt,{onClose:()=>S(!1),isLoggedIn:s})})]}),e.jsx(j.AnimatePresence,{children:v&&e.jsx(j.motion.div,{variants:wn,initial:"hidden",animate:"visible",exit:"exit",className:"fixed top-0 left-0 right-0 z-[var(--z-sticky)] flex justify-center px-4 pt-3 pointer-events-none",children:e.jsxs("nav",{className:"float-nav relative pointer-events-auto flex items-center gap-4 w-full max-w-[1120px] h-[52px] px-4 rounded-full",children:[e.jsx(Pe,{size:"sm",rounded:!0}),e.jsx("div",{className:"hidden lg:flex flex-1 items-center justify-center gap-0.5",children:ze.map(f=>e.jsxs(ce,{to:f.path,end:f.path==="/",className:({isActive:k})=>`relative overflow-hidden flex items-center gap-1.5 h-9 px-3.5 rounded-full text-sm font-medium leading-none transition-all float-nav-link ${(f.path==="/"?t.pathname==="/":k)?"float-nav-link-active":""}`,title:f.title,children:[e.jsx(x,{icon:f.icon,className:"text-xs opacity-80"}),e.jsx("span",{className:"text-[13.5px]",children:f.label})]},f.path))}),e.jsx("div",{className:"hidden lg:flex ml-auto float-nav-right",children:e.jsx(yt,{...rt})}),e.jsxs("div",{className:"hidden md:flex lg:hidden items-center gap-1.5 ml-auto float-nav-right",children:[!l&&!s&&e.jsx(Ve,{className:"h-8 text-xs px-3 py-0"}),e.jsx(re,{size:"sm"}),e.jsx(M,{icon:z,onClick:Q,label:"Search",className:"w-8 h-8 text-sm"}),e.jsx("button",{onClick:()=>y(!0),className:"w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]",children:e.jsx(x,{icon:te,className:"text-sm"})})]}),e.jsxs("div",{className:"flex md:hidden items-center gap-1.5 ml-auto float-nav-right",children:[!l&&!s&&e.jsx(A,{to:"/login",className:"w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white flex-shrink-0 hover:bg-[var(--accent-hover)] transition-colors","aria-label":"Sign in",children:e.jsx(x,{icon:ae,className:"text-xs"})}),e.jsx(re,{size:"sm"}),e.jsx(M,{icon:z,onClick:Q,label:"Search",className:"w-8 h-8 text-sm"}),e.jsx("button",{onClick:()=>y(!0),className:"w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]",children:e.jsx(x,{icon:te,className:"text-sm"})})]}),N&&e.jsx("div",{className:"absolute inset-x-0 top-full",children:e.jsx(vt,{onClose:()=>S(!1),isLoggedIn:s,floating:!0})})]})})}),e.jsx(j.AnimatePresence,{children:h&&e.jsxs(e.Fragment,{children:[e.jsx(j.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>y(!1),className:"fixed inset-0 bg-black/60 backdrop-blur-sm z-[390] lg:hidden"},"backdrop"),e.jsxs(j.motion.aside,{variants:kn,initial:"closed",animate:"open",exit:"closed",className:"fixed top-0 right-0 bottom-0 w-[min(340px,88vw)] bg-[var(--bg-surface)] border-l border-[var(--border-color)] z-[395] flex flex-col lg:hidden overflow-hidden",children:[e.jsxs("div",{className:"flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)] flex-shrink-0",children:[e.jsx(Pe,{size:"sm",onClick:()=>y(!1)}),e.jsx("button",{onClick:()=>y(!1),className:"w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors",children:e.jsx(x,{icon:xe})})]}),s&&!at&&e.jsxs(A,{to:"/profile",onClick:()=>y(!1),className:"flex items-center gap-3 mx-4 mt-3 p-3 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors",children:[e.jsx("div",{className:"w-10 h-10 rounded-full overflow-hidden flex-shrink-0",children:o?e.jsx("img",{src:o,alt:"",className:"w-full h-full object-cover"}):e.jsx("div",{className:"w-full h-full bg-[var(--accent-light)] flex items-center justify-center",children:e.jsx("span",{className:"text-[var(--accent-primary)] font-bold",children:(nt=i==null?void 0:i[0])==null?void 0:nt.toUpperCase()})})}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"text-sm font-semibold text-[var(--text-primary)] truncate",children:i}),e.jsx("p",{className:"text-xs text-[var(--text-tertiary)]",children:n!=null&&n.username?`@${n.username}`:""})]}),e.jsx(x,{icon:he,className:"text-[var(--text-tertiary)] text-xs"})]}),e.jsx("div",{className:"px-4 mt-3 flex-shrink-0",children:e.jsxs("div",{className:"sidebar-search-field flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)] transition-all",children:[e.jsx(x,{icon:z,className:"text-[var(--text-tertiary)] text-xs flex-shrink-0"}),e.jsx("input",{ref:le,type:"text",placeholder:"Search pages...",value:q,onChange:f=>ie(f.target.value),onKeyDown:f=>{var k;f.key==="Escape"&&(ie(""),(k=le.current)==null||k.blur())},className:"flex-1 bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] min-w-0"}),q&&e.jsx("button",{onClick:()=>ie(""),className:"text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0",children:e.jsx(x,{icon:xe,className:"text-xs"})})]})}),e.jsx("div",{className:"flex-1 overflow-y-auto py-3 sidebar-scroll",children:at?e.jsxs("div",{className:"px-3 pt-2",children:[e.jsx("p",{className:"text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--text-tertiary)] px-1 mb-2",children:J.length>0?`${J.length} result${J.length>1?"s":""}`:"No results"}),J.length>0?e.jsx("div",{className:"space-y-0.5",children:J.map(f=>e.jsxs(ce,{to:f.path,onClick:()=>y(!1),className:({isActive:k})=>`search-popup-item ${k?"is-sidebar-active":""}`,children:[e.jsx("span",{className:"search-popup-item-icon",children:e.jsx(x,{icon:f.icon})}),e.jsx("span",{className:"search-popup-item-label",children:f.label}),e.jsx("span",{className:"search-popup-item-badge",children:f.group}),e.jsx(x,{icon:he,className:"search-popup-item-arrow"})]},f.path))}):e.jsxs("div",{className:"flex flex-col items-center gap-2 py-8 text-center",children:[e.jsx("div",{className:"w-10 h-10 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)]",children:e.jsx(x,{icon:z})}),e.jsx("p",{className:"text-sm font-semibold text-[var(--text-primary)]",children:"No results"}),e.jsx("span",{className:"text-xs text-[var(--text-tertiary)]",children:"Try Projects, Feed, Contact…"})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"px-5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-tertiary)]",children:"Navigation"}),ze.map(f=>e.jsxs(ce,{to:f.path,end:f.path==="/",onClick:()=>y(!1),className:({isActive:k})=>`flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${(f.path==="/"?t.pathname==="/":k)?"bg-[var(--accent-light)] text-[var(--accent-primary)]":"text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)]"}`,children:[e.jsx(x,{icon:f.icon,className:"w-4 text-center text-xs"}),f.label]},f.path)),e.jsx("div",{className:"my-3 mx-4 h-px bg-[var(--border-color)]"}),e.jsx("p",{className:"px-5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-tertiary)]",children:"More"}),[{label:"My Profile",path:"/profile",icon:ye},{label:"Privacy Policy",path:"/privacy-policy",icon:B},{label:"Cookies Policy",path:"/cookies-policy",icon:Ge}].map(f=>e.jsxs(A,{to:f.path,onClick:()=>y(!1),className:"flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)] transition-colors",children:[e.jsx(x,{icon:f.icon,className:"w-4 text-center text-xs"}),f.label]},f.path)),m&&e.jsxs(A,{to:"/admin",onClick:()=>y(!1),className:"flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm text-[var(--accent-primary)] hover:bg-[var(--accent-light)] transition-colors",children:[e.jsx(x,{icon:B,className:"w-4 text-center text-xs"})," Admin Panel"]})]})}),e.jsxs("div",{className:"flex-shrink-0 border-t border-[var(--border-color)] p-4 space-y-2.5",children:[s?e.jsxs("button",{onClick:async()=>{await Qe(),y(!1),r("/")},className:"w-full py-2 rounded-full border border-red-500/30 text-center text-sm text-[var(--clr-error)] hover:bg-red-500/10 transition-colors",children:[e.jsx(x,{icon:Ct,className:"mr-2"})," Sign Out"]}):e.jsxs("div",{className:"flex gap-2",children:[e.jsx(A,{to:"/login",onClick:()=>y(!1),className:"flex-1 py-2 rounded-full border border-[var(--border-color)] text-center text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-colors",children:"Sign In"}),e.jsx(A,{to:"/signup",onClick:()=>y(!1),className:"flex-1 py-2 rounded-full bg-[var(--accent-primary)] text-center text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors",children:"Sign Up"})]}),e.jsx(En,{compact:!0})]})]},"sidebar")]})}),e.jsx(j.AnimatePresence,{children:e.jsx(An,{open:Se,query:Zt,setQuery:Ze,inputRef:et,onClose:()=>{Te(!1),Ze("")}})}),e.jsx("style",{children:`
        .navbar-inner {
          padding-inline: 1.75rem;
        }
        @media (min-width: 1250px) {
          .navbar-inner {
            padding-inline: 0;
          }
        }

        /* ── Floating navbar: clean minimal glass ────────────── */
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

        /* ── Mega menu glass when floating ───────────────────── */
        .mega-floating {
          background: rgba(8,15,38,0.84) !important;
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

        /* ── Search popup (desktop) ───────────────────────────── */
        .search-popup {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          box-shadow: 0 24px 64px rgba(0,0,0,.55), 0 2px 0 rgba(255,255,255,.06) inset;
        }
        [data-theme="light"] .search-popup {
          box-shadow: 0 16px 48px rgba(15,23,42,.18), 0 2px 0 rgba(255,255,255,.8) inset;
        }
        .search-popup-header {
          border-bottom: 1px solid var(--border-color);
          background: linear-gradient(180deg, var(--bg-surface-2), var(--bg-surface));
        }
        .search-popup-divider {
          height: 1px;
          background: var(--border-color);
        }
        .search-popup-body {
          scrollbar-width: thin;
          scrollbar-color: var(--border-color) transparent;
        }
        .search-popup-label {
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: .13em;
          color: var(--text-tertiary); padding: 0 4px 8px;
        }
        .search-popup-group-label {
          font-size: 10px; font-weight: 600;
          text-transform: uppercase; letter-spacing: .12em;
          color: var(--text-tertiary); opacity: .7;
          padding: 6px 4px 4px;
        }
        .search-popup-esc {
          display: inline-flex; align-items: center; justify-content: center;
          height: 24px; padding: 0 8px; border-radius: 6px;
          background: var(--bg-surface-2); border: 1px solid var(--border-color);
          font-size: 11px; font-weight: 600; color: var(--text-tertiary);
          font-family: var(--font-mono); cursor: pointer;
          transition: all .15s ease;
        }
        .search-popup-esc:hover { color: var(--text-primary); }
        .search-popup-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 10px; border-radius: 10px;
          border: 1px solid transparent;
          text-decoration: none; cursor: pointer;
          transition: all .16s ease;
          color: var(--text-secondary);
        }
        .search-popup-item:hover,
        .search-popup-item.is-sidebar-active {
          background: var(--bg-surface-2);
          border-color: var(--border-color);
          color: var(--text-primary);
        }
        .search-popup-item-icon {
          width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
          display: grid; place-items: center;
          background: var(--accent-light);
          color: var(--accent-primary);
          font-size: 12px;
        }
        .search-popup-item-label {
          flex: 1; min-width: 0; font-size: 13px; font-weight: 600;
          color: inherit;
        }
        .search-popup-item-badge {
          font-size: 10px; color: var(--text-tertiary);
          border: 1px solid var(--border-color); border-radius: 999px;
          padding: 2px 7px; line-height: 1; flex-shrink: 0;
        }
        .search-popup-item-arrow {
          font-size: 9px; color: var(--text-tertiary);
          opacity: 0; transition: opacity .15s ease, transform .15s ease;
          flex-shrink: 0;
        }
        .search-popup-item:hover .search-popup-item-arrow { opacity: 1; transform: translateX(2px); }
        .search-popup-empty {
          display: flex; flex-direction: column; align-items: center;
          gap: 6px; padding: 32px 16px; text-align: center;
        }
        .search-popup-empty-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: grid; place-items: center;
          background: var(--bg-surface-2); border: 1px solid var(--border-color);
          color: var(--accent-primary); margin-bottom: 4px;
        }
        .search-popup-empty p {
          font-size: 14px; font-weight: 700; color: var(--text-primary);
          line-height: 1.2;
        }
        .search-popup-empty p span { color: var(--accent-primary); }
        .search-popup-empty small { font-size: 12px; color: var(--text-tertiary); line-height: 1.5; }
        .search-popup-footer {
          display: flex; align-items: center; gap: 5px;
          border-top: 1px solid var(--border-color);
          padding: 8px 16px;
          background: linear-gradient(180deg, var(--bg-surface), var(--bg-surface-2));
          font-size: 11px; color: var(--text-tertiary);
        }
        .search-popup-footer kbd {
          display: inline-flex; align-items: center; justify-content: center;
          height: 20px; padding: 0 5px; border-radius: 4px;
          background: var(--bg-surface-3); border: 1px solid var(--border-strong);
          font-size: 10px; font-weight: 700; color: var(--text-secondary);
          font-family: var(--font-mono);
        }

        /* ── Search bar focus: whole container glows ─────────── */
        .desktop-search-field,
        .sidebar-search-field {
          border-color: var(--border-color);
        }
        .desktop-search-field {
          display: flex; align-items: center; gap: 12px;
          min-height: 52px; padding: 0 10px 0 16px;
          border: 1px solid var(--border-color); border-radius: 18px;
          background: linear-gradient(180deg, var(--bg-surface-2), var(--bg-surface));
          transition: border-color .22s ease, box-shadow .22s ease, background .22s ease;
        }
        .desktop-search-field:focus-within,
        .sidebar-search-field:focus-within {
          border-color: var(--accent-primary) !important;
          box-shadow: 0 0 0 3px rgba(59,130,246,.2), 0 0 16px rgba(59,130,246,.08) !important;
          background: var(--bg-surface) !important;
        }

        /* ── Mega footer — compact single row ────────────────── */
        .mega-footer {
          display: flex; align-items: center; gap: 8px;
          flex-wrap: nowrap;
        }
        .desktop-search-close,
        .desktop-search-clear,
        .mega-url-copy {
          width: 30px; height: 30px; border-radius: 999px;
          display: inline-flex; align-items: center; justify-content: center;
          color: var(--text-tertiary); transition: all .2s ease;
          flex-shrink: 0;
        }
        .desktop-search-close:hover,
        .desktop-search-clear:hover,
        .mega-url-copy:hover {
          color: var(--text-primary); background: var(--bg-surface-2);
        }

        /* ── Share button — redesigned ───────────────────────── */
        .mega-share-action {
          height: 30px; padding: 0 12px; border-radius: 999px;
          display: inline-flex; align-items: center; gap: 6px;
          color: #fff;
          background: linear-gradient(135deg, var(--accent-primary) 0%, #6366f1 100%);
          font-size: 11.5px; font-weight: 600;
          transition: all .22s ease; flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(59,130,246,.28);
          border: none;
        }
        .mega-share-action:hover {
          background: linear-gradient(135deg, var(--accent-hover) 0%, #4f46e5 100%);
          box-shadow: 0 4px 14px rgba(59,130,246,.38);
          transform: translateY(-1px);
        }

        /* ── URL field ───────────────────────────────────────── */
        .mega-url-field {
          height: 30px; min-width: 0; flex: 1;
          display: flex; align-items: center; gap: 4px;
          border: 1px solid var(--border-color); border-radius: 999px;
          background: var(--bg-surface-2); padding: 0 4px 0 12px;
          overflow: hidden;
        }
        .mega-url-field span {
          min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          font-size: 11px; color: var(--text-tertiary); font-family: var(--font-mono);
        }

        /* ── Version pill ────────────────────────────────────── */
        .mega-version-pill {
          height: 28px; padding: 0 10px; border-radius: 999px;
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; color: var(--text-tertiary);
          background: var(--bg-surface-2); border: 1px solid var(--border-color);
          white-space: nowrap; flex-shrink: 0;
        }
        .mega-version-pill strong {
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-weight: 500;
        }

        /* ── Click effect: scale on all interactive elements ─── */
        .mega-share-action:active,
        a:active,
        button:active { transform: scale(.96); }
        .mega-share-action:hover:active { transform: scale(.97) translateY(0); }

        .desktop-search-pop {
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
        }

        @media (max-width: 640px) {
          .fixed.top-0.right-0.bottom-0 { width: 100vw !important; }
        }
      `})]})}const _n={active:{color:"#22c55e",label:"Active",shadow:"rgba(34,197,94,0.35)"},busy:{color:"#ef4444",label:"Busy",shadow:"rgba(239,68,68,0.35)"},away:{color:"#f59e0b",label:"Away",shadow:"rgba(245,158,11,0.35)"},offline:{color:"#6b7280",label:"Offline",shadow:"rgba(107,114,128,0.35)"}},zn="active",Pn=[{label:"Home",path:"/"},{label:"About",path:"/about"},{label:"Projects",path:"/projects"},{label:"Feed",path:"/feed"},{label:"Contact",path:"/contact"}],Rn=[{label:"Privacy Policy",path:"/privacy-policy"},{label:"Cookies Policy",path:"/cookies-policy"},{label:"Terms of Use",path:"/terms"},{label:"Sitemap",path:"/sitemap.xml",external:!0}];function Ln({target:t}){const[r,a]=u.useState(0),n=u.useRef(null),s=j.useInView(n,{once:!0,margin:"-80px"});return u.useEffect(()=>{if(!s)return;const o=Math.max(0,t-300),i=performance.now(),l=1800;function c(d){const p=d-i,m=Math.min(p/l,1),v=1-Math.pow(1-m,3),g=Math.round(o+(t-o)*v);a(g),m<1?requestAnimationFrame(c):a(t)}requestAnimationFrame(c)},[s,t]),e.jsx("strong",{ref:n,id:"subCount",children:r.toLocaleString()})}const $=({href:t,label:r,children:a})=>e.jsx("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:"nf-social-icon",title:r,"aria-label":r,children:e.jsx("svg",{viewBox:"0 0 24 24",children:a})});function On(){const[t,r]=u.useState(""),[a,n]=u.useState(2847),[s,o]=u.useState(!1),[i,l]=u.useState(!1),[c,d]=u.useState(!1),[p,m]=u.useState("/logo.webp"),v=new Date().getFullYear(),g=_n[zn];u.useEffect(()=>sn(S=>{S>0&&n(S)}),[]);const h=async N=>{N==null||N.preventDefault();const S=t.trim();if(!S||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(S)){d(!0),setTimeout(()=>d(!1),2200);return}o(!0);try{(await nn(S)).duplicate?se.info("Already subscribed","This email is already in the list!"):(l(!0),r(""),n(O=>O+1),setTimeout(()=>l(!1),3500))}catch{se.error("Failed","Could not subscribe. Try again.")}finally{o(!1)}},y=N=>{N.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"nf-sc-wrap",children:e.jsxs("div",{className:"nf-sc",children:[e.jsxs("div",{className:"nf-sc-left",children:[e.jsxs("h2",{children:["Stay ",e.jsx("em",{children:"Connected"}),e.jsx("br",{}),"with My Work"]}),e.jsx("p",{className:"nf-sc-sub",children:"Follow my journey · Get updates on new projects & posts"})]}),e.jsxs("div",{className:"nf-sc-right",children:[i?e.jsxs("div",{className:"nf-success-msg",children:[e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"#4ade80",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})}),"Subscribed! Check your inbox."]}):e.jsx("form",{onSubmit:h,noValidate:!0,children:e.jsxs("div",{className:`nf-form-wrap ${c?"nf-form-invalid":""}`,children:[e.jsx("div",{className:"nf-input-icon","aria-hidden":!0,children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"#fff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),e.jsx("path",{d:"M2 7l8.5 6.5a2 2 0 002.5 0L22 7"})]})}),e.jsx("input",{id:"nf-sub-email",type:"email",placeholder:"Enter your email",value:t,onChange:N=>{r(N.target.value),c&&d(!1)},required:!0,autoComplete:"email"}),e.jsxs("button",{type:"submit",className:"nf-submit-btn",disabled:s,children:[s?e.jsx("span",{className:"nf-spinner"}):e.jsx("svg",{viewBox:"0 0 20 20",width:"15",height:"15",fill:"currentColor",children:e.jsx("path",{d:"M10 2a6 6 0 00-6 6v1H3a1 1 0 000 2h1v1a6 6 0 0012 0v-1h1a1 1 0 000-2h-1V8a6 6 0 00-6-6zm0 2a4 4 0 014 4v2a4 4 0 01-8 0V8a4 4 0 014-4z"})}),e.jsx("span",{children:s?"...":"Subscribe"})]})]})}),e.jsxs("p",{className:"nf-count-text",children:[e.jsx("span",{className:"nf-count-dot","aria-hidden":!0}),e.jsx(Ln,{target:a})," curious minds already subscribed"]})]})]})}),e.jsx("footer",{className:"nf-footer",children:e.jsxs("div",{className:"nf-inner",children:[e.jsxs("div",{className:"nf-main",children:[e.jsxs("div",{className:"nf-brand-col",children:[e.jsxs(A,{to:"/",className:"nf-logo-row",children:[e.jsxs("div",{className:"nf-logo-mark",style:{position:"relative"},children:[e.jsx("img",{src:p,alt:"Muhtasim logo",onError:()=>m("/android-chrome-192x192.png"),className:"nf-logo-img"}),e.jsx("span",{className:"nf-logo-status-dot",title:g.label,style:{background:g.color,boxShadow:`0 0 0 2px var(--nf-footer-bg), 0 0 0 4px ${g.shadow}`}})]}),e.jsxs("div",{children:[e.jsx("div",{className:"nf-logo-name",children:w.owner.displayName}),e.jsx("div",{className:"nf-logo-handle",children:"@mdturzo999 · Portfolio"})]})]}),e.jsx("p",{className:"nf-brand-desc",children:w.seo.defaultDescription}),e.jsxs("div",{className:"nf-social-row",children:[e.jsx($,{href:w.social.github,label:"GitHub",children:e.jsx("path",{d:"M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"})}),e.jsx($,{href:w.social.linkedin,label:"LinkedIn",children:e.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})}),e.jsx($,{href:w.social.twitter,label:"X / Twitter",children:e.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"})}),e.jsx($,{href:w.social.instagram,label:"Instagram",children:e.jsx("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"})}),e.jsx($,{href:w.social.youtube,label:"YouTube",children:e.jsx("path",{d:"M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"})}),e.jsx($,{href:w.social.facebook,label:"Facebook",children:e.jsx("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})}),e.jsx($,{href:w.social.threads,label:"Threads",children:e.jsx("path",{d:"M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.49a8.16 8.16 0 004.77 1.52V7.56a4.85 4.85 0 01-1-.87z"})}),e.jsx($,{href:w.social.tiktok,label:"TikTok",children:e.jsx("path",{d:"M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.49a8.16 8.16 0 004.77 1.52V7.56a4.85 4.85 0 01-1-.87z"})})]}),e.jsxs("div",{className:"nf-location-row",children:[e.jsx("svg",{viewBox:"0 0 24 24",children:e.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"})}),w.owner.location]})]}),e.jsxs("div",{className:"nf-nav-col",children:[e.jsx("div",{className:"nf-nav-col-title",children:"Explore"}),e.jsx("ul",{className:"nf-nav-list",children:Pn.map(({label:N,path:S})=>e.jsx("li",{children:e.jsx(A,{to:S,children:N})},S))})]}),e.jsxs("div",{className:"nf-nav-col",children:[e.jsx("div",{className:"nf-nav-col-title",children:"Legal"}),e.jsx("ul",{className:"nf-nav-list",children:Rn.map(({label:N,path:S,external:D})=>e.jsx("li",{children:D?e.jsx("a",{href:S,target:"_blank",rel:"noopener noreferrer",children:N}):e.jsx(A,{to:S,children:N})},S))})]}),e.jsxs("div",{className:"nf-contact-col",children:[e.jsx("div",{className:"nf-nav-col-title",children:"Get in Touch"}),e.jsxs(A,{to:"/contact",className:"nf-contact-card",children:[e.jsx("div",{className:"nf-cc-label",children:"Open for work"}),e.jsx("div",{className:"nf-cc-title",children:"Let's Collaborate"}),e.jsx("div",{className:"nf-cc-sub",children:"Have a project in mind? I'd love to hear about it."}),e.jsxs("span",{className:"nf-cc-arrow",children:["Visit Contact Page",e.jsx("svg",{viewBox:"0 0 20 20",children:e.jsx("path",{d:"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"})})]})]}),e.jsxs("a",{href:`mailto:${w.owner.email}`,className:"nf-email-card",children:[e.jsx("div",{className:"nf-email-icon",children:e.jsx("svg",{viewBox:"0 0 24 24",children:e.jsx("path",{d:"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})})}),e.jsxs("div",{children:[e.jsx("div",{className:"nf-email-label",children:"Email me"}),e.jsx("div",{className:"nf-email-addr",children:w.owner.email})]})]})]})]}),e.jsx("div",{className:"nf-scroll-border",children:e.jsx("button",{onClick:y,className:"nf-scroll-btn","aria-label":"Scroll to top",title:"Back to top",children:e.jsx("svg",{viewBox:"0 0 20 20",children:e.jsx("path",{d:"M10 4l-6 6h4v6h4v-6h4l-6-6z"})})})}),e.jsxs("div",{className:"nf-bottom",children:[e.jsxs("p",{className:"nf-copyright",children:["© ",v," ",e.jsx(A,{to:"/",children:w.siteName}),". All rights reserved."]}),e.jsxs("div",{className:"nf-bottom-right",children:[e.jsx("span",{className:"nf-version",children:w.version}),e.jsx("button",{onClick:y,className:"nf-scroll-btn nf-desktop-only","aria-label":"Scroll to top",title:"Back to top",children:e.jsx("svg",{viewBox:"0 0 20 20",children:e.jsx("path",{d:"M10 4l-6 6h4v6h4v-6h4l-6-6z"})})})]})]})]})}),e.jsx("style",{children:`
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
          padding: 0 clamp(16px, 4vw, 48px);
          transition: background .35s ease, color .35s ease;
        }
        .nf-inner { max-width: 1120px; margin: 0 auto; }

        /* ══ STAY CONNECTED BANNER ═══════════════════════════ */
        .nf-sc-wrap {
          font-family: 'Sora', var(--font-body, sans-serif);
          padding: 0 clamp(16px, 4vw, 48px);
          margin-bottom: -1px;
          animation: nf-fade-up .55s ease both;
        }
        .nf-sc {
          position: relative;
          overflow: hidden;
          max-width: 1120px;
          margin: 0 auto;
          border-radius: 28px 28px 0 0;
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
        .nf-social-icon:active,
        .nf-nav-list a:active,
        .nf-contact-card:active,
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
      `})]})}const In=[{label:"Add Blog",icon:Dr,tab:"blogs",color:"#8b5cf6"},{label:"Add Project",icon:ve,tab:"projects",color:"#3b82f6"},{label:"Add Post",icon:$r,tab:"posts",color:"#ef4444"},{label:"Add Notification",icon:Xe,tab:"notifications",color:"#f59e0b"},{label:"View Reports",icon:Mr,tab:"reports",color:"#ec4899"},{label:"Page Visibility",icon:Vr,tab:"visibility",color:"#22c55e"}],Dn={hidden:{},visible:{transition:{staggerChildren:.05}},exit:{transition:{staggerChildren:.03,staggerDirection:-1}}},$n={hidden:{opacity:0,x:20,scale:.8},visible:{opacity:1,x:0,scale:1,transition:{type:"spring",stiffness:400,damping:28}},exit:{opacity:0,x:20,scale:.8,transition:{duration:.15}}};function Mn(){const{isAdmin:t}=Xt(),r=be(),[a,n]=u.useState(!1);return t?e.jsxs("div",{className:"fixed bottom-6 right-6 z-[var(--z-toast)] flex flex-col items-end gap-2 pointer-events-none",children:[e.jsx(j.AnimatePresence,{children:a&&e.jsx(j.motion.div,{variants:Dn,initial:"hidden",animate:"visible",exit:"exit",className:"flex flex-col items-end gap-2 pointer-events-auto",children:In.map(s=>e.jsxs(j.motion.button,{variants:$n,onClick:()=>{r(`/admin/${s.tab}`),n(!1)},className:"flex items-center gap-2.5 pr-3.5 pl-2.5 py-2 rounded-full shadow-[var(--shadow-lg)] border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-2)] transition-colors",children:[e.jsx("span",{className:"w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",style:{background:s.color+"22"},children:e.jsx(x,{icon:s.icon,style:{color:s.color},className:"text-xs"})}),e.jsx("span",{className:"text-sm font-medium text-[var(--text-primary)] whitespace-nowrap",children:s.label})]},s.tab))})}),e.jsx(j.motion.button,{onClick:()=>n(!a),whileHover:{scale:1.05},whileTap:{scale:.95},className:"pointer-events-auto w-12 h-12 rounded-full bg-[var(--accent-primary)] text-white shadow-[0_4px_20px_rgba(59,130,246,0.5)] hover:bg-[var(--accent-hover)] transition-colors flex items-center justify-center","aria-label":"Admin quick actions",children:e.jsx(j.AnimatePresence,{mode:"wait",initial:!1,children:a?e.jsx(j.motion.span,{initial:{opacity:0,rotate:-90},animate:{opacity:1,rotate:0},exit:{opacity:0,rotate:90},transition:{duration:.15},children:e.jsx(x,{icon:xe,className:"text-lg"})},"x"):e.jsx(j.motion.span,{initial:{opacity:0,rotate:90},animate:{opacity:1,rotate:0},exit:{opacity:0,rotate:-90},transition:{duration:.15},children:e.jsx(x,{icon:B,className:"text-base"})},"shield")})})]}):null}function Vn(){return e.jsxs("div",{className:"min-h-screen flex flex-col",style:{background:"var(--bg-page)"},children:[e.jsx(Cn,{}),e.jsx("main",{className:"flex-1",children:e.jsx(nr,{})}),e.jsx(On,{}),e.jsx(Mn,{})]})}const wt={success:{icon:Br,color:"text-emerald-400",bg:"bg-emerald-500/10 border-emerald-500/30",bar:"bg-emerald-400"},error:{icon:Ur,color:"text-red-400",bg:"bg-red-500/10 border-red-500/30",bar:"bg-red-400"},warning:{icon:Hr,color:"text-amber-400",bg:"bg-amber-500/10 border-amber-500/30",bar:"bg-amber-400"},info:{icon:Fr,color:"text-blue-400",bg:"bg-blue-500/10 border-blue-500/30",bar:"bg-blue-400"}};function Fn({toast:t}){const{removeToast:r}=R(),a=wt[t.type]||wt.info;return e.jsxs(j.motion.div,{layout:!0,initial:{opacity:0,x:60,scale:.95},animate:{opacity:1,x:0,scale:1},exit:{opacity:0,x:60,scale:.9,transition:{duration:.15}},className:`
        relative overflow-hidden rounded-lg border backdrop-blur-xl shadow-lg
        pointer-events-auto w-full max-w-[320px]
        ${a.bg}
      `,children:[e.jsxs("div",{className:"flex items-start gap-2.5 px-3 py-2.5",children:[e.jsx(x,{icon:a.icon,className:`${a.color} text-base flex-shrink-0 mt-0.5`}),e.jsxs("div",{className:"flex-1 min-w-0",children:[t.title&&e.jsx("p",{className:"text-[13px] font-semibold text-[var(--text-primary)] leading-tight",children:t.title}),t.message&&e.jsx("p",{className:"text-xs text-[var(--text-secondary)] mt-0.5 leading-snug",children:t.message})]}),e.jsx("button",{onClick:()=>r(t.id),className:"text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0 p-0.5",children:e.jsx(x,{icon:Yr,className:"text-xs"})})]}),t.duration&&e.jsx(j.motion.div,{className:`absolute bottom-0 left-0 h-0.5 ${a.bar}`,initial:{width:"100%"},animate:{width:"0%"},transition:{duration:t.duration/1e3,ease:"linear"}})]})}function Hn(){const t=R(r=>r.toasts);return e.jsx("div",{id:"toast-container","aria-live":"polite","aria-atomic":"false",children:e.jsx(j.AnimatePresence,{mode:"popLayout",children:t.map(r=>e.jsx(Fn,{toast:r},r.id))})})}function Un(){const t=oe(),[r,a]=u.useState(0),[n,s]=u.useState(!1),o=u.useRef(null),i=u.useRef(null),l=u.useRef(null);return u.useEffect(()=>(clearTimeout(o.current),clearTimeout(i.current),clearTimeout(l.current),s(!0),a(0),o.current=setTimeout(()=>a(30),50),i.current=setTimeout(()=>a(70),300),l.current=setTimeout(()=>{a(100),setTimeout(()=>{s(!1),a(0)},300)},700),()=>{clearTimeout(o.current),clearTimeout(i.current),clearTimeout(l.current)}),[t.pathname,t.search]),!n&&r===0?null:e.jsx("div",{id:"page-progress",className:n?"is-visible":"",style:{width:`${r}%`,opacity:n?1:0},children:e.jsx("span",{className:"page-progress-head"})})}class Bn extends u.Component{constructor(r){super(r),this.state={hasError:!1,error:null}}static getDerivedStateFromError(r){return{hasError:!0,error:r}}componentDidCatch(r,a){console.error("[ErrorBoundary]",r,a);try{window.__SENTRY_INITIALIZED__&&E(async()=>{const{captureException:n}=await import("./index-B3IBK3zd.js");return{captureException:n}},__vite__mapDeps([0,1])).then(({captureException:n})=>{n(r,{extra:a})})}catch{}}render(){return this.state.hasError?e.jsxs("div",{className:"min-h-[60vh] flex flex-col items-center justify-center p-8 text-center",children:[e.jsx("div",{className:"text-red-400 mb-4",children:e.jsx(x,{icon:qr,className:"text-5xl"})}),e.jsx("h2",{className:"text-xl font-bold text-[var(--text-primary)] mb-2",children:"Something went wrong"}),e.jsx("p",{className:"text-[var(--text-secondary)] mb-6 max-w-sm",children:"An unexpected error occurred. Please try refreshing the page."}),e.jsxs("button",{onClick:()=>window.location.reload(),className:"inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-colors",children:[e.jsx(x,{icon:Gr}),"Refresh Page"]}),!1]}):this.props.children}}function H({lines:t=3,className:r=""}){const a=["w-full","w-4/5","w-3/4","w-2/3","w-1/2","w-5/6"];return e.jsx("div",{className:`space-y-2.5 ${r}`,children:Array.from({length:t},(n,s)=>e.jsx("div",{className:`sk h-4 rounded ${a[s%a.length]}`,style:{animationDelay:`${s*.08}s`}},s))})}function pe({size:t=48,className:r=""}){return e.jsx("div",{className:`sk rounded-full flex-shrink-0 ${r}`,style:{width:t,height:t}})}function b({w:t="w-full",h:r="h-4",rounded:a="rounded",className:n="",delay:s=0}){return e.jsx("div",{className:`sk ${t} ${r} ${a} ${n}`,style:{animationDelay:`${s}s`}})}function Qt({className:t=""}){return e.jsxs("div",{className:`card p-5 space-y-4 ${t}`,children:[e.jsx(b,{h:"h-44",rounded:"rounded-lg"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(b,{w:"w-16",h:"h-5",rounded:"rounded-full",delay:.05}),e.jsx(b,{w:"w-20",h:"h-5",rounded:"rounded-full",delay:.1})]}),e.jsx(b,{w:"w-3/4",h:"h-5",delay:.12}),e.jsx(b,{w:"w-1/2",h:"h-4",delay:.15}),e.jsx(H,{lines:2}),e.jsxs("div",{className:"flex items-center justify-between pt-2",children:[e.jsx(b,{w:"w-20",h:"h-4",delay:.18}),e.jsx(b,{w:"w-24",h:"h-8",rounded:"rounded-lg",delay:.2})]})]})}function Yn({className:t=""}){return e.jsxs("div",{className:`flex items-center gap-4 p-4 border-b border-[var(--border-color)] ${t}`,children:[e.jsx(b,{w:"w-12",h:"h-12",rounded:"rounded-lg"}),e.jsxs("div",{className:"flex-1 space-y-2",children:[e.jsx(b,{w:"w-2/3",h:"h-4"}),e.jsx(b,{w:"w-1/2",h:"h-3",delay:.08})]}),e.jsx(b,{w:"w-20",h:"h-8",rounded:"rounded-lg",delay:.12})]})}function qn({className:t=""}){return e.jsx("div",{className:`sk h-52 w-full rounded-xl ${t}`})}function jt({className:t=""}){return e.jsxs("div",{className:`card p-5 text-center space-y-2 ${t}`,children:[e.jsx(b,{w:"w-20",h:"h-10",rounded:"rounded-lg",className:"mx-auto"}),e.jsx(b,{w:"w-16",h:"h-3",className:"mx-auto"})]})}function Gn({count:t=6}){return e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:Array.from({length:t},(r,a)=>e.jsx(Qt,{},a))})}function Xn({rows:t=5,cols:r=4,className:a=""}){return e.jsxs("div",{className:a,children:[e.jsx("div",{className:"flex gap-3 p-3 border-b border-[var(--border-color)] mb-1",children:Array.from({length:r},(n,s)=>e.jsx(b,{h:"h-4",className:"flex-1"},s))}),Array.from({length:t},(n,s)=>e.jsx("div",{className:"flex gap-3 p-3 border-b border-[var(--border-color)]",children:Array.from({length:r},(o,i)=>e.jsx(b,{h:"h-4",className:"flex-1",delay:i*.04},i))},s))]})}const kt={hero:()=>e.jsxs("div",{className:"container py-16 space-y-10",children:[e.jsxs("div",{className:"flex flex-col lg:flex-row gap-10 items-center py-8",children:[e.jsxs("div",{className:"flex-1 space-y-5",children:[e.jsx(b,{w:"w-1/3",h:"h-5",rounded:"rounded-full"}),e.jsx(b,{w:"w-5/6",h:"h-12",delay:.05}),e.jsx(b,{w:"w-4/6",h:"h-12",delay:.08}),e.jsx(H,{lines:2}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(b,{w:"w-32",h:"h-11",rounded:"rounded-full",delay:.1}),e.jsx(b,{w:"w-36",h:"h-11",rounded:"rounded-full",delay:.12})]}),e.jsx("div",{className:"flex gap-2",children:[...Array(5)].map((t,r)=>e.jsx(pe,{size:36},r))})]}),e.jsx(pe,{size:280,className:"flex-shrink-0"})]}),e.jsx("div",{className:"grid grid-cols-3 gap-4",children:[...Array(3)].map((t,r)=>e.jsx(jt,{},r))})]}),grid:()=>e.jsxs("div",{className:"container py-10 space-y-8",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(b,{w:"w-40",h:"h-8"}),e.jsx(b,{w:"w-32",h:"h-10",rounded:"rounded-full"})]}),e.jsx("div",{className:"flex gap-2",children:[...Array(5)].map((t,r)=>e.jsx(b,{w:"w-20",h:"h-8",rounded:"rounded-full",delay:r*.04},r))}),e.jsx(Gn,{count:6})]}),list:()=>e.jsxs("div",{className:"container py-10 space-y-6",children:[e.jsx(b,{w:"w-48",h:"h-8"}),e.jsx("div",{className:"card overflow-hidden",children:[...Array(6)].map((t,r)=>e.jsx(Yn,{},r))})]}),detail:()=>e.jsx("div",{className:"container py-10 max-w-3xl mx-auto",children:e.jsxs("div",{className:"space-y-6",children:[e.jsx(b,{w:"w-24",h:"h-5",rounded:"rounded-full"}),e.jsx(b,{w:"w-5/6",h:"h-10",delay:.05}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(pe,{size:44}),e.jsxs("div",{className:"flex-1 space-y-2",children:[e.jsx(b,{w:"w-36",h:"h-4"}),e.jsx(b,{w:"w-24",h:"h-3",delay:.06})]})]}),e.jsx(qn,{}),e.jsx(H,{lines:6}),e.jsx(H,{lines:4}),e.jsx(H,{lines:3})]})}),profile:()=>e.jsxs("div",{className:"container py-10 space-y-8 max-w-4xl mx-auto",children:[e.jsxs("div",{className:"card p-8 flex gap-6 items-start",children:[e.jsx(pe,{size:88}),e.jsxs("div",{className:"flex-1 space-y-3",children:[e.jsx(b,{w:"w-48",h:"h-7"}),e.jsx(b,{w:"w-32",h:"h-4",delay:.05}),e.jsx(H,{lines:2}),e.jsx("div",{className:"flex gap-2",children:[...Array(4)].map((t,r)=>e.jsx(b,{w:"w-8",h:"h-8",rounded:"rounded-full"},r))})]})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[...Array(4)].map((t,r)=>e.jsx(Qt,{},r))})]}),admin:()=>e.jsxs("div",{className:"flex gap-0 min-h-[80vh]",children:[e.jsxs("div",{className:"w-60 flex-shrink-0 border-r border-[var(--border-color)] p-4 space-y-2",children:[e.jsx(b,{w:"w-full",h:"h-10",rounded:"rounded-xl"}),[...Array(8)].map((t,r)=>e.jsx(b,{w:"w-full",h:"h-9",rounded:"rounded-xl",delay:r*.03},r))]}),e.jsxs("div",{className:"flex-1 p-8 space-y-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(b,{w:"w-40",h:"h-8"}),e.jsx(b,{w:"w-28",h:"h-10",rounded:"rounded-xl"})]}),e.jsx("div",{className:"grid grid-cols-4 gap-4",children:[...Array(4)].map((t,r)=>e.jsx(jt,{},r))}),e.jsx(Xn,{rows:6})]})]}),form:()=>e.jsx("div",{className:"container py-10 max-w-xl mx-auto",children:e.jsxs("div",{className:"card p-8 space-y-6",children:[e.jsx(b,{w:"w-40",h:"h-7"}),e.jsx(H,{lines:1}),[...Array(4)].map((t,r)=>e.jsxs("div",{className:"space-y-2",children:[e.jsx(b,{w:"w-24",h:"h-4",delay:r*.05}),e.jsx(b,{w:"w-full",h:"h-11",rounded:"rounded-xl",delay:r*.06})]},r)),e.jsx(b,{w:"w-full",h:"h-11",rounded:"rounded-xl",delay:.2})]})}),blank:()=>e.jsx("div",{className:"container py-10 space-y-4",children:[...Array(3)].map((t,r)=>e.jsx(b,{w:"w-full",h:"h-32",rounded:"rounded-2xl",delay:r*.08},r))})};function Kn({layout:t="blank"}){const r=kt[t]||kt.blank;return e.jsx("div",{className:"animate-in fade-in duration-300 min-h-[60vh]","aria-hidden":!0,"aria-label":"Loading...",children:e.jsx(r,{})})}const Wn=u.lazy(()=>E(()=>import("./Home-Bpy68Bcd.js"),__vite__mapDeps([2,3,1,4,5,6,7,8,9]))),Qn=u.lazy(()=>E(()=>import("./About-CJc2w2Dw.js"),__vite__mapDeps([10,3,1,8,11,4,5,6,7,9]))),Jn=u.lazy(()=>E(()=>import("./Projects-DCx2ZajE.js"),__vite__mapDeps([12,3,1,11,4,5,6,9,8]))),Zn=u.lazy(()=>E(()=>import("./ProjectDetail-DroB5pNB.js"),__vite__mapDeps([13,3,1,4,6,9,8]))),es=u.lazy(()=>E(()=>import("./Feed-C94f8IQq.js"),__vite__mapDeps([14,3,1]))),ts=u.lazy(()=>E(()=>import("./Blogs-kL4NdcOV.js"),__vite__mapDeps([15,3,1,11,4,5,6,9,8]))),rs=u.lazy(()=>E(()=>import("./BlogDetail-DY8wpfLn.js"),__vite__mapDeps([16,3,1,4,6,9,8]))),as=u.lazy(()=>E(()=>import("./Posts-C3PWdu5q.js"),__vite__mapDeps([17,3,1,11,4,5,6,9,8]))),ns=u.lazy(()=>E(()=>import("./PostDetail-DWs3eR-F.js"),__vite__mapDeps([18,3,1,4,6,9,8]))),ss=u.lazy(()=>E(()=>import("./Contact-DB94FruC.js"),__vite__mapDeps([19,3,1,8,11,4,5,6,9]))),os=u.lazy(()=>E(()=>import("./Login-DmhVOcwf.js"),__vite__mapDeps([20,3,1,4,6,9,8]))),is=u.lazy(()=>E(()=>import("./Signup-D1zCmwEg.js"),__vite__mapDeps([21,3,1,4,6,9,8]))),ls=u.lazy(()=>E(()=>import("./AuthAction-DCyLyMqM.js"),__vite__mapDeps([22,3,1,6,9,8]))),cs=u.lazy(()=>E(()=>import("./Profile-a4lWdgDb.js"),__vite__mapDeps([23,3,1,4,6,9,8]))),ds=u.lazy(()=>E(()=>import("./PublicProfile-kFURaTTr.js"),__vite__mapDeps([24,3,1,6,9,8]))),Nt=u.lazy(()=>E(()=>import("./Admin-DkOdgvWf.js"),__vite__mapDeps([25,3,1,6,9,8]))),ps=u.lazy(()=>E(()=>import("./PrivacyPolicy-CCKYQWHb.js"),__vite__mapDeps([26,3,1,4,6,9,8]))),us=u.lazy(()=>E(()=>import("./CookiesPolicy-BtHVmoxH.js"),__vite__mapDeps([27,3,1,4,6,9,8]))),St=u.lazy(()=>E(()=>import("./NotFound-Bp6Szb_q.js"),__vite__mapDeps([28,3,1,8,6,9]))),fs={initial:{opacity:0,y:8},enter:{opacity:1,y:0,transition:{duration:.25,ease:[.16,1,.3,1]}},exit:{opacity:0,transition:{duration:.12,ease:"easeIn"}}},ms=["button:not(:disabled)",'[role="button"]',".card",".nf-email-card","[data-click-fx]"].join(","),xs=["input","textarea","select","option",'[contenteditable="true"]','[data-click-fx-ignore="true"]','[data-ripple-managed="true"]'].join(",");function hs(){return u.useEffect(()=>{const t=r=>{if(r.button!=null&&r.button!==0||!(r.target instanceof Element)||r.target.closest(xs))return;const a=r.target.closest(ms);if(!a)return;const n=a.getBoundingClientRect();if(!n.width||!n.height)return;const s=Math.max(n.width,n.height)*1.5,o=document.createElement("span");o.className="click-fx-burst",o.style.width=`${s}px`,o.style.height=`${s}px`,o.style.left=`${r.clientX-n.left-s/2}px`,o.style.top=`${r.clientY-n.top-s/2}px`,a.classList.add("click-fx-host"),a.appendChild(o),window.setTimeout(()=>o.remove(),680)};return document.addEventListener("pointerdown",t,{passive:!0}),()=>document.removeEventListener("pointerdown",t)},[]),null}function gs({children:t}){return e.jsx(j.motion.div,{variants:fs,initial:"initial",animate:"enter",exit:"exit",children:t})}function Jt({fullscreen:t=!1}){return e.jsx("div",{className:t?"fixed inset-0 z-[99999] flex items-center justify-center bg-[var(--bg-page)] px-4":"min-h-[60vh] flex items-center justify-center px-4",children:e.jsx("div",{style:{width:34,height:34,border:"3px solid var(--border-strong)",borderTopColor:"var(--accent-primary)",borderRadius:"50%",animation:"spin 0.7s linear infinite",flexShrink:0}})})}function bs({children:t,onReady:r}){return u.useEffect(()=>{r==null||r()},[r]),t}function vs({children:t,layout:r="blank",initialPending:a,onReady:n}){return e.jsx(u.Suspense,{fallback:a?e.jsx(Jt,{fullscreen:!0}):e.jsx(Kn,{layout:r}),children:e.jsx(bs,{onReady:n,children:t})})}function ys(){const t=oe();return u.useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"auto"}),document.documentElement.scrollTop=0,document.body.scrollTop=0},[t.pathname,t.search]),null}function ws(){const t=be();return u.useEffect(()=>{Qe().finally(()=>t("/",{replace:!0}))},[]),e.jsx(Jt,{})}function js(){const t=oe(),[r,a]=u.useState(!1),n=u.useCallback(()=>a(!0),[]),s=(o,i="blank")=>e.jsx(vs,{layout:i,initialPending:!r,onReady:n,children:e.jsx(gs,{children:o})});return e.jsx(j.AnimatePresence,{mode:"wait",initial:!1,children:e.jsxs(sr,{location:t,children:[e.jsxs(T,{element:e.jsx(Vn,{}),children:[e.jsx(T,{path:"/home",element:e.jsx(or,{to:"/",replace:!0})}),e.jsx(T,{path:"/",element:s(e.jsx(Wn,{}),"hero")}),e.jsx(T,{path:"/about",element:s(e.jsx(Qn,{}),"profile")}),e.jsx(T,{path:"/projects",element:s(e.jsx(Jn,{}),"grid")}),e.jsx(T,{path:"/projects/:slug",element:s(e.jsx(Zn,{}),"detail")}),e.jsx(T,{path:"/feed",element:s(e.jsx(es,{}),"list")}),e.jsx(T,{path:"/blogs",element:s(e.jsx(ts,{}),"list")}),e.jsx(T,{path:"/blogs/:slug",element:s(e.jsx(rs,{}),"detail")}),e.jsx(T,{path:"/posts",element:s(e.jsx(as,{}),"list")}),e.jsx(T,{path:"/posts/:slug",element:s(e.jsx(ns,{}),"detail")}),e.jsx(T,{path:"/contact",element:s(e.jsx(ss,{}),"form")}),e.jsx(T,{path:"/login",element:s(e.jsx(os,{}),"form")}),e.jsx(T,{path:"/signup",element:s(e.jsx(is,{}),"form")}),e.jsx(T,{path:"/logout",element:e.jsx(ws,{})}),e.jsx(T,{path:"/profile",element:s(e.jsx(cs,{}),"profile")}),e.jsx(T,{path:"/@:username",element:s(e.jsx(ds,{}),"profile")}),e.jsx(T,{path:"/admin",element:s(e.jsx(Nt,{}),"admin")}),e.jsx(T,{path:"/admin/:tab",element:s(e.jsx(Nt,{}),"admin")}),e.jsx(T,{path:"/privacy-policy",element:s(e.jsx(ps,{}),"detail")}),e.jsx(T,{path:"/cookies-policy",element:s(e.jsx(us,{}),"detail")}),e.jsx(T,{path:"/404",element:s(e.jsx(St,{}),"blank")}),e.jsx(T,{path:"*",element:s(e.jsx(St,{}),"blank")})]}),e.jsx(T,{path:"/auth/action",element:s(e.jsx(ls,{}),"form")})]},t.pathname)})}function ks(){return un(),mn(),e.jsx($t,{children:e.jsxs(Bn,{children:[e.jsx(hs,{}),e.jsx(ys,{}),e.jsx(Un,{}),e.jsx(Hn,{}),e.jsx(js,{})]})})}Le.createRoot(document.getElementById("root")).render(e.jsx(P.StrictMode,{children:e.jsx(ir,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:e.jsx(ks,{})})}));export{_s as H,Kn as P,w as S,Qt as a,Os as b,Ds as c,b as d,pe as e,Ls as f,Rs as g,zs as h,Ps as i,Qa as j,Xt as k,Is as t,fn as u};
