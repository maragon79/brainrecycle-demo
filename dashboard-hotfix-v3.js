(function(){
  'use strict';
  var path='';
  try{path=decodeURIComponent(location.pathname||'');}catch(e){path=location.pathname||'';}
  if(!/Plant Dashboard\.dc\.html$/i.test(path)) return;

  function getLang(){try{return localStorage.getItem('br_lang')||'es';}catch(e){return'es';}}
  var EN=getLang()==='en';
  if(EN) document.documentElement.lang='en';

  /* This v3 patch is deliberately narrow: it keeps the existing dashboard,
     adds missing translations at runtime, keeps the horizontal trace hint,
     and integrates the 40-day HRT directly into the traceability sequence
     instead of displaying a separate explanatory card. */

  var E={
    'Panel':'Dashboard','Operación en directo':'Live operation','Mis casos de uso':'My use cases','Trazabilidad':'Traceability','Compliance':'Compliance','Certificados':'Certificates','Mi organización':'My organization','Cerrar sesión':'Log out',
    'Entorno de prueba · Datos ficticios':'Test environment · Fictitious data','Información únicamente ilustrativa.':'Illustrative information only.','Ver demostración':'View demo','Cómo funciona BrainRecycle':'How BrainRecycle works','Español':'Spanish',
    'Buenos días. Este es el estado de tu planta.':'Good morning. This is the status of your plant.','Planta de biometano':'Biomethane plant','Adherida al espacio de datos':'Connected to the data space',
    'Rendimiento actual':'Current performance','96% del objetivo':'96% of target','Dentro de tolerancia ±5%':'Within tolerance ±5%','Intensidad GEI':'GHG intensity','Ahorro GEI 83% vs fósil':'83% GHG savings vs fossil','Residuos trazados':'Tracked waste','1.284 lotes':'1,284 batches','99,6% con evidencia completa':'99.6% with complete evidence','Estado de compliance':'Compliance status','Revisar':'Review','2 bloqueos · 1 condicionada':'2 blocked · 1 conditional','3 vigentes':'3 valid','Conexión al espacio de datos':'Data space connection','Activa':'Active','Sync hace 4 min':'Synced 4 min ago','Alertas':'Alerts','Actividad reciente':'Recent activity',
    'Alerta de inhibición':'Inhibition alert','Ver detalle':'View details','Alerta de compliance':'Compliance alert','Ver normativa aplicable':'View applicable regulations','Entrada de residuo registrada':'Waste input registered','Lote 852':'Batch 852','Aplicación de digestato validada':'Digestate application validated','Parcela ZA-02':'Plot ZA-02','Verificación GEI emitida':'GHG verification issued','Sensor sincronizado':'Sensor synchronized','Gasómetro principal':'Main gas holder','hace 12 min':'12 min ago','hace 1 h':'1 h ago','ayer':'yesterday','hace 4 min':'4 min ago',
    'Reiniciar':'Reset','Reproducir':'Play','Pausar':'Pause','Repetir jornada':'Replay day','Parámetros SCADA':'SCADA parameters','Metano en biogás (CH₄)':'Methane in biogas (CH₄)','Caudal de biogás':'Biogas flow','Temperatura digestor':'Digester temperature','Nivel de gasómetro':'Gas holder level','Control logístico y mezcla':'Logistics and mix control',
    'Tus casos de uso':'Your use cases','Los servicios que tienes activos y los que puedes incorporar.':'The services you have active and those you can add.','Activo':'Active','En desarrollo':'In development','Disponible':'Available','Solicitado':'Requested','Quiero activar este caso de uso':'I want to activate this use case',
    'Cálculo de la huella de carbono':'Carbon footprint calculation','El dato que más interesa al gasista, convertido en activo certificable.':'The data point gas buyers care about most, turned into a certifiable asset.','Trazabilidad completa':'End-to-end traceability','Del productor al campo, sin puntos ciegos.':'From producer to field, with no blind spots.','Integración y monitorización IoT':'IoT integration and monitoring','Visibilidad total de tu planta, en tiempo real y con memoria.':'Full visibility of your plant, in real time and with historical context.','Modelos predictivos · Gemelos digitales':'Predictive models · Digital twins','Tu planta anticipa en lugar de reaccionar.':'Your plant anticipates instead of reacting.','Inspección con drones':'Drone inspection','Evidencia visual objetiva de lo que ocurre en el campo.':'Objective visual evidence of what is happening in the field.','Verificación y compliance normativo dinámico':'Dynamic regulatory compliance verification','El cumplimiento deja de ser una carga y pasa a ser automático.':'Compliance stops being a burden and becomes automatic.','Emisión de certificados':'Certificate issuance','El respaldo Kiwa que da validez de mercado a cada afirmación.':'Kiwa assurance that gives each claim market validity.',
    'Buscar por lote, productor, transportista o parcela':'Search by batch, producer, carrier or plot','Línea de vida del lote':'Batch lifecycle','Mapa de parcelas':'Plot map','Ruta de aplicación':'Application route',
    'Origen':'Origin','Circuito regulatorio':'Regulatory circuit','Preaviso':'Pre-notification','Transporte':'Transport','Recepción y báscula':'Reception and weighbridge','Descarga':'Unloading','Alimentación':'Feeding','Digestión anaerobia':'Anaerobic digestion','Digestato':'Digestate','Vías de valorización':'Valorization routes','Campo / R10':'Field / R10','Administración':'Administration',
    'FECHA':'DATE','ACTOR':'ACTOR','RESIDUO / FLUJO':'WASTE / FLOW','VOLUMEN':'VOLUME','DOCUMENTO ASOCIADO':'ASSOCIATED DOCUMENT','Paquete de información asociado':'Associated information package','Regla / reutilización':'Rule / reuse','No son datos aislados':'These are not isolated data','Capturar una vez → estructurar → relacionar → validar → reutilizar.':'Capture once → structure → link → validate → reuse.','Datos sintéticos de demostración':'Synthetic demonstration data',
    'Origen + material':'Origin + material','SANDACH / documentación aplicable':'SANDACH / applicable documentation','Preaviso de llegada':'Arrival pre-notification','Movimiento y transporte':'Movement and transport','Recepción + control':'Reception + control','Destino interno':'Internal destination','Genealogía de alimentación':'Feed genealogy','Proceso + relación con entradas':'Process + relationship to inputs','Digestato + caracterización':'Digestate + characterization','Evaluación de posibles vías':'Assessment of potential routes','Planificación + aplicación':'Planning + application','Comunicación y evidencia regulatoria':'Regulatory communication and evidence',
    'Explotación porcina · origen demo':'Demo pig farm · origin','Control documental':'Document control','Planificación logística':'Logistics planning','Transportista demo':'Demo carrier','Báscula 1 · recepción húmedos':'Weighbridge 1 · wet reception','Recepción líquidos · P-02':'Liquids reception · P-02','Mezcla de alimentación · D-01':'Feed mix · D-01','Digestor continuo D-01':'Continuous digester D-01','Almacenamiento digestato':'Digestate storage','Motor de reglas · demostración':'Rules engine · demonstration','Parcela ZA-02 · planificación demo':'Plot ZA-02 · demo planning','Evidencia regulatoria':'Regulatory evidence',
    'Purín porcino':'Pig slurry','Purín porcino · circuito aplicable':'Pig slurry · applicable circuit','Purín porcino · BR-0267':'Pig slurry · BR-0267','Purín porcino → tanque P-02':'Pig slurry → tank P-02','Purín + estiércol + residuo agroalimentario + lodo demo':'Slurry + manure + agri-food waste + demo sludge','Mezcla de sustratos':'Substrate mix','Digestato · corriente DG-2026-144':'Digestate · stream DG-2026-144','R10 / posible producto fertilizante UE':'R10 / potential EU fertilising product','Digestato para valorización agronómica':'Digestate for agronomic recovery','Datos estructurados para circuitos aplicables':'Structured data for applicable regulatory routes','Expediente digital':'Digital file','Evaluación':'Assessment',
    '28,4 t previstas':'28.4 t expected','28,4 t recibidas':'28.4 t received','28,4 t':'28.4 t','9,4 t demo':'9.4 t demo','Ventana de alimentación':'Feeding window','Ventana temporal':'Time window','Stock asociado':'Associated stock',
    'Cumplimiento normativo, verificado antes de actuar':'Regulatory compliance, verified before action','Estado general: rojo · 2 bloqueos':'Overall status: red · 2 blocks','Escenario sintético de demostración.':'Synthetic demonstration scenario.','Normativa y criterio de cálculo':'Regulations and calculation criteria','TOPE ZVN DE REFERENCIA':'REFERENCE NVZ LIMIT','Máximo de N procedente de estiércol en zona vulnerable. La dosis real es el menor valor entre este tope, la necesidad del cultivo, el plan de abonado y las restricciones autonómicas.':'Maximum N from manure in a vulnerable zone. The actual dose is the lowest value among this limit, crop requirement, the fertilisation plan and regional restrictions.','Aplicación permitida':'Application allowed','Aplicación condicionada':'Conditional application','Aplicación no permitida':'Application not allowed','PERMITIDA':'ALLOWED','CONDICIONADA':'CONDITIONAL','NO PERMITIDA':'NOT ALLOWED',
    'Tus certificados acreditados':'Your accredited certificates','Emitidos por Kiwa España sobre la trazabilidad de tu espacio de datos.':'Issued by Kiwa España based on the traceability of your data space.','Solicitar nuevo certificado':'Request new certificate','Descargar':'Download','Verificar':'Verify','Vigente':'Valid','Activos monetizables':'Monetizable assets','Garantías de origen':'Guarantees of origin','Atributos de bajo carbono':'Low-carbon attributes','Circularidad de nutrientes':'Nutrient circularity','Usuarios y permisos':'Users and permissions','Usuario':'User','Rol':'Role','Administrador':'Administrator','Operador':'Operator'
  };

  var LONG=[
    ['Una jornada operativa de 16 horas, con 30 recepciones y 16 expediciones de digestato, comprimida en dos minutos.','A 16-hour operating day, with 30 receipts and 16 digestate dispatches, compressed into two minutes.'],
    ['Metano al 51,8% frente al objetivo del 55,0% en el lote 851. Revisar mezcla de alimentación y relación AGV/alcalinidad.','Methane at 51.8% versus the 55.0% target in batch 851. Review feed mix and VFA/alkalinity ratio.'],
    ['Aplicaciones previstas en ZA-01 y ZA-04 bloqueadas; ZA-02 requiere condiciones adicionales.','Planned applications in ZA-01 and ZA-04 are blocked; ZA-02 requires additional conditions.'],
    ['Todo en orden. Tu planta opera dentro de los parámetros esperados.','All good. Your plant is operating within the expected parameters.'],
    ['La naturaleza del material determina qué circuito documental y regulatorio debe evaluarse. No todos los materiales son residuos.','The nature of the material determines which documentary and regulatory route must be assessed. Not all materials are waste.'],
    ['Los mismos datos se reutilizan después en recepción, logística, trazabilidad y MRV.','The same data are then reused in reception, logistics, traceability and MRV.'],
    ['El destino interno conecta la recepción física con el inventario y la futura alimentación del proceso.','The internal destination links physical reception to inventory and future process feeding.'],
    ['Lo que entra en el digestor condiciona las posibles vías posteriores del digestato. Una corriente no admisible para una vía concreta puede restringir esa valorización.','What enters the digester conditions the subsequent digestate routes. A stream not admissible for a specific route can restrict that recovery option.'],
    ['Tras la mezcla en un reactor continuo no se afirma trazabilidad física exacta de cada lote. La relación se modeliza mediante históricos, ventanas temporales y tiempos de residencia.','After mixing in a continuous reactor, exact physical traceability of each batch is not claimed. The relationship is modelled through historical data, time windows and residence times.'],
    ['Materias de entrada + proceso + analíticas + trazabilidad forman la cadena de evidencia para evaluar destinos posteriores.','Input materials + process + analyses + traceability form the evidence chain used to assess downstream destinations.'],
    ['CMC 5 no equivale por sí sola a producto fertilizante UE. La condición final requiere cumplir los requisitos y evaluación de conformidad que correspondan.','CMC 5 does not by itself mean an EU fertilising product. Final status requires compliance with the applicable requirements and conformity assessment.'],
    ['La trazabilidad continúa desde el almacenamiento hasta la parcela y la aplicación efectiva; la aptitud real depende de los requisitos aplicables.','Traceability continues from storage to the plot and actual application; actual suitability depends on the applicable requirements.'],
    ['Se diferencia dato preparado, documento generado, evidencia disponible, integración desarrollada y comunicación efectivamente realizada. La demo no afirma envío automático a la Administración.','Prepared data, generated documents, available evidence, developed integration and actual communication are distinguished. The demo does not claim automatic submission to the Administration.']
  ];

  function translateText(s){
    if(!EN||!s) return s;
    var lead=(s.match(/^\s*/)||[''])[0], trail=(s.match(/\s*$/)||[''])[0], core=s.trim();
    if(!core) return s;
    if(Object.prototype.hasOwnProperty.call(E,core)) core=E[core];
    for(var i=0;i<LONG.length;i++) core=core.split(LONG[i][0]).join(LONG[i][1]);
    core=core.replace(/\bhace\s+(\d+)\s+min\b/g,'$1 min ago').replace(/\bhace\s+(\d+)\s+h\b/g,'$1 h ago').replace(/\bLote\s+(\d+)\b/g,'Batch $1').replace(/\bParcela\s+([A-Z]{2}-?\d+)\b/g,'Plot $1');
    return lead+core+trail;
  }

  function translateTree(root){
    if(!EN||!root) return;
    if(root.nodeType===3){var x=translateText(root.nodeValue);if(x!==root.nodeValue)root.nodeValue=x;return;}
    var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentElement;if(!p)return NodeFilter.FILTER_REJECT;var t=p.tagName;if(t==='SCRIPT'||t==='STYLE'||t==='TEXTAREA'||t==='CODE'||t==='PRE')return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT;}}),n;
    while((n=walker.nextNode())){var v=translateText(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v;}
    if(root.querySelectorAll){var els=root.querySelectorAll('[placeholder],[title],[aria-label]');for(var j=0;j<els.length;j++){['placeholder','title','aria-label'].forEach(function(a){if(els[j].hasAttribute(a)){var v=els[j].getAttribute(a),tv=translateText(v);if(tv!==v)els[j].setAttribute(a,tv);}});}}
  }

  function text(el){return (el&&el.textContent||'').trim();}
  function findByText(tag,vals){var arr=document.querySelectorAll(tag),vv=Array.isArray(vals)?vals:[vals];for(var i=0;i<arr.length;i++){if(vv.indexOf(text(arr[i]))>=0)return arr[i];}return null;}

  function removeOldCard(){
    var old=document.getElementById('br-trh-40d-note');
    if(old) old.remove();
  }

  function patchTrace(){
    removeOldCard();
    var lifecycle=findByText('button',['Línea de vida del lote','Batch lifecycle']);
    if(!lifecycle) return;

    /* Keep the HRT inside the lifecycle itself. Before digestion the tracked
       material is the incoming slurry / feed contribution. From digestion
       onward the output is the digestate mixture, not the original slurry. */
    var buttons=document.querySelectorAll('button');
    var moments={
      'Alimentación':EN?'08 Jul · 06:18':'08 jul · 06:18','Feeding':EN?'08 Jul · 06:18':'08 jul · 06:18',
      'Digestión anaerobia':EN?'08 Jul · 06:25 · HRT 40 d':'08 jul · 06:25 · TRH 40 d','Anaerobic digestion':EN?'08 Jul · 06:25 · HRT 40 d':'08 jul · 06:25 · TRH 40 d',
      'Digestato':EN?'17 Aug · 06:25':'17 ago · 06:25','Digestate':EN?'17 Aug · 06:25':'17 ago · 06:25',
      'Vías de valorización':EN?'17 Aug · 07:18':'17 ago · 07:18','Valorization routes':EN?'17 Aug · 07:18':'17 ago · 07:18',
      'Campo / R10':EN?'18 Aug · 09:15':'18 ago · 09:15','Field / R10':EN?'18 Aug · 09:15':'18 ago · 09:15',
      'Administración':EN?'18 Aug · 09:30':'18 ago · 09:30','Administration':EN?'18 Aug · 09:30':'18 ago · 09:30'
    };
    for(var i=0;i<buttons.length;i++){
      var spans=buttons[i].querySelectorAll('span');
      if(spans.length<2) continue;
      var lab=text(spans[0]);
      if(moments[lab]) spans[1].textContent=moments[lab];
    }

    /* Correct the selected-node detail if React is still showing the original
       same-day digestate values. These replacements are deliberately limited
       to the traceability view. */
    var traceRoot=lifecycle.closest('div[style*="padding:32px"]') || lifecycle.parentElement && lifecycle.parentElement.parentElement || document.body;
    var replacements={
      '08 jul 2026 · 07:10':EN?'17 Aug 2026 · 06:25':'17 ago 2026 · 06:25',
      '08 jul 2026 · 07:18':EN?'17 Aug 2026 · 07:18':'17 ago 2026 · 07:18',
      '08 jul 2026 · 09:15':EN?'18 Aug 2026 · 09:15':'18 ago 2026 · 09:15',
      '08 jul 2026 · 09:30':EN?'18 Aug 2026 · 09:30':'18 ago 2026 · 09:30',
      'Purín porcino · circuito aplicable':EN?'Pig slurry · applicable circuit':'Purín porcino · circuito aplicable',
      'Mezcla de sustratos':EN?'Substrate mixture entering digestion':'Mezcla de sustratos en digestión',
      'Digestato · corriente DG-2026-144':EN?'Digestate mixture · stream DG-2026-144':'Mezcla de digestato · corriente DG-2026-144',
      'Stock asociado':EN?'Digestate stock':'Stock de digestato',
      'Digestato para valorización agronómica':EN?'Digestate for agronomic recovery':'Digestato para valorización agronómica'
    };
    var w=document.createTreeWalker(traceRoot,NodeFilter.SHOW_TEXT),tn;
    while((tn=w.nextNode())){
      var c=(tn.nodeValue||'').trim();
      if(Object.prototype.hasOwnProperty.call(replacements,c)){
        var l=(tn.nodeValue.match(/^\s*/)||[''])[0],r=(tn.nodeValue.match(/\s*$/)||[''])[0];
        tn.nodeValue=l+replacements[c]+r;
      }
    }

    /* Visible mobile affordance for the horizontally scrollable lifecycle. */
    var scroller=null,divs=traceRoot.querySelectorAll?traceRoot.querySelectorAll('div'):document.querySelectorAll('div');
    for(var d=0;d<divs.length;d++){
      var s=text(divs[d]);
      if((s.indexOf('Origen')>=0||s.indexOf('Origin')>=0)&&(s.indexOf('Digestión anaerobia')>=0||s.indexOf('Anaerobic digestion')>=0)&&divs[d].scrollWidth>divs[d].clientWidth+20){scroller=divs[d];break;}
    }
    if(scroller){
      scroller.style.overflowX='auto';
      scroller.style.webkitOverflowScrolling='touch';
      scroller.style.paddingBottom='12px';
      var hint=document.getElementById('br-trace-scroll-hint');
      if(!hint){
        hint=document.createElement('div');
        hint.id='br-trace-scroll-hint';
        hint.style.cssText='font-size:12px;font-weight:700;color:#3f685b;background:#eef5e7;border:1px solid #d3d9d1;border-radius:999px;padding:7px 12px;width:fit-content;max-width:100%;margin:0 0 8px 0';
        scroller.insertAdjacentElement('beforebegin',hint);
      }
      hint.textContent=EN?'Swipe right to view the full traceability →':'Desliza hacia la derecha para ver toda la trazabilidad →';
      var bar=document.getElementById('br-trace-scrollbar');
      if(!bar){
        bar=document.createElement('div');bar.id='br-trace-scrollbar';
        bar.style.cssText='height:8px;background:#dfe5dd;border-radius:999px;position:relative;margin-top:6px;overflow:hidden';
        bar.innerHTML='<div id="br-trace-scrollthumb" style="position:absolute;left:0;top:0;height:8px;background:#789083;border-radius:999px;min-width:44px"></div>';
        scroller.insertAdjacentElement('afterend',bar);
      }
      var thumb=document.getElementById('br-trace-scrollthumb');
      function upd(){if(!thumb)return;var ratio=Math.min(1,scroller.clientWidth/scroller.scrollWidth),tw=Math.max(44,bar.clientWidth*ratio),max=bar.clientWidth-tw,den=Math.max(1,scroller.scrollWidth-scroller.clientWidth),x=max*(scroller.scrollLeft/den);thumb.style.width=tw+'px';thumb.style.transform='translateX('+x+'px)';}
      if(!scroller.dataset.brScrollBound){scroller.dataset.brScrollBound='1';scroller.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd,{passive:true});}
      upd();
    }
  }

  var scheduled=false;
  function run(){scheduled=false;if(EN)translateTree(document.body);patchTrace();}
  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(run);}
  function boot(){run();var obs=new MutationObserver(schedule);obs.observe(document.body,{subtree:true,childList:true,characterData:true});document.addEventListener('click',function(){setTimeout(schedule,0);setTimeout(schedule,120);},true);[100,300,700,1200,2200].forEach(function(ms){setTimeout(schedule,ms);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
