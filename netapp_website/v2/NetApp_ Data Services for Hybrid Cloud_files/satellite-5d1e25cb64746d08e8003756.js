_satellite.pushAsyncScript(function(event, target, $variables){
  /**
Start of Floodlight Tag: Please do not remove
Activity name of this tag: GB | FY20 | SSS | 3 Benefits eBook | Land
URL of the webpage where the tag is expected to be placed: https://www.netapp.com/us/forms/campaign/3-benefits-ebook-sap-lp.aspx
This tag must be placed between the <body> and </body> tags, as close as possible to the opening tag.
Creation Date: 04/07/2019
**/
var axel = Math.random() + "";
var a = axel * 10000000000000;
var dcIMG = document.createElement('iframe');
var url = document.location.href;
var category, group, type;
var geo = _satellite.getVar('dl.geo');
 
if (geo === "us" && url.indexOf('/forms/campaign/3-benefits-ebook-sap-lp.aspx') > -1) {
	type = "sapm70";
	category = "usfy200";
}


if(category && category !== undefined){
  dcIMG.setAttribute('src', 'https://4355326.fls.doubleclick.net/activityi;src=4355326;type=' + type + ';cat=' + category + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=1;num=' + a + '?');

  dcIMG.setAttribute('height','1');
  dcIMG.setAttribute('width','1');
  dcIMG.setAttribute('border','0');
  dcIMG.setAttribute('style','display:none');
  document.body.appendChild(dcIMG);
}
/*** End of DoubleClick Floodlight Tag: Please do not remove ***/
});
