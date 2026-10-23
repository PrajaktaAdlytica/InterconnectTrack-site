import {AbsoluteFill,useVideoConfig,staticFile} from 'remotion';
import {TransitionSeries,linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {wipe} from '@remotion/transitions/wipe';
import {Opening} from './Opening';import {ProductScene} from './ProductScene';import {Ending} from './Ending';
export const Film=()=>{const{fps}=useVideoConfig();return <AbsoluteFill style={{fontFamily:'Manrope, sans-serif'}}><style>{`@font-face{font-family:Manrope;src:url('${staticFile('Manrope-Variable.ttf')}') format('truetype');font-weight:200 800}`}</style><TransitionSeries>
<TransitionSeries.Sequence durationInFrames={4*fps} premountFor={fps} name="Two real sites"><Opening/></TransitionSeries.Sequence>
<TransitionSeries.Transition presentation={wipe({direction:'from-left'})} timing={linearTiming({durationInFrames:fps/2})}/>
<TransitionSeries.Sequence durationInFrames={3.5*fps} premountFor={fps} name="Compare the evidence"><ProductScene screen="comparison" title="Two sites. Every unknown visible." kicker="01 / COMPARE SITE EVIDENCE"/></TransitionSeries.Sequence>
<TransitionSeries.Transition presentation={wipe({direction:'from-right'})} timing={linearTiming({durationInFrames:fps/2})}/>
<TransitionSeries.Sequence durationInFrames={4*fps} premountFor={fps} name="Trace a change"><ProductScene screen="timeline" title="A new date. The source stays." kicker="02 / TRACE WHAT CHANGED"/></TransitionSeries.Sequence>
<TransitionSeries.Transition presentation={wipe({direction:'from-bottom'})} timing={linearTiming({durationInFrames:fps/2})}/>
<TransitionSeries.Sequence durationInFrames={4*fps} premountFor={fps} name="Prepare the next review"><ProductScene screen="packet" title="One packet. A traceable record." kicker="03 / PREPARE THE EVIDENCE PACKET"/></TransitionSeries.Sequence>
<TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:fps/2})}/>
<TransitionSeries.Sequence durationInFrames={2.5*fps} premountFor={fps} name="Into the homepage"><Ending/></TransitionSeries.Sequence>
</TransitionSeries></AbsoluteFill>};
