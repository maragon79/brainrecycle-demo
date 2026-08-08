(function(){
  'use strict';
  if(!window.matchMedia||!window.matchMedia('(max-width:760px)').matches)return;

  function lang(){try{return localStorage.getItem('br_lang')||'es';}catch(e){return'es';}}
  function imp(el,prop,val){if(el&&el.style)el.style.setProperty(prop,val,'important');}
  function isMonthly(box){
    var t=(box&&box.textContent)||'';
    return t.indexOf('P50')!==-1&&t.indexOf('P20')!==-1&&t.indexOf('P10')!==-1&&(t.indexOf('Potencial')!==-1||t.indexOf('Potential')!==-1);
  }
  function enhance(){
    var boxes=document.querySelectorAll('.br-hscroll');
    for(var b=0;b<boxes.length;b++){
      var box=boxes[b];if(!isMonthly(box))continue;
      var inner=box.firstElementChild;if(!inner)continue;
      imp(box,'overflow-x','auto');imp(box,'overflow-y','hidden');imp(box,'-webkit-overflow-scrolling','touch');
      imp(inner,'min-width','1500px');imp(inner,'width','1500px');imp(inner,'max-width','none');
      var widths=[92,126,118,118,118,118,118,142,142,178,170];
      var rows=inner.children;
      for(var r=0;r<rows.length;r++){
        var row=rows[r];if(!row||!row.children||row.children.length<10)continue;
        imp(row,'display','flex');imp(row,'min-width','1500px');imp(row,'width','1500px');imp(row,'max-width','none');
        imp(row,'padding-left','18px');imp(row,'padding-right','18px');
        imp(row,'min-height',r===0?'58px':'76px');imp(row,'align-items','center');
        for(var c=0;c<row.children.length;c++){
          var cell=row.children[c],w=widths[c]||140;
          imp(cell,'flex','0 0 '+w+'px');imp(cell,'width',w+'px');imp(cell,'min-width',w+'px');imp(cell,'max-width',w+'px');
          imp(cell,'box-sizing','border-box');imp(cell,'padding-left','12px');imp(cell,'padding-right','12px');
          imp(cell,'white-space','nowrap');imp(cell,'overflow','visible');
          if(c===0)imp(cell,'text-align','left');else imp(cell,'text-align','center');
        }
      }
      if(!box.dataset.brMonthlyWide){box.dataset.brMonthlyWide='1';try{box.scrollLeft=0;}catch(e){}}
    }
  }
  function boot(){
    if(!document.getElementById('br-mobile-table-readability-v1')){
      var st=document.createElement('style');st.id='br-mobile-table-readability-v1';
      st.textContent='@media(max-width:760px){.br-hscroll[data-br-monthly-wide="1"]{padding-bottom:12px!important}.br-hscroll[data-br-monthly-wide="1"]>div>div:first-child{font-size:10.5px!important;line-height:1.25!important}.br-hscroll[data-br-monthly-wide="1"]>div>div:not(:first-child){font-size:13px!important;line-height:1.35!important}}';
      if(lang()==='en')st.textContent+='@media(max-width:760px){.br-hscroll::before{content:"Swipe to see more  →"!important;}}';
      document.head.appendChild(st);
    }
    enhance();[120,400,900,1800,3200].forEach(function(ms){setTimeout(enhance,ms);});
    document.addEventListener('click',function(){setTimeout(enhance,80);setTimeout(enhance,350);},false);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
