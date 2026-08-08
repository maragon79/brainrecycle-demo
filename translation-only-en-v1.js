(function(){
  'use strict';
  try{if((localStorage.getItem('br_lang')||'es')!=='en')return;}catch(e){return;}
  document.documentElement.lang='en';

  var E={
    'INTEGRAR':'INTEGRATE',
    'MEDIR':'MEASURE',
    'REPORTAR':'REPORT',
    'VERIFICAR':'VERIFY',
    'CERTIFICAR':'CERTIFY',
    'Todas tus fuentes, en un mismo espacio.':'All your data sources, in one place.',
    'Conectamos transporte, ESIR, sensores, consumos, digestato y parcelas sin sustituir tus sistemas actuales. Tu SCADA sigue siendo tu SCADA; el espacio de datos se conecta a él.':'We connect transport, eSIR, sensors, consumption data, digestate and plots without replacing your current systems. Your SCADA remains your SCADA; the data space connects to it.',
    'Indicadores calculados sobre dato trazado.':'Indicators calculated from traceable data.',
    'Rendimiento frente al teórico, huella de carbono, balance de nutrientes. Sin estimaciones ni extrapolaciones: cada cifra procede de un dato con origen identificado.':'Performance versus theoretical output, carbon footprint and nutrient balance. No estimates or extrapolations: every figure comes from data with an identified origin.',
    'Comunicaciones y planes que se alimentan solos.':'Reports and plans that update themselves.',
    'Memorias de residuos, declaraciones ambientales, PRTR, documentación agronómica del digestato y planes ambientales. Se redactan una vez y se actualizan con los datos que tu planta ya está generando.':'Waste reports, environmental declarations, PRTR, digestate agronomic documentation and environmental plans. They are drafted once and then updated using the data your plant is already generating.',
    'Cada dato con origen, autor y momento.':'Every data point with origin, author and timestamp.',
    'El cumplimiento normativo se comprueba antes de actuar, no después. Si una aplicación de digestato no está permitida en esa parcela y ese periodo, lo sabes antes de salir al campo.':'Regulatory compliance is checked before acting, not afterwards. If a digestate application is not permitted on that plot and during that period, you know before going to the field.',
    'Certificados con validez de mercado.':'Market-valid certificates.',
    'Kiwa, como tercera parte independiente y acreditada, emite certificados sostenidos por la trazabilidad del espacio de datos: trazabilidad de residuos, huella de carbono, digestato como fertilizante orgánico y garantías de origen.':'Kiwa, as an independent accredited third party, issues certificates supported by the traceability of the data space: waste traceability, carbon footprint, digestate as an organic fertiliser and guarantees of origin.',

    'Transporte':'Transport',
    'Albaranes y documentos de control en papel o PDF':'Delivery notes and control documents on paper or PDF',
    'ESIR y registros de residuos':'eSIR and waste records',
    'Plataforma administrativa, al margen de la operación':'Administrative platform, separate from operations',
    'IoT y sensores':'IoT and sensors',
    'SCADA de planta, sin memoria histórica explotable':'Plant SCADA, without usable historical data',
    'Consumos':'Consumption data',
    'Facturas y hojas de cálculo':'Invoices and spreadsheets',
    'Trazabilidad de lotes':'Batch traceability',
    'Registros dispersos entre báscula, laboratorio y producción':'Records scattered across weighbridge, laboratory and production',
    'Digestato':'Digestate',
    'Partes de salida y albaranes de aplicación':'Dispatch records and application delivery notes',
    'Parcelas y cultivos':'Plots and crops',
    'Conocimiento del agricultor, rara vez documentado':'Farmer knowledge, rarely documented',

    'Inspección':'Inspection',
    'INSPECCIÓN':'INSPECTION',
    'INSPECCIONAR · MANTENER':'INSPECT · MAINTAIN',
    'Qué inspecciona':'What it inspects',
    'Inspección técnica de la planta mediante drones, cámaras y sensores especializados para capturar evidencias de alta resolución, acceder a zonas complejas y documentar el estado de los activos. Las campañas periódicas permiten comparar la evolución de las instalaciones, localizar anomalías y orientar las actuaciones de mantenimiento.':'Technical inspection of the plant using drones, cameras and specialised sensors to capture high-resolution evidence, access complex areas and document asset condition. Periodic inspection campaigns make it possible to compare how facilities evolve over time, identify anomalies and guide maintenance actions.',
    'Depósitos, conducciones, cubiertas y estructuras':'Tanks, pipework, roofs and structures',
    'Zonas elevadas o de difícil acceso':'Elevated or hard-to-access areas',
    'Corrosión, grietas, deformaciones y deterioros superficiales':'Corrosion, cracks, deformation and surface deterioration',
    'Anomalías térmicas':'Thermal anomalies',
    'Indicios de fugas o emisiones, cuando se utilizan los sensores adecuados':'Signs of leaks or emissions when the appropriate sensors are used',
    'Cambios y evolución de defectos entre inspecciones':'Changes and evolution of defects between inspections',
    'Evidencias visuales georreferenciadas y de alta resolución':'Georeferenced, high-resolution visual evidence',
    'Hallazgos organizados por activo, ubicación y fecha':'Findings organised by asset, location and date',
    'Comparación entre campañas sucesivas':'Comparison between successive inspection campaigns',
    'Priorización de actuaciones según criticidad':'Prioritisation of actions according to criticality',
    'Informes técnicos trazables e historial de intervenciones':'Traceable technical reports and intervention history',
    'Información accionable para mantenimiento preventivo y predictivo':'Actionable information for preventive and predictive maintenance',

    'Parcelas disponibles':'Available plots',
    'Parcelas no disponibles':'Unavailable plots',
    'Recintos aptos para valorización':'Areas suitable for recovery',
    'Recintos excluidos o condicionados':'Excluded or conditional areas',
    'Caso de trazabilidad · Cisterna de purín porcino':'Traceability case · Pig slurry tanker',
    'Sigue una entrada concreta y descubre el paquete de información que se estructura, relaciona y reutiliza en cada etapa.':'Follow a specific inbound load and see the information package that is structured, linked and reused at each stage.',
    'FECHA':'DATE',
    'ACTOR':'ACTOR',
    'RESIDUO / FLUJO':'WASTE / STREAM',
    'VOLUMEN':'VOLUME',
    'DOCUMENTO ASOCIADO':'ASSOCIATED DOCUMENT',
    'PAQUETE DE INFORMACIÓN ASOCIADA':'ASSOCIATED INFORMATION PACKAGE',
    'Cada movimiento genera información':'Every movement generates information',
    'CADA MOVIMIENTO GENERA INFORMACIÓN':'EVERY MOVEMENT GENERATES INFORMATION',
    'Una sola entrada relaciona datos de origen, material, transporte, documentación, báscula, laboratorio, proceso y circuito regulatorio. BrainRecycle los normaliza, estructura y conecta para reutilizarlos durante todo el ciclo de vida.':'A single inbound record links origin, material, transport, documentation, weighbridge, laboratory, process and regulatory-route data. BrainRecycle normalises, structures and connects them so they can be reused throughout the entire lifecycle.',
    'origen':'origin',
    'material':'material',
    'cantidad':'quantity',
    'vehículo':'vehicle',
    'documentación':'documentation',
    'destino':'destination',
    'evidencia':'evidence',
    'ASN VALIDADOS':'VALIDATED ASNs',
    'CAMIONES RECEPCIONADOS':'TRUCKS RECEIVED',
    'CISTERNAS EXPEDIDAS':'TANKERS DISPATCHED',
    'Registro de actividad':'Activity log',
    'Plan diario':'Daily plan',
    'Plan diario liberado':'Daily plan released',
    'Mezcla':'Mix',
    'Flota digestato':'Digestate fleet',
    'Volumen expedido':'Dispatched volume',
    'Buscar por lote, productor, camión, parcela...':'Search by batch, producer, truck, plot...',

    'Control logístico y mezcla':'Logistics and mix control',
    'ASN conformes':'Compliant ASNs',
    'Ocupación de patio':'Yard occupancy',
    'Próximo slot':'Next slot',
    'Stock para mezcla':'Mix stock',
    'Cinco vehículos secuenciados en patio':'Five vehicles sequenced in the yard',
    'Accesos escalonados por lectura de matrícula. Ningún vehículo sin ASN validado entra a descarga.':'Staggered access based on licence-plate reading. No vehicle is admitted for unloading without a validated ASN.',
    'Segundo bloque de ASN validado':'Second ASN batch validated',
    '6 avisos adicionales conformes para las franjas de mañana. Se confirma secuenciación por muelle.':'6 additional compliant notices for the morning time windows. Bay sequencing is confirmed.',
    'Primer bloque de ASN validado':'First ASN batch validated',
    '6 avisos de expedición conformes para la franja 06:15–08:50. Carga, origen, ETA y muelle confirmados.':'6 compliant dispatch notices for the 06:15–08:50 window. Load, origin, ETA and bay confirmed.',
    'Tres vehículos en control de acceso':'Three vehicles at access control',
    'Lectura de matrícula y matching automático con ASN y slot. Ocupación de patio dentro de capacidad.':'Licence-plate reading and automatic matching with ASN and slot. Yard occupancy remains within capacity.',
    'Primer bloque de recepciones completado':'First receipts batch completed',
    '3 camiones · 54,7 t netas · purín, suero y subproducto vegetal · DI/eSIR y lote de recepción asociados.':'3 trucks · 54.7 t net · slurry, whey and plant by-product · associated DI/eSIR and receiving batch.',
    'Primeras cisternas de digestato expedidas':'First digestate tankers dispatched',
    '2 cisternas · 50,0 m³ · rutas y parcelas validadas · trazabilidad de aplicación abierta.':'2 tankers · 50.0 m³ · routes and plots validated · application traceability opened.',
    'Bloque de cinco recepciones completado':'Five-receipt batch completed',
    '5 camiones · 91,6 t netas · líneas líquida y sólida operando en paralelo.':'5 trucks · 91.6 t net · liquid and solid lines operating in parallel.',
    'Expedición de digestato':'Digestate dispatch',
    '2 cisternas · 50,0 m³ · salidas separadas 20 minutos para evitar cruce en báscula.':'2 tankers · 50.0 m³ · departures separated by 20 minutes to avoid crossing at the weighbridge.',
    'Tercer bloque de ASN validado':'Third ASN batch validated',
    '6 avisos conformes. Una llegada se ajusta 25 minutos para proteger la capacidad de patio.':'6 compliant notices. One arrival is adjusted by 25 minutes to protect yard capacity.',
    'Cinco vehículos admitidos por slot':'Five vehicles admitted by slot',
    'Matrículas y ETA dentro de tolerancia. Dos descargas líquidas y tres sólidas asignadas.':'Licence plates and ETAs within tolerance. Two liquid and three solid unloadings assigned.',
    'Cinco recepciones completadas':'Five receipts completed',
    '5 camiones · 92,1 t netas · muestras y documentos asociados a los lotes de entrada.':'5 trucks · 92.1 t net · samples and documents associated with inbound batches.',

    'PARCELA':'PLOT',
    'CULTIVO / SISTEMA':'CROP / SYSTEM',
    'Cebada de invierno':'Winter barley',
    'Regadío · digestato líquido':'Irrigated · liquid digestate',
    'Maíz grano':'Grain maize',
    'Regadío · aplicación localizada':'Irrigated · localised application',
    'Girasol':'Sunflower',
    'Secano · incorporación previa':'Rainfed · prior incorporation',
    'Olivar':'Olive grove',
    'Secano · banda localizada':'Rainfed · localised band application',

    'Explotación de procedencia · identificación y localización · titular/origen · instalación · naturaleza del material · clasificación · cantidad prevista · fecha y destino previstos.':'Source holding · identification and location · holder/origin · facility · nature of the material · classification · expected quantity · expected date and destination.',
    'La naturaleza del material determina qué circuito documental y regulatorio debe evaluarse. No todos los materiales son residuos.':'The nature of the material determines which documentary and regulatory route must be assessed. Not all materials are waste.',
    'Identificación de origen y destino · operador · transportista · vehículo · referencias y documentación de acompañamiento · estado documental · evidencias.':'Origin and destination identification · operator · carrier · vehicle · references and accompanying documentation · documentary status · evidence.',
    'En este ejemplo se visualiza SANDACH cuando corresponde. No se presupone eSIR para todos los movimientos ni integración administrativa en producción.':'In this example, SANDACH is shown where applicable. eSIR is not assumed for every movement, nor is administrative integration assumed to be in production.',
    'Origen · material · cantidad prevista · transportista · cisterna/matrícula · ETA · slot · destino interno previsto · referencias documentales.':'Origin · material · expected quantity · carrier · tanker/licence plate · ETA · slot · intended internal destination · documentary references.',
    'Los mismos datos se reutilizan después en recepción, logística, trazabilidad y MRV.':'The same data is subsequently reused in receiving, logistics, traceability and MRV.',
    'Transportista · vehículo · cisterna · matrícula · origen · destino · salida · llegada prevista · distancia/ruta cuando esté disponible · incidencias · documentación.':'Carrier · vehicle · tanker · licence plate · origin · destination · departure · expected arrival · distance/route when available · incidents · documentation.',
    'Distancia, masa y tipo de transporte pueden reutilizarse en trazabilidad logística y huella de carbono/MRV.':'Distance, mass and transport type can be reused in logistics traceability and carbon footprint/MRV.',
    'Hora real · vehículo · documentación · peso bruto · tara · peso neto · báscula · material declarado/recibido · cantidad prevista/real · conformidad · incidencias · aceptación/rechazo · evidencias.':'Actual time · vehicle · documentation · gross weight · tare · net weight · weighbridge · declared/received material · expected/actual quantity · conformity · incidents · acceptance/rejection · evidence.',
    '“Ha llegado un camión” se convierte en un acontecimiento conectado con múltiples entidades y fuentes de evidencia.':'“A truck has arrived” becomes an event connected to multiple entities and evidence sources.',
    'Entrada · material · punto de descarga · foso/tanque · cantidad · fecha/hora · operador · muestra y analítica si procede · incidencias · stock/corriente asociada.':'Inbound load · material · unloading point · pit/tank · quantity · date/time · operator · sample and analysis where applicable · incidents · associated stock/stream.',
    'El destino interno conecta la recepción física con el inventario y la futura alimentación del proceso.':'The internal destination connects physical receiving with inventory and future process feeding.',

    'MES':'MONTH',
    'LLUVIA':'RAINFALL',
    'BLOQ.':'BLOCK',
    'COND.':'COND.',
    'CRITERIO':'CRITERION',
    'POTENCIAL':'POTENTIAL',
    'LECTURA':'INTERPRETATION',
    'Ene':'Jan',
    'Feb':'Feb',
    'Mar':'Mar',
    'Abr':'Apr',
    'May':'May',
    'Jun':'Jun',
    'Jul':'Jul',
    'Ago':'Aug',
    'Sep':'Sep',
    'Oct':'Oct',
    'Nov':'Nov',
    'Dic':'Dec',

    'RD 1051/2022 — plan de abonado, registro de aportes, cálculo de necesidades, condiciones de aplicación y periodos de exclusión del Anexo II.':'RD 1051/2022 — fertilisation plan, application records, nutrient requirement calculations, application conditions and exclusion periods under Annex II.',
    'RD 47/2022 — programas de actuación en ZVN y límite general de 170 kg N/ha·año para estiércoles.':'RD 47/2022 — action programmes in NVZs and the general limit of 170 kg N/ha·year for manure.',
    'Programa autonómico ZVN — puede imponer dosis, calendarios, distancias o condiciones más restrictivas; debe parametrizarse con la ubicación real.':'Regional NVZ programme — may impose more restrictive rates, schedules, distances or conditions; it must be parameterised using the actual location.',
    'RD 506/2013 / Reglamento (UE) 2019/1009 — aplicables cuando el material se comercializa como producto fertilizante, sin sustituir las reglas de aplicación al suelo.':'RD 506/2013 / Regulation (EU) 2019/1009 — applicable when the material is marketed as a fertilising product, without replacing the rules governing application to soil.'
  };

  var P=[
    ['08 jul 2026','08 Jul 2026'],
    ['17 ago 2026','17 Aug 2026'],
    ['18 ago 2026','18 Aug 2026'],
    ['15 jul 2026','15 Jul 2026'],
    ['22 jul 2026','22 Jul 2026'],
    ['30 recepciones programadas','30 scheduled receipts'],
    ['16 expediciones de digestato','16 digestate dispatches'],
    ['2 muelles de recepción','2 receiving bays'],
    ['patio máximo: 5 vehículos','maximum yard occupancy: 5 vehicles'],
    ['Turno 06:00–22:00','Shift 06:00–22:00'],
    ['vehículos','vehicles'],
    ['Muelle','Bay'],
    ['días','days'],
    ['mín.','min.'],
    ['cisternas','tankers'],
    ['viajes/día','trips/day'],
    ['recepciones','receipts'],
    ['expediciones','dispatches'],
    ['camiones','trucks'],
    ['purín','slurry'],
    ['plan de abonado','fertilisation plan'],
    ['registro de aportes','application records'],
    ['cálculo de necesidades','nutrient requirement calculations'],
    ['condiciones de aplicación','application conditions'],
    ['periodos de exclusión','exclusion periods'],
    ['programas de actuación en ZVN','action programmes in NVZs'],
    ['límite general de 170 kg N/ha·año para estiércoles','general limit of 170 kg N/ha·year for manure'],
    ['Programa autonómico ZVN','Regional NVZ programme'],
    ['puede imponer dosis, calendarios, distancias o condiciones más restrictivas','may impose more restrictive rates, schedules, distances or conditions'],
    ['debe parametrizarse con la ubicación real','it must be parameterised using the actual location'],
    ['Reglamento (UE) 2019/1009','Regulation (EU) 2019/1009'],
    ['aplicables cuando el material se comercializa como producto fertilizante','applicable when the material is marketed as a fertilising product'],
    ['sin sustituir las reglas de aplicación al suelo','without replacing the rules governing application to soil']
  ];

  function tr(s){
    if(!s)return s;
    var m1=s.match(/^\s*/),m2=s.match(/\s*$/),lead=m1?m1[0]:'',trail=m2?m2[0]:'',core=s.trim();
    if(E[core])core=E[core];
    else{
      var compact=core.replace(/\s+/g,' ');
      if(E[compact])core=E[compact];
    }
    for(var i=0;i<P.length;i++)if(core.indexOf(P[i][0])!==-1)core=core.split(P[i][0]).join(P[i][1]);
    return lead+core+trail;
  }

  function scan(root){
    if(!root)return;
    var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
      var p=n.parentElement;if(!p)return NodeFilter.FILTER_REJECT;
      var t=p.tagName;if(t==='SCRIPT'||t==='STYLE'||t==='NOSCRIPT'||t==='TEXTAREA'||t==='OPTION')return NodeFilter.FILTER_REJECT;
      return n.nodeValue&&n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
    }});
    var nodes=[],n;while((n=w.nextNode()))nodes.push(n);
    for(var i=0;i<nodes.length;i++){var a=nodes[i].nodeValue,b=tr(a);if(b!==a)nodes[i].nodeValue=b;}
    var attrs=root.querySelectorAll?root.querySelectorAll('[placeholder],[title],[aria-label]'):[];
    for(var j=0;j<attrs.length;j++){
      var el=attrs[j],ks=['placeholder','title','aria-label'];
      for(var k=0;k<ks.length;k++)if(el.hasAttribute(ks[k])){var v=el.getAttribute(ks[k]),x=tr(v);if(x!==v)el.setAttribute(ks[k],x);}
    }
  }

  var queued=false,scrollTimer=0;
  function run(){queued=false;scan(document.body);}
  function schedule(ms){setTimeout(function(){if(queued)return;queued=true;requestAnimationFrame(run);},ms||0);}
  function onScroll(){
    clearTimeout(scrollTimer);
    scrollTimer=setTimeout(function(){schedule(0);},120);
  }
  function boot(){
    run();
    document.addEventListener('click',function(){schedule(20);schedule(180);schedule(500);},false);
    window.addEventListener('scroll',onScroll,{passive:true});
    document.addEventListener('scroll',onScroll,true);
    [100,350,800,1500,3000,5000,8000].forEach(schedule);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
