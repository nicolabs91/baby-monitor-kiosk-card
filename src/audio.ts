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
