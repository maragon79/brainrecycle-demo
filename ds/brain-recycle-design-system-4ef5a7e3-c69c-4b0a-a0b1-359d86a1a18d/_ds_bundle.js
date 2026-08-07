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

  /* 21:34 baseline hotfix: only Home had two mobile caps (76px/72px)
     that constrained the entire Jotform agent. Services does not have
     those caps and is the validated reference behaviour. */
  try {
    var p = decodeURIComponent(window.location.pathname || '');
    var isHome = /(?:Brain Recycle Home\.dc\.html|\/brainrecycle-demo\/?$|\/brainrecycle-demo\/index\.html$|\/index\.html$)/i.test(p);
    if (isHome) {
      var st = document.createElement('style');
      st.id = 'br-home-jotform-release-2134';
      st.textContent = '@media(max-width:760px){html body .jotform-agent-widget,html body .jf-agent-widget,html body iframe[src*="jotform"]{max-width:none!important;max-height:none!important;}}';
      document.head.appendChild(st);
    }
  } catch(e) {}
})();