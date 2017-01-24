//#####################################  LEGACY DOM  ########################################
function Browser(){
 d=document;
 this.agt=navigator.userAgent.toLowerCase();
 this.major = parseInt(navigator.appVersion);
 this.dom=(d.getElementById)?1:0;
 this.ns=(d.layers);
 this.ns4up=(this.ns && this.major >=4);
 this.ns6=(this.dom&&navigator.appName=="Netscape");
 this.op=(window.opera? 1:0);
 this.ie=(d.all);
 this.ie4=(d.all&&!this.dom)?1:0;
 this.ie4up=(this.ie && this.major >= 4);
 this.ie5=(d.all&&this.dom);
 this.win=((this.agt.indexOf("win")!=-1) || (this.agt.indexOf("16bit")!=-1));
 this.mac=(this.agt.indexOf("mac")!=-1);
}
var oBw = new Browser();
function getObj(id,d) {
  var i,x;  if(!d) d=document; 
  if(!(x=d[id])&&d.all) x=d.all[id]; 
  for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][id];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=getObj(id,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(id); 
  return x;
}
// 1k DHTML API http://www.dithered.com/experiments/1kdhtml/index.html
function setStyle(o,s,v) { if(oBw.ie5||oBw.dom) eval("o.style."+s+" = '" + v +"'"); }
function getStyle(o,s) { if(oBw.ie5||oBw.dom) return eval("o.style."+s); }
function addEvt(o,e,f,c){ if(o.addEventListener)o.addEventListener(e,f,c);else if(o.attachEvent)o.attachEvent("on"+e,f);else eval("o.on"+e+"="+f)}
function insertHTML(o,h,w) {
  if (oBw.op) return;
  if (o.insertAdjacentHTML) { o.insertAdjacentHTML(w,h); return; }
  var r = o.ownerDocument.createRange();
  r.setStartBefore(o);
  var frag = r.createContextualFragment(h);
  o.appendChild(frag); 
  return;
}
function show(id){if(oBw.ns){document.layers[id].visibility = "show";}else{setStyle(getObj(id),"display","block")};}
function hide(id){if(oBw.ns){document.layers[id].visibility = "hide";}else{setStyle(getObj(id),"display","none")};}
if (oBw.ns){document.write("<style>.bxh{position:absolute;visibility:hide;}</style>");}
else{document.write("<style>.bxh{display:none;}</style>");}
if(oBw.ns){spacingwidth="screenX";spacingheight="screenY";}
else{isie = true;spacingwidth="left";spacingheight="top";}





//##################################### ZOOM #############################################
window.onload = initZoom; 
var zoomClass = "zoom";
var normalWidth = new Array();
var normalHeight = new Array();
var getZoom = new Array();

function findDOM(objectId) {
	if (document.getElementById) {
		return (document.getElementById(objectId));}
	if (document.all) {
		return (document.all[objectId]);}
}
function zoom(type,imgx,iWidthIn,iHeightIn) {
	imgd = findDOM(imgx);
	//alert(imgd.width + ", " + imgd.height);
	if (type=="+" && imgd.width >= iWidthIn) {
		imgd.width = 2*imgd.width;
		imgd.height = 2*imgd.height;
	}
	if (type=="-" && imgd.width > iWidthIn) {
		imgd.width = imgd.width/2;
		imgd.height = imgd.height/2;
	}
} 

function initZoom() {
	// Find all IMG tags of the zoom class
	var allImgs = new Array();
	allImgs = document.body.getElementsByTagName('IMG');
	for ( i = 0; i < allImgs.length; i++ ) {
		if (allImgs[i].className.toLowerCase() == zoomClass.toLowerCase())
		getZoom[getZoom.length] = allImgs[i];
	} // next i
	// Go through all images marked zoomable
	for (i=0; i < getZoom.length; i++) {
		// Save and initiate the original height
		normalWidth[i] = getZoom[i].width;
		normalHeight[i] = getZoom[i].height;
		getZoom[i].width = normalWidth[i]; // DHTML is funny sometimes :(
		getZoom[i].height = normalHeight[i];
		// add the click event, stupid cross-browser bullshit

		if (document.addEventListener) {
			getZoom[i].addEventListener('click', zoomImg, false);
		} else {
			getZoom[i].onclick = zoomImg;
		} // end if

	}  // next i

} // end initZoom


function zoomImg(e) {
	// Determine which keys are pressed (more cross-browser bullshit)
	if (e) {
		ctrlPress = e.ctrlKey;
		shiftPress = e.shiftKey;
		altPress = e.altKey;
	} else {
		ctrlPress = event.ctrlKey;
		shiftPress = event.shiftKey;
		altPress = event.altKey;
	} // end if
	// Get the index of the clicked image
	for (i=0;i<getZoom.length;i++) {
		if (this == getZoom[i])	imgToZoom = i;
	} // next i
	if (altPress) { // return image to original dimensions
		getZoom[imgToZoom].width = normalWidth[imgToZoom];
		getZoom[imgToZoom].height = normalHeight[imgToZoom];
	} else if (ctrlPress || shiftPress) { // zoom out
		if (getZoom[imgToZoom].width > normalWidth[imgToZoom]) {
			getZoom[imgToZoom].width -= normalWidth[imgToZoom];
			getZoom[imgToZoom].height -= normalHeight[imgToZoom];
		} // end if
	} else { // zoom in
		getZoom[imgToZoom].width += normalWidth[imgToZoom];
		getZoom[imgToZoom].height += normalHeight[imgToZoom];
	} // end if
} // end zoomImg
