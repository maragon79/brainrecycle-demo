(function(){
  'use strict';
  if(!window.matchMedia||!window.matchMedia('(max-width:760px)').matches)return;

  function lang(){try{return localStorage.getItem('br_lang')||'es';}catch(e){return'es';}}
  function boot(){
    if(document.getElementById('br-mobile-table-readability-v1'))return;
    var st=document.createElement('style');
    st.id='br-mobile-table-readability-v1';
    st.textContent='@media(max-width:760px){'+
      '.br-hscroll>div[style*="min-width:820px"]{min-width:1220px!important;}'+
      '.br-hscroll>div[style*="min-width:820px"]>div{padding-left:18px!important;padding-right:18px!important;}'+
      '.br-hscroll>div[style*="min-width:820px"]>div>div{flex:0 0 96px!important;min-width:96px!important;padding-left:8px!important;padding-right:8px!important;white-space:nowrap!important;text-align:center!important;}'+
      '.br-hscroll>div[style*="min-width:820px"]>div>div:first-child{flex:0 0 66px!important;min-width:66px!important;text-align:left!important;}'+
      '.br-hscroll>div[style*="min-width:820px"]>div>div:nth-child(10){flex:0 0 126px!important;min-width:126px!important;}'+
      '.br-hscroll>div[style*="min-width:820px"]>div>div:last-child{flex:0 0 116px!important;min-width:116px!important;}'+
      '.br-hscroll>div[style*="min-width:820px"]>div:first-child{font-size:10px!important;line-height:1.25!important;}'+
      '.br-hscroll>div[style*="min-width:820px"]>div:not(:first-child){font-size:12.5px!important;line-height:1.35!important;}'+
      '.br-hscroll>div[style*="min-width:820px"]>div:not(:first-child)>div{overflow:visible!important;}'+
      '}';
    if(lang()==='en')st.textContent+='@media(max-width:760px){.br-hscroll::before{content:"Swipe to see more  →"!important;}}';
    document.head.appendChild(st);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
