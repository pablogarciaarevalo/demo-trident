_satellite.pushAsyncScript(function(event, target, $variables){
  var s = document.createElement('script');
s.src = 'https://js.adsrvr.org/up_loader.1.1.0.js';
s.onload = initttdApi;
document.head.appendChild(s);

function initttdApi() {
  ttd_dom_ready( function() {
    if (typeof TTDUniversalPixelApi === 'function') { 
      var universalPixelApi = new TTDUniversalPixelApi(); 
      universalPixelApi.init("31zomng", ["01kuvds"], "https://insight.adsrvr.org/track/up"); 
    }
  });
}




});
