/* BrainRecycle bootstrap: stable Home header + isolated Dashboard menu emphasis. */
(function(){
  var CORE='https://cdn.jsdelivr.net/gh/maragon79/brainrecycle-demo@cd3ec7226160456d01e04dd531928d62b2ecc818/support.js';

  function decodedPath(){
    try{return decodeURIComponent(location.pathname||'');}catch(e){return location.pathname||'';}
  }
  function isHome(){
    var p=decodedPath();
    return /(?:Brain Recycle Home\.dc\.html|\/brainrecycle-demo\/?$|\/brainrecycle-demo\/index\.html$|\/index\.html$)/i.test(p);
  }
  function isDashboard(){
    return /Plant Dashboard\.dc\.html$/i.test(decodedPath());
  }

  function installMobileHeader(){
    if(!isHome() || !window.matchMedia('(max-width:760px)').matches) return;
    if(document.getElementById('br-mobile-fixed-nav')) return;
    var originalHeader=document.querySelector('header');
    if(!originalHeader){setTimeout(installMobileHeader,120);return;}
    var originalBar=originalHeader.querySelector(':scope > div');
    if(!originalBar){setTimeout(installMobileHeader,120);return;}
    var logo=originalBar.querySelector('img[alt="brainrecycle®"],img[src*="logo-light"]');

    var style=document.createElement('style');
    style.id='br-mobile-fixed-nav-style';
    style.textContent='@media(max-width:760px){'+
      'body{padding-top:72px!important;}'+
      'body header>div:first-child{visibility:hidden!important;}'+
      '#br-mobile-fixed-nav{position:fixed!important;top:0!important;left:0!important;right:0!important;height:72px!important;z-index:10000!important;background:#2c483d!important;display:flex!important;align-items:center!important;justify-content:space-between!important;padding:0 18px!important;border-bottom:1px solid rgba(255,255,255,.08)!important;box-shadow:0 4px 18px rgba(0,0,0,.14)!important;}'+
      '#br-mobile-fixed-nav .br-fixed-logo{display:flex!important;align-items:center!important;flex:0 0 auto!important;}'+
      '#br-mobile-fixed-nav .br-fixed-logo img{display:block!important;height:38px!important;width:auto!important;max-width:170px!important;object-fit:contain!important;}'+
      '#br-mobile-fixed-nav .br-fixed-actions{display:flex!important;align-items:center!important;gap:10px!important;margin-left:auto!important;}'+
      '#br-mobile-fixed-nav button{height:48px!important;border:1px solid rgba(255,255,255,.22)!important;border-radius:10px!important;background:transparent!important;color:#fff!important;font-family:var(--font-body,system-ui)!important;font-weight:600!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;}'+
      '#br-mobile-fixed-nav .br-fixed-lang{min-width:72px!important;padding:0 12px!important;font-size:16px!important;}'+
      '#br-mobile-fixed-nav .br-fixed-menu{width:58px!important;min-width:58px!important;padding:0!important;border:1px solid rgba(255,255,255,.28)!important;background:rgba(255,255,255,.08)!important;}'+
      '#br-mobile-fixed-nav .br-fixed-menu i{font-size:38px!important;line-height:1!important;color:#fff!important;}'+
      'body .mobile-menu-panel{position:fixed!important;top:72px!important;left:0!important;right:0!important;bottom:0!important;height:calc(100dvh - 72px)!important;z-index:9999!important;}'+
    '}';
    document.head.appendChild(style);

    var nav=document.createElement('div');nav.id='br-mobile-fixed-nav';
    var a=document.createElement('a');a.className='br-fixed-logo';a.href='Brain Recycle Home.dc.html';
    var img=document.createElement('img');img.src=logo?logo.getAttribute('src'):'assets/logo-light.png';img.alt='BrainRecycle';a.appendChild(img);
    var actions=document.createElement('div');actions.className='br-fixed-actions';
    var lang=document.createElement('button');lang.type='button';lang.className='br-fixed-lang';lang.textContent='🇬🇧 EN';
    lang.addEventListener('click',function(){var b=document.querySelector('header .header-actions button');if(b)b.click();lang.textContent=lang.textContent.indexOf('EN')!==-1?'🇪🇸 ES':'🇬🇧 EN';});
    var menu=document.createElement('button');menu.type='button';menu.className='br-fixed-menu';menu.setAttribute('aria-label','Abrir menú');menu.innerHTML='<i class="ti ti-menu-2"></i>';
    menu.addEventListener('click',function(){var b=document.querySelector('header .sm');if(b)b.click();});
    actions.appendChild(lang);actions.appendChild(menu);nav.appendChild(a);nav.appendChild(actions);document.body.appendChild(nav);
  }

  function emphasizeDashboardMenu(){
    if(!isDashboard() || !window.matchMedia('(max-width:760px)').matches) return true;
    var b=document.querySelector('.dash-mobile-menu-btn');
    if(!b)return false;
    if(b.dataset.brEmphasized==='1')return true;
    b.dataset.brEmphasized='1';
    b.style.cssText += ';display:flex!important;width:60px!important;height:60px!important;min-width:60px!important;flex:0 0 60px!important;align-items:center!important;justify-content:center!important;background:rgba(255,255,255,.18)!important;border:2px solid rgba(255,255,255,.55)!important;border-radius:14px!important;box-shadow:0 5px 16px rgba(0,0,0,.24)!important;padding:0!important;color:#fff!important;opacity:1!important;pointer-events:auto!important';
    var i=b.querySelector('i');if(i)i.style.cssText += ';font-size:40px!important;line-height:1!important;color:#fff!important;opacity:1!important';
    var h=b.closest('header');if(h)h.style.cssText += ';height:76px!important;min-height:76px!important;padding:0 12px!important;grid-template-columns:60px 1fr auto!important;align-items:center!important';
    return true;
  }

  function runAfterCore(){
    if(isHome()) installMobileHeader();
    if(isDashboard()){
      var tries=0;
      var t=setInterval(function(){tries++;if(emphasizeDashboardMenu()||tries>25)clearInterval(t);},120);
    }
  }

  var s=document.createElement('script');
  s.src=CORE;
  s.async=false;
  s.onload=function(){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(runAfterCore,0);},{once:true});else setTimeout(runAfterCore,0);};
  s.onerror=function(){console.error('BrainRecycle: no se pudo cargar el runtime estable');};
  document.head.appendChild(s);
})();
