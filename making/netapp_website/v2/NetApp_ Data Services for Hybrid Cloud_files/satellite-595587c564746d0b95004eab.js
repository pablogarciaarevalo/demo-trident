_satellite.pushAsyncScript(function(event, target, $variables){
  $(window).load(function() {
  
  if(window.GetElqContentPersonalizationValue !== undefined){
  	adobe.target.trackEvent({
      "mbox": "elqUpdate",
      "params":{ 
        /**** Insight Registrant DIGITAL-9742 ******/
        /*"profile.attendee_type": window.GetElqContentPersonalizationValue('Attendee_Type1'),
        "profile.attendee_status": window.GetElqContentPersonalizationValue('Status1'),
        "profile.attendee_email": window.GetElqContentPersonalizationValue('Email_Address1'),
        "profile.attendee_country": window.GetElqContentPersonalizationValue('Country1'),*/
        /**** Business Units Buyer Journey Stages ******/
        "profile.Brand_Affinity_Stage": window.GetElqContentPersonalizationValue('Brand_Affinity_Stage1'),
        "profile.Cloud_Affinity_Stage": window.GetElqContentPersonalizationValue('C_Affinity_3_Stage1'),
        "profile.Flash_Affinity_Stage": window.GetElqContentPersonalizationValue('C_Affinity_1_Stage1'),
        "profile.NextGen_Affinity_Stage": window.GetElqContentPersonalizationValue('C_Affinity_2_Stage1')
      }
  	});
  } else {
    adobe.target.trackEvent({
      "mbox": "elqUpdate",
      "params":{
         "profile.Brand_Affinity_Stage": "UNKNOWN",
         "profile.Cloud_Affinity_Stage": "UNKNOWN",
         "profile.Flash_Affinity_Stage": "UNKNOWN",
         "profile.NextGen_Affinity_Stage": "UNKNOWN"
      }
    });
  }
  
});
});
