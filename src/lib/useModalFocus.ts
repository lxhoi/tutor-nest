import { useEffect, useRef } from 'react';
export function useModalFocus(open: boolean, onClose: () => void) {
 const ref=useRef<HTMLDivElement>(null);
 const close=useRef(onClose);close.current=onClose;
 useEffect(()=>{
  if(!open||!ref.current)return;
  const previous=document.activeElement as HTMLElement | null;
  const node=ref.current;
  const controls=()=>Array.from(node.querySelectorAll<HTMLElement>('button:not(:disabled),input,select,textarea,a[href],[tabindex="0"]')).filter(el=>el.getClientRects().length);
  (controls()[0]||node).focus();
  const key=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){event.preventDefault();close.current();}
   if(event.key==='Tab'){const list=controls();const first=list[0];const last=list.at(-1);if(!first){event.preventDefault();node.focus();return;}if(event.shiftKey&&(document.activeElement===first||document.activeElement===node)){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
  };
  node.addEventListener('keydown',key);
  return()=>{node.removeEventListener('keydown',key);previous?.focus();};
 },[open]);
 return ref;
}
