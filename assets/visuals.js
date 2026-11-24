(()=>{
const $=(q,r=document)=>r.querySelector(q),$$=(q,r=document)=>[...r.querySelectorAll(q)];
const P=document.body.dataset.day||'';
const E=h=>{const t=document.createElement('template');t.innerHTML=h.trim();return t.content.firstChild};
const st=document.createElement('style');
st.textContent='.vz{margin:1.1em 0}.vz figcaption{font-weight:700;font-size:.9rem;color:var(--mut);text-align:center;margin-bottom:.4em}.vz .ft{text-align:center;color:var(--mut);font-size:.85rem;margin-top:.3em}.vz svg{display:block;margin:0 auto;height:auto}.vz .m{fill:var(--mut)}svg[data-steps]{max-width:min(100%,483px)!important}';
document.head.append(st);
const W=420;
const wrap=(t,n)=>{const w=String(t).split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>n&&c){L.push(c);c=x}else c=(c+' '+x).trim()});if(c)L.push(c);return L.length?L:['']};
const T=(x,y,t,o={})=>`<text x="${x}" y="${y}" font-size="${o.s||12}" text-anchor="${o.a||'start'}"${o.b?' font-weight="700"':''}${o.m?' class="m"':''}${o.f?` style="fill:${o.f}"`:''}>${t}</text>`;
const R=(x,y,w,h,c,r=8)=>`<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>`;
const fig=(cap,w,h,inner,ft,steps)=>`<figure class="vz"><figcaption>${cap}</figcaption><svg ${steps?'data-steps ':''}viewBox="0 0 ${w} ${h}" style="width:100%;max-width:${Math.round(w*1.15)}px" role="img" aria-label="${cap}">${inner}</svg>${ft?`<div class="ft">${ft}</div>`:''}</figure>`;
const dn=(x,y)=>`M${x} ${y}V${y+14}M${x-5} ${y+8}L${x} ${y+14}L${x+5} ${y+8}`;

const flow=o=>{const bw=340,x0=(W-bw)/2,n=o.s.length;let y=8,body='',ar='';
 o.s.forEach((s,i)=>{const sub=wrap(s[1]||'',46),h=Math.max(46,30+sub.length*15);
  body+=R(x0,y,bw,h,'s'+(i%5+1),10)+`<circle cx="${x0+18}" cy="${y+h/2}" r="10" style="fill:var(--fg);stroke:none"/>`+T(x0+18,y+h/2+4,i+1,{s:11,a:'middle',f:'var(--bg)'})+T(x0+40,y+19,s[0],{s:14,b:1})+sub.map((l,k)=>T(x0+40,y+36+k*15,l,{s:12,m:1})).join('');
  if(i<n-1)ar+=`<path d="${dn(W/2,y+h)}"/>`;
  y+=h+(i<n-1?18:0)});
 if(o.loop){y+=24;body+=T(W/2,y,'↻ '+o.loop,{s:12,a:'middle',m:1})}
 return fig(o.cap,W,y+10,`<g stroke="currentColor" stroke-width="2" fill="none">${ar}</g>`+body,'',1)};

const cw8=s=>[...s].reduce((a,ch)=>a+(ch.charCodeAt(0)>127?12:8),0);
const chips=o=>{let y=6,b='';
 o.rows.forEach(r=>{b+=T(8,y+10,r.l,{s:12,m:1});y+=18;let x=8;const id=r.i.some(c=>c[1]),h=id?40:26;
  r.i.forEach((c,k)=>{const w=Math.max(30,cw8(c[0])+16);if(x+w>W-8){x=8;y+=h+6}
   b+=R(x,y,w,h,'s'+(k%5+1),7)+T(x+w/2,y+17,c[0].replace(/^ /,'·'),{s:13,a:'middle'})+(c[1]?T(x+w/2,y+33,c[1],{s:10,a:'middle',m:1}):'');x+=w+6});
  y+=h+14});
 return fig(o.cap,W,y,b,o.foot)};

