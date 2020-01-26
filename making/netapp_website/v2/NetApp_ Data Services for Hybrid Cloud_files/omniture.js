// Update for insight.netapp.com DIGITAL-13437
// Last Updated on 05/28/2019

var s_account = '';

var Omniture = {};

Omniture.PageLoad = {

    // vars that are used in the DTM
    // evar47,evar5 set in form.js, form-progressive-template.js. Form.js
    // prop5, evar1, evar7, prop7 defined in _search.js/components-min.js

    customParams: {
        'prop5': "",
        'eVar1': "",
        'eVar7': "",
        'prop7': "",
        'eVar5': "",
        'events': "event78"
    },

    setCustomParam: function (name, value) {
        this.customParams[name] = value;
    },
    setCustomParams: function (params) {
        this.customParams = params;
    },
    setPageVars: function (pageVars) {
        this.pageVars = pageVars;
    },
    normalizeGeo: function (geo) {
        //suppress bad geos
        if (this.GEOS[geo]) {
            return geo;
        } else {
            return 'us';
        }
    },
    mkPageLoadCall: function () { //Logic should be moved to doPlugins or a DTM page load rule		

        var pageVars = this.pageVars; //pageVars should have been set in a preprocess block for this domain/section
        var geo = this.normalizeGeo(pageVars.geo);

    },

};

(function () {
    var geos = [
        'us',
        'uk',
        'mx',
        'jp',
        'fr',
        'ch',
        'it',
        'il',
        'in',
        'au',
        'br',
        'pt',
        'cn',
        'de',
        'ru',
        'nl',
        'es',
        'kr',
        'sg',
        'ca',
        'se',
        'se',
        'tw'
    ];
    Omniture.PageLoad.GEOS = {};
    for (var i = 0; i < geos.length; i++) {
        Omniture.PageLoad.GEOS[geos[i]] = 1;
    }
})();

Omniture.System = {
    findMatches: function (c, depth) {
        var out = [];
        if (depth === undefined) depth = 0;
        var currPathNode = this.pathArray[depth];
        var wildcardMatch = c['*'];
        var exactMatch = c[currPathNode];
        var matchList = [wildcardMatch, exactMatch];
        for (var i = 0; i < matchList.length; i++) {
            var match = matchList[i];
            if (!match) continue;
            out[out.length] = match;
            var matches = this.findMatches(match, depth + 1);
            out = out.concat(matches);
        }
        return out;
    },
    getConfigNodes: function () {
        var domain = window.location.hostname;
        var path = window.location.pathname;
        var partialPathArray = path.split('/');
        var len = partialPathArray.length;
        if (partialPathArray[len - 1] == '') {
            partialPathArray[len - 1] = 'index.html';
        }
        len = partialPathArray.length;
        var compactArray = [];
        for (var i = 0; i < len; i++) {
            var cell = partialPathArray[i];
            if (cell != undefined && cell.length > 0) compactArray.push(cell);
        }
        this.pathArray = [domain].concat(compactArray);
        return this.findMatches(Omniture.Config);
    },
    callHooks: function (hookName) {
        for (var i = 0; i < this.matches.length; i++) {
            var match = this.matches[i];
            var fcn = match[hookName];
            if (fcn) fcn();
        }
    },
    preProcess: function () {
        this.matches = this.getConfigNodes();
        this.callHooks('_preprocess');
    },
    process: function () {
        this.callHooks('_process');
        //Omniture.PageLoad.callOmniture();
    },
    postProcess: function () {
        this.callHooks('_postprocess');
    }
};

Omniture.Util = {

    getGeo: function () {  //Will be moved into form tracking logic, once it is fully established
        return window.location.pathname.substring(1, 3);
    },
    getPageName: function () {
        return window.location.pathname.substring(1).split('/').join(':');
    },
    getStrippedBasename: function () {
        return window.location.pathname.split('/').pop().split('.')[0];
    },
    getQueryString: function (key) {
        var vars = [],
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars[key];
    }
};

Omniture.SharedConfigs = {
    'WWW': {
        '_preprocess': function () {
            Omniture.SiteSections.WWW.preprocess();
        },
        '*': {
            'forms': {
                '_preprocess': function () {
                    Omniture.SiteSections.Forms.setupParameters();
                }
            },
            'lp': {
                '_preprocess': function () {
                    Omniture.SiteSections.Forms.setupParameters();
                }
            },
            'resources': {
                '_preprocess': function () {
                    Omniture.SiteSections.Forms.setupParameters();
                }
            },
            'slp': {
                '_preprocess': function () {
                    Omniture.SiteSections.Forms.setupParameters();
                }
            }

        }
    }

};

