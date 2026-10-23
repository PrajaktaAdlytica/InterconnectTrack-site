const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
// Exercise browser event paths with DOM stubs: no network or playback assumptions.
function scenario({reduce=false,saveData=false,hash='',playReject=false,width=1440,height=900}={}){
 const events={},classes=new Set(['intro-pending']),buttonEvents={},videoEvents={};
 const node=()=>({inert:false,setAttribute(){},focus(){},hidden:true,style:{},addEventListener(k,v){this.events??={};this.events[k]=v;}});
 const toggle=node(),skip=node(),progress=node(),replay=node(),header=node(),hero=node(),footer=node(),brand=node(),messages=[node(),node()];hero.querySelector=()=>node();
 const video={...node(),paused:true,src:'',getAttribute(){return this.src},duration:8,currentTime:0,load(){},play(){this.paused=false;return playReject?Promise.reject(Error('blocked')):Promise.resolve()},pause(){this.paused=true;this.events?.pause?.()}};
 const intro={...node(),querySelectorAll(){return messages},querySelector(s){return s==='video'?video:s==='.intro-brand'?brand:s.includes('toggle')?toggle:s.includes('skip')?skip:progress},contains(){return false}};
 const root={classList:{add(x){classes.add(x)},remove(...xs){xs.forEach(x=>classes.delete(x))},contains(x){return classes.has(x)}}};
 const document={documentElement:root,activeElement:null,querySelector:s=>s==='.site-header'?header:s==='.hero'?hero:s.includes('replay')?replay:footer,querySelectorAll:()=>[hero],getElementById:()=>intro,addEventListener(k,v){events[k]=v}};
 const context={document,window:{siteScroller:{start(){},stop(){}}},matchMedia:s=>({matches:s.includes('reduced')?reduce:false,addEventListener(){}}),navigator:{connection:{saveData}},location:{hash},scrollY:0,innerWidth:width,innerHeight:height,requestAnimationFrame(){return 2},cancelAnimationFrame(){},clearTimeout(){},setTimeout(){return 1},addEventListener(){}};
 vm.runInNewContext(fs.readFileSync(path.resolve(__dirname,'../intro.js'),'utf8'),context);
 return {intro,header,hero,video,toggle,skip,replay,classes,events,document,messages,brand,progress};
}
for(const opts of [{reduce:true},{saveData:true},{hash:'#packet'}]){let s=scenario(opts);assert(s.intro.hidden);assert(!s.classes.has('intro-pending'));assert(!s.video.src)}
for(const exit of ['ended','error']){let s=scenario();assert(!s.intro.hidden);assert(s.header.inert);s.video.events[exit]();assert(s.intro.hidden);assert(!s.header.inert);assert(!s.classes.has('intro-active'));}
let s=scenario();s.skip.events.click();assert(s.intro.hidden);s.replay.events.click();assert(!s.intro.hidden);s.events.keydown({key:'Escape',preventDefault(){}});assert(s.intro.hidden);
console.log('PASS: reduced motion, save-data, deep links, completion, media error, skip, replay, Escape release the page.');

for(const [width,height,variant] of [[390,844,'mobile'],[556,804,'tall'],[775,804,'square'],[1440,900,'desktop'],[1920,1080,'wide']]){
 const s=scenario({width,height});assert(s.video.src.endsWith('intro-landscape-v5.mp4')); assert(s.video.muted&&s.video.playsInline);
}
s=scenario();s.document.hidden=true;s.events.visibilitychange();assert(s.video.paused);s.document.hidden=false;s.events.visibilitychange();assert(!s.video.paused);
s.video.pause();s.document.hidden=true;s.events.visibilitychange();s.document.hidden=false;s.events.visibilitychange();assert(s.video.paused);
console.log('PASS: landscape film across five viewport sizes; muted inline playback; hidden-tab resume; intentional pause preserved.');

// The text follows the media clock, including jumps, replay, and pauses.
s=scenario();s.video.currentTime=1.5;s.video.events.timeupdate();assert.equal(s.messages[0].style.opacity,'1');assert.equal(s.messages[1].style.opacity,'0');
s.video.currentTime=5;s.video.events.timeupdate();assert.equal(s.messages[0].style.opacity,'0');assert.equal(s.messages[1].style.opacity,'1');
s.video.pause();assert.equal(s.messages[1].style.opacity,'1');s.video.currentTime=0;s.video.events.seeked();assert.equal(s.messages[0].style.opacity,'0');assert.equal(s.messages[1].style.opacity,'0');
console.log('PASS: overlays follow media time, pause and seek reset without timer drift.');
