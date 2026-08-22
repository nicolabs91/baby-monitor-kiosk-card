const prefix='baby-monitor-kiosk-card:';
export const deviceKey=(id:string)=>prefix+id;
export function isPaired(id:string){return localStorage.getItem(deviceKey(id))==='paired'}
export function pair(id:string){localStorage.setItem(deviceKey(id),'paired')}
export function unpair(id:string){localStorage.removeItem(deviceKey(id))}
export function audioKey(id:string){return prefix+id+':muted'}
