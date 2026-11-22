(()=>{
const $=(q,r=document)=>r.querySelector(q),$$=(q,r=document)=>[...r.querySelectorAll(q)];
const P=document.body.dataset.day||'';
const E=h=>{const t=document.createElement('template');t.innerHTML=h.trim();return t.content.firstChild};
const st=document.createElement('style');st.textContent=`
.vz{margin:1em 0;padding:.8em .9em;border:1px solid var(--bd);border-radius:12px;background:var(--card)}
.vz figcaption{font-weight:700;font-size:.88rem;margin-bottom:.7em;color:var(--mut)}
.vz .ft{text-align:center;color:var(--mut);font-size:.82rem;margin-top:.5em}
.c1{background:var(--why)}.c2{background:var(--def)}.c3{background:var(--ana)}.c4{background:var(--key)}.c5{background:var(--warn)}
.flow{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:22px}
.fs{position:relative;border:1px solid var(--bd);border-radius:10px;padding:.5em .7em .5em 2.1em;transition:opacity .4s}
.fs .n{position:absolute;left:.55em;top:.6em;width:1.25em;height:1.25em;border-radius:50%;background:var(--fg);color:var(--bg);font-size:.72rem;font-weight:700;display:grid;place-items:center}
.fs b{display:block;font-size:.92rem}.fs small{display:block;color:var(--mut);line-height:1.3;font-size:.8rem}
.fs:not(.last)::after{content:"→";position:absolute;right:-16px;top:50%;transform:translateY(-50%);color:var(--mut);font-size:1.1rem}
.fs.eol:not(.last)::after{content:"↓";right:50%;top:auto;bottom:-19px;transform:translateX(50%)}
.lp{text-align:center;color:var(--mut);font-size:.85rem;margin-top:.6em}
.stk{display:flex;flex-direction:column;height:320px;max-width:440px;margin:0 auto;border:1px solid var(--bd);border-radius:10px;overflow:hidden}
.sg{display:flex;flex-direction:column;justify-content:center;padding:.2em .9em;min-height:34px}
.sg b{font-size:.9rem}.sg small{color:var(--mut);font-size:.78rem}
.segb{display:flex;border-radius:10px;overflow:hidden;border:1px solid var(--bd)}
.segb div{padding:.55em .4em;text-align:center;font-size:.8rem;min-width:84px;box-sizing:border-box}
.segb b{display:block}
.cl{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px}
.cl>div{border:1px solid var(--bd);border-radius:10px;padding:.5em .7em}
.cl h4{margin:.1em 0 .45em;font-size:.9rem}
.cl .st{border:1px solid var(--bd);border-radius:8px;padding:.35em .6em;font-size:.84rem}.cl .st small{display:block;color:var(--mut);font-size:.76rem}
.cl .dn{text-align:center;color:var(--mut);line-height:1.1;margin:2px 0}
.hb{display:grid;grid-template-columns:68px 1fr 40px;gap:6px;align-items:center;font-size:.8rem;margin:3px 0}
.hb div{height:12px;background:var(--bd);border-radius:6px;overflow:hidden}.hb i{display:block;height:100%;background:var(--defb)}
.hb.d i{background:var(--mut);opacity:.35}.hb.k i{background:var(--anab)}.hb em{font-style:normal;color:var(--mut);text-align:right}
.chp{display:inline-flex;flex-direction:column;align-items:center;margin:3px;padding:.2em .55em;border-radius:8px;border:1px solid var(--bd);font:.85rem ui-monospace,Menlo,monospace}
.chp small{font-size:.66rem;color:var(--mut)}
.chr{margin:.4em 0}.chr>b{display:block;font-size:.8rem;color:var(--mut);margin-bottom:2px}
.pg{display:grid;gap:3px;max-width:320px;margin:0 auto}
.pg i{aspect-ratio:1;border-radius:4px;font:.65rem system-ui;display:grid;place-items:center;color:#fff}
.ln{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}
.ln>div{flex:1 1 140px;max-width:260px;border:1px solid var(--bd);border-radius:10px;padding:.45em .7em;text-align:center}
.ln small{display:block;color:var(--mut);font-size:.78rem}
.lnd{text-align:center;color:var(--mut);margin:3px 0;line-height:1}
`;
document.head.append(st);

const flow=o=>`<figure class="vz"><figcaption>${o.cap||''}</figcaption><div class="flow">${o.s.map((x,i)=>`<div class="fs c${i%5+1}"><span class="n">${i+1}</span><b>${x[0]}</b><small>${x[1]||''}</small></div>`).join('')}</div>${o.loop?`<div class="lp">↻ ${o.loop}</div>`:''}<div class="ctl"><button data-p>▶ Play step by step</button><button data-a>Show all</button></div></figure>`;
const stack=o=>`<figure class="vz"><figcaption>${o.cap}</figcaption><div class="stk">${o.s.map((x,i)=>`<div class="sg c${i%5+1}" style="flex:${x[2]}"><b>${x[0]}</b><small>${x[1]||''}</small></div>`).join('')}</div><div class="ft">${o.foot||''}</div></figure>`;
const seg=o=>`<figure class="vz"><figcaption>${o.cap}</figcaption><div class="segb">${o.s.map(x=>`<div class="${x[3]}" style="flex:${x[2]}"><b>${x[1]}</b>${x[0]}</div>`).join('')}</div></figure>`;
const lanes=o=>`<figure class="vz"><figcaption>${o.cap}</figcaption>${o.rows.map((r,i)=>(i?'<div class="lnd">↓</div>':'')+`<div class="ln">${r.map((x,j)=>`<div class="c${(i+j)%5+1}"><b>${x[0]}</b><small>${x[1]||''}</small></div>`).join('')}</div>`).join('')}</figure>`;
const cmp=o=>`<figure class="vz"><figcaption>${o.cap}</figcaption><div class="cl">${o.cols.map((c,k)=>`<div><h4>${c.h}</h4>${c.s.map((x,i)=>(i?'<div class="dn">↓</div>':'')+`<div class="st c${(k+i)%5+1}"><b>${x[0]}</b><small>${x[1]||''}</small></div>`).join('')}</div>`).join('')}</div></figure>`;
const bars=o=>{const col=c=>(c.h?`<h4>${c.h}</h4>`:'')+c.rows.map(r=>`<div class="hb ${r[2]||''}"><span>${r[0]}</span><div><i style="width:${Math.min(100,r[1]/(o.max||100)*100)}%"></i></div><em>${r[1]}${o.unit||'%'}</em></div>`).join('');return `<figure class="vz"><figcaption>${o.cap}</figcaption>${o.cols?`<div class="cl">${o.cols.map(c=>`<div>${col(c)}</div>`).join('')}</div>`:col({rows:o.rows})}<div class="ft">${o.foot||''}</div></figure>`};
const tbars=o=>bars({cap:o.cap,foot:o.foot,cols:o.T.map(T=>{const s=o.logits.map(x=>x/T),m=Math.max(...s),e=s.map(x=>Math.exp(x-m)),z=e.reduce((a,b)=>a+b);return{h:'T = '+T+(T<1?' (sharper)':T>1?' (flatter)':' (as trained)'),rows:e.map((x,i)=>[o.labels[i],Math.round(x/z*100)])}})});
const chips=o=>`<figure class="vz"><figcaption>${o.cap}</figcaption>${o.rows.map(r=>`<div class="chr"><b>${r.l}</b>${r.i.map((x,i)=>`<span class="chp c${i%5+1}">${x[0]}${x[1]?`<small>${x[1]}</small>`:''}</span>`).join('')}</div>`).join('')}<div class="ft">${o.foot||''}</div></figure>`;
const patches=o=>{const n=o.r*o.c;return `<figure class="vz"><figcaption>${o.cap}</figcaption><div class="pg" style="grid-template-columns:repeat(${o.c},1fr)">${Array.from({length:n},(_,i)=>`<i style="background:hsl(${i*37%360} 55% 42%)">${i+1}</i>`).join('')}</div><div class="lnd">↓ each patch becomes one token</div><div style="text-align:center">${Array.from({length:Math.min(n,8)},(_,i)=>`<span class="chp c${i%5+1}">p${i+1}</span>`).join('')}<span class="chp">… p${n}</span></div></figure>`};
const V={flow,stack,seg,lanes,cmp,bars,tbars,chips,patches};

const SP={
d1:[
 {main:1,t:'flow',cap:'One loop of an LLM: text in, next token out',s:[['Text in','“The famous Hyderabadi …”'],['Tokens','The · famous · Hyder · abadi'],['Numbers','each token → an embedding'],['Layers','tokens look at each other'],['Probabilities','biryani 71% · haleem 12% …'],['Pick + append','“… biryani” goes back in']],loop:'repeats until the answer is complete'},
 {at:'4 ·',t:'chips',cap:'What tokens look like (illustrative split and ids)',rows:[{l:'Text: “The famous Hyderabadi biryani”',i:[['The','464'],[' famous','3814'],[' Hyder','21017'],['abadi','5342'],[' biryani','60113']]}],foot:'Each chunk gets an id, then a list of numbers (its embedding).'},
 {at:'5 ·',t:'cmp',cap:'Three things that look alike but work differently',cols:[{h:'Database',s:[['Query','SELECT … WHERE'],['Finds a stored row','exact match'],['Returns that row','same every time']]},{h:'Search engine',s:[['Query','keywords'],['Looks up an index','pages on the web'],['Returns links','you read them']]},{h:'LLM',s:[['Prompt','your text'],['Predicts tokens','from learned numbers'],['Generates new text','not looked up']]}]},
 {at:'7 ·',t:'flow',cap:'From base model to chat assistant',s:[['Pre-training','predict the next token on huge text'],['Base model','brilliant autocomplete, not helpful'],['SFT','learn from question → answer examples'],['RLHF','humans rank answers, model is nudged'],['Chat assistant','follows instructions, hedges, refuses']]}
],
d2:[
 {main:1,t:'stack',cap:'The context window is one shared budget',s:[['System prompt','rules + role, sent every call',1],['Chat history','resent in full on every turn',3],['Retrieved docs (RAG)','pasted-in knowledge',2],['Your question','',1],['Room for the answer','reserved output budget',1.6]],foot:'input + output ≤ window limit'},
 {at:'4 ·',t:'chips',cap:'Same meaning, different token counts (illustrative)',rows:[{l:'English: 5 tokens',i:[['The'],[' famous'],[' Hyder'],['abadi'],[' biryani']]},{l:'Hindi or Telugu: more, smaller pieces',i:[['प्र'],['सिद्ध'],[' है'],['दरा'],['बादी'],[' बि'],['रया'],['नी']]}],foot:'More tokens means more cost and less room in the window.'},
 {at:'5 ·',t:'seg',cap:'Where the time goes (example: 8.5 s in total)',s:[['wait for first token','0.5 s',0.5,'c5'],['generating 400 tokens at 50 per second','8 s',8,'c1']]},
 {at:'5 ·',t:'seg',cap:'Where the money goes (example: $0.010 per call)',s:[['input: 3,000 tokens','$0.006',6,'c2'],['output: 500 tokens','$0.004',4,'c3']]},
 {at:'7 ·',t:'bars',cap:'Why long chats get pricier: input tokens per turn (illustrative)',rows:[['Turn 1',800],['Turn 2',1100],['Turn 3',1400],['Turn 4',1700],['Turn 5',2000]],max:2000,unit:' tok',foot:'The whole history is resent every turn, so the input keeps growing.'}
],
d3:[
 {main:1,t:'flow',cap:'How any input becomes a reply',s:[['Inputs','text · image · audio · PDF'],['Slice into pieces','words · image patches · audio frames'],['Map to numbers','every piece → an embedding'],['Attend','every piece looks at every other'],['Reply','the next token comes out']]},
 {at:'3 ·',t:'lanes',cap:'Different inputs, one model',rows:[[['Text'],['Image'],['Audio']],[['Tokens in one shared number space']],[['The same attention layers']],[['Next token out']]]},
 {at:'4 ·',t:'patches',cap:'An image becomes a grid of patch tokens (4 × 6 shown)',r:4,c:6},
 {at:'5 ·',t:'flow',cap:'One attention step for one token',s:[['Query','what this token needs'],['Compare with Keys','dot product ÷ √d'],['softmax','scores → weights that sum to 1'],['Blend Values','weighted sum'],['New vector','the token now carries context']]}
],
d4:[
 {main:1,t:'flow',cap:'From scores to one chosen token',s:[['Scores (logits)','one raw score per token'],['÷ temperature','low = sharper · high = flatter'],['softmax','scores → probabilities'],['Trim: top-k / top-p','drop unlikely tokens'],['Sample one token','append it and repeat']]},
 {at:'3 ·',t:'tbars',cap:'Temperature reshapes the same scores',logits:[3,1.4,.7,.2],labels:['biryani','haleem','kebab','chai'],T:[0.3,1,2],foot:'Low T: one clear winner. High T: nearly a coin toss.'},
 {at:'5 ·',t:'bars',cap:'Trimming the tail (green = kept, grey = dropped)',cols:[{h:'top-k = 3',rows:[['biryani',55,'k'],['haleem',20,'k'],['kebab',12,'k'],['chai',8,'d'],['dum',5,'d']]},{h:'top-p = 0.9',rows:[['biryani',55,'k'],['haleem',20,'k'],['kebab',12,'k'],['chai',8,'k'],['dum',5,'d']]}],foot:'top-k always keeps 3. top-p keeps tokens until their total reaches 90%, here 4.'},
 {at:'6 ·',t:'cmp',cap:'Where the thinking happens',cols:[{h:'Normal model',s:[['Question',''],['Answer straight away','fast, cheaper']]},{h:'Reasoning model',s:[['Question',''],['Thinking tokens','hidden scratchpad, billed as output'],['Answer','better on multi-step problems']]}]}
],
d5:[
 {at:'Part A',top:1,t:'flow',cap:'Your week 1 in one line',s:[['Day 1','an LLM predicts the next token'],['Day 2','tokens, window, cost, latency'],['Day 3','attention and Q, K, V'],['Day 4','temperature, top-k, top-p'],['Day 5','build: LLM playground']]},
 {main:1,t:'flow',cap:'What the playground does',s:[['Prompt in','text + expected answer length'],['Estimate tokens','chars ÷ 4, or a real tokenizer'],['Pick model prices','from prices.json'],['Compute cost','in × price + out × price'],['Show result','CLI first, then an API']]}
],
d6:[
 {main:1,t:'lanes',cap:'One core, two doors',rows:[[['Core logic','playground_core.py + prices.json']],[['CLI door','python playground.py'],['API door','FastAPI: POST /estimate']],[['Tests','pytest + TestClient'],['README + push + pin','what · demo · run']]]},
 {at:'The API in 20 lines',t:'flow',cap:'Life of one request',s:[['Client','POST /estimate {text, model}'],['Pydantic','validates the body'],['Lookup','prices.json[model] (404 if missing)'],['estimate_cost','tokens × price'],['Response','JSON with tokens and costs']]}
]
};

const place=sp=>{
 const node=E(V[sp.t](sp));
 if(sp.main){const sv=$('svg[data-steps]');if(sv){sv.replaceWith(node);return node}}
 const hs=$$('main h2,main h3'),i=hs.findIndex(h=>h.textContent.trim().startsWith(sp.at));if(i<0)return null;
 if(sp.top)hs[i].after(node);else{const nx=hs[i+1];if(nx)nx.before(node);else{const nv=$$('main .nav');const l=nv[nv.length-1];l?l.before(node):$('main').append(node)}}
 return node};
const eol=()=>$$('.flow').forEach(f=>{const it=$$('.fs',f);it.forEach((x,i)=>{const n=it[i+1];x.classList.toggle('last',!n);x.classList.toggle('eol',!!n&&n.offsetTop>x.offsetTop+4)})});
const nodes=[];(SP[P]||[]).forEach(sp=>{try{const n=place(sp);if(n)nodes.push(n)}catch(e){}});
nodes.forEach(n=>{if(!n.querySelector('.flow'))return;let tm;
 n.addEventListener('click',e=>{const t=e.target,fs=$$('.fs',n);
  if(t.hasAttribute('data-a')){clearInterval(tm);fs.forEach(x=>x.style.opacity=1)}
  if(t.hasAttribute('data-p')){clearInterval(tm);fs.forEach(x=>x.style.opacity=.12);let k=0;tm=setInterval(()=>{if(k<fs.length){fs[k].style.opacity=1;k++}else{clearInterval(tm);if(window.ML)ML.award('anim-'+P,3,'Diagram watched')}},700)}})});
eol();addEventListener('resize',()=>{clearTimeout(window.__vz);window.__vz=setTimeout(eol,120)});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(eol);
})();
