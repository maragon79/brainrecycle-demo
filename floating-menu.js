(function(){
  'use strict';
  if(!window.matchMedia || !window.matchMedia('(max-width:760px)').matches) return;

  function lang(){
    try{return localStorage.getItem('br_lang')||'es';}catch(e){return'es';}
  }
  function header(){return document.querySelector('x-dc header')||document.querySelector('header');}
  function isVisible(el){
    if(!el) return false;
    var s=window.getComputedStyle(el),r=el.getBoundingClientRect();
    return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0;
  }
  function dashboardTrigger(){return document.querySelector('label[for="brDashToggle"].dash-mobile-menu-btn')||document.querySelector('label[for="brDashToggle"]');}
  function publicTrigger(){
    var q=['header .sm','header button[aria-label*="menú" i]','header button[aria-label*="menu" i]','header [role="button"][aria-label*="menú" i]','header [role="button"][aria-label*="menu" i]'];
    for(var i=0;i<q.length;i++){var el=document.querySelector(q[i]);if(el)return el;}
    return null;
  }
  function menuOpen(){
    var cb=document.getElementById('brDashToggle');
    if(cb&&cb.checked) return true;
    var p=document.querySelector('.mobile-menu-panel');
    return !!(p&&isVisible(p));
  }

  function boot(){
    if(document.getElementById('br-floating-menu')) return;
    var h=header();
    if(!h) return;

    var style=document.createElement('style');
    style.id='br-floating-menu-style';
    style.textContent='@media(max-width:760px){#br-floating-menu{position:fixed;left:18px;bottom:calc(18px + env(safe-area-inset-bottom,0px));width:62px;height:62px;border-radius:16px;border:2px solid rgba(255,255,255,.48);background:#2c483d;box-shadow:0 10px 28px rgba(0,0,0,.28);z-index:3600;display:flex;align-items:center;justify-content:center;padding:0;opacity:0;transform:translateY(14px) scale(.94);pointer-events:none;transition:opacity .18s ease,transform .18s ease;cursor:pointer;-webkit-tap-highlight-color:transparent}#br-floating-menu.br-show{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}#br-floating-menu .br-fm-lines{width:31px;height:24px;display:flex;flex-direction:column;justify-content:space-between}#br-floating-menu .br-fm-lines span{display:block;width:31px;height:4px;border-radius:999px;background:#fff}#br-floating-menu:active{transform:scale(.96)}}';
    document.head.appendChild(style);

    var btn=document.createElement('button');
    btn.id='br-floating-menu';
    btn.type='button';
    btn.setAttribute('aria-label',lang()==='en'?'Open navigation menu':'Abrir menú de navegación');
    btn.setAttribute('title',lang()==='en'?'Open menu':'Abrir menú');
    btn.innerHTML='<span class="br-fm-lines" aria-hidden="true"><span></span><span></span><span></span></span>';
    document.body.appendChild(btn);

    var headerInView=true;
    var observer=null;
    function update(){
      var show=!headerInView&&!menuOpen();
      btn.classList.toggle('br-show',show);
    }
    if('IntersectionObserver' in window){
      observer=new IntersectionObserver(function(entries){
        if(entries&&entries[0]){headerInView=entries[0].isIntersecting;update();}
      },{threshold:0.05});
      observer.observe(h);
    }else{
      function fallback(){var r=h.getBoundingClientRect();headerInView=r.bottom>6;update();}
      window.addEventListener('scroll',fallback,{passive:true});fallback();
    }

    btn.addEventListener('click',function(){
      var t=dashboardTrigger()||publicTrigger();
      if(t){
        try{t.click();}catch(e){try{t.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));}catch(x){}}
      }
      btn.classList.remove('br-show');
      setTimeout(update,220);
    });

    document.addEventListener('click',function(){setTimeout(update,180);},true);
    window.addEventListener('resize',update,{passive:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
