var x=Object.defineProperty;var g=(n,e,t)=>e in n?x(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var s=(n,e,t)=>g(n,typeof e!="symbol"?e+"":e,t);import"./modulepreload-polyfill-B5Qt9EMX.js";function u(n){return n instanceof HTMLElement}function C(n){return n instanceof HTMLButtonElement}function I(n){const{crypto:e}=window,t=new Uint32Array(1);return e.getRandomValues(t),1+Math.floor(t[0]%n)}class h{constructor(){s(this,"subscribers",[])}subscribe(e){this.subscribers.push(e)}get subscriberArr(){return this.subscribers}unsubscribe(e){this.subscribers=this.subscribers.filter(t=>t!==e)}notify(e){this.subscribers.forEach(t=>t.update(e))}}class P extends h{constructor(e){super(),this.sidesCount=e}notify(e){const t=this.subscriberArr.find(r=>r.index===e.playerIndex);t!==void 0&&t.update(e)}roll(e){const t=I(this.sidesCount);return{playerIndex:e,diceResult:t}}update(e){const t=this.roll(e);this.notify(t)}}const R=21;class w{constructor(e){s(this,"diceResults",[]);s(this,"winStatus",new h);s(this,"result",new h);s(this,"playerIndex");this.playerIndex=e}get index(){return this.playerIndex}get getTotalScore(){return this.diceResults.reduce((e,t)=>e+t,0)}update(e){this.diceResults.push(e.diceResult),this.result.notify(this.diceResults),this.getTotalScore>=R&&this.winStatus.notify(!0)}}class A extends h{constructor(t){super();s(this,"currentPlayerIndex");this.playersCount=t,this.currentPlayerIndex=0}getCurrentPlayerIndex(){return this.currentPlayerIndex}notify(t){this.subscriberArr.forEach(r=>{r.update(t)}),this.next()}next(){this.currentPlayerIndex=(this.currentPlayerIndex+1)%this.playersCount}}class S{constructor(e,t){this.elementContainer=e,this.playerIndex=t}}class L extends S{update(e){if(!e)return;const t=this.elementContainer.querySelector("ul"),r=document.getElementById("roll-dice");u(t)&&C(r)&&(t.classList.add("pink"),r.disabled=!0)}}const o=class o extends S{setupLayout(){const t=document.createElement("h3");t.classList.add("currentIndex"),t.textContent=`Player ${this.playerIndex+1} - `;const r=document.createElement("span");r.textContent="0";const c=document.createElement("ul");c.classList.add("results"),t.appendChild(r),this.elementContainer.appendChild(t),this.elementContainer.appendChild(c)}update(e){var d,l;const t=e.at(-1)??-1;if(t===-1)return;o.totalScoreOfAllPlayer+=t;const r=(d=o.debugElement)==null?void 0:d.querySelector("span");u(r)&&(r.textContent=o.totalScoreOfAllPlayer.toString());const c=this.elementContainer.querySelector("span");u(c)&&(c.textContent=e.reduce((b,p)=>b+p,0).toString());const i=document.createElement("li");i.textContent=t.toString();const y=this.elementContainer.querySelector("ul");u(y)&&y.appendChild(i);const m=document.createElement("li");m.textContent=t.toString();const a=(l=o.debugElement)==null?void 0:l.querySelector("ul");u(a)&&a.appendChild(m)}};s(o,"debugElement",document.getElementById("debug")),s(o,"totalScoreOfAllPlayer",0);let f=o;const D=6,E=6;function B(){const n=new A(E),e=new P(D);n.subscribe(e),c(E).forEach(i=>{e.subscribe(i)});const r=document.getElementById("roll-dice");C(r)&&r.addEventListener("click",()=>{const i=n.getCurrentPlayerIndex();n.notify(i)});function c(i){const y=document.getElementById("player-container");return Array.from({length:i},(m,a)=>{const d=new w(a),l=document.createElement("div");u(l)&&(l.id=`player${a}`,u(y)&&y.appendChild(l));const b=new L(l,a),p=new f(l,a);return p.setupLayout(),d.winStatus.subscribe(b),d.result.subscribe(p),d})}}document.addEventListener("DOMContentLoaded",B);
