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
  // A long-lived, prewarmed iOS WebRTC decoder can continue receiving bytes
  // while rendering only black. Always rebuild it when the overlay activates;
  // Card.activateVideo starts the replacement muted and restores unlocked
  // audio only after its real video element is ready.
  return needsFreshVideoOnActivation(userAgent,platform,touchPoints);
}

// The WebRTC card creates its video element asynchronously. iOS can take
// considerably longer than 300 ms after the app or screen wakes.
export const automaticAudioRetryDelays = [0,150,350,700,1200,2000] as const;

export function applyMediaAudioState(video:any,muted:boolean){
  video.muted=muted;
  video.defaultMuted=muted;
  if(muted)video.setAttribute?.('muted','');
  else{
    video.removeAttribute?.('muted');
    video.volume=1;
    for(const track of video.srcObject?.getAudioTracks?.()??[])track.enabled=true;
  }
}

const unlockedMonitors=new Set<string>();
export function isAutomaticAudioUnlocked(id:string){return unlockedMonitors.has(id)}
export function unlockAutomaticAudio(id:string){unlockedMonitors.add(id)}
