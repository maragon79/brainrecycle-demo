(function(){
  var R = window.React;
  function TrustBadge(props){
    var status = (props && props.status) || 'verified';
    if(!R) return null;
    return R.createElement('div',{
      title:'Kiwa · '+status,
      style:{width:'32px',height:'32px',borderRadius:'50%',display:'flex',
        alignItems:'center',justifyContent:'center',
        background:'#cce6b1',color:'#2c483d',flexShrink:0}
    }, R.createElement('i',{className:'ti ti-shield-check',style:{fontSize:'16px'}}));
  }
  window.BrainRecycleDesignSystem_4ef5a7 = window.BrainRecycleDesignSystem_4ef5a7 || {};
  window.BrainRecycleDesignSystem_4ef5a7.TrustBadge = TrustBadge;
})();