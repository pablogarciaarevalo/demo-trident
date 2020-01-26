function setCookie(cname,cvalue,exdays){
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}
 
function getCookie(cname){
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++)
    {
    var c = $.trim(ca[i]);
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}

var cookieLaw = {};
cookieLaw.GDPRshown = false;
cookieLaw.EUshown = false;

if (typeof __ntap_dmdbase === 'undefined') {
  var jsonCountry = $.ajax({
    url: "https://web.archive.org/web/20191004045428/https://ipinfo.io/?callback=?", async: false, dataType: 'json'}).done(function(countryData) {     
      if (countryData) {
       cookieLaw.euCountry = countryData.country;
      } else {
       cookieLaw.euCountry = "US";
      }    
  });  
} else { 
 cookieLaw.euCountry = __ntap_dmdbase.registry_country_code; 
}        
cookieLaw._countries = ["BE","BG","CZ","DK","DE","EE","IE","EL","ES","FR","IT","CY","LV","LT","LU","HU","MT","NL",
    "GB","AT","PL","PT","RO","SI","SK","FI","SE","UK","GR","EU","AU","IN","AS","KR","CN","MX","HR"];
cookieLaw.euCheck = $.inArray(cookieLaw.euCountry,cookieLaw._countries);

cookieLaw.isAccept = function(name){
  var ret = null;
  var temp = cookieLaw.getCookie(name);
  if(temp != null){
    var tempsplit = temp.split('|');
    if(tempsplit.length > 1){
      if(tempsplit[0] == 'true'){
        
        ret = true;
        
      }else{
        ret = false;
      }
      
    }
  }
  
  return ret;
}; 

cookieLaw.modal = {
  show:function() {
    var options = {'inline':'true','opacity':'0.4', 'href':'#cookieNotice', 'width':'75%', 'height':'auto', 'maxWidth':'420px', 'transition':'none'};
    options = $.extend(options, {onLoad:function(){$("#cboxContent").addClass("euCookieModalBG")},
                                 onClosed:function(){
                                            $("#cboxContent").removeClass("euCookieModalBG");
                                            if(cookieLaw.GDPRshown === false && cookieLaw.isAccept("eu-gdpr-cookie") == null) {
                                              cookieLaw.modal.showGDPR();
                                            }
                                          }});
      $.colorbox(options);
      cookieLaw.EUshown = true;
      this._eventHandler("#cookieNotice");
  },
  showGDPR:function() {
    var options = {'inline':'true','open':'true','opacity':'0.4', 'href':'#GDPRNotice', 'width':'75%', 'height':'auto', 'maxWidth':'420px', 'transition':'none'};
    options = $.extend(options, {onLoad:function(){$("#cboxContent").addClass("gdprCookieModalBG")},
                                 onClosed:function(){
                                            $("#cboxContent").removeClass("gdprCookieModalBG"); 
                                          }});
      $.colorbox(options);
      cookieLaw.GDPRshown = true;
      this._eventHandler("#GDPRNotice");
  },
  _eventHandler: function(popupID) {
    $(popupID + " #cookieNoticeShort #cookieNoticeExpandToggle").on('click', function() {
      $(popupID + " #cookieNoticeExpanded").removeClass("hidden");   
      $('#colorbox, #cboxWrapper, #cboxContent, #cboxLoadedContent').css('height', '330px');
      return false;
    });
    if($(popupID + ' #ss-linkExpand').is(":visible")) optOutCheck = true;
    this._close();  
    this._continue(); 
    this._overlayClick();
  },
  _close:function() {
    $('#cboxClose').click(function(event){
      var evID = event.target.id;
      if(evID == "cookie_notice" || evID == "cboxClose" ) {
        if(cookieLaw.EUshown === true) {
          cookieLaw.modal._setYearCookie(true, false, 'eu-cookie-user-cookie');
          cookieLaw.EUshown = false;
        }
        if(cookieLaw.GDPRshown === true && $(this).parent().find('#GDPRNotice').length > 0) {
          cookieLaw.modal._setYearCookie(true, false, 'eu-gdpr-cookie');
          //refresh page to load applications based on user consent
          window.location.reload();
        }
      }
    });
  },
  _continue:function(){
    
    $('#storeCookie').click(function(){
      var isSession = false;
      var isContinue = true;
      if($('#enableCookie').is(':checked')){
        isContinue = false; 
        isSession = true;
      }
      if(cookieLaw.EUshown === true) {
        cookieLaw.modal._setYearCookie(isContinue,isSession,'eu-cookie-user-cookie');
        $.colorbox.close();
        cookieLaw.EUshown = false;
      }
      return false; 
    });
    $('#storeGDPR').click(function(){
      var isSession = false;
      var isContinue = true;
      if($('#disableGDPR').is(':checked')){
        isContinue = false; 
        isSession = true;
      }
      if(cookieLaw.GDPRshown === true && $(this).parents('#GDPRNotice').length > 0) {
        cookieLaw.modal._setYearCookie(isContinue,isSession,'eu-gdpr-cookie');
        //refresh page to load applications based on user consent
        window.location.reload();
      }
      return false; 
    });

  },
  _overlayClick:function(){
    $('#cboxOverlay').click(function(event){
      var evID = event.target.id;
      if(evID == "cboxOverlay"){
        if(cookieLaw.EUshown === true) {
          cookieLaw.modal._setYearCookie(true, false, 'eu-cookie-user-cookie'); 
          $.colorbox.close();
          cookieLaw.EUshown = false;
        }
        
        if(cookieLaw.GDPRshown === true && $('#GDPRNotice').parent().attr('class') !== 'hidden') {
          cookieLaw.modal._setYearCookie(true, false, 'eu-gdpr-cookie');
          //refresh page to load applications based on user consent
          window.location.reload();
        }
        
      }
    });

  },  
  _setYearCookie:function(isCookie,isSession,name){
    
    var session = false;
    if(isSession != undefined || isSession != null){
      session = isSession;
      
    }
    var monthNames = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
    var today = new Date();
    var dd = today.getDate();
    var mm = monthNames[today.getMonth()];
    var yyyy = today.getFullYear();
    var currentDate = mm+"-"+dd+"-"+yyyy;
        
    var value =  isCookie+'|'+currentDate;
    var expires = '';
    if(!session){
      var date = new Date();
      date.setTime(date.getTime()+(3650*24*60*60*1000));
      
      expires = "; expires="+date.toGMTString();
    }
    document.cookie = name+"="+value+expires+"; path=/";

    if(isCookie === false) {
      cookieLaw.modal._clearStoredCookies();
    }
    

    
  },
  _clearStoredCookies: function() {   
    var cookies = document.cookie.split(";");
    
    for (var c = 0; c < cookies.length; c++) {
      var d = window.location.hostname.split(".");
      var cookiename = cookies[c].trim().split("=")[0];
      while (d.length > 0) {
        
        if (cookiename !== "eu-cookie-user-cookie" && cookiename !== "eu-gdpr-cookie") {
          var cookieBase = cookiename + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=' + d.join('.') + ' ;path=';
        }
        var p = location.pathname.split('/');
        document.cookie = cookieBase + '/';
        while (p.length > 0) {
            document.cookie = cookieBase + p.join('/');
            p.pop();
        };
        d.shift();
      }
    }
    /*** REVISIT this extra cleanup logic ***/
    cookies = document.cookie.split(";");
    for (var c = 0; c < cookies.length; c++) {
      cookiename = cookies[c].trim().split("=")[0];
      if (cookiename !== "eu-cookie-user-cookie" && cookiename !== "eu-gdpr-cookie") {
        document.cookie = cookiename + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      }
    }
  }


};

