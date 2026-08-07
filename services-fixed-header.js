/* BrainRecycle Services: viewport-fixed mobile header, isolated from Jotform and Dashboard. */
(function(){
  'use strict';

  function path(){
    try{return decodeURIComponent(location.pathname||'');}catch(e){return location.pathname||'';}
  }
  function active(){return /Brain Recycle Servicios\.dc\.html$/i.test(path()) && matchMedia('(max-width:760px)').matches;}

  function cleanIds(root){
    if(root.id) root.removeAttribute('id');
    root.querySelectorAll('[id]').forEach(function(el){el.removeAttribute('id');});
  }

  function syncLanguage(original, clone){
    var ob=original.querySelector('.header-actions>button');
    var cb=clone.querySelector('.header-actions>button');
    if(ob && cb) cb.innerHTML=ob.innerHTML;
  }

  function install(){
    if(!active()) return;
    var existing=document.getElementById('br-services-viewport-header');
    var original=document.querySelector('x-dc header');
    if(!original) return;
    if(existing){syncLanguage(original,existing);return;}

    var clone=original.cloneNode(true);
    cleanIds(clone);
    clone.id='br-services-viewport-header';
    clone.setAttribute('aria-label','Navegación fija');
    clone.style.cssText='position:fixed!important;top:0!important;left:0!important;right:0!important;width:100%!important;height:72px!important;z-index:12000!important;background:rgba(44,72,61,.98)!important;border-bottom:1px solid rgba(255,255,255,.09)!important;box-shadow:0 4px 16px rgba(0,0,0,.14)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;';

    var inner=clone.firstElementChild;
    if(inner){
      inner.style.height='72px';
      inner.style.minHeight='72px';
      inner.style.maxWidth='none';
      inner.style.width='100%';
      inner.style.padding='0 18px';
    }

    var menu=clone.querySelector('.sm');
    if(menu){
      menu.style.cssText+='display:flex!important;align-items:center!important;justify-content:center!important;width:58px!important;min-width:58px!important;height:58px!important;padding:0!important;border:2px solid rgba(255,255,255,.42)!important;border-radius:14px!important;background:rgba(255,255,255,.12)!important;color:#fff!important;';
      var mi=menu.querySelector('i'); if(mi) mi.style.cssText+='font-size:38px!important;line-height:1!important;color:#fff!important;';
      menu.addEventListener('click',function(ev){
        ev.preventDefault(); ev.stopPropagation();
        var real=document.querySelector('x-dc header .sm');
        if(real) real.click();
      },true);
    }

    var lang=clone.querySelector('.header-actions>button');
    if(lang){
      lang.addEventListener('click',function(ev){
        ev.preventDefault(); ev.stopPropagation();
        var real=document.querySelector('x-dc header .header-actions>button');
        if(real){real.click();setTimeout(function(){syncLanguage(original,clone);},80);}
      },true);
    }

    /* Keep the original header only as a 72px layout spacer. It is not visible and cannot intercept taps. */
    original.style.visibility='hidden';
    original.style.pointerEvents='none';
    original.style.height='72px';
    original.style.minHeight='72px';

    document.body.appendChild(clone);
  }

  function teardown(){
    if(active()) return;
    var clone=document.getElementById('br-services-viewport-header');
    if(clone) clone.remove();
    var original=document.querySelector('x-dc header');
    if(original){original.style.visibility='';original.style.pointerEvents='';original.style.height='';original.style.minHeight='';}
  }

  function run(){active()?install():teardown();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
  [100,300,700,1400].forEach(function(ms){setTimeout(run,ms);});
  addEventListener('resize',run,{passive:true});
})();
