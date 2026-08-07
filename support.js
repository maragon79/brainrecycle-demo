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

    var style=document.createElement('style');
    style.id='br-mobile-fixed-nav-style';
    style.textContent='@media(max-width:760px){'+
      'body{padding-top:72px!important;}'+
      'body header>div:first-child{visibility:hidden!important;}'+
      '#br-mobile-fixed-nav{position:fixed!important;top:0!important;left:0!important;right:0!important;height:72px!important;z-index:2147483647!important;background:#2c483d!important;display:flex!important;align-items:center!important;justify-content:space-between!important;padding:0 18px!important;border-bottom:1px solid rgba(255,255,255,.08)!important;box-shadow:0 4px 18px rgba(0,0,0,.14)!important;transform:none!important;contain:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;}'+
      '#br-mobile-fixed-nav .br-fixed-logo{display:flex!important;align-items:center!important;flex:0 0 auto!important;}'+
      '#br-mobile-fixed-nav .br-fixed-logo img{display:block!important;height:38px!important;width:auto!important;max-width:170px!important;object-fit:contain!important;}'+
      '#br-mobile-fixed-nav .br-fixed-actions{display:flex!important;align-items:center!important;gap:10px!important;margin-left:auto!important;}'+
      '#br-mobile-fixed-nav button{height:44px!important;min-width:58px!important;border:1px solid rgba(255,255,255,.22)!important;border-radius:8px!important;background:transparent!important;color:#fff!important;font-family:var(--font-body,system-ui)!important;font-weight:600!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;}'+
      '#br-mobile-fixed-nav .br-fixed-menu{min-width:48px!important;border:0!important;font-size:0!important;padding:0!important;}'+
      '#br-mobile-fixed-nav .br-fixed-menu i{font-size:32px!important;color:#fff!important;}'+
      'body .mobile-menu-panel{position:fixed!important;top:72px!important;left:0!important;right:0!important;bottom:0!important;height:calc(100dvh - 72px)!important;z-index:2147483646!important;}'+
      '#br-agent-close{position:fixed!important;top:84px!important;right:14px!important;z-index:2147483647!important;display:none!important;align-items:center!important;justify-content:center!important;width:48px!important;height:48px!important;border-radius:999px!important;border:2px solid rgba(44,72,61,.22)!important;background:#fff!important;color:#2c483d!important;font-size:34px!important;line-height:1!important;font-family:system-ui,-apple-system,sans-serif!important;font-weight:400!important;box-shadow:0 6px 22px rgba(0,0,0,.24)!important;cursor:pointer!important;}'+
      '#br-agent-close.br-visible{display:flex!important;}'+
    '}';
    document.head.appendChild(style);

    var nav=document.createElement('div');
    nav.id='br-mobile-fixed-nav';

    var a=document.createElement('a');
    a.className='br-fixed-logo';
    a.href='Brain Recycle Home.dc.html';
    var img=document.createElement('img');
    img.src=logo ? logo.getAttribute('src') : 'assets/logo-light.png';
    img.alt='BrainRecycle';
    a.appendChild(img);

    var actions=document.createElement('div');
    actions.className='br-fixed-actions';

    var lang=document.createElement('button');
    lang.type='button';
    lang.className='br-fixed-lang';
    lang.textContent='🇬🇧 EN';
    lang.addEventListener('click',function(){
      var b=document.querySelector('header .header-actions button');
      if(b)b.click();
      lang.textContent=lang.textContent.indexOf('EN')!==-1?'🇪🇸 ES':'🇬🇧 EN';
    });

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

    var close=document.createElement('button');
    close.id='br-agent-close';
    close.type='button';
    close.setAttribute('aria-label','Cerrar asistente');
    close.innerHTML='&times;';
    close.addEventListener('click',function(){
      try{sessionStorage.setItem('br-agent-close-scroll',String(window.scrollY||0));}catch(e){}
      location.reload();
    });
    document.body.appendChild(close);

    try{
      var saved=sessionStorage.getItem('br-agent-close-scroll');
      if(saved!==null){
        sessionStorage.removeItem('br-agent-close-scroll');
        setTimeout(function(){window.scrollTo(0,parseInt(saved,10)||0);},80);
      }
    }catch(e){}

    function agentLooksOpen(){
      var frames=document.querySelectorAll('iframe');
      for(var i=0;i<frames.length;i++){
        var f=frames[i],src=(f.getAttribute('src')||'').toLowerCase();
        if(src.indexOf('jotfor')===-1 && src.indexOf('jotform')===-1) continue;
        var r=f.getBoundingClientRect();
        if(r.width>260 && r.height>320) return true;
      }
      var nodes=document.querySelectorAll('[class*="jotform"],[class*="jf-agent"],[id*="jotform"],[id*="jf-agent"]');
      for(var j=0;j<nodes.length;j++){
        var rr=nodes[j].getBoundingClientRect();
        if(rr.width>260 && rr.height>320) return true;
      }
      return false;
    }

    var checks=0;
    var timer=setInterval(function(){
      checks++;
      close.classList.toggle('br-visible',agentLooksOpen());
      if(checks>240) clearInterval(timer);
    },500);
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
