(function(){
  var R = window.React;
  function TrustBadge(props){
    var status = (props && props.status) || 'verified';
    if(!R) return null;
    return R.createElement('div',{
      title:'Kiwa · '+status,
      style:{width:'32px',height:'32px',borderRadius:'50%',display:'flex',
        alignItems:'center',justifyContent:'center',
        background:'#cce6b1',color:'#2c483d',flexShrink:0}
    }, R.createElement('i',{className:'ti ti-shield-check',style:{fontSize:'16px'}}));
  }
  window.BrainRecycleDesignSystem_4ef5a7 = window.BrainRecycleDesignSystem_4ef5a7 || {};
  window.BrainRecycleDesignSystem_4ef5a7.TrustBadge = TrustBadge;

  /* Home-only repair from the preserved 21:34 baseline.
     The Home contains two legacy mobile CSS rules (76px and 72px)
     that cap the entire Jotform agent. The Servicios page, where the
     agent works correctly, does not contain them. Instead of resizing
     Jotform, remove only those two legacy rules from the live CSSOM. */
  try {
    var p = decodeURIComponent(window.location.pathname || '');
    var isHome = /(?:Brain Recycle Home\.dc\.html|\/brainrecycle-demo\/?$|\/brainrecycle-demo\/index\.html$|\/index\.html$)/i.test(p);
    if (!isHome) return;

    function isLegacyAgentRule(rule){
      if (!rule || !rule.selectorText || !rule.style) return false;
      var sel = String(rule.selectorText || '');
      var targetsAgent = sel.indexOf('jotform-agent-widget') >= 0 ||
                         sel.indexOf('jf-agent-widget') >= 0 ||
                         sel.indexOf('iframe[src*="jotform"]') >= 0 ||
                         sel.indexOf("iframe[src*='jotform']") >= 0;
      if (!targetsAgent) return false;
      var mw = String(rule.style.maxWidth || '').replace(/\s/g,'').toLowerCase();
      var mh = String(rule.style.maxHeight || '').replace(/\s/g,'').toLowerCase();
      return mw === '72px' || mw === '76px' || mh === '72px' || mh === '76px';
    }

    function stripFromRuleList(ruleList){
      if (!ruleList) return 0;
      var removed = 0;
      for (var i = ruleList.length - 1; i >= 0; i--){
        var r = ruleList[i];
        if (isLegacyAgentRule(r)) {
          try { ruleList.deleteRule(i); removed++; } catch(e) {}
          continue;
        }
        if (r && r.cssRules) removed += stripFromRuleList(r.cssRules);
      }
      return removed;
    }

    function stripLegacyCaps(){
      var total = 0;
      var sheets = document.styleSheets || [];
      for (var i = 0; i < sheets.length; i++) {
        try { total += stripFromRuleList(sheets[i].cssRules); } catch(e) {}
      }
      return total;
    }

    function runRepair(){
      stripLegacyCaps();
      /* Safety net: if a legacy rule is re-created by the DC renderer,
         this wins without altering Jotform's own sizing logic. */
      var id = 'br-home-jotform-baseline-release';
      var st = document.getElementById(id);
      if (!st) {
        st = document.createElement('style');
        st.id = id;
        st.textContent = '@media(max-width:760px){html body .jotform-agent-widget,html body .jf-agent-widget,html body iframe[src*="jotform"]{max-width:initial!important;max-height:initial!important;}}';
        document.head.appendChild(st);
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runRepair, {once:true});
    } else {
      runRepair();
    }
    [0,50,150,350,700,1200,2000,3500].forEach(function(ms){ setTimeout(runRepair, ms); });
  } catch(e) {}
})();

/* Dashboard language bridge.
   The Home already persists the selected language in localStorage as br_lang.
   The dashboard did not read that value, so navigation via “Log in” returned
   to Spanish. This block is intentionally dashboard-only and leaves the
   preserved Home/Jotform behaviour untouched. */
