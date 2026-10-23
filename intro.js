/* Native video; no live scene rendering, scroll capture, or repeated RAF loop. */
(() => {
  const root=document.documentElement, intro=document.getElementById('site-intro');
  clearTimeout(window.introBootTimeout);
  if(!intro){root.classList.remove('intro-pending');return;}
  const video=intro.querySelector('video'), toggle=intro.querySelector('[data-intro-toggle]'), skip=intro.querySelector('[data-intro-skip]'), progress=intro.querySelector('.intro-progress');
  const header=document.querySelector('.site-header'), hero=document.querySelector('.hero'), replay=document.querySelector('[data-intro-replay]');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let active=false,finishing=false,watchdog,wasFocused=false,returnFocus=null;
  const behind=[header,...document.querySelectorAll('main > :not(#site-intro)'),document.querySelector('.site-footer')].filter(Boolean);
  const inert=state=>behind.forEach(el=>{el.inert=state;});
  const stopTimer=()=>clearTimeout(watchdog);
  const release=()=>{stopTimer();active=false;finishing=false;intro.hidden=true;video.pause();root.classList.remove('intro-active','intro-pending');inert(false);window.siteScroller?.start();window.ScrollTrigger?.refresh();if(wasFocused){const target=returnFocus||hero.querySelector('h1');if(target){if(!returnFocus)target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}}};
  const finish=()=>{
    if(!active||finishing)return;finishing=true;stopTimer();video.pause();wasFocused=intro.contains(document.activeElement);
    if(!window.gsap||reduced.matches){release();return;}
    // Both layers already occupy their final positions; this is a compositor-only dissolve.
    gsap.set(header,{visibility:'visible',opacity:0,y:-14});
    gsap.timeline({onComplete:()=>{release();gsap.set([intro,header],{clearProps:'opacity,transform,visibility'});}})
      .to(intro,{opacity:0,y:-18,duration:1.05,ease:'power2.inOut'},0)
      .to(header,{opacity:1,y:0,duration:.8,ease:'power2.out'},.4);
  };
  const stalled=()=>{stopTimer();if(active&&!video.paused)watchdog=setTimeout(finish,7000);};
  const start=(manual=false)=>{
    if(active)return;returnFocus=manual?replay:null;active=true;finishing=false;intro.hidden=false;root.classList.remove('intro-pending');root.classList.add('intro-active');inert(true);window.siteScroller?.stop();
    const variant=matchMedia('(max-aspect-ratio:7/10)').matches?'mobile':matchMedia('(max-aspect-ratio:13/10)').matches?'square':'desktop';
    const source='/assets/intro-'+variant+'-v2.mp4';
    if(video.getAttribute('src')!==source){video.poster='/assets/intro-poster-'+variant+'-v2.jpg';video.src=source;video.load();}
    video.currentTime=0;progress.style.transform='scaleX(0)';toggle.textContent='Pause film';
    if(manual)toggle.focus({preventScroll:true});
    watchdog=setTimeout(finish,7000);
    video.play().catch(()=>{stopTimer();toggle.textContent='Play film';});
  };
  toggle.addEventListener('click',()=>{if(video.paused){video.play().catch(()=>{toggle.textContent='Play film';});}else video.pause();});
  skip.addEventListener('click',finish);replay?.addEventListener('click',()=>start(true));
  video.addEventListener('ended',finish);video.addEventListener('error',finish);
  video.addEventListener('playing',()=>{stopTimer();toggle.textContent='Pause film';});
  video.addEventListener('pause',()=>{stopTimer();toggle.textContent='Play film';});
  video.addEventListener('waiting',stalled);video.addEventListener('stalled',stalled);
  video.addEventListener('timeupdate',()=>{if(video.duration)progress.style.transform=`scaleX(${video.currentTime/video.duration})`;});
  document.addEventListener('keydown',e=>{if(!active)return;if(e.key==='Escape'){e.preventDefault();finish();}if(e.key==='Tab'){const buttons=[toggle,skip];if(e.shiftKey&&document.activeElement===buttons[0]){e.preventDefault();skip.focus();}else if(!e.shiftKey&&document.activeElement===buttons[1]){e.preventDefault();toggle.focus();}}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&active)video.pause();});
  addEventListener('pagehide',release);addEventListener('pageshow',e=>{if(e.persisted)release();});
  reduced.addEventListener('change',()=>{if(reduced.matches)finish();});
  if(reduced.matches||navigator.connection?.saveData||location.hash||scrollY>20){root.classList.remove('intro-pending');}else start();
})();
