export function initialMuted(preload:boolean,stored:string|null,defaultMuted:boolean){
  // iOS blocks the entire autoplaying video when a remembered unmuted state is
  // restored before a user gesture. A preloaded kiosk stream must therefore
  // start muted on every fresh page/app load.
  if(preload)return true;
  return stored===null?defaultMuted:stored==='true';
}

export function needsFreshVideoOnActivation(userAgent:string,platform='',touchPoints=0){
  return /iPad|iPhone|iPod/i.test(userAgent)||(platform==='MacIntel'&&touchPoints>1);
}

export function shouldRefreshVideoOnActivation(userAgent:string,platform:string,touchPoints:number,automaticAudio:boolean,manualActivation:boolean){
  return needsFreshVideoOnActivation(userAgent,platform,touchPoints)&&(manualActivation||!automaticAudio);
}

// The WebRTC card creates its video element asynchronously. iOS can take
// considerably longer than 300 ms after the app or screen wakes.
export const automaticAudioRetryDelays = [0,150,350,700,1200,2000] as const;

const unlockedMonitors=new Set<string>();
export function isAutomaticAudioUnlocked(id:string){return unlockedMonitors.has(id)}
export function unlockAutomaticAudio(id:string){unlockedMonitors.add(id)}
