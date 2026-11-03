'use strict';
(() => {
 const key='strengthlab-ignacio-v1';
 const blank=()=>({version:1,athlete:'ignacio-pulgar',sessions:{},programStart:''});
 let initial=blank(),readError=false;
 try {const raw=localStorage.getItem(key);if(raw){initial=JSON.parse(raw);if(initial?.athlete!=='ignacio-pulgar'||initial.version!==1||!initial.sessions||Array.isArray(initial.sessions))throw Error('Formato inválido');}} catch {initial=blank();readError=true;}
 window.initialState=initial;
 const status=text=>{document.getElementById('save-status').textContent=text;};
 window.Cloud={
  save(next){try{localStorage.setItem(key,JSON.stringify(next));status('Guardado en este navegador');return true;}catch{status('No se pudo guardar. Descarga una copia desde Progreso antes de salir.');return false;}},
  async saveStart(value){const next={...state,programStart:value};return this.save(next);},
  applyRole(){},
  validateDay(plan){if(!plan||typeof plan.name!=='string'||typeof plan.subtitle!=='string'||!Array.isArray(plan.exercises)||plan.exercises.length>40)throw Error('Plan inválido');for(const ex of plan.exercises){if(!ex||typeof ex.name!=='string'||!/^[-a-z0-9]+$/.test(ex.id)||typeof ex.note!=='string'||(ex.image!==''&&!/^assets\/[-a-z0-9]+\.jpg$/.test(ex.image))||typeof ex.body!=='boolean'||!Array.isArray(ex.blocks)||ex.blocks.length>10)throw Error('Ejercicio inválido');for(const b of ex.blocks)if(!b||!['Main','Top set','Back off'].includes(b.type)||!Number.isInteger(b.sets)||b.sets<1||b.sets>20||typeof b.reps!=='string'||b.reps.length>80)throw Error('Series inválidas');}}
 };
 document.getElementById('show-guide').onclick=()=>document.getElementById('onboarding').showModal();
 document.getElementById('start-training').onclick=()=>document.getElementById('onboarding').close();
 window.addEventListener('DOMContentLoaded',()=>{if(readError)status('No se pudo recuperar el registro local. Importa una copia desde Progreso.');});
})();
