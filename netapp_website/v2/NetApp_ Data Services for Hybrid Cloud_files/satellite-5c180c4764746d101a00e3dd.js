_satellite.pushAsyncScript(function(event, target, $variables){
  $(window).load(function() {
  if(window.GetElqContentPersonalizationValue !== undefined){
    var user_nextgen_affinity_stage = window.GetElqContentPersonalizationValue('C_Affinity_2_Stage1');
    if(!_satellite.readCookie("buyer_journey_stage") || _satellite.readCookie("buyer_journey_stage") !== user_nextgen_affinity_stage){
    	//_satellite.setCookie("buyer_journey_stage", user_nextgen_affinity_stage, 365);
      document.cookie="buyer_journey_stage="+user_nextgen_affinity_stage+"; path=/; domain=netapp.com";
    }
  }
});

});
