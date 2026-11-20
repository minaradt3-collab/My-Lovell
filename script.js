(function(){
// تشغيل الأغنية تلقائياً أول ما اللينك يفتح
const musicToggle = document.getElementById("musicToggle");
if (musicToggle) {
  const bgMusic = new Audio("ssstik.io_1795196092833.mp3");
  bgMusic.loop = true;
  bgMusic.preload = "auto";
  bgMusic.autoplay = true;

  function updateButtonState(isPlaying) {
    musicToggle.textContent = isPlaying ? "♫ Pause music" : "♫ Play music";
    musicToggle.setAttribute("aria-label", isPlaying ? "Pause music" : "Play music");
  }

  async function tryAutoPlay() {
    if (!bgMusic.paused) {
      updateButtonState(true);
      return true;
    }
    try {
      await bgMusic.play();
      updateButtonState(true);
      cleanup();
      return true;
    } catch (_) {
      updateButtonState(false);
      return false;
    }
  }

  function unlockOnAction() {
    tryAutoPlay();
  }

  function cleanup() {
    ["pointerdown", "touchstart", "keydown", "wheel", "scroll"].forEach((ev) => {
      window.removeEventListener(ev, unlockOnAction);
      document.removeEventListener(ev, unlockOnAction);
    });
  }

  bgMusic.addEventListener("error", () => {
    musicToggle.textContent = "♫ Audio error";
    musicToggle.setAttribute("aria-label", "Audio error");
  });

  // محاولة التشغيل بمجرد فتح اللينك وجاهزية الصوت
  window.addEventListener("DOMContentLoaded", tryAutoPlay);
  window.addEventListener("load", tryAutoPlay);
  bgMusic.addEventListener("canplaythrough", tryAutoPlay, { once: true });

  // لو المتصفح منعها في أول زيارة، تشتغل في أول حركة أو لمسة
  ["pointerdown", "touchstart", "keydown", "wheel", "scroll"].forEach((ev) => {
    window.addEventListener(ev, unlockOnAction, { passive: true });
    document.addEventListener(ev, unlockOnAction, { passive: true });
  });

  // زرار التشغيل/الإيقاف
  musicToggle.addEventListener("click", async (e) => {
    e.stopPropagation();
    if (bgMusic.paused) {
      const ok = await tryAutoPlay();
      if (!ok) musicToggle.textContent = "♫ Tap to play";
    } else {
      bgMusic.pause();
      updateButtonState(false);
    }
  });
}

// خلفية النجوم والجسيمات
const cv=document.getElementById('sky'),x=cv.getContext('2d');
let W,H,stars=[],parts=[],speed=0,lastY=scrollY;
function size(){W=cv.width=innerWidth;H=cv.height=innerHeight;
  stars=Array.from({length:Math.min(420,W*H/3500|0)},()=>({x:(Math.random()-.5)*W*2,y:(Math.random()-.5)*H*2,z:Math.random()*W}))}
size();addEventListener('resize',size);
function burst(px,py,n){const cols=['#2effc8','#ffd36b','#8fd0ff','#ffb3a7','#fff'];
  for(let i=0;i<n;i++){const a=Math.random()*6.283,v=Math.random()*10+2;
    parts.push({x:px,y:py,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:1,c:cols[i%5],r:Math.random()*3+1})}}
function loop(){
  const dy=scrollY-lastY;lastY=scrollY;
  speed+=(Math.min(Math.abs(dy)*1.2,60)-speed)*.08;
  x.fillStyle='rgba(2,10,12,'+(speed>6?.25:.6)+')';x.fillRect(0,0,W,H);
  const dir=dy>=0?1:-1;
  for(const s of stars){
    const v=(1.2+speed)*dir;
    const px=s.x/s.z*W/2+W/2,py=s.y/s.z*W/2+H/2;
    s.z-=v;
    if(s.z<=1){s.z=W;s.x=(Math.random()-.5)*W*2;s.y=(Math.random()-.5)*H*2}
    if(s.z>W)s.z=2;
    const qx=s.x/(s.z+v*3)*W/2+W/2,qy=s.y/(s.z+v*3)*W/2+H/2;
    x.strokeStyle='rgba(215,255,245,'+(1-s.z/W+.15)+')';x.lineWidth=(1-s.z/W)*2.4+.3;
    x.beginPath();x.moveTo(qx,qy);x.lineTo(px,py);x.stroke()}
  for(const p of parts){x.globalAlpha=p.l;x.fillStyle=p.c;x.shadowBlur=12;x.shadowColor=p.c;
    x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill();
    p.x+=p.vx;p.y+=p.vy;p.vy+=.12;p.l-=.014}
  x.globalAlpha=1;x.shadowBlur=0;parts=parts.filter(p=>p.l>0);
  requestAnimationFrame(loop)}
loop();

const words=['SODO','My Love','Forever','My Universe','SODO'];let wi=0;
const wEl=document.getElementById('word');
function setWord(w){wEl.innerHTML='';
  [...w].forEach((ch,i)=>{const s=document.createElement('span');s.textContent=ch===' '?'\u00a0':ch;
    s.style.animationDelay=(i*.1)+'s,0s,'+(i*.2)+'s';
    s.style.setProperty('--sx',(20+Math.random()*70)+'%');s.style.setProperty('--sy',(Math.random()*50)+'%');
    s.style.setProperty('--sd',(Math.random()*2)+'s');wEl.appendChild(s)})}
setWord('SODO');
function hearts(n){for(let i=0;i<n;i++){const h=document.createElement('div');h.className='fl';
  h.textContent=['✦','✨','💫','🌟','🤍'][i%5];h.style.left=Math.random()*100+'vw';
  h.style.fontSize=(18+Math.random()*34)+'px';h.style.animationDuration=(3+Math.random()*3)+'s';
  h.style.animationDelay=Math.random()*.8+'s';document.body.appendChild(h);setTimeout(()=>h.remove(),7000)}}
function change(e){wi=(wi+1)%words.length;setWord(words[wi]);
  burst(e.clientX,e.clientY,150);burst(W/2,H/2,100);hearts(16);
  document.body.animate([{filter:'brightness(2.2) hue-rotate(50deg)'},{filter:'none'}],{duration:800});
  wEl.animate([{transform:'scale(1.4) rotate(-5deg)'},{transform:'scale(1)'}],{duration:700,easing:'cubic-bezier(.2,1.6,.4,1)'})}
const hero=document.getElementById('hero');
hero.addEventListener('dblclick',change);
let lt=0;hero.addEventListener('click',e=>{if(e.target.id==='go')return;burst(e.clientX,e.clientY,25);
  const n=Date.now();if(n-lt<350&&e.pointerType==='touch')change(e);lt=n});
document.getElementById('go').onclick=()=>scrollTo({top:innerHeight,behavior:'smooth'});

const data=[
['The First Time','','The moment I met you, everything else faded away and only you remained.','#ffd36b','#ff8a3d'],
['Your Smile','','Your smile brightens my day more than any star ever could.','#ffb3a7','#d4739a'],
['Just Us','','With you even the simplest moments become my favorite memories.','#2effc8','#0b8f7a'],
['Our Nights','','Every night with you feels like a sky full of stars.','#8fd0ff','#3b6bff'],
['Forever','','You are my today, my tomorrow, and my always.','#2effc8','#ffd36b']];
const PH=["1.jpg","2.jpg","3.jpg","4.jpg","6.jpg"];
const box=document.getElementById('stops');
data.forEach((d,i)=>{
  const s=document.createElement('section');s.className='stop'+(i%2?' rev':'');
  s.innerHTML='<div class="planet'+(i%2?' nr':'')+' spin" style="--c1:'+d[3]+';--c2:'+d[4]+';--rot:'+(i%2?3:-3)+'deg"><em>photo</em><input type="file" accept="image/*"></div><div class="txt"><h3>'+d[0]+'</h3><p>'+d[2]+'</p></div>';
  const pl=s.querySelector('.planet'),inp=s.querySelector('input');
  pl.onclick=()=>inp.click();
  inp.onchange=()=>{const f=inp.files[0];if(f){pl.style.backgroundImage='url('+URL.createObjectURL(f)+')';pl.classList.remove('spin');pl.querySelector('em').style.opacity=0;burst(innerWidth/2,innerHeight/2,80);hearts(10)}};
  if(PH[i]){pl.style.backgroundImage='url('+PH[i]+')';pl.style.backgroundPosition='50% 40%';pl.querySelector('em').style.opacity=0}
  box.appendChild(s)});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');if(e.target.classList.contains('big'))hearts(30)}}),{threshold:.3});
document.querySelectorAll('.txt,.big').forEach(el=>io.observe(el));
const bar=document.getElementById('bar');
function par(){
  const vh=innerHeight;
  document.querySelectorAll('.planet').forEach(p=>{const r=p.getBoundingClientRect(),c=(r.top+r.height/2-vh/2)/vh;
    const k=Math.max(0,1-Math.abs(c)*1.1);
    p.style.setProperty('--s',(.3+k*.75).toFixed(3));p.style.setProperty('--o',Math.min(1,k*1.6).toFixed(2));
    p.style.setProperty('--py',(c*-70).toFixed(0)+'px')});
  bar.style.transform='scaleX('+(scrollY/(document.body.scrollHeight-innerHeight||1))+')'}
addEventListener('scroll',par,{passive:true});par();
})();