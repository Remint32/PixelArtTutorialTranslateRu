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








//#####################################  PIXELJOINT  ########################################
function AlertRegister(){
	alert("This function is only available to logged in members.\n\nWhy not register now - it's free!");
}
function toolaccess(){
	if (confirm("You need to be a logged in member to access this feature.\n\nWould you like to register for a free account?")){
	document.location.href="/pixels/register.asp";
	}
}
function wipelogin(){
	var frm = document.frmtop;
	if (frm.login.value == "Username" || frm.password.value == "XXXXXXX"){
		frm.login.value = "";
		frm.password.value = "";
	}
}
function openpopup(urlin,namein,widthin,heightin,settingsin){
	if (settingsin == 'fixed'){settingsin = 'toolbar=no,location=no,menubar=no,status=no,directories=no,resizable=no,scrollbars=no';}
	if (settingsin == 'main'){settingsin = 'status=yes,resizable=yes,scrollbars=yes';}
	screenX = (screen.availWidth/2) - (widthin/2);
	screenY = (screen.availHeight/2) - (heightin/2);
	window.open(urlin,namein,settingsin +',height='+ heightin +',width='+ widthin +','+spacingheight+'='+screenY+','+spacingwidth+'='+screenX+'');
}
function InRange(numin,rangestart,rangeend){
	if (isNaN(numin)){
		return false;
	}else{
		if (numin >= rangestart && numin <= rangeend){
			return true;
		}else{
			return false;
		}
	}
}
function RemoveBuddy(iUID,iID){
	if (confirm('Are you sure you wanna remove this buddy?')){
		location.href='/pixels/buddy.asp?d=1&id=' + iID + '&uid=' + iUID;
	}
}
function RemoveFavorites(iUID,iID){
	if (confirm('Are you sure you wanna remove this from your favorites gallery?')){
		location.href='/pixels/logfavorites.asp?d=1&id=' + iID + '&uid=' + iUID;
	}
}
function GetRTEContents(RTEIn){
	// Get the editor instance that we want to interact with.
	var oEditor = FCKeditorAPI.GetInstance(RTEIn) ;
	// Get the editor contents in XHTML.
	return oEditor.GetXHTML( true ); // "true" means you want it formatted.	
}
function openpopup(urlin,namein,widthin,heightin,settingsin){
	if (settingsin == 'fixed'){settingsin = 'toolbar=no,location=no,menubar=no,status=no,directories=no,resizable=no,scrollbars=no';}
	if (settingsin == 'main' || settingsin == ''){settingsin = 'status=yes,resizable=yes,scrollbars=yes';}
	screenX = (screen.availWidth/2) - (widthin/2);
	screenY = (screen.availHeight/2) - (heightin/2);
	window.open(urlin,namein,settingsin +',height='+ heightin +',width='+ widthin +','+spacingheight+'='+screenY+','+spacingwidth+'='+screenX+'');
}
$(document).ready(function() {
	$(".imglink").tooltip();
});	


















