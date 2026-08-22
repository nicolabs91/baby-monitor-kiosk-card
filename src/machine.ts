import type {MachineState} from './types';
export type Event={type:'LOUD'}|{type:'QUIET'}|{type:'TRIGGER_ELAPSED'}|{type:'SILENCE_ELAPSED'}|{type:'MANUAL_OPEN'}|{type:'MANUAL_CLOSE'}|{type:'COOLDOWN_ELAPSED'};
export function transition(state:MachineState,event:Event):MachineState {
  if(event.type==='MANUAL_OPEN')return 'ACTIVE';
  switch(state){
    case 'IDLE': return event.type==='LOUD'?'SOUND_PENDING':state;
    case 'SOUND_PENDING': if(event.type==='QUIET')return 'IDLE'; if(event.type==='TRIGGER_ELAPSED')return 'ACTIVE'; return state;
    case 'ACTIVE': if(event.type==='QUIET')return 'SILENCE_TIMER'; if(event.type==='MANUAL_CLOSE')return 'MANUAL_COOLDOWN'; return state;
    case 'SILENCE_TIMER': if(event.type==='LOUD')return 'ACTIVE'; if(event.type==='SILENCE_ELAPSED')return 'IDLE'; if(event.type==='MANUAL_CLOSE')return 'MANUAL_COOLDOWN'; return state;
    case 'MANUAL_COOLDOWN': return event.type==='COOLDOWN_ELAPSED'?'IDLE':state;
  }
}
export class BabyMonitorMachine {
 state:MachineState='IDLE'; private timer?:number; private deadline=0; constructor(private triggerMs:number,private silenceMs:number,private cooldownMs:number,private changed:(s:MachineState)=>void){}
 dispatch(event:Event){const previous=this.state;const next=transition(previous,event);if(next===previous)return;this.clear();this.state=next;this.changed(next);let delay:number|undefined;if(next==='SOUND_PENDING')delay=this.triggerMs;if(next==='SILENCE_TIMER')delay=this.silenceMs;if(next==='MANUAL_COOLDOWN')delay=this.cooldownMs;if(delay!==undefined){this.deadline=Date.now()+delay;const done=next==='SOUND_PENDING'?'TRIGGER_ELAPSED':next==='SILENCE_TIMER'?'SILENCE_ELAPSED':'COOLDOWN_ELAPSED';this.timer=globalThis.setTimeout(()=>this.dispatch({type:done}),delay)}}
 remainingMs(){return Math.max(0,this.deadline-Date.now())} destroy(){this.clear()} private clear(){if(this.timer!==undefined)globalThis.clearTimeout(this.timer);this.timer=undefined;this.deadline=0}
}
