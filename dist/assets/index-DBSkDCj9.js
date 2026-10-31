const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-DGX0eOVG.js","assets/ui-Y3ZzGT8G.js","assets/vendor-Dln_YgTi.js","assets/PropertyCard-DskwXPFN.js","assets/firebase-D_MbgrPy.js","assets/PropertyListing-C4Enlwo4.js","assets/BackButton-ByetnKs4.js","assets/PropertyDetail-CEWHFARH.js","assets/activitySync-q7LTTG1T.js","assets/Login-CYyCrMRA.js","assets/index-DvK_yDwh.js","assets/Register-Cc5u4o-D.js","assets/VerifyEmail-BuqwCVHj.js","assets/BuyerDashboard-CQnOWjUK.js","assets/firestoreProperties-BKIxeDF8.js","assets/SellerDashboard-D8KCd8UW.js","assets/propertyStore-CCk-RsD6.js","assets/BrokerDashboard-CF-ZL8C2.js","assets/BrokerClients-C-RXmqXT.js","assets/BuilderDashboard-Cq4qeVTJ.js","assets/Dashboard-BO54E3Rf.js","assets/AdminDashboard-B6T1CpRe.js","assets/projectStore-dPSda5W_.js","assets/AddProperty-D5K4DNgm.js","assets/EditProperty-BCMjUFXV.js","assets/ChatPage-BVIS4VPO.js","assets/SavedProperties-4WPyy_6j.js","assets/Profile-BaWj4aDP.js","assets/Notifications-D8_S3e7u.js","assets/Projects-7wCdlOZ-.js","assets/Blog-CDncd9Vj.js","assets/Resources-CU13V52k.js","assets/About-C8Ides5J.js","assets/HomeLoan-BN_JsTz4.js","assets/PropertyValuation-Dg8If2ZD.js","assets/jspdf.es.min-BSx8u2NS.js","assets/RentalAgreement-CaO2oD98.js"])))=>i.map(i=>d[i]);
var la=Object.defineProperty;var da=(e,t,a)=>t in e?la(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var re=(e,t,a)=>da(e,typeof t!="symbol"?t+"":t,a);import{G as p,j as r,z as ee,F as ua}from"./ui-Y3ZzGT8G.js";import{a as ha,r as l,R as be,u as pa,L as S,N as he,b as fa,c as R,B as ma}from"./vendor-Dln_YgTi.js";import{r as Te,_ as je,C as Ae,a as Je,E as St,o as Xe,F as ga,d as _e,g as Qe,b as va,v as ba,i as ya,c as wa,e as xa,f as ka,h as Ra,j as Ea,k as Sa,G as Ta,P as ja,l as Aa,m as q,n as $e,u as ae,s as V,p as te,q as pe,w as G,t as ce,x as fe,y as ot,z as ct,A as lt,B as dt,D as Ca,R as Pa,H as Ia,I as _a,J as Na,K as Ma,L as La,M as Y,N as Fe,O as Oa,Q as ut,S as Ne,T as Da,U as Ha,V as Me,W as za,X as Ba,Y as Va,Z as Ua,$ as $a,a0 as Fa,a1 as Ka,a2 as qa,a3 as Wa,a4 as Ga,a5 as xe}from"./firebase-D_MbgrPy.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=a(i);fetch(i.href,s)}})();var Ke={},ht=ha;Ke.createRoot=ht.createRoot,Ke.hydrateRoot=ht.hydrateRoot;var Tt=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(Tt||{}),Le={link:{rel:["amphtml","canonical","alternate"]},script:{type:["application/ld+json"]},meta:{charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}};Object.values(Tt);var Ze={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"};Object.entries(Ze).reduce((e,[t,a])=>(e[a]=t,e),{});var me="data-rh",Ya=e=>Array.isArray(e)?e.join(""):e,Ja=(e,t)=>{const a=Object.keys(e);for(let n=0;n<a.length;n+=1)if(t[a[n]]&&t[a[n]].includes(e[a[n]]))return!0;return!1},Oe=(e,t)=>Array.isArray(e)?e.reduce((a,n)=>(Ja(n,t)?a.priority.push(n):a.default.push(n),a),{priority:[],default:[]}):{default:e,priority:[]},Xa=["noscript","script","style"],qe=(e,t=!0)=>t===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),jt=e=>Object.keys(e).reduce((t,a)=>{const n=typeof e[a]<"u"?`${a}="${e[a]}"`:`${a}`;return t?`${t} ${n}`:n},""),Qa=(e,t,a,n)=>{const i=jt(a),s=Ya(t);return i?`<${e} ${me}="true" ${i}>${qe(s,n)}</${e}>`:`<${e} ${me}="true">${qe(s,n)}</${e}>`},Za=(e,t,a=!0)=>t.reduce((n,i)=>{const s=i,o=Object.keys(s).filter(f=>!(f==="innerHTML"||f==="cssText")).reduce((f,u)=>{const m=typeof s[u]>"u"?u:`${u}="${qe(s[u],a)}"`;return f?`${f} ${m}`:m},""),c=s.innerHTML||s.cssText||"",y=Xa.indexOf(e)===-1;return`${n}<${e} ${me}="true" ${o}${y?"/>":`>${c}</${e}>`}`},""),At=(e,t={})=>Object.keys(e).reduce((a,n)=>{const i=Ze[n];return a[i||n]=e[n],a},t),er=(e,t,a)=>{const n={key:t,[me]:!0},i=At(a,n);return[be.createElement("title",i,t)]},Ee=(e,t)=>t.map((a,n)=>{const i={key:n,[me]:!0};return Object.keys(a).forEach(s=>{const c=Ze[s]||s;if(c==="innerHTML"||c==="cssText"){const y=a.innerHTML||a.cssText;i.dangerouslySetInnerHTML={__html:y}}else i[c]=a[s]}),be.createElement(e,i)}),K=(e,t,a=!0)=>{switch(e){case"title":return{toComponent:()=>er(e,t.title,t.titleAttributes),toString:()=>Qa(e,t.title,t.titleAttributes,a)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>At(t),toString:()=>jt(t)};default:return{toComponent:()=>Ee(e,t),toString:()=>Za(e,t,a)}}},tr=({metaTags:e,linkTags:t,scriptTags:a,encode:n})=>{const i=Oe(e,Le.meta),s=Oe(t,Le.link),o=Oe(a,Le.script);return{priorityMethods:{toComponent:()=>[...Ee("meta",i.priority),...Ee("link",s.priority),...Ee("script",o.priority)],toString:()=>`${K("meta",i.priority,n)} ${K("link",s.priority,n)} ${K("script",o.priority,n)}`},metaTags:i.default,linkTags:s.default,scriptTags:o.default}},ar=e=>{const{baseTag:t,bodyAttributes:a,encode:n=!0,htmlAttributes:i,noscriptTags:s,styleTags:o,title:c="",titleAttributes:y,prioritizeSeoTags:f}=e;let{linkTags:u,metaTags:m,scriptTags:k}=e,E={toComponent:()=>{},toString:()=>""};return f&&({priorityMethods:E,linkTags:u,metaTags:m,scriptTags:k}=tr(e)),{priority:E,base:K("base",t,n),bodyAttributes:K("bodyAttributes",a,n),htmlAttributes:K("htmlAttributes",i,n),link:K("link",u,n),meta:K("meta",m,n),noscript:K("noscript",s,n),script:K("script",k,n),style:K("style",o,n),title:K("title",{title:c,titleAttributes:y},n)}},rr=ar,ke=[],Ct=!!(typeof window<"u"&&window.document&&window.document.createElement),nr=class{constructor(e,t){re(this,"instances",[]);re(this,"canUseDOM",Ct);re(this,"context");re(this,"value",{setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?ke:this.instances,add:e=>{(this.canUseDOM?ke:this.instances).push(e)},remove:e=>{const t=(this.canUseDOM?ke:this.instances).indexOf(e);(this.canUseDOM?ke:this.instances).splice(t,1)}}});this.context=e,this.canUseDOM=t||!1,t||(e.helmet=rr({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},ir={},sr=be.createContext(ir),ie,or=(ie=class extends l.Component{constructor(a){super(a);re(this,"helmetData");this.helmetData=new nr(this.props.context||{},ie.canUseDOM)}render(){return be.createElement(sr.Provider,{value:this.helmetData.value},this.props.children)}},re(ie,"canUseDOM",Ct),ie);const cr="modulepreload",lr=function(e){return"/"+e},pt={},T=function(t,a,n){let i=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),c=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(a.map(y=>{if(y=lr(y),y in pt)return;pt[y]=!0;const f=y.endsWith(".css"),u=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${u}`))return;const m=document.createElement("link");if(m.rel=f?"stylesheet":cr,f||(m.as="script"),m.crossOrigin="",m.href=y,c&&m.setAttribute("nonce",c),document.head.appendChild(m),f)return new Promise((k,E)=>{m.addEventListener("load",k),m.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${y}`)))})}))}function s(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return i.then(o=>{for(const c of o||[])c.status==="rejected"&&s(c.reason);return t().catch(s)})};function dr(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"},child:[]}]})(e)}function Ki(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",clipRule:"evenodd"},child:[]}]})(e)}function qi(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"},child:[]}]})(e)}function Wi(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"},child:[]}]})(e)}function Gi(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",clipRule:"evenodd"},child:[]}]})(e)}function Yi(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"},child:[]}]})(e)}function Ji(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z",clipRule:"evenodd"},child:[]}]})(e)}function Xi(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z",clipRule:"evenodd"},child:[]}]})(e)}function Qi(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",clipRule:"evenodd"},child:[]}]})(e)}function ur(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z",clipRule:"evenodd"},child:[]}]})(e)}function Zi(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"},child:[]}]})(e)}function es(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"},child:[]}]})(e)}function ts(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"},child:[]}]})(e)}function as(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",clipRule:"evenodd"},child:[]}]})(e)}function rs(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",clipRule:"evenodd"},child:[]}]})(e)}function hr(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z",clipRule:"evenodd"},child:[]}]})(e)}function pr(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"},child:[]}]})(e)}function ns(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"},child:[]}]})(e)}function is(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"},child:[]}]})(e)}function fr(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"},child:[]}]})(e)}function mr(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",clipRule:"evenodd"},child:[]}]})(e)}function gr(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"},child:[]},{tag:"path",attr:{d:"M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"},child:[]}]})(e)}function vr(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z",clipRule:"evenodd"},child:[]}]})(e)}function ss(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",clipRule:"evenodd"},child:[]}]})(e)}function br(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z",clipRule:"evenodd"},child:[]}]})(e)}function os(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z",clipRule:"evenodd"},child:[]}]})(e)}function cs(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"},child:[]}]})(e)}function ls(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z",clipRule:"evenodd"},child:[]}]})(e)}function ds(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z",clipRule:"evenodd"},child:[]}]})(e)}function us(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M10 12a2 2 0 100-4 2 2 0 000 4z"},child:[]},{tag:"path",attr:{fillRule:"evenodd",d:"M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",clipRule:"evenodd"},child:[]}]})(e)}function hs(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"},child:[]}]})(e)}function ps(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z",clipRule:"evenodd"},child:[]}]})(e)}function fs(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z",clipRule:"evenodd"},child:[]}]})(e)}function ms(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"},child:[]},{tag:"path",attr:{d:"M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"},child:[]},{tag:"path",attr:{d:"M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"},child:[]}]})(e)}function gs(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 100 2h1a2 2 0 011.732 1H7a1 1 0 100 2h2.732A2 2 0 018 11H7a1 1 0 00-.707 1.707l3 3a1 1 0 001.414-1.414l-1.483-1.484A4.008 4.008 0 0011.874 10H13a1 1 0 100-2h-1.126a3.976 3.976 0 00-.41-1H13a1 1 0 100-2H7z",clipRule:"evenodd"},child:[]}]})(e)}function vs(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z",clipRule:"evenodd"},child:[]}]})(e)}function bs(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"},child:[]},{tag:"path",attr:{fillRule:"evenodd",d:"M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z",clipRule:"evenodd"},child:[]}]})(e)}function ys(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"},child:[]}]})(e)}function ws(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"},child:[]}]})(e)}function xs(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"},child:[]}]})(e)}function ks(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z",clipRule:"evenodd"},child:[]}]})(e)}function Rs(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"},child:[]}]})(e)}function Es(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z",clipRule:"evenodd"},child:[]}]})(e)}function Ss(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z",clipRule:"evenodd"},child:[]}]})(e)}function Ts(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z",clipRule:"evenodd"},child:[]}]})(e)}function yr(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"},child:[]}]})(e)}function js(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z",clipRule:"evenodd"},child:[]}]})(e)}function As(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z",clipRule:"evenodd"},child:[]}]})(e)}function Cs(e){return p({attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"},child:[]}]})(e)}const Pt="@firebase/installations",et="0.6.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It=1e4,_t=`w:${et}`,Nt="FIS_v2",wr="https://firebaseinstallations.googleapis.com/v1",xr=60*60*1e3,kr="installations",Rr="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Er={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},se=new St(kr,Rr,Er);function Mt(e){return e instanceof ga&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lt({projectId:e}){return`${wr}/projects/${e}/installations`}function Ot(e){return{token:e.token,requestStatus:2,expiresIn:Tr(e.expiresIn),creationTime:Date.now()}}async function Dt(e,t){const n=(await t.json()).error;return se.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function Ht({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Sr(e,{refreshToken:t}){const a=Ht(e);return a.append("Authorization",jr(t)),a}async function zt(e){const t=await e();return t.status>=500&&t.status<600?e():t}function Tr(e){return Number(e.replace("s","000"))}function jr(e){return`${Nt} ${e}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ar({appConfig:e,heartbeatServiceProvider:t},{fid:a}){const n=Lt(e),i=Ht(e),s=t.getImmediate({optional:!0});if(s){const f=await s.getHeartbeatsHeader();f&&i.append("x-firebase-client",f)}const o={fid:a,authVersion:Nt,appId:e.appId,sdkVersion:_t},c={method:"POST",headers:i,body:JSON.stringify(o)},y=await zt(()=>fetch(n,c));if(y.ok){const f=await y.json();return{fid:f.fid||a,registrationStatus:2,refreshToken:f.refreshToken,authToken:Ot(f.authToken)}}else throw await Dt("Create Installation",y)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bt(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cr(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pr=/^[cdef][\w-]{21}$/,We="";function Ir(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const a=_r(e);return Pr.test(a)?a:We}catch{return We}}function _r(e){return Cr(e).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pe(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vt=new Map;function Ut(e,t){const a=Pe(e);$t(a,t),Nr(a,t)}function $t(e,t){const a=Vt.get(e);if(a)for(const n of a)n(t)}function Nr(e,t){const a=Mr();a&&a.postMessage({key:e,fid:t}),Lr()}let ne=null;function Mr(){return!ne&&"BroadcastChannel"in self&&(ne=new BroadcastChannel("[Firebase] FID Change"),ne.onmessage=e=>{$t(e.data.key,e.data.fid)}),ne}function Lr(){Vt.size===0&&ne&&(ne.close(),ne=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Or="firebase-installations-database",Dr=1,oe="firebase-installations-store";let De=null;function tt(){return De||(De=Xe(Or,Dr,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(oe)}}})),De}async function Ce(e,t){const a=Pe(e),i=(await tt()).transaction(oe,"readwrite"),s=i.objectStore(oe),o=await s.get(a);return await s.put(t,a),await i.done,(!o||o.fid!==t.fid)&&Ut(e,t.fid),t}async function Ft(e){const t=Pe(e),n=(await tt()).transaction(oe,"readwrite");await n.objectStore(oe).delete(t),await n.done}async function Ie(e,t){const a=Pe(e),i=(await tt()).transaction(oe,"readwrite"),s=i.objectStore(oe),o=await s.get(a),c=t(o);return c===void 0?await s.delete(a):await s.put(c,a),await i.done,c&&(!o||o.fid!==c.fid)&&Ut(e,c.fid),c}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function at(e){let t;const a=await Ie(e.appConfig,n=>{const i=Hr(n),s=zr(e,i);return t=s.registrationPromise,s.installationEntry});return a.fid===We?{installationEntry:await t}:{installationEntry:a,registrationPromise:t}}function Hr(e){const t=e||{fid:Ir(),registrationStatus:0};return Kt(t)}function zr(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(se.create("app-offline"));return{installationEntry:t,registrationPromise:i}}const a={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},n=Br(e,a);return{installationEntry:a,registrationPromise:n}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:Vr(e)}:{installationEntry:t}}async function Br(e,t){try{const a=await Ar(e,t);return Ce(e.appConfig,a)}catch(a){throw Mt(a)&&a.customData.serverCode===409?await Ft(e.appConfig):await Ce(e.appConfig,{fid:t.fid,registrationStatus:0}),a}}async function Vr(e){let t=await ft(e.appConfig);for(;t.registrationStatus===1;)await Bt(100),t=await ft(e.appConfig);if(t.registrationStatus===0){const{installationEntry:a,registrationPromise:n}=await at(e);return n||a}return t}function ft(e){return Ie(e,t=>{if(!t)throw se.create("installation-not-found");return Kt(t)})}function Kt(e){return Ur(e)?{fid:e.fid,registrationStatus:0}:e}function Ur(e){return e.registrationStatus===1&&e.registrationTime+It<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $r({appConfig:e,heartbeatServiceProvider:t},a){const n=Fr(e,a),i=Sr(e,a),s=t.getImmediate({optional:!0});if(s){const f=await s.getHeartbeatsHeader();f&&i.append("x-firebase-client",f)}const o={installation:{sdkVersion:_t,appId:e.appId}},c={method:"POST",headers:i,body:JSON.stringify(o)},y=await zt(()=>fetch(n,c));if(y.ok){const f=await y.json();return Ot(f)}else throw await Dt("Generate Auth Token",y)}function Fr(e,{fid:t}){return`${Lt(e)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rt(e,t=!1){let a;const n=await Ie(e.appConfig,s=>{if(!qt(s))throw se.create("not-registered");const o=s.authToken;if(!t&&Wr(o))return s;if(o.requestStatus===1)return a=Kr(e,t),s;{if(!navigator.onLine)throw se.create("app-offline");const c=Yr(s);return a=qr(e,c),c}});return a?await a:n.authToken}async function Kr(e,t){let a=await mt(e.appConfig);for(;a.authToken.requestStatus===1;)await Bt(100),a=await mt(e.appConfig);const n=a.authToken;return n.requestStatus===0?rt(e,t):n}function mt(e){return Ie(e,t=>{if(!qt(t))throw se.create("not-registered");const a=t.authToken;return Jr(a)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}async function qr(e,t){try{const a=await $r(e,t),n=Object.assign(Object.assign({},t),{authToken:a});return await Ce(e.appConfig,n),a}catch(a){if(Mt(a)&&(a.customData.serverCode===401||a.customData.serverCode===404))await Ft(e.appConfig);else{const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await Ce(e.appConfig,n)}throw a}}function qt(e){return e!==void 0&&e.registrationStatus===2}function Wr(e){return e.requestStatus===2&&!Gr(e)}function Gr(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+xr}function Yr(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function Jr(e){return e.requestStatus===1&&e.requestTime+It<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xr(e){const t=e,{installationEntry:a,registrationPromise:n}=await at(t);return n?n.catch(console.error):rt(t).catch(console.error),a.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qr(e,t=!1){const a=e;return await Zr(a),(await rt(a,t)).token}async function Zr(e){const{registrationPromise:t}=await at(e);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function en(e){if(!e||!e.options)throw He("App Configuration");if(!e.name)throw He("App Name");const t=["projectId","apiKey","appId"];for(const a of t)if(!e.options[a])throw He(a);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function He(e){return se.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wt="installations",tn="installations-internal",an=e=>{const t=e.getProvider("app").getImmediate(),a=en(t),n=Je(t,"heartbeat");return{app:t,appConfig:a,heartbeatServiceProvider:n,_delete:()=>Promise.resolve()}},rn=e=>{const t=e.getProvider("app").getImmediate(),a=Je(t,Wt).getImmediate();return{getId:()=>Xr(a),getToken:i=>Qr(a,i)}};function nn(){je(new Ae(Wt,an,"PUBLIC")),je(new Ae(tn,rn,"PRIVATE"))}nn();Te(Pt,et);Te(Pt,et,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sn="/firebase-messaging-sw.js",on="/firebase-cloud-messaging-push-scope",Gt="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",cn="https://fcmregistrations.googleapis.com/v1",Yt="google.c.a.c_id",ln="google.c.a.c_l",dn="google.c.a.ts",un="google.c.a.e";var gt;(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(gt||(gt={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var ge;(function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"})(ge||(ge={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function hn(e){const t="=".repeat((4-e.length%4)%4),a=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(a),i=new Uint8Array(n.length);for(let s=0;s<n.length;++s)i[s]=n.charCodeAt(s);return i}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ze="fcm_token_details_db",pn=5,vt="fcm_token_object_Store";async function fn(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(s=>s.name).includes(ze))return null;let t=null;return(await Xe(ze,pn,{upgrade:async(n,i,s,o)=>{var c;if(i<2||!n.objectStoreNames.contains(vt))return;const y=o.objectStore(vt),f=await y.index("fcmSenderId").get(e);if(await y.clear(),!!f){if(i===2){const u=f;if(!u.auth||!u.p256dh||!u.endpoint)return;t={token:u.fcmToken,createTime:(c=u.createTime)!==null&&c!==void 0?c:Date.now(),subscriptionOptions:{auth:u.auth,p256dh:u.p256dh,endpoint:u.endpoint,swScope:u.swScope,vapidKey:typeof u.vapidKey=="string"?u.vapidKey:Q(u.vapidKey)}}}else if(i===3){const u=f;t={token:u.fcmToken,createTime:u.createTime,subscriptionOptions:{auth:Q(u.auth),p256dh:Q(u.p256dh),endpoint:u.endpoint,swScope:u.swScope,vapidKey:Q(u.vapidKey)}}}else if(i===4){const u=f;t={token:u.fcmToken,createTime:u.createTime,subscriptionOptions:{auth:Q(u.auth),p256dh:Q(u.p256dh),endpoint:u.endpoint,swScope:u.swScope,vapidKey:Q(u.vapidKey)}}}}}})).close(),await _e(ze),await _e("fcm_vapid_details_db"),await _e("undefined"),mn(t)?t:null}function mn(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return typeof e.createTime=="number"&&e.createTime>0&&typeof e.token=="string"&&e.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gn="firebase-messaging-database",vn=1,ve="firebase-messaging-store";let Be=null;function Jt(){return Be||(Be=Xe(gn,vn,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(ve)}}})),Be}async function bn(e){const t=Xt(e),n=await(await Jt()).transaction(ve).objectStore(ve).get(t);if(n)return n;{const i=await fn(e.appConfig.senderId);if(i)return await nt(e,i),i}}async function nt(e,t){const a=Xt(e),i=(await Jt()).transaction(ve,"readwrite");return await i.objectStore(ve).put(t,a),await i.done,t}function Xt({appConfig:e}){return e.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yn={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},M=new St("messaging","Messaging",yn);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wn(e,t){const a=await st(e),n=Qt(t),i={method:"POST",headers:a,body:JSON.stringify(n)};let s;try{s=await(await fetch(it(e.appConfig),i)).json()}catch(o){throw M.create("token-subscribe-failed",{errorInfo:o==null?void 0:o.toString()})}if(s.error){const o=s.error.message;throw M.create("token-subscribe-failed",{errorInfo:o})}if(!s.token)throw M.create("token-subscribe-no-token");return s.token}async function xn(e,t){const a=await st(e),n=Qt(t.subscriptionOptions),i={method:"PATCH",headers:a,body:JSON.stringify(n)};let s;try{s=await(await fetch(`${it(e.appConfig)}/${t.token}`,i)).json()}catch(o){throw M.create("token-update-failed",{errorInfo:o==null?void 0:o.toString()})}if(s.error){const o=s.error.message;throw M.create("token-update-failed",{errorInfo:o})}if(!s.token)throw M.create("token-update-no-token");return s.token}async function kn(e,t){const n={method:"DELETE",headers:await st(e)};try{const s=await(await fetch(`${it(e.appConfig)}/${t}`,n)).json();if(s.error){const o=s.error.message;throw M.create("token-unsubscribe-failed",{errorInfo:o})}}catch(i){throw M.create("token-unsubscribe-failed",{errorInfo:i==null?void 0:i.toString()})}}function it({projectId:e}){return`${cn}/projects/${e}/registrations`}async function st({appConfig:e,installations:t}){const a=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${a}`})}function Qt({p256dh:e,auth:t,endpoint:a,vapidKey:n}){const i={web:{endpoint:a,auth:t,p256dh:e}};return n!==Gt&&(i.web.applicationPubKey=n),i}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rn=7*24*60*60*1e3;async function En(e){const t=await Tn(e.swRegistration,e.vapidKey),a={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:Q(t.getKey("auth")),p256dh:Q(t.getKey("p256dh"))},n=await bn(e.firebaseDependencies);if(n){if(jn(n.subscriptionOptions,a))return Date.now()>=n.createTime+Rn?Sn(e,{token:n.token,createTime:Date.now(),subscriptionOptions:a}):n.token;try{await kn(e.firebaseDependencies,n.token)}catch(i){console.warn(i)}return bt(e.firebaseDependencies,a)}else return bt(e.firebaseDependencies,a)}async function Sn(e,t){try{const a=await xn(e.firebaseDependencies,t),n=Object.assign(Object.assign({},t),{token:a,createTime:Date.now()});return await nt(e.firebaseDependencies,n),a}catch(a){throw a}}async function bt(e,t){const n={token:await wn(e,t),createTime:Date.now(),subscriptionOptions:t};return await nt(e,n),n.token}async function Tn(e,t){const a=await e.pushManager.getSubscription();return a||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:hn(t)})}function jn(e,t){const a=t.vapidKey===e.vapidKey,n=t.endpoint===e.endpoint,i=t.auth===e.auth,s=t.p256dh===e.p256dh;return a&&n&&i&&s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return An(t,e),Cn(t,e),Pn(t,e),t}function An(e,t){if(!t.notification)return;e.notification={};const a=t.notification.title;a&&(e.notification.title=a);const n=t.notification.body;n&&(e.notification.body=n);const i=t.notification.image;i&&(e.notification.image=i);const s=t.notification.icon;s&&(e.notification.icon=s)}function Cn(e,t){t.data&&(e.data=t.data)}function Pn(e,t){var a,n,i,s,o;if(!t.fcmOptions&&!(!((a=t.notification)===null||a===void 0)&&a.click_action))return;e.fcmOptions={};const c=(i=(n=t.fcmOptions)===null||n===void 0?void 0:n.link)!==null&&i!==void 0?i:(s=t.notification)===null||s===void 0?void 0:s.click_action;c&&(e.fcmOptions.link=c);const y=(o=t.fcmOptions)===null||o===void 0?void 0:o.analytics_label;y&&(e.fcmOptions.analyticsLabel=y)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function In(e){return typeof e=="object"&&!!e&&Yt in e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _n(e){if(!e||!e.options)throw Ve("App Configuration Object");if(!e.name)throw Ve("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:a}=e;for(const n of t)if(!a[n])throw Ve(n);return{appName:e.name,projectId:a.projectId,apiKey:a.apiKey,appId:a.appId,senderId:a.messagingSenderId}}function Ve(e){return M.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(t,a,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=_n(t);this.firebaseDependencies={app:t,appConfig:i,installations:a,analyticsProvider:n}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mn(e){try{e.swRegistration=await navigator.serviceWorker.register(sn,{scope:on}),e.swRegistration.update().catch(()=>{})}catch(t){throw M.create("failed-service-worker-registration",{browserErrorMessage:t==null?void 0:t.message})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ln(e,t){if(!t&&!e.swRegistration&&await Mn(e),!(!t&&e.swRegistration)){if(!(t instanceof ServiceWorkerRegistration))throw M.create("invalid-sw-registration");e.swRegistration=t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function On(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=Gt)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zt(e,t){if(!navigator)throw M.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw M.create("permission-blocked");return await On(e,t==null?void 0:t.vapidKey),await Ln(e,t==null?void 0:t.serviceWorkerRegistration),En(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dn(e,t,a){const n=Hn(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(n,{message_id:a[Yt],message_name:a[ln],message_time:a[dn],message_device_time:Math.floor(Date.now()/1e3)})}function Hn(e){switch(e){case ge.NOTIFICATION_CLICKED:return"notification_open";case ge.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zn(e,t){const a=t.data;if(!a.isFirebaseMessaging)return;e.onMessageHandler&&a.messageType===ge.PUSH_RECEIVED&&(typeof e.onMessageHandler=="function"?e.onMessageHandler(yt(a)):e.onMessageHandler.next(yt(a)));const n=a.data;In(n)&&n[un]==="1"&&await Dn(e,a.messageType,n)}const wt="@firebase/messaging",xt="0.12.12";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bn=e=>{const t=new Nn(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",a=>zn(t,a)),t},Vn=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:n=>Zt(t,n)}};function Un(){je(new Ae("messaging",Bn,"PUBLIC")),je(new Ae("messaging-internal",Vn,"PRIVATE")),Te(wt,xt),Te(wt,xt,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $n(){try{await ba()}catch{return!1}return typeof window<"u"&&ya()&&wa()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fn(e,t){if(!navigator)throw M.create("only-available-in-window");return e.onMessageHandler=t,()=>{e.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kn(e=va()){return $n().then(t=>{if(!t)throw M.create("unsupported-browser")},t=>{throw M.create("indexed-db-unsupported")}),Je(Qe(e),"messaging").getImmediate()}async function qn(e,t){return e=Qe(e),Zt(e,t)}function Wn(e,t){return e=Qe(e),Fn(e,t)}Un();const Gn={apiKey:"AIzaSyClgZMRUtPywHinq9t37Bm8641jEzOox2A",authDomain:"realstate-339cf.firebaseapp.com",projectId:"realstate-339cf",storageBucket:"realstate-339cf.firebasestorage.app",messagingSenderId:"432127506832",appId:"1:432127506832:web:df10e3227f644c0cf71b15",measurementId:"G-F1H6P35W4W",databaseURL:"https://realstate-339cf-default-rtdb.firebaseio.com"},ye=xa(Gn),C=ka(ye),P=Ra(ye),Yn=Ea(ye),F=Sa(ye);let Se=null;try{Se=Kn(ye)}catch(e){console.warn("Firebase Messaging not available:",e.message)}const kt=new Ta;new ja(C);const N={BUYER:"buyer",SELLER:"seller",BROKER:"broker",BUILDER:"builder",ADMIN:"super_admin"},Rt={[N.BUYER]:"/dashboard/buyer",[N.SELLER]:"/dashboard/seller",[N.BROKER]:"/dashboard/broker",[N.BUILDER]:"/dashboard/builder",[N.ADMIN]:"/dashboard/admin"},ea=e=>Rt[e]||Rt[N.BUYER],Ps={FLAT:"Flat",VILLA:"Villa",PLOT:"Plot",COMMERCIAL:"Commercial",OFFICE:"Office",SHOP:"Shop",PG:"PG",RENT:"Rent",HOSTEL:"Hostel",AGRICULTURE:"Agriculture",PAGRI:"Pagri"},Is={FURNISHED:"Fully Furnished",SEMI:"Semi Furnished",UNFURNISHED:"Unfurnished"},_s={SOLD:"sold"},Ns=["Swimming Pool","Gym","Park","Club House","Security","Power Backup","Lift","Rain Water Harvesting","Jogging Track","Children Play Area","Community Hall","Indoor Games","Tennis Court","Badminton Court","Yoga Center","Spa","Sauna","Jacuzzi","CCTV","Intercom","Visitor Parking","24x7 Water","Gas Pipeline","Vaastu Compliant"],Ms=["East","West","North","South","North-East","North-West","South-East","South-West"],Ls=["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar","Chandigarh","Dadra and Nagar Haveli","Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"],Jn=[{state:"Maharashtra",cities:["Mumbai","Pune","Nagpur","Thane","Navi Mumbai","Aurangabad","Nashik","Solapur","Kolhapur","Amravati"]},{state:"Delhi NCR",cities:["Delhi","Noida","Gurgaon","Faridabad","Ghaziabad"]},{state:"Karnataka",cities:["Bangalore","Mysore","Hubli","Mangalore","Belgaum"]},{state:"Telangana",cities:["Hyderabad","Warangal","Karimnagar"]},{state:"Tamil Nadu",cities:["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem"]},{state:"West Bengal",cities:["Kolkata","Howrah","Durgapur","Asansol","Siliguri"]},{state:"Gujarat",cities:["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar"]},{state:"Rajasthan",cities:["Jaipur","Jodhpur","Udaipur","Kota","Bikaner","Ajmer"]},{state:"Uttar Pradesh",cities:["Lucknow","Agra","Varanasi","Kanpur","Prayagraj","Meerut","Bareilly"]},{state:"Punjab",cities:["Chandigarh","Ludhiana","Amritsar","Jalandhar","Patiala"]},{state:"Madhya Pradesh",cities:["Indore","Bhopal","Gwalior","Jabalpur","Ujjain"]},{state:"Bihar",cities:["Patna","Gaya","Bhagalpur","Muzaffarpur"]},{state:"Odisha",cities:["Bhubaneswar","Cuttack","Rourkela"]},{state:"Chhattisgarh",cities:["Raipur","Bilaspur","Korba"]},{state:"Jharkhand",cities:["Ranchi","Jamshedpur","Dhanbad"]},{state:"Kerala",cities:["Kochi","Thiruvananthapuram","Kozhikode","Thrissur"]},{state:"Haryana",cities:["Panchkula","Ambala","Karnal","Hisar"]},{state:"Uttarakhand",cities:["Dehradun","Haridwar","Rishikesh","Haldwani"]}],Os=Jn.flatMap(e=>e.cities),Ds=["1 RK","1 BHK","2 BHK","3 BHK","4 BHK","5+ BHK"],I={USERS:"users",PROPERTIES:"properties",CHATS:"chats",MESSAGES:"messages",VISITS:"visits",REVIEWS:"reviews",SUBSCRIPTIONS:"subscriptions",TRANSACTIONS:"transactions",NOTIFICATIONS:"notifications",BANNERS:"banners",BLOG:"blog",LEADS:"leads",CLIENTS:"clients",REPORTS:"reports",SAVED_PROPERTIES:"saved_properties"},ue="₹",ta=l.createContext();function Xn({children:e}){const[t,a]=l.useState(null),[n,i]=l.useState(null),[s,o]=l.useState(!0);l.useEffect(()=>{const v=Aa(C,async h=>{a(h),h?await c(h.uid):i(null),o(!1)});return()=>v()},[]);const c=async v=>{var h,d,b,w,A;try{const g=q(P,I.USERS,v),$=await $e(g);if($.exists()){const H=$.data(),z=((h=C.currentUser)==null?void 0:h.email)||"";(z==="admin@rstate.in"||z==="punjabfoodsrte@gmail.com")&&H.role!==N.ADMIN&&(await ae(g,{role:N.ADMIN}),H.role=N.ADMIN);const W={id:v,...H};return i(W),W}else{const H=((d=C.currentUser)==null?void 0:d.email)||"",z=H==="admin@rstate.in"||H==="punjabfoodsrte@gmail.com",Z={uid:v,email:H,displayName:((b=C.currentUser)==null?void 0:b.displayName)||"",phone:((w=C.currentUser)==null?void 0:w.phoneNumber)||"",photoURL:((A=C.currentUser)==null?void 0:A.photoURL)||"",role:z?N.ADMIN:N.BUYER,createdAt:V(),lastLogin:V(),isVerified:!1,isActive:!0,subscription:"basic",preferences:{},savedProperties:[]};await te(g,Z);const W={id:v,...Z};return i(W),W}}catch(g){return console.error("Error fetching profile:",g),null}},y=async(v,h,d,b=N.BUYER)=>{const w=await lt(C,v,h);return await dt(w.user,{displayName:d}),await te(q(P,I.USERS,w.user.uid),{uid:w.user.uid,email:v,displayName:d,phone:"",photoURL:"",role:b,createdAt:V(),lastLogin:V(),isVerified:!1,isActive:!0,subscription:"basic",preferences:{}}),i({id:w.user.uid,email:v,displayName:d,phone:"",photoURL:"",role:b,isVerified:!1,isActive:!0,subscription:"basic",preferences:{}}),w.user},f=async(v,h)=>{const d=await ot(C,v,h),b=await c(d.user.uid);return{user:d.user,profile:b}},u=async(v=N.BUYER)=>{kt.setCustomParameters({prompt:"select_account"});const h=await La(C,kt),d=h.user.uid,b=h.user.email,w=q(P,I.USERS,d),A=await $e(w);let g=null;if(!A.exists()&&b){const Z=pe(ce(P,I.USERS),G("email","==",b)),W=await fe(Z);W.empty||(g=W.docs[0].data())}const $=!A.exists()&&!g,H=(g==null?void 0:g.role)||v;A.exists()?await te(w,{lastLogin:V()},{merge:!0}):g?await te(w,{uid:d,email:b,displayName:h.user.displayName||g.displayName||"",phone:h.user.phoneNumber||g.phone||"",photoURL:h.user.photoURL||g.photoURL||"",role:H,createdAt:g.createdAt||V(),lastLogin:V(),isVerified:g.isVerified??!0,isActive:g.isActive??!0,subscription:g.subscription||"basic",preferences:g.preferences||{},...g.savedProperties?{savedProperties:g.savedProperties}:{},...g.bio?{bio:g.bio}:{}}):await te(w,{uid:d,email:b,displayName:h.user.displayName,phone:h.user.phoneNumber||"",photoURL:h.user.photoURL||"",role:v,createdAt:V(),lastLogin:V(),isVerified:!0,isActive:!0,subscription:"basic",preferences:{}});const z=await c(d);return{user:h.user,isNewAccount:$,profile:z}},m=async()=>{await ct(C),a(null),i(null)},k=async v=>{await Ma(C,v)},E=async()=>{const v=C.currentUser;if(!v)throw new Error("No authenticated user");v.emailVerified||await Na(v,{url:`${window.location.origin}/verify-email`,handleCodeInApp:!0})},j=async()=>{const v=C.currentUser;return v?(await _a(v),a({...v}),await c(v.uid),v):null},X={user:t,userProfile:n,loading:s,register:y,login:f,loginWithGoogle:u,logout:m,resetPassword:k,sendVerificationEmail:E,refreshUser:j,verifyEmailCode:async v=>(await Ia(C,v),j()),setupRecaptcha:v=>(window.recaptchaVerifier=new Pa(C,v,{size:"invisible",callback:()=>{}}),window.recaptchaVerifier),sendOTP:async(v,h)=>await Ca(C,v,h),verifyOTP:async(v,h)=>(await v.confirm(h)).user,registerWithPhone:async(v,h,d,b,w=N.BUYER)=>{const $=(await v.confirm(h)).user.phoneNumber||"",H=`phone_${$.replace(/[^0-9]/g,"")}@rstate.local`;await ct(C);const z=await lt(C,H,b);return await dt(z.user,{displayName:d}),await te(q(P,I.USERS,z.user.uid),{uid:z.user.uid,email:H,displayName:d,phone:$,photoURL:"",role:w,createdAt:V(),lastLogin:V(),isVerified:!1,isActive:!0,subscription:"basic",preferences:{},savedProperties:[]}),await c(z.user.uid),z.user},loginWithPhone:async(v,h)=>{const d=pe(ce(P,I.USERS),G("phone","==",v)),b=await fe(d);if(b.empty)throw new Error("No account found with this phone number");const w=b.docs[0].data();if(!w.email)throw new Error("No login credentials found for this phone number");const A=await ot(C,w.email,h),g=await c(A.user.uid);return{user:A.user,profile:g}},updateUserRole:async(v,h)=>{await te(q(P,I.USERS,v),{role:h},{merge:!0}),i(d=>({...d,role:h}))},updateUserProfile:async v=>{await te(q(P,I.USERS,t.uid),v,{merge:!0}),i(h=>({...h,...v}))},fetchUserProfile:c};return r.jsx(ta.Provider,{value:X,children:e})}const we=()=>{const e=l.useContext(ta);if(!e)throw new Error("useAuth must be used within AuthProvider");return e},aa=l.createContext();function Qn({children:e}){const[t,a]=l.useState(()=>{const i=localStorage.getItem("theme");return i?i==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches});l.useEffect(()=>{const i=document.documentElement;t?(i.classList.add("dark"),localStorage.setItem("theme","dark")):(i.classList.remove("dark"),localStorage.setItem("theme","light"))},[t]);const n=()=>a(i=>!i);return r.jsx(aa.Provider,{value:{darkMode:t,toggleTheme:n},children:e})}const Zn=()=>{const e=l.useContext(aa);if(!e)throw new Error("useTheme must be used within ThemeProvider");return e},ra=l.createContext();function ei({children:e}){const{user:t}=we(),[a,n]=l.useState([]),[i,s]=l.useState(0),[o,c]=l.useState(null);l.useEffect(()=>{if(!(!t||!F))try{const u=Y(F,`notifications/${t.uid}`),m=Fe(u,k=>{const E={id:k.key,...k.val()};n(j=>[E,...j]),E.read||s(j=>j+1)});return()=>m()}catch(u){console.warn("Notification listener failed:",u.message)}},[t]),l.useEffect(()=>{if(!(!t||!F))try{const u=Y(F,`notifications/${t.uid}`),m=Oa(u,k=>{const E={id:k.key,...k.val()};n(j=>j.map(L=>L.id===E.id?E:L))});return()=>m()}catch(u){console.warn("Notification change listener failed:",u.message)}},[t]),l.useEffect(()=>{if(!t||!Se)return;(async()=>{try{if(await Notification.requestPermission()!=="granted")return;try{const k=await qn(Se,{vapidKey:""});c(k)}catch{console.warn("Firebase messaging unavailable (no service worker)")}}catch{console.warn("Notification permission denied")}})();try{const m=Wn(Se,k=>{n(E=>{var j,L;return[{id:Date.now(),title:(j=k.notification)==null?void 0:j.title,message:(L=k.notification)==null?void 0:L.body,timestamp:Date.now(),read:!1},...E]})});return()=>m()}catch{console.warn("Firebase onMessage not available")}},[t]);const y=async u=>{try{const{ref:m,update:k}=await T(async()=>{const{ref:E,update:j}=await import("./firebase-D_MbgrPy.js").then(L=>L.a9);return{ref:E,update:j}},[]);await k(Y(F,`notifications/${t.uid}/${u}`),{read:!0}),s(E=>Math.max(0,E-1))}catch(m){console.warn("Failed to mark notification:",m.message)}},f=()=>{n([]),s(0)};return r.jsx(ra.Provider,{value:{notifications:a,unreadCount:i,fcmToken:o,markAsRead:y,clearNotifications:f},children:e})}const ti=()=>{const e=l.useContext(ra);if(!e)throw new Error("useNotifications must be used within NotificationProvider");return e},Hs=e=>e?e>=1e7?`${ue}${(e/1e7).toFixed(2)} Cr`:e>=1e5?`${ue}${(e/1e5).toFixed(2)} L`:e>=1e3?`${ue}${(e/1e3).toFixed(1)}K`:`${ue}${e.toLocaleString("en-IN")}`:`${ue}0`,zs=e=>`${e.toLocaleString("en-IN")} sq.ft`,ai=e=>e?(e.toDate?e.toDate():new Date(e)).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):"",Bs=e=>{if(!e)return"";const t=e.toDate?e.toDate():new Date(e),n=new Date-t,i=Math.floor(n/6e4),s=Math.floor(n/36e5),o=Math.floor(n/864e5);return i<1?"Just now":i<60?`${i} min ago`:s<24?`${s} hour${s>1?"s":""} ago`:o<7?`${o} day${o>1?"s":""} ago`:ai(e)},Vs=e=>({Flat:"🏢",Villa:"🏡",Plot:"🗺️",Commercial:"🏬",Office:"🏢",Shop:"🏪",PG:"🏠",Rent:"🔑",Hostel:"🏨"})[e]||"🏠",Us=(e,t,a)=>{const n=t/1200,i=a*12,s=e*n*Math.pow(1+n,i)/(Math.pow(1+n,i)-1);return Math.round(s)},ri=e=>e?e.split(" ").map(t=>t[0]).join("").toUpperCase().slice(0,2):"U",na="rstate_settings",Re={brandName:"Rstate",tagline:"India's most trusted real estate platform. Find your perfect home with AI-powered search and verified listings.",description:"A modern real estate platform connecting buyers, sellers, brokers and builders with AI-powered search and verified listings.",contactPhone:"1800-123-4567",contactEmail:"support@rstate.in",contactAddress:"91 Springboard, Sector 1, Noida, Uttar Pradesh 201301",copyright:"© 2026 Rstate. All rights reserved.",socialLinks:[{label:"FB",name:"Facebook",url:"https://facebook.com/rstate",icon:"FaFacebookF"},{label:"TW",name:"Twitter",url:"https://twitter.com/rstate",icon:"FaTwitter"},{label:"IG",name:"Instagram",url:"https://instagram.com/rstate",icon:"FaInstagram"},{label:"LN",name:"LinkedIn",url:"https://linkedin.com/company/rstate",icon:"FaLinkedinIn"}]};let le=ni();function ni(){try{const e=localStorage.getItem(na);if(e){const t=JSON.parse(e);return{...Re,...t,socialLinks:t.socialLinks||Re.socialLinks}}}catch(e){console.warn("localStorage read error:",e)}return{...Re,socialLinks:Re.socialLinks.map(e=>({...e}))}}function ii(){try{localStorage.setItem(na,JSON.stringify(le))}catch(e){console.warn("localStorage write error:",e)}}const Ge=new Set;function ia(){return le}function $s(e){le={...le,...e,socialLinks:e.socialLinks||le.socialLinks},ii(),Ge.forEach(t=>t(le))}function sa(e){return Ge.add(e),()=>Ge.delete(e)}function si(){const[e,t]=l.useState(!1),[a,n]=l.useState(!1),[i,s]=l.useState(ia().brandName),{user:o,userProfile:c,logout:y}=we(),{darkMode:f,toggleTheme:u}=Zn(),{unreadCount:m}=ti(),k=l.useRef(),E=pa();l.useEffect(()=>sa(x=>s(x.brandName)),[]);const j=o&&(c!=null&&c.role)&&c.role!==N.BUYER?ea(c.role):"/home",L=[{label:"Dashboard",to:"/dashboard"},{label:"My Profile",to:"/profile"},{label:"Saved Properties",to:"/saved-properties"}],de=x=>x==="/dashboard"?E.pathname.startsWith("/dashboard"):E.pathname.startsWith(x);return l.useEffect(()=>{const x=O=>{k.current&&!k.current.contains(O.target)&&n(!1)};return document.addEventListener("mousedown",x),()=>document.removeEventListener("mousedown",x)},[]),r.jsxs("nav",{className:"fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-dark-900/95 backdrop-blur-md border-b border-dark-100 dark:border-dark-800",children:[r.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:r.jsxs("div",{className:"flex items-center justify-between h-16",children:[r.jsxs(S,{to:j,className:"flex items-center gap-2",children:[r.jsx("div",{className:"w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center",children:r.jsx("span",{className:"text-white font-bold text-sm",children:(i==null?void 0:i[0])||"R"})}),r.jsx("span",{className:"text-xl font-bold font-heading gradient-text",children:i})]}),o&&r.jsx("div",{className:"hidden md:flex items-center gap-1 mx-4 relative z-10",children:L.map(x=>r.jsx(S,{to:x.to,className:`cursor-pointer select-none px-3 py-2 rounded-lg text-sm font-medium transition-colors ${de(x.to)?"bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300":"text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 hover:text-dark-900 dark:hover:text-dark-50"}`,children:x.label},x.label))}),r.jsxs("div",{className:"flex items-center gap-3",children:[o&&["seller","broker","builder","super_admin"].includes(c==null?void 0:c.role)&&r.jsxs(S,{to:"/add-property",className:"hidden md:flex btn-primary text-sm px-4 py-2 items-center gap-1.5",children:[r.jsx(hr,{className:"w-4 h-4"})," Post Property"]}),r.jsx("button",{onClick:u,className:"p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors",children:f?r.jsx(ur,{className:"w-5 h-5"}):r.jsx(fr,{className:"w-5 h-5"})}),o?r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsxs(S,{to:"/notifications",className:"relative p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors",children:[r.jsx(yr,{className:"w-5 h-5"}),m>0&&r.jsx("span",{className:"absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center",children:m>9?"9+":m})]}),r.jsxs("div",{className:"relative",ref:k,children:[r.jsx("button",{onClick:()=>n(!a),className:"flex items-center gap-2 p-1.5 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors",children:c!=null&&c.photoURL?r.jsx("img",{src:c.photoURL,alt:"",className:"w-8 h-8 rounded-full object-cover"}):r.jsx("div",{className:"w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium",children:ri(c==null?void 0:c.displayName)})}),a&&r.jsxs("div",{className:"absolute right-0 mt-2 w-64 bg-white dark:bg-dark-800 rounded-xl shadow-xl border border-dark-100 dark:border-dark-700 z-20 py-2",children:[r.jsxs("div",{className:"px-4 py-3 border-b border-dark-100 dark:border-dark-700",children:[r.jsx("p",{className:"font-semibold text-sm",children:(c==null?void 0:c.displayName)||"User"}),r.jsx("p",{className:"text-xs text-dark-500",children:o.email}),r.jsx("span",{className:"inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 capitalize",children:c==null?void 0:c.role})]}),r.jsx(S,{to:`/dashboard/${(c==null?void 0:c.role)==="super_admin"?"admin":c==null?void 0:c.role}`,className:"block px-4 py-2.5 text-sm hover:bg-dark-50 dark:hover:bg-dark-700 transition-colors",onClick:()=>n(!1),children:"Dashboard"}),(c==null?void 0:c.role)==="super_admin"&&r.jsx(S,{to:"/dashboard/admin",className:"block px-4 py-2.5 text-sm text-primary-600 font-semibold hover:bg-dark-50 dark:hover:bg-dark-700 transition-colors",onClick:()=>n(!1),children:"⚡ Admin Panel"}),r.jsx(S,{to:"/profile",className:"block px-4 py-2.5 text-sm hover:bg-dark-50 dark:hover:bg-dark-700 transition-colors",onClick:()=>n(!1),children:"My Profile"}),r.jsx(S,{to:"/saved-properties",className:"block px-4 py-2.5 text-sm hover:bg-dark-50 dark:hover:bg-dark-700 transition-colors",onClick:()=>n(!1),children:"Saved Properties"}),r.jsx("hr",{className:"my-1 border-dark-100 dark:border-dark-700"}),r.jsxs("button",{onClick:()=>{y(),n(!1)},className:"w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2",children:[r.jsx(vr,{className:"w-4 h-4"})," Sign Out"]})]})]})]}):r.jsxs("div",{className:"flex items-center gap-2",children:[r.jsx(S,{to:"/login",className:`${E.pathname==="/login"?"btn-primary":"btn-secondary"} text-sm px-4 py-2`,children:"Login"}),r.jsx(S,{to:"/register",className:`${E.pathname==="/register"?"btn-primary":"btn-secondary"} text-sm px-4 py-2`,children:"Register"})]}),r.jsx("button",{onClick:()=>t(!e),className:"lg:hidden p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800",children:e?r.jsx(dr,{className:"w-6 h-6"}):r.jsx(mr,{className:"w-6 h-6"})})]})]})}),e&&r.jsxs("div",{className:"lg:hidden border-t border-dark-100 dark:border-dark-800 bg-white dark:bg-dark-900 px-4 pb-3 pt-2 space-y-1",children:[r.jsx(S,{to:"/properties?category=buy",onClick:()=>t(!1),className:"block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-dark-50 dark:hover:bg-dark-800",children:"Buy"}),r.jsx(S,{to:"/properties?category=rent",onClick:()=>t(!1),className:"block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-dark-50 dark:hover:bg-dark-800",children:"Rent"}),r.jsx(S,{to:"/properties?type=PG",onClick:()=>t(!1),className:"block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-dark-50 dark:hover:bg-dark-800",children:"PG"}),r.jsx(S,{to:"/properties?type=Commercial",onClick:()=>t(!1),className:"block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-dark-50 dark:hover:bg-dark-800",children:"Commercial"}),r.jsx(S,{to:"/projects",onClick:()=>t(!1),className:"block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-dark-50 dark:hover:bg-dark-800",children:"Projects"}),o&&r.jsxs(r.Fragment,{children:[r.jsx("hr",{className:"my-1 border-dark-100 dark:border-dark-800"}),L.map(x=>r.jsx(S,{to:x.to,onClick:()=>t(!1),className:"block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-dark-50 dark:hover:bg-dark-800",children:x.label},x.label))]})]})]})}function oi(e){return p({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"},child:[]}]})(e)}function ci(e){return p({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"},child:[]}]})(e)}function li(e){return p({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"},child:[]}]})(e)}function di(e){return p({attr:{viewBox:"0 0 320 512"},child:[{tag:"path",attr:{d:"M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"},child:[]}]})(e)}const ui={FaFacebookF:di,FaTwitter:oi,FaInstagram:li,FaLinkedinIn:ci};function hi(){const[e,t]=l.useState(ia());l.useEffect(()=>sa(f=>t(f)),[]);const{brandName:a="Rstate",tagline:n="",contactPhone:i="",contactEmail:s="",contactAddress:o="",copyright:c="© 2026 Rstate. All rights reserved.",socialLinks:y=[]}=e;return r.jsx("footer",{className:"bg-dark-900 dark:bg-dark-950 text-dark-300 border-t border-dark-800",children:r.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",children:[r.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",children:[r.jsxs("div",{children:[r.jsxs(S,{to:"/",className:"flex items-center gap-2 mb-4",children:[r.jsx("div",{className:"w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center",children:r.jsx("span",{className:"text-white font-bold text-sm",children:(a==null?void 0:a[0])||"R"})}),r.jsx("span",{className:"text-xl font-bold text-white",children:a})]}),r.jsx("p",{className:"text-sm text-dark-400 mb-4",children:n}),r.jsx("div",{className:"flex gap-3",children:y.map(f=>{const u=ui[f.icon];return r.jsx("a",{href:f.url,target:"_blank",rel:"noopener noreferrer",className:"w-9 h-9 bg-dark-800 rounded-lg flex items-center justify-center text-dark-400 hover:bg-primary-600 hover:text-white transition-colors",children:u?r.jsx(u,{}):f.label},f.label)})})]}),r.jsxs("div",{children:[r.jsx("h3",{className:"text-white font-semibold mb-4",children:"Quick Links"}),r.jsx("ul",{className:"space-y-2.5",children:[{name:"Buy Property",path:"/properties?category=buy"},{name:"Rent Property",path:"/properties?category=rent"},{name:"Sell Property",path:"/add-property"},{name:"PG / Hostel",path:"/properties?type=PG"},{name:"Commercial",path:"/properties?type=Commercial"},{name:"New Projects",path:"/projects"}].map(f=>r.jsx("li",{children:r.jsx(S,{to:f.path,className:"text-sm hover:text-primary-400 transition-colors",children:f.name})},f.name))})]}),r.jsxs("div",{children:[r.jsx("h3",{className:"text-white font-semibold mb-4",children:"Resources"}),r.jsxs("ul",{className:"space-y-2.5",children:[r.jsx("li",{children:r.jsx(S,{to:"/home-loan",className:"text-sm hover:text-primary-400 transition-colors",children:"Home Loan Calculator"})}),r.jsx("li",{children:r.jsx(S,{to:"/property-valuation",className:"text-sm hover:text-primary-400 transition-colors",children:"Property Valuation"})}),r.jsx("li",{children:r.jsx(S,{to:"/rental-agreement",className:"text-sm hover:text-primary-400 transition-colors",children:"Rental Agreement"})}),r.jsx("li",{children:r.jsx(S,{to:"/blog",className:"text-sm hover:text-primary-400 transition-colors",children:"Blog & News"})}),r.jsx("li",{children:r.jsx(S,{to:"/resources",className:"text-sm hover:text-primary-400 transition-colors",children:"Market Trends"})}),r.jsx("li",{children:r.jsx(S,{to:"/resources",className:"text-sm hover:text-primary-400 transition-colors",children:"Real Estate Guide"})})]})]}),r.jsxs("div",{children:[r.jsx("h3",{className:"text-white font-semibold mb-4",children:"Contact"}),r.jsxs("div",{className:"space-y-3",children:[r.jsxs("div",{className:"flex items-start gap-3",children:[r.jsx(br,{className:"w-5 h-5 text-primary-400 mt-0.5 shrink-0"}),r.jsx("span",{className:"text-sm",children:o})]}),r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx(pr,{className:"w-5 h-5 text-primary-400 shrink-0"}),r.jsx("span",{className:"text-sm",children:i})]}),r.jsxs("div",{className:"flex items-center gap-3",children:[r.jsx(gr,{className:"w-5 h-5 text-primary-400 shrink-0"}),r.jsx("span",{className:"text-sm",children:s})]})]})]})]}),r.jsxs("div",{className:"mt-10 pt-8 border-t border-dark-800 flex flex-col md:flex-row justify-between items-center gap-4",children:[r.jsx("p",{className:"text-sm text-dark-500",children:c}),r.jsxs("div",{className:"flex gap-6 text-sm text-dark-500",children:[r.jsx(S,{to:"/privacy",className:"hover:text-primary-400",children:"Privacy Policy"}),r.jsx(S,{to:"/terms",className:"hover:text-primary-400",children:"Terms of Service"}),r.jsx(S,{to:"/sitemap",className:"hover:text-primary-400",children:"Sitemap"})]})]})]})})}function Ye(){return r.jsx("div",{className:"min-h-[60vh] flex items-center justify-center",children:r.jsxs("div",{className:"text-center",children:[r.jsx("div",{className:"w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"}),r.jsx("p",{className:"text-dark-500",children:"Loading..."})]})})}function B({children:e,allowedRoles:t}){const{user:a,userProfile:n,loading:i}=we();return i?r.jsx(Ye,{}):a?t&&n&&!t.includes(n.role)?r.jsx(he,{to:"/",replace:!0}):e:r.jsx(he,{to:"/login",replace:!0})}const pi=l.lazy(()=>T(()=>import("./Home-DGX0eOVG.js"),__vite__mapDeps([0,1,2,3,4]))),fi=l.lazy(()=>T(()=>import("./PropertyListing-C4Enlwo4.js"),__vite__mapDeps([5,1,2,4,3,6]))),mi=l.lazy(()=>T(()=>import("./PropertyDetail-CEWHFARH.js"),__vite__mapDeps([7,1,2,3,4,8]))),gi=l.lazy(()=>T(()=>import("./Login-CYyCrMRA.js"),__vite__mapDeps([9,1,2,10,4]))),vi=l.lazy(()=>T(()=>import("./Register-Cc5u4o-D.js"),__vite__mapDeps([11,1,2,10,4]))),bi=l.lazy(()=>T(()=>import("./VerifyEmail-BuqwCVHj.js"),__vite__mapDeps([12,1,2,4]))),yi=l.lazy(()=>T(()=>import("./BuyerDashboard-CQnOWjUK.js"),__vite__mapDeps([13,1,2,6,14,4,8]))),wi=l.lazy(()=>T(()=>import("./SellerDashboard-D8KCd8UW.js"),__vite__mapDeps([15,1,2,4,16,6]))),xi=l.lazy(()=>T(()=>import("./BrokerDashboard-CF-ZL8C2.js"),__vite__mapDeps([17,1,2,4,16]))),ki=l.lazy(()=>T(()=>import("./BrokerClients-C-RXmqXT.js"),__vite__mapDeps([18,1,2,4,6]))),Ri=l.lazy(()=>T(()=>import("./BuilderDashboard-Cq4qeVTJ.js"),__vite__mapDeps([19,1,2,4]))),Ei=l.lazy(()=>T(()=>import("./Dashboard-BO54E3Rf.js"),__vite__mapDeps([20,1,2,4]))),Si=l.lazy(()=>T(()=>import("./AdminDashboard-B6T1CpRe.js"),__vite__mapDeps([21,1,2,4,22]))),Ti=l.lazy(()=>T(()=>import("./AddProperty-D5K4DNgm.js"),__vite__mapDeps([23,1,2,16,6,4]))),ji=l.lazy(()=>T(()=>import("./EditProperty-BCMjUFXV.js"),__vite__mapDeps([24,1,2,4,16,6]))),Et=l.lazy(()=>T(()=>import("./ChatPage-BVIS4VPO.js"),__vite__mapDeps([25,1,2,6,4]))),Ai=l.lazy(()=>T(()=>import("./SavedProperties-4WPyy_6j.js"),__vite__mapDeps([26,1,2,3,6,14,4,8]))),Ci=l.lazy(()=>T(()=>import("./Profile-BaWj4aDP.js"),__vite__mapDeps([27,1,2,4,6]))),Pi=l.lazy(()=>T(()=>import("./Notifications-D8_S3e7u.js"),__vite__mapDeps([28,1,2,6,4]))),Ii=l.lazy(()=>T(()=>import("./Projects-7wCdlOZ-.js"),__vite__mapDeps([29,1,2,22,6,4]))),_i=l.lazy(()=>T(()=>import("./Blog-CDncd9Vj.js"),__vite__mapDeps([30,1,2,6,4]))),Ni=l.lazy(()=>T(()=>import("./Resources-CU13V52k.js"),__vite__mapDeps([31,1,2,6,4]))),Mi=l.lazy(()=>T(()=>import("./About-C8Ides5J.js"),__vite__mapDeps([32,1,2,6,4]))),Li=l.lazy(()=>T(()=>import("./HomeLoan-BN_JsTz4.js"),__vite__mapDeps([33,1,2,4]))),Oi=l.lazy(()=>T(()=>import("./PropertyValuation-Dg8If2ZD.js"),__vite__mapDeps([34,1,2,35,4]))),Di=l.lazy(()=>T(()=>import("./RentalAgreement-CaO2oD98.js"),__vite__mapDeps([36,1,2,35,4])));function Hi(){const{user:e,userProfile:t,loading:a}=we(),n=()=>a?r.jsx(Ye,{}):e?r.jsx(he,{to:"/dashboard",replace:!0}):r.jsx(gi,{}),i=()=>{const s=t==null?void 0:t.role;return e&&s&&s!==N.BUYER?r.jsx(he,{to:ea(s),replace:!0}):r.jsx(pi,{})};return r.jsxs("div",{className:"min-h-screen flex flex-col",children:[r.jsx(si,{}),r.jsx("main",{className:"flex-1 pt-16",children:r.jsx(l.Suspense,{fallback:r.jsx(Ye,{}),children:r.jsxs(fa,{children:[r.jsx(R,{path:"/",element:r.jsx(n,{})}),r.jsx(R,{path:"/home",element:r.jsx(i,{})}),r.jsx(R,{path:"/properties",element:r.jsx(fi,{})}),r.jsx(R,{path:"/property/:id",element:r.jsx(mi,{})}),r.jsx(R,{path:"/projects",element:r.jsx(Ii,{})}),r.jsx(R,{path:"/blog",element:r.jsx(_i,{})}),r.jsx(R,{path:"/about",element:r.jsx(Mi,{})}),r.jsx(R,{path:"/resources",element:r.jsx(Ni,{})}),r.jsx(R,{path:"/home-loan",element:r.jsx(Li,{})}),r.jsx(R,{path:"/property-valuation",element:r.jsx(Oi,{})}),r.jsx(R,{path:"/rental-agreement",element:r.jsx(Di,{})}),r.jsx(R,{path:"/login",element:r.jsx(n,{})}),r.jsx(R,{path:"/register",element:r.jsx(vi,{})}),r.jsx(R,{path:"/verify-email",element:r.jsx(bi,{})}),r.jsx(R,{path:"/chat",element:r.jsx(B,{children:r.jsx(Et,{})})}),r.jsx(R,{path:"/chat/:chatId",element:r.jsx(B,{children:r.jsx(Et,{})})}),r.jsx(R,{path:"/saved-properties",element:r.jsx(B,{children:r.jsx(Ai,{})})}),r.jsx(R,{path:"/profile",element:r.jsx(B,{children:r.jsx(Ci,{})})}),r.jsx(R,{path:"/notifications",element:r.jsx(B,{children:r.jsx(Pi,{})})}),r.jsx(R,{path:"/add-property",element:r.jsx(B,{children:r.jsx(Ti,{})})}),r.jsx(R,{path:"/edit-property/:id",element:r.jsx(B,{children:r.jsx(ji,{})})}),r.jsx(R,{path:"/dashboard",element:r.jsx(B,{children:r.jsx(Ei,{})})}),r.jsx(R,{path:"/dashboard/buyer",element:r.jsx(B,{allowedRoles:["buyer"],children:r.jsx(yi,{})})}),r.jsx(R,{path:"/dashboard/seller",element:r.jsx(B,{allowedRoles:["seller","broker","builder","super_admin"],children:r.jsx(wi,{})})}),r.jsx(R,{path:"/dashboard/broker",element:r.jsx(B,{allowedRoles:["broker","super_admin"],children:r.jsx(xi,{})})}),r.jsx(R,{path:"/dashboard/broker/clients",element:r.jsx(B,{allowedRoles:["broker","super_admin"],children:r.jsx(ki,{})})}),r.jsx(R,{path:"/dashboard/builder",element:r.jsx(B,{allowedRoles:["builder","super_admin"],children:r.jsx(Ri,{})})}),r.jsx(R,{path:"/dashboard/admin",element:r.jsx(B,{allowedRoles:["super_admin"],children:r.jsx(Si,{})})}),r.jsx(R,{path:"*",element:r.jsx(he,{to:"/",replace:!0})})]})})}),r.jsx(hi,{})]})}class Ue extends l.Component{constructor(t){super(t),this.state={hasError:!1,error:null}}static getDerivedStateFromError(t){return{hasError:!0,error:t}}componentDidCatch(t,a){console.error("ErrorBoundary caught:",t,a)}render(){var t;return this.state.hasError?this.props.fallback||r.jsx("div",{className:"min-h-screen flex items-center justify-center bg-dark-50 dark:bg-dark-950 px-4",children:r.jsxs("div",{className:"max-w-md w-full text-center",children:[r.jsx("div",{className:"text-6xl mb-4",children:"⚠️"}),r.jsx("h1",{className:"text-2xl font-bold font-heading mb-2",children:"Something went wrong"}),r.jsx("p",{className:"text-dark-500 mb-6",children:((t=this.state.error)==null?void 0:t.message)||"An unexpected error occurred"}),r.jsx("button",{onClick:()=>{this.setState({hasError:!1,error:null}),window.location.reload()},className:"btn-primary",children:"Reload Page"})]})}):this.props.children}}const oa=l.createContext();function zi({children:e}){const[t,a]=l.useState([]),[n,i]=l.useState([]),[s,o]=l.useState(!1),[c,y]=l.useState(0),[f,u]=l.useState(null),[m,k]=l.useState({type:"",category:"",minPrice:"",maxPrice:"",bedrooms:"",furnishing:"",city:"",locality:"",listingType:"",status:"",sortBy:"newest",search:""}),E=12,j=l.useCallback(async(h=!0)=>{o(!0);try{let d=[ut("createdAt","desc")];if(m.type&&d.push(G("propertyType","==",m.type)),m.city&&d.push(G("city","==",m.city)),m.furnishing&&d.push(G("furnishing","==",m.furnishing)),m.listingType&&d.push(G("listingType","==",m.listingType)),m.status&&d.push(G("status","==",m.status)),m.bedrooms){const g=parseInt(m.bedrooms);d.push(G("bedrooms","==",g))}m.category&&d.push(G("category","==",m.category)),d.push(Ne(E)),!h&&f&&d.push(Da(f));const b=pe(ce(P,I.PROPERTIES),...d),w=await fe(b),A=w.docs.map(g=>{var $;return{id:g.id,...g.data(),createdAt:(($=g.data().createdAt)==null?void 0:$.toDate())||new Date}});a(h?A:g=>[...g,...A]),u(w.docs[w.docs.length-1]||null),y(w.size)}catch(d){console.error("Error fetching properties:",d),ee.error("Failed to load properties")}finally{o(!1)}},[m,f]),L=l.useCallback(async()=>{try{const h=pe(ce(P,I.PROPERTIES),G("isFeatured","==",!0),Ne(6)),b=(await fe(h)).docs.map(w=>({id:w.id,...w.data()}));b.length>0&&i(b)}catch{}},[]),v={properties:t,featuredProperties:n,loading:s,totalCount:c,filters:m,fetchProperties:j,fetchFeaturedProperties:L,fetchPropertyById:async h=>{try{const d=q(P,I.PROPERTIES,h),b=await $e(d);return b.exists()?(await ae(d,{views:Me(1)}),{id:b.id,...b.data()}):null}catch(d){return console.error("Error fetching property:",d),null}},addProperty:async(h,d=[])=>{o(!0);try{const b=await Va(ce(P,I.PROPERTIES),{...h,images:[],videos:[],brochures:[],views:0,leads:0,saves:0,isFeatured:!1,isVerified:!1,isActive:!0,createdAt:V(),updatedAt:V()});if(d.length>0)try{const w=[];for(const A of d){const g=Ua(Yn,`properties/${b.id}_${Date.now()}_${A.name}`);await $a(g,A),w.push(await Fa(g))}await ae(b,{images:w})}catch(w){console.error("Image upload failed:",w),ee("Listing saved, but photo upload failed",{icon:"⚠️"})}return ee.success("Property listed successfully!"),{id:b.id,...h}}catch(b){throw console.error("Error adding property:",b),ee.error((b==null?void 0:b.code)==="permission-denied"?"Permission denied — make sure you are logged in and Firestore rules are deployed":"Failed to list property"),b}finally{o(!1)}},updateProperty:async(h,d)=>{try{await ae(q(P,I.PROPERTIES,h),{...d,updatedAt:V()}),ee.success("Property updated successfully!")}catch(b){throw ee.error("Failed to update property"),b}},deleteProperty:async h=>{try{await Ba(q(P,I.PROPERTIES,h)),a(d=>d.filter(b=>b.id!==h)),ee.success("Property deleted")}catch{ee.error("Failed to delete property")}},toggleSaveProperty:async(h,d,b)=>{try{const w=q(P,I.USERS,h);if(b){await ae(w,{savedProperties:Ha(d)});try{await ae(q(P,I.PROPERTIES,d),{saves:Me(-1)})}catch{}}else{await ae(w,{savedProperties:za(d)});try{await ae(q(P,I.PROPERTIES,d),{saves:Me(1)})}catch{}}}catch(w){console.error("Error toggling save:",w)}},searchProperties:async h=>{if(!h.trim()){j(!0);return}o(!0);try{const d=h.toLowerCase(),b=pe(ce(P,I.PROPERTIES),ut("createdAt","desc"),Ne(20)),A=(await fe(b)).docs.map(g=>({id:g.id,...g.data()})).filter(g=>{var $,H,z,Z,W;return(($=g.title)==null?void 0:$.toLowerCase().includes(d))||((H=g.city)==null?void 0:H.toLowerCase().includes(d))||((z=g.locality)==null?void 0:z.toLowerCase().includes(d))||((Z=g.description)==null?void 0:Z.toLowerCase().includes(d))||((W=g.propertyType)==null?void 0:W.toLowerCase().includes(d))});a(A)}catch(d){console.error("Search error:",d)}finally{o(!1)}},updateFilters:h=>{k(d=>({...d,...h}))},resetFilters:()=>{k({type:"",category:"",minPrice:"",maxPrice:"",bedrooms:"",furnishing:"",city:"",locality:"",listingType:"",status:"",sortBy:"newest",search:""})},setLoading:o};return r.jsx(oa.Provider,{value:v,children:e})}const Fs=()=>{const e=l.useContext(oa);if(!e)throw new Error("useProperties must be used within PropertyProvider");return e},ca=l.createContext();function Bi({children:e}){const{user:t,userProfile:a}=we(),[n,i]=l.useState([]),[s,o]=l.useState(null),[c,y]=l.useState([]),[f,u]=l.useState(0),[m,k]=l.useState(!1);l.useEffect(()=>{if(!t||!F){i([]),y([]);return}try{const x=Y(F,`userChats/${t.uid}`),O=Fe(x,_=>{const D=_.val();D&&i(U=>{const J=U.findIndex(X=>X.id===_.key);if(J>=0){const X=[...U];return X[J]={id:_.key,...D},X}return[{id:_.key,...D},...U]})});return()=>O()}catch(x){console.warn("Chat listener failed:",x.message)}},[t]);const E=async(x,O)=>{if(!t)return null;try{const _=[t.uid,x].sort().join("_"),D=Y(F,`chats/${_}`);await xe(D,{participants:[t.uid,x],propertyId:O||"",createdAt:Date.now(),lastMessage:"",lastMessageTime:Date.now(),lastSender:t.uid});const U=Y(F,`userChats/${t.uid}/${_}`);await xe(U,{participantId:x,propertyId:O||"",lastMessage:"",lastMessageTime:Date.now()});const J=Y(F,`userChats/${x}/${_}`);return await xe(J,{participantId:t.uid,propertyId:O||"",lastMessage:"",lastMessageTime:Date.now()}),_}catch(_){return console.error("Error creating chat:",_),null}},j=async(x,O,_="text")=>{if(!(!t||!x||!O.trim()))try{const D=Y(F,`messages/${x}`),U={senderId:t.uid,senderName:(a==null?void 0:a.displayName)||"User",text:O.trim(),type:_,timestamp:Date.now(),read:!1};await Ga(D,U);const J=Y(F,`chats/${x}`);await xe(J,{lastMessage:O.trim(),lastMessageTime:Date.now(),lastSender:t.uid})}catch(D){console.error("Error sending message:",D)}},L=l.useCallback(x=>{if(!x)return;k(!0);const O=Ka(Y(F,`messages/${x}`),Wa("timestamp"),qa(50));return Fe(O,D=>{y(U=>U.findIndex(X=>X.id===D.key)>=0?U:[...U,{id:D.key,...D.val()}]),k(!1)})},[]),de={chats:n,activeChat:s,messages:c,unreadCount:f,loading:m,setActiveChat:o,createChat:E,sendMessage:j,loadMessages:L};return r.jsx(ca.Provider,{value:de,children:e})}const Ks=()=>{const e=l.useContext(ca);if(!e)throw new Error("useChat must be used within ChatProvider");return e};Ke.createRoot(document.getElementById("root")).render(r.jsx(be.StrictMode,{children:r.jsx(Ue,{children:r.jsx(ma,{future:{v7_relativeSplatPath:!0},children:r.jsx(or,{children:r.jsx(Qn,{children:r.jsx(Ue,{children:r.jsx(Xn,{children:r.jsx(zi,{children:r.jsx(Ue,{children:r.jsx(Bi,{children:r.jsxs(ei,{children:[r.jsx(Hi,{}),r.jsx(ua,{position:"top-right",toastOptions:{duration:3e3,style:{background:"#1e293b",color:"#f8fafc",borderRadius:"12px"}}})]})})})})})})})})})})}));export{ds as $,Os as A,Ds as B,Jn as C,gr as D,ss as E,Is as F,ea as G,as as H,Ls as I,Gi as J,us as K,Ye as L,ks as M,cs as N,Zi as O,Ps as P,hr as Q,N as R,rs as S,Qi as T,Ks as U,_s as V,Yi as W,ri as X,Bs as Y,bs as Z,ms as _,es as a,Xi as a0,vs as a1,xs as a2,js as a3,ns as a4,ci as a5,li as a6,oi as a7,di as a8,ia as a9,ye as aa,$s as ab,Ms as ac,Ji as ad,Wi as ae,is as af,Es as ag,Yn as ah,ti as ai,yr as aj,Ts as ak,ps as al,fs as am,hs as an,T as ao,os as b,Rs as c,gs as d,ys as e,Cs as f,qi as g,Ki as h,Ns as i,dr as j,P as k,I as l,we as m,Us as n,As as o,Vs as p,ts as q,ls as r,br as s,Hs as t,Fs as u,zs as v,ai as w,ws as x,pr as y,Ss as z};
