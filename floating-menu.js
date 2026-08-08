(function(){
  'use strict';
  if(!window.matchMedia || !window.matchMedia('(max-width:760px)').matches) return;

  function lang(){
    try{return localStorage.getItem('br_lang')||'es';}catch(e){return'es';}
  }
  function header(){return document.querySelector('x-dc header')||document.querySelector('header');}
  function actuallyVisible(el){
    if(!el || el.hidden || el.getAttribute('aria-hidden')==='true') return false;
    var s=window.getComputedStyle(el),r=el.getBoundingClientRect();
    var op=parseFloat(s.opacity||'1');
    return s.display!=='none' && s.visibility!=='hidden' && op>0.05 &&
      s.pointerEvents!=='none' && r.width>0 && r.height>0 &&
      r.bottom>0 && r.top<window.innerHeight;
  }
  function dashboardTrigger(){
    return document.querySelector('label[for="brDashToggle"].dash-mobile-menu-btn')||
           document.querySelector('label[for="brDashToggle"]');
  }
  function normalizeTrigger(el){
    if(!el) return null;
    if(el.matches && el.matches('button,label,a,input,[role="button"]')) return el;
    var inside=el.querySelector && el.querySelector('button,label,a,input,[role="button"]');
    if(inside) return inside;
    var parent=el.closest && el.closest('button,label,a,input,[role="button"]');
    return parent||el;
  }
  function publicTrigger(){
    var q=[
      'header button.sm','header .sm button','header .sm [role="button"]','header .sm',
      'header button[aria-label*="menú" i]','header button[aria-label*="menu" i]',
      'header [role="button"][aria-label*="menú" i]','header [role="button"][aria-label*="menu" i]'
    ];
    for(var i=0;i<q.length;i++){
      var el=document.querySelector(q[i]);
      if(el) return normalizeTrigger(el);
    }
    return null;
  }
  function mobilePanel(){
    var list=document.querySelectorAll('.mobile-menu-panel');
    for(var i=0;i<list.length;i++) if(actuallyVisible(list[i])) return list[i];
    return null;
  }
  function menuOpen(){
    var cb=document.getElementById('brDashToggle');
    if(cb&&cb.checked) return true;
    return !!mobilePanel();
  }
  function fire(el){
    if(!el) return false;
    try{el.click();return true;}catch(e){}
    try{
      el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
      return true;
    }catch(e){}
    return false;
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
    var busy=false;
    function update(){
      var show=!headerInView&&!menuOpen()&&!busy;
      btn.classList.toggle('br-show',show);
    }
    function recalcHeader(){
      var r=h.getBoundingClientRect();
      headerInView=r.bottom>6 && r.top<window.innerHeight;
      update();
    }
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(entries){
        if(entries&&entries[0]){headerInView=entries[0].isIntersecting;update();}
      },{threshold:0.05}).observe(h);
    }
    window.addEventListener('scroll',recalcHeader,{passive:true});

    function openMenuAtTop(){
      var started=Date.now();
      try{window.scrollTo({top:0,left:0,behavior:'smooth'});}catch(e){window.scrollTo(0,0);}

      function finish(){
        var y=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
        if(y>4) window.scrollTo(0,0);
        requestAnimationFrame(function(){
          var isDash=!!document.getElementById('brDashToggle');
          var t=isDash?dashboardTrigger():publicTrigger();
          fire(t);
          setTimeout(function(){
            busy=false;
            recalcHeader();
            if(menuOpen()) btn.classList.remove('br-show');
          },220);
        });
      }

      function waitForTop(){
        var y=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
        if(y<=4 || Date.now()-started>1000){finish();return;}
        requestAnimationFrame(waitForTop);
      }
      requestAnimationFrame(waitForTop);
    }

    btn.addEventListener('click',function(ev){
      ev.preventDefault();ev.stopPropagation();
      if(busy) return;
      busy=true;
      btn.classList.remove('br-show');
      openMenuAtTop();
    });

    document.addEventListener('click',function(){setTimeout(function(){if(!busy)recalcHeader();},260);},false);
    window.addEventListener('resize',recalcHeader,{passive:true});
    recalcHeader();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
