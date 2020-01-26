_satellite.pushAsyncScript(function(event, target, $variables){
  var s = document.createElement('script');
s.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=DC-4355326');
document.head.appendChild(s);

var gtagscript = "window.dataLayer = window.dataLayer || [];"+
    							"function gtag(){dataLayer.push(arguments);};"+
    							"gtag('js', new Date());"+
    							"gtag('config', 'DC-4355326');";

var scr = document.createElement('script');
scr.text = gtagscript;
document.head.appendChild(scr);



});