// helper functions
cookieLaw.shouldInject = function(){
  var temp = true;

  if(cookieLaw.isAccept("eu-cookie-user-cookie") == false || cookieLaw.isAccept("eu-cookie-user-cookie") == 'false'){
    temp = false;
  }
  return temp;
};
cookieLaw.shouldInjectGDPR = function(){
  var temp = true;
  if(cookieLaw.isAccept("eu-gdpr-cookie") == false || cookieLaw.isAccept("eu-gdpr-cookie") == 'false'){
    temp = false;
  }
  return temp;
};

//get the cookie
cookieLaw.getCookie = function (name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
};



// original scripti

scripty = {
      _scripts:[]
   };

    scripty.add = function(script) {
      
     /* var starts = script.match("^http");
      if(starts != "http") {
        script = "https://web.archive.org/web/20191004045428/http://www.netapp.com/includes/"+script;
      }*/
    //script = "/us/static/js" + script;
      
      this._scripts.push(script);
    };

    scripty.injectAll = function() {
      var shouldDo = cookieLaw.shouldInject();
      
      if(shouldDo){
        for(i = 0;i<this._scripts.length;i++) {
          var tags = document.createElement('script');
          tags.type='text/javascript';
          tags.src=this._scripts[i];
          
          $('body').append(tags);
                    
        }
      } 
    };


$(document).ready(function(){
  if($("#cookieInfo").length > 0) {
    var tempCookie = $.trim(cookieLaw.getCookie("eu-cookie-user-cookie"));
    
    if(tempCookie != null){
      var eucookie = tempCookie.split('|');
      if(eucookie.length > 1){
          if(eucookie[0] == 'true'){
        $('#cookieInfo').show();
        var cookieInfo = eucookie[1].split("-");
        var month = cookieInfo[0];
        var day = cookieInfo[1];
        var year = cookieInfo[2];                           
        $('#cookieInfoDay').html(day);
        $('#cookieInfoMonth').html(month);
        $('#cookieInfoYear').html(year);                            
  
          }
  
      }
      }
      }

});

//show the modal
setTimeout(function() { 

  //checking values again  
  cookieLaw.euCheck = $.inArray(cookieLaw.euCountry,cookieLaw._countries);
  cookieLaw.urlSplit = window.location.pathname.split("/");
  cookieLaw.nonEU = $.inArray(cookieLaw.urlSplit[1], cookieLaw.nonEUCountries);
  if(cookieLaw.nonEU > -1) {
    cookieLaw.euCheck = -1;
  }
  if(cookieLaw.euCheck > -1){
      if(cookieLaw.isAccept("eu-cookie-user-cookie") == null){
          cookieLaw.modal.show();
      }
      if(cookieLaw.isAccept("eu-cookie-user-cookie") !== null && cookieLaw.isAccept("eu-gdpr-cookie") == null){
        cookieLaw.modal.showGDPR();
    }
  }
}, 5000);

/*
     FILE ARCHIVED ON 04:54:28 Oct 04, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:36:35 Nov 27, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  exclusion.robots.policy: 0.296
  esindex: 0.013
  load_resource: 387.327
  LoadShardBlock: 535.151 (3)
  RedisCDXSource: 16.065
  PetaboxLoader3.datanode: 710.33 (5)
  captures_list: 575.994
  CDXLines.iter: 19.376 (3)
  PetaboxLoader3.resolve: 204.052 (2)
  exclusion.robots: 0.32
*/