function joom_getcoordinates()
{document.nameshieldform.xvalue.value=document.getElementById('jg-movable-nametag').offsetTop;document.nameshieldform.yvalue.value=document.getElementById('jg-movable-nametag').offsetLeft;document.nameshieldform.submit();}
function selectnametag(id,username)
{window.parent.document.getElementById('jg-movable-nametag').removeClass('jg_displaynone');window.parent.document.getElementById('jg-movable-nametag').set('text',username);window.parent.document.nameshieldform.userid.value=id;width=username.length*jg_nameshields_width;window.parent.document.getElementById('jg-movable-nametag').style.width=width+'px';window.parent.SqueezeBox.close();window.parent.document.getElementById('jg-movable-nametag-icon').position({relativeTo:document.id('jg-movable-nametag'),position:'upperRight',edge:'bottomLeft'}).reveal();}
function joom_validatecomment()
{if(document.commentform.cmttext.value=='')
{alert(Joomla.JText._('COM_JOOMGALLERY_DETAIL_COMMENTS_ALERT_ENTER_COMMENT'));}
else
{if(document.commentform.jg_captcha_code!=null&&document.commentform.jg_captcha_code.value=='')
{alert(Joomla.JText._('COM_JOOMGALLERY_DETAIL_COMMENTS_ALERT_ENTER_CODE'));}
else
{document.commentform.submit();}}}
function joom_smilie(thesmile)
{document.commentform.cmttext.value+=thesmile+' ';document.commentform.cmttext.focus();}
function joom_validatesend2friend()
{if((document.send2friend.send2friendname.value=='')||(document.send2friend.send2friendemail.value==''))
{alert(Joomla.JText._('COM_JOOMGALLERY_DETAIL_SENDTOFRIEND_ALERT_ENTER_NAME_EMAIL'));}
else
{document.send2friend.submit();}}
function joom_cursorchange(e)
{active_slimbox=document.getElementById("lbOverlay");if(active_slimbox!=null&&active_slimbox.style.visibility=="visible")
{return;}
active_shadowbox=document.getElementById("sb-overlay");if(active_shadowbox!=null&&active_shadowbox.style.length!=0)
{return;}
var target;if(typeof e=='undefined')
{target=document.activeElement.type;}
else
{if(typeof e.explicitOriginalTarget=='undefined')
{target=e.target.type;}
else
{target=e.explicitOriginalTarget.type;}}
if(typeof target=="undefined"||target.indexOf("text")!=0)
{if(navigator.appName=="Microsoft Internet Explorer")
{taste=window.event.keyCode;}
else
{taste=e.which;}
switch(taste)
{case 37:if(document.form_jg_back_link)
{window.location=document.form_jg_back_link.action;}
break;case 39:if(document.form_jg_forward_link)
{window.location=document.form_jg_forward_link.action;}
break;default:break;}}}
function joomGetVoteValue()
{return $('ratingform').getElements('input').filter(function(input)
{return /radio|checkbox/.test(input.getAttribute('type'))&&input.checked;})[0].value;}
function joomVote(url,imgvote)
{location.href=url+"&imgvote="+imgvote;}
function joomAjaxVote(url,postdata)
{if($('jg_ajaxvoting_message'))
{$('jg_ajaxvoting_message').dispose();}
$('jg_voting').addClass('jg_spinner');new Request.JSON({url:url,method:'post',data:postdata,onError:function(text,error)
{alert(error);},onFailure:function()
{alert('Ajax Error');},onSuccess:function(response)
{joomAjaxVoteResponse(response);},onError:function(text,error)
{alert(error+":\n\n"+text);}}).send();}
function joomAjaxVoteResponse(response)
{if(response.error=='0'&&$('jg_photo_rating'))
{$('jg_photo_rating').set('html',response.data.rating);if(response.data.tooltipclass!=null)
{if(response.data.tooltipclass=='default')
{jQuery('.hasHintAjaxVote').tooltip();}
else
{jQuery('.hasHintAjaxVote').tooltip({template:'<div class="jg-tooltip-wrap tooltip"><div class="tooltip-inner tip"></div></div>'});}}}
$('jg_voting').removeClass('jg_spinner');if($('jg_starrating_bar'))
{new Element('div',{'id':'jg_ajaxvoting_message','style':'text-align: center;'}).inject($('jg_starrating_bar'),'before');}
else
{new Element('div',{'id':'jg_ajaxvoting_message'}).inject($('ratingform'),'before');}
$('jg_ajaxvoting_message').set('html',response.message);}