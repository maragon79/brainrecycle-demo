/* BrainRecycle bootstrap: runtime estable + cabecera móvil independiente fuera del root React. */
(function(){
  var CORE='https://cdn.jsdelivr.net/gh/maragon79/brainrecycle-demo@cd3ec7226160456d01e04dd531928d62b2ecc818/support.js';

  function isHome(){
    var p='';
    try{p=decodeURIComponent(location.pathname||'');}catch(e){p=location.pathname||'';}
    return /(?:Brain Recycle Home\.dc\.html|\/brainrecycle-demo\/?$|\/brainrecycle-demo\/index\.html$|\/index\.html$)/i.test(p);
  }

  function installMobileHeader(){
    if(!isHome() || !window.matchMedia('(max-width:760px)').matches) return;
    if(document.getElementById('br-mobile-fixed-nav')) return;

    var originalHeader=document.querySelector('header');
    if(!originalHeader){ setTimeout(installMobileHeader,120); return; }
    var originalBar=originalHeader.querySelector(':scope > div');
    if(!originalBar){ setTimeout(installMobileHeader,120); return; }

    var logo=originalBar.querySelector('img[alt="brainrecycle®"],img[src*="logo-light"]');
    var logoSrc=logo ? logo.getAttribute('src') : 'assets/logo-light.png';

    var style=document.createElement('style');
    style.id='br-mobile-fixed-nav-style';
    style.textContent='@media(max-width:760px){'+
      'body{padding-top:72px!important;}'+
      'body header>div:first-child{visibility:hidden!important;}'+
      '#br-mobile-fixed-nav{position:fixed!important;top:0!important;left:0!important;right:0!important;height:72px!important;z-index:2147483647!important;background:#2c483d!important;display:flex!important;align-items:center!important;justify-content:space-between!important;padding:0 18px!important;border-bottom:1px solid rgba(255,255,255,.08)!important;box-shadow:0 4px 18px rgba(0,0,0,.14)!important;}'+
      '#br-mobile-fixed-nav .br-fixed-logo,#br-agent-topbar .br-fixed-logo{display:flex!important;align-items:center!important;flex:0 0 auto!important;}'+
      '#br-mobile-fixed-nav .br-fixed-logo img,#br-agent-topbar .br-fixed-logo img{display:block!important;height:38px!important;width:auto!important;max-width:170px!important;object-fit:contain!important;}'+
      '#br-mobile-fixed-nav .br-fixed-actions,#br-agent-topbar .br-fixed-actions{display:flex!important;align-items:center!important;gap:10px!important;margin-left:auto!important;}'+
      '#br-mobile-fixed-nav button,#br-agent-topbar button{height:44px!important;min-width:58px!important;border:1px solid rgba(255,255,255,.22)!important;border-radius:8px!important;background:transparent!important;color:#fff!important;font-family:var(--font-body,system-ui)!important;font-weight:600!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;}'+
      '#br-mobile-fixed-nav .br-fixed-menu{min-width:48px!important;border:0!important;font-size:0!important;padding:0!important;}'+
      '#br-mobile-fixed-nav .br-fixed-menu i{font-size:32px!important;color:#fff!important;}'+
      'body .mobile-menu-panel{position:fixed!important;top:72px!important;left:0!important;right:0!important;bottom:0!important;height:calc(100dvh - 72px)!important;z-index:2147483646!important;}'+
      '#br-agent-topbar{position:fixed!important;top:0!important;left:0!important;right:0!important;height:72px!important;z-index:2147483647!important;background:#2c483d!important;display:flex!important;align-items:center!important;padding:0 18px!important;border-bottom:1px solid rgba(255,255,255,.08)!important;box-shadow:0 4px 18px rgba(0,0,0,.14)!important;}'+
      '#br-agent-topbar .br-agent-close{min-width:48px!important;width:48px!important;padding:0!important;font-size:30px!important;line-height:1!important;border-radius:10px!important;}'+
    '}';
    document.head.appendChild(style);

    function makeLangButton(){
      var lang=document.createElement('button');
      lang.type='button';
      lang.className='br-fixed-lang';
      lang.textContent='🇬🇧 EN';
      lang.addEventListener('click',function(){
        var b=document.querySelector('header .header-actions button');
        if(b)b.click();
        lang.textContent=lang.textContent.indexOf('EN')!==-1?'🇪🇸 ES':'🇬🇧 EN';
      });
      return lang;
    }

    var nav=document.createElement('div');
    nav.id='br-mobile-fixed-nav';
    var a=document.createElement('a');
    a.className='br-fixed-logo';
    a.href='Brain Recycle Home.dc.html';
    var img=document.createElement('img');
    img.src=logoSrc;
    img.alt='BrainRecycle';
    a.appendChild(img);
    var actions=document.createElement('div');
    actions.className='br-fixed-actions';
    var lang=makeLangButton();
    var menu=document.createElement('button');
    menu.type='button';
    menu.className='br-fixed-menu';
    menu.setAttribute('aria-label','Abrir menú');
    menu.innerHTML='<i class="ti ti-menu-2"></i>';
    menu.addEventListener('click',function(){
      var b=document.querySelector('header .sm');
      if(b)b.click();
    });
    actions.appendChild(lang);
    actions.appendChild(menu);
    nav.appendChild(a);
    nav.appendChild(actions);
    document.body.appendChild(nav);

    function getTopLayerHost(){
      var d=document.querySelector('dialog[open]');
      if(d) return d;
      try{
        var p=document.querySelector(':popover-open');
        if(p) return p;
      }catch(e){}
      return null;
    }

    function ensureAgentTopbar(){
      var host=getTopLayerHost();
      if(!host) return;
      if(host.querySelector && host.querySelector('#br-agent-topbar')) return;

      var bar=document.createElement('div');
      bar.id='br-agent-topbar';

      var brand=document.createElement('a');
      brand.className='br-fixed-logo';
      brand.href='Brain Recycle Home.dc.html';
      var bimg=document.createElement('img');
      bimg.src=logoSrc;
      bimg.alt='BrainRecycle';
      brand.appendChild(bimg);

      var right=document.createElement('div');
      right.className='br-fixed-actions';
      var l=makeLangButton();
      var close=document.createElement('button');
      close.type='button';
      close.className='br-agent-close';
      close.setAttribute('aria-label','Cerrar asistente');
      close.innerHTML='&times;';
      close.addEventListener('click',function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        try{
          if(typeof host.close==='function') host.close();
          else{
            host.removeAttribute('open');
            host.hidePopover && host.hidePopover();
          }
        }catch(e){
          try{host.remove();}catch(_e){}
        }
        try{bar.remove();}catch(e){}
      });

      right.appendChild(l);
      right.appendChild(close);
      bar.appendChild(brand);
      bar.appendChild(right);
      host.appendChild(bar);
    }

    /* Los paneles modales nativos (<dialog>/popover) viven en la top layer del navegador y
       siempre quedan por encima de cualquier z-index del body. Por eso replicamos la cabecera
       dentro de esa propia top layer cuando el agente se abre. */
    setInterval(ensureAgentTopbar,350);
  }

  var s=document.createElement('script');
  s.src=CORE;
  s.async=false;
  s.onload=function(){
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){setTimeout(installMobileHeader,0);},{once:true});
    else setTimeout(installMobileHeader,0);
  };
  s.onerror=function(){console.error('BrainRecycle: no se pudo cargar el runtime estable');};
  document.head.appendChild(s);
})();
