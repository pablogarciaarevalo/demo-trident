//Last Updated on 04/03/19
// Added fix for activity map which wasn't working for domains with more than 2 periods

var domain=window.location.hostname;
var sacct_env = '';
  if(_satellite.settings.isStaging==true || domain.indexOf("qa.www.netapp.com") > -1 || domain.indexOf("review.netapp.com") > -1 || domain.indexOf("dev.www.netapp.com") > -1){
    sacct_env = '-dev';
  }
	
  if(Omniture.PageLoad.pageVars && typeof Omniture.PageLoad.pageVars.geo != 'undefined'){
    if (Omniture.PageLoad.pageVars.geo == "us" && domain !== "partner-connect.netapp.com" && domain !== "customers.netapp.com" && domain !== "content-hub.netapp.com") {
      s_account = 'networkapplnetappcom-us' + sacct_env + ',networkapplglobalexternal' + sacct_env;
    } else {
      s_account = 'networkapplglobalexternal' + sacct_env;
    }
  }
  if(domain === "abm.netapp.com" || domain.indexOf("insight.netapp.com") > -1) {
		s_account = 'networkapplglobalexternal' + sacct_env;
  }
  var s=s_gi(s_account);

if(cookieLaw.shouldInject()){
  s.visitorNamespace="networkappliance";
  s.trackingServer="ometrics.netapp.com";
  s.trackingServerSecure="sometrics.netapp.com";
  s.dc=112;
  s.visitor = Visitor.getInstance("1D6F34B852784AA40A490D44@AdobeOrg");
  s.charSet="UTF-8";
  s.currencyCode="USD";
  s.trackDownloadLinks=true;
  s.trackExternalLinks=true;
  s.trackInlineStats=true;
  s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls,ppt,swf,oft,pptx,docx,flv,xlsx";
  s.linkInternalFilters="javascript:,netapp.com,livechat.boldchat.com,storage-efficiency.fr,storage-effizienz.com,imaginevirtuallyanything.com,storage-rfp.com,itcalc.com,ntapsmbtco.com,private-communities.netapp.com,ndocalc.com,community.netapp.com,datafabrictools.com,solidfire.com,netapp.ca,netapp.ch,netapp.co.il,netapp.co.kr,netapp.co.uk,netapp.com.au,netapp.com.br,netapp.com.sg,netapp.in,netapp.it,netapp.mx,netapp.nl,netapp.ru,netapp.se";
  s.linkTrackVars="eVar12,eVar30,eVar31,list3,prop30,prop31,prop34,prop72,contextData.events"
	s.linkLeaveQueryString=false;
  s.pte = 'event101,event102,event103,event104,event105,event106,event107,event108,event109,event110'
  s.ptc = false;
  if(sessionStorage && navigator.cookieEnabled)s.pts = true;	
  s.useCommerce=false;
  s.varUsed = "";
  s.trackPageName=true;
  s.cookieDomainPeriods = "2";
  
  //Fix for activity map for country sites with more than two periods in domain
  if(domain.indexOf(".co.") > 0 || domain.indexOf(".com.") > 0) {
  	s.cookieDomainPeriods = "3";
  }
  
  /* Plugin Config */
  s.usePlugins=true;
  
  function s_doPlugins(s) {
    //Analytics Code Version
    s.prop72 = 'v101217b|' + s.version + '|';
    s.prop72 += typeof s.visitor != 'undefined' ? s.visitor.version : 'N/A';
	  s.prop72 += '|' + _satellite.buildDate;

    //getPCId
    if(window.mboxFactoryDefault && typeof mboxFactoryDefault.getPCId == "function")
      s.eVar70 = mboxFactoryDefault.getPCId().getId();
      if (typeof engagementCluster != "undefined") s.eVar52 = engagementCluster;

      //capture and stack subdomain
      s._subdomain = location.hostname.split('.').shift();
      s.eVar62=s._subdomain;
      s.eVar63=s.crossVisitParticipation(s._subdomain,'s_ev63','sess','5','>','',0);
 
      if(document.URL.indexOf("post!input") > -1) {
          s.events=s.apl(s.events,'event11',',',1);
          if (s.Util.getQueryParam('container') && s.Util.getQueryParam('containerType') && (s.Util.getQueryParam('containerType') == '14' || s.Util.getQueryParam('containerType') == '700'))
              s.eVar11 = s.Util.getQueryParam('containerType')+ '|' + s.Util.getQueryParam('container');
      }
      var l=s_getHTMLtag('a','class','discussionAdd');
      if(l){
          l.setAttribute('onclick', "s.events=s.apl(s.events,'event12',',',1);s.tl(this,'o','reply')");
      }

    // Normalize Page Name
    var pathArray = document.location.pathname.split('/');
    var last = pathArray.pop();
    var domain = window.location.hostname;
    var host = window.location.hostname;
    var hostArray = host.split('.');
    var geo 
    if(Omniture.PageLoad.pageVars){
      geo = Omniture.PageLoad.pageVars.geo;
    }
    
    if (last == '') {		
      pathArray.push('index');       
		} else {
      var base = last.split('.')[0];
      pathArray.push(base);
    }
    
    var out = pathArray.join(':');
    
    if (hostArray[hostArray.length - 1] !== "com") {
      geo = hostArray[hostArray.length - 1];
      if(geo === "cn") {
        s.pageName = geo + ":lp" + out;
      }else {
      	s.pageName = geo + out;
      }
      
      
    } else {
      if((domain.indexOf('blog') >= 0) && (pathArray.length == '2')) {
        s.pageName = 'blog' + out;
      } else if((domain.indexOf('datavisionary') >= 0)) {
        s.pageName = 'campaigns:data-visionary' + out;
      } else if(host.indexOf('tv.netapp.com') >= 0 && pathArray.length == '2') {
        s.pageName = 'video-library' + out;
      } else if(host.indexOf('tv.netapp.com') >= 0 && pathArray.length > '2') {
        s.pageName = 'video-library:' + base;
      } else if((domain.indexOf('partner-connect') >= 0) && last == 'partner-directory') {
        s.pageName = 'partner-connect:index';
      } else if(domain.indexOf('customers.netapp.com') >= 0) {
        s.pageName = 'customers' + out;
      } else if(domain.indexOf('content-hub.netapp.com') >= 0) {
        s.pageName = 'content-hub' + out;
      } else if(domain.indexOf('abm.netapp.com') >= 0) {
        s.pageName = 'abm' + out;
      } else if(domain.indexOf('insight.netapp.com') >= 0) {
        s.pageName = 'insight' + out;
        s.channel = 'insight';
        s.eVar3 = 'insight';
      } else {
        s.pageName = out.substring(1);
      }
    }
    
    s.eVar30 = s.prop30 = s.hier1 = s.pageName;

    //Document Title
      s.prop8=s.eVar8=document.title;

    //Previous Page Name 
      s.eVar17=s.prop17=s.getPreviousValue(s.pageName,'gpv_pn','');  //TODO Validate prop17 is previous page name

    //Performance Timing	
    s.performanceTiming();

    //New/Repeat
    s.prop10 = s.eVar28 = s.getNewRepeat();

    //Percent Page Viewed
	var ppv_c=s.getPercentPageViewed(s.pageName);	//Get values for prior page, pass this page's identifier
	if(ppv_c&&ppv_c.length>=4){	//Were values for the prior page returned?
      var ppv_pn=(ppv_c.length>0)?(ppv_c[0]):(''); //Extract last page's identifier
      var ppv_v=((ppv_c.length>0)?(ppv_c[1]):('')) //Extract last page's total % viewed
        +((ppv_c.length>2)?('% Inital | '+ppv_c[2] + '% Total'):(''));	//Extract last page's initial % viewed, separated by '|'
      if(ppv_pn&&ppv_v){	//Were pageName and percent % viewed values found?			
        s.prop70=ppv_v;	//Store the page identifier in the variable of your choice			
      }
    }

    //Monster cookie functionality
    var _monster_cookie = ''; 		
    if(!_satellite.readCookie('__ntap_global_id')){
      var _d = new Date();
      _monster_cookie = 'ntap.' + location.hostname + '-' + _d.getTime(); // in millisec since epoch
      var _exp = new Date();
      var _time = _exp.getTime();
      var _a = window.location.hostname.split('.');
      var _dm = _a[_a.length - 2] + '.' + _a[_a.length - 1];
      _satellite.setCookie('__ntap_global_id', _monster_cookie, 730);
    } else {
      _monster_cookie = _satellite.readCookie('__ntap_global_id');
    }
    s.eVar67 = _monster_cookie;	
    s.eVar68 = _satellite.readCookie('buyer_journey_stage');
    // Cleanse Data
    s.manageVars('cleanseVars')
  }

  s.doPlugins=s_doPlugins;

  /* Media Module Calls */
  s.enableVideoTracking = true;
  if(s.enableVideoTracking) {
    s.loadModule("Media");
    s.Media.autoTrack = false;
    s.Media.trackWhilePlaying=false;
    s.Media.trackVars="events,eVar2,eVar30";
    s.Media.trackEvents="event33,event34,event36,event37,event38,event39,event40";
    s.Media.trackMilestones="10,25,50,75";
    s.Media.playerName = "NetApp Single Video Chromeless Player";
    s.Media.segmentByMilestones = true;
    s.Media.trackUsingContextData = true;
    s.Media.contextDataMapping = {
      "a.media.name":"eVar2",
      "pageName":"eVar30",
      "currentURL":"eVar31",
      "a.media.timePlayed":"event34",
      "a.media.view":"event33",
      "a.media.complete":"event40",
      "a.media.milestones":{
         10:"event36",
         25:"event37",
         50:"event38",
         75:"event39"
      }
     };
   }
 
	// Set s.events String as context data
	if(s.events){
		var ea = s.events;
		if(s.events.indexOf(':')>-1){ //If serialized events exist
			ea = s.events.split(',');
			for(var f=0;f<ea.length;f++){
				if(ea[f].indexOf(':')>-1){
					ea[f] = ea[f].split(':')[0];	
				}
			}
			ea = ea.join();
		}
		s.contextData['events'] = s.events;
		s.linkTrackEvents=ea;		
	}

  if (typeof _satellite.dtmRuleStackArray == "undefined" ) {
    s.list3 = "";
  } else {
    s.list3 = _satellite.dtmRuleStackArray.join("|");    
  }

  if (s.list3 != "" ) { 
    _satellite.notify("RULESTACK :"+s.list3,1);
    _satellite.dtmRuleStackArray=[];
  }
	
}

