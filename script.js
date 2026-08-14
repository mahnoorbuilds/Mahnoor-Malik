
const isTouch = ()=>('ontouchstart' in window)||navigator.maxTouchPoints>0;

// MOUSE LIGHT
const ml=document.getElementById('mouse-light');
let mlX=innerWidth/2,mlY=innerHeight/2,tX=mlX,tY=mlY;
ml.style.left='0'; ml.style.top='0';
document.addEventListener('mousemove',e=>{tX=e.clientX;tY=e.clientY;});
(function animLight(){
  mlX+=(tX-mlX)*.08; mlY+=(tY-mlY)*.08;
  ml.style.transform=`translate3d(${mlX}px,${mlY}px,0) translate(-50%,-50%)`;
  requestAnimationFrame(animLight);
})();

// WEBGL
(function(){
  const c=document.getElementById('bg-canvas');
  function sync(){
    c.width=innerWidth*0.5; c.height=innerHeight*0.5;
    c.style.width=innerWidth+'px'; c.style.height=innerHeight+'px';
  }
  window.addEventListener('resize',sync);sync();
  const gl=c.getContext('webgl')||c.getContext('experimental-webgl');
  if(!gl)return;
  const vs=`attribute vec2 a; varying vec2 v; void main(){v=a*.5+.5;gl_Position=vec4(a,0,1);}`;
  const fs=`precision highp float;
  uniform float u_t;uniform vec2 u_r,u_m;varying vec2 v;
  float h(vec2 p){p=fract(p*vec2(127.1,311.7));p+=dot(p,p+45.3);return fract(p.x*p.y);}
  float n(vec2 p){vec2 i=floor(p),f=fract(p);float a=h(i),b=h(i+vec2(1,0)),c=h(i+vec2(0,1)),d=h(i+vec2(1,1));vec2 u=f*f*(3.-2.*f);return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;}
  float fbm(vec2 p){float v=0.,a=.5;mat2 r=mat2(.8,.6,-.6,.8);for(int i=0;i<5;i++){v+=a*n(p);p=r*p*2.1+vec2(11.7,13.3);a*=.48;}return v;}
  void main(){
    vec2 p=(gl_FragCoord.xy*2.-u_r)/min(u_r.x,u_r.y);
    vec2 m=(u_m*2.-u_r)/min(u_r.x,u_r.y);
    float d=length(p-m);p+=(p-m)*exp(-d*6.)*.04;
    float t=u_t*.07;
    vec2 q=vec2(fbm(p+t),fbm(p+vec2(1)));
    vec2 r2=vec2(fbm(p+3.5*q+vec2(1.7,9.2)+.12*t),fbm(p+3.5*q+vec2(8.3,2.8)+.1*t));
    float f=fbm(p+3.5*r2);
    vec3 c1=vec3(.01,.04,.1),c2=vec3(.02,.07,.18),c3=vec3(.06,.16,.3);
    vec3 col=mix(c1,c2,clamp(f*f*4.,0.,1.));col=mix(col,c3,clamp(length(q),0.,1.)*.2);
    col+=h(v+u_t)*.025;
    float vig=1.-smoothstep(.4,1.3,length(p));
    gl_FragColor=vec4(col*vig,1);
  }`;
  function mk(t,s){const sh=gl.createShader(t);gl.shaderSource(sh,s);gl.compileShader(sh);return sh;}
  const prog=gl.createProgram();
  gl.attachShader(prog,mk(gl.VERTEX_SHADER,vs));gl.attachShader(prog,mk(gl.FRAGMENT_SHADER,fs));
  gl.linkProgram(prog);gl.useProgram(prog);
  const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const al=gl.getAttribLocation(prog,'a');gl.enableVertexAttribArray(al);gl.vertexAttribPointer(al,2,gl.FLOAT,false,0,0);
  const uT=gl.getUniformLocation(prog,'u_t'),uR=gl.getUniformLocation(prog,'u_r'),uM=gl.getUniformLocation(prog,'u_m');
  let mx={x:c.width/2,y:c.height/2};
  document.addEventListener('mousemove',e=>{mx.x=e.clientX;mx.y=c.height-e.clientY;});
  function render(t){sync();gl.viewport(0,0,c.width,c.height);gl.uniform1f(uT,t*.001);gl.uniform2f(uR,c.width,c.height);gl.uniform2f(uM,mx.x,mx.y);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);requestAnimationFrame(render);}
  requestAnimationFrame(render);
})();

