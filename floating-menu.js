(function(){
  'use strict';
  if(!window.matchMedia || !window.matchMedia('(max-width:760px)').matches) return;

  function lang(){try{return localStorage.getItem('br_lang')||'es';}catch(e){return'es';}}
  function pageHeader(){return document.querySelector('x-dc header')||document.querySelector('header');}
  function dashboardTrigger(){
    return document.querySelector('label[for="brDashToggle"].dash-mobile-menu-btn')||document.querySelector('label[for="brDashToggle"]');
  }
  function normalizeTrigger(el){
    if(!el)return null;
    if(el.matches&&el.matches('button,label,a,input,[role="button"]'))return el;
    var inside=el.querySelector&&el.querySelector('button,label,a,input,[role="button"]');
    if(inside)return inside;
    var parent=el.closest&&el.closest('button,label,a,input,[role="button"]');
    return parent||el;
  }
  function publicTrigger(){
    var q=['header button.sm','header .sm button','header .sm [role="button"]','header .sm','header button[aria-label*="menú" i]','header button[aria-label*="menu" i]','header [role="button"][aria-label*="menú" i]','header [role="button"][aria-label*="menu" i]'];
    for(var i=0;i<q.length;i++){var el=document.querySelector(q[i]);if(el)return normalizeTrigger(el);}
    return null;
  }
  function fire(el){
    if(!el)return false;
    try{el.click();return true;}catch(e){}
    try{el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));return true;}catch(e){}
    return false;
  }

  function currentScroll(){
    var y=Math.max(window.pageYOffset||0,document.documentElement.scrollTop||0,document.body.scrollTop||0);
    var all=document.querySelectorAll('body *');
    for(var i=0;i<all.length;i++){
      if(typeof all[i].scrollTop==='number'&&all[i].scrollTop>y)y=all[i].scrollTop;
    }
    return y;
  }

  /* iOS can scroll an inner container even when window.pageYOffset is 0.
     The floating button must therefore reset the actual page AND every vertical
     scroll container before opening the original hamburger menu. */
  function forceTrueTop(){
    var h=pageHeader();
    if(h&&h.scrollIntoView){
      try{h.scrollIntoView({behavior:'auto',block:'start',inline:'nearest'});}catch(e){try{h.scrollIntoView(true);}catch(x){}}
    }
    try{window.scrollTo(0,0);}catch(e){}
    try{if(document.scrollingElement)document.scrollingElement.scrollTop=0;}catch(e){}
    try{document.documentElement.scrollTop=0;}catch(e){}
    try{document.body.scrollTop=0;}catch(e){}

    var all=document.querySelectorAll('body *');
    for(var i=0;i<all.length;i++){
      try{
        if(typeof all[i].scrollTop==='number'&&all[i].scrollTop!==0)all[i].scrollTop=0;
      }catch(e){}
    }
  }

  function boot(){
    if(document.getElementById('br-floating-menu'))return;
    var style=document.createElement('style');style.id='br-floating-menu-style';
    style.textContent='@media(max-width:760px){#br-floating-menu{position:fixed;left:18px;bottom:calc(18px + env(safe-area-inset-bottom,0px));width:62px;height:62px;border-radius:16px;border:2px solid rgba(255,255,255,.48);background:#2c483d;box-shadow:0 10px 28px rgba(0,0,0,.28);z-index:3600;display:flex;align-items:center;justify-content:center;padding:0;opacity:0;transform:translateY(14px) scale(.94);pointer-events:none;transition:opacity .18s ease,transform .18s ease;cursor:pointer;-webkit-tap-highlight-color:transparent}#br-floating-menu.br-show{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}#br-floating-menu .br-fm-lines{width:31px;height:24px;display:flex;flex-direction:column;justify-content:space-between}#br-floating-menu .br-fm-lines span{display:block;width:31px;height:4px;border-radius:999px;background:#fff}#br-floating-menu:active{transform:scale(.96)}}';
    document.head.appendChild(style);

    var btn=document.createElement('button');btn.id='br-floating-menu';btn.type='button';
    btn.setAttribute('aria-label',lang()==='en'?'Open navigation menu':'Abrir menú de navegación');
    btn.setAttribute('title',lang()==='en'?'Open menu':'Abrir menú');
    btn.innerHTML='<span class="br-fm-lines" aria-hidden="true"><span></span><span></span><span></span></span>';
    document.body.appendChild(btn);

    var busy=false;
    function update(){btn.classList.toggle('br-show',!busy&&currentScroll()>140);}
    window.addEventListener('scroll',update,{passive:true});
    document.addEventListener('scroll',update,true);
    window.addEventListener('resize',update,{passive:true});

    btn.addEventListener('click',function(ev){
      ev.preventDefault();ev.stopPropagation();if(busy)return;
      busy=true;btn.classList.remove('br-show');

      /* First move to the real beginning of the page. Repeat after layout frames
         because Safari may restore an inner scroller during the same tap. */
      forceTrueTop();
      requestAnimationFrame(function(){
        forceTrueTop();
        setTimeout(function(){
          forceTrueTop();
          var t=document.getElementById('brDashToggle')?dashboardTrigger():publicTrigger();
          fire(t);
          /* One final reset guarantees that opening the drawer cannot leave the
             document at the previous lower scroll position. */
          setTimeout(function(){
            forceTrueTop();
            busy=false;
            update();
          },120);
        },80);
      });
    });

    setTimeout(update,50);setTimeout(update,500);setTimeout(update,1200);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
