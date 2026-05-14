const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DBLVxIkL.js","assets/vendor-mcV3incF.js","assets/Home-WhZIQLcm.js","assets/motion-B0YflK6s.js","assets/seo-DUJ6MHHc.js","assets/analytics-Cw-eaBii.js","assets/firebase-DPKIO6Ex.js","assets/supabase-vrwWM04E.js","assets/icons-DAcGxVVW.js","assets/About-huC7YYLu.js","assets/VisibilityGuard-CZMKj4Lw.js","assets/Projects-9W5qTCeS.js","assets/ProjectDetail-Be3ydZ_B.js","assets/Feed-CFMZFL4O.js","assets/Blogs-DL7HsxmM.js","assets/BlogDetail-DjM_qosA.js","assets/Posts-DzAtciyX.js","assets/PostDetail-BaZ0JhKN.js","assets/Contact-DkpQlTkR.js","assets/Login-CCgM2rXU.js","assets/Signup-iRwq9Wjn.js","assets/AuthAction-Dgjj8oFS.js","assets/Profile-DrevvUZJ.js","assets/PublicProfile-C0jZYf4K.js","assets/Admin-BVRa8J59.js","assets/PrivacyPolicy-BfXxd01D.js","assets/CookiesPolicy-CY3-rDKG.js","assets/NotFound-xUmevErf.js"])))=>i.map(i=>d[i]);
var er=Object.defineProperty;var tr=(t,r,a)=>r in t?er(t,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[r]=a;var L=(t,r,a)=>tr(t,typeof r!="symbol"?r+"":r,a);import{j as e,c as v}from"./motion-B0YflK6s.js";import{a as rr,g as ue,r as p,R as P,u as re,b as pe,N as ne,L as A,O as ar,c as sr,d as T,B as nr}from"./vendor-mcV3incF.js";import{g as or,i as ir,b as lr,c as cr,d as dr,e as ur,f as pr,G as fr,h as xr,F as mr,o as hr,r as D,u as kt,j as Oe,k as De,s as gr,l as Nt,m as St,n as de,p as br,q as vr}from"./firebase-DPKIO6Ex.js";import{c as yr}from"./supabase-vrwWM04E.js";import{f as $e,a as Me,b as fe,c as Ve,d as Fe,F as m,e as I,g as Ee,h as Z,i as wr,j as xe,k as F,l as He,m as Tt,n as Ue,o as Et,p as At,q as Be,r as jr,s as kr,t as Nr,u as Sr,v as Tr,w as Er,x as Ar,y as Cr,z as _r,A as Pr,B as zr,C as Rr,D as Lr,E as Ir,G as Or,H as Dr,I as $r,J as Mr,K as Vr,L as Fr,M as Hr,N as Ur,O as Br,P as Yr,Q as Gr}from"./icons-DAcGxVVW.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const Kr="modulepreload",qr=function(t){return"/"+t},at={},E=function(r,a,s){let n=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),i=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));n=Promise.allSettled(a.map(c=>{if(c=qr(c),c in at)return;at[c]=!0;const d=c.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const x=document.createElement("link");if(x.rel=d?"stylesheet":Kr,d||(x.as="script"),x.crossOrigin="",x.href=c,i&&x.setAttribute("nonce",i),document.head.appendChild(x),d)return new Promise((b,g)=>{x.addEventListener("load",b),x.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(l){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=l,window.dispatchEvent(i),!i.defaultPrevented)throw l}return n.then(l=>{for(const i of l||[])i.status==="rejected"&&o(i.reason);return r().catch(o)})};var Ae={},st=rr;Ae.createRoot=st.createRoot,Ae.hydrateRoot=st.hydrateRoot;var Xr=typeof Element<"u",Wr=typeof Map=="function",Qr=typeof Set=="function",Jr=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function le(t,r){if(t===r)return!0;if(t&&r&&typeof t=="object"&&typeof r=="object"){if(t.constructor!==r.constructor)return!1;var a,s,n;if(Array.isArray(t)){if(a=t.length,a!=r.length)return!1;for(s=a;s--!==0;)if(!le(t[s],r[s]))return!1;return!0}var o;if(Wr&&t instanceof Map&&r instanceof Map){if(t.size!==r.size)return!1;for(o=t.entries();!(s=o.next()).done;)if(!r.has(s.value[0]))return!1;for(o=t.entries();!(s=o.next()).done;)if(!le(s.value[1],r.get(s.value[0])))return!1;return!0}if(Qr&&t instanceof Set&&r instanceof Set){if(t.size!==r.size)return!1;for(o=t.entries();!(s=o.next()).done;)if(!r.has(s.value[0]))return!1;return!0}if(Jr&&ArrayBuffer.isView(t)&&ArrayBuffer.isView(r)){if(a=t.length,a!=r.length)return!1;for(s=a;s--!==0;)if(t[s]!==r[s])return!1;return!0}if(t.constructor===RegExp)return t.source===r.source&&t.flags===r.flags;if(t.valueOf!==Object.prototype.valueOf&&typeof t.valueOf=="function"&&typeof r.valueOf=="function")return t.valueOf()===r.valueOf();if(t.toString!==Object.prototype.toString&&typeof t.toString=="function"&&typeof r.toString=="function")return t.toString()===r.toString();if(n=Object.keys(t),a=n.length,a!==Object.keys(r).length)return!1;for(s=a;s--!==0;)if(!Object.prototype.hasOwnProperty.call(r,n[s]))return!1;if(Xr&&t instanceof Element)return!1;for(s=a;s--!==0;)if(!((n[s]==="_owner"||n[s]==="__v"||n[s]==="__o")&&t.$$typeof)&&!le(t[n[s]],r[n[s]]))return!1;return!0}return t!==t&&r!==r}var Zr=function(r,a){try{return le(r,a)}catch(s){if((s.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw s}};const ea=ue(Zr);var ta=function(t,r,a,s,n,o,l,i){if(!t){var c;if(r===void 0)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var d=[a,s,n,o,l,i],u=0;c=new Error(r.replace(/%s/g,function(){return d[u++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}},ra=ta;const nt=ue(ra);var aa=function(r,a,s,n){var o=s?s.call(n,r,a):void 0;if(o!==void 0)return!!o;if(r===a)return!0;if(typeof r!="object"||!r||typeof a!="object"||!a)return!1;var l=Object.keys(r),i=Object.keys(a);if(l.length!==i.length)return!1;for(var c=Object.prototype.hasOwnProperty.bind(a),d=0;d<l.length;d++){var u=l[d];if(!c(u))return!1;var x=r[u],b=a[u];if(o=s?s.call(n,x,b,u):void 0,o===!1||o===void 0&&x!==b)return!1}return!0};const sa=ue(aa);var Ct=(t=>(t.BASE="base",t.BODY="body",t.HEAD="head",t.HTML="html",t.LINK="link",t.META="meta",t.NOSCRIPT="noscript",t.SCRIPT="script",t.STYLE="style",t.TITLE="title",t.FRAGMENT="Symbol(react.fragment)",t))(Ct||{}),ye={link:{rel:["amphtml","canonical","alternate"]},script:{type:["application/ld+json"]},meta:{charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}},ot=Object.values(Ct),Ye={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},na=Object.entries(Ye).reduce((t,[r,a])=>(t[a]=r,t),{}),_="data-rh",G={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate",PRIORITIZE_SEO_TAGS:"prioritizeSeoTags"},K=(t,r)=>{for(let a=t.length-1;a>=0;a-=1){const s=t[a];if(Object.prototype.hasOwnProperty.call(s,r))return s[r]}return null},oa=t=>{let r=K(t,"title");const a=K(t,G.TITLE_TEMPLATE);if(Array.isArray(r)&&(r=r.join("")),a&&r)return a.replace(/%s/g,()=>r);const s=K(t,G.DEFAULT_TITLE);return r||s||void 0},ia=t=>K(t,G.ON_CHANGE_CLIENT_STATE)||(()=>{}),we=(t,r)=>r.filter(a=>typeof a[t]<"u").map(a=>a[t]).reduce((a,s)=>({...a,...s}),{}),la=(t,r)=>r.filter(a=>typeof a.base<"u").map(a=>a.base).reverse().reduce((a,s)=>{if(!a.length){const n=Object.keys(s);for(let o=0;o<n.length;o+=1){const i=n[o].toLowerCase();if(t.indexOf(i)!==-1&&s[i])return a.concat(s)}}return a},[]),ca=t=>console&&typeof console.warn=="function"&&console.warn(t),Q=(t,r,a)=>{const s={};return a.filter(n=>Array.isArray(n[t])?!0:(typeof n[t]<"u"&&ca(`Helmet: ${t} should be of type "Array". Instead found type "${typeof n[t]}"`),!1)).map(n=>n[t]).reverse().reduce((n,o)=>{const l={};o.filter(c=>{let d;const u=Object.keys(c);for(let b=0;b<u.length;b+=1){const g=u[b],j=g.toLowerCase();r.indexOf(j)!==-1&&!(d==="rel"&&c[d].toLowerCase()==="canonical")&&!(j==="rel"&&c[j].toLowerCase()==="stylesheet")&&(d=j),r.indexOf(g)!==-1&&(g==="innerHTML"||g==="cssText"||g==="itemprop")&&(d=g)}if(!d||!c[d])return!1;const x=c[d].toLowerCase();return s[d]||(s[d]={}),l[d]||(l[d]={}),s[d][x]?!1:(l[d][x]=!0,!0)}).reverse().forEach(c=>n.push(c));const i=Object.keys(l);for(let c=0;c<i.length;c+=1){const d=i[c],u={...s[d],...l[d]};s[d]=u}return n},[]).reverse()},da=(t,r)=>{if(Array.isArray(t)&&t.length){for(let a=0;a<t.length;a+=1)if(t[a][r])return!0}return!1},ua=t=>({baseTag:la(["href"],t),bodyAttributes:we("bodyAttributes",t),defer:K(t,G.DEFER),encode:K(t,G.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:we("htmlAttributes",t),linkTags:Q("link",["rel","href"],t),metaTags:Q("meta",["name","charset","http-equiv","property","itemprop"],t),noscriptTags:Q("noscript",["innerHTML"],t),onChangeClientState:ia(t),scriptTags:Q("script",["src","innerHTML"],t),styleTags:Q("style",["cssText"],t),title:oa(t),titleAttributes:we("titleAttributes",t),prioritizeSeoTags:da(t,G.PRIORITIZE_SEO_TAGS)}),_t=t=>Array.isArray(t)?t.join(""):t,pa=(t,r)=>{const a=Object.keys(t);for(let s=0;s<a.length;s+=1)if(r[a[s]]&&r[a[s]].includes(t[a[s]]))return!0;return!1},je=(t,r)=>Array.isArray(t)?t.reduce((a,s)=>(pa(s,r)?a.priority.push(s):a.default.push(s),a),{priority:[],default:[]}):{default:t,priority:[]},it=(t,r)=>({...t,[r]:void 0}),fa=["noscript","script","style"],Ce=(t,r=!0)=>r===!1?String(t):String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),Pt=t=>Object.keys(t).reduce((r,a)=>{const s=typeof t[a]<"u"?`${a}="${t[a]}"`:`${a}`;return r?`${r} ${s}`:s},""),xa=(t,r,a,s)=>{const n=Pt(a),o=_t(r);return n?`<${t} ${_}="true" ${n}>${Ce(o,s)}</${t}>`:`<${t} ${_}="true">${Ce(o,s)}</${t}>`},ma=(t,r,a=!0)=>r.reduce((s,n)=>{const o=n,l=Object.keys(o).filter(d=>!(d==="innerHTML"||d==="cssText")).reduce((d,u)=>{const x=typeof o[u]>"u"?u:`${u}="${Ce(o[u],a)}"`;return d?`${d} ${x}`:x},""),i=o.innerHTML||o.cssText||"",c=fa.indexOf(t)===-1;return`${s}<${t} ${_}="true" ${l}${c?"/>":`>${i}</${t}>`}`},""),zt=(t,r={})=>Object.keys(t).reduce((a,s)=>{const n=Ye[s];return a[n||s]=t[s],a},r),ha=(t,r,a)=>{const s={key:r,[_]:!0},n=zt(a,s);return[P.createElement("title",n,r)]},ce=(t,r)=>r.map((a,s)=>{const n={key:s,[_]:!0};return Object.keys(a).forEach(o=>{const i=Ye[o]||o;if(i==="innerHTML"||i==="cssText"){const c=a.innerHTML||a.cssText;n.dangerouslySetInnerHTML={__html:c}}else n[i]=a[o]}),P.createElement(t,n)}),C=(t,r,a=!0)=>{switch(t){case"title":return{toComponent:()=>ha(t,r.title,r.titleAttributes),toString:()=>xa(t,r.title,r.titleAttributes,a)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>zt(r),toString:()=>Pt(r)};default:return{toComponent:()=>ce(t,r),toString:()=>ma(t,r,a)}}},ga=({metaTags:t,linkTags:r,scriptTags:a,encode:s})=>{const n=je(t,ye.meta),o=je(r,ye.link),l=je(a,ye.script);return{priorityMethods:{toComponent:()=>[...ce("meta",n.priority),...ce("link",o.priority),...ce("script",l.priority)],toString:()=>`${C("meta",n.priority,s)} ${C("link",o.priority,s)} ${C("script",l.priority,s)}`},metaTags:n.default,linkTags:o.default,scriptTags:l.default}},ba=t=>{const{baseTag:r,bodyAttributes:a,encode:s=!0,htmlAttributes:n,noscriptTags:o,styleTags:l,title:i="",titleAttributes:c,prioritizeSeoTags:d}=t;let{linkTags:u,metaTags:x,scriptTags:b}=t,g={toComponent:()=>{},toString:()=>""};return d&&({priorityMethods:g,linkTags:u,metaTags:x,scriptTags:b}=ga(t)),{priority:g,base:C("base",r,s),bodyAttributes:C("bodyAttributes",a,s),htmlAttributes:C("htmlAttributes",n,s),link:C("link",u,s),meta:C("meta",x,s),noscript:C("noscript",o,s),script:C("script",b,s),style:C("style",l,s),title:C("title",{title:i,titleAttributes:c},s)}},_e=ba,oe=[],Rt=!!(typeof window<"u"&&window.document&&window.document.createElement),Pe=class{constructor(t,r){L(this,"instances",[]);L(this,"canUseDOM",Rt);L(this,"context");L(this,"value",{setHelmet:t=>{this.context.helmet=t},helmetInstances:{get:()=>this.canUseDOM?oe:this.instances,add:t=>{(this.canUseDOM?oe:this.instances).push(t)},remove:t=>{const r=(this.canUseDOM?oe:this.instances).indexOf(t);(this.canUseDOM?oe:this.instances).splice(r,1)}}});this.context=t,this.canUseDOM=r||!1,r||(t.helmet=_e({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},va={},Lt=P.createContext(va),V,It=(V=class extends p.Component{constructor(a){super(a);L(this,"helmetData");this.helmetData=new Pe(this.props.context||{},V.canUseDOM)}render(){return P.createElement(Lt.Provider,{value:this.helmetData.value},this.props.children)}},L(V,"canUseDOM",Rt),V),B=(t,r)=>{const a=document.head||document.querySelector("head"),s=a.querySelectorAll(`${t}[${_}]`),n=[].slice.call(s),o=[];let l;return r&&r.length&&r.forEach(i=>{const c=document.createElement(t);for(const d in i)if(Object.prototype.hasOwnProperty.call(i,d))if(d==="innerHTML")c.innerHTML=i.innerHTML;else if(d==="cssText")c.styleSheet?c.styleSheet.cssText=i.cssText:c.appendChild(document.createTextNode(i.cssText));else{const u=d,x=typeof i[u]>"u"?"":i[u];c.setAttribute(d,x)}c.setAttribute(_,"true"),n.some((d,u)=>(l=u,c.isEqualNode(d)))?n.splice(l,1):o.push(c)}),n.forEach(i=>{var c;return(c=i.parentNode)==null?void 0:c.removeChild(i)}),o.forEach(i=>a.appendChild(i)),{oldTags:n,newTags:o}},ze=(t,r)=>{const a=document.getElementsByTagName(t)[0];if(!a)return;const s=a.getAttribute(_),n=s?s.split(","):[],o=[...n],l=Object.keys(r);for(const i of l){const c=r[i]||"";a.getAttribute(i)!==c&&a.setAttribute(i,c),n.indexOf(i)===-1&&n.push(i);const d=o.indexOf(i);d!==-1&&o.splice(d,1)}for(let i=o.length-1;i>=0;i-=1)a.removeAttribute(o[i]);n.length===o.length?a.removeAttribute(_):a.getAttribute(_)!==l.join(",")&&a.setAttribute(_,l.join(","))},ya=(t,r)=>{typeof t<"u"&&document.title!==t&&(document.title=_t(t)),ze("title",r)},lt=(t,r)=>{const{baseTag:a,bodyAttributes:s,htmlAttributes:n,linkTags:o,metaTags:l,noscriptTags:i,onChangeClientState:c,scriptTags:d,styleTags:u,title:x,titleAttributes:b}=t;ze("body",s),ze("html",n),ya(x,b);const g={baseTag:B("base",a),linkTags:B("link",o),metaTags:B("meta",l),noscriptTags:B("noscript",i),scriptTags:B("script",d),styleTags:B("style",u)},j={},w={};Object.keys(g).forEach(S=>{const{newTags:k,oldTags:H}=g[S];k.length&&(j[S]=k),H.length&&(w[S]=g[S].oldTags)}),r&&r(),c(t,j,w)},J=null,wa=t=>{J&&cancelAnimationFrame(J),t.defer?J=requestAnimationFrame(()=>{lt(t,()=>{J=null})}):(lt(t),J=null)},ja=wa,ct=class extends p.Component{constructor(){super(...arguments);L(this,"rendered",!1)}shouldComponentUpdate(r){return!sa(r,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:r}=this.props.context;r.remove(this),this.emitChange()}emitChange(){const{helmetInstances:r,setHelmet:a}=this.props.context;let s=null;const n=ua(r.get().map(o=>{const l={...o.props};return delete l.context,l}));It.canUseDOM?ja(n):_e&&(s=_e(n)),a(s)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:r}=this.props.context;r.add(this),this.emitChange()}render(){return this.init(),null}},Te,_n=(Te=class extends p.Component{shouldComponentUpdate(t){return!ea(it(this.props,"helmetData"),it(t,"helmetData"))}mapNestedChildrenToProps(t,r){if(!r)return null;switch(t.type){case"script":case"noscript":return{innerHTML:r};case"style":return{cssText:r};default:throw new Error(`<${t.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(t,r,a,s){return{...r,[t.type]:[...r[t.type]||[],{...a,...this.mapNestedChildrenToProps(t,s)}]}}mapObjectTypeChildren(t,r,a,s){switch(t.type){case"title":return{...r,[t.type]:s,titleAttributes:{...a}};case"body":return{...r,bodyAttributes:{...a}};case"html":return{...r,htmlAttributes:{...a}};default:return{...r,[t.type]:{...a}}}}mapArrayTypeChildrenToProps(t,r){let a={...r};return Object.keys(t).forEach(s=>{a={...a,[s]:t[s]}}),a}warnOnInvalidChildren(t,r){return nt(ot.some(a=>t.type===a),typeof t.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${ot.join(", ")} are allowed. Helmet does not support rendering <${t.type}> elements. Refer to our API for more information.`),nt(!r||typeof r=="string"||Array.isArray(r)&&!r.some(a=>typeof a!="string"),`Helmet expects a string as a child of <${t.type}>. Did you forget to wrap your children in braces? ( <${t.type}>{\`\`}</${t.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(t,r){let a={};return P.Children.forEach(t,s=>{if(!s||!s.props)return;const{children:n,...o}=s.props,l=Object.keys(o).reduce((c,d)=>(c[na[d]||d]=o[d],c),{});let{type:i}=s;switch(typeof i=="symbol"?i=i.toString():this.warnOnInvalidChildren(s,n),i){case"Symbol(react.fragment)":r=this.mapChildrenToProps(n,r);break;case"link":case"meta":case"noscript":case"script":case"style":a=this.flattenArrayTypeChildren(s,a,l,n);break;default:r=this.mapObjectTypeChildren(s,r,l,n);break}}),this.mapArrayTypeChildrenToProps(a,r)}render(){const{children:t,...r}=this.props;let a={...r},{helmetData:s}=r;if(t&&(a=this.mapChildrenToProps(t,a)),s&&!(s instanceof Pe)){const n=s;s=new Pe(n.context,!0),delete a.helmetData}return s?P.createElement(ct,{...a,context:s.value}):P.createElement(Lt.Consumer,null,n=>P.createElement(ct,{...a,context:n}))}},L(Te,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),Te);const ka={},dt=t=>{let r;const a=new Set,s=(u,x)=>{const b=typeof u=="function"?u(r):u;if(!Object.is(b,r)){const g=r;r=x??(typeof b!="object"||b===null)?b:Object.assign({},r,b),a.forEach(j=>j(r,g))}},n=()=>r,c={setState:s,getState:n,getInitialState:()=>d,subscribe:u=>(a.add(u),()=>a.delete(u)),destroy:()=>{(ka?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),a.clear()}},d=r=t(s,n,c);return c},Na=t=>t?dt(t):dt;var Ot={exports:{}},Dt={},$t={exports:{}},Mt={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var q=p;function Sa(t,r){return t===r&&(t!==0||1/t===1/r)||t!==t&&r!==r}var Ta=typeof Object.is=="function"?Object.is:Sa,Ea=q.useState,Aa=q.useEffect,Ca=q.useLayoutEffect,_a=q.useDebugValue;function Pa(t,r){var a=r(),s=Ea({inst:{value:a,getSnapshot:r}}),n=s[0].inst,o=s[1];return Ca(function(){n.value=a,n.getSnapshot=r,ke(n)&&o({inst:n})},[t,a,r]),Aa(function(){return ke(n)&&o({inst:n}),t(function(){ke(n)&&o({inst:n})})},[t]),_a(a),a}function ke(t){var r=t.getSnapshot;t=t.value;try{var a=r();return!Ta(t,a)}catch{return!0}}function za(t,r){return r()}var Ra=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?za:Pa;Mt.useSyncExternalStore=q.useSyncExternalStore!==void 0?q.useSyncExternalStore:Ra;$t.exports=Mt;var La=$t.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var me=p,Ia=La;function Oa(t,r){return t===r&&(t!==0||1/t===1/r)||t!==t&&r!==r}var Da=typeof Object.is=="function"?Object.is:Oa,$a=Ia.useSyncExternalStore,Ma=me.useRef,Va=me.useEffect,Fa=me.useMemo,Ha=me.useDebugValue;Dt.useSyncExternalStoreWithSelector=function(t,r,a,s,n){var o=Ma(null);if(o.current===null){var l={hasValue:!1,value:null};o.current=l}else l=o.current;o=Fa(function(){function c(g){if(!d){if(d=!0,u=g,g=s(g),n!==void 0&&l.hasValue){var j=l.value;if(n(j,g))return x=j}return x=g}if(j=x,Da(u,g))return j;var w=s(g);return n!==void 0&&n(j,w)?(u=g,j):(u=g,x=w)}var d=!1,u,x,b=a===void 0?null:a;return[function(){return c(r())},b===null?void 0:function(){return c(b())}]},[r,a,s,n]);var i=$a(t,o[0],o[1]);return Va(function(){l.hasValue=!0,l.value=i},[i]),Ha(i),i};Ot.exports=Dt;var Ua=Ot.exports;const Ba=ue(Ua),Vt={},{useDebugValue:Ya}=P,{useSyncExternalStoreWithSelector:Ga}=Ba;let ut=!1;const Ka=t=>t;function qa(t,r=Ka,a){(Vt?"production":void 0)!=="production"&&a&&!ut&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),ut=!0);const s=Ga(t.subscribe,t.getState,t.getServerState||t.getInitialState,r,a);return Ya(s),s}const pt=t=>{(Vt?"production":void 0)!=="production"&&typeof t!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const r=typeof t=="function"?Na(t):t,a=(s,n)=>qa(r,s,n);return Object.assign(a,r),a},he=t=>t?pt(t):pt,ee=he((t,r)=>({user:null,profile:null,isAdmin:!1,authLoading:!0,profileLoading:!1,setUser:a=>t({user:a}),setProfile:a=>t({profile:a}),setIsAdmin:a=>t({isAdmin:a}),setAuthLoading:a=>t({authLoading:a}),setProfileLoading:a=>t({profileLoading:a}),clearAuth:()=>t({user:null,profile:null,isAdmin:!1,authLoading:!1,profileLoading:!1}),isLoggedIn:()=>!!r().user,isEmailVerified:()=>{var a;return((a=r().user)==null?void 0:a.emailVerified)===!0},getUID:()=>{var a;return((a=r().user)==null?void 0:a.uid)||null},getDisplayName:()=>{var a,s;return((a=r().profile)==null?void 0:a.display_name)||((s=r().user)==null?void 0:s.displayName)||"Anonymous"},getAvatar:()=>{var a,s;return((a=r().profile)==null?void 0:a.photo_url)||((s=r().user)==null?void 0:s.photoURL)||null}})),Xa={apiKey:"AIzaSyAh9PtrVo1UWApQw3oLT-Ol2Cu4iA5wawA",authDomain:"mdturzo.firebaseapp.com",databaseURL:"https://mdturzo-default-rtdb.firebaseio.com",projectId:"mdturzo",storageBucket:"mdturzo.firebasestorage.app",messagingSenderId:"13751895485",appId:"1:13751895485:web:be068cfd6f46f945d3fed4",measurementId:"G-SHM2013GKK"},Ge=or().length===0?ir(Xa):lr(),Ft=cr(Ge),$=dr(Ge);let Wa=null;ur().then(t=>{t&&(Wa=pr(Ge))}).catch(()=>{});const Ht=new fr,Qa=new xr,R=new mr;Ht.addScope("profile");Ht.addScope("email");Qa.addScope("user:email");R.addScope("email");R.addScope("public_profile");R.addScope("user_age_range");R.addScope("user_birthday");R.addScope("user_friends");R.addScope("user_gender");R.addScope("user_hometown");R.addScope("user_likes");R.addScope("user_link");R.addScope("user_location");const Ke=()=>gr(Ft),Ja=t=>hr(Ft,t),Za=t=>{const r=D($,`presence/${t}`);St(r,{online:!0,lastSeen:de()}),vr(r).update({online:!1,lastSeen:de()})},es=t=>{const r=D($,`presence/${t}`);kt(r,{online:!1,lastSeen:de()})},ts=async t=>{try{const r=await Nt(D($,`admins/${t}`));return r.exists()&&r.val()===!0}catch{return!1}},rs=t=>t.trim().toLowerCase().replace(/\./g,","),as=async t=>{const r=t.trim().toLowerCase(),a=rs(r),s=D($,`subscribers/${a}`),n=D($,"subscriberCount");return(await Nt(s)).exists()?{success:!1,duplicate:!0}:(await St(s,{email:r,subscribedAt:de(),active:!0}),await kt(n,{count:br(1)}),{success:!0,duplicate:!1})},ss=t=>{const r=D($,"subscriberCount");return Oe(r,a=>{const s=a.val();t((s==null?void 0:s.count)??0)}),()=>De(r)},ns=t=>{const r=D($,"notifications");return Oe(r,a=>{const s=[];a.exists()&&a.forEach(n=>{s.push({id:n.key,...n.val()})}),t(s)}),()=>De(r)},os=(t,r)=>{const a=D($,`notificationReads/${t}`);return Oe(a,s=>{r(s.val()||{})}),()=>De(a)},is="https://kddyucerqiwvjmuwebjv.supabase.co",ls="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkZHl1Y2VycWl3dmptdXdlYmp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNjAxODAsImV4cCI6MjA5MzczNjE4MH0.hKz4BGIzFyAmuDdEQJsRbTu42eARtNLty81JJY4c3y8",qe=yr(is,ls,{auth:{persistSession:!1,autoRefreshToken:!1,detectSessionInUrl:!1},global:{headers:{"X-Client-Info":"mdturzo-portfolio/2.0.0"}},db:{schema:"public"},realtime:{params:{eventsPerSecond:10}}});async function Pn(){const{data:t,error:r}=await qe.from("page_visibility").select("page, visibility");if(r)throw r;return t.reduce((a,s)=>(a[s.page]=s.visibility,a),{})}async function cs(t){const{data:r,error:a}=await qe.from("users").select("*").eq("id",t).single();if(a&&a.code!=="PGRST116")throw a;return r}async function zn(t,r=null,a=null){const{error:s}=await qe.from("analytics").insert({page:t,event:"page_view",user_id:r,ip_address:a});s&&console.warn("[Analytics] Track failed:",s.message)}function ds(){const{setUser:t,setProfile:r,setIsAdmin:a,setAuthLoading:s,setProfileLoading:n,clearAuth:o}=ee();p.useEffect(()=>{const l=Ja(async i=>{if(i){t(i),n(!0);try{const c=await cs(i.uid);r(c||null);const d=await ts(i.uid);a(d),Za(i.uid)}catch(c){console.warn("[useAuth] Profile/admin load failed:",c.message),r(null),a(!1)}finally{n(!1),s(!1)}}else o()});return()=>{const{user:i}=ee.getState();i&&es(i.uid),l()}},[])}function us(){return ee(t=>({user:t.user,profile:t.profile,isAdmin:t.isAdmin,authLoading:t.authLoading,profileLoading:t.profileLoading,isLoggedIn:t.isLoggedIn(),isEmailVerified:t.isEmailVerified(),uid:t.getUID(),displayName:t.getDisplayName(),avatar:t.getAvatar()}))}const Xe=he((t,r)=>({notifications:[],reads:{},unreadCount:0,isOpen:!1,unsubscribe:null,setNotifications:a=>{const{reads:s}=r(),n=a.filter(o=>o.active&&!s[o.id]).length;t({notifications:a,unreadCount:n})},setReads:a=>{const{notifications:s}=r(),n=s.filter(o=>o.active&&!a[o.id]).length;t({reads:a,unreadCount:n})},markRead:a=>{t(s=>{const n={...s.reads,[a]:!0},o=s.notifications.filter(l=>l.active&&!n[l.id]).length;return{reads:n,unreadCount:o}})},markAllRead:()=>{const{notifications:a}=r(),s=a.reduce((n,o)=>(n[o.id]=!0,n),{});t({reads:s,unreadCount:0})},toggleOpen:()=>t(a=>({isOpen:!a.isOpen})),setOpen:a=>t({isOpen:a}),setUnsubscribe:a=>t({unsubscribe:a}),cleanup:()=>{const{unsubscribe:a}=r();a&&a(),t({notifications:[],reads:{},unreadCount:0,isOpen:!1,unsubscribe:null})}}));function ps(){const t=ee(o=>o.getUID()),{setNotifications:r,setReads:a,setUnsubscribe:s,cleanup:n}=Xe();p.useEffect(()=>{const o=ns(i=>{const c=Date.now(),d=i.filter(u=>u.active!==!1&&(!u.expires_at||new Date(u.expires_at).getTime()>c));r(d)});let l=()=>{};return t&&(l=os(t,i=>a(i||{}))),s(()=>{o(),l()}),()=>{o(),l()}},[t])}function Ut(){return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function fs(){return localStorage.getItem("theme")||"dark"}function Re(t){const r=t==="system"?Ut():t;document.documentElement.setAttribute("data-theme",r),r==="dark"?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}const Bt=he((t,r)=>{const a=fs();return Re(a),{theme:a,setTheme:s=>{localStorage.setItem("theme",s),Re(s),t({theme:s})},toggleTheme:()=>{const n=r().theme==="dark"?"light":"dark";r().setTheme(n)},isDark:()=>{const s=r().theme;return s==="dark"||s==="system"&&Ut()==="dark"}}});typeof window<"u"&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{const{theme:t}=Bt.getState();t==="system"&&Re("system")});function Yt(){const{isAdmin:t,authLoading:r}=ee(a=>({isAdmin:a.isAdmin,authLoading:a.authLoading}));return{isAdmin:t,authLoading:r}}const y={version:"v2.1.4",siteName:"Muhtasim Rahman",navName:"Muhtasim",siteTagline:"Web Developer & Designer",siteURL:"https://mdturzo.web.app",workerURL:"https://portfolio.programs-turzo.workers.dev",owner:{fullName:"Md Muhtasim Rahman Mahmud",displayName:"Muhtasim Rahman",nickname:"Turzo",email:"mdturzo.dev@gmail.com",location:"Nilphamari, Bangladesh",fakeDOB:"2007-09-13",github:"https://github.com/muhtasim-rahman",oldPortfolio:"https://mdturzo.odoo.com",bio:"A dedicated web developer passionate about creating user-friendly and visually stunning websites. Focused on quality, innovation, and transforming complex ideas into simple, elegant solutions."},social:{facebook:"https://facebook.com/mdturzo999",instagram:"https://instagram.com/mdturzo999",youtube:"https://youtube.com/@mdturzo999",twitter:"https://twitter.com/mdturzo999",linkedin:"https://linkedin.com/in/mdturzo999",tiktok:"https://tiktok.com/@mdturzo16",telegram:"https://t.me/mdturzo16",github:"https://github.com/muhtasim-rahman",threads:"https://www.threads.net/mdturzo999"},seo:{defaultOGImage:"/preview.png",defaultDescription:"Self-taught web developer & designer from Bangladesh — building clean, fast and meaningful digital experiences.",defaultKeywords:"Muhtasim Rahman, Turzo, web developer, Bangladesh, portfolio, mdturzo",twitterHandle:"@mdturzo999"},defaults:{statsYearsDev:"3+",statsYearsDesign:"6+",statsProjects:"16+",availableForWork:!0,cvEnabled:!1,cvUrl:""}};let xs=0;const ms={success:3e3,info:3e3,warning:3e3,error:3e3},z=he((t,r)=>({toasts:[],addToast:({type:a="info",title:s,message:n,duration:o})=>{const l=++xs,i=o??ms[a],c={id:l,type:a,title:s,message:n,duration:i};return t(d=>({toasts:[c,...d.toasts].slice(0,3)})),i&&setTimeout(()=>r().removeToast(l),i),l},removeToast:a=>{t(s=>({toasts:s.toasts.filter(n=>n.id!==a)}))},success:(a,s)=>z.getState().addToast({type:"success",title:a,message:s}),error:(a,s)=>z.getState().addToast({type:"error",title:a,message:s}),warning:(a,s)=>z.getState().addToast({type:"warning",title:a,message:s}),info:(a,s)=>z.getState().addToast({type:"info",title:a,message:s})})),te={success:(t,r)=>z.getState().success(t,r),error:(t,r)=>z.getState().error(t,r),warning:(t,r)=>z.getState().warning(t,r),info:(t,r)=>z.getState().info(t,r)};function Gt(){const[t,r]=p.useState([]),a=p.useCallback(s=>{const o=s.currentTarget.getBoundingClientRect(),l=Math.max(o.width,o.height)*2,i=s.clientX-o.left-l/2,c=s.clientY-o.top-l/2,d=`${Date.now()}-${Math.random()}`;r(u=>[...u,{id:d,x:i,y:c,size:l}]),setTimeout(()=>r(u=>u.filter(x=>x.id!==d)),580)},[]);return{ripples:t,createRipple:a}}function Kt({ripples:t,color:r}){return e.jsx(e.Fragment,{children:t.map(({id:a,x:s,y:n,size:o})=>e.jsx("span",{"aria-hidden":!0,style:{position:"absolute",left:s,top:n,width:o,height:o,borderRadius:"50%",background:`radial-gradient(circle, ${r} 0%, ${r} 42%, transparent 72%)`,boxShadow:`0 0 ${Math.round(o/5)}px ${r}`,transform:"scale(0)",animation:"ripple-expand 0.62s cubic-bezier(0.16, 1, 0.3, 1) forwards",pointerEvents:"none"}},a))})}const hs=450,ft={active:{color:"#22c55e",label:"Active",pulse:!0},busy:{color:"#ef4444",label:"Busy",pulse:!1},away:{color:"#f59e0b",label:"Away",pulse:!1},offline:{color:"#6b7280",label:"Offline",pulse:!1}},gs="active",Ne=[{label:"Home",path:"/",icon:$e,title:"Go back to the main homepage"},{label:"About",path:"/about",icon:Me,title:"Learn about my journey and skills"},{label:"Projects",path:"/projects",icon:fe,title:"Browse projects I have built"},{label:"Feed",path:"/feed",icon:Ve,title:"Read my blogs and latest posts"},{label:"Contact",path:"/contact",icon:Fe,title:"Send me a message or say hello"}],bs=[{label:"Pages",items:[{label:"Home",path:"/",icon:$e},{label:"About",path:"/about",icon:Me},{label:"Projects",path:"/projects",icon:fe},{label:"Feed",path:"/feed",icon:Ve},{label:"Contact",path:"/contact",icon:Fe}]},{label:"Account",items:[{label:"My Profile",path:"/profile",icon:xe},{label:"Admin Panel",path:"/admin",icon:F},{label:"Sign In",path:"/login",icon:Ue},{label:"Sign Up",path:"/signup",icon:Et}]},{label:"Legal",items:[{label:"Privacy Policy",path:"/privacy-policy",icon:F},{label:"Cookies Policy",path:"/cookies-policy",icon:He},{label:"Terms of Use",path:"/terms",icon:Sr},{label:"Sitemap",path:"/sitemap.xml",icon:At,external:!0}]}],xt=[{label:"Home",path:"/",icon:$e,group:"Page",keywords:"main homepage intro"},{label:"About",path:"/about",icon:Me,group:"Page",keywords:"journey skills profile"},{label:"Projects",path:"/projects",icon:fe,group:"Page",keywords:"portfolio work case study"},{label:"Feed",path:"/feed",icon:Ve,group:"Page",keywords:"blogs posts updates"},{label:"Contact",path:"/contact",icon:Fe,group:"Page",keywords:"message email collaborate"},{label:"My Profile",path:"/profile",icon:xe,group:"Account",keywords:"account user dashboard"},{label:"Sign In",path:"/login",icon:Ue,group:"Account",keywords:"login auth"},{label:"Sign Up",path:"/signup",icon:Et,group:"Account",keywords:"register create account"},{label:"Privacy Policy",path:"/privacy-policy",icon:F,group:"Legal",keywords:"privacy data policy"},{label:"Cookies Policy",path:"/cookies-policy",icon:He,group:"Legal",keywords:"cookie browser storage"},{label:"Sitemap",path:"/sitemap.xml",icon:At,group:"Utility",keywords:"links xml map",external:!0}];function qt(t){const r=t.trim().toLowerCase();return r?xt.filter(a=>`${a.label} ${a.group} ${a.path} ${a.keywords}`.toLowerCase().includes(r)).slice(0,8):xt.slice(0,6)}const mt=[{icon:Ar,url:y.social.youtube,label:"@mdturzo999",cls:"text-red-500"},{icon:Cr,url:y.social.facebook,label:"mdturzo999",cls:"text-blue-500"},{icon:_r,url:y.social.instagram,label:"@mdturzo999",cls:"text-pink-500"},{icon:Pr,url:y.social.github,label:"muhtasim-rahman",cls:"text-purple-400"},{icon:zr,url:y.social.twitter,label:"@mdturzo999",cls:"text-sky-400"},{icon:Rr,url:y.social.linkedin,label:"mdturzo999",cls:"text-blue-400"},{icon:Lr,url:y.social.telegram,label:"@mdturzo16",cls:"text-sky-400"},{icon:Ir,url:y.social.tiktok,label:"@mdturzo16",cls:"text-pink-400"}],vs={hidden:{y:-80,opacity:0},visible:{y:0,opacity:1,transition:{type:"spring",stiffness:320,damping:28}},exit:{y:-80,opacity:0,transition:{duration:.2,ease:"easeIn"}}},ys={hidden:{opacity:0,y:-10,scaleY:.96,transformOrigin:"top"},visible:{opacity:1,y:0,scaleY:1,transition:{duration:.22,ease:[.16,1,.3,1]}},exit:{opacity:0,y:-10,scaleY:.96,transition:{duration:.14}}},ws={closed:{x:"100%",transition:{type:"tween",duration:.28,ease:[.4,0,.2,1]}},open:{x:"0%",transition:{type:"tween",duration:.28,ease:[.4,0,.2,1]}}},Xt={hidden:{opacity:0,y:-6,scale:.96,transformOrigin:"top right"},visible:{opacity:1,y:0,scale:1,transition:{duration:.18}},exit:{opacity:0,y:-6,scale:.96,transition:{duration:.12}}};function js({mode:t=gs,size:r="md"}){const a=ft[t]||ft.active,s=r==="sm"?"w-2.5 h-2.5 border-[1.5px]":"w-3 h-3 border-2";return e.jsx("span",{className:`absolute -bottom-0.5 -right-0.5 ${s} rounded-full border-[var(--bg-page)] transition-colors`,style:{background:a.color},title:a.label,"aria-label":`Status: ${a.label}`})}function Se({size:t="md",showName:r=!0,rounded:a=!1,onClick:s}){const[n,o]=p.useState("/logo.webp"),l=t==="sm"?"w-7 h-7 text-sm":"w-9 h-9 text-base",i=a?"rounded-full":"rounded-[10px]";return e.jsxs(A,{to:"/",onClick:s,className:"flex-shrink-0 flex items-center gap-2.5 select-none group h-9",children:[e.jsxs("div",{className:`relative ${l} ${i} flex items-center justify-center flex-shrink-0 overflow-visible`,children:[e.jsx("img",{src:n,alt:"Muhtasim logo",onError:()=>o("/android-chrome-192x192.png"),className:`${l} ${i} object-cover border border-[var(--border-color)] bg-[var(--bg-surface-2)]`}),e.jsx(js,{size:t})]}),r&&e.jsx("span",{className:"font-mono font-bold text-[17px] text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors",children:y.navName})]})}function Le({size:t="md",className:r=""}){const{toggleTheme:a,isDark:s}=Bt(),n=s(),o=t==="sm"?"w-8 h-8 text-sm":"w-9 h-9 text-base";return e.jsx("button",{onClick:a,className:`${o} relative flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors ${r}`,"aria-label":"Toggle theme","data-tooltip":n?"Light mode":"Dark mode",children:e.jsx(v.AnimatePresence,{mode:"wait",initial:!1,children:n?e.jsx(v.motion.span,{initial:{opacity:0,rotate:-90,scale:.5},animate:{opacity:1,rotate:0,scale:1},exit:{opacity:0,rotate:90,scale:.5},transition:{duration:.18},children:e.jsx(m,{icon:kr})},"sun"):e.jsx(v.motion.span,{initial:{opacity:0,rotate:90,scale:.5},animate:{opacity:1,rotate:0,scale:1},exit:{opacity:0,rotate:-90,scale:.5},transition:{duration:.18},children:e.jsx(m,{icon:Nr})},"moon")})})}function Y({icon:t,onClick:r,label:a,badge:s,active:n,className:o="",tooltipSide:l}){const{ripples:i,createRipple:c}=Gt(),d=u=>{c(u),r==null||r(u)};return e.jsxs("button",{onClick:d,className:`relative overflow-hidden w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors ${n?"bg-[var(--accent-light)] text-[var(--accent-primary)] border-[var(--accent-primary)]":"bg-[var(--bg-surface-2)]"} ${o}`,"aria-label":a,"data-tooltip":a,"data-tooltip-side":l,"data-ripple-managed":"true",children:[e.jsx(Kt,{ripples:i,color:"rgba(59,130,246,0.2)"}),e.jsx(m,{icon:t}),s>0&&e.jsx("span",{className:"absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[var(--clr-error)] text-white text-[9px] font-bold leading-none",children:s>9?"9+":s})]})}function Ie({className:t=""}){const{ripples:r,createRipple:a}=Gt();return e.jsxs(A,{to:"/login",onClick:a,title:"Sign in to your account","data-ripple-managed":"true",className:`relative overflow-hidden h-9 flex items-center gap-1.5 px-4 py-0 rounded-full bg-[var(--accent-primary)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors ${t}`,children:[e.jsx(Kt,{ripples:r,color:"rgba(255,255,255,0.3)"}),e.jsx(m,{icon:Ue,className:"text-xs"}),"Sign In"]})}function ks({onClose:t}){const{notifications:r,reads:a,markRead:s,markAllRead:n,unreadCount:o}=Xe(),l=Date.now(),i=r.filter(c=>c.active&&(!c.expires_at||new Date(c.expires_at).getTime()>l));return e.jsxs(v.motion.div,{variants:Xt,initial:"hidden",animate:"visible",exit:"exit",className:"notif-panel absolute right-0 top-full mt-2 w-80 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-xl)] overflow-hidden z-[9999]",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)]",children:[e.jsxs("span",{className:"font-semibold text-sm text-[var(--text-primary)]",children:["Notifications",o>0&&e.jsx("span",{className:"ml-1.5 px-1.5 py-0.5 rounded-full bg-[var(--clr-error)] text-white text-[9px] font-bold",children:o})]}),o>0&&e.jsx("button",{onClick:n,className:"text-xs text-[var(--accent-primary)] hover:underline",children:"Mark all read"})]}),e.jsx("div",{className:"max-h-64 overflow-y-auto",children:i.length===0?e.jsxs("div",{className:"py-8 text-center text-[var(--text-tertiary)] text-sm",children:[e.jsx(m,{icon:Be,className:"text-2xl mb-2 opacity-30"}),e.jsx("p",{children:"No notifications"})]}):i.map(c=>e.jsxs("button",{onClick:()=>{s(c.id),c.link&&(window.location.href=c.link),t()},className:`w-full text-left px-4 py-3 flex gap-3 hover:bg-[var(--bg-surface-2)] transition-colors border-b border-[var(--border-color)] last:border-0 ${a[c.id]?"":"bg-[var(--accent-light)]"}`,children:[e.jsx("span",{className:"w-2 h-2 rounded-full flex-shrink-0 mt-1.5",style:{background:a[c.id]?"transparent":"var(--accent-primary)"}}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"text-sm font-medium text-[var(--text-primary)] truncate",children:c.title}),e.jsx("p",{className:"text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2",children:c.message})]})]},c.id))})]})}function Ns({user:t,profile:r,isAdmin:a,avatar:s,displayName:n,onClose:o}){var c;const l=pe(),i=async()=>{try{await Ke(),o(),l("/")}catch(d){te.error("Logout failed",d.message)}};return e.jsxs(v.motion.div,{variants:Xt,initial:"hidden",animate:"visible",exit:"exit",className:"user-panel absolute right-0 top-full mt-2 w-52 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-xl)] overflow-hidden z-[9999]",children:[e.jsxs("div",{className:"px-4 py-3 border-b border-[var(--border-color)] flex items-center gap-2.5",children:[e.jsx("div",{className:"w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-[var(--border-color)]",children:s?e.jsx("img",{src:s,alt:n,className:"w-full h-full object-cover"}):e.jsx("div",{className:"w-full h-full bg-[var(--accent-light)] flex items-center justify-center",children:e.jsx("span",{className:"text-[var(--accent-primary)] text-xs font-bold",children:(c=n==null?void 0:n[0])==null?void 0:c.toUpperCase()})})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("p",{className:"text-sm font-semibold text-[var(--text-primary)] truncate",children:n}),e.jsx("p",{className:"text-xs text-[var(--text-tertiary)] truncate",children:r!=null&&r.username?`@${r.username}`:t==null?void 0:t.email})]})]}),e.jsxs("div",{className:"py-1",children:[e.jsxs(A,{to:"/profile",onClick:o,className:"flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors",children:[e.jsx(m,{icon:xe,className:"w-4 text-center opacity-60"})," My Profile"]}),a&&e.jsxs(A,{to:"/admin",onClick:o,className:"flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--accent-primary)] hover:bg-[var(--accent-light)] transition-colors",children:[e.jsx(m,{icon:F,className:"w-4 text-center"})," Admin Panel"]}),e.jsxs("button",{onClick:i,className:"w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--clr-error)] hover:bg-red-500/10 transition-colors",children:[e.jsx(m,{icon:Tt,className:"w-4 text-center"})," Sign Out"]})]})]})}function Ss({compact:t=!1}){const r=p.useRef(null),a=p.useRef(!1),s=p.useRef({active:!1,startX:0,offset:0,currentOffset:0}),n=[...mt,...mt],o=()=>{r.current&&(r.current.style.animationPlayState="paused"),a.current=!0},l=()=>{r.current&&(r.current.style.animationPlayState="running"),a.current=!1},i=u=>{s.current={active:!0,startX:u.pageX,offset:s.current.currentOffset},o(),u.preventDefault()},c=u=>{if(!s.current.active)return;const x=u.pageX-s.current.startX;s.current.currentOffset=s.current.offset+x,r.current&&(r.current.style.transform=`translateX(${s.current.currentOffset}px)`)},d=()=>{s.current.active&&(s.current.active=!1,l())};return p.useEffect(()=>(window.addEventListener("mousemove",c),window.addEventListener("mouseup",d),()=>{window.removeEventListener("mousemove",c),window.removeEventListener("mouseup",d)}),[]),e.jsx("div",{onMouseEnter:o,onMouseLeave:l,style:{position:"relative",overflow:"hidden",height:t?28:34,borderRadius:8,maskImage:"linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%)",WebkitMaskImage:"linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%)"},children:e.jsx("div",{ref:r,onMouseDown:i,style:{display:"inline-flex",gap:t?10:16,alignItems:"center",height:"100%",whiteSpace:"nowrap",animation:"marquee-scroll 22s linear infinite",cursor:"grab",willChange:"transform"},children:n.map((u,x)=>e.jsxs("a",{href:u.url,target:"_blank",rel:"noopener noreferrer",onClick:b=>{s.current.currentOffset!==s.current.offset&&b.preventDefault()},className:`inline-flex items-center gap-1.5 ${t?"px-1.5 py-0.5":"px-2 py-1"} rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors no-underline flex-shrink-0`,children:[e.jsx(m,{icon:u.icon,className:u.cls,style:{fontSize:t?12:13}}),e.jsx("span",{className:t?"text-[11px]":"",children:u.label})]},x))})})}function ht({onClose:t,isLoggedIn:r}){const a=re(),s=typeof window<"u"?window.location.href:y.siteURL,n=`Explore ${y.owner.displayName}'s portfolio`,o=async()=>{try{await navigator.clipboard.writeText(s),te.success("Copied","Current page URL copied.")}catch{te.error("Copy failed","Could not copy this URL.")}},l=async()=>{try{if(navigator.share){await navigator.share({title:y.siteName,text:n,url:s});return}o()}catch(c){(c==null?void 0:c.name)!=="AbortError"&&o()}},i=c=>`relative overflow-hidden flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors group ${(c==="/"?a.pathname==="/":a.pathname.startsWith(c))?"is-mega-active bg-[var(--accent-light)] text-[var(--accent-primary)]":"hover:bg-[var(--bg-surface-2)]"}`;return e.jsx(v.AnimatePresence,{children:e.jsx(v.motion.div,{variants:ys,initial:"hidden",animate:"visible",exit:"exit",className:"mega-panel absolute left-0 right-0 top-full z-[9998]",children:e.jsx("div",{className:"max-w-[1120px] mx-auto px-4 pt-2",children:e.jsxs("div",{className:"rounded-2xl overflow-hidden",style:{background:"var(--bg-surface)",border:"1px solid var(--border-color)",boxShadow:"var(--shadow-xl)"},children:[e.jsx("div",{className:"h-[1.5px] w-full",style:{background:"linear-gradient(90deg,transparent,rgba(99,102,241,0.5) 35%,rgba(59,130,246,0.5) 65%,transparent)"}}),e.jsx("div",{className:"grid grid-cols-3 divide-x divide-[var(--border-color)] p-2",children:bs.map(c=>e.jsxs("div",{className:"px-3 py-3",children:[e.jsx("p",{className:"text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)] mb-2 px-2",children:c.label}),e.jsx("div",{className:"space-y-0.5",children:c.items.map(d=>d.external?e.jsxs("a",{href:d.path,target:"_blank",rel:"noopener noreferrer",onClick:t,className:i(d.path),children:[e.jsx(m,{icon:d.icon,className:"w-3.5 text-center text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors flex-shrink-0 text-xs"}),e.jsx("span",{className:"text-[13px] font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight",children:d.label})]},d.path):e.jsxs(A,{to:d.path,onClick:t,className:i(d.path),children:[e.jsx(m,{icon:d.icon,className:"w-3.5 text-center text-[var(--text-tertiary)] group-hover:text-[var(--accent-primary)] transition-colors flex-shrink-0 text-xs"}),e.jsx("span",{className:"text-[13px] font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight",children:d.label})]},d.path))})]},c.label))}),e.jsxs("div",{className:"px-4 py-3 border-t border-[var(--border-color)] flex items-center justify-between gap-3",children:[e.jsxs("div",{className:"mega-footer-share",children:[e.jsxs("button",{type:"button",onClick:l,className:"mega-share-action","aria-label":"Share current page",children:[e.jsx(m,{icon:Tr}),e.jsx("span",{children:"Share"})]}),e.jsxs("div",{className:"mega-url-field",title:s,children:[e.jsx("span",{children:s}),e.jsx("button",{type:"button",onClick:o,className:"mega-url-copy","aria-label":"Copy URL","data-tooltip":"Copy URL","data-tooltip-side":"right",children:e.jsx(m,{icon:Er})})]})]}),e.jsxs("span",{className:"mega-version-pill",children:["Web version ",e.jsx("strong",{children:y.version})]})]})]})})})})}function gt({user:t,profile:r,isAdmin:a,avatar:s,displayName:n,isLoggedIn:o,authLoading:l,unreadCount:i,openSearch:c,notifOpen:d,setNotifOpen:u,userOpen:x,setUserOpen:b,megaOpen:g,setMegaOpen:j,onMenuOpen:w,onMobileSearch:S}){var k;return e.jsxs("div",{className:"flex items-center gap-1.5 flex-shrink-0","data-nav-right":!0,children:[e.jsx(Y,{icon:I,onClick:c,label:"Search  Ctrl+K",className:"hidden lg:flex",tooltipSide:"right"}),e.jsx(Y,{icon:I,onClick:S,label:"Search",className:"lg:hidden"}),e.jsxs("div",{className:"notif-anchor relative",children:[e.jsx(Y,{icon:Be,onClick:()=>{u(!d),b(!1),j(!1)},label:"Notifications",badge:i,active:d,tooltipSide:"right"}),e.jsx(v.AnimatePresence,{children:d&&e.jsx(ks,{onClose:()=>u(!1)})})]}),e.jsx(Le,{}),l?e.jsx("div",{className:"w-9 h-9 rounded-full sk"}):o?e.jsxs("div",{className:"user-anchor relative",children:[e.jsx("button",{onClick:()=>{b(!x),u(!1),j(!1)},className:`w-9 h-9 rounded-full overflow-hidden border-2 transition-colors ${x?"border-[var(--accent-primary)]":"border-[var(--border-color)] hover:border-[var(--border-strong)]"}`,children:s?e.jsx("img",{src:s,alt:n,className:"w-full h-full object-cover"}):e.jsx("div",{className:"w-full h-full bg-[var(--accent-light)] flex items-center justify-center",children:e.jsx("span",{className:"text-[var(--accent-primary)] text-sm font-bold",children:(k=n==null?void 0:n[0])==null?void 0:k.toUpperCase()})})}),e.jsx(v.AnimatePresence,{children:x&&e.jsx(Ns,{user:t,profile:r,isAdmin:a,avatar:s,displayName:n,onClose:()=>b(!1)})})]}):e.jsx(Ie,{}),e.jsx("div",{className:"mega-anchor",children:e.jsx(Y,{icon:jr,onClick:()=>{j(!g),u(!1),b(!1)},label:"All pages",active:g,tooltipSide:"right"})}),e.jsx("button",{onClick:w,className:"lg:hidden relative overflow-hidden w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors","aria-label":"Menu",children:e.jsx(m,{icon:Ee})})]})}function Ts({open:t,query:r,setQuery:a,onClose:s,inputRef:n}){if(!t)return null;const o=qt(r),l=r.trim().length>0;return e.jsxs(v.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 z-[410] hidden lg:flex items-center justify-center px-6 py-10",onMouseDown:s,children:[e.jsx("div",{className:"absolute inset-0 bg-black/35 backdrop-blur-[4px]"}),e.jsxs(v.motion.div,{initial:{opacity:0,y:18,scale:.98},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:18,scale:.98},className:"desktop-search-pop relative w-[min(680px,calc(100vw-48px))] rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-[var(--shadow-xl)] overflow-hidden",onMouseDown:i=>i.stopPropagation(),children:[e.jsx("div",{className:"p-4 border-b border-[var(--border-color)]",children:e.jsxs("div",{className:"desktop-search-field",children:[e.jsx(m,{icon:I,className:"text-[var(--text-tertiary)] text-sm"}),e.jsx("input",{ref:n,value:r,onChange:i=>a(i.target.value),onKeyDown:i=>{i.key==="Escape"&&s()},placeholder:"Search pages, account, legal...",className:"flex-1 bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"}),r&&e.jsx("button",{onClick:()=>a(""),className:"desktop-search-clear","aria-label":"Clear search",children:e.jsx(m,{icon:Z,className:"text-xs"})}),e.jsx("button",{onClick:s,className:"desktop-search-close","aria-label":"Close search",children:e.jsx(m,{icon:Z,className:"text-xs"})})]})}),e.jsxs("div",{className:"p-3",children:[e.jsxs("div",{className:"px-2 pb-2 flex items-center justify-between",children:[e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)]",children:l?"Search results":"Quick open"}),e.jsx("span",{className:"text-[10px] font-mono text-[var(--text-tertiary)]",children:"Esc"})]}),o.length>0?e.jsx("div",{className:"space-y-1",children:o.map(i=>i.external?e.jsxs("a",{href:i.path,target:"_blank",rel:"noopener noreferrer",onClick:s,className:"desktop-search-result",children:[e.jsx(m,{icon:i.icon}),e.jsx("span",{children:i.label}),e.jsx("small",{children:i.group})]},i.path):e.jsxs(A,{to:i.path,onClick:s,className:"desktop-search-result",children:[e.jsx(m,{icon:i.icon}),e.jsx("span",{children:i.label}),e.jsx("small",{children:i.group})]},i.path))}):e.jsxs("div",{className:"desktop-search-empty",children:[e.jsx("div",{children:e.jsx(m,{icon:I})}),e.jsx("p",{children:"No results found"}),e.jsx("span",{children:"Try a page name like Projects, Feed, Contact, or Privacy."})]})]})]})]})}function Es(){var rt;const t=re(),r=pe(),{user:a,profile:s,isLoggedIn:n,avatar:o,displayName:l,authLoading:i}=us(),{unreadCount:c,isOpen:d,setOpen:u}=Xe(),{isAdmin:x}=Yt(),[b,g]=p.useState(!1),[j,w]=p.useState(!1),[S,k]=p.useState(!1),[H,U]=p.useState(!1),[X,ae]=p.useState(""),[ge,be]=p.useState(!1),[Jt,We]=p.useState(""),se=p.useRef(null),Qe=p.useRef(null);p.useEffect(()=>{const f=()=>g(window.scrollY>hs);return window.addEventListener("scroll",f,{passive:!0}),()=>window.removeEventListener("scroll",f)},[]),p.useEffect(()=>{w(!1),k(!1),U(!1),u(!1),ae(""),be(!1)},[t.pathname]),p.useEffect(()=>(document.body.style.overflow=j?"hidden":"",()=>{document.body.style.overflow=""}),[j]),p.useEffect(()=>{const f=N=>{(N.ctrlKey||N.metaKey)&&N.key==="k"&&(N.preventDefault(),Je())};return window.addEventListener("keydown",f),()=>window.removeEventListener("keydown",f)},[]),p.useEffect(()=>{ge&&setTimeout(()=>{var f;return(f=Qe.current)==null?void 0:f.focus()},80)},[ge]),p.useEffect(()=>{const f=N=>{!N.target.closest(".mega-anchor")&&!N.target.closest(".mega-panel")&&k(!1),!N.target.closest(".notif-anchor")&&!N.target.closest(".notif-panel")&&u(!1),!N.target.closest(".user-anchor")&&!N.target.closest(".user-panel")&&U(!1)};return document.addEventListener("mousedown",f),()=>document.removeEventListener("mousedown",f)},[]);const ve=()=>{w(!0),setTimeout(()=>{var f,N;(f=se.current)==null||f.focus(),(N=se.current)==null||N.select()},320)},Je=()=>{be(!0),k(!1),u(!1),U(!1)},Ze={user:a,profile:s,isAdmin:x,avatar:o,displayName:l,isLoggedIn:n,authLoading:i,unreadCount:c,openSearch:Je,notifOpen:d,setNotifOpen:u,userOpen:H,setUserOpen:U,megaOpen:S,setMegaOpen:k,onMenuOpen:()=>w(!0),onMobileSearch:ve},et=f=>N=>`relative overflow-hidden flex items-center gap-1.5 h-9 px-3.5 rounded-full text-sm font-medium leading-none transition-colors ${(f==="/"?t.pathname==="/":N)?"bg-[var(--accent-light)] text-[var(--accent-primary)]":"text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]"}`,tt=X.trim().length>0,W=qt(X).filter(f=>!f.external);return e.jsxs(e.Fragment,{children:[e.jsxs("nav",{className:"relative z-10 w-full border-b border-[var(--navbar-border)] bg-[var(--navbar-bg)] backdrop-blur-md",style:{height:"var(--navbar-h)"},children:[e.jsxs("div",{className:"navbar-inner flex items-center h-full max-w-[1120px] mx-auto gap-5",children:[e.jsx(Se,{}),e.jsx("div",{className:"hidden lg:flex flex-1 items-center justify-center gap-0.5",children:Ne.map(f=>e.jsxs(ne,{to:f.path,end:f.path==="/",className:({isActive:N})=>et(f.path)(N),title:f.title,children:[e.jsx(m,{icon:f.icon,className:"text-xs opacity-80"}),f.label]},f.path))}),e.jsx("div",{className:"hidden lg:flex ml-auto",children:e.jsx(gt,{...Ze})}),e.jsxs("div",{className:"flex lg:hidden items-center gap-1.5 ml-auto",children:[e.jsx(Y,{icon:I,onClick:ve,label:"Search",className:"w-8 h-8 text-sm"}),e.jsx(Le,{size:"sm"}),!i&&!n&&e.jsx(Ie,{className:"h-8 text-xs px-3 py-0"}),e.jsx("button",{onClick:()=>w(!0),className:"w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]","aria-label":"Menu",children:e.jsx(m,{icon:Ee})})]})]}),S&&e.jsx("div",{className:"relative",children:e.jsx(ht,{onClose:()=>k(!1),isLoggedIn:n})})]}),e.jsx(v.AnimatePresence,{children:b&&e.jsx(v.motion.div,{variants:vs,initial:"hidden",animate:"visible",exit:"exit",className:"fixed top-0 left-0 right-0 z-[var(--z-sticky)] flex justify-center px-4 pt-3 pointer-events-none",children:e.jsxs("nav",{className:"float-nav relative pointer-events-auto flex items-center gap-4 w-full max-w-[1120px] h-[52px] px-4 rounded-full",children:[e.jsx(Se,{size:"sm",rounded:!0}),e.jsx("div",{className:"hidden lg:flex flex-1 items-center justify-center gap-0.5",children:Ne.map(f=>e.jsxs(ne,{to:f.path,end:f.path==="/",className:({isActive:N})=>et(f.path)(N),title:f.title,children:[e.jsx(m,{icon:f.icon,className:"text-xs opacity-80"}),e.jsx("span",{className:"text-[13.5px]",children:f.label})]},f.path))}),e.jsx("div",{className:"hidden lg:flex ml-auto",children:e.jsx(gt,{...Ze})}),e.jsxs("div",{className:"flex lg:hidden items-center gap-1.5 ml-auto",children:[e.jsx(Y,{icon:I,onClick:ve,label:"Search",className:"w-8 h-8 text-sm"}),e.jsx(Le,{size:"sm"}),!i&&!n&&e.jsx(Ie,{className:"h-8 text-xs px-3 py-0"}),e.jsx("button",{onClick:()=>w(!0),className:"w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-surface-2)] text-[var(--text-secondary)]",children:e.jsx(m,{icon:Ee,className:"text-sm"})})]}),S&&e.jsx("div",{className:"absolute inset-x-0 top-full",children:e.jsx(ht,{onClose:()=>k(!1),isLoggedIn:n})})]})})}),e.jsx(v.AnimatePresence,{children:j&&e.jsxs(e.Fragment,{children:[e.jsx(v.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>w(!1),className:"fixed inset-0 bg-black/60 backdrop-blur-sm z-[390] lg:hidden"},"backdrop"),e.jsxs(v.motion.aside,{variants:ws,initial:"closed",animate:"open",exit:"closed",className:"fixed top-0 right-0 bottom-0 w-[min(340px,88vw)] bg-[var(--bg-surface)] border-l border-[var(--border-color)] z-[395] flex flex-col lg:hidden overflow-hidden",children:[e.jsxs("div",{className:"flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)] flex-shrink-0",children:[e.jsx(Se,{size:"sm",onClick:()=>w(!1)}),e.jsx("button",{onClick:()=>w(!1),className:"w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors",children:e.jsx(m,{icon:Z})})]}),n&&!tt&&e.jsxs(A,{to:"/profile",onClick:()=>w(!1),className:"flex items-center gap-3 mx-4 mt-3 p-3 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors",children:[e.jsx("div",{className:"w-10 h-10 rounded-full overflow-hidden flex-shrink-0",children:o?e.jsx("img",{src:o,alt:"",className:"w-full h-full object-cover"}):e.jsx("div",{className:"w-full h-full bg-[var(--accent-light)] flex items-center justify-center",children:e.jsx("span",{className:"text-[var(--accent-primary)] font-bold",children:(rt=l==null?void 0:l[0])==null?void 0:rt.toUpperCase()})})}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"text-sm font-semibold text-[var(--text-primary)] truncate",children:l}),e.jsx("p",{className:"text-xs text-[var(--text-tertiary)]",children:s!=null&&s.username?`@${s.username}`:""})]}),e.jsx(m,{icon:wr,className:"text-[var(--text-tertiary)] text-xs"})]}),e.jsx("div",{className:"px-4 mt-3 flex-shrink-0",children:e.jsxs("div",{className:"sidebar-search-field flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-color)] focus-within:border-[var(--accent-primary)] focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all",children:[e.jsx(m,{icon:I,className:"text-[var(--text-tertiary)] text-xs flex-shrink-0"}),e.jsx("input",{ref:se,type:"text",placeholder:"Search pages...",value:X,onChange:f=>ae(f.target.value),onKeyDown:f=>{var N;f.key==="Escape"&&(ae(""),(N=se.current)==null||N.blur())},className:"flex-1 bg-transparent border-none outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] min-w-0"}),X&&e.jsx("button",{onClick:()=>ae(""),className:"text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0",children:e.jsx(m,{icon:Z,className:"text-xs"})})]})}),e.jsx("div",{className:"flex-1 overflow-y-auto py-3 sidebar-scroll",children:tt?e.jsxs("div",{className:"px-5 py-8 text-center",children:[e.jsx("div",{className:"w-12 h-12 rounded-full bg-[var(--bg-surface-2)] flex items-center justify-center mx-auto mb-3",children:e.jsx(m,{icon:I,className:"text-[var(--text-tertiary)] text-lg"})}),e.jsxs("p",{className:"text-sm font-medium text-[var(--text-primary)] mb-1",children:['Results for "',e.jsx("span",{className:"text-[var(--accent-primary)]",children:X}),'"']}),e.jsx("p",{className:"text-xs text-[var(--text-tertiary)]",children:W.length?`${W.length} matching shortcut${W.length>1?"s":""}`:"No results found"}),e.jsxs("div",{className:"mt-4 space-y-1 text-left",children:[e.jsx("p",{className:"text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] px-1 mb-2",children:"Results"}),W.length>0?W.map(f=>e.jsxs(ne,{to:f.path,onClick:()=>w(!1),className:"flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)] transition-colors",children:[e.jsx(m,{icon:f.icon,className:"w-4 text-center text-xs text-[var(--text-tertiary)]"}),f.label]},f.path)):e.jsxs("div",{className:"desktop-search-empty py-5",children:[e.jsx("div",{children:e.jsx(m,{icon:I})}),e.jsx("p",{children:"No results found"}),e.jsx("span",{children:"Try Projects, Feed, Contact, or Privacy."})]})]})]}):e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"px-5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-tertiary)]",children:"Navigation"}),Ne.map(f=>e.jsxs(ne,{to:f.path,end:f.path==="/",onClick:()=>w(!1),className:({isActive:N})=>`flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${(f.path==="/"?t.pathname==="/":N)?"bg-[var(--accent-light)] text-[var(--accent-primary)]":"text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)]"}`,children:[e.jsx(m,{icon:f.icon,className:"w-4 text-center text-xs"}),f.label]},f.path)),e.jsx("div",{className:"my-3 mx-4 h-px bg-[var(--border-color)]"}),e.jsx("p",{className:"px-5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-tertiary)]",children:"More"}),[{label:"My Profile",path:"/profile",icon:xe},{label:"Privacy Policy",path:"/privacy-policy",icon:F},{label:"Cookies Policy",path:"/cookies-policy",icon:He}].map(f=>e.jsxs(A,{to:f.path,onClick:()=>w(!1),className:"flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] hover:text-[var(--text-primary)] transition-colors",children:[e.jsx(m,{icon:f.icon,className:"w-4 text-center text-xs"}),f.label]},f.path)),x&&e.jsxs(A,{to:"/admin",onClick:()=>w(!1),className:"flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl text-sm text-[var(--accent-primary)] hover:bg-[var(--accent-light)] transition-colors",children:[e.jsx(m,{icon:F,className:"w-4 text-center text-xs"})," Admin Panel"]})]})}),e.jsxs("div",{className:"flex-shrink-0 border-t border-[var(--border-color)] p-4 space-y-2.5",children:[n?e.jsxs("button",{onClick:async()=>{await Ke(),w(!1),r("/")},className:"w-full py-2 rounded-full border border-red-500/30 text-center text-sm text-[var(--clr-error)] hover:bg-red-500/10 transition-colors",children:[e.jsx(m,{icon:Tt,className:"mr-2"})," Sign Out"]}):e.jsxs("div",{className:"flex gap-2",children:[e.jsx(A,{to:"/login",onClick:()=>w(!1),className:"flex-1 py-2 rounded-full border border-[var(--border-color)] text-center text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-surface-2)] transition-colors",children:"Sign In"}),e.jsx(A,{to:"/signup",onClick:()=>w(!1),className:"flex-1 py-2 rounded-full bg-[var(--accent-primary)] text-center text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors",children:"Sign Up"})]}),e.jsx(Ss,{compact:!0})]})]},"sidebar")]})}),e.jsx(v.AnimatePresence,{children:e.jsx(Ts,{open:ge,query:Jt,setQuery:We,inputRef:Qe,onClose:()=>{be(!1),We("")}})}),e.jsx("style",{children:`
        .navbar-inner {
          padding-inline: 1.75rem;
        }
        @media (min-width: 1250px) {
          .navbar-inner {
            padding-inline: 0;
          }
        }

        /* ── Floating navbar: advanced glass effect ─────────── */
        .float-nav {
          background:
            linear-gradient(135deg, rgba(15,23,42,0.82), rgba(2,6,23,0.62)),
            radial-gradient(circle at 18% 0%, rgba(56,189,248,.16), transparent 34%),
            radial-gradient(circle at 82% 100%, rgba(139,92,246,.13), transparent 38%);
          border: 1px solid rgba(148,163,184,0.2);
          box-shadow:
            0 16px 44px rgba(0,0,0,0.48),
            0 3px 18px rgba(59,130,246,0.16),
            inset 0 1px 0 rgba(255,255,255,0.16),
            inset 0 -1px 0 rgba(15,23,42,0.45);
          backdrop-filter: blur(30px) saturate(210%) brightness(1.08);
          -webkit-backdrop-filter: blur(30px) saturate(210%) brightness(1.08);
          overflow: visible;
        }
        .float-nav::before {
          content: '';
          position: absolute;
          inset: 1px 18px auto 18px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.48), transparent);
          pointer-events: none;
        }
        .float-nav::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          border: 1px solid transparent;
          background: linear-gradient(110deg, rgba(34,211,238,.0), rgba(34,211,238,.24), rgba(139,92,246,.0)) border-box;
          mask: linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          pointer-events: none;
          opacity: .62;
        }
        [data-theme="light"] .float-nav {
          background:
            linear-gradient(135deg, rgba(255,255,255,0.88), rgba(248,250,252,0.7)),
            radial-gradient(circle at 18% 0%, rgba(37,99,235,.1), transparent 34%),
            radial-gradient(circle at 82% 100%, rgba(14,165,233,.1), transparent 38%);
          border: 1px solid rgba(203,213,225,0.82);
          box-shadow:
            0 12px 36px rgba(15,23,42,0.1),
            0 2px 14px rgba(37,99,235,0.1),
            inset 0 1px 0 rgba(255,255,255,0.9),
            inset 0 -1px 0 rgba(0,0,0,0.03);
          backdrop-filter: blur(28px) saturate(180%) brightness(1.03);
          -webkit-backdrop-filter: blur(28px) saturate(180%) brightness(1.03);
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

        /* ── Tooltip (data-tooltip attr) ─────────────────────── */
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
          bottom: -34px;
          left: 50%;
          transform: translateX(-50%) translateY(5px);
          background: rgba(15, 23, 42, .94);
          color: #fff;
          border: 1px solid rgba(148, 163, 184, .2);
          box-shadow: 0 12px 26px rgba(2, 6, 23, .28), inset 0 1px 0 rgba(255, 255, 255, .08);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-size: 11px;
          line-height: 1;
          padding: 7px 10px;
          border-radius: 999px;
          white-space: nowrap;
          font-weight: 700;
        }
        [data-tooltip]::before {
          content: "";
          bottom: -8px;
          left: 50%;
          width: 8px;
          height: 8px;
          transform: translateX(-50%) translateY(5px) rotate(45deg);
          background: rgba(15, 23, 42, .94);
          border-left: 1px solid rgba(148, 163, 184, .2);
          border-top: 1px solid rgba(148, 163, 184, .2);
        }
        [data-theme="light"] [data-tooltip]::after,
        [data-theme="light"] [data-tooltip]::before {
          background: rgba(30, 41, 59, .96);
        }
        [data-tooltip]:hover::after { opacity: 1; transform: translateX(-50%) translateY(0); }
        [data-tooltip]:hover::before { opacity: 1; transform: translateX(-50%) translateY(0) rotate(45deg); }
        [data-nav-right] [data-tooltip]::after,
        [data-tooltip-side="right"]::after {
          left: auto;
          right: 0;
          transform: translateY(5px);
        }
        [data-nav-right] [data-tooltip]::before,
        [data-tooltip-side="right"]::before {
          left: auto;
          right: 12px;
          transform: translateY(5px) rotate(45deg);
        }
        [data-nav-right] [data-tooltip]:hover::after,
        [data-tooltip-side="right"]:hover::after {
          transform: translateY(0);
        }
        [data-nav-right] [data-tooltip]:hover::before,
        [data-tooltip-side="right"]:hover::before {
          transform: translateY(0) rotate(45deg);
        }
        .desktop-search-field,
        .sidebar-search-field {
          border-color: var(--border-color);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.03);
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
          box-shadow: 0 0 0 4px rgba(59,130,246,.12), inset 0 1px 0 rgba(255,255,255,.05) !important;
        }
        .desktop-search-close,
        .desktop-search-clear,
        .mega-url-copy {
          width: 34px; height: 34px; border-radius: 999px;
          display: inline-flex; align-items: center; justify-content: center;
          color: var(--text-tertiary); transition: all .2s ease;
        }
        .desktop-search-close:hover,
        .desktop-search-clear:hover,
        .mega-url-copy:hover {
          color: var(--text-primary); background: var(--bg-surface-2);
        }
        .desktop-search-result,
        .sidebar-search-result {
          display: flex; align-items: center; gap: 12px;
          border: 1px solid transparent;
          color: var(--text-secondary); text-decoration: none;
          transition: all .2s ease;
        }
        .desktop-search-result {
          min-height: 48px; padding: 0 12px; border-radius: 14px;
        }
        .sidebar-search-result {
          min-height: 44px; padding: 0 12px; border-radius: 13px;
          background: var(--bg-surface-2);
          border-color: var(--border-color);
        }
        .desktop-search-result:hover,
        .sidebar-search-result:hover {
          color: var(--text-primary);
          background: var(--bg-surface-2);
          border-color: var(--border-strong);
          transform: translateY(-1px);
        }
        .desktop-search-result svg,
        .sidebar-search-result svg {
          width: 16px; color: var(--accent-primary); flex-shrink: 0;
        }
        .desktop-search-result span,
        .sidebar-search-result span {
          flex: 1; min-width: 0; font-size: 13px; font-weight: 650;
        }
        .desktop-search-result small,
        .sidebar-search-result small {
          font-size: 10px; color: var(--text-tertiary);
          border: 1px solid var(--border-color); border-radius: 999px;
          padding: 2px 7px; line-height: 1;
        }
        .desktop-search-empty {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 8px; min-height: 150px; text-align: center; color: var(--text-tertiary);
        }
        .desktop-search-empty div {
          width: 44px; height: 44px; border-radius: 14px;
          display: grid; place-items: center;
          background: var(--bg-surface-2); border: 1px solid var(--border-color);
          color: var(--accent-primary);
        }
        .desktop-search-empty p { color: var(--text-primary); font-size: 14px; font-weight: 700; line-height: 1.2; }
        .desktop-search-empty span { max-width: 260px; font-size: 12px; line-height: 1.5; }
        .mega-footer-share {
          display: flex; align-items: center; gap: 8px; min-width: 0; flex: 1;
        }
        .mega-share-action {
          height: 34px; padding: 0 13px; border-radius: 999px;
          display: inline-flex; align-items: center; gap: 7px;
          color: #fff; background: var(--accent-primary);
          font-size: 12px; font-weight: 700;
          transition: all .2s ease; flex-shrink: 0;
        }
        .mega-share-action:hover { background: var(--accent-hover); transform: translateY(-1px); }
        .mega-url-field {
          height: 34px; min-width: 0; max-width: 460px; flex: 1;
          display: flex; align-items: center; gap: 8px;
          border: 1px solid var(--border-color); border-radius: 999px;
          background: var(--bg-surface-2); padding: 0 4px 0 12px;
        }
        .mega-url-field span {
          min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          font-size: 11px; color: var(--text-tertiary); font-family: var(--font-mono);
        }
        .mega-url-copy { width: 26px; height: 26px; flex-shrink: 0; }
        .mega-version-pill {
          height: 30px; padding: 0 10px; border-radius: 999px;
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; color: var(--text-tertiary);
          background: var(--bg-surface-2); border: 1px solid var(--border-color);
          white-space: nowrap; flex-shrink: 0;
        }
        .mega-version-pill strong {
          color: var(--text-primary); font-family: var(--font-mono); font-weight: 700;
        }
        .mega-share-btn {
          width: 30px; height: 30px; border-radius: 999px;
          display: inline-flex; align-items: center; justify-content: center;
          color: var(--text-secondary); background: var(--bg-surface-2);
          border: 1px solid var(--border-color); transition: all .2s ease;
          position: relative; overflow: hidden; flex-shrink: 0;
        }
        .mega-share-btn:hover { color: var(--accent-primary); border-color: var(--accent-primary); }
        .mega-share-btn:active,
        a:active,
        button:active { transform: scale(.96); }
        .desktop-search-pop {
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
        }
        @media (max-width: 760px) {
          .mega-footer-share { flex-wrap: wrap; }
          .mega-url-field { flex-basis: 100%; max-width: none; }
          .mega-version-pill { margin-left: auto; }
        }
        @media (max-width: 640px) {
          .fixed.top-0.right-0.bottom-0 { width: 100vw !important; }
        }
      `})]})}const As={active:{color:"#22c55e",label:"Active",shadow:"rgba(34,197,94,0.35)"},busy:{color:"#ef4444",label:"Busy",shadow:"rgba(239,68,68,0.35)"},away:{color:"#f59e0b",label:"Away",shadow:"rgba(245,158,11,0.35)"},offline:{color:"#6b7280",label:"Offline",shadow:"rgba(107,114,128,0.35)"}},Cs="active",_s=[{label:"Home",path:"/"},{label:"About",path:"/about"},{label:"Projects",path:"/projects"},{label:"Feed",path:"/feed"},{label:"Contact",path:"/contact"}],Ps=[{label:"Privacy Policy",path:"/privacy-policy"},{label:"Cookies Policy",path:"/cookies-policy"},{label:"Terms of Use",path:"/terms"},{label:"Sitemap",path:"/sitemap.xml",external:!0}];function zs({target:t}){const[r,a]=p.useState(0),s=p.useRef(null),n=v.useInView(s,{once:!0,margin:"-80px"});return p.useEffect(()=>{if(!n)return;const o=Math.max(0,t-300),l=performance.now(),i=1800;function c(d){const u=d-l,x=Math.min(u/i,1),b=1-Math.pow(1-x,3),g=Math.round(o+(t-o)*b);a(g),x<1?requestAnimationFrame(c):a(t)}requestAnimationFrame(c)},[n,t]),e.jsx("strong",{ref:s,id:"subCount",children:r.toLocaleString()})}const O=({href:t,label:r,children:a})=>e.jsx("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:"nf-social-icon",title:r,"aria-label":r,children:e.jsx("svg",{viewBox:"0 0 24 24",children:a})});function Rs(){const[t,r]=p.useState(""),[a,s]=p.useState(2847),[n,o]=p.useState(!1),[l,i]=p.useState(!1),[c,d]=p.useState(!1),[u,x]=p.useState("/logo.webp"),b=new Date().getFullYear(),g=As[Cs];p.useEffect(()=>ss(k=>{k>0&&s(k)}),[]);const j=async S=>{S==null||S.preventDefault();const k=t.trim();if(!k||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(k)){d(!0),setTimeout(()=>d(!1),2200);return}o(!0);try{(await as(k)).duplicate?te.info("Already subscribed","This email is already in the list!"):(i(!0),r(""),s(U=>U+1),setTimeout(()=>i(!1),3500))}catch{te.error("Failed","Could not subscribe. Try again.")}finally{o(!1)}},w=S=>{S.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"nf-sc-wrap",children:e.jsxs("div",{className:"nf-sc",children:[e.jsxs("div",{className:"nf-sc-left",children:[e.jsxs("h2",{children:["Stay ",e.jsx("em",{children:"Connected"}),e.jsx("br",{}),"with My Work"]}),e.jsx("p",{className:"nf-sc-sub",children:"Follow my journey · Get updates on new projects & posts"})]}),e.jsxs("div",{className:"nf-sc-right",children:[l?e.jsxs("div",{className:"nf-success-msg",children:[e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"#4ade80",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})}),"Subscribed! Check your inbox."]}):e.jsx("form",{onSubmit:j,noValidate:!0,children:e.jsxs("div",{className:`nf-form-wrap ${c?"nf-form-invalid":""}`,children:[e.jsx("div",{className:"nf-input-icon","aria-hidden":!0,children:e.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"#fff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),e.jsx("path",{d:"M2 7l8.5 6.5a2 2 0 002.5 0L22 7"})]})}),e.jsx("input",{id:"nf-sub-email",type:"email",placeholder:"Enter your email",value:t,onChange:S=>{r(S.target.value),c&&d(!1)},required:!0,autoComplete:"email"}),e.jsxs("button",{type:"submit",className:"nf-submit-btn",disabled:n,children:[n?e.jsx("span",{className:"nf-spinner"}):e.jsx("svg",{viewBox:"0 0 20 20",width:"15",height:"15",fill:"currentColor",children:e.jsx("path",{d:"M10 2a6 6 0 00-6 6v1H3a1 1 0 000 2h1v1a6 6 0 0012 0v-1h1a1 1 0 000-2h-1V8a6 6 0 00-6-6zm0 2a4 4 0 014 4v2a4 4 0 01-8 0V8a4 4 0 014-4z"})}),e.jsx("span",{children:n?"...":"Subscribe"})]})]})}),e.jsxs("p",{className:"nf-count-text",children:[e.jsx("span",{className:"nf-count-dot","aria-hidden":!0}),e.jsx(zs,{target:a})," curious minds already subscribed"]})]})]})}),e.jsx("footer",{className:"nf-footer",children:e.jsxs("div",{className:"nf-inner",children:[e.jsxs("div",{className:"nf-main",children:[e.jsxs("div",{className:"nf-brand-col",children:[e.jsxs(A,{to:"/",className:"nf-logo-row",children:[e.jsxs("div",{className:"nf-logo-mark",style:{position:"relative"},children:[e.jsx("img",{src:u,alt:"Muhtasim logo",onError:()=>x("/android-chrome-192x192.png"),className:"nf-logo-img"}),e.jsx("span",{className:"nf-logo-status-dot",title:g.label,style:{background:g.color,boxShadow:`0 0 0 2px var(--nf-footer-bg), 0 0 0 4px ${g.shadow}`}})]}),e.jsxs("div",{children:[e.jsx("div",{className:"nf-logo-name",children:y.owner.displayName}),e.jsx("div",{className:"nf-logo-handle",children:"@mdturzo999 · Portfolio"})]})]}),e.jsx("p",{className:"nf-brand-desc",children:y.seo.defaultDescription}),e.jsxs("div",{className:"nf-social-row",children:[e.jsx(O,{href:y.social.github,label:"GitHub",children:e.jsx("path",{d:"M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"})}),e.jsx(O,{href:y.social.linkedin,label:"LinkedIn",children:e.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})}),e.jsx(O,{href:y.social.twitter,label:"X / Twitter",children:e.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"})}),e.jsx(O,{href:y.social.instagram,label:"Instagram",children:e.jsx("path",{d:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"})}),e.jsx(O,{href:y.social.youtube,label:"YouTube",children:e.jsx("path",{d:"M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"})}),e.jsx(O,{href:y.social.facebook,label:"Facebook",children:e.jsx("path",{d:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"})}),e.jsx(O,{href:y.social.threads,label:"Threads",children:e.jsx("path",{d:"M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.49a8.16 8.16 0 004.77 1.52V7.56a4.85 4.85 0 01-1-.87z"})}),e.jsx(O,{href:y.social.tiktok,label:"TikTok",children:e.jsx("path",{d:"M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.49a8.16 8.16 0 004.77 1.52V7.56a4.85 4.85 0 01-1-.87z"})})]}),e.jsxs("div",{className:"nf-location-row",children:[e.jsx("svg",{viewBox:"0 0 24 24",children:e.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"})}),y.owner.location]})]}),e.jsxs("div",{className:"nf-nav-col",children:[e.jsx("div",{className:"nf-nav-col-title",children:"Explore"}),e.jsx("ul",{className:"nf-nav-list",children:_s.map(({label:S,path:k})=>e.jsx("li",{children:e.jsx(A,{to:k,children:S})},k))})]}),e.jsxs("div",{className:"nf-nav-col",children:[e.jsx("div",{className:"nf-nav-col-title",children:"Legal"}),e.jsx("ul",{className:"nf-nav-list",children:Ps.map(({label:S,path:k,external:H})=>e.jsx("li",{children:H?e.jsx("a",{href:k,target:"_blank",rel:"noopener noreferrer",children:S}):e.jsx(A,{to:k,children:S})},k))})]}),e.jsxs("div",{className:"nf-contact-col",children:[e.jsx("div",{className:"nf-nav-col-title",children:"Get in Touch"}),e.jsxs(A,{to:"/contact",className:"nf-contact-card",children:[e.jsx("div",{className:"nf-cc-label",children:"Open for work"}),e.jsx("div",{className:"nf-cc-title",children:"Let's Collaborate"}),e.jsx("div",{className:"nf-cc-sub",children:"Have a project in mind? I'd love to hear about it."}),e.jsxs("span",{className:"nf-cc-arrow",children:["Visit Contact Page",e.jsx("svg",{viewBox:"0 0 20 20",children:e.jsx("path",{d:"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"})})]})]}),e.jsxs("a",{href:`mailto:${y.owner.email}`,className:"nf-email-card",children:[e.jsx("div",{className:"nf-email-icon",children:e.jsx("svg",{viewBox:"0 0 24 24",children:e.jsx("path",{d:"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"})})}),e.jsxs("div",{children:[e.jsx("div",{className:"nf-email-label",children:"Email me"}),e.jsx("div",{className:"nf-email-addr",children:y.owner.email})]})]})]})]}),e.jsx("div",{className:"nf-scroll-border",children:e.jsx("button",{onClick:w,className:"nf-scroll-btn","aria-label":"Scroll to top",title:"Back to top",children:e.jsx("svg",{viewBox:"0 0 20 20",children:e.jsx("path",{d:"M10 4l-6 6h4v6h4v-6h4l-6-6z"})})})}),e.jsxs("div",{className:"nf-bottom",children:[e.jsxs("p",{className:"nf-copyright",children:["© ",b," ",e.jsx(A,{to:"/",children:y.siteName}),". All rights reserved."]}),e.jsxs("div",{className:"nf-bottom-right",children:[e.jsx("span",{className:"nf-version",children:y.version}),e.jsx("button",{onClick:w,className:"nf-scroll-btn nf-desktop-only","aria-label":"Scroll to top",title:"Back to top",children:e.jsx("svg",{viewBox:"0 0 20 20",children:e.jsx("path",{d:"M10 4l-6 6h4v6h4v-6h4l-6-6z"})})})]})]})]})}),e.jsx("style",{children:`
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
          --nf-footer-bg:   #ffffff;
          --nf-surface-1:   #f8fafc;
          --nf-surface-2:   #f1f5f9;
          --nf-surface-3:   #e2e8f0;
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
      `})]})}const Ls=[{label:"Add Blog",icon:Or,tab:"blogs",color:"#8b5cf6"},{label:"Add Project",icon:fe,tab:"projects",color:"#3b82f6"},{label:"Add Post",icon:Dr,tab:"posts",color:"#ef4444"},{label:"Add Notification",icon:Be,tab:"notifications",color:"#f59e0b"},{label:"View Reports",icon:$r,tab:"reports",color:"#ec4899"},{label:"Page Visibility",icon:Mr,tab:"visibility",color:"#22c55e"}],Is={hidden:{},visible:{transition:{staggerChildren:.05}},exit:{transition:{staggerChildren:.03,staggerDirection:-1}}},Os={hidden:{opacity:0,x:20,scale:.8},visible:{opacity:1,x:0,scale:1,transition:{type:"spring",stiffness:400,damping:28}},exit:{opacity:0,x:20,scale:.8,transition:{duration:.15}}};function Ds(){const{isAdmin:t}=Yt(),r=pe(),[a,s]=p.useState(!1);return t?e.jsxs("div",{className:"fixed bottom-6 right-6 z-[var(--z-toast)] flex flex-col items-end gap-2 pointer-events-none",children:[e.jsx(v.AnimatePresence,{children:a&&e.jsx(v.motion.div,{variants:Is,initial:"hidden",animate:"visible",exit:"exit",className:"flex flex-col items-end gap-2 pointer-events-auto",children:Ls.map(n=>e.jsxs(v.motion.button,{variants:Os,onClick:()=>{r(`/admin/${n.tab}`),s(!1)},className:"flex items-center gap-2.5 pr-3.5 pl-2.5 py-2 rounded-full shadow-[var(--shadow-lg)] border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-2)] transition-colors",children:[e.jsx("span",{className:"w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",style:{background:n.color+"22"},children:e.jsx(m,{icon:n.icon,style:{color:n.color},className:"text-xs"})}),e.jsx("span",{className:"text-sm font-medium text-[var(--text-primary)] whitespace-nowrap",children:n.label})]},n.tab))})}),e.jsx(v.motion.button,{onClick:()=>s(!a),whileHover:{scale:1.05},whileTap:{scale:.95},className:"pointer-events-auto w-12 h-12 rounded-full bg-[var(--accent-primary)] text-white shadow-[0_4px_20px_rgba(59,130,246,0.5)] hover:bg-[var(--accent-hover)] transition-colors flex items-center justify-center","aria-label":"Admin quick actions",children:e.jsx(v.AnimatePresence,{mode:"wait",initial:!1,children:a?e.jsx(v.motion.span,{initial:{opacity:0,rotate:-90},animate:{opacity:1,rotate:0},exit:{opacity:0,rotate:90},transition:{duration:.15},children:e.jsx(m,{icon:Z,className:"text-lg"})},"x"):e.jsx(v.motion.span,{initial:{opacity:0,rotate:90},animate:{opacity:1,rotate:0},exit:{opacity:0,rotate:-90},transition:{duration:.15},children:e.jsx(m,{icon:F,className:"text-base"})},"shield")})})]}):null}function $s(){return e.jsxs("div",{className:"min-h-screen flex flex-col",style:{background:"var(--bg-page)"},children:[e.jsx(Es,{}),e.jsx("main",{className:"flex-1",children:e.jsx(ar,{})}),e.jsx(Rs,{}),e.jsx(Ds,{})]})}const bt={success:{icon:Ur,color:"text-emerald-400",bg:"bg-emerald-500/10 border-emerald-500/30",bar:"bg-emerald-400"},error:{icon:Hr,color:"text-red-400",bg:"bg-red-500/10 border-red-500/30",bar:"bg-red-400"},warning:{icon:Fr,color:"text-amber-400",bg:"bg-amber-500/10 border-amber-500/30",bar:"bg-amber-400"},info:{icon:Vr,color:"text-blue-400",bg:"bg-blue-500/10 border-blue-500/30",bar:"bg-blue-400"}};function Ms({toast:t}){const{removeToast:r}=z(),a=bt[t.type]||bt.info;return e.jsxs(v.motion.div,{layout:!0,initial:{opacity:0,x:60,scale:.95},animate:{opacity:1,x:0,scale:1},exit:{opacity:0,x:60,scale:.9,transition:{duration:.15}},className:`
        relative overflow-hidden rounded-lg border backdrop-blur-xl shadow-lg
        pointer-events-auto w-full max-w-[320px]
        ${a.bg}
      `,children:[e.jsxs("div",{className:"flex items-start gap-2.5 px-3 py-2.5",children:[e.jsx(m,{icon:a.icon,className:`${a.color} text-base flex-shrink-0 mt-0.5`}),e.jsxs("div",{className:"flex-1 min-w-0",children:[t.title&&e.jsx("p",{className:"text-[13px] font-semibold text-[var(--text-primary)] leading-tight",children:t.title}),t.message&&e.jsx("p",{className:"text-xs text-[var(--text-secondary)] mt-0.5 leading-snug",children:t.message})]}),e.jsx("button",{onClick:()=>r(t.id),className:"text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex-shrink-0 p-0.5",children:e.jsx(m,{icon:Br,className:"text-xs"})})]}),t.duration&&e.jsx(v.motion.div,{className:`absolute bottom-0 left-0 h-0.5 ${a.bar}`,initial:{width:"100%"},animate:{width:"0%"},transition:{duration:t.duration/1e3,ease:"linear"}})]})}function Vs(){const t=z(r=>r.toasts);return e.jsx("div",{id:"toast-container","aria-live":"polite","aria-atomic":"false",children:e.jsx(v.AnimatePresence,{mode:"popLayout",children:t.map(r=>e.jsx(Ms,{toast:r},r.id))})})}function Fs(){const t=re(),[r,a]=p.useState(0),[s,n]=p.useState(!1),o=p.useRef(null),l=p.useRef(null),i=p.useRef(null);return p.useEffect(()=>(clearTimeout(o.current),clearTimeout(l.current),clearTimeout(i.current),n(!0),a(0),o.current=setTimeout(()=>a(30),50),l.current=setTimeout(()=>a(70),300),i.current=setTimeout(()=>{a(100),setTimeout(()=>{n(!1),a(0)},300)},700),()=>{clearTimeout(o.current),clearTimeout(l.current),clearTimeout(i.current)}),[t.pathname,t.search]),!s&&r===0?null:e.jsx("div",{id:"page-progress",className:s?"is-visible":"",style:{width:`${r}%`,opacity:s?1:0},children:e.jsx("span",{className:"page-progress-head"})})}class Hs extends p.Component{constructor(r){super(r),this.state={hasError:!1,error:null}}static getDerivedStateFromError(r){return{hasError:!0,error:r}}componentDidCatch(r,a){console.error("[ErrorBoundary]",r,a);try{window.__SENTRY_INITIALIZED__&&E(async()=>{const{captureException:s}=await import("./index-DBLVxIkL.js");return{captureException:s}},__vite__mapDeps([0,1])).then(({captureException:s})=>{s(r,{extra:a})})}catch{}}render(){return this.state.hasError?e.jsxs("div",{className:"min-h-[60vh] flex flex-col items-center justify-center p-8 text-center",children:[e.jsx("div",{className:"text-red-400 mb-4",children:e.jsx(m,{icon:Yr,className:"text-5xl"})}),e.jsx("h2",{className:"text-xl font-bold text-[var(--text-primary)] mb-2",children:"Something went wrong"}),e.jsx("p",{className:"text-[var(--text-secondary)] mb-6 max-w-sm",children:"An unexpected error occurred. Please try refreshing the page."}),e.jsxs("button",{onClick:()=>window.location.reload(),className:"inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-colors",children:[e.jsx(m,{icon:Gr}),"Refresh Page"]}),!1]}):this.props.children}}function Us({compact:t=!1,label:r=""}){return e.jsxs("div",{className:`signature-loader-wrap ${t?"is-compact":""}`,role:"status","aria-live":"polite",children:[e.jsx("div",{className:"signature-loader","aria-hidden":!0}),r&&e.jsx("p",{className:"signature-loader-text",children:r})]})}function M({lines:t=3,className:r=""}){const a=["w-full","w-4/5","w-3/4","w-2/3","w-1/2","w-5/6"];return e.jsx("div",{className:`space-y-2.5 ${r}`,children:Array.from({length:t},(s,n)=>e.jsx("div",{className:`sk h-4 rounded ${a[n%a.length]}`,style:{animationDelay:`${n*.08}s`}},n))})}function ie({size:t=48,className:r=""}){return e.jsx("div",{className:`sk rounded-full flex-shrink-0 ${r}`,style:{width:t,height:t}})}function h({w:t="w-full",h:r="h-4",rounded:a="rounded",className:s="",delay:n=0}){return e.jsx("div",{className:`sk ${t} ${r} ${a} ${s}`,style:{animationDelay:`${n}s`}})}function Wt({className:t=""}){return e.jsxs("div",{className:`card p-5 space-y-4 ${t}`,children:[e.jsx(h,{h:"h-44",rounded:"rounded-lg"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(h,{w:"w-16",h:"h-5",rounded:"rounded-full",delay:.05}),e.jsx(h,{w:"w-20",h:"h-5",rounded:"rounded-full",delay:.1})]}),e.jsx(h,{w:"w-3/4",h:"h-5",delay:.12}),e.jsx(h,{w:"w-1/2",h:"h-4",delay:.15}),e.jsx(M,{lines:2}),e.jsxs("div",{className:"flex items-center justify-between pt-2",children:[e.jsx(h,{w:"w-20",h:"h-4",delay:.18}),e.jsx(h,{w:"w-24",h:"h-8",rounded:"rounded-lg",delay:.2})]})]})}function Bs({className:t=""}){return e.jsxs("div",{className:`flex items-center gap-4 p-4 border-b border-[var(--border-color)] ${t}`,children:[e.jsx(h,{w:"w-12",h:"h-12",rounded:"rounded-lg"}),e.jsxs("div",{className:"flex-1 space-y-2",children:[e.jsx(h,{w:"w-2/3",h:"h-4"}),e.jsx(h,{w:"w-1/2",h:"h-3",delay:.08})]}),e.jsx(h,{w:"w-20",h:"h-8",rounded:"rounded-lg",delay:.12})]})}function Ys({className:t=""}){return e.jsx("div",{className:`sk h-52 w-full rounded-xl ${t}`})}function vt({className:t=""}){return e.jsxs("div",{className:`card p-5 text-center space-y-2 ${t}`,children:[e.jsx(h,{w:"w-20",h:"h-10",rounded:"rounded-lg",className:"mx-auto"}),e.jsx(h,{w:"w-16",h:"h-3",className:"mx-auto"})]})}function Gs({count:t=6}){return e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:Array.from({length:t},(r,a)=>e.jsx(Wt,{},a))})}function Ks({rows:t=5,cols:r=4,className:a=""}){return e.jsxs("div",{className:a,children:[e.jsx("div",{className:"flex gap-3 p-3 border-b border-[var(--border-color)] mb-1",children:Array.from({length:r},(s,n)=>e.jsx(h,{h:"h-4",className:"flex-1"},n))}),Array.from({length:t},(s,n)=>e.jsx("div",{className:"flex gap-3 p-3 border-b border-[var(--border-color)]",children:Array.from({length:r},(o,l)=>e.jsx(h,{h:"h-4",className:"flex-1",delay:l*.04},l))},n))]})}const yt={hero:()=>e.jsxs("div",{className:"container py-16 space-y-10",children:[e.jsxs("div",{className:"flex flex-col lg:flex-row gap-10 items-center py-8",children:[e.jsxs("div",{className:"flex-1 space-y-5",children:[e.jsx(h,{w:"w-1/3",h:"h-5",rounded:"rounded-full"}),e.jsx(h,{w:"w-5/6",h:"h-12",delay:.05}),e.jsx(h,{w:"w-4/6",h:"h-12",delay:.08}),e.jsx(M,{lines:2}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(h,{w:"w-32",h:"h-11",rounded:"rounded-full",delay:.1}),e.jsx(h,{w:"w-36",h:"h-11",rounded:"rounded-full",delay:.12})]}),e.jsx("div",{className:"flex gap-2",children:[...Array(5)].map((t,r)=>e.jsx(ie,{size:36},r))})]}),e.jsx(ie,{size:280,className:"flex-shrink-0"})]}),e.jsx("div",{className:"grid grid-cols-3 gap-4",children:[...Array(3)].map((t,r)=>e.jsx(vt,{},r))})]}),grid:()=>e.jsxs("div",{className:"container py-10 space-y-8",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(h,{w:"w-40",h:"h-8"}),e.jsx(h,{w:"w-32",h:"h-10",rounded:"rounded-full"})]}),e.jsx("div",{className:"flex gap-2",children:[...Array(5)].map((t,r)=>e.jsx(h,{w:"w-20",h:"h-8",rounded:"rounded-full",delay:r*.04},r))}),e.jsx(Gs,{count:6})]}),list:()=>e.jsxs("div",{className:"container py-10 space-y-6",children:[e.jsx(h,{w:"w-48",h:"h-8"}),e.jsx("div",{className:"card overflow-hidden",children:[...Array(6)].map((t,r)=>e.jsx(Bs,{},r))})]}),detail:()=>e.jsx("div",{className:"container py-10 max-w-3xl mx-auto",children:e.jsxs("div",{className:"space-y-6",children:[e.jsx(h,{w:"w-24",h:"h-5",rounded:"rounded-full"}),e.jsx(h,{w:"w-5/6",h:"h-10",delay:.05}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(ie,{size:44}),e.jsxs("div",{className:"flex-1 space-y-2",children:[e.jsx(h,{w:"w-36",h:"h-4"}),e.jsx(h,{w:"w-24",h:"h-3",delay:.06})]})]}),e.jsx(Ys,{}),e.jsx(M,{lines:6}),e.jsx(M,{lines:4}),e.jsx(M,{lines:3})]})}),profile:()=>e.jsxs("div",{className:"container py-10 space-y-8 max-w-4xl mx-auto",children:[e.jsxs("div",{className:"card p-8 flex gap-6 items-start",children:[e.jsx(ie,{size:88}),e.jsxs("div",{className:"flex-1 space-y-3",children:[e.jsx(h,{w:"w-48",h:"h-7"}),e.jsx(h,{w:"w-32",h:"h-4",delay:.05}),e.jsx(M,{lines:2}),e.jsx("div",{className:"flex gap-2",children:[...Array(4)].map((t,r)=>e.jsx(h,{w:"w-8",h:"h-8",rounded:"rounded-full"},r))})]})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[...Array(4)].map((t,r)=>e.jsx(Wt,{},r))})]}),admin:()=>e.jsxs("div",{className:"flex gap-0 min-h-[80vh]",children:[e.jsxs("div",{className:"w-60 flex-shrink-0 border-r border-[var(--border-color)] p-4 space-y-2",children:[e.jsx(h,{w:"w-full",h:"h-10",rounded:"rounded-xl"}),[...Array(8)].map((t,r)=>e.jsx(h,{w:"w-full",h:"h-9",rounded:"rounded-xl",delay:r*.03},r))]}),e.jsxs("div",{className:"flex-1 p-8 space-y-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx(h,{w:"w-40",h:"h-8"}),e.jsx(h,{w:"w-28",h:"h-10",rounded:"rounded-xl"})]}),e.jsx("div",{className:"grid grid-cols-4 gap-4",children:[...Array(4)].map((t,r)=>e.jsx(vt,{},r))}),e.jsx(Ks,{rows:6})]})]}),form:()=>e.jsx("div",{className:"container py-10 max-w-xl mx-auto",children:e.jsxs("div",{className:"card p-8 space-y-6",children:[e.jsx(h,{w:"w-40",h:"h-7"}),e.jsx(M,{lines:1}),[...Array(4)].map((t,r)=>e.jsxs("div",{className:"space-y-2",children:[e.jsx(h,{w:"w-24",h:"h-4",delay:r*.05}),e.jsx(h,{w:"w-full",h:"h-11",rounded:"rounded-xl",delay:r*.06})]},r)),e.jsx(h,{w:"w-full",h:"h-11",rounded:"rounded-xl",delay:.2})]})}),blank:()=>e.jsx("div",{className:"container py-10 space-y-4",children:[...Array(3)].map((t,r)=>e.jsx(h,{w:"w-full",h:"h-32",rounded:"rounded-2xl",delay:r*.08},r))})};function qs({layout:t="blank"}){const r=yt[t]||yt.blank;return e.jsx("div",{className:"animate-in fade-in duration-300 min-h-[60vh]","aria-hidden":!0,"aria-label":"Loading...",children:e.jsx(r,{})})}const Xs=p.lazy(()=>E(()=>import("./Home-WhZIQLcm.js"),__vite__mapDeps([2,3,1,4,5,6,7,8]))),Ws=p.lazy(()=>E(()=>import("./About-huC7YYLu.js"),__vite__mapDeps([9,3,1,10,4,5,6,7,8]))),Qs=p.lazy(()=>E(()=>import("./Projects-9W5qTCeS.js"),__vite__mapDeps([11,3,1,10,4,5,6,7,8]))),Js=p.lazy(()=>E(()=>import("./ProjectDetail-Be3ydZ_B.js"),__vite__mapDeps([12,3,1,4,6,7,8]))),Zs=p.lazy(()=>E(()=>import("./Feed-CFMZFL4O.js"),__vite__mapDeps([13,3,1]))),en=p.lazy(()=>E(()=>import("./Blogs-DL7HsxmM.js"),__vite__mapDeps([14,3,1,10,4,5,6,7,8]))),tn=p.lazy(()=>E(()=>import("./BlogDetail-DjM_qosA.js"),__vite__mapDeps([15,3,1,4,6,7,8]))),rn=p.lazy(()=>E(()=>import("./Posts-DzAtciyX.js"),__vite__mapDeps([16,3,1,10,4,5,6,7,8]))),an=p.lazy(()=>E(()=>import("./PostDetail-BaZ0JhKN.js"),__vite__mapDeps([17,3,1,4,6,7,8]))),sn=p.lazy(()=>E(()=>import("./Contact-DkpQlTkR.js"),__vite__mapDeps([18,3,1,10,4,5,6,7,8]))),nn=p.lazy(()=>E(()=>import("./Login-CCgM2rXU.js"),__vite__mapDeps([19,3,1,4,6,7,8]))),on=p.lazy(()=>E(()=>import("./Signup-iRwq9Wjn.js"),__vite__mapDeps([20,3,1,4,6,7,8]))),ln=p.lazy(()=>E(()=>import("./AuthAction-Dgjj8oFS.js"),__vite__mapDeps([21,3,1,6,7,8]))),cn=p.lazy(()=>E(()=>import("./Profile-DrevvUZJ.js"),__vite__mapDeps([22,3,1,4,6,7,8]))),dn=p.lazy(()=>E(()=>import("./PublicProfile-C0jZYf4K.js"),__vite__mapDeps([23,3,1,6,7,8]))),wt=p.lazy(()=>E(()=>import("./Admin-BVRa8J59.js"),__vite__mapDeps([24,3,1,6,7,8]))),un=p.lazy(()=>E(()=>import("./PrivacyPolicy-BfXxd01D.js"),__vite__mapDeps([25,3,1,4,6,7,8]))),pn=p.lazy(()=>E(()=>import("./CookiesPolicy-CY3-rDKG.js"),__vite__mapDeps([26,3,1,4,6,7,8]))),jt=p.lazy(()=>E(()=>import("./NotFound-xUmevErf.js"),__vite__mapDeps([27,3,1,8,6,7]))),fn={initial:{opacity:0,y:8},enter:{opacity:1,y:0,transition:{duration:.25,ease:[.16,1,.3,1]}},exit:{opacity:0,transition:{duration:.12,ease:"easeIn"}}},xn=["button:not(:disabled)","a[href]",'[role="button"]',".card"].join(","),mn=["input","textarea","select","option",'[contenteditable="true"]','[data-click-fx-ignore="true"]','[data-ripple-managed="true"]'].join(",");function hn(){return p.useEffect(()=>{const t=r=>{if(r.button!=null&&r.button!==0||!(r.target instanceof Element)||r.target.closest(mn))return;const a=r.target.closest(xn);if(!a)return;const s=a.getBoundingClientRect();if(!s.width||!s.height)return;const n=Math.max(s.width,s.height)*1.8,o=document.createElement("span");o.className="click-fx-burst",o.style.width=`${n}px`,o.style.height=`${n}px`,o.style.left=`${r.clientX-s.left-n/2}px`,o.style.top=`${r.clientY-s.top-n/2}px`,a.classList.add("click-fx-host"),a.appendChild(o),window.setTimeout(()=>o.remove(),680)};return document.addEventListener("pointerdown",t,{passive:!0}),()=>document.removeEventListener("pointerdown",t)},[]),null}function gn({children:t}){return e.jsx(v.motion.div,{variants:fn,initial:"initial",animate:"enter",exit:"exit",children:t})}function Qt({fullscreen:t=!1}){return e.jsx("div",{className:t?"fixed inset-0 z-[99999] flex items-center justify-center bg-[var(--bg-page)] px-4":"min-h-[60vh] flex items-center justify-center px-4",children:e.jsx(Us,{})})}function bn({children:t,onReady:r}){return p.useEffect(()=>{r==null||r()},[r]),t}function vn({children:t,layout:r="blank",initialPending:a,onReady:s}){return e.jsx(p.Suspense,{fallback:a?e.jsx(Qt,{fullscreen:!0}):e.jsx(qs,{layout:r}),children:e.jsx(bn,{onReady:s,children:t})})}function yn(){const t=re();return p.useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"auto"}),document.documentElement.scrollTop=0,document.body.scrollTop=0},[t.pathname,t.search]),null}function wn(){const t=pe();return p.useEffect(()=>{Ke().finally(()=>t("/",{replace:!0}))},[]),e.jsx(Qt,{})}function jn(){const t=re(),[r,a]=p.useState(!1),s=p.useCallback(()=>a(!0),[]),n=(o,l="blank")=>e.jsx(vn,{layout:l,initialPending:!r,onReady:s,children:e.jsx(gn,{children:o})});return e.jsx(v.AnimatePresence,{mode:"wait",initial:!1,children:e.jsxs(sr,{location:t,children:[e.jsxs(T,{element:e.jsx($s,{}),children:[e.jsx(T,{path:"/",element:n(e.jsx(Xs,{}),"hero")}),e.jsx(T,{path:"/about",element:n(e.jsx(Ws,{}),"profile")}),e.jsx(T,{path:"/projects",element:n(e.jsx(Qs,{}),"grid")}),e.jsx(T,{path:"/projects/:slug",element:n(e.jsx(Js,{}),"detail")}),e.jsx(T,{path:"/feed",element:n(e.jsx(Zs,{}),"list")}),e.jsx(T,{path:"/blogs",element:n(e.jsx(en,{}),"list")}),e.jsx(T,{path:"/blogs/:slug",element:n(e.jsx(tn,{}),"detail")}),e.jsx(T,{path:"/posts",element:n(e.jsx(rn,{}),"list")}),e.jsx(T,{path:"/posts/:slug",element:n(e.jsx(an,{}),"detail")}),e.jsx(T,{path:"/contact",element:n(e.jsx(sn,{}),"form")}),e.jsx(T,{path:"/login",element:n(e.jsx(nn,{}),"form")}),e.jsx(T,{path:"/signup",element:n(e.jsx(on,{}),"form")}),e.jsx(T,{path:"/logout",element:e.jsx(wn,{})}),e.jsx(T,{path:"/profile",element:n(e.jsx(cn,{}),"profile")}),e.jsx(T,{path:"/@:username",element:n(e.jsx(dn,{}),"profile")}),e.jsx(T,{path:"/admin",element:n(e.jsx(wt,{}),"admin")}),e.jsx(T,{path:"/admin/:tab",element:n(e.jsx(wt,{}),"admin")}),e.jsx(T,{path:"/privacy-policy",element:n(e.jsx(un,{}),"detail")}),e.jsx(T,{path:"/cookies-policy",element:n(e.jsx(pn,{}),"detail")}),e.jsx(T,{path:"/404",element:n(e.jsx(jt,{}),"blank")}),e.jsx(T,{path:"*",element:n(e.jsx(jt,{}),"blank")})]}),e.jsx(T,{path:"/auth/action",element:n(e.jsx(ln,{}),"form")})]},t.pathname)})}function kn(){return ds(),ps(),e.jsx(It,{children:e.jsxs(Hs,{children:[e.jsx(hn,{}),e.jsx(yn,{}),e.jsx(Fs,{}),e.jsx(Vs,{}),e.jsx(jn,{})]})})}Ae.createRoot(document.getElementById("root")).render(e.jsx(P.StrictMode,{children:e.jsx(nr,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:e.jsx(kn,{})})}));export{_n as H,qs as P,y as S,Wa as a,Yt as b,Pn as g,zn as t,us as u};
