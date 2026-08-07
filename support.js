/* BrainRecycle bootstrap: carga runtime estable y aplica cabecera fija solo en Home móvil. */
(function(){
  var CORE='https://cdn.jsdelivr.net/gh/maragon79/brainrecycle-demo@cd3ec7226160456d01e04dd531928d62b2ecc818/support.js';
  function addSticky(){
    var path='';
    try{path=decodeURIComponent(location.pathname||'');}catch(e){path=location.pathname||'';}
    if(!(/(?:Brain Recycle Home\.dc\.html|\/brainrecycle-demo\/?$)/i.test(path))) return;
    if(document.getElementById('br-home-fixed-header-20260807')) return;
    var st=document.createElement('style');
    st.id='br-home-fixed-header-20260807';
    st.textContent='@media(max-width:760px){html,body{overflow-x:hidden!important}#dc-root{padding-top:72px!important}body header{position:fixed!important;top:0!important;left:0!important;right:0!important;width:100%!important;z-index:2147483000!important;background:var(--color-deep,#2c483d)!important;transform:none!important;box-shadow:0 1px 0 rgba(255,255,255,.08),0 8px 22px rgba(0,0,0,.14)!important}body header>div{height:72px!important;min-height:72px!important;position:relative!important;z-index:2147483001!important}body .mobile-menu-panel{position:fixed!important;top:72px!important;left:0!important;right:0!important;bottom:0!important;height:calc(100dvh - 72px)!important;z-index:2147483002!important}}';
    document.head.appendChild(st);
  }
  var s=document.createElement('script');
  s.src=CORE;
  s.async=false;
  s.onload=function(){
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',addSticky,{once:true});
    else addSticky();
  };
  s.onerror=function(){console.error('BrainRecycle: no se pudo cargar el runtime estable');};
  document.head.appendChild(s);
})();