//#####################################  RATINGS  ########################################
//Star vars
var iStars = 5;
var iTypeID = 2000;
var sStarPath = "/pixels/images/";
var sActionURL = "/pixels/logratings.asp";
var iStarWidth = 10;
var iStarHeight = 10;
var iSpacerWidth = 0;
var oStarImages;
var bRatingsReady = false;
var iRatingCount = 0;
var RatingsData = new Array();
var oActionLink = new Image();
var sHTMLCache;
//Functions
function RatingsShow(iUID,sIDIn,iSelectedIn){	
	var html;
	//Update count
	iRatingCount++;
	//Store data
	RatingsData[iRatingCount] = new Array(sIDIn,iSelectedIn);	
	//Display stars
	html = "<table width='"+ iStars*(iStarWidth+iSpacerWidth) +"' cellpadding='0' cellspacing='0'><tr>";
	for (var i = 1; i < iStars+1; i++) {
		html += "<td width='"+ iStarWidth +"'>";
		html += "<a href=\"JavaScript:RatingsClick(" + iUID + "," + iRatingCount +","+ i +");\">";
		html += "<img src='"+ sStarPath +"stars_";
		if (iSelectedIn < i){
			html += "down";	
		}else{
			html += "up";
		}
		html += ".gif' id='star"+ iRatingCount +"_"+ i +"' alt='"+ i +" points' width='"+ iStarWidth +"' border='0' hspace='0' onMouseOver=\"RatingsMouseOver("+ iRatingCount +","+ i +");\" ";
		html += " onMouseOut=\"RatingsMouseOut("+ iRatingCount +");\" ";
		html += "></a>";
		html += "</td>";		
		if (i != iStars){html += "<td width='"+ iSpacerWidth +"'></td>";}
	}
	html += "</tr></table>";

	document.write("<div id='ratings"+ iRatingCount +"'></div>");	
	document.getElementById("ratings"+iRatingCount).innerHTML = html;	
}
function RatingsMouseOver(iCountIn,iStarIn){
	//Set stars to current mouseover point
	for (var i = 1; i < iStars+1; i++) {
		if (iStarIn < i){
			document.images["star"+iCountIn+"_"+i].src = oStarImages["down"].src;
		}else{
			document.images["star"+iCountIn+"_"+i].src = oStarImages["up"].src;
		}		
	}
	return false;
}
function RatingsMouseOut(iCountIn){
	//Find what star this should revert back to
	var iStarReset;
	var aRating = RatingsData[iCountIn];
	iStarReset = aRating[1];	
	for (var i = 1; i < iStars+1; i++) {
		if (iStarReset < i){
			document.images["star"+iCountIn+"_"+i].src = oStarImages["down"].src;
		}else{
			document.images["star"+iCountIn+"_"+i].src = oStarImages["up"].src;
		}		
	}
	return false;
}
function RatingsClick(iUID,iCountIn,iStarIn){
	//Change which star has the focus
	var aRating = RatingsData[iCountIn];
	var iID;
	aRating[1] = iStarIn;
	iID = aRating[0];
	RatingsData[iCountIn] = aRating;
	
	
	//Show a temp message	
	var oBw = navigator.userAgent.toLowerCase();
	if(oBw.indexOf("safari") == -1){
		sHTMLCache = document.getElementById("ratings"+iCountIn).innerHTML;
		document.getElementById("ratings"+iCountIn).innerHTML = "<table cellpadding=0 cellspacing=0 border=0 width=100><tr><td height='"+ iStarHeight +"' style=\"color:yellow; text-align:center; font-weight:bold;font-size:11px\">Saving&nbsp;...</td></tr></table>";
		window.setTimeout(  eval("\"RevertInnerHTML(" + iCountIn + ")\"")  , 800);
   	}
	//Go out and store this data
	oActionLink.src = sActionURL + "?aid=" + iID + "&tid=" + iTypeID + "&r=" + iStarIn + "&uid=" + iUID;
}
function RevertInnerHTML(iCountIn) {	
	if (document.getElementById("ratings"+iCountIn)){
		document.getElementById("ratings"+iCountIn).innerHTML = sHTMLCache;		
	}
}
function RatingsPreload() {
	var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	
	//Make stars bigger
	if (w < 360){
		iStarWidth = 30;
		iStarHeight = 30;
	}else if (w < 769){
		iStarWidth = 20;
		iStarHeight = 20;		
	}

    // Preload the star images
    if (! oStarImages) {
        oStarImages = new Array();
        oStarImages["up"] = new Image(iStarWidth, iStarHeight);
        oStarImages["up"].src = sStarPath + "stars_up.gif";
        oStarImages["down"] = new Image(iStarWidth, iStarHeight);
        oStarImages["down"].src = sStarPath + "stars_down.gif";		
        bRatingsReady = true;
    }	
}








