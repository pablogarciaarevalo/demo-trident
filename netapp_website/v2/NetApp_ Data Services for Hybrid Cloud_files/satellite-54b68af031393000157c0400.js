
if(!_satellite.readCookie("__ntap_global_id") && _satellite.getVar("MonsterCookie") != undefined){
	//if no cookie is set, gather information and set cookie for a year
	_satellite.setCookie("__ntap_global_id",_satellite.getVar("MonsterCookie"),365);
	//console.log("logic dictated setting of cookie");
} else {
	//do nothing
	if(_satellite.readCookie("__ntap_global_id") === "null" || _satellite.readCookie("__ntap_global_id").indexOf("t") !== 1){
	  _satellite.setCookie("__ntap_global_id",_satellite.getVar("MonsterCookie"),365);
	  //console.log("logic dictated overwrite null");
	}
	else {
	  //console.log("logic dictated no action");
	}
}