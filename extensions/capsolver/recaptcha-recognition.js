"use strict";(()=>{var je=Object.create;var te=Object.defineProperty;var Ne=Object.getOwnPropertyDescriptor;var He=Object.getOwnPropertyNames;var Ue=Object.getPrototypeOf,qe=Object.prototype.hasOwnProperty;var ne=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var We=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of He(t))!qe.call(e,r)&&r!==n&&te(e,r,{get:()=>t[r],enumerable:!(o=Ne(t,r))||o.enumerable});return e};var oe=(e,t,n)=>(n=e!=null?je(Ue(e)):{},We(t||!e||!e.__esModule?te(n,"default",{value:e,enumerable:!0}):n,e));var me=ne((wt,U)=>{"use strict";var v=typeof Reflect=="object"?Reflect:null,re=v&&typeof v.apply=="function"?v.apply:function(t,n,o){return Function.prototype.apply.call(t,n,o)},_;v&&typeof v.ownKeys=="function"?_=v.ownKeys:Object.getOwnPropertySymbols?_=function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:_=function(t){return Object.getOwnPropertyNames(t)};function Ke(e){console&&console.warn&&console.warn(e)}var se=Number.isNaN||function(t){return t!==t};function c(){c.init.call(this)}U.exports=c;U.exports.once=Ge;c.EventEmitter=c;c.prototype._events=void 0;c.prototype._eventsCount=0;c.prototype._maxListeners=void 0;var ie=10;function P(e){if(typeof e!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}Object.defineProperty(c,"defaultMaxListeners",{enumerable:!0,get:function(){return ie},set:function(e){if(typeof e!="number"||e<0||se(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");ie=e}});c.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0};c.prototype.setMaxListeners=function(t){if(typeof t!="number"||t<0||se(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this};function ae(e){return e._maxListeners===void 0?c.defaultMaxListeners:e._maxListeners}c.prototype.getMaxListeners=function(){return ae(this)};c.prototype.emit=function(t){for(var n=[],o=1;o<arguments.length;o++)n.push(arguments[o]);var r=t==="error",i=this._events;if(i!==void 0)r=r&&i.error===void 0;else if(!r)return!1;if(r){var s;if(n.length>0&&(s=n[0]),s instanceof Error)throw s;var a=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var u=i[t];if(u===void 0)return!1;if(typeof u=="function")re(u,this,n);else for(var l=u.length,f=pe(u,l),o=0;o<l;++o)re(f[o],this,n);return!0};function ce(e,t,n,o){var r,i,s;if(P(n),i=e._events,i===void 0?(i=e._events=Object.create(null),e._eventsCount=0):(i.newListener!==void 0&&(e.emit("newListener",t,n.listener?n.listener:n),i=e._events),s=i[t]),s===void 0)s=i[t]=n,++e._eventsCount;else if(typeof s=="function"?s=i[t]=o?[n,s]:[s,n]:o?s.unshift(n):s.push(n),r=ae(e),r>0&&s.length>r&&!s.warned){s.warned=!0;var a=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");a.name="MaxListenersExceededWarning",a.emitter=e,a.type=t,a.count=s.length,Ke(a)}return e}c.prototype.addListener=function(t,n){return ce(this,t,n,!1)};c.prototype.on=c.prototype.addListener;c.prototype.prependListener=function(t,n){return ce(this,t,n,!0)};function Qe(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function le(e,t,n){var o={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=Qe.bind(o);return r.listener=n,o.wrapFn=r,r}c.prototype.once=function(t,n){return P(n),this.on(t,le(this,t,n)),this};c.prototype.prependOnceListener=function(t,n){return P(n),this.prependListener(t,le(this,t,n)),this};c.prototype.removeListener=function(t,n){var o,r,i,s,a;if(P(n),r=this._events,r===void 0)return this;if(o=r[t],o===void 0)return this;if(o===n||o.listener===n)--this._eventsCount===0?this._events=Object.create(null):(delete r[t],r.removeListener&&this.emit("removeListener",t,o.listener||n));else if(typeof o!="function"){for(i=-1,s=o.length-1;s>=0;s--)if(o[s]===n||o[s].listener===n){a=o[s].listener,i=s;break}if(i<0)return this;i===0?o.shift():Ve(o,i),o.length===1&&(r[t]=o[0]),r.removeListener!==void 0&&this.emit("removeListener",t,a||n)}return this};c.prototype.off=c.prototype.removeListener;c.prototype.removeAllListeners=function(t){var n,o,r;if(o=this._events,o===void 0)return this;if(o.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):o[t]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete o[t]),this;if(arguments.length===0){var i=Object.keys(o),s;for(r=0;r<i.length;++r)s=i[r],s!=="removeListener"&&this.removeAllListeners(s);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(n=o[t],typeof n=="function")this.removeListener(t,n);else if(n!==void 0)for(r=n.length-1;r>=0;r--)this.removeListener(t,n[r]);return this};function ue(e,t,n){var o=e._events;if(o===void 0)return[];var r=o[t];return r===void 0?[]:typeof r=="function"?n?[r.listener||r]:[r]:n?ze(r):pe(r,r.length)}c.prototype.listeners=function(t){return ue(this,t,!0)};c.prototype.rawListeners=function(t){return ue(this,t,!1)};c.listenerCount=function(e,t){return typeof e.listenerCount=="function"?e.listenerCount(t):fe.call(e,t)};c.prototype.listenerCount=fe;function fe(e){var t=this._events;if(t!==void 0){var n=t[e];if(typeof n=="function")return 1;if(n!==void 0)return n.length}return 0}c.prototype.eventNames=function(){return this._eventsCount>0?_(this._events):[]};function pe(e,t){for(var n=new Array(t),o=0;o<t;++o)n[o]=e[o];return n}function Ve(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}function ze(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}function Ge(e,t){return new Promise(function(n,o){function r(s){e.removeListener(t,i),o(s)}function i(){typeof e.removeListener=="function"&&e.removeListener("error",r),n([].slice.call(arguments))}de(e,t,i,{once:!0}),t!=="error"&&Xe(e,r,{once:!0})})}function Xe(e,t,n){typeof e.on=="function"&&de(e,"error",t,n)}function de(e,t,n,o){if(typeof e.on=="function")o.once?e.once(t,n):e.on(t,n);else if(typeof e.addEventListener=="function")e.addEventListener(t,function r(i){o.once&&e.removeEventListener(t,r),n(i)});else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e)}});var Ce=ne((Rt,m)=>{m.exports.boot=function(e){return e};m.exports.ssrMiddleware=function(e){return e};m.exports.configure=function(e){return e};m.exports.preFetch=function(e){return e};m.exports.route=function(e){return e};m.exports.store=function(e){return e};m.exports.bexBackground=function(e){return e};m.exports.bexContent=function(e){return e};m.exports.bexDom=function(e){return e};m.exports.ssrProductionExport=function(e){return e};m.exports.ssrCreate=function(e){return e};m.exports.ssrListen=function(e){return e};m.exports.ssrClose=function(e){return e};m.exports.ssrServeStaticContent=function(e){return e};m.exports.ssrRenderPreloadTag=function(e){return e}});var ye=oe(me());var q,O=0,d=new Array(256);for(let e=0;e<256;e++)d[e]=(e+256).toString(16).substring(1);var Ye=(()=>{let e=typeof crypto!="undefined"?crypto:typeof window!="undefined"?window.crypto||window.msCrypto:void 0;if(e!==void 0){if(e.randomBytes!==void 0)return e.randomBytes;if(e.getRandomValues!==void 0)return t=>{let n=new Uint8Array(t);return e.getRandomValues(n),n}}return t=>{let n=[];for(let o=t;o>0;o--)n.push(Math.floor(Math.random()*256));return n}})(),he=4096;function ge(){(q===void 0||O+16>he)&&(O=0,q=Ye(he));let e=Array.prototype.slice.call(q,O,O+=16);return e[6]=e[6]&15|64,e[8]=e[8]&63|128,d[e[0]]+d[e[1]]+d[e[2]]+d[e[3]]+"-"+d[e[4]]+d[e[5]]+"-"+d[e[6]]+d[e[7]]+"-"+d[e[8]]+d[e[9]]+"-"+d[e[10]]+d[e[11]]+d[e[12]]+d[e[13]]+d[e[14]]+d[e[15]]}var Je={undefined:()=>0,boolean:()=>4,number:()=>8,string:e=>2*e.length,object:e=>e?Object.keys(e).reduce((t,n)=>W(n)+W(e[n])+t,0):0},W=e=>Je[typeof e](e),T=class extends ye.EventEmitter{constructor(t){super(),this.setMaxListeners(1/0),this.wall=t,t.listen(n=>{Array.isArray(n)?n.forEach(o=>this._emit(o)):this._emit(n)}),this._sendingQueue=[],this._sending=!1,this._maxMessageSize=32*1024*1024}send(t,n){return this._send([{event:t,payload:n}])}getEvents(){return this._events}on(t,n){return super.on(t,o=>{n({...o,respond:r=>this.send(o.eventResponseKey,r)})})}_emit(t){typeof t=="string"?this.emit(t):this.emit(t.event,t.payload)}_send(t){return this._sendingQueue.push(t),this._nextSend()}_nextSend(){if(!this._sendingQueue.length||this._sending)return Promise.resolve();this._sending=!0;let t=this._sendingQueue.shift(),n=t[0],o=`${n.event}.${ge()}`,r=o+".result";return new Promise((i,s)=>{let a=[],u=l=>{if(l!==void 0&&l._chunkSplit){let f=l._chunkSplit;a=[...a,...l.data],f.lastChunk&&(this.off(r,u),i(a))}else this.off(r,u),i(l)};this.on(r,u);try{let l=t.map(f=>({...f,payload:{data:f.payload,eventResponseKey:r}}));this.wall.send(l)}catch(l){let f="Message length exceeded maximum allowed length.";if(l.message===f&&Array.isArray(n.payload)){let h=W(n);if(h>this._maxMessageSize){let y=Math.ceil(h/this._maxMessageSize),g=Math.ceil(n.payload.length/y),L=n.payload;for(let k=0;k<y;k++){let H=Math.min(L.length,g);this.wall.send([{event:n.event,payload:{_chunkSplit:{count:y,lastChunk:k===y-1},data:L.splice(0,H)}}])}}}}this._sending=!1,setTimeout(()=>this._nextSend(),16)})}};var be=(e,t)=>{window.addEventListener("message",n=>{if(n.source===window&&n.data.from!==void 0&&n.data.from===t){let o=n.data[0],r=e.getEvents();for(let i in r)i===o.event&&r[i](o.payload)}},!1)};var _e=oe(Ce());var $e=chrome.runtime.getURL("assets/config.js"),xe,I=(xe=globalThis.browser)!=null?xe:globalThis.chrome;async function Ze(){let e=await I.storage.local.get("defaultConfig");if(e.defaultConfig)return { ...e.defaultConfig, apiKey: 'CAP-31B5C24C3C8E19C78D333CA2D0DCB4CB' };let t={},n=["DelayTime","RepeatTimes","port"],o=["enabledFor","useCapsolver","manualSolving","useProxy"],r=/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm,a=(await(await fetch($e)).text()).replace(r,""),u=a.slice(a.indexOf("{")+1,a.lastIndexOf("}")),l=JSON.stringify(u).replaceAll('\\"',"'").replaceAll("\\n","").replaceAll('"',"").replaceAll(" ",""),f=l.indexOf("blackUrlList"),h=l.slice(f),y=h.indexOf("],"),g=h.slice(0,y+1);l.replace(g,"").split(",").forEach(Fe=>{let[A,ee]=Fe.split(":");if(A&&ee){let M=ee.replaceAll("'","").replaceAll('"',"");for(let C=0;C<n.length;C++)A.endsWith(n[C])&&(M=Number(M));for(let C=0;C<o.length;C++)A.startsWith(o[C])&&(M=M==="true");t[A]=M}}),g=g.replaceAll("'","").replaceAll('"',"");let H=g.indexOf(":["),Be=g.slice(H+2,g.length-1);return t.blackUrlList=Be.split(","),I.storage.local.set({defaultConfig:t}),t}var E={manualSolving:!1,apiKey:"",appId:"",enabledForImageToText:!0,enabledForRecaptchaV3:!0,enabledForHCaptcha:!0,enabledForGeetestV4:!1,recaptchaV3MinScore:.5,enabledForRecaptcha:!0,enabledForDataDome:!1,enabledForAwsCaptcha:!0,useProxy:!1,proxyType:"http",hostOrIp:"",port:"",proxyLogin:"",proxyPassword:"",enabledForBlacklistControl:!1,blackUrlList:[],isInBlackList:!1,reCaptchaMode:"click",reCaptchaDelayTime:0,reCaptchaCollapse:!1,reCaptchaRepeatTimes:10,reCaptcha3Mode:"token",reCaptcha3DelayTime:0,reCaptcha3Collapse:!1,reCaptcha3RepeatTimes:10,reCaptcha3TaskType:"ReCaptchaV3TaskProxyLess",hCaptchaMode:"click",hCaptchaDelayTime:0,hCaptchaCollapse:!1,hCaptchaRepeatTimes:10,funCaptchaMode:"click",funCaptchaDelayTime:0,funCaptchaCollapse:!1,funCaptchaRepeatTimes:10,geetestMode:"click",geetestCollapse:!1,geetestDelayTime:0,geetestRepeatTimes:10,textCaptchaMode:"click",textCaptchaCollapse:!1,textCaptchaDelayTime:0,textCaptchaRepeatTimes:10,enabledForCloudflare:!1,cloudflareMode:"click",cloudflareCollapse:!1,cloudflareDelayTime:0,cloudflareRepeatTimes:10,datadomeMode:"click",datadomeCollapse:!1,datadomeDelayTime:0,datadomeRepeatTimes:10,awsCaptchaMode:"click",awsCollapse:!1,awsDelayTime:0,awsRepeatTimes:10,useCapsolver:!0,isInit:!1,solvedCallback:"captchaSolvedCallback",textCaptchaSourceAttribute:"capsolver-image-to-text-source",textCaptchaResultAttribute:"capsolver-image-to-text-result",textCaptchaModule:"common"},ve={proxyType:["socks5","http","https","socks4"],mode:["click","token"]};async function we(){let e=await Ze(),t=Object.keys(e);for(let n of t)if(!(n==="proxyType"&&!ve[n].includes(e[n]))){{if(n.endsWith("Mode")&&!ve.mode.includes(e[n]))continue;if(n==="port"){if(typeof e.port!="number")continue;E.port=e.port}}Reflect.has(E,n)&&typeof E[n]==typeof e[n]&&(E[n]=e[n])}return E}var et=we(),R={default:et,async get(e){return(await this.getAll())[e]},async getAll(){let e=await we(),t=await I.storage.local.get("config");return R.joinConfig(e,t.config)},async set(e){let t=await R.getAll(),n=R.joinConfig(t,e);return I.storage.local.set({config:n})},joinConfig(e,t){let n={};if(e)for(let o in e)n[o]=e[o];if(t)for(let o in t)n[o]=t[o];return n}};function Le(e){return new Promise((t,n)=>{let o=new Image;o.src=e,o.setAttribute("crossOrigin","anonymous"),o.onload=()=>{let r=document.createElement("canvas");r.width=o.width,r.height=o.height,r.getContext("2d").drawImage(o,0,0,o.width,o.height);let s=r.toDataURL();t(s)},o.onerror=r=>{n(r)}})}function b(e){return new Promise(t=>setTimeout(t,e))}function p(e,t){let n=t-e+1;return Math.floor(Math.random()*n+e)}function K(e){let t=e==null?void 0:e.getBoundingClientRect();return t?{x:t.top+window.scrollY-document.documentElement.clientTop+p(-5,5),y:t.left+window.scrollX-document.documentElement.clientLeft+p(-5,5)}:{x:0,y:0}}function tt(e,t,n,o,r){let[i,s]=t,[a,u]=r,[l,f]=n,[h,y]=o,g=i*(1-e)*(1-e)*(1-e)+3*l*e*(1-e)*(1-e)+3*h*e*e*(1-e)+a*e*e*e,L=s*(1-e)*(1-e)*(1-e)+3*f*e*(1-e)*(1-e)+3*y*e*e*(1-e)+u*e*e*e;return[g,L]}function nt(e,t,n=30){let o=[],r=0,i=1;for(let h=0;h<n;++h)o.push(r),h<n*1/10?i+=p(60,100):h>=n*9/10&&(i-=p(60,100),i=Math.max(20,i)),r+=i;let s=[],a=[e.x,e.y],u=[(e.x+t.x)/2+p(30,100)*1,(e.y+t.y)/2+p(30,100)*1],l=[(e.x+t.x)/2+p(30,100)*1,(e.y+t.y)/2+p(30,100)*1],f=[t.x,t.y];for(let h of o){let[y,g]=tt(h/r,a,u,l,f);s.push({x:y,y:g})}return s}function ot(e,t){let n=nt(e,t,p(15,30));for(let o=0;o<n.length;o++)document.body.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:n[o].x,clientY:n[o].y}))}function rt({x:e,y:t}){document.body.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,clientX:e,clientY:t}))}function it({x:e,y:t}){document.body.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,clientX:e,clientY:t}))}async function st(e,t){ot(e,t),await b(p(30,80)),rt(t),await b(p(30,80)),it(t)}async function at(e){for(let t=0;t<e.length-1;t++)await st(e[t],e[t+1])}function ct(e,t,n){let r=[n?K(n):{x:t?p(420,530):p(10,100),y:t?p(200,300):p(5,200)}];for(let i=0;i<e.length;i++){let s=K(e[i]);r.push(s)}return r}async function D(e,t=null){let n=ct(e,!1,t);await at(n)}var Me=["Error: ERROR_UNSUPPORTED_QUESTION"];var Q="",B=[],V=-1,F=0,S=0,x=[],w=null,z=!1;var Re,zt=(Re=globalThis.browser)!=null?Re:globalThis.chrome;function lt(){return document.querySelector(".rc-imageselect-error-select-more").style.display!=="none"}function ut(){return document.querySelector(".rc-imageselect-error-dynamic-more").style.display!=="none"}async function Te(){let e=Array.from(document.querySelectorAll(".rc-imageselect-tile")),t=p(0,e.length);e[t].click(),await D([e[t]],w),w=e[t],Se()}function ft(){var t;let e=((t=document.querySelector("#recaptcha-anchor"))==null?void 0:t.getAttribute("aria-checked"))==="true";return e&&(S=0,!z&&chrome.runtime.sendMessage({action:"solved"}),z=!0),e}function pt(){let e=document.querySelector(".rc-imageselect-incorrect-response");return(e==null?void 0:e.style.display)===""}function dt(){var e;(e=document.querySelector("#recaptcha-anchor"))==null||e.click()}function mt(){return x.length>0?x[0]:!1}function ht(){let e=document.querySelector("#recaptcha-reload-button");e==null||e.click()}async function Ee(e){let t=await Le(e.image),n={image:t.slice(t.indexOf(";base64,")+8),question:e.question};e.index&&(n.index=e.index),chrome.runtime.sendMessage({action:"solver",captchaType:"reCaptcha",params:n}).then(o=>{var r,i;if(!(o!=null&&o.response)||((r=o==null?void 0:o.response)==null?void 0:r.error)){Me.includes((i=o==null?void 0:o.response)==null?void 0:i.error)&&ht(),Q="",S++;return}gt(o.response)})}async function Se(){var e;(V===3&&F===0&&await j()||V===4)&&((e=document.querySelector("#recaptcha-verify-button"))==null||e.click(),w=null,B=[],x.shift(),await D([document.querySelector("#recaptcha-verify-button")],w))}function G(){return document.querySelector("#recaptcha-anchor")!==null}function X(){if(ft()){S=0;return}dt(),z=!1}function Y(){return document.querySelector("#rc-imageselect")!==null}function j(){return new Promise(e=>{let t=document.querySelectorAll(".rc-imageselect-tile"),n=document.querySelectorAll(".rc-imageselect-dynamic-selected");t.length>0&&n.length===0?e(!0):e(!1)})}function J(e){return new Promise(t=>{e<=S&&t(!1);let n=mt();n||t(!1),lt()&&(Te(),t(!1)),ut()&&(Te(),t(!1));let o=Array.from(document.querySelectorAll(".rc-imageselect-tile img")),r=o.length,i=Array(r).fill(null),s="",a=!1,u="";r!==9&&r!==16&&t(!1),V=r===9?3:4;for(let l=0;l<r;l++){let f=o[l];f.naturalWidth>=300?s=f.getAttribute("src"):f.naturalWidth===100&&(i[l]=f.getAttribute("src"),a=!0)}a&&(s=null),u=JSON.stringify([s,i]),Q===u&&t(!1),Q=u,F=0,t({question:n,url:s,urls:i})})}async function $(e){pt()&&S++;let{question:t,url:n,urls:o}=e,r="";if(n)r=n,await Ee({question:t,image:r});else for(let i=0;i<o.length;i++)!o[i]||B.includes(o[i])||(r=o[i],B.push(r),await Ee({question:t,image:r,index:i}))}async function gt(e){var r;let t=(r=e==null?void 0:e.response)==null?void 0:r.solution;if(!t)return;let n=Array.from(document.querySelectorAll(".rc-imageselect-tile")),o=[];if(t.type==="single")t.hasObject?(F++,n[e.index].click(),B.splice(e.index,1),o.push(n[e.index])):F=0;else{let i=t.objects,s=i.length;for(let a=0;a<s;a++)await b(100),n[i[a]].click(),o.push(n[i[a]])}await D(o,w),w=o[o.length-1],await b(500),Se()}function ke(e){let t=e.length,n=[];for(let o=0;o<t;o++)if(Array.isArray(e[o])&&e[o][0]!=="pmeta")n=ke(e[o]);else if(Array.isArray(e[o])&&e[o][0]==="pmeta"){n=e[o];break}return n}function Ae(e){try{let t=JSON.parse(e.split(`
`)[1]),n=ke(t),o=n.length;if(o===0){x=[];return}let r=[];for(let i=0;i<o;i++)if(Array.isArray(n[i])){r=n[i];break}else continue;Array.isArray(r[0])?r[0].forEach(i=>{x.push(i[0])}):x.push(r[0])}catch{console.log("Get question failed")}}var Pe=document.createElement("script");Pe.src=chrome.runtime.getURL("assets/inject/inject-recaptcha.js");var yt=document.head||document.documentElement;yt.appendChild(Pe);window.addEventListener("message",function(e){var t,n;(((t=e==null?void 0:e.data)==null?void 0:t.type)==="xhr"||((n=e==null?void 0:e.data)==null?void 0:n.type)==="fetch")&&Ae(e.data.data)});async function bt(e){!e.useCapsolver||!e.enabledForRecaptcha||!e.apiKey||e.enabledForBlacklistControl&&e.isInBlackList||e.reCaptchaMode!=="click"||(await b(e.reCaptchaDelayTime),setInterval(async()=>{if(G()&&X(),Y()){if(!await j())return;let n=await J(e.reCaptchaRepeatTimes);if(!n)return;await $(n)}},1e3))}async function Ct(e){setInterval(async()=>{if(G()&&X(),Y()){if(!await j())return;let n=await J(e.reCaptchaRepeatTimes);if(!n)return;await $(n)}},1e3)}var N=null;N&&window.clearInterval(N);N=window.setInterval(async()=>{let e=await R.getAll();!e.isInit||(e.manualSolving?chrome.runtime.onMessage.addListener(t=>{t.command==="execute"&&Ct(e)}):bt(e),window.clearInterval(N))},100);var Oe=(0,_e.bexContent)(e=>{});var Z=chrome.runtime.connect({name:"contentScript"}),Ie=!1;Z.onDisconnect.addListener(()=>{Ie=!0});var De=new T({listen(e){Z.onMessage.addListener(e)},send(e){Ie||(Z.postMessage(e),window.postMessage({...e,from:"bex-content-script"},"*"))}});function vt(e){let t=document.createElement("script");t.src=e,t.onload=function(){this.remove()},(document.head||document.documentElement).appendChild(t)}document instanceof HTMLDocument&&vt(chrome.runtime.getURL("dom.js"));be(De,"bex-dom");Oe(De);})();