//#####################################  COUNTDOWN  ######################################
/***********************************************
* Dynamic Countdown script- © Dynamic Drive (http://www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for this script and 100s more.
***********************************************/
function cdtime(container,startdate,targetdate){
	if (!document.getElementById || !document.getElementById(container)) return;
	this.container=document.getElementById(container);
	this.currentTime=new Date(startdate);
	this.targetdate=new Date(targetdate);
	this.timesup=false;
	this.updateTime();
}
cdtime.prototype.updateTime=function(){
	var thisobj=this;
	this.currentTime.setSeconds(this.currentTime.getSeconds()+1);
	setTimeout(function(){thisobj.updateTime()}, 1000); //update time every second
}
cdtime.prototype.displaycountdown=function(baseunit, functionref){
	this.baseunit=baseunit;
	this.formatresults=functionref;
	this.showresults();
}
cdtime.prototype.showresults=function(){
	var thisobj=this;
	var timediff=(this.targetdate-this.currentTime)/1000; //difference btw target date and current date, in seconds
	if (timediff<0){ //if time is up
		this.timesup=true;
		this.container.innerHTML=this.formatresults();
		return;
	}
	var oneMinute=60; //minute unit in seconds
	var oneHour=60*60; //hour unit in seconds
	var oneDay=60*60*24; //day unit in seconds
	var dayfield=Math.floor(timediff/oneDay);
	var hourfield=Math.floor((timediff-dayfield*oneDay)/oneHour);
	var minutefield=Math.floor((timediff-dayfield*oneDay-hourfield*oneHour)/oneMinute);
	var secondfield=Math.floor((timediff-dayfield*oneDay-hourfield*oneHour-minutefield*oneMinute));
	if (this.baseunit=="hours"){ //if base unit is hours, set "hourfield" to be topmost level
		hourfield=dayfield*24+hourfield;
		dayfield="n/a";
	}else if (this.baseunit=="minutes"){ //if base unit is minutes, set "minutefield" to be topmost level
		minutefield=dayfield*24*60+hourfield*60+minutefield;
		dayfield=hourfield="n/a";
	}else if (this.baseunit=="seconds"){ //if base unit is seconds, set "secondfield" to be topmost level
		secondfield=timediff;
		dayfield=hourfield=minutefield="n/a";
	}
	this.container.innerHTML=this.formatresults(dayfield, hourfield, minutefield, secondfield);
	setTimeout(function(){thisobj.showresults()}, 1000); //update results every second
}
function formatresults(){
	if (this.timesup==false){//if target date/time not yet met
		var msg="<div align='center'>";
		//"Weekly pixel art challenge submissions are due in...<br /><br />"
		msg+= "<span class='lcdnum'>" + arguments[0] + "</span>d&nbsp;&nbsp;";
		msg+= "<span class='lcdnum'>"+GetTwoDigit(arguments[1])+"</span>h&nbsp;&nbsp;<span class='lcdnum'>"+GetTwoDigit(arguments[2])+"</span>m&nbsp;&nbsp;<span class='lcdnum'>"+GetTwoDigit(arguments[3])+"</span>s";
		msg+= "</div>";
	}else{ //else if target date/time met
		var msg="<div class='lcdhere' align='center'>Boom!</div>"
	}
	return msg
}
function GetTwoDigit(iNumberIn){
	if (iNumberIn < 10){
		return "0" + iNumberIn;
	}else{
		return iNumberIn;
	}
}







//##################################### ZOOM #############################################
//window.onload = initZoom; 
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














