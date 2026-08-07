(function(){
  var R = window.React;
  function TrustBadge(props){
    var status = (props && props.status) || 'verified';
    if(!R) return null;
    return R.createElement('div',{
      title:'Kiwa · '+status,
      style:{width:'32px',height:'32px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',background:'#cce6b1',color:'#2c483d',flexShrink:0}
    }, R.createElement('i',{className:'ti ti-shield-check',style:{fontSize:'16px'}}));
  }
  window.BrainRecycleDesignSystem_4ef5a7 = window.BrainRecycleDesignSystem_4ef5a7 || {};
  window.BrainRecycleDesignSystem_4ef5a7.TrustBadge = TrustBadge;

  /* Preserve the validated Home/Jotform repair. */
  try {
    var p = decodeURIComponent(window.location.pathname || '');
    var isHome = /(?:Brain Recycle Home\.dc\.html|\/brainrecycle-demo\/?$|\/brainrecycle-demo\/index\.html$|\/index\.html$)/i.test(p);
    if (isHome) {
      function legacyRule(rule){
        if(!rule || !rule.selectorText || !rule.style) return false;
        var s=String(rule.selectorText||'');
        if(s.indexOf('jotform-agent-widget')<0 && s.indexOf('jf-agent-widget')<0 && s.indexOf('iframe[src*="jotform"]')<0 && s.indexOf("iframe[src*='jotform']")<0) return false;
        var mw=String(rule.style.maxWidth||'').replace(/\s/g,'').toLowerCase();
        var mh=String(rule.style.maxHeight||'').replace(/\s/g,'').toLowerCase();
        return mw==='72px'||mw==='76px'||mh==='72px'||mh==='76px';
      }
      function strip(list){
        if(!list) return;
        for(var i=list.length-1;i>=0;i--){
          var r=list[i];
          if(legacyRule(r)){ try{list.deleteRule(i);}catch(e){}; continue; }
          if(r && r.cssRules) strip(r.cssRules);
        }
      }
      function repairHome(){
        var sh=document.styleSheets||[];
        for(var i=0;i<sh.length;i++){try{strip(sh[i].cssRules);}catch(e){}}
        if(!document.getElementById('br-home-jotform-baseline-release')){
          var st=document.createElement('style');
          st.id='br-home-jotform-baseline-release';
          st.textContent='@media(max-width:760px){html body .jotform-agent-widget,html body .jf-agent-widget,html body iframe[src*="jotform"]{max-width:initial!important;max-height:initial!important;}}';
          document.head.appendChild(st);
        }
      }
      if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',repairHome,{once:true}); else repairHome();
      [0,50,150,350,700,1200,2000,3500].forEach(function(ms){setTimeout(repairHome,ms);});
    }
  } catch(e) {}

  /* Dashboard-only: persistent EN translation + coherent 40-day HRT example. */
  try {
    var path=decodeURIComponent(window.location.pathname||'');
    if(!/Plant Dashboard\.dc\.html$/i.test(path)) return;

    function lang(){try{return localStorage.getItem('br_lang')||'es';}catch(e){return'es';}}
    if(lang()==='en') document.documentElement.lang='en';

    var E={
      'Panel':'Dashboard','Operación en directo':'Live operation','Mis casos de uso':'My use cases','Trazabilidad':'Traceability','Certificados':'Certificates','Mi organización':'My organization','Cerrar sesión':'Log out',
      'Entorno de prueba · Datos ficticios':'Test environment · Fictitious data','Información únicamente ilustrativa.':'Illustrative information only.','Ver demostración':'View demo','Cómo funciona BrainRecycle':'How BrainRecycle works','Español':'Spanish',
      'Buenos días. Este es el estado de tu planta.':'Good morning. This is the status of your plant.','Planta de biometano':'Biomethane plant','Adherida al espacio de datos':'Connected to the data space',
      'Rendimiento actual':'Current performance','96% del objetivo':'96% of target','Dentro de tolerancia ±5%':'Within tolerance ±5%','Intensidad GEI':'GHG intensity','Ahorro GEI 83% vs fósil':'83% GHG savings vs fossil',
      'Residuos trazados':'Tracked waste','1.284 lotes':'1,284 batches','99,6% con evidencia completa':'99.6% with complete evidence','Estado de compliance':'Compliance status','Revisar':'Review','2 bloqueos · 1 condicionada':'2 blocked · 1 conditional',
      '3 vigentes':'3 valid','Conexión al espacio de datos':'Data space connection','Activa':'Active','Sync hace 4 min':'Synced 4 min ago','Alertas':'Alerts','Actividad reciente':'Recent activity',
      'Todo en orden. Tu planta opera dentro de los parámetros esperados.':'All good. Your plant is operating within the expected parameters.',
      'Alerta de inhibición':'Inhibition alert','Metano al 51,8% frente al objetivo del 55,0% en el lote 851. Revisar mezcla de alimentación y relación AGV/alcalinidad.':'Methane at 51.8% versus the 55.0% target in batch 851. Review feed mix and VFA/alkalinity ratio.','Ver detalle':'View details',
      'Alerta de compliance':'Compliance alert','Aplicaciones previstas en ZA-01 y ZA-04 bloqueadas; ZA-02 requiere condiciones adicionales.':'Planned applications in ZA-01 and ZA-04 are blocked; ZA-02 requires additional conditions.','Ver normativa aplicable':'View applicable regulations',
      'Entrada de residuo registrada':'Waste input registered','Lote 852':'Batch 852','Aplicación de digestato validada':'Digestate application validated','Parcela ZA-02':'Plot ZA-02','Verificación GEI emitida':'GHG verification issued','ISO 14067 · periodo 2025':'ISO 14067 · 2025 period','Sensor sincronizado':'Sensor synchronized','Gasómetro principal':'Main gas holder','hace 12 min':'12 min ago','hace 1 h':'1 h ago','ayer':'yesterday','hace 4 min':'4 min ago',
      'Una jornada operativa de 16 horas, con 30 recepciones y 16 expediciones de digestato, comprimida en dos minutos.':'A 16-hour operating day, with 30 receipts and 16 digestate dispatches, compressed into two minutes.','Reiniciar':'Reset','Reproducir':'Play','Pausar':'Pause','Repetir jornada':'Replay day','Parámetros SCADA':'SCADA parameters','Metano en biogás (CH₄)':'Methane in biogas (CH₄)','Caudal de biogás':'Biogas flow','Temperatura digestor':'Digester temperature','Nivel de gasómetro':'Gas holder level','Control logístico y mezcla':'Logistics and mix control',
      'Tus casos de uso':'Your use cases','Los servicios que tienes activos y los que puedes incorporar.':'The services you have active and those you can add.','Activo':'Active','En desarrollo':'In development','Disponible':'Available','Solicitado':'Requested',
      'Cálculo de la huella de carbono':'Carbon footprint calculation','El dato que más interesa al gasista, convertido en activo certificable.':'The data point gas buyers care about most, turned into a certifiable asset.','Trazabilidad completa':'End-to-end traceability','Del productor al campo, sin puntos ciegos.':'From producer to field, with no blind spots.','Integración y monitorización IoT':'IoT integration and monitoring','Visibilidad total de tu planta, en tiempo real y con memoria.':'Full visibility of your plant, in real time and with historical context.','Modelos predictivos · Gemelos digitales':'Predictive models · Digital twins','Tu planta anticipa en lugar de reaccionar.':'Your plant anticipates instead of reacting.','Inspección con drones':'Drone inspection','Evidencia visual objetiva de lo que ocurre en el campo.':'Objective visual evidence of what is happening in the field.','Emisión de certificados':'Certificate issuance','El respaldo Kiwa que da validez de mercado a cada afirmación.':'Kiwa assurance that gives each claim market validity.',
      'Buscar por lote, productor, transportista o parcela':'Search by batch, producer, carrier or plot','Línea de vida del lote':'Batch lifecycle','Mapa de parcelas':'Plot map','Ruta de aplicación':'Application route',
      'Origen':'Origin','Circuito regulatorio':'Regulatory circuit','Preaviso':'Pre-notification','Transporte':'Transport','Recepción y báscula':'Reception and weighbridge','Descarga':'Unloading','Alimentación':'Feeding','Digestión anaerobia':'Anaerobic digestion','Digestato':'Digestate','Vías de valorización':'Valorization routes','Campo / R10':'Field / R10','Administración':'Administration',
      'FECHA':'DATE','ACTOR':'ACTOR','RESIDUO / FLUJO':'WASTE / FLOW','VOLUMEN':'VOLUME','DOCUMENTO ASOCIADO':'ASSOCIATED DOCUMENT','Paquete de información asociado':'Associated information package','Regla / reutilización':'Rule / reuse','No son datos aislados':'These are not isolated data','Capturar una vez → estructurar → relacionar → validar → reutilizar.':'Capture once → structure → link → validate → reuse.','Datos sintéticos de demostración':'Synthetic demonstration data',
      'Explotación porcina · origen demo':'Demo pig farm · origin','Purín porcino':'Pig slurry','28,4 t previstas':'28.4 t expected','Origen + material':'Origin + material','Control documental':'Document control','Purín porcino · circuito aplicable':'Pig slurry · applicable circuit','SANDACH / documentación aplicable':'SANDACH / applicable documentation','Planificación logística':'Logistics planning','Entrada BR-0267':'BR-0267 inbound load','Preaviso de llegada':'Arrival pre-notification','Transportista demo':'Demo carrier','Purín porcino · BR-0267':'Pig slurry · BR-0267','Movimiento y transporte':'Movement and transport','Báscula 1 · recepción húmedos':'Weighbridge 1 · wet reception','28,4 t recibidas':'28.4 t received','Recepción + control':'Reception + control','Recepción líquidos · P-02':'Liquids reception · P-02','Purín porcino → tanque P-02':'Pig slurry → tank P-02','Destino interno':'Internal destination','Mezcla de alimentación · D-01':'Feed mix · D-01','Purín + estiércol + residuo agroalimentario + lodo demo':'Slurry + manure + agri-food waste + demo sludge','Ventana de alimentación':'Feeding window','Genealogía de alimentación':'Feed genealogy','Digestor continuo D-01':'Continuous digester D-01','Mezcla de sustratos':'Substrate mix','Ventana temporal':'Time window','Proceso + relación con entradas':'Process + relationship to inputs','Almacenamiento digestato':'Digestate storage','Digestato · corriente DG-2026-144':'Digestate · stream DG-2026-144','Stock asociado':'Associated stock','Digestato + caracterización':'Digestate + characterization','Motor de reglas · demostración':'Rules engine · demonstration','R10 / posible producto fertilizante UE':'R10 / potential EU fertilising product','Evaluación':'Assessment','Evaluación de posibles vías':'Assessment of potential routes','Parcela ZA-02 · planificación demo':'Plot ZA-02 · demo planning','Digestato para valorización agronómica':'Digestate for agronomic recovery','9,4 t demo':'9.4 t demo','Planificación + aplicación':'Planning + application','Evidencia regulatoria':'Regulatory evidence','Datos estructurados para circuitos aplicables':'Structured data for applicable regulatory routes','Expediente digital':'Digital file','Comunicación y evidencia regulatoria':'Regulatory communication and evidence',
      'Explotación de procedencia · identificación y localización · titular/origen · instalación · naturaleza del material · clasificación · cantidad prevista · fecha y destino previstos.':'Farm of origin · identification and location · holder/origin · facility · material nature · classification · expected quantity · expected date and destination.',
      'La naturaleza del material determina qué circuito documental y regulatorio debe evaluarse. No todos los materiales son residuos.':'The nature of the material determines which documentary and regulatory route must be assessed. Not all materials are waste.',
      'Identificación de origen y destino · operador · transportista · vehículo · referencias y documentación de acompañamiento · estado documental · evidencias.':'Origin and destination identification · operator · carrier · vehicle · references and accompanying documentation · documentary status · evidence.',
      'En este ejemplo se visualiza SANDACH cuando corresponde. No se presupone eSIR para todos los movimientos ni integración administrativa en producción.':'In this example SANDACH is shown where applicable. eSIR is not assumed for every movement, nor is production administrative integration assumed.',
      'Origen · material · cantidad prevista · transportista · cisterna/matrícula · ETA · slot · destino interno previsto · referencias documentales.':'Origin · material · expected quantity · carrier · tanker/registration · ETA · slot · expected internal destination · documentary references.',
      'Los mismos datos se reutilizan después en recepción, logística, trazabilidad y MRV.':'The same data are then reused in reception, logistics, traceability and MRV.',
      'Transportista · vehículo · cisterna · matrícula · origen · destino · salida · llegada prevista · distancia/ruta cuando esté disponible · incidencias · documentación.':'Carrier · vehicle · tanker · registration · origin · destination · departure · expected arrival · distance/route when available · incidents · documentation.',
      'Distancia, masa y tipo de transporte pueden reutilizarse en trazabilidad logística y huella de carbono/MRV.':'Distance, mass and transport type can be reused in logistics traceability and carbon footprint/MRV.',
      'Hora real · vehículo · documentación · peso bruto · tara · peso neto · báscula · material declarado/recibido · cantidad prevista/real · conformidad · incidencias · aceptación/rechazo · evidencias.':'Actual time · vehicle · documentation · gross weight · tare · net weight · weighbridge · declared/received material · expected/actual quantity · conformity · incidents · acceptance/rejection · evidence.',
      '“Ha llegado un camión” se convierte en un acontecimiento conectado con múltiples entidades y fuentes de evidencia.':'“A truck has arrived” becomes an event connected to multiple entities and evidence sources.',
      'Entrada · material · punto de descarga · foso/tanque · cantidad · fecha/hora · operador · muestra y analítica si procede · incidencias · stock/corriente asociada.':'Inbound load · material · unloading point · pit/tank · quantity · date/time · operator · sample and analysis if applicable · incidents · associated stock/stream.',
      'El destino interno conecta la recepción física con el inventario y la futura alimentación del proceso.':'The internal destination links physical reception to inventory and future process feeding.',
      'Purín porcino BR-0267 + estiércol + residuo agroalimentario + otra corriente + lodo de demostración. Para cada corriente: origen · naturaleza · clasificación · cantidad · fecha · documentación/evidencia.':'Pig slurry BR-0267 + manure + agri-food waste + another stream + demo sludge. For each stream: origin · nature · classification · quantity · date · documentation/evidence.',
      'Lo que entra en el digestor condiciona las posibles vías posteriores del digestato. Una corriente no admisible para una vía concreta puede restringir esa valorización.':'What enters the digester conditions the subsequent digestate routes. A stream that is not admissible for a specific route can restrict that recovery option.',
      'Histórico de alimentación · ventanas temporales · tiempos de residencia · variables de proceso · composición probable · contribuciones estimadas · analíticas y evidencias asociadas.':'Feeding history · time windows · residence times · process variables · probable composition · estimated contributions · analyses and associated evidence.',
      'Tras la mezcla en un reactor continuo no se afirma trazabilidad física exacta de cada lote. La relación se modeliza mediante históricos, ventanas temporales y tiempos de residencia.':'After mixing in a continuous reactor, exact physical traceability of each batch is not claimed. The relationship is modelled using histories, time windows and residence times.',
      'Producción · cantidad · fracción · stock · almacenamiento · caracterización · analíticas · genealogía de materias de entrada · proceso y evidencias.':'Production · quantity · fraction · stock · storage · characterization · analyses · input-material genealogy · process and evidence.',
      'Materias de entrada + proceso + analíticas + trazabilidad forman la cadena de evidencia para evaluar destinos posteriores.':'Input materials + process + analyses + traceability form the evidence chain used to assess subsequent destinations.',
      'R10: potencialmente disponible, sujeto a requisitos aplicables. Producto fertilizante UE: elegibilidad pendiente/condicionada por materias primas, proceso, analíticas y marco aplicable. El lodo demo ilustra una posible restricción, no una prohibición universal.':'R10: potentially available, subject to applicable requirements. EU fertilising product: eligibility pending/conditional on raw materials, process, analyses and applicable framework. The demo sludge illustrates a possible restriction, not a universal prohibition.',
      'CMC 5 no equivale por sí sola a producto fertilizante UE. La condición final requiere cumplir los requisitos y evaluación de conformidad que correspondan.':'CMC 5 alone is not equivalent to an EU fertilising product. Final status requires compliance with the applicable requirements and conformity assessment.',
      'Stock · SIGPAC · superficie · cultivo · necesidades nutricionales · restricciones · dosis · meteorología · logística · ventana de aplicación · cantidad expedida/aplicada · aplicador · parcela · evidencia · incidencias.':'Stock · SIGPAC · area · crop · nutrient needs · restrictions · dose · weather · logistics · application window · dispatched/applied quantity · applicator · plot · evidence · incidents.',
      'La trazabilidad continúa desde el almacenamiento hasta la parcela y la aplicación efectiva; la aptitud real depende de los requisitos aplicables.':'Traceability continues from storage to the plot and actual application; real suitability depends on the applicable requirements.',
      'Quién · qué · de dónde · cuánto · quién transportó · dónde se recibió · qué tratamiento tuvo · qué destino tuvo · dónde se aplicó. Circuitos posibles: SANDACH; residuos/eSIR o plataformas autonómicas; R10; fertilizante/evaluación de conformidad.':'Who · what · from where · how much · who transported it · where it was received · what treatment it underwent · what destination it had · where it was applied. Possible routes: SANDACH; waste/eSIR or regional platforms; R10; fertiliser/conformity assessment.',
      'Se diferencia dato preparado, documento generado, evidencia disponible, integración desarrollada y comunicación efectivamente realizada. La demo no afirma envío automático a la Administración.':'Prepared data, generated documents, available evidence, developed integration and actual communication are differentiated. The demo does not claim automatic submission to the Administration.',
      'Cumplimiento normativo, verificado antes de actuar':'Regulatory compliance, verified before action','Estado general: rojo · 2 bloqueos':'Overall status: red · 2 blocks','Normativa y criterio de cálculo':'Regulations and calculation criteria','TOPE ZVN DE REFERENCIA':'REFERENCE NVZ CAP','Aplicación permitida':'Application permitted','Aplicación condicionada':'Conditional application','Aplicación no permitida':'Application not permitted','PERMITIDA':'PERMITTED','CONDICIONADA':'CONDITIONAL','NO PERMITIDA':'NOT PERMITTED','Base legal':'Legal basis','Motivo':'Reason','Cultivo':'Crop','Periodo':'Period','Dosis':'Dose',
      'Tus certificados acreditados':'Your accredited certificates','Emitidos por Kiwa España sobre la trazabilidad de tu espacio de datos.':'Issued by Kiwa España based on the traceability of your data space.','Solicitar nuevo certificado':'Request new certificate','Descargar':'Download','Verificar':'Verify','Vigente':'Valid','Activos monetizables':'Monetizable assets','Garantías de origen':'Guarantees of origin','Atributos de bajo carbono':'Low-carbon attributes','Circularidad de nutrientes':'Nutrient circularity',
      'ISCC EU — Sostenibilidad y cadena de custodia':'ISCC EU — Sustainability and chain of custody','Materias primas, balance de masas, trazabilidad y ahorro GEI':'Raw materials, mass balance, traceability and GHG savings','ISCC PLUS — Materias circulares y biogénicas':'ISCC PLUS — Circular and biogenic materials','Cadena de custodia de materias primas alternativas y atributos circulares':'Chain of custody for alternative raw materials and circular attributes','ISO 14067 — Huella de carbono de producto':'ISO 14067 — Product carbon footprint','Huella del biometano, límites del sistema y verificación del inventario GEI':'Biomethane footprint, system boundaries and GHG inventory verification',
      'Usuarios y permisos':'Users and permissions','Usuario':'User','Rol':'Role','Administrador':'Administrator','Operador':'Operator','Plantas adheridas':'Connected plants','Servicios contratados':'Contracted services','Organización':'Organization'
    };

    var P=[
      [/\bPlanta de biometano\b/g,'Biomethane plant'],[/\bDatos ficticios\b/g,'Fictitious data'],[/\bEntorno de prueba\b/g,'Test environment'],[/\bLote\s+(\d+)\b/g,'Batch $1'],[/\bParcela\s+([A-Z]{2}-?\d+)\b/g,'Plot $1'],[/\bperiodo\s+(\d{4})\b/g,'$1 period'],[/\bhace\s+(\d+)\s+min\b/g,'$1 min ago'],[/\bhace\s+(\d+)\s+h\b/g,'$1 h ago'],[/\bvigentes\b/g,'valid'],[/\bvigente\b/g,'valid'],[/\b08 jul 2026\b/g,'08 Jul 2026'],[/\b17 ago 2026\b/g,'17 Aug 2026'],[/\b18 ago 2026\b/g,'18 Aug 2026'],[/\b08 jul\b/g,'08 Jul'],[/\b17 ago\b/g,'17 Aug'],[/\b18 ago\b/g,'18 Aug']
    ];

    function tr(s){
      if(!s) return s;
      var lead=(s.match(/^\s*/)||[''])[0],trail=(s.match(/\s*$/)||[''])[0],c=s.trim();
      if(!c) return s;
      if(Object.prototype.hasOwnProperty.call(E,c)) c=E[c];
      for(var i=0;i<P.length;i++) c=c.replace(P[i][0],P[i][1]);
      return lead+c+trail;
    }

    function translate(root){
      if(lang()!=='en'||!root) return;
      document.documentElement.lang='en';
      var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentElement;if(!p)return NodeFilter.FILTER_REJECT;var t=p.tagName;if(t==='SCRIPT'||t==='STYLE'||t==='TEXTAREA'||t==='CODE'||t==='PRE')return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT;}}),n;
      while((n=w.nextNode())){var x=tr(n.nodeValue);if(x!==n.nodeValue)n.nodeValue=x;}
      var a=root.querySelectorAll?root.querySelectorAll('[placeholder],[title],[aria-label]'):[];
      for(var j=0;j<a.length;j++)['placeholder','title','aria-label'].forEach(function(k){if(a[j].hasAttribute(k)){var v=a[j].getAttribute(k),x=tr(v);if(x!==v)a[j].setAttribute(k,x);}});
    }

    function replaceExact(root,map){
      if(!root) return;
      var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n;
      while((n=w.nextNode())){var c=(n.nodeValue||'').trim();if(map[c]){var lead=(n.nodeValue.match(/^\s*/)||[''])[0],trail=(n.nodeValue.match(/\s*$/)||[''])[0];n.nodeValue=lead+map[c]+trail;}}
    }

    function fixTRH(){
      var en=lang()==='en';
      var dateMap={
        '08 jul 2026 · 07:10':'17 ago 2026 · 06:25',
        '08 jul 2026 · 07:18':'17 ago 2026 · 07:18',
        '08 jul 2026 · 09:15':'18 ago 2026 · 09:15',
        '08 jul 2026 · 09:30':'18 ago 2026 · 09:30',
        '08 Jul 2026 · 07:10':'17 Aug 2026 · 06:25',
        '08 Jul 2026 · 07:18':'17 Aug 2026 · 07:18',
        '08 Jul 2026 · 09:15':'18 Aug 2026 · 09:15',
        '08 Jul 2026 · 09:30':'18 Aug 2026 · 09:30',
        'Stock asociado':'27,6 t eq. · balance demo',
        'Associated stock':'27.6 t eq. · demo balance',
        '9,4 t demo':'9,4 t aplicadas · 18,2 t en stock',
        '9.4 t demo':'9.4 t applied · 18.2 t in stock'
      };
      replaceExact(document.body,dateMap);

      var moments={
        'Alimentación':en?'08 Jul · 06:18':'08 jul · 06:18','Feeding':en?'08 Jul · 06:18':'08 jul · 06:18',
        'Digestión anaerobia':en?'08 Jul · 06:25 · HRT 40 days':'08 jul · 06:25 · TRH 40 días','Anaerobic digestion':en?'08 Jul · 06:25 · HRT 40 days':'08 jul · 06:25 · TRH 40 días',
        'Digestato':en?'17 Aug · 06:25':'17 ago · 06:25','Digestate':en?'17 Aug · 06:25':'17 ago · 06:25',
        'Vías de valorización':en?'17 Aug · 07:18':'17 ago · 07:18','Valorization routes':en?'17 Aug · 07:18':'17 ago · 07:18',
        'Campo / R10':en?'18 Aug · 09:15':'18 ago · 09:15','Field / R10':en?'18 Aug · 09:15':'18 ago · 09:15',
        'Administración':en?'18 Aug · 09:30':'18 ago · 09:30','Administration':en?'18 Aug · 09:30':'18 ago · 09:30'
      };
      var b=document.querySelectorAll('button');
      for(var i=0;i<b.length;i++){
        var sp=b[i].querySelectorAll('span');
        if(sp.length<2) continue;
        var lab=(sp[0].textContent||'').trim();
        if(moments[lab]) sp[1].textContent=moments[lab];
      }

      var note=document.getElementById('br-trh-40d-note');
      var lifecycle=null,buttons=document.querySelectorAll('button');
      for(var k=0;k<buttons.length;k++){var t=(buttons[k].textContent||'').trim();if(t==='Línea de vida del lote'||t==='Batch lifecycle'){lifecycle=buttons[k];break;}}
      if(lifecycle){
        if(!note){
          note=document.createElement('div');note.id='br-trh-40d-note';
          note.style.cssText='background:#e7f0dd;border:1px solid #d3d9d1;border-radius:10px;padding:12px 14px;font-size:12.5px;line-height:1.5;color:#48564f;max-width:100%;';
          var tabs=lifecycle.parentElement;
          if(tabs&&tabs.parentElement) tabs.insertAdjacentElement('afterend',note);
        }
        if(note) note.innerHTML=en?'<strong style="color:#1b2721">Demonstration time balance · Reference HRT: 40 days.</strong> Feeding contribution recorded on <strong>08 Jul 2026 · 06:18</strong> → temporally associated digestate output on <strong>17 Aug 2026 · 06:25</strong>. Demo balance: <strong>27.6 t equivalent digestate</strong>; <strong>9.4 t</strong> are allocated to plot ZA-02 and <strong>18.2 t</strong> remain in storage. In a continuous digester this is a time-window/mass-balance association, not exact physical batch tracking.':'<strong style="color:#1b2721">Ejemplo de balance temporal · TRH de referencia: 40 días.</strong> Contribución de alimentación registrada el <strong>08 jul 2026 · 06:18</strong> → salida de digestato temporalmente asociada el <strong>17 ago 2026 · 06:25</strong>. Balance demo: <strong>27,6 t equivalentes de digestato</strong>; <strong>9,4 t</strong> se asignan a la parcela ZA-02 y <strong>18,2 t</strong> permanecen en almacenamiento. En un digestor continuo esta asociación es por ventana temporal/balance de masas, no trazabilidad física exacta de un lote.';
      }
    }

    var busy=false,queued=false;
    function run(){
      if(busy) return; busy=true;
      try{fixTRH();translate(document.body);fixTRH();}catch(e){}
      busy=false;
    }
    function queue(){if(queued)return;queued=true;setTimeout(function(){queued=false;run();},20);}
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
    [0,80,180,400,800,1400,2400].forEach(function(ms){setTimeout(run,ms);});
    document.addEventListener('click',function(){setTimeout(run,0);setTimeout(run,120);setTimeout(run,350);},true);
    var obs=new MutationObserver(queue);
    function startObs(){if(document.body)obs.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label']});}
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startObs,{once:true});else startObs();
  } catch(e) {}
})();