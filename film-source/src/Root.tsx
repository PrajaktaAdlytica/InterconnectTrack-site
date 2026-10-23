import {Composition} from 'remotion';import {Film} from './Film';
export const RemotionRoot=()=> <>
<Composition id="Intro" component={Film} width={1500} height={1000} fps={30} durationInFrames={360}/>
<Composition id="IntroWide" component={Film} width={1920} height={984} fps={30} durationInFrames={360}/>
<Composition id="IntroSquare" component={Film} width={1200} height={1200} fps={30} durationInFrames={360}/>
<Composition id="IntroTall" component={Film} width={1050} height={1400} fps={30} durationInFrames={360}/>
<Composition id="IntroMobile" component={Film} width={900} height={1800} fps={30} durationInFrames={360}/>
</>;