//##################################### HOVER MENU #######################################
//iUID is the current user session
/* AnyLink Drop Down Menu- © Dynamic Drive (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for full source code*/
var mGallery=new Array()
mGallery[0]='<a href="/pixels/new_icons.asp?ob=rating" class="navitem">Hall of Fame</a>'
mGallery[1]='<a href="/pixels/new_icons.asp?ob=showcase" class="navitem">Weekly Showcase</a>'
mGallery[2]='<a href="/pixels/new_icons.asp?ob=date" class="navitem">Newest Pixel Art</a>'
mGallery[3]='<a href="/pixels/challenges.asp" class="navitem">Weekly Challenge</a>'
mGallery[4]='<a href="/pixels/submit_icons.asp" class="navitem">Submit Pixel Art</a>'
mGallery[5]='<a href="/pixels/icon_queue.asp" class="navitem">Public Queue</a>'
mGallery[6]='<a href="/pixels/links.asp?id=2225" class="navitem">Projects</a>'

var mFeatures=new Array()
mFeatures[0]='<a href="/pixels/challenges.asp" class="navitem">Challenges (Weekly!)</a>'
mFeatures[1]='<a href="http://wouterpleizier.nl/pj/" class="navitem">Image Specs Tool</a>'
mFeatures[2]='<a href="/pixels/news.asp?cat=2294" class="navitem">Interviews</a>'
mFeatures[3]='<a href="/pixels/links.asp" class="navitem">Links</a>'
mFeatures[4]='<a href="/pixels/news.asp" class="navitem">News</a>'
mFeatures[5]='<a href="/pixels/links.asp?id=2225" class="navitem">Projects</a>'
mFeatures[6]='<a href="/pixels/tutorials.asp" class="navitem">Tutorials</a>'
mFeatures[7]='<a href="/pixels/news.asp?cat=2426" class="navitem">Videos</a>'

var mProjects=new Array()
mProjects[0]='<a href="/pixels/challenges.asp" class="navitem">Weekly Challenge</a>'
mProjects[1]='<a href="/projects/lildudes/" class="navitem">Lil Dudes</a>'
mProjects[2]='<a href="/pixelart/2302/Pixelation_Portraits.htm" class="navitem">Pixelation Portraits</a>'
mProjects[3]='<a href="/pixelart/2303/PixelStamps.htm" class="navitem">PixelStamps</a>'
mProjects[4]='<a href="/projects/pixelween/" class="navitem">Pixelween 2005</a>'
mProjects[5]='<a href="/projects/pixelween2006/" class="navitem">Pixelween 2006</a>'
mProjects[6]='<a href="/projects/pixelween2007/" class="navitem">Pixelween 2007</a>'
mProjects[7]='<a href="/projects/thejoint/" class="navitem">The Joint</a>'
mProjects[8]='<a href="/projects/wee/" class="navitem">Wee!</a>'

var mCommunity=new Array()
mCommunity[0]='<a href="/pixels/aboutus.asp" class="navitem">About Pixel Joint</a>'
mCommunity[1]='<a href="/pixels/members.asp" class="navitem">Members</a>'
mCommunity[2]='<a href="/pixels/members_awards.asp" class="navitem">Awards</a>'
mCommunity[3]='<a href="/pixels/register.asp" class="navitem">Register</a>'

var mUser=new Array()
mUser[0]='<a href="/pixels/profile.asp" class="navitem">My Profile</a>'
mUser[1]='<a href="/pixels/profile_edit.asp" class="navitem">Edit Profile</a>'
mUser[2]='<a href="/pixels/profile_themes.asp" class="navitem">Change Theme</a>'
mUser[3]='<a href="/pixels/profile_avatar.asp" class="navitem">Change Avatar</a>'
mUser[4]='<a href="/pixels/profile.asp?pg=1&sec=buds#iv" class="navitem">My Buddies</a>'
mUser[5]='<a href="/pixels/submit_icons.asp" class="navitem">Submit Pixel Art</a>'
mUser[6]='<a href="/pixels/submit_news.asp" class="navitem">Submit News</a>'