Omniture.Config = {
    'www.netapp.com': Omniture.SharedConfigs.WWW,
    'www.netapp.mx': Omniture.SharedConfigs.WWW,
    'www.netapp.ch': Omniture.SharedConfigs.WWW,
    'www.netapp.co.il': Omniture.SharedConfigs.WWW,
    'www.netapp.it': Omniture.SharedConfigs.WWW,
    'www.netapp.nl': Omniture.SharedConfigs.WWW,
    'www.netapp.ru': Omniture.SharedConfigs.WWW,
    'www.netapp.se': Omniture.SharedConfigs.WWW,
    'www.netapp.co.kr': Omniture.SharedConfigs.WWW,
    'www.netapp.co.uk': Omniture.SharedConfigs.WWW,
    'www.netapp.in': Omniture.SharedConfigs.WWW,
    'www.netapp.cn': Omniture.SharedConfigs.WWW,
    'www.netapp.ca': Omniture.SharedConfigs.WWW,
    'www.netapp.com.au': Omniture.SharedConfigs.WWW,
    'www.netapp.com.sg': Omniture.SharedConfigs.WWW,
    'www.netapp.com.br': Omniture.SharedConfigs.WWW,
    'www.netapp.com.tw': Omniture.SharedConfigs.WWW,
    'startup.netapp.in': Omniture.SharedConfigs.WWW,
    'localhost': Omniture.SharedConfigs.WWW,
    'webdev-sb4.netapp.com': Omniture.SharedConfigs.WWW,
    'dev.www.netapp.com': Omniture.SharedConfigs.WWW,
    'qa.www.netapp.com': Omniture.SharedConfigs.WWW,
    'webdev-rtp.hq.netapp.com': Omniture.SharedConfigs.WWW,
    'www-stg.netapp.com': Omniture.SharedConfigs.WWW,
    'stage.netapp.com': Omniture.SharedConfigs.WWW,
    'www-review.netapp.com': Omniture.SharedConfigs.WWW,
    'review.netapp.com': Omniture.SharedConfigs.WWW,
    'www-dev.netapp.com': Omniture.SharedConfigs.WWW,
    'www-qa-stage.netapp.com': Omniture.SharedConfigs.WWW,
    'www-qa.netapp.com': Omniture.SharedConfigs.WWW,
    'innovationawards.netapp.com': Omniture.SharedConfigs.WWW,
    'box.netapp.com': Omniture.SharedConfigs.Box,
    'blog.netapp.com': Omniture.SharedConfigs.WWW,
    'tv.netapp.com': Omniture.SharedConfigs.WWW,
    'partner-connect.netapp.com': Omniture.SharedConfigs.WWW,
    'datavisionary.netapp.com': Omniture.SharedConfigs.WWW,
    'customers.netapp.com': Omniture.SharedConfigs.WWW,
    'content-hub.netapp.com': Omniture.SharedConfigs.WWW,
    'abm.netapp.com': Omniture.SharedConfigs.WWW,
	'insight.netapp.com': Omniture.SharedConfigs.WWW
};

