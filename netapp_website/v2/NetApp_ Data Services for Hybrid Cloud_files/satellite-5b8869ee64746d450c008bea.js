_satellite.pushAsyncScript(function(event, target, $variables){
  var s = document.createElement('script');
s.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=AW-934211264');
document.head.appendChild(s);

var gtagscript = "window.dataLayer = window.dataLayer || [];"+
    							"function gtag(){dataLayer.push(arguments);};"+
    							"gtag('js', new Date());"+
    							"gtag('config', 'AW-934211264');"+
									"gtag('config', 'AW-815664557');"+
    							"gtag('config', 'AW-730483330');"+
    							"gtag('config', 'AW-1056430553');";

var scr = document.createElement('script');
scr.text = gtagscript;
document.head.appendChild(scr);



});
