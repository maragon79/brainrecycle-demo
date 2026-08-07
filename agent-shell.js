/* BrainRecycle controlled Jotform AI Agent shell.
   Uses Jotform's iframe embed parameters and keeps the BrainRecycle mobile header visible. */
(function(){
  'use strict';
  var AGENT_ID='019fa26bce5070008110e6538cf51792df87';

  function agentURL(){
    return 'https://agent.jotform.com/'+AGENT_ID+
      '?embedMode=iframe&background=1&shadow=0&isIframeEmbed=1&parentURL='+encodeURIComponent(location.href);
  }

  function loadEmbedHandler(frame){
    function activate(){
      try{
        if(typeof window.jotformEmbedHandler==='function'){
          window.jotformEmbedHandler("iframe[id='"+frame.id+"']",'https://www.jotform.com');
        }
      }catch(e){}
    }
    if(typeof window.jotformEmbedHandler==='function'){ activate(); return; }
    var existing=document.querySelector('script[data-br-jf-handler]');
    if(existing){ existing.addEventListener('load',activate,{once:true}); return; }
    var s=document.createElement('script');
    s.src='https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    s.async=true; s.setAttribute('data-br-jf-handler','1'); s.addEventListener('load',activate,{once:true});
    document.head.appendChild(s);
  }

  function init(){
    if(document.getElementById('br-agent-launcher')) return;

    var style=document.createElement('style');
    style.id='br-agent-shell-style';
    style.textContent=`
      #br-agent-launcher{position:fixed;right:18px;bottom:18px;z-index:11000;width:68px;height:68px;border:3px solid #fff;border-radius:50%;background:#2c483d;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 28px rgba(0,0,0,.28);cursor:pointer;-webkit-tap-highlight-color:transparent}
      #br-agent-launcher svg{width:31px;height:31px;display:block}
      #br-agent-backdrop{display:none;position:fixed;left:0;right:0;bottom:0;top:72px;z-index:11700;background:rgba(8,22,16,.46);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px)}
      #br-agent-panel{display:none;position:fixed;z-index:11800;background:#f6faf4;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.30);border:1px solid rgba(44,72,61,.18)}
      #br-agent-panel.br-open,#br-agent-backdrop.br-open{display:block}
      #br-agent-close{position:absolute;top:8px;right:8px;z-index:10;width:46px;height:46px;border:1px solid rgba(44,72,61,.16);border-radius:14px;background:rgba(238,245,235,.96);color:#2c483d;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:32px;font-weight:500;line-height:1;box-shadow:0 2px 10px rgba(0,0,0,.10)}
      #br-agent-frame-wrap{position:absolute;inset:0;overflow:hidden;background:#f6faf4}
      #br-agent-frame{display:block;width:100%!important;height:100%!important;min-width:100%!important;max-width:100%!important;border:0;background:#f6faf4}
      @media(min-width:761px){
        #br-agent-panel{right:18px;bottom:18px;width:min(470px,calc(100vw - 36px));height:min(760px,calc(100vh - 110px));border-radius:20px}
      }
      @media(max-width:760px){
        #br-agent-launcher{right:16px;bottom:16px;width:66px;height:66px}
        #br-agent-backdrop{top:72px}
        /* Almost the whole usable viewport; never covers the 72px site header. */
        #br-agent-panel{top:76px;left:6px;right:6px;bottom:6px;width:auto;height:auto;min-height:0;max-height:none;border-radius:16px}
        #br-agent-close{top:7px;right:7px;width:44px;height:44px;font-size:30px}
        /* Slight global scale to fit more conversation while preserving Jotform's internal layout. */
        #br-agent-frame{width:106.4%!important;height:106.4%!important;max-width:none!important;transform:scale(.94);transform-origin:0 0}
      }
      @media(max-width:390px){#br-agent-frame{width:108.7%!important;height:108.7%!important;transform:scale(.92)}}
    `;
    document.head.appendChild(style);

    var launcher=document.createElement('button');
    launcher.id='br-agent-launcher'; launcher.type='button';
    launcher.setAttribute('aria-label','Abrir asistente de BrainRecycle');
    launcher.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 9h8M8 13h5"/><path d="M7 18l-3 2v-4a8 8 0 1 1 3 2z"/></svg>';

    var backdrop=document.createElement('div'); backdrop.id='br-agent-backdrop';
    var panel=document.createElement('section');
    panel.id='br-agent-panel'; panel.setAttribute('role','dialog'); panel.setAttribute('aria-modal','true'); panel.setAttribute('aria-label','Asistente de BrainRecycle');
    panel.innerHTML='<button id="br-agent-close" type="button" aria-label="Cerrar asistente">×</button><div id="br-agent-frame-wrap"><iframe id="JotFormIFrame-'+AGENT_ID+'" title="Arquea · Asistente de BrainRecycle" allowtransparency="true" allow="geolocation; microphone; camera; fullscreen" frameborder="0" scrolling="no"></iframe></div>';

    document.body.appendChild(backdrop); document.body.appendChild(panel); document.body.appendChild(launcher);
    var frame=panel.querySelector('iframe'); var closeBtn=panel.querySelector('#br-agent-close'); var loaded=false;

    function openAgent(){
      if(!loaded){ frame.src=agentURL(); loadEmbedHandler(frame); loaded=true; }
      backdrop.classList.add('br-open'); panel.classList.add('br-open'); launcher.style.display='none';
      try{closeBtn.focus({preventScroll:true});}catch(e){closeBtn.focus();}
    }
    function closeAgent(){
      backdrop.classList.remove('br-open'); panel.classList.remove('br-open'); launcher.style.display='flex';
      try{launcher.focus({preventScroll:true});}catch(e){launcher.focus();}
    }

    launcher.addEventListener('click',openAgent); closeBtn.addEventListener('click',closeAgent); backdrop.addEventListener('click',closeAgent);
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.classList.contains('br-open'))closeAgent();});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