// SCROLL PROGRESS
const pb=document.getElementById('scroll-progress');
window.addEventListener('scroll',()=>{pb.style.width=Math.min((scrollY/(document.documentElement.scrollHeight-innerHeight))*100,100)+'%';},{passive:true});

// NAVBAR
const nb=document.getElementById('navbar');
window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',scrollY>60),{passive:true});
const secs=document.querySelectorAll('section[id]');
const nls=document.querySelectorAll('.nav-link');
new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)nls.forEach(l=>l.classList.toggle('active',l.dataset.section===e.target.id));});},{threshold:.3,rootMargin:'-100px 0px -50% 0px'}).observe=function(t){secs.forEach(s=>IntersectionObserver.prototype.observe.call(this,s));};
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)nls.forEach(l=>l.classList.toggle('active',l.dataset.section===e.target.id));});},{threshold:.3,rootMargin:'-100px 0px -50% 0px'});
secs.forEach(s=>obs.observe(s));

// MOBILE MENU
function toggleMobileMenu(){const m=document.getElementById('mobile-menu'),b=document.getElementById('hamburger');m.classList.toggle('open');b.classList.toggle('open');document.body.style.overflow=m.classList.contains('open')?'hidden':'';}
function closeMobileMenu(){const m=document.getElementById('mobile-menu'),b=document.getElementById('hamburger');m.classList.remove('open');b.classList.remove('open');document.body.style.overflow='';}

// REVEAL
const ro=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target);}});},{threshold:.08,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

// HERO WORD ENTRANCE
window.addEventListener('load',()=>{setTimeout(()=>{document.querySelectorAll('.hero-title .word').forEach((w,i)=>setTimeout(()=>{w.style.transform='translateY(0)';},i*80+200));},100);});

// COUNTER
function animCount(el,target){let s=0;const d=1200,st=performance.now();(function step(now){const p=Math.min((now-st)/d,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(s+e*(target-s));if(p<1)requestAnimationFrame(step);else el.textContent=target;requestAnimationFrame(step);})();}
const co=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const t=parseInt(e.target.dataset.target);if(!isNaN(t))animCount(e.target,t);co.unobserve(e.target);}});},{threshold:.5});
document.querySelectorAll('[data-target]').forEach(el=>co.observe(el));

// PORTRAIT PARALLAX
const pc=document.getElementById('portrait-card');
if(pc&&!isTouch()){document.addEventListener('mousemove',e=>{const r=pc.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=(e.clientX-cx)/(innerWidth/2),dy=(e.clientY-cy)/(innerHeight/2);pc.style.transform=`perspective(800px) rotateY(${dx*6}deg) rotateX(${-dy*4}deg)`;});}

// SKILL CARD RADIAL
document.querySelectorAll('.skill-card').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');});});

// MAGNETIC BTNS
document.querySelectorAll('.btn-primary,.nav-cta').forEach(btn=>{btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;btn.style.transform=`translate(${x*.18}px,${y*.18}px) scale(1.04)`;});btn.addEventListener('mouseleave',()=>{btn.style.transform='';});});

// FORM
function handleFormSubmit(){const b=document.getElementById('send-btn');b.innerHTML='Sent &#10003;';b.style.background='#22c55e';b.style.color='#fff';setTimeout(()=>{b.innerHTML='Initialize Sequence <span class="material-symbols-outlined" style="font-size:16px">send</span>';b.style.background='';b.style.color='';},3000);}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}});});

// REDUCED MOTION / MOBILE
if(window.matchMedia('(prefers-reduced-motion:reduce)').matches)document.getElementById('bg-canvas').style.display='none';
if(isTouch()){document.getElementById('bg-canvas').style.opacity='.3';ml.style.display='none';}