function SearchSite(){
	var sSearch = escape(document.fsearch.search.value);
	if (document.fsearch.stype[0].checked){
		document.location.href="/pixels/new_icons.asp?dosearch=1&ob=search&search=" + sSearch
	}else if(document.fsearch.stype[1].checked){
		document.location.href="/pixels/news.asp?search=" + sSearch
	}else if(document.fsearch.stype[2].checked){
		document.location.href="/pixels/links.asp?search=" + sSearch
	}else if(document.fsearch.stype[3].checked){
		document.location.href="/pixels/members.asp?v=search&search=" + sSearch
	}
}
function SearchOnEnter(event){
	var bOldBrowser = (document.layers) ? true : false;
	var iKeyCode = 0;
	if (bOldBrowser){
		iKeyCode = event.which;
	}else{
		iKeyCode = event.keyCode;
	}
	if (iKeyCode == 13){SearchSite();}
}
function smenu(pagein){
	var mSearch=new Array()
	mSearch[0]='<div align="center" style="border-bottom: 1px solid black;padding:10px 10px 10px 10px;color:white;">'
	mSearch[0]+='<form name="fsearch" onSubmit="SearchSite()" ID="fsearch" style="margin:0;">'
	mSearch[0]+='<input type="text" name="search" size="10" maxlength= "20" style="width:100px;" onkeypress="SearchOnEnter(event)" /><br />'
	mSearch[0]+='<input type=radio name=stype value="pixels"'
	if(pagein=='pixels'){mSearch[0]+=' checked'}
	mSearch[0]+='>Pixel Art'	
	mSearch[0]+='<input type=radio name=stype value="news"'
	if(pagein=='news'){mSearch[0]+=' checked'}
	mSearch[0]+='>News'	
	mSearch[0]+='<input type=radio name=stype value="links"'
	if(pagein=='links'){mSearch[0]+=' checked'}
	mSearch[0]+='>Links'
	mSearch[0]+='<input type=radio name=stype value="members"'
	if(pagein=='members'){mSearch[0]+=' checked'}
	mSearch[0]+='>Members'	
	mSearch[0]+='<br /><input type="button" value="search" class="button" style="width:100px;" onClick="SearchSite();">'
	mSearch[0]+='</form>'
	mSearch[0]+='</div>'
	return mSearch;
}
function umenu(iUID,idin){
	var tmenu=new Array();
	tmenu[0]='<a href="/p/'+ idin +'.htm" target="_top" class="navitem">View Profile</a>'
	tmenu[1]='<a href="/pixels/pm.asp?id='+ idin +'" target="_top" class="navitem">Send Private Message</a>'
	tmenu[2]='<a href="/pixels/new_icons.asp?owner='+ idin +'&ob=search&dosearch=1" target="_top" class="navitem">Search Pixel Art</a>'
	tmenu[3]='<a href="/pixels/buddy.asp?id='+ idin +'&uid='+ iUID +'" target="_top" class="navitem">Add to Buddy List</a>'
	tmenu[4]='<a href="/pixels/contact.asp?subject=member&iurl=/p/'+ idin +'.htm" target="_top" class="navitem">Report Member</a>'
	return tmenu;
}
function fmenu(idin,namein){
	var menu1=new Array()
	menu1[0]='<a href="member_profile.asp?PF='+ idin +'" class="navitem">View Profile</a>'
	menu1[1]='<a href="/pixels/profile.asp?fid='+ idin +'" target="_blank" class="navitem">Pixel Joint Gallery</a>'
	menu1[2]='<a href="pm_new_message_form.asp?name='+ namein +'" class="navitem">Send Private Message</a>'
	menu1[3]='<a href="pm_buddy_list.asp?name='+ namein +'" class="navitem">Add to Buddy List</a>'
	menu1[4]='<a href="search_form.asp?USR='+ namein +'" class="navitem">Search Forum Posts</a>'
	return menu1;
}

function ddm(obj, e, menucontents, menuwidth){dropdownmenu(obj, e, menucontents, menuwidth);}
function dhm(){delayhidemenu()}
var menuwidth='165px';
var menubgcolor='#000000';
var disappeardelay=250;
var hidemenu_onclick="no";


var ie4=document.all
var ns6=document.getElementById&&!document.all

