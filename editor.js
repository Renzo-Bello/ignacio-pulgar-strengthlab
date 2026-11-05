'use strict';
function renderEditor(){
 $('plan-fields').innerHTML=ROUTINE.map(d=>`<h3 class="editor-day">${escapeHTML(d.name)}</h3>${d.exercises.map(ex=>`<fieldset class="plan-exercise" data-plan-ex="${ex.id}"><legend>${escapeHTML(ex.name)}</legend><div class="plan-rirs">${setsFor(ex).map((_,i)=>`<label>Serie ${i+1}<select data-plan-rir="${i}" aria-label="${escapeHTML(ex.name)}, serie ${i+1}, RIR pautado">${rirOptions(ex.targetRir?.[i])}</select></label>`).join('')}</div><label class="video-label">Link de video referencial<input data-plan-video type="url" maxlength="2048" placeholder="https://www.youtube.com/watch?v=…" value="${escapeHTML(ex.video||'')}" aria-label="${escapeHTML(ex.name)}, video referencial"></label></fieldset>`).join('')}`).join('');
 $('plan-link-box').hidden=true;$('plan-status').textContent='';
}
function formPlan(){return Plan.validate({version:1,athlete:'ignacio-pulgar',exercises:[...$('plan-fields').querySelectorAll('[data-plan-ex]')].map(el=>({id:el.dataset.planEx,rir:[...el.querySelectorAll('[data-plan-rir]')].map(input=>input.value),video:el.querySelector('[data-plan-video]').value.trim()}))});}
function savePlan(plan){
 const next=structuredClone(state);next.coachPlan=Plan.validate(plan);
 if(!window.Cloud.save(next))throw Error('No se pudo guardar la pauta en este navegador.');
 state=next;Plan.apply(next.coachPlan);Plan.refreshEmptySessions(state);persist();render();
 $('plan-status').textContent='Pauta guardada. Comparte el enlace para que Ignacio reciba estos ajustes.';
}
function openEditor(){renderEditor();showTab('coach');}
 $('edit-plan').onclick=openEditor;$('close-editor').onclick=()=>showTab('registro');
 $('plan-form').onsubmit=e=>{e.preventDefault();try{savePlan(formPlan());$('plan-link-box').hidden=true;}catch(error){$('plan-status').textContent=error.message;}};
 $('share-plan').onclick=()=>{try{if(!$('plan-form').reportValidity())return;const plan=formPlan();savePlan(plan);const url=new URL(location.href);url.hash='plan='+Plan.encode(plan);$('plan-link').value=url.href;$('plan-link-box').hidden=false;$('plan-status').textContent='Enlace listo. Envíalo a Ignacio para aplicar la pauta en su dispositivo.';}catch(error){$('plan-status').textContent=error.message;}};
 $('copy-plan-link').onclick=async()=>{try{await navigator.clipboard.writeText($('plan-link').value);$('plan-status').textContent='Enlace copiado.';}catch{$('plan-link').focus();$('plan-link').select();$('plan-status').textContent='Selecciona y copia el enlace para compartirlo.';}};
 $('export-plan').onclick=()=>{try{if(!$('plan-form').reportValidity())return;download('ignacio-pulgar-pauta.json',JSON.stringify(formPlan(),null,2),'application/json');}catch(error){$('plan-status').textContent=error.message;}};
 $('import-plan').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;if(file.size>100000)throw Error('Archivo demasiado grande.');const plan=Plan.validate(JSON.parse(await file.text()));if(!confirm('¿Aplicar esta pauta de RIR y videos? Las sesiones registradas no se modifican.'))return;savePlan(plan);renderEditor();$('plan-status').textContent='Pauta importada y guardada.';}catch(error){$('plan-status').textContent=error.message;}finally{e.target.value='';}};
 if(window.planLoadMessage)toast(window.planLoadMessage);
