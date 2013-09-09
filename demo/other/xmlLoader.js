//支持 ie firefox chrome 等浏览器的 xml loader
var loadXMLDoc=function(xml) {
    var xmlDoc;
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
        xmlDoc.async = false;
        xmlDoc.load(xml);
    } else if (document.implementation && document.implementation.createDocument) {
        try{
            xmlDoc = document.implementation.createDocument('', '', null);
            xmlDoc.async = false;
            xmlDoc.load(xml);
        } catch(e){
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET",xml,false);
            xmlhttp.send(null);
            xmlDoc = xmlhttp.responseXML.documentElement;
        }
    } else {
        return null;
    }

    return xmlDoc;
};