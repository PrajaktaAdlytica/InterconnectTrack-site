/* Native video with lightweight, media-synchronized HTML overlays; no scroll capture. */
(() => {
  const root=document.documentElement, intro=document.getElementById('site-intro');
  clearTimeout(window.introBootTimeout);
  if(!intro){root.classList.remove('intro-pending');return;}
  const video=intro.querySelector('video'), toggle=intro.querySelector('[data-intro-toggle]'), skip=intro.querySelector('[data-intro-skip]'), progress=intro.querySelector('.intro-progress');
  const header=document.querySelector('.site-header'), hero=document.querySelector('.hero'), replay=document.querySelector('[data-intro-replay]');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let active=false,finishing=false,watchdog,wasFocused=false,returnFocus=null,resumeOnVisible=false,frameId=null;
  const messages=[...intro.querySelectorAll('[data-intro-message]')], brand=intro.querySelector('.intro-brand');
  const clamp=n=>Math.max(0,Math.min(1,n));
  const ease=n=>1-Math.pow(1-clamp(n),3);
  // Read the media clock: buffering, pause, seeking and replay cannot desync the copy.
  const sync=()=>{
    const t=video.currentTime;
    messages.forEach((el,i)=>{
      const enter=ease((t-(i?3.75:.18))/.8), leave=i?0:ease((t-3.25)/.45);
      el.style.opacity=String(enter*(1-leave));
      el.style.transform=`translate3d(0,${(1-enter)*24-leave*12}px,0)`;
    });
    brand.style.opacity=String(ease(t/.7));
    progress.style.transform=`scaleX(${video.duration?clamp(t/video.duration):0})`;
  };
  const cancelFrame=()=>{if(frameId!==null){if(video.cancelVideoFrameCallback)video.cancelVideoFrameCallback(frameId);else cancelAnimationFrame(frameId);frameId=null;}};
  const frame=()=>{frameId=null;sync();if(active&&!finishing&&!video.paused&&!video.ended)frameId=video.requestVideoFrameCallback?video.requestVideoFrameCallback(frame):requestAnimationFrame(frame);};
  const animate=()=>{cancelFrame();frame();};
  const behind=[header,...document.querySelectorAll('main > :not(#site-intro)'),document.querySelector('.site-footer')].filter(Boolean);
  const inert=state=>behind.forEach(el=>{el.inert=state;});
  const stopTimer=()=>clearTimeout(watchdog);
  const release=()=>{stopTimer();cancelFrame();active=false;finishing=false;intro.hidden=true;video.pause();root.classList.remove('intro-active','intro-pending');inert(false);window.siteScroller?.start();window.ScrollTrigger?.refresh();if(wasFocused){const target=returnFocus||hero.querySelector('h1');if(target){if(!returnFocus)target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}}};
  const finish=()=>{
    if(!active||finishing)return;finishing=true;stopTimer();video.pause();wasFocused=intro.contains(document.activeElement);
    if(!window.gsap||reduced.matches){release();return;}
    // Both layers already occupy their final positions; this is a compositor-only dissolve.
    gsap.set(header,{visibility:'visible',opacity:0,y:-14});
    gsap.timeline({onComplete:()=>{release();gsap.set([intro,header],{clearProps:'opacity,transform,visibility'});}})
      .to(intro,{opacity:0,duration:.85,ease:'power2.inOut'},0)
      .to(header,{opacity:1,y:0,duration:.8,ease:'power2.out'},.4);
  };
  const stalled=()=>{stopTimer();if(active&&!video.paused)watchdog=setTimeout(finish,7000);};
  const start=(manual=false)=>{
    if(active)return;returnFocus=manual?replay:null;active=true;finishing=false;intro.hidden=false;root.classList.remove('intro-pending');root.classList.add('intro-active');inert(true);window.siteScroller?.stop();
    const source='/assets/intro-landscape-v5.mp4';
    video.muted=true;video.defaultMuted=true;video.playsInline=true;
    if(video.getAttribute('src')!==source){video.poster='/assets/intro-landscape-poster-v5.jpg';video.src=source;video.load();}
    video.currentTime=0;sync();toggle.textContent='Pause film';
    if(manual)toggle.focus({preventScroll:true});
    watchdog=setTimeout(finish,7000);
    video.play().catch(()=>{stopTimer();cancelFrame();toggle.textContent='Play film';});
  };
  toggle.addEventListener('click',()=>{if(video.paused){video.play().catch(()=>{toggle.textContent='Play film';});}else video.pause();});
  skip.addEventListener('click',finish);replay?.addEventListener('click',()=>start(true));
  video.addEventListener('ended',finish);video.addEventListener('error',finish);
  video.addEventListener('playing',()=>{stopTimer();toggle.textContent='Pause film';animate();});
  video.addEventListener('pause',()=>{stopTimer();cancelFrame();toggle.textContent='Play film';});
  video.addEventListener('waiting',stalled);video.addEventListener('stalled',stalled);
  video.addEventListener('timeupdate',sync);
  video.addEventListener('seeked',sync);
  document.addEventListener('keydown',e=>{if(!active)return;if(e.key==='Escape'){e.preventDefault();finish();}if(e.key==='Tab'){const buttons=[toggle,skip];if(e.shiftKey&&document.activeElement===buttons[0]){e.preventDefault();skip.focus();}else if(!e.shiftKey&&document.activeElement===buttons[1]){e.preventDefault();toggle.focus();}}});
  document.addEventListener('visibilitychange',()=>{if(!active||finishing)return;if(document.hidden){resumeOnVisible=!video.paused;video.pause();}else if(resumeOnVisible){resumeOnVisible=false;video.play().catch(()=>{toggle.textContent='Play film';});}});
  addEventListener('pagehide',release);addEventListener('pageshow',e=>{if(e.persisted)release();});
  reduced.addEventListener('change',()=>{if(reduced.matches)finish();});
  if(reduced.matches||navigator.connection?.saveData||location.hash||scrollY>20){root.classList.remove('intro-pending');}else start();
})();