const cmp=o=>{const n=o.cols.length,gap=10,cw=(W-16-(n-1)*gap)/n,ch=Math.floor(cw/6.4);let b='',H=0;
 o.cols.forEach((c,k)=>{const x=8+k*(cw+gap);let y=6;b+=T(x+cw/2,y+12,c.h,{s:13,a:'middle',b:1});y+=22;
  c.s.forEach((s,i)=>{const tl=wrap(s[0],ch-3),sub=wrap(s[1]||'',ch),has=!!s[1],h=12+tl.length*14+(has?sub.length*13:0)+6;
   b+=R(x,y,cw,h,'s'+((k+i)%5+1),8)+tl.map((l,j)=>T(x+cw/2,y+16+j*14,l,{s:11.5,a:'middle',b:1})).join('')+(has?sub.map((l,j)=>T(x+cw/2,y+16+tl.length*14+j*13-1,l,{s:10.5,a:'middle',m:1})).join(''):'');y+=h;
   if(i<c.s.length-1){b+=T(x+cw/2,y+12,'↓',{s:13,a:'middle',m:1});y+=16}});H=Math.max(H,y)});
 return fig(o.cap,W,H+8,b)};

const seg=o=>{const tot=o.s.reduce((a,x)=>a+x[2],0),bw=W-20;let x=10,b='';
 o.s.forEach(s=>{const w=Math.max(6,s[2]/tot*bw);b+=R(x,8,w,28,s[3].replace('c','s'),4);x+=w});
 o.s.forEach((s,i)=>{const y=62+i*22;b+=R(10,y-12,14,14,s[3].replace('c','s'),3)+T(32,y,'<tspan font-weight="700">'+s[1]+'</tspan>  '+s[0],{s:12.5})});
 return fig(o.cap,W,62+o.s.length*22,b)};

const bars=o=>{const cols=o.cols||[{rows:o.rows}],n=cols.length,gap=14,cw=(W-16-(n-1)*gap)/n;let H=0,b='';
 cols.forEach((c,k)=>{const x=8+k*(cw+gap);let y=8;if(c.h){b+=T(x,y+10,c.h,{s:12,b:1});y+=22}
  c.rows.forEach(r=>{const lw=n>1?50:62,vw=n>1?30:48,bwid=cw-lw-vw,fc=r[2]==='k'?'var(--anab)':r[2]==='d'?'var(--mut)':'var(--defb)',op=r[2]==='d'?.35:1;
   b+=T(x,y+11,r[0],{s:n>1?11:12,m:1})+`<rect x="${x+lw}" y="${y+2}" width="${bwid}" height="11" rx="5" style="fill:var(--bd);stroke:none"/><rect x="${x+lw}" y="${y+2}" width="${Math.max(2,bwid*Math.min(1,r[1]/(o.max||100)))}" height="11" rx="5" style="fill:${fc};opacity:${op};stroke:none"/>`+T(x+cw,y+11,r[1]+(o.unit||'%'),{s:11,a:'end',m:1});y+=20});H=Math.max(H,y)});
 return fig(o.cap,W,H+4,b,o.foot)};
const tbars=o=>bars({cap:o.cap,foot:o.foot,cols:o.T.map(Tm=>{const s=o.logits.map(x=>x/Tm),m=Math.max(...s),e=s.map(x=>Math.exp(x-m)),z=e.reduce((a,b)=>a+b);return{h:'T = '+Tm+(Tm<1?' (sharper)':Tm>1?' (flatter)':' (as trained)'),rows:e.map((x,i)=>[o.labels[i],Math.round(x/z*100)])}})});

const lanes=o=>{let y=8,b='';
 o.rows.forEach((r,i)=>{const n=r.length,gap=10,bw=Math.min(n===1?340:n===2?200:130,(W-16-(n-1)*gap)/n),x0=(W-(n*bw+(n-1)*gap))/2,ch=Math.floor(bw/6.2);
  const hs=r.map(x=>12+wrap(x[0],ch-3).length*15+(x[1]?wrap(x[1],ch).length*13:0)+6),h=Math.max(...hs,34);
  r.forEach((x,j)=>{const xx=x0+j*(bw+gap),tl=wrap(x[0],ch-3);b+=R(xx,y,bw,h,'s'+((i+j)%5+1),9)+tl.map((l,k)=>T(xx+bw/2,(x[1]?y+17:y+h/2+4-(tl.length-1)*7.5)+k*15,l,{s:12.5,a:'middle',b:1})).join('')+(x[1]?wrap(x[1],ch).map((l,k)=>T(xx+bw/2,y+17+tl.length*15+k*13-2,l,{s:10.5,a:'middle',m:1})).join(''):'')});
  y+=h;if(i<o.rows.length-1){b+=`<path d="${dn(W/2,y+2)}" stroke="currentColor" stroke-width="2" fill="none"/>`;y+=20}});
 return fig(o.cap,W,y+8,b)};

