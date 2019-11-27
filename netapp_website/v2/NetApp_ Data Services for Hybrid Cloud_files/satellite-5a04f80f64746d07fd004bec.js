_satellite.pushAsyncScript(function(event, target, $variables){
  var source,
    url = document.location.href;
if(url.indexOf("/us/index.aspx") > -1){
	source = "https://s.amazon-adsystem.com/iui3?d=forester-did&ex-fargs=%3Fid%3D8e9c7445-0e43-08f3-ad19-b53dac60024a%26type%3D55%26m%3D1&ex-fch=416613&ex-src=www.netapp.com&ex-hargs=v%3D1.0%3Bc%3D1243631920601%3Bp%3D8E9C7445-0E43-08F3-AD19-B53DAC60024A";
}else if(url.indexOf("secure-office-365-environment-awsebook.aspx") > -1) {
	source = "https://s.amazon-adsystem.com/iui3?d=forester-did&ex-fargs=%3Fid%3D3a83f0ec-36e8-b6a4-f13f-83043cb797dc%26type%3D6%26m%3D1&ex-fch=416613&ex-src=www.netapp.com&ex-hargs=v%3D1.0%3Bc%3D1243631920601%3Bp%3D3A83F0EC-36E8-B6A4-F13F-83043CB797DC";
}else if(url.indexOf("protect-your-saas-data-webcast.aspx") > -1) {
	source = "https://s.amazon-adsystem.com/iui3?d=forester-did&ex-fargs=%3Fid%3Df1694b2e-ad96-9314-c18f-2270553069c8%26type%3D15%26m%3D1&ex-fch=416613&ex-src=www.netapp.com&ex-hargs=v%3D1.0%3Bc%3D1243631920601%3Bp%3DF1694B2E-AD96-9314-C18F-2270553069C8";
}else if(url.indexOf("aws-gestalt-lp-netapp.aspx") > -1) {
	source = "https://s.amazon-adsystem.com/iui3?d=forester-did&ex-fargs=%3Fid%3Df3e57da2-86f3-d684-3731-42d6f38c3a29%26type%3D31%26m%3D1&ex-fch=416613&ex-src=www.netapp.com&ex-hargs=v%3D1.0%3Bc%3D1243631920601%3Bp%3DF3E57DA2-86F3-D684-3731-42D6F38C3A29";
}

var dcIMG = document.createElement('img');
dcIMG.setAttribute('src', source);

dcIMG.setAttribute('height','1');
dcIMG.setAttribute('width','1');
dcIMG.setAttribute('border','0');
dcIMG.setAttribute('style','display:none');
document.body.appendChild(dcIMG);
});
