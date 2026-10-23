/* Local GSAP 3.15.0 + ScrollTrigger and Lenis 1.3.27.
   Integration: https://github.com/darkroomengineering/lenis#gsap-scrolltrigger
   All reveals are reversible, based on scroll position, and progressive enhancements. */
(() => {
  if (!window.gsap || !window.ScrollTrigger || !window.Lenis) return;
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  const artifactParts = '.timeline,.evidence-entry,.ledger-item,.route-node,.scenario-table>div,.milestone-item,.packet-sheet,.source-doc .packet-row,.site-card,.mini-sites>div,.authority>div,.pilot-visual>div,.funding-details>div';
  const stages = [...document.querySelectorAll('main section, .story-notes article, .journey-panel, .site-footer')];
  const visible = el => el.getClientRects().length && getComputedStyle(el).display !== 'none';
  media.add({desktop:'(min-width: 700px) and (prefers-reduced-motion: no-preference)',mobile:'(max-width: 699px) and (prefers-reduced-motion: no-preference)'}, () => {
    document.documentElement.classList.add('gsap-motion');
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    const lenis = new Lenis({autoRaf:false,lerp:0.18,smoothWheel:true,syncTouch:false,
      anchors:{offset:-100},prevent:node=>!!node.closest('.mobile-nav,.mega,dialog,textarea,.table-scroll')});
    window.siteScroller = lenis;
    lenis.on('scroll',ScrollTrigger.update);
    const tick = time => lenis.raf(time * 1000);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
    const claimed = new Set();
    let count = 0;
    const reveal = (targets, trigger, direction, sequence = false) => {
      targets = targets.filter(el=>visible(el)&&!claimed.has(el));
      if (!targets.length) return;
      targets.forEach(el=>{claimed.add(el);el.dataset.motionItem='true'});
      // Initial hero and intake controls remain immediately usable.
      const aboveFold = trigger.getBoundingClientRect().top + scrollY < innerHeight * .65;
      const distance = innerWidth < 700 ? 28 : 76;
      gsap.set(targets,{x:(i)=>(aboveFold?0:direction * distance) * (sequence && i%2 ? -1 : 1),opacity:aboveFold?1:0});
      const exit = !sequence && !trigger.closest('.site-footer');
      const tl=gsap.timeline({scrollTrigger:{id:'section-reveal-'+count++,trigger,start:'clamp(top 94%)',end:exit?'clamp(bottom 8%)':'clamp(top 53%)',scrub:true,invalidateOnRefresh:true}});
      tl.to(targets,{x:0,opacity:1,ease:'none',stagger:sequence?.14:0,duration:1});
      if(exit){
        tl.to(targets,{x:0,opacity:1,duration:Math.max(2,trigger.offsetHeight/(innerHeight*.22)),ease:'none'});
        tl.to(targets,{x:-direction*distance*.65,opacity:0,duration:.7,ease:'none'});
      }
    };
    stages.forEach((section,index)=>{
      section.dataset.scrollScene='true';
      if(section.matches('.site-intro,.intake-hero,.access-page') || section.closest('.workbench-main') || section.matches('.journey-sticky .journey-panel')) return;
      const wrap=section.querySelector(':scope > .wrap') || section;
      const split=wrap.matches('.split,.faq-layout,.context-inner')?wrap:wrap.querySelector(':scope > .split');
      if(split){
        [...split.children].forEach((el,i)=>reveal([el],el,(i%2?1:-1)*(index%2?-1:1)));
      }else{
        [...wrap.children].forEach((el,i)=>{
          if(el.matches('.scroll-journey,.story-layout,.story-stage,.closing-landscape,.hero-art') || el.querySelector('.scroll-journey'))return;
          if(el.matches('.info-grid,.footer-top,.faq,.funding-details')) reveal([...el.children],el,index%2?1:-1,true);
          else reveal([el],el,(i%2?1:-1)*(index%2?-1:1));
        });
      }
    });
    // Diagrams build progressively as their own positions enter the viewport.
    document.querySelectorAll('.timeline-visual,.evidence-console,.packet-console,.flow-console,.scenario-console,.milestone-console,.compare-grid,.pilot-visual,.authority,.funding-details').forEach((diagram,i)=>{
      if(diagram.closest('.journey-sticky,.story-stage,.workbench-main') || !visible(diagram))return;
      reveal([...diagram.querySelectorAll(artifactParts)],diagram,i%2?1:-1,true);
      const bars=[...diagram.querySelectorAll('.gantt-bar,.ledger-line')];
      if(bars.length)gsap.fromTo(bars,{scaleX:0},{scaleX:1,transformOrigin:'left center',stagger:.12,ease:'none',scrollTrigger:{trigger:diagram,start:'clamp(top 88%)',end:'clamp(top 40%)',scrub:true}});
    });
    // Sticky chapter content enters from opposite sides; reverse direction on upward scroll.
    const chapter = e => {
      const {panel,direction}=e.detail;if(!panel || !visible(panel))return;
      const targets=[...panel.querySelectorAll('.journey-copy,.journey-art')];
      const parts=[...panel.querySelectorAll(artifactParts)];
      const sign=direction==='backward'?-1:1;
      gsap.killTweensOf([...targets,...parts]);
      gsap.fromTo(targets.length?targets:[panel.firstElementChild],{x:i=>(i%2?56:-56)*sign,opacity:0},{x:0,opacity:1,duration:.55,ease:'power2.out',stagger:.08,overwrite:true});
      gsap.fromTo(parts,{x:24*sign,opacity:0},{x:0,opacity:1,duration:.42,stagger:.07,delay:.12,ease:'power2.out',overwrite:true});
    };
    document.addEventListener('ict:chapter-change',chapter);
    const refresh = () => {lenis.resize();ScrollTrigger.refresh()};
    const onToggle = e => {if(e.target.matches('details')) refresh()};
    document.addEventListener('toggle',onToggle,true);
    const mode = e => {if(e.target.closest('.journey-mode,#all-states'))requestAnimationFrame(refresh)};
    document.addEventListener('click',mode);
    const menu = () => {if(document.body.classList.contains('menu-open') || document.documentElement.classList.contains('intro-active'))lenis.stop();else lenis.start()};
    const menuObserver=new MutationObserver(menu);menuObserver.observe(document.body,{attributes:true,attributeFilter:['class']});menuObserver.observe(document.documentElement,{attributes:true,attributeFilter:['class']});menu();
    document.fonts.ready.then(refresh);addEventListener('load',refresh,{once:true});refresh();
    return () => {document.documentElement.classList.remove('gsap-motion');document.removeEventListener('ict:chapter-change',chapter);document.removeEventListener('toggle',onToggle,true);document.removeEventListener('click',mode);removeEventListener('load',refresh);menuObserver.disconnect();gsap.ticker.remove(tick);lenis.destroy();delete window.siteScroller};
  });
})();
