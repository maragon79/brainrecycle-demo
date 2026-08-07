/* BrainRecycle Dashboard stability layer — mobile only.
   Restores the validated traceability UX (TRH 40 days + horizontal guidance)
   and the emphasized mobile drawer control without altering desktop content. */
(function(){
  'use strict';

  function mobile(){ return window.matchMedia && window.matchMedia('(max-width:760px)').matches; }
  function norm(s){ return (s||'').replace(/\s+/g,' ').trim(); }
  function leaves(root,text){
    if(!root) return [];
    return Array.from(root.querySelectorAll('*')).filter(function(el){
      return el.children.length===0 && norm(el.textContent)===text;
    });
  }
  function has(root,text){ return leaves(root,text).length>0; }
  function ancestor(el,predicate,max){
    var n=el;
    for(var i=0;n&&i<(max||8);i++,n=n.parentElement){ if(predicate(n)) return n; }
    return null;
  }

  function installCSS(){
    if(document.getElementById('br-dashboard-stability-css')) return;
    var s=document.createElement('style');
    s.id='br-dashboard-stability-css';
    s.textContent=`
@media(max-width:760px){
  /* Keep the validated drawer button obvious and easy to tap. */
  html body x-dc .dash-shell .dash-mobile-menu-btn{
    display:flex!important;width:60px!important;height:60px!important;min-width:60px!important;max-width:60px!important;
    flex:0 0 60px!important;align-items:center!important;justify-content:center!important;padding:0!important;
    color:#fff!important;background:rgba(255,255,255,.18)!important;border:2px solid rgba(255,255,255,.58)!important;
    border-radius:15px!important;box-shadow:0 5px 16px rgba(0,0,0,.24)!important;opacity:1!important;cursor:pointer!important;
  }
  html body x-dc .dash-shell .dash-mobile-menu-btn i{font-size:40px!important;line-height:1!important;color:#fff!important;opacity:1!important}
  html body x-dc .dash-shell .dash-main>header{height:76px!important;min-height:76px!important;padding:0 14px!important;align-items:center!important}

  /* Traceability selectors and lifecycle are deliberately horizontal. */
  .dash-main .br-trace-tabs-stable,.dash-main .br-trace-stages-stable{
    display:flex!important;flex-wrap:nowrap!important;width:100%!important;max-width:100%!important;
    overflow-x:auto!important;overflow-y:hidden!important;-webkit-overflow-scrolling:touch!important;overscroll-behavior-x:contain!important;
    scrollbar-width:auto!important;scrollbar-color:#3f685b #dfe5df!important;
  }
  .dash-main .br-trace-tabs-stable{gap:8px!important;padding-bottom:8px!important}
  .dash-main .br-trace-tabs-stable>*{flex:0 0 auto!important;min-width:max-content!important;white-space:nowrap!important}
  .dash-main .br-trace-stages-stable{padding:8px 4px 8px!important;scroll-snap-type:x proximity!important}
  .dash-main .br-trace-stages-stable>*{flex:0 0 132px!important;min-width:132px!important;scroll-snap-align:start!important}
  .dash-main .br-trace-tabs-stable::-webkit-scrollbar{height:8px!important;display:block!important}
  .dash-main .br-trace-stages-stable::-webkit-scrollbar{height:10px!important;display:block!important}
  .dash-main .br-trace-tabs-stable::-webkit-scrollbar-track,.dash-main .br-trace-stages-stable::-webkit-scrollbar-track{background:#dfe5df!important;border-radius:999px!important}
  .dash-main .br-trace-tabs-stable::-webkit-scrollbar-thumb,.dash-main .br-trace-stages-stable::-webkit-scrollbar-thumb{background:#3f685b!important;border-radius:999px!important;border:2px solid #dfe5df!important}

  .dash-main .br-mobile-scroll-hint-stable{
    display:flex!important;align-items:center!important;gap:7px!important;width:max-content!important;max-width:100%!important;
    margin:5px 0 7px!important;padding:7px 11px!important;border-radius:999px!important;background:#e7f0dd!important;color:#2c483d!important;
    font:700 12px/1.2 var(--font-display,system-ui)!important;letter-spacing:.01em!important;
  }
  .dash-main .br-mobile-scroll-hint-stable i{font-size:15px!important}
  /* Permanent visual rail for iOS, whose native scrollbars auto-hide. */
  .dash-main .br-scroll-rail-stable{position:relative!important;height:8px!important;margin:3px 4px 10px!important;background:#dfe5df!important;border-radius:999px!important;overflow:hidden!important}
  .dash-main .br-scroll-thumb-stable{position:absolute!important;left:0;top:0;height:100%!important;width:34%!important;min-width:44px!important;background:#3f685b!important;border-radius:999px!important;transform:translateX(0)}
}
`;
    document.head.appendChild(s);
  }

  function addHint(scroller,text){
    if(!scroller || !scroller.parentNode) return;
    var prev=scroller.previousElementSibling;
    if(prev && prev.classList && prev.classList.contains('br-mobile-scroll-hint-stable')) return;
    var h=document.createElement('div');
    h.className='br-mobile-scroll-hint-stable';
    h.innerHTML='<i class="ti ti-arrows-horizontal" aria-hidden="true"></i><span>'+text+'</span>';
    scroller.parentNode.insertBefore(h,scroller);
  }

  function addRail(scroller){
    if(!scroller || !scroller.parentNode) return;
    var next=scroller.nextElementSibling;
    if(next && next.classList && next.classList.contains('br-scroll-rail-stable')) return;
    var rail=document.createElement('div'); rail.className='br-scroll-rail-stable';
    var thumb=document.createElement('div'); thumb.className='br-scroll-thumb-stable'; rail.appendChild(thumb);
    scroller.parentNode.insertBefore(rail,scroller.nextSibling);
    function sync(){
      var max=Math.max(0,scroller.scrollWidth-scroller.clientWidth);
      var ratio=scroller.scrollWidth?Math.min(1,scroller.clientWidth/scroller.scrollWidth):1;
      var railW=rail.clientWidth||1;
      var thumbW=Math.max(44,railW*ratio);
      var travel=Math.max(0,railW-thumbW);
      var x=max?travel*(scroller.scrollLeft/max):0;
      thumb.style.width=thumbW+'px'; thumb.style.transform='translateX('+x+'px)';
    }
    scroller.addEventListener('scroll',sync,{passive:true});
    window.addEventListener('resize',sync,{passive:true});
    requestAnimationFrame(sync);
  }

  function markTraceability(){
    var main=document.querySelector('.dash-main'); if(!main) return;

    var tab=leaves(main,'Línea de vida del lote')[0];
    if(tab){
      var tabs=ancestor(tab,function(n){ return has(n,'Mapa de parcelas') && has(n,'Ruta de aplicación') && n.children.length>=3; },7);
      if(tabs){ tabs.classList.add('br-trace-tabs-stable'); addHint(tabs,'Desliza hacia la derecha para ver las opciones →'); addRail(tabs); }
    }

    var origin=leaves(main,'Origen')[0];
    if(origin){
      var stages=ancestor(origin,function(n){
        return has(n,'Circuito regulatorio') && (has(n,'Preaviso') || has(n,'Recepción y báscula')) && n.children.length>=3;
      },9);
      if(stages){
        stages.classList.add('br-trace-stages-stable');
        addHint(stages,'Desliza hacia la derecha para recorrer toda la trazabilidad →');
        addRail(stages);
      }
    }

    /* Validated process logic: digestion is not an hours-long step. Show TRH once only. */
    var vt=leaves(main,'Ventana temporal');
    if(vt.length){ vt[0].textContent='TRH · 40 días'; }
    var trh=leaves(main,'TRH · 40 días');
    trh.slice(1).forEach(function(el){ if(el.parentElement) el.parentElement.style.display='none'; });
  }

  function apply(){ if(!mobile()) return; installCSS(); markTraceability(); }
  function later(){ [0,120,350,800,1600,2800].forEach(function(ms){ setTimeout(apply,ms); }); }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',later,{once:true}); else later();
  document.addEventListener('click',function(e){
    if(!mobile()) return;
    if(e.target.closest('.dash-main button,.dash-main [role="button"],.dash-sidebar button,.dash-mobile-menu-btn')) setTimeout(apply,80);
  },true);
})();
