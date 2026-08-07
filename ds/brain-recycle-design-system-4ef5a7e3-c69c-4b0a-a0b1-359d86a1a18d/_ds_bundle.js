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