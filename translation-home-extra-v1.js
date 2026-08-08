(function(){
  'use strict';
  try{if((localStorage.getItem('br_lang')||'es')!=='en')return;}catch(e){return;}

  var R=[
    ['LA PLANTA ES EL ÚNICO PUNTO DONDE CONVERGE TODO','THE PLANT IS THE ONLY POINT WHERE EVERYTHING CONVERGES'],
    ['La planta es el único punto donde converge todo','The plant is the only point where everything converges'],
    ['Los datos que ya estás generando bastan para controlar mejor tu operación, automatizar obligaciones y preparar evidencias listas para verificar.','The data you are already generating are enough to improve operational control, automate obligations and prepare verification-ready evidence.'],
    ['Ver BrainRecycle en acción','See BrainRecycle in action']
  ];

  function tr(s){
    if(!s)return s;
    var out=s;
    for(var i=0;i<R.length;i++)if(out.indexOf(R[i][0])!==-1)out=out.split(R[i][0]).join(R[i][1]);
    return out;
  }
  function scan(){
    if(!document.body)return;
    var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
      var p=n.parentElement;if(!p)return NodeFilter.FILTER_REJECT;
      var t=p.tagName;if(t==='SCRIPT'||t==='STYLE'||t==='NOSCRIPT'||t==='TEXTAREA'||t==='OPTION')return NodeFilter.FILTER_REJECT;
      return n.nodeValue&&n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
    }});
    var nodes=[],n;while((n=w.nextNode()))nodes.push(n);
    for(var i=0;i<nodes.length;i++){var a=nodes[i].nodeValue,b=tr(a);if(b!==a)nodes[i].nodeValue=b;}
  }
  function boot(){scan();[100,350,800,1500,3000].forEach(function(ms){setTimeout(scan,ms);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