//PostCallback Clear
s.registerPostTrackCallback(function(){
	s.clearVars();
});
   /* End Video Variable Mapping */

  /*************************** preSlib v1.45 **************************/

  // preSlib enabler functions
  function s_is(x){var t=x===null?'null':typeof x;if(t=='object'&&typeof x.length=='number')t='array';return t}
  function s_isNU(x){return s_is(x)=='null'}
  function s_isU(x){return s_is(x)=='undefined'}
  function s_isN(x){return s_is(x)=='number'}
  function s_isS(x){return s_is(x)=='string'}
  function s_isB(x){return s_is(x)=='boolean'}
  function s_isO(x){return s_is(x)=='object'}
  function s_isAO(x){return s_isA(x)||s_isO(x)}
  function s_isA(x){return s_is(x)=='array'}
  function s_isF(x){return s_is(x)=='function'}
  function s_MC(a,c){try{if(s_isS(c))c=c=='lc'?-1:c=='uc'?1:0;if(!s_isN(c))c=c?1:0;a+='';a=c<0?a.toLowerCase(a):c>0?a.toUpperCase(a):a}catch(e){}return a}
  function s_LC(a){return s_MC(a,'lc')}
  function s_UC(a){return s_MC(a,'uc')}
  function s_scrubWS(t){try{if(t==null)t='';t=t.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ')}catch(e){}return t}
  function s_split(l,d){var i,x=0,a=new Array;if(!d)d=',';while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length)}return a}
  function s_getHTMLtag(y){var a='',v='',g='',t='',f='',c='mc',p=arguments,l=p.length,i;if(!y)return f;if(l>1){i=s_LC(p[l-1]);if(i=='uc'||i=='lc'||i=='mc'){c=i;l--}}y=s_LC(y);if(l==2)g=s_LC(p[1]);else if(l>=3){a=s_LC(p[1]);v=s_MC(p[2],c);if(l>=4)g=s_MC(p[3],c)}if(document.getElementsByTagName)t=document.getElementsByTagName(y);if(typeof t!='object')return f;for(i=0;!f&&i<t.length;i++){f=t[i];if(a&&v&&s_MC(f.getAttribute(a),c)!=v)f=''}if(!f||typeof f!='object'||!g)return f;if(g!='text')return f.getAttribute(g);f=f.innerText||f.textContent||'';f=f.replace(/\s*>\s*/g,'>').replace(/^>+/,'').replace(/>+$/,'');return f}
  function s_parseUri(){var u=arguments.length==0?window.location.href:arguments[0],e,a=document.createElement('a'),p='',r={};a.setAttribute('href',u+'');for(e in a)if(typeof a[e]=='string')r[e]=a[e];delete a;a=null;p=r.pathname||'';if(p.indexOf('/')!=0)r.pathname='/'+p;return r}

  // preSlib utilities
  function s_setIf(){var O='object',L=null,a=arguments,al=a.length,S='',i,z=0,n,o=window,l=0,c=0,d=0;try{if(typeof a[al-1]=='number'){n=a[--al];l=n&1;c=n&2;d=n&4}if(al>=2&&(typeof a[0]!=O||typeof a[1]==O))S=a[z++];if(!S&&!d)return L;if(S&&(l||c)){try{if(l)S=s_LC(S);if(c)S=s_scrubWS(S)}catch(e){}}if(typeof a[z]==O)o=a[z++];for(i=z;i<al;i++){n=a[i];if(typeof n=='string'&&((!d&&S)||(d&&!o[n]))){try{o[n]=S;L=S}catch(e){}}}}catch(e){}return L}
  function s_def(){var a=arguments,b=new Array,i;for(i=0;i<a.length;i++)b.push.apply(b,[a[i]]);if(typeof b[i-1]=='number')b[i]|=4;else b.push.apply(b,[4]);return s_setIf.apply(this,b)}
  function s_toNum(t,f,l){var v=NaN,k=1,i=0,c,o,D='0123456789',d=0,u=typeof t,m=f?1e306:1e14;if(u=='number')return t;if(u=='object')t+='';if(u!='string'||!t)return NaN;for(;l&&i<t.length;i++){c=t.substring(i,i+1);if(c>' ')break}c=t.substring(i,i+1);if(!d&&c=='+')i++;if(!d&&c=='-'){k=-1;i++}if(f&&!d&&c=='.'){d=1;i++}for(;i<t.length;i++){c=t.substring(i,i+1);o=D.indexOf(c);if(f&&c=='.'&&!d)d=1;else{if(o<0)return l?k*v:NaN;if(v>m)return NaN;if(isNaN(v))v=0;if(d){d=d/10;v=v+o*d}else v=10*v+o}}return k*v}
  function s_toInt(t){var l=arguments.length>1&&!!arguments[1];return s_toNum(t,0,l)}
  function s_toFloat(t){var l=arguments.length>1&&!!arguments[1];return s_toNum(t,1,l)}
  function s_round(v,p,d,b){var N='number';if(typeof d!=N)d=NaN;if(typeof v!=N)v=s_toFloat(v);if(isNaN(v))return d;if(typeof p!=N||p<0)p=0;if(!b||typeof b!=N||b<2)b=10;p=Math.pow(b,isNaN(p)?0:p);return Math.floor(v*p+0.5)/p}
  function s_getCharSet(){var v=s_getHTMLtag('meta','http-equiv','content-type','content'),i;if(!v)return'';i=v.indexOf('charset=');if(i==-1)return'';return s_UC(v.substring(i+8,99).replace(/[\'\";, ].*/,''))}
  function s_getQueryStr(n,u){var g,h,i,a='&',q=u||window.location.search,p=q.toLowerCase().replace(/\?/g,a)+a;n=a+n.toLowerCase();g=n+'=';h=p.indexOf(g);if(h>-1){i=h+g.length;return decodeURIComponent(q.substring(i,p.indexOf(a,i)).replace(/\+/g,' '))}g=n+a;return p.indexOf(g)>-1?' ':''}
  function s_apl(l,v,d,u){var m=0;if(!l)l='';if(u){var i,n,a=s_split(l,d);for(i=0;i<a.length;i++){n=a[i];m=m||(u==1?(n==v):(s_LC(n)==s_LC(v)))}}if(!m)l=l?l+d+v:v;return l}
  function s_getShortHn(){return s_LC(s_parseUri((arguments.length>0)?arguments[0]:window.location.href).hostname.replace(/^www-?[0-9]*\./i,''))}
  function s_getOwnerHn(){return s_LC(s_parseUri((arguments.length>0)?arguments[0]:window.location.href).hostname.replace(/^www[0-9]*\./i,'').replace(/\.(gov|edu|com|mil|org|net|int).*/,'').replace(/\.[a-z][a-z]$/,'').replace(/.*\./,''))}
  function s_getTLDlevels(){var h=s_parseUri(arguments.length>0?arguments[0]:window.location.href).hostname;return h.match(RegExp("\\.co\\..{2}$","i"))||h.match(RegExp("\\.(gov|edu|com|mil|org|net|int)\\..{2}$","i"))?3:2}
  function s_getCookieDomain(){var h=s_parseUri((arguments.length>0)?arguments[0]:window.location.href).hostname,n=s_getTLDlevels(),a=s_split(h,'.'),i=a.length-n;for(h='';i<a.length;i++)h+='.'+a[i];return h}
  function s_c_w(n,v,e,p,d){if(n){v+='';var t=v?'':-60,e;if(e&&t){e=new Date;e.setTime(e.getTime()+(t*1000))}document.cookie=n+'='+escape(v)+';'+' path='+(p||'/')+';'+(e?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s_c_r(n)==v}}
  function s_c_r(n){var c=' '+document.cookie,i=c.indexOf(' '+n+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':unescape(c.substring(i+2+n.length,e<0?c.length:e));return v}
  function s_c_d(n,p,d,s){document.cookie=n+'=;'+' expires=Thu, 01 Jan 1970 00:00:01 GMT;'+' path='+(p||'/')+(d?' domain='+d+';':'')+(s?' secure':'')}
  function s_findCode(a,c){var i=0,j;if(typeof a!='string')return'';for(a=s_LC(a);i<c.length;i+=2){j=c.substring(i,i+2);if(a==j)return j}return''}
  function s_findCC(a){var c='adaeafagaialamanaoaqarasatauawaxazbabbbdbebfbgbhbibjblbmbnbobrbsbtbvbwbybzcacccdcfcgchcickclcmcncocrcucvcxcyczdedjdkdmdodzeceeegeheresetfifjfkfmfofrgagbgdgegfggghgiglgmgngpgqgrgsgtgugwgyhkhmhnhrhthuidieiliminioiqirisitjejmjojpkekgkhkikmknkpkrkwkykzlalblclilklrlsltlulvlymamcmdmemfmgmhmkmlmmmnmompmqmrmsmtmumvmwmxmymznancnenfngninlnonpnrnunzompapepfpgphpkplpmpnprpsptpwpyqarerorsrurwsasbscsdsesgshsisjskslsmsnsosrstsvsysztctdtftgthtjtktltmtntotrtttvtwtzuaugumusuyuzvavcvevgvivnvuwfwsyeytzazmzw';if(typeof s_findCCadd=='string')c+=s_findCCadd.replace(/,/g,'');return s_findCode(a,c)}
  function s_findLC(a){var l='abaaaeafakamanarasavayazbabebgbhbibmbnbobrbscacechcocrcscucvcydadedvdzeeeleneoeseteufafffifjfofrfygagdglgngugvhahehihohrhthuhyhziaidieigiiikioisitiujajvkakgkikjkkklkmknkokrkskukvkwkylalblglilnloltlulvmgmhmimkmlmnmrmsmtmynanbndnengnlnnnonrnvnyocojomorospapiplpsptqurmrnrorurwsascsdsesgsiskslsmsnsosqsrssstsusvswtatetgthtitktltntotrtstttwtyugukuruzvevivowawoxhyiyozazhzu';return s_findCode(a,l)}
  function s_matchList(v,l,m,d,c){if(s_isS(m)&&m.length==1){c=d;d=m;m=0}if(s_isN(m)){c=m;m=d=0}if(s_isN(d)){c=d;d=0}if(!d)d=',';if(s_isS(l))l=s_split(l,d);if(s_isS(m))m=s_split(m,d);if(!s_isAO(m))m=0;if(s_isS(v)){v=s_MC(v,c);for(var i=0,n=m.length;i<l.length;i++)if(v==s_MC(l[i],c))return!m?true:i<n?m[i]:n>0?m[n-1]:v}return m?v:false}
  function s_mapURLs(l){var O='object',U='undefined',S='string',g=function(p,t,v){var i,e,r,x,m,j=0,a,d=typeof v!=O,m,z,q;if(d)var v={Match:0};for(i in t){q=null;r=typeof t[i]==O?t[i]:{};if(typeof r.defaults==U)r.defaults=0;x=typeof r.urls==S?r.urls:'~';m=d?r.defaults:!r.defaults&&x=='';if(!m&&!d){try{q=new RegExp(x,'');m=q.test(p)}catch(z){}}if(m){if(!d)v.Match=j;for(e in r){if(e!='urls'&&e!='defaults'){z=r[e];if(!d&&x&&typeof z==S&&z.indexOf('$')>-1&&q){m=q.exec(p);if(m.length>1)z=m[0].replace(q,z);z=z.replace(/\$[0-9]/g,'')}v[e]=z}}return v}j++}return v},v=null,u=s_parseUri(arguments.length>1?arguments[1]:window.location.href),p=u.hostname+u.pathname+u.search;try{if(typeof l==O){v=g(p,l,0);v=g(p,l,v)}}catch(e){}if(typeof v!=O)v={Match:0};if(typeof v.Match!='number')v.Match=0;return v}
  function s_intercept(f,n,c){var F='function',T='typeof ',O='object',o=c||'window',g='',r='';f=o+'.'+f;var r=f+'_orig';try{if(eval(T+o)==O&&eval(T+r)!=F&&eval(T+f)==F&&eval(T+n)==F){eval(r+'='+f+';'+f+'='+n);g=r}}catch(e){}return g}
  function s_deintercept(f,c){var F='function',T='typeof ',O='object',o=c||'window',g='',r='';f=o+'.'+f;r=f+'_orig';try{if(eval(T+o)==O&&eval(T+r)==F&&eval(T+f)==F){eval(f+'='+r+';'+r+'=null');g=f}}catch(e){}return g}
  function s_loadJS(p,a){try{if(p)if(a){var e=document.createElement('script');e.type='text/javascript';e.language='JavaScript';e.async=true;e.src=p;var j=document.getElementsByTagName('script')[0];j.parentNode.insertBefore(e,j)}else{document.write('<scr'+'ipt type="text/javascript" language="JavaScript" src="'+p+'"></sc'+'ript>')}}catch(e){}}
  function s_clt(n){try{var o=0,r=true,a=arguments,l=a.length,t='o',i=1,v;if(typeof window.s=='object'){o={linkTrackVars:s.linkTrackVars||'',linkTrackEvents:s.linkTrackEvents||'',events:s.events||''}}else{s=s_gi(s_account)}if(!s.events||typeof s.events!='string'||s.events.toLowerCase=='none')s.events='';if(typeof s!='object')return r;if(l>1&&a[1].length==1){t=a[1];i=2}while(i<l){v=a[i++].replace(/^v([0-9])$/,'eVar$1').replace(/^c([0-9])$/,'prop$1').replace(/^e([0-9])/,'event$1');if(v.indexOf('event')==0){s.linkTrackEvents=s.apl(s.linkTrackEvents,v,',',1);s.events=s.apl(s.events,v,',',1);v='events'}else if(i<l){if(o)o[v]=s[v]||'';s[v]=a[i++]}s.linkTrackVars=s.apl(s.linkTrackVars,v,',',1)}r=s.tl(1,t,n);if(o)for(i in o)s[i]=o[i]}catch(e){}return r}
  function s_ta(){try{var i,b=('campaign,channel,events,hier1,hier2,hier3,hier4,hier5,list1,list2,list3,pageName,pageType,pageURL,pev2,products,purchaseID,referrer,server,state,transactionID,visitorID,zip').split(','),c=function(n,i){eval('if(s.'+n+i+")s."+n+i+'=\'\'')},m=function(n){if(window['s_'+n]){s[n]=window['s_'+n]}};if(typeof window.s=='object'){for(i=1;i<=75;i++){c('prop',i);c('eVar',i)}for(i=0;i<b.length;i++)c(b[i],'')}else{s=s_gi(s_account)}if(typeof s=='object'){m('linkInternalFilters');m('linkTrackVars');m('linkTrackEvents');return s.t()}}catch(e){}return''}
  function s_saveAcc(){if(window.s_account&&!window.s_errorPage){s_c_w('s_gpv_acc',s_account);s_c_w('s_gpv_url',window.location.href)}}
  function s_restoreAcc(){if(typeof s=='undefined'){s_account='';var a=s_c_r('s_gpv_acc');if(a)s_account=a}if(!s_errorRef)s_errorRef=s_c_r('s_gpv_url')}
  function s_jsFileInfo(m){if(!m)m='';var u,f,c,v,d,l,t,i,j,e,o;try{throw new RangeError('')}catch(z){e=z}u=f=c=v=d=l='';if(!m&&e&&e.fileName)u=e.fileName;else{t=document.getElementsByTagName('script');if(t){for(i=t.length;--i>=0;){u=t[i].src;if(u&&(m&&u.indexOf(m)>-1)||u.match(/\.js$/))break}if(!m&&i<0)i=t.length-1;u=i>=0?t[i].src:''}}f=typeof window.s_fileVer=='string'?s_fileVer:'';c=typeof window.s=='object'&&s.version?s.version:'';v=f+(c&&f?' ':'')+c;l=u+(u&&v?' ':'')+v;d=l.replace(/.*\//,'').replace(/\.js/,'');o={url:u,fver:f,cver:c,ver:v,desc:d,ldesc:l};return o}
  function s_getLoadTime(){if(!window.s_loadT){var o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round(((o.domInteractive||new Date().getTime())-a)/100):''}return s_loadT}
  function s_clog(){try{var A='array',O='object',U='undefined',F='function',a=arguments,al=a.length,i,j,v,l='',o=l,e=l,c=l,x=0,d=0,z=0,p,q,f0=1,f1=1,f3=1,m=1<<16,W=function(o){try{c+=o+'\n';if(window.s_Debug){if(typeof s_debugW!=O)s_debugW=window.open('','_debugWin','height=600,width=900,toolbar=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes');if(typeof s_debugW==O){if(typeof s_debugD!=O)s_debugD=s_debugW.document;if(typeof s_debugD==O){if(typeof s_debugD.write==F)s_debugD.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><html><head><title>debugWin</title><style>* {font-family:Andale Mono,OCR A Extended,Consolas,monospace,serif;font-size:9pt;word-wrap:break-word;padding:0px} p {display:block;clear:both;margin:1px;width:100%;border:none;border-bottom:1px solid #dddddd;}</style></head><body>');if(typeof s_debugD.write==F)s_debugD.write('<p>'+o.replace(/[ \t]/g,'&nbsp;').replace(/\</gi,'&lt;').replace(/\>/gi,'&gt;').replace(/\n$/,'').replace(/\n/gi,'<br/>')+'</p>');if(typeof s_debugW.scrollBy==F)s_debugW.scrollBy(0,100)}}}else if(typeof console.log==F||typeof console.log==O){console.log('%s',o)}}catch(e){}},B=function(v){v=v+'';var j,b,r,w,c,f=1;for(j=0;j<v.length;j++){b=v.substr(j,1);r=b=='\n';w=b<=' ';c=b<'A';if(r||(f&&c&&l.length>140)||(f&&l.length+v.substring(j).replace(/\n.*/,'').length>140)){o+=l;z+=o.length;if(o.length>2048){W(o);o=''}else o+='\n';l=r?'':'  ';x=!r;f=0}if(!r&&(!x||!w)){l+=b;x=f=0}}},P=function(v){var d=0,i,err=0,T=function(z){var t=z===null?'null':typeof z;if(t=='array')t='object';return t},u=function(z){var t=T(z);if(t=='string')B("'"+z+"'");else if(t=='boolean')B(z?'true':'false');else if(t=='function')B('function(){...}');else if(t=='null')B('null');else if(t=='undefined')B('undefined');else B(z+'')},b=function(v){if(++d>99){d--;B('/* ERROR! TRUNCATED: TOO DEEP */');return}var o=typeof v=='object'&&typeof v.length!='number',p,x,f=1,j=0;B(o?'{':'[');for(p in v){j++;B(f?'':',');if(o){B('\n');for(i=0;i<d;i++)B(' ')}if(j>1000){B('/* ERROR! TRUNCATED: TOO LARGE */');err=1}if(!err){if(o)B(p+': ');x=v[p];if(T(x)!='object')u(x);else b(x)}f=0}d--;if(o){B('\n');for(i=0;i<d;i++)B(' ');B('}')}else B(']')};if(T(v)!='object')u(v);else b(v)},FN=function(c){var n='',v,j;try{if(c){c=c+'';if(!c.indexOf('function '))c=c.substring(9);j=c.indexOf('(');if(j>-1)c=c.substring(0,j);if(!c)c='anonymous';n=c}}catch(e){}return n};var dp=s_getQueryStr('s_debug');if(dp>''){dp=dp==' '?1:parseInt(dp)||0;s_c_w('s_debug',String(dp))}dp=s_c_r('s_debug');s_Debug=dp>''?parseInt(dp):window.s_Debug||0;for(i=0;i<al;i++){v=a[i];if(typeof v==O){for(p in v){if(z<m&&z>=0){if(isNaN(p))B(p+'=');P(v[p])}}}else if(v=='-f'){f0=0}else if(v=='+f'){f0=1}else if(v=='-u'){f1=0}else if(v=='+u'){f1=1}else if(v=='+n'){f2=1}else if(v=='+n'){f2=1}else if(v=='arguments'){v=arguments.callee.caller;for(j=v;j;j=j.caller)q=FN(j)+(q?'>'+q:'');B(q);P(v.arguments)}else if(v=='function'){B(FN(arguments.callee.caller))}else if(v=='stack'){B(st())}else B(v);B(' ')}o+=l;o=o.replace(/^[ \t]*\n/,'').replace(/[ \t\n]*$/,'');if(o)W(o)}catch(e){}return c}
  function s_getVisitStart(c){d=s_getVisitDuration();return d<.1}
  function s_getVisitDuration(c){if(!c)c='s_dur';var M=60000,V=1800000,a=new Date(),t=a.getTime(),v=s_toInt(s_c_r(c)),d=0;if(isNaN(v)||(t-v)>V)v=t;d=t-v;a.setTime(t+1800000);s_c_w(c,v+'',a);c=s_c_r(c);return d/M}
  function s_getVisitNum(p,a,b){var D=new Date,P,V,T=D.getTime(),d,i,t=0,k,o,y,H=1800000,s_dimo=function(m,y){var d=new Date(y,m+1,0);return d.getDate()},s_endof=function(x){var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=='m')d=s_dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;else if(x=='w')d=7-t.getDay();else d=1;t.setDate(t.getDate()+d);return t};if(!p)p='m';if(p=='m'||p=='w'||p=='d'){o=s_endof(p);y=o.getTime();D.setTime(y)}else{d=p*86400000;D.setTime(T+d)}if(!a)a='s_vnum';if(!b)b='s_invisit';P=s_c_r(a);if(P){i=P.indexOf('&vn=');t=s_toInt(P.substring(i+4,P.length));if(isNaN(t)||t<0)t=0}V=s_c_r(b);if(V){if(t){D.setTime(T+H);s_c_w(b,'Y',D)}return t}else{if(t){t++;k=P.substring(0,i);D.setTime(k);s_c_w(a,k+'&vn='+t,D);D.setTime(T+H);s_c_w(b,'true',D);return t}else{s_c_w(a,D.getTime()+'&vn=1',D);D.setTime(T+H);s_c_w(b,'Y',D);return 1}}return 1}
  function s_getDaysSinceLastVisit(k,f){if(typeof k!='string'||!k){f=k?k:1;k=''}k=k||'s_lv';f=!!f;var M=60000,V=30*M,D=48*V,a=new Date(),t=a.getTime(),l=k+'_s',u=s_c_r(k),v=s_c_r(l),c=new Date(t+V),d=new Date(t+999*D),x=0;u=u&&!isNaN(u)?parseInt(u):0;if(u&&v&&!isNaN(v)){x=parseInt(v)}else{x=u?Math.floor((t-u)/D+0.5):-1;if(x>999)x=999;if(x<0)x=-1;a=new Date(a.getFullYear(),a.getMonth(),a.getDate());t=a.getTime();s_c_w(k,t,d)}s_c_w(l,x+'',c);if(!f)x=x<0?'New':(x<7?'Less than '+(x<1?'1 day':'7 days'):('More than '+(x<30?'7':'30')+' days'));return x}

  // END preSlib


  /************************** PLUGINS SECTION *************************/
  /* You may insert any plugins you wish to use here.                 */

  /*
   * Custom Code: Brightcove Smart Analytics v2.2
   */

  var player, APIModules, mediaEvent, modVP, modExp, modCon, modCap, videoName, videoLength, videoOffset, videoId, videoName;

  var videoPlayerName = "NetApp Single Video Chromeless Player";

  function onTemplateLoad(experienceID) {
    player = brightcove.api.getExperience(experienceID);
    APIModules = brightcove.api.modules.APIModules;
    mediaEvent = brightcove.api.events.MediaEvent;
  }
  function onTemplateReady(evt) {
    modVP = player.getModule(APIModules.VIDEO_PLAYER);
    modExp = player.getModule(APIModules.EXPERIENCE);
    modCon = player.getModule(APIModules.CONTENT);

    // Function to allow API call in _netapp.ui.videoPlayer.js when template is ready
    modVP.play();
    netapp.ui.videoPlayer.enhancements();
    // API events to track player analytics
    modVP.addEventListener(mediaEvent.PLAY, onPlay);
    modVP.addEventListener(mediaEvent.STOP, onStop);
    // modVP.addEventListener(brightcove.api.events.MediaEvent.PROGRESS, onProgress);
  }

  //for the generic video witout play button on it
  function onTRVideo(evt) {
    modVP = player.getModule(APIModules.VIDEO_PLAYER);
    modExp = player.getModule(APIModules.EXPERIENCE);
    modCon = player.getModule(APIModules.CONTENT);

    // Function to allow API call in _netapp.ui.videoPlayer.js when template is ready
    //modVP.play();
    netapp.ui.videoPlayer.enhancements();
    // API events to track player analytics
    modVP.addEventListener(mediaEvent.PLAY, onPlay);
    modVP.addEventListener(mediaEvent.STOP, onStop);
    // modVP.addEventListener(brightcove.api.events.MediaEvent.PROGRESS, onProgress);
  }

  function onPlay(evt) {
    videoFriendlyName = evt.media.displayName;
    videoLength = Math.floor(evt.duration);
    videoOffset = Math.floor(evt.position);
    videoId = (evt.media.id).toString();
    videoName = videoFriendlyName;

    if (videoOffset == 0) {
      s.Media.open(videoName,videoLength,videoPlayerName);
      s.Media.play(videoName,videoOffset);
    } else {
      s.Media.play(videoName,videoOffset);
    } 
  }

  function onStop(evt) {
    videoOffset = Math.floor(evt.position);

    if (videoOffset == videoLength) {
      s.Media.stop(videoName,videoOffset);
      s.Media.close(videoName);
    } else {
      s.Media.stop(videoName,videoOffset);
    }
  }
 
  /*
   * Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
   */
  s.getNewRepeat=new Function(""
  +"var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
  +"(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
  +"'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
  +".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
  +"al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
  +"n 'Repeat';");
  /*
   * Plugin: getValOnce 0.2 - get a value once per session or number of days
   */
  s.getValOnce=new Function("v","c","e",""
  +"var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
  +");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
  +" v==k?'':v");
  /*
   * Plugin Utility: apl v1.1
   */
  s.apl=new Function("L","v","d","u",""
  +"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
  +"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
  +"e()));}}if(!m)L=L?L+d+v:v;return L");
  /*
   * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
   */
  s.split=new Function("l","d",""
  +"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
  +"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

  /* Plugin: getPercentPageViewed v1.74 */
  s.getPercentPageViewed=new Function("n",""
  +"var s=this,W=window,EL=W.addEventListener,AE=W.attachEvent,E=['load"
  +"','unload','scroll','resize','zoom','keyup','mouseup','touchend','o"
  +"rientationchange','pan'],K='s_ppv',P=K+'l',I=n||s.pageName||documen"
  +"t.location.href;W.s_Obj=s;if(!W.s_PPVevent){s.s_PPVg=function(n,o){"
  +"var c=s.c_r(o?P:K)||'',a=c.indexOf(',')>-1?c.split(',',10):[''],i;a"
  +"[0]=o?unescape(a[0]||''):I;for(i=1;i<9&&(i<a.length||!o);i++)a[i]=a"
  +"[i]?parseInt(a[i])||0:0;if(a.length>9||!o)a[9]=a[9]&&a[9]!='L'&&a[9"
  +"]!='LP'&&a[9]!='PL'?'P':a[9];return a};s.c_w(P,s.c_r(K)||'');s.c_w("
  +"K,escape(I)+',0,0,0,0,0,0,0,0');W.s_PPVevent=function(e){var W=wind"
  +"ow,D=document||{},B=D.body,E=D.documentElement||{},S=window.screen|"
  +"|{},Ho='offsetHeight',Hs='scrollHeight',Ts='scrollTop',Wc='clientWi"
  +"dth',Hc='clientHeight',M=Math,C=100,J='object',N='number',Z=',',s=W"
  +".s_Obj||W.s||0;e=e&&typeof e==J?e.type||'':'';if(!e.indexOf('on'))e"
  +"=e.substring(2);if(W.s_PPVt&&!e){clearTimeout(s_PPVt);s_PPVt=0}if(s"
  +"&&typeof s==J&&B&&typeof B==J){var h=M.max(B[Hs]||E[Hs],B[Ho]||E[Ho"
  +"],B[Hc]||E[Hc]||1),X=W.innerWidth||E[Wc]||B[Wc]||1,Y=W.innerHeight|"
  +"|E[Hc]||B[Hc]||1,x=S.width||1,y=S.height||1,r=M.round(C*(W.devicePi"
  +"xelRatio||1))/C,b=(D.pageYOffset||E[Ts]||B[Ts]||0)+Y,p=h>0&&b>0?M.r"
  +"ound(C*b/h):1,O=W.orientation,o=!isNaN(O)?M.abs(O)%180:Y>X?0:90,a=s"
  +".s_PPVg(n),L=(e=='load')||(a[1]<1),t,V=function(u,v,f,n){v=typeof v"
  +"!=N?u:v;v=f||(u>v)?u:v;return n?v:v>C?C:v<0?0:v};if(new RegExp('(iP"
  +"od|iPad|iPhone)').exec((window.navigator&&navigator.userAgent)||'')"
  +"&&o){t=x;x=y;y=t}o=o?'L':'P';a[9]=L||!a[9]?o:a[9].substring(0,1);if"
  +"(a[9]!='L'&&a[9]!='P')a[9]=o;s.c_w(K,escape(a[0])+Z+V(a[1],p,!L)+Z+"
  +"V(a[2],p,L)+Z+V(a[3],b,L,1)+Z+X+Z+Y+Z+x+Z+y+Z+r+Z+a[9]+(a[9]==o?'':"
  +"o))}if(!W.s_PPVt&&e!='unload')W.s_PPVt=setTimeout(W.s_PPVevent,333)"
  +"};for(var f=W.s_PPVevent,i=0;i<E.length;i++)if(EL)EL(E[i],f,false);"
  +"else if(AE)AE('on'+E[i],f);f()};var a=s.s_PPVg(n,1);return!argument"
  +"s.length||n=='-'?a[1]:a");

  /* Plugin: getPreviousValue v1.0  */
  s.getPreviousValue=new Function("v","c","el",""
  +"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
  +"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
  +"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
  +":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
  +"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

  /* Plugin: Performance Timing Tracking - 0.11 BETA */
  s.performanceTiming=new Function("v",""
  +"var s=this;if(v)s.ptv=v;if(typeof performance!='undefined'){if(perf"
  +"ormance.timing.loadEventEnd==0){s.pi=setInterval(function(){s.perfo"
  +"rmanceWrite()},250);}if(!s.ptc||s.linkType=='e'){s.performanceRead("
  +");}else{s.rfe();s[s.ptv]='';}}");
  s.performanceWrite=new Function("",""
  +"var s=this;if(performance.timing.loadEventEnd>0)clearInterval(s.pi)"
  +";try{if(s.c_r('s_ptc')==''&&performance.timing.loadEventEnd>0){try{"
  +"var pt=performance.timing;var pta='';pta=s.performanceCheck(pt.fetc"
  +"hStart,pt.navigationStart);pta+='^^'+s.performanceCheck(pt.domainLo"
  +"okupStart,pt.fetchStart);pta+='^^'+s.performanceCheck(pt.domainLook"
  +"upEnd,pt.domainLookupStart);pta+='^^'+s.performanceCheck(pt.connect"
  +"End,pt.connectStart);pta+='^^'+s.performanceCheck(pt.responseStart,"
  +"pt.connectEnd);pta+='^^'+s.performanceCheck(pt.responseEnd,pt.respo"
  +"nseStart);pta+='^^'+s.performanceCheck(pt.loadEventStart,pt.domLoad"
  +"ing);pta+='^^'+s.performanceCheck(pt.loadEventEnd,pt.loadEventStart"
  +");pta+='^^'+s.performanceCheck(pt.loadEventEnd,pt.navigationStart);"
  +"s.c_w('s_ptc',pta);if(sessionStorage&&navigator.cookieEnabled&&s.pt"
  +"v!='undefined'){var pe=performance.getEntries();var tempPe='';for(v"
  +"ar i=0;i<pe.length;i++){tempPe+='!';tempPe+=pe[i].name.indexOf('?')"
  +">-1?pe[i].name.split('?')[0]:pe[i].name;tempPe+='|'+(Math.round(pe["
  +"i].startTime)/1000).toFixed(1)+'|'+(Math.round(pe[i].duration)/1000"
  +").toFixed(1)+'|'+pe[i].initiatorType;}sessionStorage.setItem('s_pec"
  +"',tempPe);}}catch(err){return;}}}catch(err){return;}");
  s.performanceCheck=new Function("a","b",""
  +"if(a>=0&&b>=0){if((a-b)<60000&&((a-b)>=0)){return((a-b)/1000).toFix"
  +"ed(2);}else{return 600;}}");
  s.performanceRead=new Function("",""
  +"var s=this;if(performance.timing.loadEventEnd>0)clearInterval(s.pi)"
  +";var cv=s.c_r('s_ptc');if(s.pte){var ela=s.pte.split(',');}if(cv!='"
  +"'){var cva=s.split(cv,'^^');if(cva[1]!=''){for(var x=0;x<(ela.lengt"
  +"h-1);x++){s.events=s.apl(s.events,ela[x]+'='+cva[x],',',2);}}s.even"
  +"ts=s.apl(s.events,ela[ela.length-1],',',2);}s.linkTrackEvents=s.apl"
  +"(s.linkTrackEvents,s.pte,',',2);s.c_w('s_ptc','',0);if(sessionStora"
  +"ge&&navigator.cookieEnabled&&s.ptv!='undefined'){s[s.ptv]=sessionSt"
  +"orage.getItem('s_pec');sessionStorage.setItem('s_pec','',0);}else{s"
  +"[s.ptv]='sessionStorage Unavailable';}s.ptc=true;");
  /* Remove from Events 0.1 - Performance Specific, 
  removes all performance events from s.events once being tracked. */
  s.rfe=new Function("",""
  +"var s=this;var ea=s.split(s.events,',');var pta=s.split(s.pte,',');"
  +"try{for(x in pta){s.events=s.rfl(s.events,pta[x]);s.contextData['ev"
  +"ents']=s.events;}}catch(e){return;}");
  /* Plugin Utility - RFL (remove from list) 1.0*/
  s.rfl=new Function("l","v","d1","d2","ku",""
  +"var s=this,R=new Array(),C='',d1=!d1?',':d1,d2=!d2?',':d2,ku=!ku?0:"
  +"1;if(!l)return'';L=l.split(d1);for(i=0;i<L.length;i++){if(L[i].inde"
  +"xOf(':')>-1){C=L[i].split(':');C[1]=C[0]+':'+C[1];L[i]=C[0];}if(L[i"
  +"].indexOf('=')>-1){C=L[i].split('=');C[1]=C[0]+'='+C[1];L[i]=C[0];}"
  +"if(L[i]!=v&&C)R.push(C[1]);else if(L[i]!=v)R.push(L[i]);else if(L[i"
  +"]==v&&ku){ku=0;if(C)R.push(C[1]);else R.push(L[i]);}C='';}return s."
  +"join(R,{delim:d2})");
  /*
   *  Plug-in: crossVisitParticipation v1.7 - stacks values from
   *  specified variable in cookie and returns value
   */

  s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv",""
      +"var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
      +" ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
      +"ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
      +"f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
      +"v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
      +";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
      +"ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
      +"[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
      +"5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
      +"gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
      +").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
      +" Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
      +"getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
      +"]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
      +"front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
      +"m:dl});if(ce)s.c_w(cn,'');return r;");

  /*
   * s.join: 1.0 - Joins an array into a string
   */
  s.join = new Function("v","p",""
      +"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
      +":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
      +";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
      +"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

  /*
   * Plugin Utility: Replace v1.0
   */
  s.repl=new Function("x","o","n",""
      +"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
      +"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

  /*
   * Plugin: getVisitNum - version 3.0
   */
  s.getVisitNum=new Function("tp","c","c2",""
      +"var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}"
      +"if(tp=='m'||tp=='w'||tp=='d'){eo=s.endof(tp),y=eo.getTime();e.setTi"
      +"me(y);}else {d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!"
      +"c2){c2='s_invisit';}cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn="
      +"'),str=cval.substring(i+4,cval.length),k;}cvisit=s.c_r(c2);if(cvisi"
      +"t){if(str){e.setTime(ct+1800000);s.c_w(c2,'true',e);return str;}els"
      +"e {return 'unknown visit number';}}else {if(str){str++;k=cval.substri"
      +"ng(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);"
      +"s.c_w(c2,'true',e);return str;}else {s.c_w(c,e.getTime()+'&vn=1',e)"
      +";e.setTime(ct+1800000);s.c_w(c2,'true',e);return 1;}}");
  s.dimo=new Function("m","y",""
      +"var d=new Date(y,m+1,0);return d.getDate();");
  s.endof=new Function("x",""
      +"var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=="
      +"'m'){d=s.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if("
      +"x=='w'){d=7-t.getDay();}else {d=1;}t.setDate(t.getDate()+d);return "
      +"t;");
  /* Utility: manageVars v1.41  */
  s.manageVars=new Function("c","l","f",""
  +"var s=this,vl,la,vla;l=l?l:'';f=f?f:1;if(!s[c])return false;vl='pag"
  +"eName,purchaseID,channel,server,pageType,campaign,state,zip,events,"
  +"products,transactionID';for(var n=1;n<251;n++){vl+=',prop'+n+',eVar'"
  +"+n+',hier'+n+',list'+n;}if(l&&(f==1||f==2)){if(f==1){vl=l;}if(f==2)"
  +"{la=s.split(l,',');vla=s.split(vl,',');vl='';for(x in la){for(y in "
  +"vla){if(la[x]==vla[y]){vla[y]='';}}}for(y in vla){vl+=vla[y]?','+vl"
  +"a[y]:'';}}s.pt(vl,',',c,0);return true;}else if(l==''&&f==1){s.pt(v"
  +"l,',',c,0);return true;}else{return false;}");
  s.pt=new Function("x","d","f","a",""
  +"var s=this,t=x,z=0,y,r,l='length';while(t){y=t.indexOf(d);y=y<0?t[l"
  +"]:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d[l];t=x.subs"
  +"tring(z,x[l]);t=z<x[l]?t:''}return''");
  s.cleanseVars=new Function("t",""
  +"var s=this;if(s[t]&&t!='events'){s[t]=s.cleanStr(s[t]);}");
  /* Utility: cleanStr 1.0 */
  s.cleanStr = function(a) {
    if (typeof a != 'undefined') {
      if (typeof a == "string") {
        a = a.replace(/<\/?[^>]+(>|$)/g, '');
        a = a.replace(/^\s+|\s+$/g, '');
        a = a.replace(/[\u2018\u2019\u201A]/g, "\'");
        return a;
   
      }
 
	
  
						  
   
    }
  }
 
  /*
   * Plugin: getLoadTime new
   */
  function s_getLoadTime(){if(!window.s_loadT){var b=new Date().getTime(),o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round((b-a)/100):''}return s_loadT}


  //BEGIN DEMANDBASE CODE
  try {
    if (window.sessionStorage) {
          var standardDimensions = sessionStorage.getItem('s_dmdbase') || '';
          var customDimensions1 = sessionStorage.getItem('s_dmdbase_custom1') || '';
          var customDimensions2 = sessionStorage.getItem('s_dmdbase_custom2') || '';
          var customDimensions3 = sessionStorage.getItem('s_dmdbase_custom3') || '';
          var customDimensions4 = sessionStorage.getItem('s_dmdbase_custom4') || '';

          s.contextData.s_dmdbase = standardDimensions;
          s.contextData.s_dmdbase_custom1 = customDimensions1;
          s.contextData.s_dmdbase_custom2 = customDimensions2;
          s.contextData.s_dmdbase_custom3 = customDimensions3;
          s.contextData.s_dmdbase_custom4 = customDimensions4;
    }
  }
 
  catch (e) {
      if(window.console){console.log("DB _ ERR " + e.message);}
  }

  function AppMeasurement_Module_Integrate(l){var c=this;c.s=l;var e=window;e.s_c_in||(e.s_c_il=[],e.s_c_in=0);c._il=e.s_c_il;c._in=e.s_c_in;c._il[c._in]=c;e.s_c_in++;c._c="s_m";c.list=[];c.add=function(d,b){var a;b||(b="s_Integrate_"+d);e[b]||(e[b]={});a=c[d]=e[b];a.a=d;a.e=c;a._c=0;a._d=0;void 0==a.disable&&(a.disable=0);a.get=function(b,d){var f=document,h=f.getElementsByTagName("HEAD"),k;if(!a.disable&&(d||(v="s_"+c._in+"_Integrate_"+a.a+"_get_"+a._c),a._c++,a.VAR=v,a.CALLBACK="s_c_il["+c._in+"]."+
  a.a+".callback",a.delay(),h=h&&0<h.length?h[0]:f.body))try{k=f.createElement("SCRIPT"),k.type="text/javascript",k.setAttribute("async","async"),k.src=c.c(a,b),0>b.indexOf("[CALLBACK]")&&(k.onload=k.onreadystatechange=function(){a.callback(e[v])}),h.firstChild?h.insertBefore(k,h.firstChild):h.appendChild(k)}catch(l){}};a.callback=function(b){var c;if(b)for(c in b)Object.prototype[c]||(a[c]=b[c]);a.ready()};a.beacon=function(b){var d="s_i_"+c._in+"_Integrate_"+a.a+"_"+a._c;a.disable||(a._c++,d=e[d]=
  new Image,d.src=c.c(a,b))};a.script=function(b){a.get(b,1)};a.delay=function(){a._d++};a.ready=function(){a._d--;a.disable||l.delayReady()};c.list.push(d)};c._g=function(d){var b,a=(d?"use":"set")+"Vars";for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&b[a])try{b[a](l,b)}catch(e){}};c._t=function(){c._g(1)};c._d=function(){var d,b;for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&0<b._d)return 1;return 0};c.c=function(c,b){var a,e,g,f;"http"!=b.toLowerCase().substring(0,4)&&
  (b="http://"+b);l.ssl&&(b=l.replace(b,"http:","https:"));c.RAND=Math.floor(1E13*Math.random());for(a=0;0<=a;)a=b.indexOf("[",a),0<=a&&(e=b.indexOf("]",a),e>a&&(g=b.substring(a+1,e),2<g.length&&"s."==g.substring(0,2)?(f=l[g.substring(2)])||(f=""):(f=""+c[g],f!=c[g]&&parseFloat(f)!=c[g]&&(g=0)),g&&(b=b.substring(0,a)+encodeURIComponent(f)+b.substring(e+1)),a=e));return b}}

  function AppMeasurement_Module_Media(q){var b=this;b.s=q;q=window;q.s_c_in||(q.s_c_il=[],q.s_c_in=0);b._il=q.s_c_il;b._in=q.s_c_in;b._il[b._in]=b;q.s_c_in++;b._c="s_m";b.list=[];b.open=function(d,c,e,k){var f={},a=new Date,l="",g;c||(c=-1);if(d&&e){b.list||(b.list={});b.list[d]&&b.close(d);k&&k.id&&(l=k.id);if(l)for(g in b.list)!Object.prototype[g]&&b.list[g]&&b.list[g].R==l&&b.close(b.list[g].name);f.name=d;f.length=c;f.offset=0;f.e=0;f.playerName=b.playerName?b.playerName:e;f.R=l;f.C=0;f.a=0;f.timestamp=
  Math.floor(a.getTime()/1E3);f.k=0;f.u=f.timestamp;f.c=-1;f.n="";f.g=-1;f.D=0;f.I={};f.G=0;f.m=0;f.f="";f.B=0;f.L=0;f.A=0;f.F=0;f.l=!1;f.v="";f.J="";f.K=0;f.r=!1;f.H="";f.complete=0;f.Q=0;f.p=0;f.q=0;b.list[d]=f}};b.openAd=function(d,c,e,k,f,a,l,g){var h={};b.open(d,c,e,g);if(h=b.list[d])h.l=!0,h.v=k,h.J=f,h.K=a,h.H=l};b.M=function(d){var c=b.list[d];b.list[d]=0;c&&c.monitor&&clearTimeout(c.monitor.interval)};b.close=function(d){b.i(d,0,-1)};b.play=function(d,c,e,k){var f=b.i(d,1,c,e,k);f&&!f.monitor&&
  (f.monitor={},f.monitor.update=function(){1==f.k&&b.i(f.name,3,-1);f.monitor.interval=setTimeout(f.monitor.update,1E3)},f.monitor.update())};b.click=function(d,c){b.i(d,7,c)};b.complete=function(d,c){b.i(d,5,c)};b.stop=function(d,c){b.i(d,2,c)};b.track=function(d){b.i(d,4,-1)};b.P=function(d,c){var e="a.media.",k=d.linkTrackVars,f=d.linkTrackEvents,a="m_i",l,g=d.contextData,h;c.l&&(e+="ad.",c.v&&(g["a.media.name"]=c.v,g[e+"pod"]=c.J,g[e+"podPosition"]=c.K),c.G||(g[e+"CPM"]=c.H));c.r&&(g[e+"clicked"]=
  !0,c.r=!1);g["a.contentType"]="video"+(c.l?"Ad":"");g["a.media.channel"]=b.channel;g[e+"name"]=c.name;g[e+"playerName"]=c.playerName;0<c.length&&(g[e+"length"]=c.length);g[e+"timePlayed"]=Math.floor(c.a);0<Math.floor(c.a)&&(g[e+"timePlayed"]=Math.floor(c.a));c.G||(g[e+"view"]=!0,a="m_s",b.Heartbeat&&b.Heartbeat.enabled&&(a=c.l?b.__primetime?"mspa_s":"msa_s":b.__primetime?"msp_s":"ms_s"),c.G=1);c.f&&(g[e+"segmentNum"]=c.m,g[e+"segment"]=c.f,0<c.B&&(g[e+"segmentLength"]=c.B),c.A&&0<c.a&&(g[e+"segmentView"]=
  !0));!c.Q&&c.complete&&(g[e+"complete"]=!0,c.S=1);0<c.p&&(g[e+"milestone"]=c.p);0<c.q&&(g[e+"offsetMilestone"]=c.q);if(k)for(h in g)Object.prototype[h]||(k+=",contextData."+h);l=g["a.contentType"];d.pe=a;d.pev3=l;var q,s;if(b.contextDataMapping)for(h in d.events2||(d.events2=""),k&&(k+=",events"),b.contextDataMapping)if(!Object.prototype[h]){a=h.length>e.length&&h.substring(0,e.length)==e?h.substring(e.length):"";l=b.contextDataMapping[h];if("string"==typeof l)for(q=l.split(","),s=0;s<q.length;s++)l=
  q[s],"a.contentType"==h?(k&&(k+=","+l),d[l]=g[h]):"view"==a||"segmentView"==a||"clicked"==a||"complete"==a||"timePlayed"==a||"CPM"==a?(f&&(f+=","+l),"timePlayed"==a||"CPM"==a?g[h]&&(d.events2+=(d.events2?",":"")+l+"="+g[h]):g[h]&&(d.events2+=(d.events2?",":"")+l)):"segment"==a&&g[h+"Num"]?(k&&(k+=","+l),d[l]=g[h+"Num"]+":"+g[h]):(k&&(k+=","+l),d[l]=g[h]);else if("milestones"==a||"offsetMilestones"==a)h=h.substring(0,h.length-1),g[h]&&b.contextDataMapping[h+"s"][g[h]]&&(f&&(f+=","+b.contextDataMapping[h+
  "s"][g[h]]),d.events2+=(d.events2?",":"")+b.contextDataMapping[h+"s"][g[h]]);g[h]&&(g[h]=0);"segment"==a&&g[h+"Num"]&&(g[h+"Num"]=0)}d.linkTrackVars=k;d.linkTrackEvents=f};b.i=function(d,c,e,k,f){var a={},l=(new Date).getTime()/1E3,g,h,q=b.trackVars,s=b.trackEvents,t=b.trackSeconds,u=b.trackMilestones,v=b.trackOffsetMilestones,w=b.segmentByMilestones,x=b.segmentByOffsetMilestones,p,n,r=1,m={},y;b.channel||(b.channel=b.s.w.location.hostname);if(a=d&&b.list&&b.list[d]?b.list[d]:0)if(a.l&&(t=b.adTrackSeconds,
  u=b.adTrackMilestones,v=b.adTrackOffsetMilestones,w=b.adSegmentByMilestones,x=b.adSegmentByOffsetMilestones),0>e&&(e=1==a.k&&0<a.u?l-a.u+a.c:a.c),0<a.length&&(e=e<a.length?e:a.length),0>e&&(e=0),a.offset=e,0<a.length&&(a.e=a.offset/a.length*100,a.e=100<a.e?100:a.e),0>a.c&&(a.c=e),y=a.D,m.name=d,m.ad=a.l,m.length=a.length,m.openTime=new Date,m.openTime.setTime(1E3*a.timestamp),m.offset=a.offset,m.percent=a.e,m.playerName=a.playerName,m.mediaEvent=0>a.g?"OPEN":1==c?"PLAY":2==c?"STOP":3==c?"MONITOR":
  4==c?"TRACK":5==c?"COMPLETE":7==c?"CLICK":"CLOSE",2<c||c!=a.k&&(2!=c||1==a.k)){f||(k=a.m,f=a.f);if(c){1==c&&(a.c=e);if((3>=c||5<=c)&&0<=a.g&&(r=!1,q=s="None",a.g!=e)){h=a.g;h>e&&(h=a.c,h>e&&(h=e));p=u?u.split(","):0;if(0<a.length&&p&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h/a.length*100<g&&a.e>=g&&(r=!0,n=p.length,m.mediaEvent="MILESTONE",a.p=m.milestone=g);if((p=v?v.split(","):0)&&e>=h)for(n=0;n<p.length;n++)(g=p[n]?parseFloat(""+p[n]):0)&&h<g&&e>=g&&(r=!0,n=p.length,m.mediaEvent=
  "OFFSET_MILESTONE",a.q=m.offsetMilestone=g)}if(a.L||!f){if(w&&u&&0<a.length){if(p=u.split(","))for(p.push("100"),n=h=0;n<p.length;n++)if(g=p[n]?parseFloat(""+p[n]):0)a.e<g&&(k=n+1,f="M:"+h+"-"+g,n=p.length),h=g}else if(x&&v&&(p=v.split(",")))for(p.push(""+(0<a.length?a.length:"E")),n=h=0;n<p.length;n++)if((g=p[n]?parseFloat(""+p[n]):0)||"E"==p[n]){if(e<g||"E"==p[n])k=n+1,f="O:"+h+"-"+g,n=p.length;h=g}f&&(a.L=!0)}(f||a.f)&&f!=a.f&&(a.F=!0,a.f||(a.m=k,a.f=f),0<=a.g&&(r=!0));(2<=c||100<=a.e)&&a.c<e&&
  (a.C+=e-a.c,a.a+=e-a.c);if(2>=c||3==c&&!a.k)a.n+=(1==c||3==c?"S":"E")+Math.floor(e),a.k=3==c?1:c;!r&&0<=a.g&&3>=c&&(t=t?t:0)&&a.a>=t&&(r=!0,m.mediaEvent="SECONDS");a.u=l;a.c=e}if(!c||3>=c&&100<=a.e)2!=a.k&&(a.n+="E"+Math.floor(e)),c=0,q=s="None",m.mediaEvent="CLOSE";7==c&&(r=m.clicked=a.r=!0);if(5==c||b.completeByCloseOffset&&(!c||100<=a.e)&&0<a.length&&e>=a.length-b.completeCloseOffsetThreshold)r=m.complete=a.complete=!0;l=m.mediaEvent;"MILESTONE"==l?l+="_"+m.milestone:"OFFSET_MILESTONE"==l&&(l+=
  "_"+m.offsetMilestone);a.I[l]?m.eventFirstTime=!1:(m.eventFirstTime=!0,a.I[l]=1);m.event=m.mediaEvent;m.timePlayed=a.C;m.segmentNum=a.m;m.segment=a.f;m.segmentLength=a.B;b.monitor&&4!=c&&b.monitor(b.s,m);b.Heartbeat&&b.Heartbeat.enabled&&0<=a.g&&(r=!1);0==c&&b.M(d);r&&a.D==y&&(d={contextData:{}},d.linkTrackVars=q,d.linkTrackEvents=s,d.linkTrackVars||(d.linkTrackVars=""),d.linkTrackEvents||(d.linkTrackEvents=""),b.P(d,a),d.linkTrackVars||(d["!linkTrackVars"]=1),d.linkTrackEvents||(d["!linkTrackEvents"]=
  1),b.s.track(d),a.F?(a.m=k,a.f=f,a.A=!0,a.F=!1):0<a.a&&(a.A=!1),a.n="",a.p=a.q=0,a.a-=Math.floor(a.a),a.g=e,a.D++)}return a};b.O=function(d,c,e,k,f){var a=0;if(d&&(!b.autoTrackMediaLengthRequired||c&&0<c)){if(b.list&&b.list[d])a=1;else if(1==e||3==e)b.open(d,c,"HTML5 Video",f),a=1;a&&b.i(d,e,k,-1,0)}};b.attach=function(d){var c,e,k;d&&d.tagName&&"VIDEO"==d.tagName.toUpperCase()&&(b.o||(b.o=function(c,a,d){var e,h;b.autoTrack&&(e=c.currentSrc,(h=c.duration)||(h=-1),0>d&&(d=c.currentTime),b.O(e,h,a,
  d,c))}),c=function(){b.o(d,1,-1)},e=function(){b.o(d,1,-1)},b.j(d,"play",c),b.j(d,"pause",e),b.j(d,"seeking",e),b.j(d,"seeked",c),b.j(d,"ended",function(){b.o(d,0,-1)}),b.j(d,"timeupdate",c),k=function(){d.paused||d.ended||d.seeking||b.o(d,3,-1);setTimeout(k,1E3)},k())};b.j=function(b,c,e){b.attachEvent?b.attachEvent("on"+c,e):b.addEventListener&&b.addEventListener(c,e,!1)};void 0==b.completeByCloseOffset&&(b.completeByCloseOffset=1);void 0==b.completeCloseOffsetThreshold&&(b.completeCloseOffsetThreshold=
  1);b.Heartbeat={};b.N=function(){var d,c;if(b.autoTrack&&(d=b.s.d.getElementsByTagName("VIDEO")))for(c=0;c<d.length;c++)b.attach(d[c])};b.j(q,"load",b.N)}

  /*
 Start ActivityMap Module

 The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
 allows you to view data overlays on your links and content to understand how
 users engage with your web site. If you do not intend to use ActivityMap, you
 can remove the following block of code from your AppMeasurement.js file.
 Additional documentation on how to configure ActivityMap is available at:
 https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
*/
function AppMeasurement_Module_ActivityMap(f){function g(a,d){var b,c,n;if(a&&d&&(b=e.c[d]||(e.c[d]=d.split(","))))for(n=0;n<b.length&&(c=b[n++]);)if(-1<a.indexOf(c))return null;p=1;return a}function q(a,d,b,c,e){var g,h;if(a.dataset&&(h=a.dataset[d]))g=h;else if(a.getAttribute)if(h=a.getAttribute("data-"+b))g=h;else if(h=a.getAttribute(b))g=h;if(!g&&f.useForcedLinkTracking&&e&&(g="",d=a.onclick?""+a.onclick:"")){b=d.indexOf(c);var l,k;if(0<=b){for(b+=10;b<d.length&&0<="= \t\r\n".indexOf(d.charAt(b));)b++;
if(b<d.length){h=b;for(l=k=0;h<d.length&&(";"!=d.charAt(h)||l);)l?d.charAt(h)!=l||k?k="\\"==d.charAt(h)?!k:0:l=0:(l=d.charAt(h),'"'!=l&&"'"!=l&&(l=0)),h++;if(d=d.substring(b,h))a.e=new Function("s","var e;try{s.w."+c+"="+d+"}catch(e){}"),a.e(f)}}}return g||e&&f.w[c]}function r(a,d,b){var c;return(c=e[d](a,b))&&(p?(p=0,c):g(k(c),e[d+"Exclusions"]))}function s(a,d,b){var c;if(a&&!(1===(c=a.nodeType)&&(c=a.nodeName)&&(c=c.toUpperCase())&&t[c])&&(1===a.nodeType&&(c=a.nodeValue)&&(d[d.length]=c),b.a||
b.t||b.s||!a.getAttribute||((c=a.getAttribute("alt"))?b.a=c:(c=a.getAttribute("title"))?b.t=c:"IMG"==(""+a.nodeName).toUpperCase()&&(c=a.getAttribute("src")||a.src)&&(b.s=c)),(c=a.childNodes)&&c.length))for(a=0;a<c.length;a++)s(c[a],d,b)}function k(a){if(null==a||void 0==a)return a;try{return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$",
"mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}","mg")," ").substring(0,254)}catch(d){}}var e=this;e.s=f;var m=window;m.s_c_in||(m.s_c_il=[],m.s_c_in=0);e._il=m.s_c_il;e._in=m.s_c_in;e._il[e._in]=e;m.s_c_in++;e._c="s_m";e.c={};var p=0,t={SCRIPT:1,STYLE:1,LINK:1,CANVAS:1};e._g=function(){var a,d,b,c=f.contextData,e=f.linkObject;(a=f.pageName||f.pageURL)&&(d=r(e,"link",f.linkName))&&(b=r(e,"region"))&&(c["a.activitymap.page"]=a.substring(0,
255),c["a.activitymap.link"]=128<d.length?d.substring(0,128):d,c["a.activitymap.region"]=127<b.length?b.substring(0,127):b,c["a.activitymap.pageIDType"]=f.pageName?1:0)};e.link=function(a,d){var b;if(d)b=g(k(d),e.linkExclusions);else if((b=a)&&!(b=q(a,"sObjectId","s-object-id","s_objectID",1))){var c,f;(f=g(k(a.innerText||a.textContent),e.linkExclusions))||(s(a,c=[],b={a:void 0,t:void 0,s:void 0}),(f=g(k(c.join(""))))||(f=g(k(b.a?b.a:b.t?b.t:b.s?b.s:void 0)))||!(c=(c=a.tagName)&&c.toUpperCase?c.toUpperCase():
"")||("INPUT"==c||"SUBMIT"==c&&a.value?f=g(k(a.value)):"IMAGE"==c&&a.src&&(f=g(k(a.src)))));b=f}return b};e.region=function(a){for(var d,b=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=q(a,b,b,b))return d;if("BODY"==a.nodeName)return"BODY"}}}
/* End ActivityMap Module */
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.2.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(r){var a=this;a.version="2.2.0";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var p=k.AppMeasurement.Pb;p||(p=null);var n=k,m,s;try{for(m=n.parent,s=n.location;m&&m.location&&s&&""+m.location!=""+s&&n.location&&""+m.location!=""+n.location&&m.location.host==s.host;)n=m,m=n.parent}catch(u){}a.F=function(a){try{console.log(a)}catch(b){}};a.Ma=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.wb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.Ea&&!/^[0-9.]+$/.test(c)&&
(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.Ea=0<d?c.substring(d):c}return a.Ea};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.wb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?
(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.L=[];a.ia=function(c,b,d){if(a.Fa)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,h=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);
if(g&&"prerender"==g){if(!a.ja)for(a.ja=1,d=0;d<h.length;d++)a.d.addEventListener(h[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ja=0,a.delayReady())});f=1;e=0}else d||a.p("_d")&&(f=1);f&&(a.L.push({m:c,a:b,t:e}),a.ja||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.p("_d")?b=1:a.xa();0<a.L.length;){d=a.L.shift();if(b&&!d.t&&d.t>c){a.L.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));
break}a.Fa=1;a[d.m].apply(a,d.a);a.Fa=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ia("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,h="";e=f="";if(a.lightProfileID)d=a.P,(h=a.lightTrackVars)&&(h=","+h+","+a.na.join(",")+",");else{d=a.g;if(a.pe||a.linkType)h=a.linkTrackVars,f=a.linkTrackEvents,
a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(h=a[e].Nb,f=a[e].Mb));h&&(h=","+h+","+a.H.join(",")+",");f&&h&&(h+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!h||0<=h.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.r=function(c,b,d,f,e){var g="",h,l,k,q,m=0;"contextData"==c&&(c="c");if(b){for(h in b)if(!(Object.prototype[h]||e&&h.substring(0,e.length)!=e)&&b[h]&&(!d||0<=d.indexOf(","+(f?f+".":"")+h+","))){k=!1;if(m)for(l=0;l<m.length;l++)h.substring(0,
m[l].length)==m[l]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),l=b[h],e&&(h=h.substring(e.length)),0<h.length))if(k=h.indexOf("."),0<k)l=h.substring(0,k),k=(e?e:"")+l+".",m||(m=[]),m.push(k),g+=a.r(l,b,d,f,k);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=h.substring(0,4),q=h.substring(4),h){case "transactionID":h="xact";break;case "channel":h="ch";break;case "campaign":h="v0";break;default:a.Ma(q)&&("prop"==k?h="c"+q:"eVar"==k?h="v"+
q:"list"==k?h="l"+q:"hier"==k&&(h="h"+q,l=l.substring(0,255)))}g+="&"+a.escape(h)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.zb=function(){var c="",b,d,f,e,g,h,l,k,q="",m="",n=e="";if(a.lightProfileID)b=a.P,(q=a.lightTrackVars)&&(q=","+q+","+a.na.join(",")+",");else{b=a.g;if(a.pe||a.linkType)q=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(q=a[e].Nb,m=a[e].Mb));q&&(q=","+q+","+a.H.join(",")+",");m&&(m=","+m+",",q&&(q+=
",events,"));a.events2&&(n+=(""!=n?",":"")+a.events2)}if(a.visitor&&a.visitor.getCustomerIDs){e=p;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.r("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.r("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);h=e.substring(4);g||("events"==e&&n?(g=n,n=
""):"marketingCloudOrgID"==e&&a.visitor&&(g=a.visitor.marketingCloudOrgID));if(g&&(!q||0<=q.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e=
"aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e=
"cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;
case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":n&&(g+=(""!=g?",":"")+n);if(m)for(h=g.split(","),g="",f=0;f<h.length;f++)l=h[f],k=l.indexOf("="),0<=k&&(l=l.substring(0,k)),k=l.indexOf(":"),0<=k&&(l=l.substring(0,k)),0<=m.indexOf(","+l+",")&&(g+=(g?",":"")+h[f]);break;case "events2":g="";break;case "contextData":c+=a.r("c",a[e],q,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e=
"mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.r("mts",a[e],q,e));g="";break;default:a.Ma(h)&&("prop"==f?e="c"+h:"eVar"==f?e="v"+h:"list"==f?e="l"+h:"hier"==f&&(e="h"+h,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.D=function(a){var b=a.tagName;if("undefined"!=""+a.Sb||"undefined"!=""+a.Ib&&"HTML"!=
(""+a.Ib).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Ia=function(a){var b=k.location,d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,
1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.M=function(c){var b=a.D(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Ia(c),e)?{id:e.substring(0,100),type:g}:0};a.Qb=function(c){for(var b=
a.D(c),d=a.M(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.D(c),d=a.M(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Hb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,h;a.oa=1;d||(a.oa=0,d=a.clickObject);if(d){c=a.D(d);for(b=a.M(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.D(d),b=a.M(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:
"";if(0<=l.indexOf(".tl(")||0<=l.indexOf(".trackLink("))d=0}}else a.oa=1;!e&&d&&(e=a.Ia(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,q=0,n;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),g=l.indexOf("?"),h=l.indexOf("#"),0<=g?0<=h&&h<g&&(g=h):g=h,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),h=0;h<g.length;h++)(n=g[h])&&l.substring(l.length-(n.length+1))=="."+n&&(f="d");if(a.trackExternalLinks&&
!f&&(l=e.toLowerCase(),a.La(l)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(h=0;h<g.length;h++)n=g[h],0<=l.indexOf(n)&&(q=1);q?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=
k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.Ab=function(){var c=a.oa,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):
0,h,l,k,e=0;if(g)for(h=0;h<g.length;h++)l=g[h].split("="),f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");h={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(h[k]=a.contextData[k],a.contextData[k]="");a.e=a.r("c",h)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(k=0;k<f.length;k++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),h=0;h<b[l].length;h++)g=b[l][h],
g==f[k]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":"")+l+"&u=0"),b[l].splice(h,1),d=1);c||(d=1);if(d){e="";h=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),h=1);for(l in b)!Object.prototype[l]&&0<h&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+"="+a.escape(l),h--);a.cookieWrite("s_sq",e)}}}return c};a.Bb=function(){if(!a.Lb){var c=new Date,b=n.location,d,f,e=f=d="",g="",h="",l="1.2",k=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",p="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&
(l="1.5",c=[],c.forEach))){l="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;h=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.Rb(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),
p=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=k;a.browserWidth=g;a.browserHeight=h;a.connectionType=p;a.homepage=m;a.Lb=1}};a.Q={};a.loadModule=function(c,b){var d=a.Q[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.eb=function(){return d.ib};d.jb=function(b){if(d.ib=b)a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",
{get:d.eb,set:d.jb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d))};a.p=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Db=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,
c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.R=function(c,b){var d,f,e,g,h,l;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)if(g=f[e],(h=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(l in a[g])h[l]||(h[l]=a[g][l]);a[g]=h}};a.Va=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.vb=function(a){var b,d,f,e,g,h=0,l,k="",m="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(l=b.substring(d+
1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?h=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(h=",p,ei,"),h&&l)))){if((a=l.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=h.indexOf(","+e.substring(0,d)+",")?k+=(k?"&":"")+e:m+=(m?"&":"")+e;k&&m?l=k+"&"+m:m=""}d=253-(l.length-m.length)-
b.length;a=b+(0<d?g.substring(0,d):"")+"?"+l}return a};a.ab=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ea=!1;a.J=!1;a.lb=function(){a.J=!0;a.j()};a.ca=!1;a.V=!1;a.hb=function(c){a.marketingCloudVisitorID=c;a.V=!0;a.j()};a.fa=!1;a.W=!1;a.mb=
function(c){a.visitorOptedOut=c;a.W=!0;a.j()};a.Z=!1;a.S=!1;a.Xa=function(c){a.analyticsVisitorID=c;a.S=!0;a.j()};a.ba=!1;a.U=!1;a.Za=function(c){a.audienceManagerLocationHint=c;a.U=!0;a.j()};a.aa=!1;a.T=!1;a.Ya=function(c){a.audienceManagerBlob=c;a.T=!0;a.j()};a.$a=function(c){a.maxDelay||(a.maxDelay=250);return a.p("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.da=!1;a.I=!1;a.xa=function(){a.I=!0;a.j()};a.isReadyToTrack=function(){var c=!0,b=a.visitor,d,f,e;a.ea||a.J||(a.ab(a.lb)?a.J=
!0:a.ea=!0);if(a.ea&&!a.J)return!1;b&&b.isAllowed()&&(a.ca||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.ca=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.hb]),a.marketingCloudVisitorID&&(a.V=!0)),a.fa||a.visitorOptedOut||!b.isOptedOut||(a.fa=!0,a.visitorOptedOut=b.isOptedOut([a,a.mb]),a.visitorOptedOut!=p&&(a.W=!0)),a.Z||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.Z=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Xa]),a.analyticsVisitorID&&(a.S=!0)),a.ba||
a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.ba=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Za]),a.audienceManagerLocationHint&&(a.U=!0)),a.aa||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.aa=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Ya]),a.audienceManagerBlob&&(a.T=!0)),c=a.ca&&!a.V&&!a.marketingCloudVisitorID,b=a.Z&&!a.S&&!a.analyticsVisitorID,d=a.ba&&!a.U&&!a.audienceManagerLocationHint,f=a.aa&&!a.T&&!a.audienceManagerBlob,
e=a.fa&&!a.W,c=c||b||d||f||e?!1:!0);a.da||a.I||(a.$a(a.xa)?a.I=!0:a.da=!0);a.da&&!a.I&&(c=!1);return c};a.o=p;a.u=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.qb=c;f.pb=b;f.nb=d;a.o==p&&(a.o=[]);a.o.push(f);0==a.u&&(a.u=setInterval(a.j,100))};a.j=function(){var c;if(a.isReadyToTrack()&&(a.kb(),a.o!=p))for(;0<a.o.length;)c=a.o.shift(),c.pb.apply(c.qb,c.nb)};a.kb=function(){a.u&&(clearInterval(a.u),a.u=0)};a.fb=function(c){var b,d,f=p,e=p;if(!a.isReadyToTrack()){b=[];if(c!=p)for(d in f=
{},c)f[d]=c[d];e={};a.Va(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.xb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+
Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState());a.p("_s");a.fb(c)||(b&&a.R(b),c&&(d={},a.Va(d,0),a.R(c)),a.Db()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.xb()),a.Hb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||
(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Wa||(f=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=f||void 0===f?void 0===f?"":f:n.document.referrer),a.Wa=1,a.referrer=a.vb(a.referrer),a.p("_g")),a.Ab()&&!a.abort&&(a.visitor&&!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),
a.Bb(),g+=a.zb(),a.Gb(e,g),a.p("_t"),a.referrer=""))),c&&a.R(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.za=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.za.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPreTrackCallback")};a.cb=function(c){a.wa(a.za,
c)};a.ya=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.ya.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPostTrackCallback")};a.bb=function(c){a.wa(a.ya,c)};a.wa=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1];e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.F(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=
c;a.linkType=b;a.linkName=d;e&&(a.l=c,a.A=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=
void 0};a.tagContainerMarker="";a.Gb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",h=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(h||(h=a.account,f=h.indexOf(","),0<=f&&(h=h.substring(0,f)),h=h.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=h+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks;d+=
f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.Kb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.cb(d);a.tb(d);a.ka()};a.Ua=/{(%?)(.*?)(%?)}/;a.Ob=RegExp(a.Ua.source,"g");a.ub=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.Ob),e=0;e<f.length;++e){var g=
f[e],h=g.match(a.Ua),k="";"%"==h[1]&&"timezone_offset"==h[2]?k=(new Date).getTimezoneOffset():"%"==h[1]&&"timestampz"==h[2]&&(k=a.yb());d.c=d.c.replace(g,a.escape(k))}}};a.yb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,
b){return(Array(a+1).join(0)+b).slice(-a)};a.ta={};a.doPostbacks=function(c){if("object"==typeof c)if(a.ub(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,
3)&&(a.ta[d.id]=new Image,a.ta[d.id].alt="",a.ta[d.id].src=d.c)}};a.tb=function(c){a.i||a.Cb();a.i.push(c);a.ma=a.C();a.Sa()};a.Cb=function(){a.i=a.Eb();a.i||(a.i=[])};a.Eb=function(){var c,b;if(a.ra()){try{(b=k.localStorage.getItem(a.pa()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.ra=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.Ja=function(){var c=0;a.i&&(c=a.i.length);a.q&&c++;return c};a.ka=function(){if(a.q&&(a.B&&a.B.complete&&a.B.G&&a.B.va(),
a.q))return;a.Ka=p;if(a.qa)a.ma>a.O&&a.Qa(a.i),a.ua(500);else{var c=a.ob();if(0<c)a.ua(c);else if(c=a.Ga())a.q=1,a.Fb(c),a.Jb(c)}};a.ua=function(c){a.Ka||(c||(c=0),a.Ka=setTimeout(a.ka,c))};a.ob=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.C()-a.Pa;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.Ga=function(){if(0<a.i.length)return a.i.shift()};a.Fb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+=
"\n\t"+a.unescape(c[d]);a.F(b)}};a.gb=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.Y=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(w){t=null}t&&"y"==t.x?(a.Y=!0,a.X=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.X=function(a){return k.$.parseJSON(a)},a.Y=!0):a.X=function(){return null};a.Jb=function(c){var b,d,f;a.gb()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=
new XDomainRequest,d=2),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.Y?b.Ba=!0:b=0));!b&&a.Ta&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof k.InstallTrigger||
(b.abort=function(){b.src=p}));b.Da=function(){try{b.G&&(clearTimeout(b.G),b.G=0)}catch(a){}};b.onload=b.va=function(){a.bb(c);b.Da();a.sb();a.ga();a.q=0;a.ka();if(b.Ba){b.Ba=!1;try{a.doPostbacks(a.X(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.Ha=function(){b.Da();(a.trackOffline||a.qa)&&a.q&&a.i.unshift(a.rb);a.q=0;a.ma>a.O&&a.Qa(a.i);a.ga();a.ua(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.va():b.Ha())};a.Pa=a.C();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,
e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Na)try{f.removeChild(a.Na)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Na=a.B}b.G=setTimeout(function(){b.G&&(b.complete?b.va():(a.trackOffline&&b.abort&&b.abort(),b.Ha()))},5E3);a.rb=c;a.B=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.K||a.A)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=
250),a.ha=setTimeout(a.ga,a.forcedLinkTrackingTimeout)};a.sb=function(){if(a.ra()&&!(a.Oa>a.O))try{k.localStorage.removeItem(a.pa()),a.Oa=a.C()}catch(c){}};a.Qa=function(c){if(a.ra()){a.Sa();try{k.localStorage.setItem(a.pa(),k.JSON.stringify(c)),a.O=a.C()}catch(b){}}};a.Sa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Ga()}};a.forceOffline=function(){a.qa=!0};a.forceOnline=function(){a.qa=!1};a.pa=function(){return a.offlineFilename+
"-"+a.visitorNamespace+a.account};a.C=function(){return(new Date).getTime()};a.La=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Kb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.R(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=
typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:k.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>
e)return g;b=d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+c+"="+d))){e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}}};a.H="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.H.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.na="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.P=a.na.slice(0);a.Aa="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.P.push("prop"+m)),a.g.push("eVar"+m),a.P.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID".split(" ");a.g=a.g.concat(m);a.H=a.H.concat(m);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=
0;a.offlineFilename="AppMeasurement.offline";a.Pa=0;a.ma=0;a.O=0;a.Oa=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Ta=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Ta=!0}}catch(x){}a.ga=function(){a.ha&&(k.clearTimeout(a.ha),a.ha=p);a.l&&a.K&&a.l.dispatchEvent(a.K);a.A&&("function"==typeof a.A?a.A():
a.l&&a.l.href&&(a.d.location=a.l.href));a.l=a.K=a.A=0};a.Ra=function(){a.b=a.d.body;a.b?(a.v=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ca)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.v,!1);else{a.b.removeEventListener("click",a.v,!0);a.Ca=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.N&&a.N==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||
a.clickObject.parentNode))a.clickObject=0;else{var h=a.N=a.clickObject;a.la&&(clearTimeout(a.la),a.la=0);a.la=setTimeout(function(){a.N==h&&(a.N=0)},1E4);f=a.Ja();a.track();if(f<a.Ja()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.La(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=
new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.l=c.target,a.K=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.v):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&
a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.Ca=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.v,!0)),a.b.addEventListener("click",a.v,!1))):setTimeout(a.Ra,30)};a.Ra();r?a.setAccount(r):a.F("Error, missing Report Suite ID in AppMeasurement initialization");a.loadModule("ActivityMap")}
function s_gi(r){var a,k=window.s_c_il,p,n,m=r.split(","),s,u,t=0;if(k)for(p=0;!t&&p<k.length;){a=k[p];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(n=a.account?a.account:a.oun,n=a.allAccounts?a.allAccounts:n.split(","),s=0;s<m.length;s++)for(u=0;u<n.length;u++)m[s]==n[u]&&(t=1);p++}t||(a=new AppMeasurement(r));return a}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var r=window,a=r.s_giq,k,p,n;if(a)for(k=0;k<a.length;k++)p=a[k],n=s_gi(p.oun),n.setAccount(p.un),n.setTagContainer(p.tagContainerName);r.s_giq=0}s_pgicq();