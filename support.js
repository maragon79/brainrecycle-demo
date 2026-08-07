/* BrainRecycle bootstrap: reliable Home mobile header + persistent Dashboard fixes. */
(function(){
  'use strict';
  var CORE='https://cdn.jsdelivr.net/gh/maragon79/brainrecycle-demo@cd3ec7226160456d01e04dd531928d62b2ecc818/support.js';

  function decodedPath(){
    try{return decodeURIComponent(location.pathname||'');}catch(e){return location.pathname||'';}
  }
  function isHome(){
    var p=decodedPath();
    return /(?:Brain Recycle Home\.dc\.html|\/brainrecycle-demo\/?$|\/brainrecycle-demo\/index\.html$|\/index\.html$)/i.test(p);
  }

  function installPersistentMobileCSS(){
    if(!window.matchMedia('(max-width:760px)').matches) return;
    if(document.getElementById('br-persistent-mobile-fixes')) return;
    var st=document.createElement('style');
    st.id='br-persistent-mobile-fixes';
    st.textContent='@media(max-width:760px){'+
      /* Dashboard hamburger: keep the validated large control. */
      'html body x-dc .dash-mobile-menu-btn{display:flex!important;width:60px!important;height:60px!important;min-width:60px!important;max-width:60px!important;flex:0 0 60px!important;align-items:center!important;justify-content:center!important;background:rgba(255,255,255,.18)!important;border:2px solid rgba(255,255,255,.58)!important;border-radius:15px!important;box-shadow:0 5px 16px rgba(0,0,0,.24)!important;color:#fff!important;padding:0!important;cursor:pointer!important;}'+
      'html body x-dc .dash-mobile-menu-btn i{font-size:40px!important;line-height:1!important;color:#fff!important;}'+
      'html body x-dc > div.dash-shell > main.dash-main > header{height:76px!important;min-height:76px!important;padding:0 14px!important;}'+
    '}';
    document.head.appendChild(st);
  }

  function installHomeHeaderCSS(){
    if(!isHome() || !window.matchMedia('(max-width:760px)').matches) return;
    if(document.getElementById('br-home-original-header-fix')) return;
    var st=document.createElement('style');
    st.id='br-home-original-header-fix';
    st.textContent='@media(max-width:760px){'+
      'body{padding-top:72px!important;}'+
      /* Use the REAL header. Never hide it and never clone it. */
      'body header{position:fixed!important;top:0!important;left:0!important;right:0!important;width:100%!important;height:72px!important;z-index:12000!important;background:#2c483d!important;border-bottom:1px solid rgba(255,255,255,.08)!important;box-shadow:0 4px 18px rgba(0,0,0,.14)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;}'+
      'body header>div:first-child{visibility:visible!important;display:flex!important;height:72px!important;max-width:none!important;width:100%!important;padding:0 18px!important;align-items:center!important;gap:10px!important;}'+
      'body header img[alt="brainrecycle®"],body header img[src*="logo-light"]{display:block!important;height:38px!important;width:auto!important;max-width:170px!important;object-fit:contain!important;flex:0 0 auto!important;}'+
      'body header nav.hm{display:none!important;}'+
      'body header .header-actions{display:flex!important;align-items:center!important;margin-left:auto!important;gap:10px!important;flex:0 0 auto!important;}'+
      'body header .header-actions>a{display:none!important;}'+
      'body header .header-actions>button{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:72px!important;height:48px!important;padding:0 12px!important;border:1px solid rgba(255,255,255,.24)!important;border-radius:10px!important;background:transparent!important;color:#fff!important;font-size:16px!important;font-weight:600!important;white-space:nowrap!important;}'+
      'body header .sm{display:flex!important;align-items:center!important;justify-content:center!important;width:58px!important;min-width:58px!important;height:58px!important;margin-left:0!important;padding:0!important;border:2px solid rgba(255,255,255,.42)!important;border-radius:14px!important;background:rgba(255,255,255,.12)!important;color:#fff!important;}'+
      'body header .sm i{font-size:38px!important;line-height:1!important;color:#fff!important;}'+
      'body .mobile-menu-panel{position:fixed!important;top:72px!important;left:0!important;right:0!important;bottom:0!important;height:calc(100dvh - 72px)!important;z-index:11990!important;}'+
    '}';
    document.head.appendChild(st);
  }

  function normalizeLanguageButton(){
    if(!isHome() || !window.matchMedia('(max-width:760px)').matches) return;
    var btn=document.querySelector('header .header-actions>button');
    if(!btn) return;
    var txt=(btn.textContent||'').trim();
    if(!txt || txt.indexOf('{{')!==-1){btn.textContent='🇬🇧 EN';}
  }

  function runAfterCore(){
    installPersistentMobileCSS();
    installHomeHeaderCSS();
    normalizeLanguageButton();
    /* A few bounded retries only, because the DC runtime may render the header just after DOMContentLoaded. */
    if(isHome()) [120,350,800,1600].forEach(function(ms){setTimeout(function(){installHomeHeaderCSS();normalizeLanguageButton();},ms);});
  }

  var s=document.createElement('script');
  s.src=CORE;
  s.async=false;
  s.onload=function(){
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){setTimeout(runAfterCore,0);},{once:true});
    else setTimeout(runAfterCore,0);
  };
  s.onerror=function(){
    /* Even if the legacy runtime CDN fails, keep the structural mobile fixes available. */
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',runAfterCore,{once:true});
    else runAfterCore();
  };
  document.head.appendChild(s);
})();
