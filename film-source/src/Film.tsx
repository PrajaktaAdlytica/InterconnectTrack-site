import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';

const ink='#173e35', muted='#6c7d73', copper='#aa6e4b', paper='#f7f6f0', line='#d8ded4';
const ease=Easing.bezier(.22,1,.36,1);
export const Scene=({step}:{step:number})=>{
 const f=useCurrentFrame(),{width:w,height:h,fps}=useVideoConfig();
 const portrait=w/h<.9, compact=portrait&&w/h>.65, u=portrait?w/800:Math.min(w/900,h/850), p=w*.11;
 const enter=(delay=0)=>({opacity:interpolate(f,[delay,delay+fps*.45],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),translate:`0 ${interpolate(f,[delay,delay+fps*.7],[28*u,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease})}px`});
 const label={fontSize:19*u,letterSpacing:2*u,color:muted};
 const card={background:'#fffefa',border:`1px solid ${line}`,borderRadius:16*u,overflow:'hidden',boxShadow:'0 16px 40px #173e3508'};
 const titles=['Know what is missing.','See exactly what changed.','Keep the evidence connected.'];
 return <AbsoluteFill style={{background:step===1?'#e7ecdf':paper,color:ink,fontFamily:'Manrope, sans-serif'}}>
 <div style={{position:'absolute',left:p,right:p,top:h*.18,...enter()}}>
  <div style={label}>0{step+1} / {['COMPARE TWO SITES','TRACE THE SOURCE','PREPARE THE REVIEW'][step]}</div>
  <div style={{fontSize:(portrait?62:w/h<1.3?55:65)*u,letterSpacing:-2.5*u,lineHeight:1.08,marginTop:18*u,maxWidth:portrait?'100%':'95%'}}>{titles[step]}</div>
 </div>
 <div style={{position:'absolute',left:p,right:p,top:h*(portrait?.36:.38),bottom:h*.15,...enter(8)}}>
 {step===0&&<div style={{height:'100%',display:'grid',gridTemplateColumns:portrait?'1fr':'1fr 1fr',gridTemplateRows:portrait?'1fr 1fr':'1fr',gap:20*u}}>
 {['Cedar Junction','Mesa Reach'].map((name,i)=><div key={name} style={{...card,display:'flex',flexDirection:portrait?'row':'column',...enter(12+i*9)}}>
 <div style={{position:'relative',width:portrait?'34%':'100%',height:portrait?'100%':'48%',flexShrink:0,overflow:'hidden'}}><Img src={staticFile(i?'solar.jpg':'battery.jpg')} style={{width:'100%',height:'100%',objectFit:'cover'}}/><div style={{position:'absolute',inset:0,background:'linear-gradient(0deg,#173e3530,transparent)'}}/></div>
 <div style={{padding:24*u,flex:1,display:'flex',flexDirection:'column',justifyContent:'space-between',gap:15*u}}>
 <div><div style={{...label,fontSize:16*u}}>SYN-10{i+1} · {i?'SOLAR':'STORAGE'}</div><div style={{fontSize:34*u,letterSpacing:-.8*u,marginTop:10*u}}>{name}</div></div>
 <div><div style={{fontSize:18*u,color:muted,marginBottom:10*u}}>Study evidence</div><div style={{display:'inline-flex',alignItems:'center',gap:10*u,fontSize:23*u,color:copper,background:'#f0e9dd',padding:`${12*u}px ${15*u}px`,borderRadius:6*u}}><span style={{width:7*u,height:7*u,background:copper,borderRadius:'50%'}}/>{i?'Missing document':'Older summary'}</div></div>
 </div></div>)}
 </div>}
 {step===1&&<div style={{...card,height:'100%',padding:32*u,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
 <div style={{...label,display:'flex',justifyContent:'space-between',gap:10*u}}><span>SYN-101</span><span>EXPECTED STUDY DATE</span></div>
 <div style={{display:'flex',flexDirection:portrait?'column':'row',alignItems:portrait?'flex-start':'center',justifyContent:'space-between',gap:16*u}}>
 <div><div style={{fontSize:17*u,color:muted,marginBottom:10*u}}>05 OCT SNAPSHOT</div><div style={{fontSize:42*u,letterSpacing:-1*u}}>15 Dec 2026</div></div>
 <div style={{fontSize:44*u,color:copper}}>{portrait?'↓':'→'}</div>
 <div style={enter(20)}><div style={{fontSize:17*u,color:muted,marginBottom:10*u}}>19 OCT SNAPSHOT</div><div style={{fontSize:42*u,letterSpacing:-1*u,color:copper}}>12 Jan 2027</div></div>
 </div>
 <div style={{position:'relative',height:8*u,background:'#e5e9df',borderRadius:10*u,margin:'12px 0'}}><div style={{height:'100%',width:`${interpolate(f,[20,64],[25,80],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease})}%`,borderRadius:10*u,background:copper}}/><div style={{position:'absolute',left:'25%',top:-7*u,width:22*u,height:22*u,borderRadius:'50%',border:`3px solid ${ink}`,background:paper}}/></div>
 <div style={{display:'flex',justifyContent:'space-between',gap:15*u,borderTop:`1px solid ${line}`,paddingTop:20*u,fontSize:19*u,color:muted}}><span>Prior value retained</span><span style={{color:ink}}>Source row 14 ↗</span></div>
 </div>}
 {step===2&&<div style={{...card,height:'100%',display:'grid',gridTemplateColumns:portrait?'1fr':'35% 1fr',gridTemplateRows:portrait?'auto 1fr':'1fr'}}>
 <div style={{background:ink,color:paper,padding:28*u,display:'flex',flexDirection:portrait?'row':'column',justifyContent:'space-between',gap:16*u}}>
 {['Queue revision','Study summary','Open questions'].map((name,i)=><div key={name} style={enter(12+i*8)}><div style={{fontSize:15*u,color:'#b9c8ba',marginBottom:10*u}}>0{i+1} / SOURCE</div><div style={{fontSize:portrait?22*u:25*u,lineHeight:1.3}}>{name}</div></div>)}
 </div>
 <div style={{padding:(compact?20:30)*u,display:'flex',flexDirection:'column',justifyContent:'space-between',gap:16*u}}>
 <div><div style={{...label,fontSize:16*u}}>PREPARED FOR HUMAN REVIEW</div><div style={{fontSize:(compact?36:42)*u,letterSpacing:-1.5*u,lineHeight:1.1,marginTop:16*u}}>Project Evidence<br/>Packet</div></div>
 <div style={{fontSize:20*u,color:muted}}>{[['Projects','Cedar Junction + Mesa Reach'],['Snapshot','19 Oct 2026'],...(portrait?[['Status','Further evidence required']]:[])].map(([key,value],i)=><div key={key} style={{padding:`${portrait&&!compact?20*u:compact?8*u:12*u}px 0`,borderBottom:`1px solid ${line}`,display:portrait&&!compact?'block':'flex',justifyContent:'space-between',alignItems:'center',gap:16*u,...enter(18+i*6)}}><div style={{fontSize:16*u,marginBottom:portrait&&!compact?7*u:0}}>{key}</div><div style={{color:ink,fontSize:22*u}}>{value}</div></div>)}</div>
 <div style={{fontSize:23*u,color:copper,...enter(35)}}>One open assumption.<br/><span style={{fontSize:18*u,color:muted}}>Preserved for the next engineer review.</span></div>
 </div></div>}
 </div>
 <div style={{position:'absolute',left:p,bottom:h*.105,fontSize:16*u,color:muted,letterSpacing:1*u}}>ILLUSTRATIVE PRODUCT RECORDS · SYNTHETIC DATA</div>
 </AbsoluteFill>
};
export const Film=()=>{const{fps}=useVideoConfig();return <AbsoluteFill><style>{`@font-face{font-family:Manrope;src:url('${staticFile('Manrope-Variable.ttf')}');font-weight:200 800}`}</style><TransitionSeries>
 <TransitionSeries.Sequence durationInFrames={(128/30)*fps} premountFor={fps}><Scene step={0}/></TransitionSeries.Sequence>
 <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:fps*.4})}/>
 <TransitionSeries.Sequence durationInFrames={(128/30)*fps} premountFor={fps}><Scene step={1}/></TransitionSeries.Sequence>
 <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:fps*.4})}/>
 <TransitionSeries.Sequence durationInFrames={(128/30)*fps} premountFor={fps}><Scene step={2}/></TransitionSeries.Sequence>
 </TransitionSeries></AbsoluteFill>};
