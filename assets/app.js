(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const K='ml-progress';let S={};try{S=JSON.parse(localStorage.getItem(K))||{}}catch(e){}
S.xp=S.xp||0;S.done=S.done||{};S.notes=S.notes||{};S.days=S.days||[];
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const P=document.body.dataset.day||'home';
if(!$('link[rel~=icon]')){const cs=document.currentScript;if(cs&&cs.src){const l=document.createElement('link');l.rel='icon';l.type='image/svg+xml';l.href=new URL('favicon.svg',cs.src).href;document.head.append(l)}}
const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=()=>iso(new Date());
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const el=h=>{const t=document.createElement('template');t.innerHTML=h.trim();return t.content.firstChild};
function streak(){let n=0,d=new Date();const s=new Set(S.days);if(!s.has(iso(d)))d.setDate(d.getDate()-1);while(s.has(iso(d))){n++;d.setDate(d.getDate()-1)}return n}
function hud(){const h=$('#hud');if(h)h.textContent='⚡ '+S.xp+' XP · 🔥 '+streak()+'-day streak'}
function toast(m){const t=el('<div class="toast">'+m+'</div>');document.body.append(t);setTimeout(()=>t.remove(),2200)}
function pop(){if(reduce)return;for(let i=0;i<36;i++){const c=el('<i class="cf"></i>');c.style.cssText='left:'+Math.random()*100+'vw;background:hsl('+Math.random()*360+',80%,60%);animation-delay:'+Math.random()*.3+'s';document.body.append(c);setTimeout(()=>c.remove(),2000)}}
function award(k,p,m){if(S.done[k])return false;S.done[k]=1;S.xp+=p;const t=today();if(!S.days.includes(t))S.days.push(t);save();hud();toast('+'+p+' XP · '+(m||'Nice!'));if(p>=8)pop();return true}
window.ML={$,$$,el,award,S,save};
$('main').prepend(el('<div class="hud" id="hud"></div>'));hud();

$$('svg[data-steps]').forEach(svg=>{
 const R=$$('rect',svg),T=$$('text',svg),A=$$('g path',svg),N=R.length;
 const b=R.map(r=>[+r.getAttribute('y'),+r.getAttribute('y')+ +r.getAttribute('height')]);
 const own=T.map(t=>b.findIndex(([a,z])=>+t.getAttribute('y')>=a&&+t.getAttribute('y')<z));
 let n=N,tm;
 const ap=()=>{R.forEach((r,i)=>r.style.opacity=i<n?1:.12);T.forEach((t,j)=>t.style.opacity=own[j]<0||own[j]<n?1:.08);A.forEach((p,j)=>p.style.opacity=(j<N-1?j<n-1:n===N)?1:.1)};
 const c=el('<div class="ctl"><button data-a="p">▶ Play step by step</button><button data-a="a">Show all</button></div>');svg.after(c);
 c.onclick=e=>{const a=e.target.dataset.a;clearInterval(tm);if(a==='a'){n=N;ap()}if(a==='p'){if(reduce){n=N;ap();return}n=0;ap();tm=setInterval(()=>{n++;ap();if(n>=N){clearInterval(tm);award('anim-'+P,3,'Diagram watched')}},800)}}});

$$('[data-palace]').forEach(box=>{
 const ol=$('ol',box),L=$$('li',ol),E=(box.dataset.e||'').split(','),key='pal-'+P;let i=0;
 const ui=el('<div class="pal"><div class="pe"></div><div class="pt"></div><div class="dots"></div><textarea rows="2" placeholder="Make it yours: type your own wilder image for this stop…"></textarea><div class="ctl"><button data-a="p">← Back</button><button data-a="n">Next →</button></div></div>');
 ol.hidden=true;box.append(ui);const ta=$('textarea',ui);
 const draw=()=>{const pe=$('.pe',ui);pe.textContent=E[i]||'📍';pe.classList.remove('pop');void pe.offsetWidth;pe.classList.add('pop');$('.pt',ui).innerHTML='<small>Stop '+(i+1)+' of '+L.length+'</small><br>'+L[i].innerHTML;$('.dots',ui).innerHTML=L.map((_,j)=>'<i class="'+(j===i?'on':'')+'"></i>').join('');ta.value=S.notes[key+i]||''};
 ui.onclick=e=>{const a=e.target.dataset.a;if(a==='n'){if(i<L.length-1)i++;else award(key,10,'Palace walked!');draw()}if(a==='p'&&i>0){i--;draw()}};
 ta.oninput=()=>{S.notes[key+i]=ta.value;save()};draw()});

const flash=w=>{
 const g=el('<div class="fl"></div>');
 $$(':scope>.box.why',w).forEach((b,i)=>{
  const q=$('b',b).innerHTML,a=b.innerHTML.split('<br>').slice(1).join('<br>');
  const c=el('<div class="fc"><div class="fi"><div class="ff"><small>Tap to flip</small><br><b>'+q+'</b></div><div class="fb">'+a+'<br><button class="mini">✔ I recalled it</button></div></div></div>');
  c.onclick=e=>{if(e.target.classList.contains('mini')){e.stopPropagation();award('fc-'+P+'-'+i,2,'Recalled!');e.target.textContent='✔ Saved';return}c.classList.toggle('flip')};
  g.append(c);b.hidden=true});
 const k=el('<div class="ctl"><button>Flip all</button></div>');k.onclick=()=>$$('.fc',g).forEach(c=>c.classList.toggle('flip'));
 w.prepend(g);w.prepend(k)};
$$('[data-flash]').forEach(flash);

const quiz=(w,Q,key)=>{let i=0,sc=0,lock=false;const bad=new Set();
 const draw=()=>{lock=false;if(i>=Q.length){w.innerHTML='<b>Score: '+sc+'/'+Q.length+'</b>'+(bad.size?'<p>Worth revisiting: '+[...bad].join(' · ')+'</p>':'<p>Clean sweep! 🎉</p>');award(key,sc*3,'Quiz done');if(sc===Q.length)pop();return}
  const q=Q[i];w.innerHTML='<p><b>Q'+(i+1)+'/'+Q.length+'.</b> '+(q.d?'<small>'+q.d+'</small><br>':'')+q.q+'</p>'+q.o.map((o,j)=>'<button class="opt" data-j="'+j+'">'+o+'</button>').join('')+'<p class="fb2"></p>'};
 w.onclick=e=>{if(e.target.classList.contains('nx')){i++;draw();return}
  const b=e.target.closest('.opt');if(!b||lock)return;lock=true;const q=Q[i],j=+b.dataset.j;
  $$('.opt',w).forEach((o,x)=>{if(x===q.a)o.classList.add('ok')});if(j===q.a)sc++;else{b.classList.add('no');if(q.d)bad.add(q.d)}
  $('.fb2',w).innerHTML=(j===q.a?'✅ ':'❌ ')+q.e+' <button class="mini nx">Next →</button>'};
 draw()};
$$('.quiz[data-q]').forEach(w=>quiz(w,JSON.parse(w.dataset.q),'quiz-'+P));

$$('[data-teach]').forEach(w=>{const key='teach-'+P;
 w.innerHTML='<b>🎤 Teach it (2 min)</b><p>'+w.dataset.prompt+'</p><textarea rows="3" placeholder="My one-line version…"></textarea><button>✔ I explained it aloud</button>';
 const ta=$('textarea',w);ta.value=S.notes[key]||'';ta.oninput=()=>{S.notes[key]=ta.value;save()};$('button',w).onclick=()=>award(key,8,'Taught it!')});

$$('[data-rev]').forEach(w=>{
 const d=document.body.dataset.date.split('-').map(Number);w.id='rev';w.innerHTML='<b>🔁 Revision tracker</b>';
 [1,3,7,21].forEach((k,x)=>{const t=new Date(d[0],d[1]-1,d[2]+k),key='rev-'+P+'-'+x;
  const r=el('<label class="rv"><input type="checkbox"> <span>+'+k+' days · '+t.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'})+'</span> <em></em></label>');
  const cb=$('input',r),st=()=>{$('em',r).textContent=S.done[key]?'done ✓':iso(t)<today()?'overdue':iso(t)===today()?'due today':'upcoming'};
  cb.checked=!!S.done[key];st();cb.onchange=()=>{if(cb.checked)award(key,5,'Revision done');else{delete S.done[key];save()}st()};w.append(r)})});

$$('[data-todo]').forEach(w=>{const L=$$('li',w);L.forEach((li,i)=>{const k='td-'+P+'-'+i,cb=el('<input type="checkbox"> ');cb.checked=!!S.done[k];
 cb.onchange=()=>{if(cb.checked){S.done[k]=1;S.xp+=2;save();hud();toast('+2 XP · Step done');if(L.every((_,j)=>S.done['td-'+P+'-'+j]))award('tdall-'+P,15,'All steps done!')}else{delete S.done[k];save()}};li.prepend(cb)})});

$$('[data-recap]').forEach(async w=>{
 if(location.protocol==='file:'||!window.DAYS){w.textContent='Open this page from the published site to load the recap.';return}
 const base=new URL('../../',location.href),ds=DAYS.filter(D=>D.date>=w.dataset.from&&D.date<=w.dataset.to);
 w.innerHTML='<p class="mut">Loading your notes…</p>';let parts;
 try{parts=await Promise.all(ds.map(D=>fetch(new URL(D.url,base)).then(r=>r.text()).then(t=>{const d=new DOMParser().parseFromString(t,'text/html'),rc=d.querySelector('.recap'),qz=d.querySelector('.quiz[data-q]');
  return{D,u:new URL(D.url,base).href,top:rc?[...rc.querySelectorAll('li')].map(x=>x.innerHTML):[],Q:qz?JSON.parse(qz.dataset.q):[],W:[...d.querySelectorAll('[data-flash]>.box.why')].map(x=>x.outerHTML)}})))}
 catch(e){w.textContent='Could not load the notes. Try again later.';return}
 let h='<h3>📅 At a glance: recall first, then check</h3>';
 parts.forEach(p=>{h+='<div class="box why"><b>Day '+p.D.n+' · '+p.D.title+'</b> <a class="mut" href="'+p.u+'">open notes</a><textarea rows="2" data-k="'+p.D.id+'" placeholder="From memory: the top 3 points…"></textarea><details data-d="'+p.D.id+'"><summary>Check my answer</summary><ol>'+p.top.map(x=>'<li>'+x+'</li>').join('')+'</ol></details></div>'});
 h+='<h3>🔀 Mixed quiz (all days shuffled)</h3><div class="quiz" id="rq"></div><h3>🃏 Flip cards from every day</h3><div data-flash id="rf"></div>';
 w.innerHTML=h;
 $$('textarea[data-k]',w).forEach(t=>{const k='rc-'+P+'-'+t.dataset.k;t.value=S.notes[k]||'';t.oninput=()=>{S.notes[k]=t.value;save()}});
 $$('details[data-d]',w).forEach(d=>d.ontoggle=()=>{if(d.open)award('rc-'+P+'-'+d.dataset.d,3,'Recalled the day')});
 const pool=parts.map(p=>p.Q.map(q=>({...q,d:'<a href="'+p.u+'">Day '+p.D.n+'</a>'})).sort(()=>Math.random()-.5)),Q=[],n=+w.dataset.n||8;
 while(Q.length<n&&pool.some(a=>a.length))pool.forEach(a=>{if(a.length&&Q.length<n)Q.push(a.shift())});
 Q.sort(()=>Math.random()-.5);quiz($('#rq',w),Q,'rquiz-'+P);
 $('#rf',w).innerHTML=parts.map(p=>p.W.join('')).join('');flash($('#rf',w))});

let pyP;const getPy=()=>pyP||(pyP=new Promise((res,rej)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';s.onload=()=>loadPyodide().then(res,rej);s.onerror=()=>rej(new Error('Could not load the Python runtime'));document.head.append(s)}));
$$('[data-run]').forEach(w=>{
 const st=$('.starter',w).textContent.trim(),ts=$('.tests',w).textContent.trim(),key='run-'+P;
 w.insertAdjacentHTML('afterbegin','<b>🧪 Try it here (Python runs in your browser)</b><textarea class="code" spellcheck="false" rows="12"></textarea><div class="ctl"><button data-a="r">▶ Run my code</button><button data-a="x">Reset</button></div><pre class="out">Output appears here.</pre>');
 const ta=$('.code',w),out=$('.out',w);ta.value=S.notes[key]||st;ta.oninput=()=>{S.notes[key]=ta.value;save()};
 w.onclick=async e=>{const a=e.target.dataset.a;if(a==='x'){ta.value=st;S.notes[key]=st;save();out.textContent='Reset.'}if(a!=='r')return;
  out.textContent='Loading Python (first time takes a few seconds)…';
  try{const py=await getPy(),L=[];py.setStdout({batched:s=>L.push(s)});const ns=py.globals.get('dict')();
   await py.runPythonAsync(ta.value,{globals:ns});
   await py.runPythonAsync('try:\n'+ts.split('\n').map(l=>'    '+l).join('\n')+'\n    print("✅ All checks passed")\nexcept AssertionError as e:\n    print("❌ Check failed:",e)',{globals:ns});
   out.textContent=L.join('\n');if(L.join('').includes('✅'))award(key,15,'Solved it!')}
  catch(err){out.textContent='⚠️ '+String(err).split('\n').slice(-3).join('\n')}}});

if(P!=='home'&&location.protocol!=='file:'){fetch('../').then(r=>r.text()).then(t=>{
 const d=new DOMParser().parseFromString(t,'text/html'),base=new URL('../',location.href),cur=location.href.split('#')[0].split('?')[0].replace(/index\.html$/,'');
 const L=[...d.querySelectorAll('.days a')].filter(a=>/^Day/.test((a.querySelector('b')||{}).textContent||'')).map(a=>({u:new URL(a.getAttribute('href'),base).href,n:parseInt((a.querySelector('b')||{}).textContent.replace(/\D/g,''),10)}));
 const i=L.findIndex(x=>x.u===cur),navs=$$('.nav'),bot=navs[navs.length-1];if(i<0||!bot||navs.length<2)return;
 const pv=L[i-1],nx=L[i+1];
 bot.innerHTML=(pv?'<a href="'+pv.u+'">← Day '+pv.n+'</a>':'<span></span>')+(nx?'<a href="'+nx.u+'">Next: Day '+nx.n+' →</a>':'<span class="mut">Next day coming soon</span>')}).catch(()=>{})}

if(P!=='home'&&$('.legend')){const lg=$('.legend');
 const st=el('<div class="st"><b>Before you start</b> <span class="en"><button data-e="😴">😴</button><button data-e="🙂">🙂</button><button data-e="🔥">🔥</button></span><div class="ck"><label><input type="checkbox">📵 Phone away</label><label><input type="checkbox">💧 Water ready</label><label><input type="checkbox">🌿 Study scent on</label></div></div>');
 st.onclick=e=>{const b=e.target.closest('[data-e]');if(b){$$('[data-e]',st).forEach(x=>x.classList.toggle('on',x===b));award('state-'+P,3,'Energy set')}
  if($$('input',st).every(x=>x.checked))award('prep-'+P,3,'Ready to study')};
 const tm=el('<div class="tm"><b>⏱ Focus</b> <span class="clk">45:00</span> <button data-a="s">Start</button> <button data-a="r">Reset</button><div class="brk" hidden>🧍 Break: 💧 drink water · 👀 look far away · 🔀 cross-crawl <span class="cc">↔️</span></div></div>');
 let mode='f',rem=2700,end=0,iv;const clk=$('.clk',tm),brk=$('.brk',tm),fmt=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
 const rs=()=>{clearInterval(iv);mode='f';rem=2700;clk.textContent=fmt(rem);brk.hidden=true;$('[data-a=s]',tm).textContent='Start'};
 tm.onclick=e=>{const a=e.target.dataset.a;if(a==='r')rs();if(a==='s'){clearInterval(iv);end=Date.now()+rem*1000;e.target.textContent='Running…';
  iv=setInterval(()=>{rem=Math.max(0,Math.ceil((end-Date.now())/1000));clk.textContent=fmt(rem);
   if(rem<=0){clearInterval(iv);if(mode==='f'){award('focus-'+P,10,'Focus block done!');mode='b';rem=300;end=Date.now()+300000;brk.hidden=false;iv=setInterval(()=>{rem=Math.max(0,Math.ceil((end-Date.now())/1000));clk.textContent=fmt(rem);if(rem<=0)rs()},1000)}else rs()}},1000)}};
 lg.before(st);lg.before(tm)}

if(P==='home'&&window.DAYS&&$('#dash')){const due=[],by={};
 DAYS.forEach(D=>{const b=D.date.split('-').map(Number);[1,3,7,21].forEach((k,x)=>{const t=new Date(b[0],b[1]-1,b[2]+k);if(iso(t)<=today()&&!S.done['rev-'+D.id+'-'+x]){const o={D,k,late:iso(t)<today()};due.push(o);(by[D.id]=by[D.id]||{D,r:[]}).r.push(o)}})});
 const rows=Object.values(by);
 $('#dash').innerHTML='<h2>Today</h2><div class="stats"><div><b>'+S.xp+'</b><small>XP</small></div><div><b>'+streak()+'</b><small>day streak</small></div><div><b>'+DAYS.length+'/100</b><small>days written</small></div></div>'+
 (rows.length?'<h3>🔁 Due for revision</h3><ul class="days">'+rows.map(g=>'<li><a href="'+g.D.url+'#rev"><b>Day '+String(g.D.n).padStart(3,'0')+'</b> '+g.D.title+'</a></li>').join('')+'</ul>':'<p class="mut">Nothing due. 🎉</p>')}
})();
