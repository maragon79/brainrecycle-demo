(function(){
  'use strict';
  var R=window.React;
  function TrustBadge(props){
    var status=(props&&props.status)||'verified';
    if(!R)return null;
    return R.createElement('div',{title:'Kiwa · '+status,style:{width:'32px',height:'32px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',background:'#cce6b1',color:'#2c483d',flexShrink:0}},R.createElement('i',{className:'ti ti-shield-check',style:{fontSize:'16px'}}));
  }
  window.BrainRecycleDesignSystem_4ef5a7=window.BrainRecycleDesignSystem_4ef5a7||{};
  window.BrainRecycleDesignSystem_4ef5a7.TrustBadge=TrustBadge;

  try{
    var p='';try{p=decodeURIComponent(location.pathname||'');}catch(e){p=location.pathname||'';}
    var isHome=/(?:Brain Recycle Home\.dc\.html|\/brainrecycle-demo\/?$|\/brainrecycle-demo\/index\.html$|\/index\.html$)/i.test(p);
    if(isHome){
      function legacyRule(rule){
        if(!rule||!rule.selectorText||!rule.style)return false;
        var s=String(rule.selectorText||'');
        if(s.indexOf('jotform-agent-widget')<0&&s.indexOf('jf-agent-widget')<0&&s.indexOf('iframe[src*="jotform"]')<0&&s.indexOf("iframe[src*='jotform']")<0)return false;
        var mw=String(rule.style.maxWidth||'').replace(/\s/g,'').toLowerCase();
        var mh=String(rule.style.maxHeight||'').replace(/\s/g,'').toLowerCase();
        return mw==='72px'||mw==='76px'||mh==='72px'||mh==='76px';
      }
      function strip(list){
        if(!list)return;
        for(var i=list.length-1;i>=0;i--){var r=list[i];if(legacyRule(r)){try{list.deleteRule(i);}catch(e){}continue;}if(r&&r.cssRules)strip(r.cssRules);}
      }
      function repairHome(){
        var sh=document.styleSheets||[];for(var i=0;i<sh.length;i++){try{strip(sh[i].cssRules);}catch(e){}}
        if(!document.getElementById('br-home-jotform-baseline-release')){var st=document.createElement('style');st.id='br-home-jotform-baseline-release';st.textContent='@media(max-width:760px){html body .jotform-agent-widget,html body .jf-agent-widget,html body iframe[src*="jotform"]{max-width:initial!important;max-height:initial!important;}}';document.head.appendChild(st);}
      }
      if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',repairHome,{once:true});else repairHome();
      [0,50,150,350,700,1200,2000,3500].forEach(function(ms){setTimeout(repairHome,ms);});
    }

    if(/Plant Dashboard\.dc\.html$/i.test(p)&&!document.getElementById('br-dashboard-hotfix-v2')){
      var sc=document.createElement('script');sc.id='br-dashboard-hotfix-v2';sc.src='./dashboard-hotfix-v2.js?v=20260808-0128';sc.defer=true;document.head.appendChild(sc);
    }
  }catch(e){}
})();