const patches=o=>{const s=Math.min(44,Math.floor((W-40)/o.c)),x0=(W-o.c*s)/2,n=o.r*o.c;let b='';
 for(let i=0;i<n;i++){const r=Math.floor(i/o.c),c=i%o.c;b+=`<rect x="${x0+c*s}" y="${8+r*s}" width="${s-3}" height="${s-3}" rx="4" style="fill:hsl(${i*37%360} 55% 42%);stroke:none"/>`+T(x0+c*s+(s-3)/2,8+r*s+(s-3)/2+4,i+1,{s:10,a:'middle',f:'#fff'})}
 let y=8+o.r*s+10;b+=T(W/2,y+8,'↓ each patch becomes one token',{s:12,a:'middle',m:1});y+=20;
 const k=Math.min(n,7),tw=k*42+64;let x=(W-tw)/2;for(let i=0;i<k;i++){b+=R(x,y,38,24,'s'+(i%5+1),6)+T(x+19,y+16,'p'+(i+1),{s:11,a:'middle'});x+=42}b+=R(x,y,62,24,'s1',6)+T(x+31,y+16,'… p'+n,{s:11,a:'middle'});
 return fig(o.cap,W,y+34,b)};
const V={flow,chips,cmp,seg,bars,tbars,lanes,patches};

const SP={
d1:[
 {at:'4 ·',t:'chips',cap:'What tokens look like (illustrative split and ids)',rows:[{l:'Text: “The famous Hyderabadi biryani”',i:[['The','464'],[' famous','3814'],[' Hyder','21017'],['abadi','5342'],[' biryani','60113']]}],foot:'Each chunk gets an id, then a list of numbers (its embedding).'},
 {at:'5 ·',t:'cmp',cap:'Three things that look alike but work differently',cols:[{h:'Database',s:[['Query','SELECT … WHERE'],['Finds a stored row','exact match'],['Returns that row','same every time']]},{h:'Search engine',s:[['Query','keywords'],['Looks up an index','pages on the web'],['Returns links','you read them']]},{h:'LLM',s:[['Prompt','your text'],['Predicts tokens','from learned numbers'],['Generates new text','not looked up']]}]},
 {at:'7 ·',t:'flow',cap:'From base model to chat assistant',s:[['Pre-training','predict the next token on huge text'],['Base model','brilliant autocomplete, not helpful'],['SFT','learn from question → answer examples'],['RLHF','humans rank answers, model is nudged'],['Chat assistant','follows instructions, hedges, refuses']]}
],
d2:[
 {at:'4 ·',t:'chips',cap:'Same meaning, different token counts (illustrative)',rows:[{l:'English: 5 tokens',i:[['The'],[' famous'],[' Hyder'],['abadi'],[' biryani']]},{l:'Hindi or Telugu: more, smaller pieces',i:[['प्र'],['सिद्ध'],[' है'],['दरा'],['बादी'],[' बि'],['रया'],['नी']]}],foot:'More tokens means more cost and less room in the window.'},
 {at:'5 ·',t:'seg',cap:'Where the time goes (example: 8.5 s in total)',s:[['wait for first token','0.5 s',0.5,'c5'],['generating 400 tokens at 50 per second','8 s',8,'c1']]},
 {at:'5 ·',t:'seg',cap:'Where the money goes (example: $0.010 per call)',s:[['input: 3,000 tokens','$0.006',6,'c2'],['output: 500 tokens','$0.004',4,'c3']]},
 {at:'7 ·',t:'bars',cap:'Why long chats get pricier: input tokens per turn (illustrative)',rows:[['Turn 1',800],['Turn 2',1100],['Turn 3',1400],['Turn 4',1700],['Turn 5',2000]],max:2000,unit:' tok',foot:'The whole history is resent every turn, so the input keeps growing.'}
],
d3:[
 {at:'3 ·',t:'lanes',cap:'Different inputs, one model',rows:[[['Text'],['Image'],['Audio']],[['Tokens in one shared number space']],[['The same attention layers']],[['Next token out']]]},
 {at:'4 ·',t:'patches',cap:'An image becomes a grid of patch tokens (4 × 6 shown)',r:4,c:6},
 {at:'5 ·',t:'flow',cap:'One attention step for one token',s:[['Query','what this token needs'],['Compare with Keys','dot product ÷ √d'],['softmax','scores → weights that sum to 1'],['Blend Values','weighted sum'],['New vector','the token now carries context']]}
],
d4:[
 {at:'3 ·',t:'tbars',cap:'Temperature reshapes the same scores',logits:[3,1.4,.7,.2],labels:['biryani','haleem','kebab','chai'],T:[0.3,1,2],foot:'Low T: one clear winner. High T: nearly a coin toss.'},
 {at:'5 ·',t:'bars',cap:'Trimming the tail (green = kept, grey = dropped)',cols:[{h:'top-k = 3',rows:[['biryani',55,'k'],['haleem',20,'k'],['kebab',12,'k'],['chai',8,'d'],['dum',5,'d']]},{h:'top-p = 0.9',rows:[['biryani',55,'k'],['haleem',20,'k'],['kebab',12,'k'],['chai',8,'k'],['dum',5,'d']]}],foot:'top-k always keeps 3. top-p keeps tokens until their total reaches 90%, here 4.'},
 {at:'6 ·',t:'cmp',cap:'Where the thinking happens',cols:[{h:'Normal model',s:[['Question',''],['Answer straight away','fast, cheaper']]},{h:'Reasoning model',s:[['Question',''],['Thinking tokens','hidden scratchpad, billed as output'],['Answer','better on multi-step problems']]}]}
],
d5:[
 {at:'Part A',top:1,t:'flow',cap:'Your week 1 in one line',s:[['Day 1','an LLM predicts the next token'],['Day 2','tokens, window, cost, latency'],['Day 3','attention and Q, K, V'],['Day 4','temperature, top-k, top-p'],['Day 5','build: LLM playground']]}
],
d6:[
 {at:'The API in 20 lines',t:'flow',cap:'Life of one request',s:[['Client','POST /estimate {text, model}'],['Pydantic','validates the body'],['Lookup','prices.json[model] (404 if missing)'],['estimate_cost','tokens × price'],['Response','JSON with tokens and costs']]}
]
};