(function(){
  try {
    var path = decodeURIComponent(window.location.pathname || '');
    if (!/Plant Dashboard\.dc\.html$/i.test(path)) return;
    var lang = 'es';
    try { lang = localStorage.getItem('br_lang') || 'es'; } catch(e) {}
    if (lang !== 'en') return;

    document.documentElement.lang = 'en';

    var exact = {
      'Panel':'Dashboard',
      'Operación en directo':'Live operation',
      'Mis casos de uso':'My use cases',
      'Trazabilidad':'Traceability',
      'Compliance':'Compliance',
      'Certificados':'Certificates',
      'Mi organización':'My organization',
      'Cerrar sesión':'Log out',
      'Entorno de prueba · Datos ficticios':'Test environment · Fictitious data',
      'Buenos días. Este es el estado de tu planta.':'Good morning. This is the status of your plant.',
      'Planta de biometano':'Biomethane plant',
      'Adherida al espacio de datos':'Connected to the data space',
      'Rendimiento actual':'Current performance',
      '96% del objetivo':'96% of target',
      'Dentro de tolerancia ±5%':'Within tolerance ±5%',
      'Intensidad GEI':'GHG intensity',
      'Ahorro GEI 83% vs fósil':'83% GHG savings vs fossil',
      'Residuos trazados':'Tracked waste',
      '1.284 lotes':'1,284 batches',
      '99,6% con evidencia completa':'99.6% with complete evidence',
      'Estado de compliance':'Compliance status',
      'Revisar':'Review',
      '2 bloqueos · 1 condicionada':'2 blocked · 1 conditional',
      '3 vigentes':'3 valid',
      'Conexión al espacio de datos':'Data space connection',
      'Activa':'Active',
      'Sync hace 4 min':'Synced 4 min ago',
      'Alertas':'Alerts',
      'Actividad reciente':'Recent activity',
      'Todo en orden. Tu planta opera dentro de los parámetros esperados.':'All good. Your plant is operating within the expected parameters.',
      'Alerta de inhibición':'Inhibition alert',
      'Metano al 51,8% frente al objetivo del 55,0% en el lote 851. Revisar mezcla de alimentación y relación AGV/alcalinidad.':'Methane at 51.8% versus the 55.0% target in batch 851. Review feed mix and VFA/alkalinity ratio.',
      'Ver detalle':'View details',
      'Alerta de compliance':'Compliance alert',
      'Aplicaciones previstas en ZA-01 y ZA-04 bloqueadas; ZA-02 requiere condiciones adicionales.':'Planned applications in ZA-01 and ZA-04 are blocked; ZA-02 requires additional conditions.',
      'Ver normativa aplicable':'View applicable regulations',
      'Entrada de residuo registrada':'Waste input registered',
      'Lote 852':'Batch 852',
      'Aplicación de digestato validada':'Digestate application validated',
      'Parcela ZA-02':'Plot ZA-02',
      'Verificación GEI emitida':'GHG verification issued',
      'ISO 14067 · periodo 2025':'ISO 14067 · 2025 period',
      'Sensor sincronizado':'Sensor synchronized',
      'Gasómetro principal':'Main gas holder',
      'hace 12 min':'12 min ago',
      'hace 1 h':'1 h ago',
      'ayer':'yesterday',
      'hace 4 min':'4 min ago',
      'Una jornada operativa de 16 horas, con 30 recepciones y 16 expediciones de digestato, comprimida en dos minutos.':'A 16-hour operating day, with 30 receipts and 16 digestate dispatches, compressed into two minutes.',
      'Reiniciar':'Reset',
      'Reproducir':'Play',
      'Pausar':'Pause',
      'Repetir jornada':'Replay day',
      'Parámetros SCADA':'SCADA parameters',
      'Metano en biogás (CH₄)':'Methane in biogas (CH₄)',
      'Caudal de biogás':'Biogas flow',
      'Temperatura digestor':'Digester temperature',
      'Nivel de gasómetro':'Gas holder level',
      'Control logístico y mezcla':'Logistics and mix control',
      'Tus casos de uso':'Your use cases',
      'Los servicios que tienes activos y los que puedes incorporar.':'The services you have active and those you can add.',
      'Activo':'Active',
      'En desarrollo':'In development',
      'Disponible':'Available',
      'Solicitado':'Requested',
      'Cálculo de la huella de carbono':'Carbon footprint calculation',
      'El dato que más interesa al gasista, convertido en activo certificable.':'The data point gas buyers care about most, turned into a certifiable asset.',
      'Trazabilidad completa':'End-to-end traceability',
      'Del productor al campo, sin puntos ciegos.':'From producer to field, with no blind spots.',
      'Integración y monitorización IoT':'IoT integration and monitoring',
      'Visibilidad total de tu planta, en tiempo real y con memoria.':'Full visibility of your plant, in real time and with historical context.',
      'Modelos predictivos · Gemelos digitales':'Predictive models · Digital twins',
      'Tu planta anticipa en lugar de reaccionar.':'Your plant anticipates instead of reacting.',
      'Inspección con drones':'Drone inspection',
      'Evidencia visual objetiva de lo que ocurre en el campo.':'Objective visual evidence of what is happening in the field.',
      'Buscar por lote, productor, transportista o parcela':'Search by batch, producer, carrier or plot',
      'Línea de vida del lote':'Batch lifecycle',
      'Mapa de parcelas':'Plot map',
      'Ruta de aplicación':'Application route',
      'Tus certificados acreditados':'Your accredited certificates',
      'Emitidos por Kiwa España sobre la trazabilidad de tu espacio de datos.':'Issued by Kiwa España based on the traceability of your data space.',
      'Solicitar nuevo certificado':'Request new certificate',
      'Descargar':'Download',
      'Verificar':'Verify',
      'Vigente':'Valid',
      'ISCC EU — Sostenibilidad y cadena de custodia':'ISCC EU — Sustainability and chain of custody',
      'Materias primas, balance de masas, trazabilidad y ahorro GEI':'Raw materials, mass balance, traceability and GHG savings',
      'ISCC PLUS — Materias circulares y biogénicas':'ISCC PLUS — Circular and biogenic materials',
      'Cadena de custodia de materias primas alternativas y atributos circulares':'Chain of custody for alternative raw materials and circular attributes',
      'ISO 14067 — Huella de carbono de producto':'ISO 14067 — Product carbon footprint',
      'Huella del biometano, límites del sistema y verificación del inventario GEI':'Biomethane footprint, system boundaries and GHG inventory verification',
      'Activos monetizables':'Monetizable assets',
      'Garantías de origen':'Guarantees of origin',
      'Atributos de bajo carbono':'Low-carbon attributes',
      'Circularidad de nutrientes':'Nutrient circularity',
      'Usuarios y permisos':'Users and permissions',
      'Usuario':'User',
      'Rol':'Role',
      'Administrador':'Administrator',
      'Operador':'Operator',
      'Cómo funciona BrainRecycle':'How BrainRecycle works',
      'Español':'Spanish'
    };

    var partial = [
      [/\bPlanta de biometano\b/g,'Biomethane plant'],
      [/\bDatos ficticios\b/g,'Fictitious data'],
      [/\bEntorno de prueba\b/g,'Test environment'],
      [/\bLote\s+(\d+)\b/g,'Batch $1'],
      [/\bParcela\s+([A-Z]{2}-?\d+)\b/g,'Plot $1'],
      [/\bperiodo\s+(\d{4})\b/g,'$1 period'],
      [/\bhace\s+(\d+)\s+min\b/g,'$1 min ago'],
      [/\bhace\s+(\d+)\s+h\b/g,'$1 h ago'],
      [/\bvigentes\b/g,'valid'],
      [/\bvigente\b/g,'valid']
    ];

    function translateString(value){
      if (!value) return value;
      var lead = (value.match(/^\s*/) || [''])[0];
      var trail = (value.match(/\s*$/) || [''])[0];
      var core = value.trim();
      if (!core) return value;
      if (Object.prototype.hasOwnProperty.call(exact, core)) core = exact[core];
      for (var i=0;i<partial.length;i++) core = core.replace(partial[i][0], partial[i][1]);
      return lead + core + trail;
    }

    function translateNode(root){
      if (!root) return;
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode:function(node){
          var p = node.parentElement;
          if (!p) return NodeFilter.FILTER_REJECT;
          var t = p.tagName;
          if (t === 'SCRIPT' || t === 'STYLE' || t === 'TEXTAREA' || t === 'CODE' || t === 'PRE') return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      var n;
      while ((n = walker.nextNode())) {
        var next = translateString(n.nodeValue);
        if (next !== n.nodeValue) n.nodeValue = next;
      }
      var els = root.querySelectorAll ? root.querySelectorAll('[placeholder],[title],[aria-label]') : [];
      for (var j=0;j<els.length;j++) {
        ['placeholder','title','aria-label'].forEach(function(attr){
          if (!els[j].hasAttribute(attr)) return;
          var v = els[j].getAttribute(attr);
          var tv = translateString(v);
          if (tv !== v) els[j].setAttribute(attr,tv);
        });
      }
    }

    function run(){
      translateNode(document.body);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, {once:true});
    else run();
    [0,80,180,400,800,1400,2400].forEach(function(ms){ setTimeout(run,ms); });
    document.addEventListener('click', function(){ setTimeout(run,0); setTimeout(run,120); setTimeout(run,350); }, true);
  } catch(e) {}
})();