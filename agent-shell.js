/* BrainRecycle controlled Jotform shell: large readable mobile panel below the site header. */
(function(){
  'use strict';
  var AGENT_ID='019fa26bce5070008110e6538cf51792df87';
  var AGENT_URL='https://agent.jotform.com/'+AGENT_ID+'?embedMode=iframe&background=1&shadow=0';

  function init(){
    if(document.getElementById('br-agent-launcher')) return;

    var style=document.createElement('style');
    style.id='br-agent-shell-style';
    style.textContent=`
      #br-agent-launcher{position:fixed;right:18px;bottom:18px;z-index:190;width:68px;height:68px;border:3px solid #fff;border-radius:50%;background:#2c483d;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 28px rgba(0,0,0,.28);cursor:pointer;-webkit-tap-highlight-color:transparent}
      #br-agent-launcher svg{width:31px;height:31px;display:block}
      #br-agent-backdrop{display:none;position:fixed;left:0;right:0;bottom:0;top:72px;z-index:170;background:rgba(8,22,16,.48);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px)}
      #br-agent-panel{display:none;position:fixed;right:14px;bottom:14px;z-index:180;width:min(460px,calc(100vw - 28px));height:min(78dvh,720px);background:#f6faf4;border-radius:20px;overflow:hidden;box-shadow:0 22px 60px rgba(0,0,0,.34);border:1px solid rgba(44,72,61,.16)}
      #br-agent-panel.br-open,#br-agent-backdrop.br-open{display:block}
      #br-agent-close{position:absolute;top:8px;right:8px;z-index:5;width:44px;height:44px;border:1px solid rgba(44,72,61,.12);border-radius:13px;background:rgba(238,245,235,.94);color:#2c483d;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:31px;font-weight:500;line-height:1;box-shadow:0 2px 8px rgba(0,0,0,.08)}
      #br-agent-frame-wrap{width:100%;height:100%;overflow:hidden;background:#f6faf4}
      #br-agent-frame{display:block;width:100%;height:100%;border:0;background:#f6faf4}
      @media(max-width:760px){
        #br-agent-launcher{right:16px;bottom:16px;width:66px;height:66px}
        #br-agent-backdrop{top:72px}
        /* Fill practically all usable space, but NEVER cover the 72px BrainRecycle header. */
        #br-agent-panel{top:80px;left:8px;right:8px;bottom:8px;width:auto;height:auto;max-height:none;min-height:0;border-radius:18px}
        /* Scale the cross-origin Jotform UI as a whole: more text fits without trying to alter its internal CSS. */
        #br-agent-frame{width:111.12%;height:111.12%;transform:scale(.90);transform-origin:0 0}
        #br-agent-close{top:7px;right:7px;width:42px;height:42px;font-size:29px}
      }
      @media(max-width:390px){
        #br-agent-panel{left:6px;right:6px;bottom:6px;top:78px}
        #br-agent-frame{width:113.64%;height:113.64%;transform:scale(.88)}
      }
    `;
    document.head.appendChild(style);

    var launcher=document.createElement('button');
    launcher.id='br-agent-launcher';
    launcher.type='button';
    launcher.setAttribute('aria-label','Abrir asistente de BrainRecycle');
    launcher.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 9h8M8 13h5"/><path d="M7 18l-3 2v-4a8 8 0 1 1 3 2z"/></svg>';

    var backdrop=document.createElement('div');
    backdrop.id='br-agent-backdrop';

    var panel=document.createElement('section');
    panel.id='br-agent-panel';
    panel.setAttribute('role','dialog');
    panel.setAttribute('aria-modal','true');
    panel.setAttribute('aria-label','Asistente de BrainRecycle');
    panel.innerHTML='<button id="br-agent-close" type="button" aria-label="Cerrar asistente">×</button><div id="br-agent-frame-wrap"><iframe id="br-agent-frame" title="Asistente de BrainRecycle" allow="geolocation; microphone; camera; fullscreen" scrolling="yes"></iframe></div>';

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
    document.body.appendChild(launcher);

    var frame=panel.querySelector('#br-agent-frame');
    var closeBtn=panel.querySelector('#br-agent-close');
    var loaded=false;

    function openAgent(){
      if(!loaded){frame.src=AGENT_URL;loaded=true;}
      backdrop.classList.add('br-open');
      panel.classList.add('br-open');
      launcher.style.display='none';
      try{closeBtn.focus({preventScroll:true});}catch(e){closeBtn.focus();}
    }
    function closeAgent(){
      backdrop.classList.remove('br-open');
      panel.classList.remove('br-open');
      launcher.style.display='flex';
      try{launcher.focus({preventScroll:true});}catch(e){launcher.focus();}
    }

    launcher.addEventListener('click',openAgent);
    closeBtn.addEventListener('click',closeAgent);
    backdrop.addEventListener('click',closeAgent);
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.classList.contains('br-open'))closeAgent();});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