if (ie4||ns6)
document.write('<div id="dropmenudiv" style="visibility:hidden;width:'+menuwidth+';background-color:'+menubgcolor+'" onMouseover="clearhidemenu()" onMouseout="dynamichide(event)"></div>')

function getposOffset(what, offsettype){
var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
var parentEl=what.offsetParent;
while (parentEl!=null){
totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
parentEl=parentEl.offsetParent;
}
return totaloffset;
}

function showhide(obj, e, visible, hidden, menuwidth){
if (ie4||ns6)
dropmenuobj.style.left=dropmenuobj.style.top=-500
if (menuwidth!=""){
dropmenuobj.widthobj=dropmenuobj.style
dropmenuobj.widthobj.width=menuwidth
}
if (e.type=="click" && obj.visibility==hidden || e.type=="mouseover")
obj.visibility=visible
else if (e.type=="click")
obj.visibility=hidden
}

function iecompattest(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function clearbrowseredge(obj, whichedge){
var edgeoffset=0
if (whichedge=="rightedge"){
var windowedge=ie4 && !window.opera? iecompattest().scrollLeft+iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15
dropmenuobj.contentmeasure=dropmenuobj.offsetWidth
if (windowedge-dropmenuobj.x < dropmenuobj.contentmeasure)
edgeoffset=dropmenuobj.contentmeasure-obj.offsetWidth
}
else{
var topedge=ie4 && !window.opera? iecompattest().scrollTop : window.pageYOffset
var windowedge=ie4 && !window.opera? iecompattest().scrollTop+iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
dropmenuobj.contentmeasure=dropmenuobj.offsetHeight
if (windowedge-dropmenuobj.y < dropmenuobj.contentmeasure){ //move up?
edgeoffset=dropmenuobj.contentmeasure+obj.offsetHeight
if ((dropmenuobj.y-topedge)<dropmenuobj.contentmeasure) //up no good either?
edgeoffset=dropmenuobj.y+obj.offsetHeight-topedge
}
}
return edgeoffset
}

function populatemenu(what){
if (ie4||ns6)
dropmenuobj.innerHTML=what.join("")
}

function dropdownmenu(obj, e, menucontents, menuwidth){
if (window.event) event.cancelBubble=true
else if (e.stopPropagation) e.stopPropagation()
clearhidemenu()
dropmenuobj=document.getElementById? document.getElementById("dropmenudiv") : dropmenudiv
populatemenu(menucontents)

if (ie4||ns6){
showhide(dropmenuobj.style, e, "visible", "hidden", menuwidth)
dropmenuobj.x=getposOffset(obj, "left") - 4
dropmenuobj.y=getposOffset(obj, "top") + 4
dropmenuobj.style.left=dropmenuobj.x-clearbrowseredge(obj, "rightedge")+"px"
dropmenuobj.style.top=dropmenuobj.y-clearbrowseredge(obj, "bottomedge")+obj.offsetHeight+"px"
}

return clickreturnvalue()
}

function clickreturnvalue(){
//if (ie4||ns6) return false
//else return true
return true
}

function contains_ns6(a, b) {
while (b.parentNode)
if ((b = b.parentNode) == a)
return true;
return false;
}

function dynamichide(e){
if (ie4&&!dropmenuobj.contains(e.toElement))
delayhidemenu()
else if (ns6&&e.currentTarget!= e.relatedTarget&& !contains_ns6(e.currentTarget, e.relatedTarget))
delayhidemenu()
}

function hidemenu(e){
if (typeof dropmenuobj!="undefined"){
if (ie4||ns6)
dropmenuobj.style.visibility="hidden"
}
}

function delayhidemenu(){
if (ie4||ns6)
delayhide=setTimeout("hidemenu()",disappeardelay)
}

function clearhidemenu(){
if (typeof delayhide!="undefined")
clearTimeout(delayhide)
}

if (hidemenu_onclick=="yes")
document.onclick=hidemenu