Omniture.SiteSections = {
    WWW: {
        preprocess: function () {
            this.calculatePageVars();
        },

        calculatePageVars: function () {
            var path = document.location.pathname;

            if (path.indexOf('forms') > 0) {
                Omniture.SiteSections.Forms.setupParameters();
            }

            var host = window.location.hostname;
            var pathArray = path.split('/');
            var len = pathArray.length;
            var baseName = pathArray[len - 1];
            var geo;
            var pageName;
            var hostArray = host.split('.');
            var channel;

            if (hostArray[hostArray.length - 1] != "com") {
                geo = hostArray[hostArray.length - 1];
                if (geo === 'cn') {
                    geo = geo + ":lp";	//CN microsite
                }
                if (len > 2) {
                    pageName = geo + ':' + pathArray.slice(1, len - 1).join(':') + ':';
                } else {
                    pageName = geo + pathArray.slice(1, len - 1).join(':') + ':';
                }
                channel = pathArray.length > 2 ? pathArray[1] : 'home';
            } else {
                geo = pathArray[1];
                pageName = pathArray.slice(1, len - 1).join(':') + ':';
                //updated channel for Blog site (old URL: newsroom.netapp.com, new URL: blog.netapp.com)
                if (host.indexOf('blog') >= 0) {
                    channel = 'blog';
                } else if (host.indexOf('tv.netapp.com') >= 0) {
                    channel = 'videos';
                } else if (host.indexOf('partner-connect.netapp.com') >= 0) {
                    channel = 'partner-connect';
                } else if (host.indexOf('datavisionary') >= 0) {
                    channel = "campaigns";
                } else if (host.indexOf('customers.netapp.com') >= 0) {
                    channel = 'customers';
                } else if(host.indexOf('content-hub.netapp.com') >= 0) {
					channel = 'content-hub';
				} else if(host.indexOf('abm.netapp.com') >= 0) {
                   channel = 'abm';
                } else if(host.indexOf('insight.netapp.com') >= 0) {
					channel = 'insight';
				} else {
                    if ((path.indexOf('/us/lp/') >= 0 || path.indexOf('/us/resources/') >= 0 || path.indexOf('/us/slp/') >= 0) && path.indexOf('.aspx') === -1) {
                        channel = 'SIRA forms';
                    } else if (path.indexOf('/us/cloud/') >= 0 && path.indexOf('.aspx') === -1) {
                        channel = 'Products';
                    } else {
                        channel = pathArray.length > 3 ? pathArray[2] : 'home';
                    }

                }

            }
            geo = Omniture.PageLoad.normalizeGeo(geo);

            var subSection = pathArray.length >= 5 ? pathArray[3] : '';

            if (baseName && baseName.length > 0) {
                pageName += baseName.split('.')[0];
            } else {
                pageName += 'index';
            }
            var pageVars = {
                'baseName': baseName,
                'channel': channel,
                'pageName': pageName,
                'geo': geo
            };

            //setting page vars 
            Omniture.PageLoad.setPageVars(pageVars);

        }
    },

    Forms: {
        setupParameters: function () {
            var path = document.location.pathname;
            var pathArray = path.split('/');
            var len = pathArray.length;
            var pageName = pathArray[len - 1];
            var folderName = pathArray[len - 2];
            var baseName = Omniture.System.pathArray[Omniture.System.pathArray.length - 1];
            var eventName = Omniture.System.pathArray[Omniture.System.pathArray.length - 2];
            var formPath = folderName + ":" + baseName;	/** setting this as default value **/

            if (baseName.indexOf("pcdownload") >= 0) {
                var assetName = Omniture.Util.getQueryString('pconid');
                Omniture.PageLoad.setCustomParam('eVar5', assetName);
            }
            
            if ((document.location.search.indexOf("s=y") >= 0) || Omniture.Util.getQueryString("s") === "ya" || (Omniture.Util.getStrippedBasename().indexOf("-ty") >= 0) || (Omniture.Util.getStrippedBasename().indexOf("thank-you") >= 0)) {
                this.setThankYouParams(formPath);
            }

        },
        setThankYouParams: function (formPath) {
            var eventName = Omniture.System.pathArray[Omniture.System.pathArray.length - 2];
            var events_str = 'event79';
            var formName = $('.ntapForm').find('[name=elqFormName]').val(); //set formName same as eloqua form name for tracking
            Omniture.PageLoad.setCustomParam('eVar47', formName);
            if (formPath.indexOf('eit-msb-library') >= 0 || formPath.indexOf('pcdownload') >= 0) {
                events_str += ',event1';
            }

            Omniture.PageLoad.setCustomParam('events', events_str);
            var geo = Omniture.Util.getGeo();
            if (window.location.href.indexOf('events') > 0) {
                Omniture.PageLoad.setCustomParam('pageName', geo + ':' + eventName + ':event:thankyou');
            } else {
                Omniture.PageLoad.setCustomParam('pageName', geo + ':forms:thankyou-' + Omniture.Util.getStrippedBasename());
            }

        }
    },

};

Omniture.System.preProcess();
jQuery(window).load(function () {
    Omniture.System.postProcess();
});
/*
     FILE ARCHIVED ON 04:54:30 Oct 04, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:36:33 Nov 27, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 71.55 (3)
  CDXLines.iter: 12.819 (3)
  RedisCDXSource: 1098.711
  exclusion.robots: 0.233
  load_resource: 522.629
  PetaboxLoader3.resolve: 449.94 (2)
  captures_list: 1187.177
  PetaboxLoader3.datanode: 132.362 (5)
  esindex: 0.016
  exclusion.robots.policy: 0.217
*/