const place=sp=>{
 const node=E(V[sp.t](sp));
 const hs=$$('main h2,main h3'),i=hs.findIndex(h=>h.textContent.trim().startsWith(sp.at));if(i<0)return;
 if(sp.top)hs[i].after(node);else{const nx=hs[i+1];if(nx)nx.before(node);else{const nv=$$('main .nav');const l=nv[nv.length-1];l?l.before(node):$('main').append(node)}}};
(SP[P]||[]).forEach(sp=>{try{place(sp)}catch(e){}});

const steps=svg=>{const Rr=$$('rect',svg),Tt=$$('text',svg),A=$$('g path',svg),N=Rr.length;
 const b=Rr.map(r=>[+r.getAttribute('y'),+r.getAttribute('y')+ +r.getAttribute('height')]);
 const own=Tt.map(t=>b.findIndex(([a,z])=>+t.getAttribute('y')>=a&&+t.getAttribute('y')<z));let n=N,tm;
 const ap=()=>{Rr.forEach((r,i)=>r.style.opacity=i<n?1:.12);Tt.forEach((t,j)=>t.style.opacity=own[j]<0||own[j]<n?1:.08);A.forEach((p,j)=>p.style.opacity=(j<N-1?j<n-1:n===N)?1:.1)};
 const c=E('<div class="ctl"><button data-a="p">▶ Play step by step</button><button data-a="a">Show all</button></div>');svg.after(c);
 c.onclick=e=>{const a=e.target.dataset.a;clearInterval(tm);if(a==='a'){n=N;ap()}if(a==='p'){n=0;ap();tm=setInterval(()=>{n++;ap();if(n>=N){clearInterval(tm);if(window.ML)ML.award('anim-'+P,3,'Diagram watched')}},800)}}};
$$('svg[data-steps]').forEach(steps);
})();
