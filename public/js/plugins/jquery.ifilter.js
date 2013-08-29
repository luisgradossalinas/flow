/*JSON*/

if(!this.JSON){this.JSON={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());

/* UI CORE */
jQuery.ui||(
function($){var _remove=$.fn.remove,isFF2=$.browser.mozilla&&(parseFloat($.browser.version)<1.9);$.ui={version:"1.7.2",plugin:{add:function(module,option,set){var proto=$.ui[module].prototype;for(var i in set){proto.plugins[i]=proto.plugins[i]||[];proto.plugins[i].push([option,set[i]]);}},call:function(instance,name,args){var set=instance.plugins[name];if(!set||!instance.element[0].parentNode){return;}for(var i=0;i<set.length;i++){if(instance.options[set[i][0]]){set[i][1].apply(instance.element,args);}}}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b);},hasScroll:function(el,a){if($(el).css('overflow')=='hidden'){return false;}var scroll=(a&&a=='left')?'scrollLeft':'scrollTop',has=false;if(el[scroll]>0){return true;}el[scroll]=1;has=(el[scroll]>0);el[scroll]=0;return has;},isOverAxis:function(x,reference,size){return(x>reference)&&(x<(reference+size));},isOver:function(y,x,top,left,height,width){return $.ui.isOverAxis(y,top,height)&&$.ui.isOverAxis(x,left,width);},keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38}};if(isFF2){var attr=$.attr,removeAttr=$.fn.removeAttr,ariaNS="http://www.w3.org/2005/07/aaa",ariaState=/^aria-/,ariaRole=/^wairole:/;$.attr=function(elem,name,value){var set=value!==undefined;return(name=='role'?(set?attr.call(this,elem,name,"wairole:"+value):(attr.apply(this,arguments)||"").replace(ariaRole,"")):(ariaState.test(name)?(set?elem.setAttributeNS(ariaNS,name.replace(ariaState,"aaa:"),value):attr.call(this,elem,name.replace(ariaState,"aaa:"))):attr.apply(this,arguments)));};$.fn.removeAttr=function(name){return(ariaState.test(name)?this.each(function(){this.removeAttributeNS(ariaNS,name.replace(ariaState,""));}):removeAttr.call(this,name));};}$.fn.extend({remove:function(){$("*",this).add(this).each(function(){$(this).triggerHandler("remove");});return _remove.apply(this,arguments);},enableSelection:function(){return this.attr('unselectable','off').css('MozUserSelect','').unbind('selectstart.ui');},disableSelection:function(){return this.attr('unselectable','on').css('MozUserSelect','none').bind('selectstart.ui',function(){return false;});},scrollParent:function(){var scrollParent;if(($.browser.msie&&(/(static|relative)/).test(this.css('position')))||(/absolute/).test(this.css('position'))){scrollParent=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test($.curCSS(this,'position',1))&&(/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));}).eq(0);}else{scrollParent=this.parents().filter(function(){return(/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));}).eq(0);}return(/fixed/).test(this.css('position'))||!scrollParent.length?$(document):scrollParent;}});$.extend($.expr[':'],{data:function(elem,i,match){return!!$.data(elem,match[3]);},focusable:function(element){var nodeName=element.nodeName.toLowerCase(),tabIndex=$.attr(element,'tabindex');return(/input|select|textarea|button|object/.test(nodeName)?!element.disabled:'a'==nodeName||'area'==nodeName?element.href||!isNaN(tabIndex):!isNaN(tabIndex))&&!$(element)['area'==nodeName?'parents':'closest'](':hidden').length;},tabbable:function(element){var tabIndex=$.attr(element,'tabindex');return(isNaN(tabIndex)||tabIndex>=0)&&$(element).is(':focusable');}});function getter(namespace,plugin,method,args){function getMethods(type){var methods=$[namespace][plugin][type]||[];return(typeof methods=='string'?methods.split(/,?\s+/):methods);}var methods=getMethods('getter');if(args.length==1&&typeof args[0]=='string'){methods=methods.concat(getMethods('getterSetter'));}return($.inArray(method,methods)!=-1);}$.widget=function(name,prototype){var namespace=name.split(".")[0];name=name.split(".")[1];$.fn[name]=function(options){var isMethodCall=(typeof options=='string'),args=Array.prototype.slice.call(arguments,1);if(isMethodCall&&options.substring(0,1)=='_'){return this;}if(isMethodCall&&getter(namespace,name,options,args)){var instance=$.data(this[0],name);return(instance?instance[options].apply(instance,args):undefined);}return this.each(function(){var instance=$.data(this,name);(!instance&&!isMethodCall&&$.data(this,name,new $[namespace][name](this,options))._init());(instance&&isMethodCall&&$.isFunction(instance[options])&&instance[options].apply(instance,args));});};$[namespace]=$[namespace]||{};$[namespace][name]=function(element,options){var self=this;this.namespace=namespace;this.widgetName=name;this.widgetEventPrefix=$[namespace][name].eventPrefix||name;this.widgetBaseClass=namespace+'-'+name;this.options=$.extend({},$.widget.defaults,$[namespace][name].defaults,$.metadata&&$.metadata.get(element)[name],options);this.element=$(element).bind('setData.'+name,function(event,key,value){if(event.target==element){return self._setData(key,value);}}).bind('getData.'+name,function(event,key){if(event.target==element){return self._getData(key);}}).bind('remove',function(){return self.destroy();});};$[namespace][name].prototype=$.extend({},$.widget.prototype,prototype);$[namespace][name].getterSetter='option';};$.widget.prototype={_init:function(){},destroy:function(){this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass+'-disabled'+' '+this.namespace+'-state-disabled').removeAttr('aria-disabled');},option:function(key,value){var options=key,self=this;if(typeof key=="string"){if(value===undefined){return this._getData(key);}options={};options[key]=value;}$.each(options,function(key,value){self._setData(key,value);});},_getData:function(key){return this.options[key];},_setData:function(key,value){this.options[key]=value;if(key=='disabled'){this.element[value?'addClass':'removeClass'](this.widgetBaseClass+'-disabled'+' '+this.namespace+'-state-disabled').attr("aria-disabled",value);}},enable:function(){this._setData('disabled',false);},disable:function(){this._setData('disabled',true);},_trigger:function(type,event,data){var callback=this.options[type],eventName=(type==this.widgetEventPrefix?type:this.widgetEventPrefix+type);event=$.Event(event);event.type=eventName;if(event.originalEvent){for(var i=$.event.props.length,prop;i;){prop=$.event.props[--i];event[prop]=event.originalEvent[prop];}}this.element.trigger(event,data);return!($.isFunction(callback)&&callback.call(this.element[0],event,data)===false||event.isDefaultPrevented());}};$.widget.defaults={disabled:false};$.ui.mouse={_mouseInit:function(){var self=this;this.element.bind('mousedown.'+this.widgetName,function(event){return self._mouseDown(event);}).bind('click.'+this.widgetName,function(event){if(self._preventClickEvent){self._preventClickEvent=false;event.stopImmediatePropagation();return false;}});if($.browser.msie){this._mouseUnselectable=this.element.attr('unselectable');this.element.attr('unselectable','on');}this.started=false;},_mouseDestroy:function(){this.element.unbind('.'+this.widgetName);($.browser.msie&&this.element.attr('unselectable',this._mouseUnselectable));},_mouseDown:function(event){event.originalEvent=event.originalEvent||{};if(event.originalEvent.mouseHandled){return;}(this._mouseStarted&&this._mouseUp(event));this._mouseDownEvent=event;var self=this,btnIsLeft=(event.which==1),elIsCancel=(typeof this.options.cancel=="string"?$(event.target).parents().add(event.target).filter(this.options.cancel).length:false);if(!btnIsLeft||elIsCancel||!this._mouseCapture(event)){return true;}this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){self.mouseDelayMet=true;},this.options.delay);}if(this._mouseDistanceMet(event)&&this._mouseDelayMet(event)){this._mouseStarted=(this._mouseStart(event)!==false);if(!this._mouseStarted){event.preventDefault();return true;}}this._mouseMoveDelegate=function(event){return self._mouseMove(event);};this._mouseUpDelegate=function(event){return self._mouseUp(event);};$(document).bind('mousemove.'+this.widgetName,this._mouseMoveDelegate).bind('mouseup.'+this.widgetName,this._mouseUpDelegate);($.browser.safari||event.preventDefault());event.originalEvent.mouseHandled=true;return true;},_mouseMove:function(event){if($.browser.msie&&!event.button){return this._mouseUp(event);}if(this._mouseStarted){this._mouseDrag(event);return event.preventDefault();}if(this._mouseDistanceMet(event)&&this._mouseDelayMet(event)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,event)!==false);(this._mouseStarted?this._mouseDrag(event):this._mouseUp(event));}return!this._mouseStarted;},_mouseUp:function(event){$(document).unbind('mousemove.'+this.widgetName,this._mouseMoveDelegate).unbind('mouseup.'+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this._preventClickEvent=(event.target==this._mouseDownEvent.target);this._mouseStop(event);}return false;},_mouseDistanceMet:function(event){return(Math.max(Math.abs(this._mouseDownEvent.pageX-event.pageX),Math.abs(this._mouseDownEvent.pageY-event.pageY))>=this.options.distance);},_mouseDelayMet:function(event){return this.mouseDelayMet;},_mouseStart:function(event){},_mouseDrag:function(event){},_mouseStop:function(event){},_mouseCapture:function(event){return true;}};$.ui.mouse.defaults={cancel:null,distance:1,delay:0};})(jQuery);


/*
 * jQuery UI Dialog 1.7.2
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	ui.core.js
 *	ui.draggable.js
 *	ui.resizable.js
 */
 
 (function($){var setDataSwitch={dragStart:"start.draggable",drag:"drag.draggable",dragStop:"stop.draggable",maxHeight:"maxHeight.resizable",minHeight:"minHeight.resizable",maxWidth:"maxWidth.resizable",minWidth:"minWidth.resizable",resizeStart:"start.resizable",resize:"drag.resizable",resizeStop:"stop.resizable"},uiDialogClasses='ui-dialog '+'ui-widget '+'ui-widget-content '+'ui-corner-all ';$.widget("ui.dialog",{_init:function(){this.originalTitle=this.element.attr('title');var self=this,options=this.options,title=options.title||this.originalTitle||' ',titleId=$.ui.dialog.getTitleId(this.element),uiDialog=(this.uiDialog=$('<div/>')).appendTo(document.body).hide().addClass(uiDialogClasses+options.dialogClass).css({position:'absolute',overflow:'hidden',zIndex:options.zIndex}).attr('tabIndex',-1).css('outline',0).keydown(function(event){(options.closeOnEscape&&event.keyCode&&event.keyCode==$.ui.keyCode.ESCAPE&&self.close(event));}).attr({role:'dialog','aria-labelledby':titleId}).mousedown(function(event){self.moveToTop(false,event);}),uiDialogContent=this.element.show().removeAttr('title').addClass('ui-dialog-content '+'ui-widget-content').appendTo(uiDialog),uiDialogTitlebar=(this.uiDialogTitlebar=$('<div></div>')).addClass('ui-dialog-titlebar '+'ui-widget-header '+'ui-corner-all '+'ui-helper-clearfix').prependTo(uiDialog),uiDialogTitlebarClose=$('<a href="#"/>').addClass('ui-dialog-titlebar-close '+'ui-corner-all').attr('role','button').hover(function(){uiDialogTitlebarClose.addClass('ui-state-hover');},function(){uiDialogTitlebarClose.removeClass('ui-state-hover');}).focus(function(){uiDialogTitlebarClose.addClass('ui-state-focus');}).blur(function(){uiDialogTitlebarClose.removeClass('ui-state-focus');}).mousedown(function(ev){ev.stopPropagation();}).click(function(event){self.close(event);return false;}).appendTo(uiDialogTitlebar),uiDialogTitlebarCloseText=(this.uiDialogTitlebarCloseText=$('<span/>')).addClass('ui-icon '+'ui-icon-closethick').text(options.closeText).appendTo(uiDialogTitlebarClose),uiDialogTitle=$('<span/>').addClass('ui-dialog-title').attr('id',titleId).html(title).prependTo(uiDialogTitlebar);uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection();(options.draggable&&$.fn.draggable&&this._makeDraggable());(options.resizable&&$.fn.resizable&&this._makeResizable());this._createButtons(options.buttons);this._isOpen=false;(options.bgiframe&&$.fn.bgiframe&&uiDialog.bgiframe());(options.autoOpen&&this.open());},destroy:function(){(this.overlay&&this.overlay.destroy());this.uiDialog.hide();this.element.unbind('.dialog').removeData('dialog').removeClass('ui-dialog-content ui-widget-content').hide().appendTo('body');this.uiDialog.remove();(this.originalTitle&&this.element.attr('title',this.originalTitle));},close:function(event){var self=this;if(false===self._trigger('beforeclose',event)){return;}
(self.overlay&&self.overlay.destroy());self.uiDialog.unbind('keypress.ui-dialog');(self.options.hide?self.uiDialog.hide(self.options.hide,function(){self._trigger('close',event);}):self.uiDialog.hide()&&self._trigger('close',event));$.ui.dialog.overlay.resize();self._isOpen=false;if(self.options.modal){var maxZ=0;$('.ui-dialog').each(function(){if(this!=self.uiDialog[0]){maxZ=Math.max(maxZ,$(this).css('z-index'));}});$.ui.dialog.maxZ=maxZ;}},isOpen:function(){return this._isOpen;},moveToTop:function(force,event){if((this.options.modal&&!force)||(!this.options.stack&&!this.options.modal)){return this._trigger('focus',event);}
if(this.options.zIndex>$.ui.dialog.maxZ){$.ui.dialog.maxZ=this.options.zIndex;}
(this.overlay&&this.overlay.$el.css('z-index',$.ui.dialog.overlay.maxZ=++$.ui.dialog.maxZ));var saveScroll={scrollTop:this.element.attr('scrollTop'),scrollLeft:this.element.attr('scrollLeft')};this.uiDialog.css('z-index',++$.ui.dialog.maxZ);this.element.attr(saveScroll);this._trigger('focus',event);},open:function(){if(this._isOpen){return;}
var options=this.options,uiDialog=this.uiDialog;this.overlay=options.modal?new $.ui.dialog.overlay(this):null;(uiDialog.next().length&&uiDialog.appendTo('body'));this._size();this._position(options.position);uiDialog.show(options.show);this.moveToTop(true);(options.modal&&uiDialog.bind('keypress.ui-dialog',function(event){if(event.keyCode!=$.ui.keyCode.TAB){return;}
var tabbables=$(':tabbable',this),first=tabbables.filter(':first')[0],last=tabbables.filter(':last')[0];if(event.target==last&&!event.shiftKey){setTimeout(function(){first.focus();},1);}else if(event.target==first&&event.shiftKey){setTimeout(function(){last.focus();},1);}}));$([]).add(uiDialog.find('.ui-dialog-content :tabbable:first')).add(uiDialog.find('.ui-dialog-buttonpane :tabbable:first')).add(uiDialog).filter(':first').focus();this._trigger('open');this._isOpen=true;},_createButtons:function(buttons){var self=this,hasButtons=false,uiDialogButtonPane=$('<div></div>').addClass('ui-dialog-buttonpane '+'ui-widget-content '+'ui-helper-clearfix');this.uiDialog.find('.ui-dialog-buttonpane').remove();(typeof buttons=='object'&&buttons!==null&&$.each(buttons,function(){return!(hasButtons=true);}));if(hasButtons){$.each(buttons,function(name,fn){$('<button type="button"></button>').addClass('ui-state-default '+'ui-corner-all').text(name).click(function(){fn.apply(self.element[0],arguments);}).hover(function(){$(this).addClass('ui-state-hover');},function(){$(this).removeClass('ui-state-hover');}).focus(function(){$(this).addClass('ui-state-focus');}).blur(function(){$(this).removeClass('ui-state-focus');}).appendTo(uiDialogButtonPane);});uiDialogButtonPane.appendTo(this.uiDialog);}},_makeDraggable:function(){var self=this,options=this.options,heightBeforeDrag;this.uiDialog.draggable({cancel:'.ui-dialog-content',handle:'.ui-dialog-titlebar',containment:'document',start:function(){heightBeforeDrag=options.height;$(this).height($(this).height()).addClass("ui-dialog-dragging");(options.dragStart&&options.dragStart.apply(self.element[0],arguments));},drag:function(){(options.drag&&options.drag.apply(self.element[0],arguments));},stop:function(){$(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag);(options.dragStop&&options.dragStop.apply(self.element[0],arguments));$.ui.dialog.overlay.resize();}});},_makeResizable:function(handles){handles=(handles===undefined?this.options.resizable:handles);var self=this,options=this.options,resizeHandles=typeof handles=='string'?handles:'n,e,s,w,se,sw,ne,nw';this.uiDialog.resizable({cancel:'.ui-dialog-content',alsoResize:this.element,maxWidth:options.maxWidth,maxHeight:options.maxHeight,minWidth:options.minWidth,minHeight:options.minHeight,start:function(){$(this).addClass("ui-dialog-resizing");(options.resizeStart&&options.resizeStart.apply(self.element[0],arguments));},resize:function(){(options.resize&&options.resize.apply(self.element[0],arguments));},handles:resizeHandles,stop:function(){$(this).removeClass("ui-dialog-resizing");options.height=$(this).height();options.width=$(this).width();(options.resizeStop&&options.resizeStop.apply(self.element[0],arguments));$.ui.dialog.overlay.resize();}}).find('.ui-resizable-se').addClass('ui-icon ui-icon-grip-diagonal-se');},_position:function(pos){var wnd=$(window),doc=$(document),pTop=doc.scrollTop(),pLeft=doc.scrollLeft(),minTop=pTop;if($.inArray(pos,['center','top','right','bottom','left'])>=0){pos=[pos=='right'||pos=='left'?pos:'center',pos=='top'||pos=='bottom'?pos:'middle'];}
if(pos.constructor!=Array){pos=['center','middle'];}
if(pos[0].constructor==Number){pLeft+=pos[0];}else{switch(pos[0]){case'left':pLeft+=0;break;case'right':pLeft+=wnd.width()-this.uiDialog.outerWidth();break;default:case'center':pLeft+=(wnd.width()-this.uiDialog.outerWidth())/2;}}
if(pos[1].constructor==Number){pTop+=pos[1];}else{switch(pos[1]){case'top':pTop+=0;break;case'bottom':pTop+=wnd.height()-this.uiDialog.outerHeight();break;default:case'middle':pTop+=(wnd.height()-this.uiDialog.outerHeight())/2;}}
pTop=Math.max(pTop,minTop);this.uiDialog.css({top:pTop,left:pLeft});},_setData:function(key,value){(setDataSwitch[key]&&this.uiDialog.data(setDataSwitch[key],value));switch(key){case"buttons":this._createButtons(value);break;case"closeText":this.uiDialogTitlebarCloseText.text(value);break;case"dialogClass":this.uiDialog.removeClass(this.options.dialogClass).addClass(uiDialogClasses+value);break;case"draggable":(value?this._makeDraggable():this.uiDialog.draggable('destroy'));break;case"height":this.uiDialog.height(value);break;case"position":this._position(value);break;case"resizable":var uiDialog=this.uiDialog,isResizable=this.uiDialog.is(':data(resizable)');(isResizable&&!value&&uiDialog.resizable('destroy'));(isResizable&&typeof value=='string'&&uiDialog.resizable('option','handles',value));(isResizable||this._makeResizable(value));break;case"title":$(".ui-dialog-title",this.uiDialogTitlebar).html(value||' ');break;case"width":this.uiDialog.width(value);break;}
$.widget.prototype._setData.apply(this,arguments);},_size:function(){var options=this.options;this.element.css({height:0,minHeight:0,width:'auto'});var nonContentHeight=this.uiDialog.css({height:'auto',width:options.width}).height();this.element.css({minHeight:Math.max(options.minHeight-nonContentHeight,0),height:options.height=='auto'?'auto':Math.max(options.height-nonContentHeight,0)});}});$.extend($.ui.dialog,{version:"1.7.2",defaults:{autoOpen:true,bgiframe:false,buttons:{},closeOnEscape:true,closeText:'close',dialogClass:'',draggable:true,hide:null,height:'auto',maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:'center',resizable:true,show:null,stack:true,title:'',width:300,zIndex:1000},getter:'isOpen',uuid:0,maxZ:0,getTitleId:function($el){return'ui-dialog-title-'+($el.attr('id')||++this.uuid);},overlay:function(dialog){this.$el=$.ui.dialog.overlay.create(dialog);}});$.extend($.ui.dialog.overlay,{instances:[],maxZ:0,events:$.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),function(event){return event+'.dialog-overlay';}).join(' '),create:function(dialog){if(this.instances.length===0){setTimeout(function(){if($.ui.dialog.overlay.instances.length){$(document).bind($.ui.dialog.overlay.events,function(event){var dialogZ=$(event.target).parents('.ui-dialog').css('zIndex')||0;return(dialogZ>$.ui.dialog.overlay.maxZ);});}},1);$(document).bind('keydown.dialog-overlay',function(event){(dialog.options.closeOnEscape&&event.keyCode&&event.keyCode==$.ui.keyCode.ESCAPE&&dialog.close(event));});$(window).bind('resize.dialog-overlay',$.ui.dialog.overlay.resize);}
var $el=$('<div></div>').appendTo(document.body).addClass('ui-widget-overlay').css({width:this.width(),height:this.height()});(dialog.options.bgiframe&&$.fn.bgiframe&&$el.bgiframe());this.instances.push($el);return $el;},destroy:function($el){this.instances.splice($.inArray(this.instances,$el),1);if(this.instances.length===0){$([document,window]).unbind('.dialog-overlay');}
$el.remove();var maxZ=0;$.each(this.instances,function(){maxZ=Math.max(maxZ,this.css('z-index'));});this.maxZ=maxZ;},height:function(){if($.browser.msie&&$.browser.version<7){var scrollHeight=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);var offsetHeight=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);if(scrollHeight<offsetHeight){return $(window).height()+'px';}else{return scrollHeight+'px';}}else{return $(document).height()+'px';}},width:function(){if($.browser.msie&&$.browser.version<7){var scrollWidth=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);var offsetWidth=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);if(scrollWidth<offsetWidth){return $(window).width()+'px';}else{return scrollWidth+'px';}}else{return $(document).width()+'px';}},resize:function(){var $overlays=$([]);$.each($.ui.dialog.overlay.instances,function(){$overlays=$overlays.add(this);});$overlays.css({width:0,height:0}).css({width:$.ui.dialog.overlay.width(),height:$.ui.dialog.overlay.height()});}});$.extend($.ui.dialog.overlay.prototype,{destroy:function(){$.ui.dialog.overlay.destroy(this.$el);}});})(jQuery);

/* Session vars*/
if(JSON&&JSON.stringify&&JSON.parse)var Session=Session||(function(){
    var win=window.top||window;var store= (win.name? (function(){ 
		try {  var JSON_ = JSON.parse(win.name); }catch(e){ return{};}return (JSON_ || win.name);})(this) : {} );function Save(){
        win.name=JSON.stringify(store);
    }; 
	
	if(window.addEventListener) window.addEventListener("unload",Save,false);else if(window.attachEvent)window.attachEvent("onunload",Save);else window.onunload=Save;return{
        set:function(name,value){
            store[name]=value;
        },
        get:function(name){
            return(store[name]?store[name]:undefined);
        },
        clear:function(){
            store={};
        },
        dump:function(){
            return JSON.stringify(store);
        }
    };
})();

if( typeof Function.method !== 'function'){
	Function.prototype.method = function (name, func) {
		this.prototype[name] = func;
		return this;
	};
};

(function($){
	  
	var KEY = { UP: 38, DOWN: 40, LEFT:37, RIGHT:39, DEL: 8, TAB: 9, RETURN: 13, ESC: 27, COMMA: 188, PAGEUP: 33,
		PAGEDOWN: 34, PAGEUPX: 36, PAGEDOWNX: 35, BACKSPACE: 8, SPACE: 32, BMAYUS: 20
	};
	
	 $.fn.extend({
				 
		iFilter: function(options) {  
			 var options = $.extend(true, {}, $.InputFilter.defaults, options);
			 options.PopUpCallBack.onSelect = options.PopUpCallBack.onSelect || function(value) { return value; };
			 options.PopUpCallBack.onClose = options.PopUpCallBack.onClose || function(value) { return value; };
			 options.PopUpCallBack.onOpen = options.PopUpCallBack.onOpen || function(value) { return value; }
			 return this.each(function(){	   
				new $.InputFilter(this, options);
			 });
		},
		addTags: function(tags) { 
			return this.trigger("addTags", [tags]);
		},
		getInterface : function(){ 
			return this.trigger("getInterface");	
		},
		checkDataList: function(v){
			this.trigger("ifExistValue",[v]);	
		}
	});
	
    $.InputFilter = function (input, confself){ 
		
		var options = confself, spinner, popup = null, timeout, lastkeycode, wrapp, OldSearch = null;
		var $input = $(input);
		
        $input.bind(($.browser.opera ? "keypress" : "keydown"), function(event){
            var key = window.event ? event.keyCode : event.which;
            lastkeycode = key;
			
 		 	switch (event.keyCode) {
                case KEY.UP:
                    event.preventDefault();
                    if (popup.State()) {
                        popup.Prev();
                    }
                    return false;
                    break;
                case KEY.DOWN:
					event.preventDefault();
                    try {
                        if (this.value.length >= options.MinChars && !popup.State()) {
                            popup.Show();
                            return false; 
                        }
						if (popup.State()) {
                        	popup.Next();
						}
                    }catch (e) {
                        alert(e.toString());
                    }
                    finally {
                        return false;
                    }
                    break;
               case KEY.PAGEUP: case KEY.PAGEUPX :
                    event.preventDefault();
					if (popup.State()) {
						popup.ToFirstItem();
					}
					return false;
                    break;
                case KEY.PAGEDOWN: case KEY.PAGEDOWNX : 
                  	event.preventDefault();
					if (popup.State()) {
						popup.ToLastItem();
					}
					return false;
                    break;
                case KEY.TAB:
                case KEY.RETURN:
				   if(options.AutoSubmit){
						popup.SetToInput(this.value);
				   }
                   if(popup.State()){ 
                        popup.SetToInput(this.value);
						event.preventDefault();
						return false;
					}else{
						return true;	
					}
					if(options.noSubmit){
						return false;	
					}
                    break;
                case KEY.ESC:
                    event.preventDefault();
                    popup.Close();				
                    popup.PrevValue();
                    break;
				case 32:  
					if (this.value.length >= options.MinChars && !popup.State()) {
						popup.Show();
					}
				break;
                default:
					checkStatusTags((event.keyCode == KEY.DEL));
                    clearTimeout(timeout);
                    timeout = setTimeout(onChange, options.SearchToTime);
                break;
            };
			
			
			
        }).bind('search',function(event, valuesearch, hidelist, callback){
			Search(valuesearch, hidelist, callback);
		}).bind('showPopup', function(){
			popup.Show();
		}).bind('blur.autocomplete', function(){
			if(!options.Statescroll){
				setTimeout(function(){
					popup.Close();
				},200);
			}
		}).bind('submitnow',function(event, dl){
			if(options.AutoSubmit){
				$(this).parents('form:first').trigger('submit',[dl]);
			}
		}).bind('addTags', function(event, tags){ 
			popup.init().addTags(tags);	
		}).bind('getInterface', function(){
			$(this).data('interface', popup);	
		}).bind('ifExistValue', function(event, v){
			popup.CheckInList(v);
		});
		
		
		function checkStatusTags(keydel){
			if(options.MultipleSelect && input.value.length <= options.MinChars){ 
				var tval = $.trim(input.value);
				var $prevElemet = $input.parent().prev();
				if(keydel){
					if($prevElemet && $prevElemet.length){
						if(!tval.length){
							if($prevElemet.hasClass('ifilter-tag-bydel')){
								$prevElemet.find('.ifilter-tag-close').trigger('click');
							}else{
								$prevElemet.addClass('ifilter-tag-bydel');	
							}
						}
					}
					return;
				}
				
				if(tval.length + 1 && tval.length <= options.MinChars){
					$prevElemet.removeClass('ifilter-tag-bydel');
				}
			};
			
		};
	
        function onChange(){
            if (input.value.length > 0) {
                spinner.Show();
            }else{
                spinner.Hide(); return false;
            }
            if ( lastkeycode == KEY.SPACE || lastkeycode == KEY.BMAYUS || (lastkeycode >= 37 && lastkeycode <= 40)) {
                popup.Close();
                return false;
            }
            if (input.value.length < options.MinChars) {
                popup.Close();
            } else {
                Search(input.value);
            }
        };
		
        function Search(valuesearch, hidelist, onSuccess){
			var valuesearch = valuesearch || false;
            var viewList =  hidelist || false;
            spinner.Update();
            var cacheData = $.fn.GetObjMem(input.value);
            if (cacheData == null) {
                $.ajax({
                    type: options.AjaxSource.Type,
                    url : options.AjaxSource.Url,
                    data: $.extend({
						q : valuesearch ,
						n : options.NumResults
					},options.AjaxSource.MoreParams),
                    dataType: 'json',
                    success: function(data){
                        try {
                            if (data !== false && data != null && data != 'null' && data !== '') {
                                $.fn.SetObjMem(input.value, data );
                                cacheData = data; 
                                popup.run(data, viewList);
                                spinner.Update();
                            } else { 
                                $.fn.SetObjMem(input.value, null);                                
								options.ShowNoDataFound && popup.NotFound(options.ShowNoDataFound);
								spinner.Update();
                            }
                        }
                        catch (e) {
                            this.error();
                        }

                        onSuccess && onSuccess(data);
                        
                    },
                    error: function(){
                        spinner.Update();
                        popup.Close();
						
                    },
                    timeout: 5000
                });
            }else {
                popup.run(cacheData,viewList);
                spinner.Update();
                onSuccess && onSuccess(cacheData);
            }
			
            return  cacheData;

        };
		
		
		function Init(){		
			
			var $input = $(input); 
			var $inputParent = $input.parent();
			var $inptWrap = $('<div class="ifilter-inptwrap"/>');
			var $cinpt = $('<div/>');
			wrapp = $('<div/>').addClass(options.Clases.PopUp.Wrap).addClass('clearfix');
			$input.attr('autocomplete','off').addClass('initialized');
			$inptWrap.append($cinpt.append($input));
			$inputParent.append(wrapp.append($inptWrap));
			spinner = new $.fn.SpinnerInput(input, options);
			$cinpt.parent().parent().append(spinner.e);
			popup = $.InputFilter.PopUpObj(input, options, spinner);
			if(options.OldSearch.Enabled){			
				OldSearch =	$input.OldSearch(options, popup, spinner) || null; 
				$cinpt.parent().parent().prepend(OldSearch);
			}	
			options.onLoad(input, popup, OldSearch, spinner);
			$.fn.data && $input.data('interfaces', { popup: popup , oldSearch: OldSearch, spinner: spinner }); 
		}
		
		Init();
    };
	
    $.InputFilter.PopUpObj = function(input, options, spinner){
		var	$input = $(input);
        var list;
        var clist;
        var wrapp;
        var state = false;
        var position = 0;
        var popInit = false;
        var currentElem;
        var selected = null;
        var previousvalue;
		var previousselected = false;
		var dataprev;
		var listUpdTimer = null;

        function Init(){
            if(popInit){
                return false;
            }
            position = 0;
            previousvalue = input.value;
            aclose = $('<a/>').attr({ 
				title: options.Clases.PopUp.aCloseText, 
				Class: options.Clases.PopUp.aClose,
				href:'#'
			}).click(function(event){
				event.preventDefault();
				_Close();
			}).text(options.Clases.PopUp.aCloseText);			 
			
			wraplist = $('<div/>').addClass(options.Clases.PopUp.WrapList);
		    clist = $('<div/>').addClass(options.Clases.PopUp.ContentList);			
            list  = $('<ul/>').addClass(options.Clases.PopUp.UlList);
			$(clist).append(wraplist);
			$(wraplist).append(list);
			$(clist).append($('<p class="clearfix"></p>').append(aclose));
            $input.parent().after(clist); 
			$(clist).mousedown(function(){
				options.Statescroll = true;										  
			}).mouseup(function(){ 
				options.Statescroll = false;
			});	
			$(wraplist).hover(function(event){
				options.Statescroll = true;						   
			},function(){
				input.focus();
				options.Statescroll = false;	
			});
            popInit = true;
			clearInterval(listUpdTimer);
			clist.css({top: clist.parents('.ifilter-wrap').height()})
			listUpdTimer = setInterval(function(){
				interface.State() && clist.css({top: clist.parents('.ifilter-wrap').height()});
			},100);
            return false;
        };
	
	
         function FillList(data){
			CleanLest();
			dataprev = data;
			previousselected = null;
			
            for (var i = 0; i < data.length; i+=1) {
                var $li = $('<li/>');
				try {
					$li.html(interface.addMarks(data[i][options.MetaDataJson.TextName], new Array($.trim(input.value))) || '');
					if($.data && options.DataDump){
						$li.data('meta', data[i]);
					}
				}catch(e){
					alert(e.toString());
				}
				
                if(i==0){
					currentElem = $li;
					position = i;
					if(options.FirstSelect){
						UpdateOver($li);
					}
                }
                $li.hover(function(){
                    UpdateOver(this);
                },function(){
                    UpdateOver([]);
                }).click(function(event){
					event.stopPropagation();
					event.preventDefault();
					_Close();
					$(list).find('.' + options.Clases.PopUp.Select).removeClass(options.Clases.PopUp.Select);
					previousselected = $(this);
                    setInput(previousselected.addClass(options.Clases.PopUp.Select).text(), true);
					$input.trigger('focusout');
					$input.trigger('submitnow');
                });
                $li.addClass(((i % 2) == 0) ? 'odd' : 'even');
                list.append($li);
            }
			
			if($.fn.bgiframe){
				$(wraplist).bgiframe();
			}

			if(options.FirstSelectBg){
				previousselected = currentElem;
				$(currentElem).addClass(options.Clases.PopUp.Select + ' no_bg');
				options.PopUpCallBack.onSelect(input, previousselected);
			}
		
            $.fn.MoveList && $.fn.MoveList(list, position);
        };
		
		function showNotFound(view){
			CleanLest();
			if(view) {
				var $li = $('<li/>').click(function(){ 
					return false; 
				}).html(options.NoResultsMsg).addClass(options.Clases.PopUp.NoData);
				list.append($li).height('auto');
			}
		};
		
		function CheckDataExist(value, callback){
			value = $.trim(value.toLowerCase());
			if(!dataprev){
				return false;
			}
			for(var i = 0; i < dataprev.length; i++) {
				 if(value == $.trim(dataprev[i][options.MetaDataJson.TextName].toLowerCase())){
					  var $li = $('<li/>');
					  $li.attr('id', dataprev[i][options.MetaDataJson.ValueName]);
					  $li.html(dataprev[i][options.MetaDataJson.TextName]);
					  if($.data && options.DataDump){
						$li.data('meta', dataprev[i]);
					  }
					  callback && callback($li, dataprev);
					  return true;	 
				 }				            
			 }
			 return false;	
		};
		
        function CleanLest(){
            list.empty();
			list.removeAttr('style');
        };
		
        function setInput(value, hasClick){
			if(!list){ return;}
			selected = list.find('.' + options.Clases.PopUp.Select).not('.' + options.Clases.PopUp.NoData);
			previousvalue = value || selected.text();
			if(options.MultipleSelect && selected && selected.length){
				interface.addTag(selected.data('meta'), $input);
				CleanLest();
			}else{
				var v = selected.text() || value || previousvalue;
            	$input.val((ucWords)? ucWords(v) : v);
			}
			if(value){
				options.PopUpCallBack.onSelect($input, selected, interface);
			}
			if(!hasClick){
				$input.focus();
			}
        };
	
        function UpdatePosition(elem, outtext){
			$(elem).removeClass('no_bg');
			var outtext = outtext || true;
            currentElem = elem;
			if(outtext) $input.val($.trim($(currentElem).text()));
            $(list).find('.'+options.Clases.PopUp.Select).removeClass(options.Clases.PopUp.Select);
            $(currentElem).addClass(options.Clases.PopUp.Select);
            return false;
        };

        function UpdateOver(elem){
            $(list).find('.'+options.Clases.PopUp.Hover).removeClass(options.Clases.PopUp.Hover);
            $(elem).addClass(options.Clases.PopUp.Hover);
            return false;
        };

        function _Close(){
            clist && clist[options.Fx.Close](options.Fx.Speed);
            options.PopUpCallBack.onClose(input);
            state = false;
        };

      var interface =  {
		  
            run : function(data, show){
				previousvalue = input.value;
                Init();
                FillList(data);				
                !show && this.Show();
            },
			
			init : function(){
				Init();
				return this;
			},
			
            Close: function(initpos){
                clist && _Close();
				if(initpos) this.SetPosition(0);
            },
			
			SetPosition : function(pos){
				position = pos || 0;
			},	
			
            Show: function(){
                clist && clist[options.Fx.Show](options.Fx.Speed);
                options.PopUpCallBack.onOpen(input);
                input.focus();
                state = true;
            },
			
			NotFound : function(view){
				Init();
				showNotFound(view);
				view && this.Show();
			},
			
            Next: function() {
                try{
                    if (currentElem.nextSibling) {
                        UpdatePosition(currentElem.nextSibling);
                        $.fn.MoveList(list,++position);
                    }else {
                        UpdatePosition(list[0].childNodes[0]);
                        $.fn.MoveList(list,position = 0);
                    }
                }catch(e){};
            },
			
            Prev: function() {
                try{
                    if (currentElem.previousSibling) {
                        UpdatePosition(currentElem.previousSibling);
                        $.fn.MoveList(list,--position);
                    }else {
                        UpdatePosition(list[0].childNodes[ list[0].childNodes.length -1]);
                        $.fn.MoveList(list,position = list[0].childNodes.length-1);
                    }
                }catch(e){};

            },
			
            PrevValue: function() {
                $input.val(previousvalue);
                if(previousvalue){
                    spinner && spinner.Show();
                }
            },
			
            State: function(_boolean){
                if(_boolean){ 
                    state  = _boolean;
                }else{
                    return state;
                }
            },
			
            SetToInput : function(value){
                _Close();
                return setInput(value);
            },
			
			ToFirstItem : function(){
				 position = 0;
				 UpdatePosition(list[0].childNodes[position]);
				 $.fn.MoveList(list,position = 0);
			},
			
			ToLastItem : function(){
				 position = list[0].childNodes.length-1
				 UpdatePosition(list[0].childNodes[position]);
				 $.fn.MoveList(list, position);
			},
			
			SelectedItem : function(){
				return selected;	
			},
			
			UnSelectItem : function(){
				selected = false;	
			},
			
			CheckDataInList : function(value, callback){
				return CheckDataExist(value, callback);	
			},
			
			HaveResults : function(){
				return (list[0].length > 0 && dataprev); 
			},
			CheckInList : function(dl, hideAlert){
				var out = true;
				var datalist = (dl) ? false : options.OnlyDataList; 
				var $this = this;
				if( datalist ){  
					if(options.MultipleSelect){
						
					}else{
						if(this.CheckDataInList(input.value, function(s){
								if(options.SelectByCompare && typeof(options.SelectByCompare) == 'function'){
									options.SelectByCompare(s);		
								}
							})){					
						}else{ 
							!hideAlert && Alert && Alert(null,'Debe seleccionar una "ubicación" usando la lista.');
							this.Show();
							out = false;
						}
					}
				}	 
				return out;
			},
			SetOldSearch: function (){ 
				var obj = false;
					
				if(options.OldSearch.Enabled && $.fn.OldSearch){ 
					var ArrayList = $.fn.GetObjMem('oldSearch'); 
					var prevValue;			
					try{	
						prevValue = eval(JSON.stringify(ArrayList.slice(0,1)))[0].text;
					}catch(e){ 
						prevValue = '';
					} 
					
					
					try{ 
						if(options.MultipleSelect){
							if( ArrayList &&  this.countTagsExist){					
	
								var currentItem = $(this.getFirstTag()) || false; 
								if(currentItem && currentItem.text()){
									obj = {
										value :  currentItem.attr('id') || '',
										text  :  currentItem.text(),
										meta  : ($.data && options.DataDump)? currentItem.data('meta'): {}
									};						
									$.fn.OldSearch.Storage(obj);
									this.UnSelectItem();	
								}
							}

						}else{
								if( ArrayList &&  $.trim($input.val().toLowerCase().replace(/[^A-Za-z0-9_]/g,'')) != $.trim(prevValue.toLowerCase().replace(/[^A-Za-z0-9_]/g,''))){					
	
								var currentItem = this.SelectedItem() || false; 
								if(currentItem && currentItem.data('meta').desc){
									obj = {
										value :  currentItem.attr('id') || '',
										text  :  currentItem.data('meta').desc,
										meta  : ($.data && options.DataDump)? currentItem.data('meta'): {}
									};						
									$.fn.OldSearch.Storage(obj);
									this.UnSelectItem();	
								}
							}
						}
					}catch(e){
						//alert(e.toString())
					}
					if(!options.OnlyDataList){
						obj = { text  :  input.value };
						$.fn.OldSearch.Storage(obj);
					}
				}
			},
			
			addMarks: function(text, words){
				var out = $.trim(text);
				for (var i = 0; i < words.length; i++) {
					if (words[i] != '' && words[i].length>1) {
						out = out.replace(new RegExp(words[i], 'gi'), words[i].replace(/(^| )([\wáéíóúñ])/gi,function($1){ return (ucWords)? ucWords($1): $1; }).bold());
					}
				}			
				return out;
			},
			
			addTags: function(tags){
				if($.isArray(tags)){ 
					$.each(tags, function(){
						interface.addTag(this);							   
					});
				}
			},
			
			addTag: function(tag){
				
				if(options.Tags && options.Tags.max){ 
					if(this.countTagsExist() >= options.Tags.max){
						options.Tags.callback && options.Tags.callback.apply(interface, [$input]);
						return;
					} 
				}
					var $this = this;
					var jdata = tag || [];
				if(!this.checkTagExist(jdata.dep + jdata.ciu)){
					var $inptHidden = $('<span class="tinpt-hidden" />');
					var $tagClose = $('<span class="ifilter-tag-close"/>').click(function(e){ 
						e.stopPropagation();
						$(this).parents('a.ifilter-tag').remove();
						interface.updateList();
						options.Tags.onRemove && options.Tags.onRemove.apply($this);
						return false;
					}); 
					var $tag = $('<a class="ifilter-tag"/>').attr('href','#').click(function(e){ e.preventDefault(); }).attr('rel',jdata.dep + jdata.ciu).append(
						$('<span class="pad"/>').text((ucWords)?ucWords(jdata.desc):jdata.desc).prepend(this.addKeyTag(jdata)).append($tagClose));
						$.data && options.DataDump && $tag.data('meta', tag);
					if(!$input.next().hasClass('tinpt-hidden')){ 
						$inptHidden.insertAfter($input);
					}
					$input.keydown(function(){ 
						$inptHidden.text($input.val() + '^_^');	
					}).attr('size', 1).val('').parent().addClass('tinpt').parent().click(function(){
						$input.focus();																  
					});
					$tag.insertBefore($input.parent());
					this.updateList();
				}else{
					$input.val('').parent().parent().find('a[rel='+jdata.dep + jdata.ciu+']').hide().show('normal');
				}
			},
			
			addKeyTag: function(elemData){
				var list = [
					$('<input type="hidden" name="state[]" />').val(elemData.dep).get(0),
					$('<input type="hidden" name="locality[]" />').val(elemData.ciu).get(0)
				];
				return list;
			},
		
			removeAllTags: function(){
				clist.find('span.ifilter-tag-close').trigger('click');
			},
			
			getFirstTag: function(){
				return $input.parent().parent().find('a.ifilter-tag:first');
			},
			
			checkTagExist : function(value, callback){
				var out = ($input.parent().parent().find('a[rel='+value+']').length > 0)? true : false;
				callback && callback(out);
				return out;
			},
			countTagsExist : function(){
				return $input.parent().parent().find('a.ifilter-tag').length;
			},
			updateList: function(){ 
			
				if($input.parent().parent().find('a.ifilter-tag').length == 0){
					!$.browser.msie && $input.removeAttr('size');
					$input.parent().removeClass('tinpt');
					$.fn.PlaceHolder && $input.PlaceHolder();
					$input.select()
				}else{ 
					$input.unbindplaceholder();	
				}
			}
			
        };
		return interface;

    };
	
	$.InputFilter.defaults = {
			
            AjaxSource:{
                Type: 'POST',
                Url: 'http://172.30.51.76/json/index.php',
                MoreParams : {}
            },
            MetaDataJson: {
                ValueName: 'llaves',
                TextName:  'nombre'
            },
			DataDump: false,
			NoResultsMsg :'No se encontraron resultados',
            PopUpCallBack: {
                onSelect: function(){},				
                onClose: function(){},
                onOpen: function(){}
            },
			SelectByCompare: false,
			MultipleSelect:false,
			Tags: { max: 0 , callback: false },
			AutoSubmit: false,
			onSubmit: function(input, popup){ return true },
			noKeyDownSubmit: false,
			TriggerButton: {},		
			onLoad : function(){},
			onClean:function(){},
            SearchToTime: 400,
            MinChars: 3,
            NumResults: 20,
			ShowNoDataFound:true,
			AnimateSpinnerOnSubmit:true,
			FormParentId : '',
			Statescroll :  false,
			FirstSelect :  false,
			FirstSelectBg: false,
			OnlyDataList : false,
			MaxTags : null,
			OldSearch:{
				Enabled : true,
				OnSelect : function(value,input){}
			},
			Fx : {
				Show: 'show',
				Close:'hide',
				Speed: ''
			},
            Clases : {
                Spinner:{
                    Loading : 'loading',
                    Erase   : 'inputerase',
                    Title   : 'Borrar'
                },
                PopUp :{
                    Select: 'selected',
                    Hover:  'over',
                    ContentList:'content-list-suggest',
                    UlList : 'list-suggest',
                    Wrap :'ifilter-wrap',
					WrapList : 'ifilter-wrapsearch',
					aClose: 'ifilter-aclose',
					aCloseText: 'Cerrar',
					NoData : 'ifilter-data-nofound'
                },
				OldSearch :{
					Class : 'ifilter-oldsearch',
					CList : 'ifilter-oldsearch-wrapplist',
					Cborder : 'ifilter-oldsearch-cborder',
					List : 'ifilter-oldsearch-list',
					Hover: 'ifilter-oldsearch-over',
					ItemOver:'over',
					ItemSelect:'ifilter-oldsearch-select',
					Title: 'Busquedas anteriores',
					Arrow: 'ifilter-oldsearch-arrow',
					InfoText: 'Últimas # busquedas realizadas'
				}
            }
        };

	$.fn.OldSearch = function(_options, popup){
		
		var options = {
			
			Class : 'ifilter-oldsearch',
			CList : 'ifilter-oldsearch-wrapplist',
			Cborder : 'ifilter-oldsearch-cborder',
			List : 'ifilter-oldsearch-list',
			Hover: 'ifilter-oldsearch-over',
			ItemOver:'over',
			ItemSelect:'ifilter-oldsearch-select',
			Title: 'Ultimas busquedas',
			Arrow: 'ifilter-oldsearch-arrow',
			InfoText: 'Ultimas # busquedas realizadas',
			DelHist :'ifilter-oldsearch-delhist',
			SetOfOldSearch: 'ifilter-oldsearch-set',
			InfoTextText: 'Borrar historial',
			LimitMem: 8,
			onSelectItem : function(){}
			
		};
		
		options = $.extend(options, _options);
		
		for(var i=0;i<this.length;i++){
			return $.fn.OldSearch.Create($(this[i]), options, popup);						  
		};
    };	
	
	$.fn.OldSearch.Create = function(input, options, popup){
		
		var DelHistory =     $('<a/>').addClass(options.DelHist).text(options.InfoTextText).click(function(event){ event.preventDefault();});
		var InfoText = 		 $('<span/>');
		var Info = 		 	 $('<p/>').append(DelHistory).append(InfoText);		
		var Arrow = 		 $('<div/>').addClass(options.Arrow);	
		var OldSearchList  = $('<ul/>').addClass(options.List);
		var OldSearchWrapp = $('<div/>').addClass(options.CList).prepend(Arrow).append($('<div/>').addClass(options.Cborder).append(OldSearchList).append(Info));
		var OldSearch =      $('<div/>').addClass(options.Class).append(OldSearchWrapp).attr('title',options.Title);
		var State = false;
		var Memory = new Array();
		var PopUp = popup;
		
		$.fn.OldSearch.Init = function(){ 
			$.fn.OldSearch.LoadOlds();
			$(OldSearch).toggle(function(){ 
				if(Memory && Memory.length){
					$(this).addClass(options.Hover);					
					OldSearchWrapp.show();
					InfoText.text(options.InfoText.replace(/#/g,Memory.length));
				}				
			},function(){ 
				$(this).removeClass(options.Hover);	
				OldSearchWrapp.hide();
			}).bind('update',function(){ 
				$.fn.OldSearch.LoadOlds();
			}).mousedown(function(event){			
				return false;
			});
			$(DelHistory).click(function(){
				OldSearch.trigger('click');
				$.fn.OldSearch.CleanMem();
			});
			$(document).click(function(e){ 
				chekBlur(e);
			});				
			$(input).focus(function(e){
				chekBlur(e);
			}).bind('oldsearchShow',function(){
				OldSearch.trigger('click');
			});
			
			function chekBlur(e){
				if($(e.target) !== OldSearch && OldSearchWrapp.css('display') == 'block' ){
					OldSearch.trigger('click');					
				}
			};
		};

		$.fn.OldSearch.SetList = function(list){ 
		
			OldSearchList.empty();
			if(!list){ return false };
			$.each(list, function(i,n){
				 var li = $('<li/>').text(this.text).attr('id',this.value);
				 $(li).hover(function(){
					$(this).addClass(options.ItemOver);
				 },function(){
					$(this).removeClass(options.ItemOver);					  
				 }).click(function(){
					 var $this = $(this);
					 if(options.MultipleSelect){
						PopUp.addTag($this.data('meta'))
						options.onSelectItem();			
						options.PopUpCallBack.onSelect(input, $this);
					 }else{
						input.val($this.text()).focus();
						options.onSelectItem();			
						options.PopUpCallBack.onSelect(input, $this);
						input.trigger('submitnow',[true]);
					}			
					OldSearch.trigger('click');
				 });
				 if($.data && options.DataDump){
					li.data('meta',eval(this.meta)); 
				 }
				 $(li).addClass(((i % 2) == 0) ? 'odd' : 'even');
				 OldSearchList.append(li);						
			});
		};
		
		$.fn.OldSearch.CleanMem = function(){
			$.fn.SetCookie('oldSearch',Memory = null,30);
			$.fn.SetObjMem('oldSearch',[]);
		};
	
		$.fn.OldSearch.Storage = function(obj){
			var oldsearchs = $.fn.GetObjMem('oldSearch') ?  $.fn.GetObjMem('oldSearch') : new Array();	
			if(obj){
				oldsearchs.unshift(obj);
				$.fn.SetObjMem('oldSearch',oldsearchs);
				$.fn.SetCookie('oldSearch',JSON.stringify($.fn.GetObjMem('oldSearch')),30);
				$.fn.OldSearch.LoadOlds();
			}
		};
		
		$.fn.OldSearch.LoadOlds = function(){ 
			Memory = $.fn.GetCookie('oldSearch',true) || Memory;
			if(Memory && Memory.length > options.LimitMem){
				Memory.pop();
				$.fn.SetCookie('oldSearch',JSON.stringify($.fn.GetObjMem('oldSearch')),30);
			}
			$.fn.SetObjMem('oldSearch',Memory);
			$.fn.OldSearch.SetList(Memory);
		};
		
		$.fn.OldSearch.CleanList = function(){
			OldSearch.empty();
		};
		
		$.fn.OldSearch.Init();
		
		if($.fn.bgiframe){
			$(OldSearchWrapp).bgiframe();
		} 
		
		return OldSearch;
	};	  

    $.fn.SpinnerInput = function(input, _options){
		
		
		var options = {
			Loading : 'loading',
			Erase   : 'inputerase',
			Title   : 'Borrar',
			onClean: function(input){}
        };
		
		options = $.extend(options, _options);
		
        var _spinner =  $('<a/>').addClass(options.Erase).attr('title', options.Title);
        var _state = false;
		
		$(_spinner).click(function(event){
			event.preventDefault();
			_state = false;
			$(input).val('');
			$(input).focus();
			$(this).hide();
		}).hide(); 
		
		return {
			Update : function(){
				_spinner[(!_state)?"addClass":"removeClass"](options.Loading); _state = !_state;				
			},
			Hide : function(){
				_spinner.hide();
				options.onClean(this, input);
			},	
			Show : function(){
				_spinner.show();
			},
			_state: function(){
				return _state;
			},
			e : function (){
				return 	_spinner;
			}
		};       

    };

    $.fn.SetObjMem = function(key, value){
        Session.set($.fn.iFilter.ToTrimVar(key.toLowerCase()), value);
    };

    $.fn.GetObjMem = function(key){
        return Session.get($.fn.iFilter.ToTrimVar(key.toLowerCase())) || null;
    };

    $.fn.iFilter.ViewMem = function(){
        try {
           Session.dump();
        }
        catch (e) {
            alert(e.toString());
        }
    };
	
	$.fn.iFilter.ToTrimVar = function(value){
		return value.replace(/\W/ig,'');
	};
	
	/* TOOLS AND ADITIONAL FUNCTIONS */
	
	$.fn.SetCookie = function (nombre, valor, duracion, ruta, dominio, segura){ 
		if(duracion){
		var duracion = ((duracion *1000) * 86400) ; 
		var expires = new Date(); 
		expires.setUTCMilliseconds(expires.getUTCMilliseconds() + duracion);}
		document.cookie = escape(nombre) + "=" + (valor? escape(valor) : "") + (expires ? "; expires=" + expires.toGMTString() : "") + (ruta    ? "; path="    + escape(ruta) : "") + (dominio ? "; domain="  + escape(dominio) : "") + (segura  ? "; secure" : "");
	};

	$.fn.GetCookie = function(name, _eval) { 		
		try{
			var __eval = _eval || false;
			var re = new RegExp("^(" + escape(name) + ")=(.*)$", "i");
			var c=document.cookie.split(/;\s*/);		
			for(var i in c){
				if(re.test(c[i])){
					if(!__eval){ 
						return unescape(re.exec(c[i])[2]);
					}else{ 
						var out = unescape(re.exec(c[i])[2]);
						if( out != null && out != ''){
							return eval('('+out+')');
						}
					}
				}
			}
		return null;
		}catch(e){
			alert(e.toString());
			return null;
		}
		
	};
	

	
	$.fn.MoveList = function(List, To, Animate, Speed){
			var speed = Speed || 500;
			var animate = Animate || false; 
			var listin = $(List[0]).children();
			var offset = 0;
			if (listin.length > 0) { 
				$(listin).slice(0, To).each(function(){ 
					offset += this.offsetHeight; 
				});
				if(animate){
					if ((offset + listin[0].offsetHeight - $(List[0]).scrollTop()) > List[0].clientHeight) {					
						$(List[0]).animate({ scrollTop : offset + listin[0].offsetHeight - $(List[0]).innerHeight() } ,Speed);
					}else if (offset < $(List[0]).scrollTop()) {		
						$(List[0]).animate({ scrollTop : offset } ,Speed);				
					}
				}else{
					if ((offset + listin[0].offsetHeight - $(List[0]).scrollTop()) > List[0].clientHeight) {
						$(List[0]).scrollTop(offset + listin[0].offsetHeight - $(List[0]).innerHeight());
					}else if (offset < $(List[0]).scrollTop()) {
						$(List[0]).scrollTop(offset);
					}	
				}
			}
			return;
		};
		
/* jQuery simpleTabs by me :D 
-------------------------------------------------*/		
		
$.extend($.fn,{
		 
	simpleTabs: function(options){
		var this_ = this;
		
		this.defaults = {
			triggerType: 'a',
			prntTag : 'ul',
			prntTrigger: 'li',
			selectedClass:'selected',
			tabCurrentClass: 'current-tab'
		};
		
		this.settings = $.extend({}, this.defaults, options); 
		
		this.each(function(){
						   
			$this = $(this);
			
			if($this.hasClass('display')){
				$($this.attr('rel')).addClass(this_.settings.tabCurrentClass);					
			}else{
				$($this.attr('rel')).hide();	
			}
				
			$this.bind('click.simpleTabs', function(e){
				e.preventDefault();
				var $trg = $(this);
				var $trp = $trg.parents(this_.settings.prntTrigger);
				var $pnt = $trg.parents(this_.settings.prntTag);
				var $btab = $($trg.attr('rel'));
				
				if(this_.cbtab){
					this_.cbtab.hide();
					this_.ctrg.parent(this_.settings.prntTrigger).removeClass(this_.settings.selectedClass);
				}else{
					$($pnt.find('.' + this_.settings.selectedClass)
					.removeClass(this_.settings.selectedClass)
					.find(this_.settings.triggerType)
					.attr('rel')).hide();
				}
				$btab.show();
				$trp.addClass(this_.settings.selectedClass);
				this_.cbtab = $btab;
				this_.ctrg = $trg;
			});
			
		});
	}		 
});		
	
/* jQuery ButtonFx by me :D 
-------------------------------------------------*/

$.extend($.fn,{ 
	spinnerBtn : function(options){
		var sb = $.data(this[0], 'ButtonFx');
		if(sb){
			return sb;
		}
		return this.each(function(){
			if($(this).attr('disabled') && $(this).hasClass('no-disabled')){
				$(this).removeAttr('disabled');
			}					  
			var bfx = new $.ButtonFx(this, options);
			$.data(this, 'ButtonFx', bfx);
		});	 	
	}
});

$.ButtonFx = function(btn, options){
	this.settings =  $.extend( true, {}, $.ButtonFx.defaults, options);
	this.btn = btn;
	this.init();
};

$.extend($.ButtonFx, {
	defaults:{
		evaluate: function(){return true;},
		typeFx : 'hover',			
		onLoadingActive:true,
		textLoading: 'Cargando',
		clsName: 'bfx-roller-loading',
		urlSpinner : 'spinner.gif',
		disabledActive: true,
		disabledClass: 'bfx-disabled',
		onLoadingClass : 'bfx-btn-onloading',
		distance: 10,
		position: 'right',
		onClick : function(){},
		onStop: function(){},
		css : {}
	},
	prototype: {
		timer:0,
		css:false,
		state:false,
		btn:null,
		spinner:null,
		textNext:'',
		textPrevious: '',
		init: function(){
			var this_ = this;
			var $btn = $(this.btn);
			
			this.textPrevious = $btn.find('span').text() || $btn.val()  ||  $btn.text() ;
			this.textNext = $btn.attr('title');
			$btn.attr('title', this.textPrevious);
			$btn.hover(function(){
				$btn.css(this_.settings.css);			 
			},function(){
				$btn.removeAttr('style');
			});
			
			if(this.settings.onLoadingActive){ 
				this.spinner = $('<div/>').addClass(this.settings.clsName).attr('title', this.settings.textLoading).hide().get(0);
				this.spinner_image = $('<img />').attr('src', this.settings.urlSpinner);
				this.textloading = $('<p/>').text(this.textNext);
				$(this.spinner).append([this.spinner_image.get(0),this.textloading.get(0)]);
				$btn.bind('click.ButtonFx', function(e){ 
					this.nodeName.toLowerCase() == 'a' && e.preventDefault();								 
					this_.play();
				}).bind('stop.ButtonFx', function(e){
					this_.stop();
				});
			}
		},
		setTextLoading: function(value){
			this.textloading = value;
		},
		stop: function(){
			$spinner = $(this.spinner);
			$btn = $(this.btn);
			$spinner.hide();
			clearInterval(this.timer);
			$btn.removeAttr('disabled').removeAttr('style').removeClass([this.settings.onLoadingClass, this.settings.disabledClass]);
			$btn.find('span').text(this.textPrevious) || $btn.text(this.textPrevious) ;
			$btn.val(this.textPrevious);
			this.settings.onStop && this.settings.onStop.apply($btn, [ this ]);
			this.state = false;
		},
		play: function(){
			if(this.settings.evaluate()){
				var this_ = this;
				$btn = $(this.btn);
				$spinner = $(this.spinner);
	
				if(!this.state){ 
					this.state = true;$spinner.show();
					$('body').prepend($spinner);
					$btn.addClass(this.settings.onLoadingClass);
					
					switch(this.btn.nodeName.toLowerCase()){
						case 'input': case 'button':

							$btn.addClass(this.settings.disabledClass).val(this.textNext);
                            if(this.settings.disabledActive) {
                                setTimeout(function(){
                                    $btn.attr('disabled','disabled');
                                },30);
                            }
							break;
						default:
							$btn.addClass(this.settings.disabledClass);
							$btn.find('span').text(this.textNext) || $btn.text(this.textNext);
							break;
					};
					clearInterval(this.timer);
					this.updatePosition();
					this.timer = setInterval(function(){
						this_.updatePosition();				
					},100);
					$btn.blur();
					this.settings.onClick && this.settings.onClick.apply(this, [ this.btn ]);
				}
			}
		},
		updatePosition: function(){ 
			$(this.spinner).css(this.getPositions());	
		},
		getPositions: function(){
			var btncoords = $(this.btn).offset();
			return ({ 
				top: (btncoords.top +  (this.btn.offsetHeight / 2 )) - (this.spinner.offsetHeight / 2),
				left: ($(this.btn).hasClass('loading_left'))? btncoords.left -  this.spinner.offsetWidth  
				- this.settings.distance : btncoords.left +  this.btn.offsetWidth  + this.settings.distance
			});
		}
	}
});
	
	
	
	/* PlaceHolder By Osobrevilla */
	

	$.fn.extend({
		PlaceHolder : function(options){ 
			var options = $.extend({}, $.Pholder.settings, options);
			return this.each(function(){ 
				new $.Pholder(this, options);					  
			});
		},
		unbindplaceholder : function(){
			this.trigger('delplaceholder');
		}
	});
	 
	
	 
	 $.Pholder = function(input, options){
		
		var TextHolder = options.SourceText(input);
		var InitState = (input == document.activeElement); 
		
		$($(input).val(input.value || TextHolder)).bind('focus.placeholder',function(){			
			if(this.value != TextHolder){
				$(this).removeAttr('style');
				$(this).removeClass('place-holder');
			}else{
				this.value = '';
				$(this).removeAttr('style');
				$(this).removeClass('place-holder');
			}			
		}).bind('blur.placeholder',function(){
			if(this.value != '' && this.value != TextHolder){
				this.value = this.value;
				$(this).css(options.Css);				
			}else{
				this.value = TextHolder;
				$(this).css(options.Css);
				$(this).addClass('place-holder');
			}			
		}).bind('keypress.placeholder',function(){
			if(this.value == TextHolder){
				$(this).removeAttr('style');
				$(this).removeClass('place-holder');
			}
		}).bind('click.placeholder',function(event){
			if(InitState){
				$(this).removeAttr('style');
				$(this).removeClass('place-holder');
				this.value =  (this.value == TextHolder) ? ''  : this.value;
				$(this).unbind('click');
			}
		}).bind('delplaceholder', function(){
			$(this).unbind('.placeholder').removeAttr('style');								
		}).css(options.Css).addClass('place-holder');
	 };
	 
	 $.Pholder.settings = {
		Css : {
			color:'#999'
		},
		SourceText : function(i){
			return $(i).attr('title');
		}		
	};
	 
	 
	 /* Switcher IPhone */
	 
	 $.fn.Switcher = function(_options){
	 	var options = $.extend({
			
		},_options);
		
		return this.each(function(){
			new $.fn.Switcher.Create(this, options);					  
		});	 	
	 
	 };
	 
	$.fn.Switcher.Create = function(checkbox){ 
		var _switch  = $('<div/>').addClass('switcher');
		var _spandot = $('<span/>').addClass('switcher-spandot off');
		var _handler = $('<span/>').addClass('switcher-handler').hide();
		var _state    = checkbox.checked;
		var _disabled = checkbox.disabled;
		_switch = $(checkbox).wrap($(_switch)).parent();
		//_switch = $($(checkbox).hide()).wrap($(_switch)).parent();
		with(_switch){
			append(_spandot); 
			append(_handler);
		};		
	
		_switch.click(function(){
			if(!_disabled){	if(!_state){ToOn(this);	}else{ToOff(this);}}
		
		}).mousedown(function(){
			return false;	
		})
		
		$(checkbox).bind('changeto',function(event, _boolean){
			var _boolean = _boolean || false;											 
			if(_boolean){ToOn(_switch);}else{ ToOff(_switch);}
		}).focus(function(){ 
			$(_switch).css({outline:'1px dotted #333'});	
		}).blur(function(){
			$(_switch).css({outline:''});
		}).bind('onchange',function(){
			if(this.checked){ ToOn(_switch); }else{  ToOff(_switch);}	
		}).change(function(){ 
			if(this.checked){ ToOn(_switch); }else{  ToOff(_switch);}
		});	
		
		function ToOn(_this){
			$(_this).animate({backgroundPosition:'0px 0'},200).removeClass('off').addClass('on');			
			checkbox.checked = _state = true;
		};
		
		function ToOff(_this){ 
			$(_this).animate({backgroundPosition:'-37px 0'},200).removeClass('on').addClass('off');			
			checkbox.checked = _state = false;
		};
		
		if(_state){ ToOn(_switch); }else{  ToOff(_switch);}
		
	 };
	
	  $.fn.jPagger = function(_options, codid){
		
		var options = $.extend({				   
			Url: 'http://dominio.com/',
			MoreParams: { },
			TopPaginator: false,
			Type: 'GET',
			Limit: 4,
			Count : false,
			Cache : true,
			PagesView: 5,
			ItemsByPage: 10,
			Historial : true,
			LoopTimer:200,
			MarginRight : 0,
			BtnNextText : 'Siguiente »',
			BtnPrevText : '« Anterior',
			BtnMorePages: '...',
			OnInit : function(d){},
			OnLoadData : function(d){},
			OnLoading : function(){},
			OnSuccess: function(){},
			NoDataFound: function(){},
			Initialize : true,
			ListType : '<ul/>',
			ItemType : '<li/>',
			ListWrapp: 'jpagger-wrapp-list clearfix',
			ListCls: 'jpagger-content-list clearfix',
			ListItemCls : 'jpagger-item',
			ListItemSelCls : 'jpagger-select',
			ListItemSelOver : 'jpagger-over',
			BtnNextTextCls : 'jpagger-next',
			BtnPrevTextCls : 'jpagger-prev',
			BtnMorePages : 'jpagger-morepages',
			IFrameName: 'jpagger-iframe',
			FixUrl : ""
		},_options);

		if(!options.Count){
			options.NoDataFound && options.NoDataFound();
			return;
		}
		return $(this).each(function(i){	
			$.fn.jPagger.Pager($(this), options, codid);									
		});
	};
	
	$.fn.jPagger.Pager = function(_this, options, codid){
		 
		var _Pager;
		var _size = options.Count;		
		var _memname = 'cluster_' + codid;
		var _currentpage = 0;
		var _memory =  Session.get(_memname) || new Array();
		var _data;
		var _spinner;
		var _list , _list2;
		var _datacount;
		var _numpages = 0;
		var _prevpage;
		var _nextbtn, _prevbtn;
		var _widthmask;
		var _contentlist;
		var _widthitem;
		var _currentelem;
		var _trigger;
		var _tiraje = 1;
		var _onprocess = false;
		var _currenthash = null;
		var _urlreader = new $.Eco.Lib.UrlReader() || false;
		var _page_timer = null;
		var _hIframe = null;
		var _isIE = (jQuery.browser.msie && Number(jQuery.browser.version.substr(0,1)) < 8);
		var _onnav = 0;
		
		_Pager = {
		
			Next : function(){ 
				this.GoTo(_currentpage + 1);
			},
			
			Prev : function(){
				this.GoTo(_currentpage - 1);
			},
			
			MoreNext : function(i){
				this.GoTo(_currentpage + (i || options.PagesView));
			},
			
			MoreBack : function(i){
				this.GoTo(_currentpage - (i || options.PagesView));
			},
			
			SetHash : function(numpage){
				var urlReader = new $.Eco.Lib.UrlReader();				
				_urlreader.setHash( urlReader.serialize($.extend(urlReader.getSrcHashVars(), { page: numpage, k:codid })));
			},
			
			LoadPage : function(page){
				this.GoTo(page);
			},
			
			GoTo : function(numpage, manual){
				
				if(!_onprocess){ // verificamos que no se este haciendo una solicitud actualmente
					if(numpage <= _numpages && numpage > 0 ){ 
						options.OnLoading();
						setTimeout(function(){						
						_onprocess = true; 
							var data = SelectPage(parseInt(numpage), manual);
							if(data && data.data.length){ 
								options.OnLoadData.apply(_trigger, [data || []]);
							}
						},100);
					}
				}
			},
			
			GetCurrentPage: function(){ 
				return _currentpage; 
			}			
		};
		
		
		function Construct(){ 
			var _item;
			var listType = options.ListType || '';
			var _width = 0;
			if(listType !== null && listType !== false){				
				_contentlist = $('<div/>').addClass(options.ListWrapp);
				_contentlist2 = _contentlist.clone();
			    _list = $(listType).addClass(options.ListCls);
				_list2 = _list.clone();
				_contentlist.append(_list);
				if(options.TopPaginator  !== false){					
					$(options.TopPaginator).append(_contentlist2.append(_list2));	
				}
			}
			
			if(options.Historial && _isIE){
				_hIframe = $('<iframe id="'+ options.IFrameName + parseInt(Math.random() * 1000) +'" style="display: none;"></iframe>').prependTo(document.body)[0];
          		_hIframe.contentWindow.document.open();
				_hIframe.contentWindow.document.close();
			}
			
			_prevbtn = $('<span/>').append($('<a/>')
				.attr({ href: '#', title: options.BtnPrevText }).text(options.BtnPrevText))
				.addClass(options.ListItemCls + ' ' + options.BtnPrevTextCls).click(function(event){																																																		
					event.preventDefault();
					_trigger = $(this);
					_Pager.Prev($(this));
				});
				
			_nextbtn = $('<span/>').append($('<a/>')
				.attr({ href: '#', title: options.BtnNextText }).text(options.BtnNextText))
				.addClass(options.ListItemCls + ' ' + options.BtnNextTextCls).click(function(event){																																																		
					event.preventDefault();
					_trigger = $(this);
					_Pager.Next($(this));
				});
			
			_dotmorenext = $('<span/>').append($('<a/>')
				.attr({ href: '#', title: '...' }).text('+5'))
				.addClass(options.BtnMorePages).click(function(event){																																																		
					event.preventDefault();
					_Pager.MoreNext();
				}).addClass(options.ListItemCls)[(options.PageView <= _numpages)? 'hide':'show']();
				
			_dotmoreback = $('<span/>').append($('<a/>')
				.attr({ href: '#', title: '...' }).text('-5'))
				.addClass(options.BtnMorePages).click(function(event){																																																		
					event.preventDefault();					
					_Pager.MoreBack();
				}).addClass(options.ListItemCls).hide();
			
			
			for(var i=0; i < _numpages; i++){ 
				_item = $(options.ItemType).append($('<a/>').attr({ href:'#', title: i + 1 }).text(i + 1)).addClass(options.ListItemCls);
				_list.append(_item);
				if(_list2){ _list2.append(_item.clone()); }
			}
			
			$.each([_list.children()],function(){
				 $(this).click(function(event){				
					event.preventDefault();
					_prevpage && _prevpage.removeClass(options.ListItemSelCls);					
					_prevpage = $(this).addClass(options.ListItemSelCls);
					//_Pager.SetHash($(this).text())
					_trigger = $(this);
					_Pager.GoTo($(this).text());
					checkHash();
					
				});										  
			});
			
	
			_this.append((_contentlist)? _contentlist : _list.childs());
			_width = (_item[0].width || _item[0].clientWidth || parseInt($(_item[0]).css('width')));
			_widthitem = _width + options.MarginRight;
			//_contentlist.width(options.PagesView * _widthitem); 
			//_contentlist2.width(options.PagesView * _widthitem);
			//_list.width(_numpages * ((_width + (_width * 2 )) + options.MarginRight ));
			//_list2.width(_numpages * ((_width + (_width * 2 )) + options.MarginRight ));
			if(_numpages > options.PagesView) {
				//_this.prepend(_dotmoreback);
				//_this.append(_dotmorenext);
			}
			if(_size > _numpages){ 
				_this.prepend(_prevbtn);		
				_this.append(_nextbtn);
			}
			//_this.copyEventsTo(clon)
		
		};
		

		function SelectPage(numpage, manual){
			var _out = false;
			var sitem = (numpage >= 0)? numpage-1 : 0;
			if(numpage <= _numpages && numpage > 0 ){ 
				_prevpage && _prevpage.removeClass(options.ListItemSelCls);	
				_prevpage = $($(_list[0]).children()[sitem]).addClass(options.ListItemSelCls);				
				_Pager.SetHash(numpage);			
				if(_page_timer) {
					clearTimeout(_page_timer);
				}
				_out = GetData(numpage, manual);					
				//MoveTo(numpage); 
				_currentpage = parseInt(numpage); //temporal
				
			}
			return _out;
		};
		
		function MoveTo(pagina){
			
			var _pag = pagina - 1;
			var _pc = parseInt(_numpages / options.PagesView);
			var _residuo =  _numpages % options.PagesView;
			var _dif = (_numpages - _residuo) - (options.PagesView - _residuo);
			var _rest =  _numpages - _residuo;

			if(_currentpage < pagina){

				if( _pag == (options.PagesView * Math.ceil(_pag / options.PagesView))){					
					_rest = ( _rest == _pag && _pag > 1 )? _residuo - 1 : 0; 
					_list.css( { left : - ( ( _pag - _rest ) * _widthitem ) });		
				}
				
			}else{	
			
				if( pagina == (options.PagesView *  Math.ceil(_pag / options.PagesView))){  
					_rest = ( _rest == _pag )? _residuo + 1 : options.PagesView;
					_list.css( { left : - ( (pagina - _rest ) * _widthitem ) });					
				}
			}
			_currentpage = parseInt(pagina);
		};
		
		function CheckCache(n){ 			
			
			var cacheData = Session.get(_memname) || false;
			if(cacheData){			
				var val = cacheData.slice(n);
				if( val && val != ''){						
					return false;
				}else{
					return true;	
				}
			}else{ 
				return true;	
			}
			
		};
		
		function GetData(numpage, manual){
			
			if(!manual){
				if(_currentpage == numpage){
					options.OnSuccess();
					_onprocess = false;
					return; 
				}
			}
			
			if(options.Cache){
				var cacheexist = !(CheckCache(numpage-1));	
			}
			
            if(cacheexist) { 
             	options.OnSuccess();
				_onprocess = false;							
			}else{ 
			
			
				 $.ajax({
					type: options.Type,
					url : options.Url,
					data:   
					$.extend({
						pid : numpage 
					}, $.extend( new jQuery.Eco.Lib.UrlReader().getSrcHashVars() || {} , options.MoreParams)),
					dataType: 'json', 
					beforeSend : function(){
						options.OnLoading();
					},
					async:false,
					success: function(data){				
						if (data && data !== false && data != null && data.data.length) {
							_memory[ numpage - 1] = data ;
							Session.set(_memname, _memory);								
						}else{
							options.NoDataFound(data);		
						}
						options.OnSuccess();
						_onprocess = false;
					},
					timeout : 5000
                });
			}
			
			if(_isIE && options.Historial && !_onnav){
				_hIframe.contentWindow.document.open();
				_hIframe.contentWindow.document.close();
			    _hIframe.contentWindow.document.location.hash = 'page=' + numpage + '&k=' + codid;
			}
			
			_currenthash = document.location.hash;
			
			if(options.Historial){				
				_page_timer = setTimeout(function(){
					_onnav = false;													  
					checkHash();
				},options.LoopTimer);
			}
			
			return _memory[numpage-1];	
		};
		
		function checkHash(){
			
			_page_timer = setTimeout(function(){											 
				checkHash();
			},options.LoopTimer);
			
			var n = _urlreader.getHashVars('page');	
			var k = _urlreader.getHashVars('k');
			
			
			if(_isIE){
				urlIframe = _hIframe.contentWindow.document.location.hash;
				n = _urlreader.getSrcHashVars(urlIframe, 'page'); 
				if(window.location.hash == urlIframe || _onnav)
					return;			
			}else{				
				if(window.location.hash == _currenthash || k != codid)	{			
					return;	
				}
			}
			
			if(n > 0 && n != _currentpage){
                _onnav = true;
				_Pager.LoadPage(n);
			}	
			
		};
		
		function Init(){ 			
			if(options.Initialize){
				_numpages  = Math.ceil( _size / options.ItemsByPage );
				options.PagesView = (options.PagesView > _numpages )? _numpages : options.PagesView;
				Construct();
				options.OnInit(_Pager); 
				checkHash();
			}			
		};
		
		
		
		Init();
	};
		

	
	/*
 * jQuery validation plug-in 1.7
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2008 Jörn Zaefferer
 *
 * $Id: jquery.validate.js 6403 2009-06-17 14:27:16Z joern.zaefferer $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($){$.extend($.fn,{validate:function(options){if(!this.length){options&&options.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");return;}
var validator=$.data(this[0],'validator');if(validator){return validator;}
validator=new $.validator(options,this[0]);$.data(this[0],'validator',validator);if(validator.settings.onsubmit){this.find("input, button").filter(".cancel").click(function(){validator.cancelSubmit=true;});if(validator.settings.submitHandler){this.find("input, button").filter(":submit").click(function(){validator.submitButton=this;});}
this.submit(function(event){ if(validator.settings.debug)
event.preventDefault();function handle(){if(validator.settings.submitHandler){if(validator.submitButton){var hidden=$("<input type='hidden'/>").attr("name",validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);}
validator.settings.submitHandler.call(validator,validator.currentForm);if(validator.submitButton){hidden.remove();}
return false;}
return true; }
if(validator.cancelSubmit){validator.cancelSubmit=false;return handle();}
if(validator.form()){if(validator.pendingRequest){validator.formSubmitted=true;return false;}
return handle();}else{validator.focusInvalid(); return false;}});}
return validator;},valid:function(){if($(this[0]).is('form')){return this.validate().form();}else{var valid=true;var validator=$(this[0].form).validate();this.each(function(){valid&=validator.element(this);});return valid;}},removeAttrs:function(attributes){var result={},$element=this;$.each(attributes.split(/\s/),function(index,value){result[value]=$element.attr(value);$element.removeAttr(value);});return result;},rules:function(command,argument){var element=this[0];if(command){var settings=$.data(element.form,'validator').settings;var staticRules=settings.rules;var existingRules=$.validator.staticRules(element);switch(command){case"add":$.extend(existingRules,$.validator.normalizeRule(argument));staticRules[element.name]=existingRules;if(argument.messages)
settings.messages[element.name]=$.extend(settings.messages[element.name],argument.messages);break;case"remove":if(!argument){delete staticRules[element.name];return existingRules;}
var filtered={};$.each(argument.split(/\s/),function(index,method){filtered[method]=existingRules[method];delete existingRules[method];});return filtered;}}
var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(element),$.validator.classRules(element),$.validator.attributeRules(element),$.validator.staticRules(element)),element);if(data.required){var param=data.required;delete data.required;data=$.extend({required:param},data);}
return data;}});$.extend($.expr[":"],{blank:function(a){return!$.trim(""+a.value);},filled:function(a){return!!$.trim(""+a.value);},unchecked:function(a){return!a.checked;}});$.validator=function(options,form){this.settings=$.extend(true,{},$.validator.defaults,options);this.currentForm=form;this.init();};$.validator.format=function(source,params){if(arguments.length==1)
return function(){var args=$.makeArray(arguments);args.unshift(source);return $.validator.format.apply(this,args);};if(arguments.length>2&&params.constructor!=Array){params=$.makeArray(arguments).slice(1);}
if(params.constructor!=Array){params=[params];}
$.each(params,function(i,n){source=source.replace(new RegExp("\\{"+i+"\\}","g"),n);});return source;};$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(element){this.lastActive=element;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,element,this.settings.errorClass,this.settings.validClass);this.errorsFor(element).hide();}},onfocusout:function(element){if(!this.checkable(element)&&(element.name in this.submitted||!this.optional(element))){this.element(element);}},onkeyup:function(element){if(element.name in this.submitted||element==this.lastElement){this.element(element);}},onclick:function(element){if(element.name in this.submitted)
this.element(element);else if(element.parentNode.name in this.submitted)
this.element(element.parentNode);},highlight:function(element,errorClass,validClass){$(element).addClass(errorClass).removeClass(validClass);},unhighlight:function(element,errorClass,validClass){$(element).removeClass(errorClass).addClass(validClass);}},setDefaults:function(settings){$.extend($.validator.defaults,settings);},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=$(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var groups=(this.groups={});$.each(this.settings.groups,function(key,value){$.each(value.split(/\s/),function(index,name){groups[name]=key;});});var rules=this.settings.rules;$.each(rules,function(key,value){rules[key]=$.validator.normalizeRule(value);});function delegate(event){var validator=$.data(this[0].form,"validator"),eventType="on"+event.type.replace(/^validate/,"");validator.settings[eventType]&&validator.settings[eventType].call(validator,this[0]);}
$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",delegate).validateDelegate(":radio, :checkbox, select, option","click",delegate);if(this.settings.invalidHandler)
$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);},form:function(){this.checkForm();$.extend(this.submitted,this.errorMap);this.invalid=$.extend({},this.errorMap);if(!this.valid())
$(this.currentForm).triggerHandler("invalid-form",[this]);this.showErrors();return this.valid();},checkForm:function(){this.prepareForm();for(var i=0,elements=(this.currentElements=this.elements());elements[i];i++){this.check(elements[i]);}
if(this.settings.onInvalidFields){this.settings.onInvalidFields.call(this);} return this.valid();},element:function(element){element=this.clean(element);this.lastElement=element;this.prepareElement(element);this.currentElements=$(element);var result=this.check(element);if(result){delete this.invalid[element.name];}else{this.invalid[element.name]=true;}
if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers);}
this.showErrors(); return result;},elementsCustom:function(elements){var result=true;for(var i=0;i<elements.length;i+=1){var res=this.element(elements[i]);if(typeof(res)=='boolean'){result*=res;}}
return result;},showErrors:function(errors){if(errors){$.extend(this.errorMap,errors);this.errorList=[];for(var name in errors){this.errorList.push({message:errors[name],element:this.findByName(name)[0]}); }
this.successList=$.grep(this.successList,function(element){return!(element.name in errors);});}
this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors();},resetForm:function(){if($.fn.resetForm)
$(this.currentForm).resetForm();this.submitted={};this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass);},numberOfInvalids:function(){return this.objectLength(this.invalid);},objectLength:function(obj){var count=0;for(var i in obj)
count++;return count;},hideErrors:function(){this.addWrapper(this.toHide).hide();},valid:function(){return this.size()==0;},size:function(){return this.errorList.length;},focusInvalid:function(){if(this.settings.focusInvalid){ try{$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin");}catch(e){}}},findLastActive:function(){var lastActive=this.lastActive;return lastActive&&$.grep(this.errorList,function(n){return n.element.name==lastActive.name;}).length==1&&lastActive;},elements:function(){var validator=this,rulesCache={};return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&validator.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in rulesCache||!validator.objectLength($(this).rules()))
return false;rulesCache[this.name]=true;return true;});},clean:function(selector){return $(selector)[0];},errors:function(){return $(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext);},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=$([]);this.toHide=$([]);this.currentElements=$([]);},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers);},prepareElement:function(element){this.reset();this.toHide=this.errorsFor(element);},check:function(element){element=this.clean(element);if(this.checkable(element)){element=this.findByName(element.name)[0];}
var rules=$(element).rules();var dependencyMismatch=false;for(method in rules){var rule={method:method,parameters:rules[method]};try{var result=$.validator.methods[method].call(this,element.value.replace(/\r/g,""),element,rule.parameters);if(result=="dependency-mismatch"){dependencyMismatch=true;continue;}
dependencyMismatch=false;if(result=="pending"){this.toHide=this.toHide.not(this.errorsFor(element));return;}
if(!result){this.formatAndAdd(element,rule);return false;}}catch(e){this.settings.debug&&window.console&&console.log("exception occured when checking element "+element.id
+", check the '"+rule.method+"' method",e);throw e;}}
if(dependencyMismatch)
return;if(this.objectLength(rules))
this.successList.push(element);return true;},customMetaMessage:function(element,method){if(!$.metadata)
return;var meta=this.settings.meta?$(element).metadata()[this.settings.meta]:$(element).metadata();return meta&&meta.messages&&meta.messages[method];},customMessage:function(name,method){var m=this.settings.messages[name];return m&&(m.constructor==String?m:m[method]);},findDefined:function(){for(var i=0;i<arguments.length;i++){if(arguments[i]!==undefined)
return arguments[i];}
return undefined;},defaultMessage:function(element,method){return this.findDefined(this.customMessage(element.name,method),this.customMetaMessage(element,method),!this.settings.ignoreTitle&&element.title||undefined,$.validator.messages[method],"<strong>Warning: No message defined for "+element.name+"</strong>");},formatAndAdd:function(element,rule){var message=this.defaultMessage(element,rule.method),theregex=/\$?\{(\d+)\}/g;if(typeof message=="function"){message=message.call(this,rule.parameters,element);}else if(theregex.test(message)){message=jQuery.format(message.replace(theregex,'{$1}'),rule.parameters);}
this.errorList.push({message:message,element:element});this.errorMap[element.name]=message;this.submitted[element.name]=message;},addWrapper:function(toToggle){if(this.settings.wrapper)
toToggle=toToggle.add(toToggle.parent(this.settings.wrapper));return toToggle;},defaultShowErrors:function(){for(var i=0;this.errorList[i];i++){var error=this.errorList[i];this.settings.highlight&&this.settings.highlight.call(this,error.element,this.settings.errorClass,this.settings.validClass);this.showLabel(error.element,error.message);}
if(this.errorList.length){this.toShow=this.toShow.add(this.containers);}
if(this.settings.success){for(var i=0;this.successList[i];i++){this.showLabel(this.successList[i]);}}
if(this.settings.unhighlight){for(var i=0,elements=this.validElements();elements[i];i++){this.settings.unhighlight.call(this,elements[i],this.settings.errorClass,this.settings.validClass);}}
this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show();},validElements:function(){return this.currentElements.not(this.invalidElements());},invalidElements:function(){return $(this.errorList).map(function(){return this.element;});},showLabel:function(element,message){var label=this.errorsFor(element);if(label.length){label.removeClass().addClass(this.settings.errorClass);label.attr("generated")&&label.html(message);}else{label=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(element),generated:true}).addClass(this.settings.errorClass).html(message||"");if(this.settings.wrapper){label=label.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();}
if(!this.labelContainer.append(label).length)
this.settings.errorPlacement?this.settings.errorPlacement(label,$(element)):label.insertAfter(element);}
if(!message&&this.settings.success){label.text("");typeof this.settings.success=="string"?label.addClass(this.settings.success):this.settings.success(label);}
this.toShow=this.toShow.add(label);},errorsFor:function(element){var name=this.idOrName(element);return this.errors().filter(function(){return $(this).attr('for')==name;});},idOrName:function(element){return this.groups[element.name]||(this.checkable(element)?element.name:element.id||element.name);},checkable:function(element){return/radio|checkbox/i.test(element.type);},findByName:function(name){var form=this.currentForm;return $(document.getElementsByName(name)).map(function(index,element){return element.form==form&&element.name==name&&element||null;});},getLength:function(value,element){switch(element.nodeName.toLowerCase()){case'select':return $("option:selected",element).length;case'input':if(this.checkable(element))
return this.findByName(element.name).filter(':checked').length;}
return value.length;},depend:function(param,element){return this.dependTypes[typeof param]?this.dependTypes[typeof param](param,element):true;},dependTypes:{"boolean":function(param,element){return param;},"string":function(param,element){return!!$(param,element.form).length;},"function":function(param,element){return param(element);}},optional:function(element){return!$.validator.methods.required.call(this,$.trim(element.value),element)&&"dependency-mismatch";},startRequest:function(element){if(!this.pending[element.name]){this.pendingRequest++;this.pending[element.name]=true;}},stopRequest:function(element,valid){this.pendingRequest--;if(this.pendingRequest<0)
this.pendingRequest=0;delete this.pending[element.name];if(valid&&this.pendingRequest==0&&this.formSubmitted&&this.form()){$(this.currentForm).submit();this.formSubmitted=false;}else if(!valid&&this.pendingRequest==0&&this.formSubmitted){$(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false;}},previousValue:function(element){return $.data(element,"previousValue")||$.data(element,"previousValue",{old:null,valid:true,message:this.defaultMessage(element,"remote")});}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(className,rules){className.constructor==String?this.classRuleSettings[className]=rules:$.extend(this.classRuleSettings,className);},classRules:function(element){var rules={};var classes=$(element).attr('class');classes&&$.each(classes.split(' '),function(){if(this in $.validator.classRuleSettings){$.extend(rules,$.validator.classRuleSettings[this]);}});return rules;},attributeRules:function(element){var rules={};var $element=$(element);for(method in $.validator.methods){var value=$element.attr(method);if(value){rules[method]=value;}}
if(rules.maxlength&&/-1|2147483647|524288/.test(rules.maxlength)){delete rules.maxlength;}
return rules;},metadataRules:function(element){if(!$.metadata)return{};var meta=$.data(element.form,'validator').settings.meta;return meta?$(element).metadata()[meta]:$(element).metadata();},staticRules:function(element){var rules={};var validator=$.data(element.form,'validator');if(validator.settings.rules){rules=$.validator.normalizeRule(validator.settings.rules[element.name])||{};}
return rules;},normalizeRules:function(rules,element){$.each(rules,function(prop,val){if(val===false){delete rules[prop];return;}
if(val.param||val.depends){var keepRule=true;switch(typeof val.depends){case"string":keepRule=!!$(val.depends,element.form).length;break;case"function":keepRule=val.depends.call(element,element);break;}
if(keepRule){rules[prop]=val.param!==undefined?val.param:true;}else{delete rules[prop];}}});$.each(rules,function(rule,parameter){rules[rule]=$.isFunction(parameter)?parameter(element):parameter;});$.each(['minlength','maxlength','min','max'],function(){if(rules[this]){rules[this]=Number(rules[this]);}});$.each(['rangelength','range'],function(){if(rules[this]){rules[this]=[Number(rules[this][0]),Number(rules[this][1])];}});if($.validator.autoCreateRanges){if(rules.min&&rules.max){rules.range=[rules.min,rules.max];delete rules.min;delete rules.max;}
if(rules.minlength&&rules.maxlength){rules.rangelength=[rules.minlength,rules.maxlength];delete rules.minlength;delete rules.maxlength;}}
if(rules.messages){delete rules.messages;}
return rules;},normalizeRule:function(data){if(typeof data=="string"){var transformed={};$.each(data.split(/\s/),function(){transformed[this]=true;});data=transformed;}
return data;},addMethod:function(name,method,message){$.validator.methods[name]=method;$.validator.messages[name]=message!=undefined?message:$.validator.messages[name];if(method.length<3){$.validator.addClassRules(name,$.validator.normalizeRule(name));}},methods:{required:function(value,element,param){if(!this.depend(param,element))
return"dependency-mismatch";switch(element.nodeName.toLowerCase()){case'select':var val=$(element).val();return val&&val.length>0;case'input':if(this.checkable(element))
return this.getLength(value,element)>0;default:return $.trim(value).length>0;}},remote:function(value,element,param){if(this.optional(element))
return"dependency-mismatch";var previous=this.previousValue(element);if(!this.settings.messages[element.name])
this.settings.messages[element.name]={};previous.originalMessage=this.settings.messages[element.name].remote;this.settings.messages[element.name].remote=previous.message;param=typeof param=="string"&&{url:param}||param;if(previous.old!==value){previous.old=value;var validator=this;this.startRequest(element);var data={};data[element.name]=value;$.ajax($.extend(true,{url:param,mode:"abort",port:"validate"+element.name,dataType:"json",data:data,success:function(response){validator.settings.messages[element.name].remote=previous.originalMessage;var valid=response===true;if(valid){var submitted=validator.formSubmitted;validator.prepareElement(element);validator.formSubmitted=submitted;validator.successList.push(element);validator.showErrors();}else{var errors={};var message=(previous.message=response||validator.defaultMessage(element,"remote"));errors[element.name]=$.isFunction(message)?message(value):message;validator.showErrors(errors);}
previous.valid=valid;validator.stopRequest(element,valid);}},param));return"pending";}else if(this.pending[element.name]){return"pending";}
return previous.valid;},minlength:function(value,element,param){return this.optional(element)||this.getLength($.trim(value),element)>=param;},maxlength:function(value,element,param){return this.optional(element)||this.getLength($.trim(value),element)<=param;},rangelength:function(value,element,param){var length=this.getLength($.trim(value),element);return this.optional(element)||(length>=param[0]&&length<=param[1]);},min:function(value,element,param){return this.optional(element)||value>=param;},max:function(value,element,param){return this.optional(element)||value<=param;},range:function(value,element,param){return this.optional(element)||(value>=param[0]&&value<=param[1]);},email:function(value,element){return this.optional(element)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);},url:function(value,element){return this.optional(element)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);},date:function(value,element){return this.optional(element)||!/Invalid|NaN/.test(new Date(value));},dateISO:function(value,element){return this.optional(element)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);},number:function(value,element){return this.optional(element)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);},digits:function(value,element){return this.optional(element)||/^\d+$/.test(value);},creditcard:function(value,element){if(this.optional(element))
return"dependency-mismatch";if(/[^0-9-]+/.test(value))
return false;var nCheck=0,nDigit=0,bEven=false;value=value.replace(/\D/g,"");for(var n=value.length-1;n>=0;n--){var cDigit=value.charAt(n);var nDigit=parseInt(cDigit,10);if(bEven){if((nDigit*=2)>9)
nDigit-=9;}
nCheck+=nDigit;bEven=!bEven;}
return(nCheck%10)==0;},accept:function(value,element,param){param=typeof param=="string"?param.replace(/,/g,'|'):"png|jpe?g|gif";return this.optional(element)||value.match(new RegExp(".("+param+")$","i"));},equalTo:function(value,element,param){var target=$(param).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){$(element).valid();});return value==target.val();}}});$.format=$.validator.format;})(jQuery);;(function($){var ajax=$.ajax;var pendingRequests={};$.ajax=function(settings){settings=$.extend(settings,$.extend({},$.ajaxSettings,settings));var port=settings.port;if(settings.mode=="abort"){if(pendingRequests[port]){pendingRequests[port].abort();}
return(pendingRequests[port]=ajax.apply(this,arguments));}
return ajax.apply(this,arguments);};})(jQuery);;(function($){if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){$.each({focus:'focusin',blur:'focusout'},function(original,fix){$.event.special[fix]={setup:function(){this.addEventListener(original,handler,true);},teardown:function(){this.removeEventListener(original,handler,true);},handler:function(e){arguments[0]=$.event.fix(e);arguments[0].type=fix;return $.event.handle.apply(this,arguments);}};function handler(e){e=$.event.fix(e);e.type=fix;return $.event.handle.call(this,e);}});};$.extend($.fn,{validateDelegate:function(delegate,type,handler){return this.bind(type,function(event){var target=$(event.target);if(target.is(delegate)){return handler.apply(target,arguments);}});}});})(jQuery);
	
 /*EXTENDIENDO EL VALIDATE*/	
	
	$.extend($.validator.defaults, {
        errorElement: "em",
        ignoreTitle: true,
        showErrors: function(errorMap, errorList) {
			
			for ( var i = 0; this.errorList[i]; i++ ) {
					var error = this.errorList[i];
					this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
					var $el = $(error.element);
					if ($el.attr('type') == 'checkbox' || $el.attr('type') == 'radio') {
						$el.parents('.validatebox').addClass('boxerror');
					}else if($el.hasClass('filecolor')){
						var $fn = $el.parents('.parent').find('.filename'); 
						$fn.find('em').remove();
						$fn.append($('<em class="error"/>').text(error.message));	
					}else if($el.hasClass('.mapdisplayer')){
						$($el.next().val()).html($('<em class="error"/>').text(error.message))
					}else{
						this.showLabel( error.element, error.message );	
					}
				}
				if( this.errorList.length ) {
					this.toShow = this.toShow.add( this.containers );
				}
				if (this.settings.success) {
					for ( var i = 0; this.successList[i]; i++ ) {
						var $el = $(this.errorList[i].element)
						if ($el.attr('type') != 'checkbox' && $el.attr('type') != 'radio' && !($el.hasClass('filecolor'))) 
							this.showLabel( this.successList[i] );
					}
				}
				if (this.settings.unhighlight) {
					for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) {
						this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );						
						var $el = $(elements[i]);
						$el.mouseleave().unbind('mouseenter mouseleave').removeAttr('title');
						if ($el.attr('type') == 'checkbox' || $el.attr('type') == 'radio') {
							$el.parents('.validatebox').removeClass('boxerror');
						}else if($el.hasClass('filecolor')){
							$el.parents('.parent').find('.filename em').remove();	
						}else if($el.hasClass('.mapdisplayer')){
							$($el.next().val()).find('.error').remove();
						}
					}
				}
				this.toHide = this.toHide.not( this.toShow );
				this.hideErrors();
				this.addWrapper( this.toShow ).show();
            
        }
    });
	 $.extend($.validator.messages, {
        required: "Campo requerido.",
        remote: "Porfavor corrige este campo.",
        email: "Email inválido.",
        url: "URL inválida.",
        date: "Fecha inválida.",
        dateISO: "Fecha(ISO) inválida.",
        number: "Número inválido.",
        digits: "Ingrese sólo dígitos.",
        creditcard: "Tarjeta inválida.",
        equalTo: "Ingrese el mismo valor.",
        accept: "Extensión inválida.",
        maxlength: $.validator.format("No más de {0} caracteres."),
        minlength: $.validator.format("Mínimo {0} caracteres."),
        rangelength: $.validator.format("Ingrese entre {0} y {1} caracteres."),
        range: $.validator.format("Ingrese un valor entre {0} y {1}."),
        max: $.validator.format("Debe ser menor o igual a {0}."),
        min: $.validator.format("Debe ser mayor o igual a {0}.")
    });
	$.validator.addMethod("nombre", 
		function(value, element){
			return this.optional(element) || /^[\-\sABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚáéíóú']+$/.test(value);
		},
		"Sólo letras, espacios( ), guiones(-) y apóstrofes(').");
	
	$.validator.addMethod("alphanumsimple",
		function(value, element){
			return this.optional(element) || /^[0-9A-Za-z]+$/.test(value);
		},
		"Sólo caracteres alfanuméricos.");
	
	$.validator.addMethod("alphanumspecial",
		function(value, element){
			return this.optional(element) || /^[A-Za-z0-9\.\-_]+$/.test(value);
		},
		"Sólo caracteres alfanuméricos y guiones.");
	
	$.validator.addMethod("decimals",
		function(value, element){
			return (/[0-9]+(?:\.{1}[0-9])?/g).test(value);
		},
		"El valor debe ser un decimal.");
	
	
	$.validator.addMethod("noinjection", 
		function(value, element){
			return !(/<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?\>/g).test(value);
		},
		"Sólo caracteres alfanuméricos (no caracteres especiales)");
	
	$.validator.addMethod("numdec_1",
		function(value, element){
			return this.optional(element) || (/^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/).test(value);
		}, "Sólo numeros enteros o decimales de 2 digitos.");
	
	$.validator.addMethod("exist",
		function(value, element){
			return $(element).data('interfaces').popup.CheckInList(false, true);
		}, "Debe seleccionar una ubicación usando la lista autogenerada");
	
	
	
	$.fn.Collapser = function(def){
		
		var options = $.extend({
			textHide: 'Ocultar',
			textShow: 'Mostrar',
			targetClass : '.bloque',
			classClosed: 'closed',
			classOpen: 'open',
			speed: 'normal'
		},def);
		
		return $(this).each(function(){
			var $this = $(this);
			$this.toggle(function(event){
				event.preventDefault();				  
				hide($this);							 
			},function(event){
				event.preventDefault();
				show($this);
			});
			init($this);
		});
		
		function show(e){
			e.removeClass('max').addClass('min').text(options.textHide).attr('title',options.textHide).parents('div:first').find(options.targetClass).slideDown(options.speed);		
		};
		function hide(e){
			e.removeClass('min').addClass('max').text(options.textShow).attr('title',options.textShow).parents('div:first').find(options.targetClass).slideUp(options.speed);		
		};
		function init($this){
			if($this.hasClass(options.classOpen)){
				$this.removeClass('max').addClass('min').text(options.textHide).attr('title',options.textHide).show();
			} else if($this.hasClass(options.classClosed)){
				$this.removeClass('min').addClass('max').text(options.textHide).attr('title',options.textHide).hide();
			}				
		};
	};
	
	$.fn.toAnchor = function(_options){
		options = $.extend({ speed: 600 , animationShow:'show', animationFx: 'normal', onMove: false }, _options);
		return $.each(this, function(){
			$(this).bind('click', function(event){
				event.preventDefault();
				var target = $($(this).attr('href'))[options.animationShow](options.animationFx);
				var correctionpos = parseInt($($(this).attr('rel'))) || 0;
				$.fn.toAnchor.goTarget(target, options.speed , correctionpos, callback);
				if(options.onMove)
					options.onMove($(this));
			});							 
		});
	};
	
	$.fn.toAnchor.goTarget = function(target, speed, correctionpos, callback){ 
		$('html, body').animate({scrollTop: $(target).offset().top + ( correctionpos || 0 ) }, (speed || 600), callback);
	};
	
	

	$.extend($.fn, {
		equalsHeight: function(options){
			var this_ = this;		
			this.settings = $.extend({ finditem:'li.item'}, options);
			this.each(function(){
				var $items = $(this).find(this_.settings.finditem);
				if($items.length > 1) {
					$items.height(jQuery.Eco.Lib.DOM.getMaxSizes($items).maxHeight);
				}
			});
			
		}
	});


})(jQuery);



/*
 * jQuery MultiSelect Plugin 0.6
 * Copyright (c) 2010 Eric Hynds
 *
 * http://www.erichynds.com/jquery/jquery-multiselect-plugin-with-themeroller-support/
 * Inspired by Cory S.N. LaViska's implementation, A Beautiful Site (http://abeautifulsite.net/) 2009
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
*/
(function(f){f.fn.multiSelect=function(i){i=f.extend({},f.fn.multiSelect.defaults,i);return this.each(function(){return new w(this,i)})};var x=0,w=function(i,a){var g=$original=f(i),e,l,k,h=[],s=[];l=g.is(":disabled");var t=i.id||"ui-multiselect-"+x++;h.push('<a id="'+t+'" class="ui-multiselect ui-widget ui-state-default ui-corner-all'+(l||a.disabled?" ui-state-disabled":"")+'">');h.push('<input readonly="readonly" type="text" class="ui-state-default" value="'+a.noneSelectedText+'" title="'+i.title+
'" /><span class="ui-icon ui-icon-triangle-1-s"></span></a>');h.push('<div class="ui-multiselect-options'+(a.shadow?" ui-multiselect-shadow":"")+' ui-widget ui-widget-content ui-corner-all">');if(a.showHeader){h.push('<div class="ui-widget-header ui-helper-clearfix ui-corner-all ui-multiselect-header">');h.push('<ul class="ui-helper-reset">');h.push('<li><a class="ui-multiselect-all" href=""><span class="ui-icon ui-icon-check"></span>'+a.checkAllText+"</a></li>");h.push('<li><a class="ui-multiselect-none" href=""><span class="ui-icon ui-icon-closethick"></span>'+
a.unCheckAllText+"</a></li>");h.push('<li class="ui-multiselect-close"><a href="" class="ui-multiselect-close ui-icon ui-icon-circle-close"></a></li>');h.push("</ul>");h.push("</div>")}h.push('<ul class="ui-multiselect-checkboxes ui-helper-reset">');l&&g.removeAttr("disabled");g.find("option").each(function(b){var c=f(this),d=c.html(),m=this.value;b=this.id||"ui-multiselect-"+t+"-option-"+b;var j=c.parent(),n=j.is("optgroup"),o=c.is(":disabled"),u=["ui-corner-all"];if(n){j=j.attr("label");if(f.inArray(j,
s)===-1){h.push('<li class="ui-multiselect-optgroup-label"><a href="#">'+j+"</a></li>");s.push(j)}}if(m.length>0){o&&u.push("ui-state-disabled");h.push('<li class="'+(o?"ui-multiselect-disabled":"")+'">');h.push('<label for="'+b+'" class="'+u.join(" ")+'"><input id="'+b+'" type="'+(a.multiple?"checkbox":"radio")+'" name="'+i.name+'" value="'+m+'" title="'+d+'"');c.is(":selected")&&h.push(' checked="checked"');o&&h.push(' disabled="disabled"');h.push(" />"+d+"</label></li>")}});h.push("</ul></div>");
g=g.after(h.join("")).next("a.ui-multiselect");e=g.next("div.ui-multiselect-options");l=e.find("div.ui-multiselect-header");k=e.find("label").not(".ui-state-disabled");var v=g.find("span.ui-icon").outerWidth(),p=$original.outerWidth(),q=p+v;if(/\d/.test(a.minWidth)&&q<a.minWidth){p=a.minWidth-v;q=a.minWidth}g.width(q).find("input").width(p);a.showHeader&&l.find("a").click(function(b){var c=f(this);if(c.hasClass("ui-multiselect-close"))e.trigger("close");else{c=c.hasClass("ui-multiselect-all");e.trigger("toggleChecked",
[c?true:false]);a[c?"onCheckAll":"onUncheckAll"].call(this)}b.preventDefault()});var r=function(){var b=k.find("input"),c=b.filter(":checked"),d="";d=c.length;d=d===0?a.noneSelectedText:f.isFunction(a.selectedText)?a.selectedText.call(this,d,b.length,c.get()):/\d/.test(a.selectedList)&&a.selectedList>0&&d<=a.selectedList?c.map(function(){return this.title}).get().join(", "):a.selectedText.replace("#",d).replace("#",b.length);g.find("input").val(d);return d};g.bind({click:function(){e.trigger("toggle")},
keypress:function(b){switch(b.keyCode){case 27:case 38:e.trigger("close");break;case 40:case 0:e.trigger("toggle");break}},mouseenter:function(){g.hasClass("ui-state-disabled")||f(this).addClass("ui-state-hover")},mouseleave:function(){f(this).removeClass("ui-state-hover")},focus:function(){g.hasClass("ui-state-disabled")||f(this).addClass("ui-state-focus")},blur:function(){f(this).removeClass("ui-state-focus")}});e.bind({close:function(b,c){c=c||false;if(c===true)f("div.ui-multiselect-options").filter(":visible").fadeOut(a.fadeSpeed).prev("a.ui-multiselect").removeClass("ui-state-active").trigger("mouseout");
else{g.removeClass("ui-state-active").trigger("mouseout");e.fadeOut(a.fadeSpeed)}},open:function(b,c){if(!g.hasClass("ui-state-disabled")){var d=g.position(),m=e.find("ul:last"),j,n;g.addClass("ui-state-active");if(c||typeof c==="undefined")e.trigger("close",[true]);j=a.position==="middle"?d.top+g.height()/2-e.outerHeight()/2:a.position==="top"?d.top-e.outerHeight():d.top+g.outerHeight();n=g.width()-parseInt(e.css("padding-left"),10)-parseInt(e.css("padding-right"),10);k.filter("label:first").trigger("mouseenter").trigger("focus");
e.css({position:"absolute",top:j+"px",left:d.left+"px",width:n+"px"}).show();m.scrollTop(0);a.maxHeight&&m.css("height",a.maxHeight);a.onOpen.call(e[0])}},toggle:function(){e.trigger(f(this).is(":hidden")?"open":"close")},traverse:function(b,c,d){b=f(c);d=d===38||d===37?true:false;b=b.parent()[d?"prevAll":"nextAll"]("li:not(.ui-multiselect-disabled, .ui-multiselect-optgroup-label)")[d?"last":"first"]();if(b.length)b.find("label").trigger("mouseenter");else{b=e.find("ul:last");e.find("label")[d?"last":
"first"]().trigger("mouseover");b.scrollTop(d?b.height():0)}},toggleChecked:function(b,c,d){(d&&d.length?d:k.find("input")).not(":disabled").attr("checked",c?"checked":"");r()}}).find("li.ui-multiselect-optgroup-label a").click(function(b){var c=f(this).parent().nextUntil("li.ui-multiselect-optgroup-label").find("input");e.trigger("toggleChecked",[c.filter(":checked").length===c.length?false:true,c]);a.onOptgroupToggle.call(this,c.get());b.preventDefault()});k.bind({mouseenter:function(){k.removeClass("ui-state-hover");
f(this).addClass("ui-state-hover").find("input").focus()},keyup:function(b){switch(b.keyCode){case 27:e.trigger("close");break;case 38:case 40:case 37:case 39:e.trigger("traverse",[this,b.keyCode]);break;case 13:b.preventDefault();f(this).click();break}}}).find("input").bind("click",function(){a.onCheck.call(this);r()});$original.remove();f.fn.bgiframe&&e.bgiframe();a.state==="open"&&e.trigger("open",[false]);g.find("input")[0].defaultValue=r();return g};f(document).bind("click",function(i){i=f(i.target);
!i.closest("div.ui-multiselect-options").length&&!i.parent().hasClass("ui-multiselect")&&f("div.ui-multiselect-options").trigger("close",[true])});f.fn.multiSelect.defaults={showHeader:true,maxHeight:175,minWidth:215,checkAllText:"Check all",unCheckAllText:"Uncheck all",noneSelectedText:"Select options",selectedText:"# selected",selectedList:0,position:"bottom",shadow:false,fadeSpeed:200,disabled:false,state:"closed",multiple:true,onCheck:function(){},onOpen:function(){},onCheckAll:function(){},onUncheckAll:function(){},
onOptgroupToggle:function(){}}})(jQuery);



jQuery.fn.numeric=function(decimal,callback){decimal=decimal||".";callback=typeof callback=="function"?callback:function(){};this.keypress(function(e){var key=e.charCode?e.charCode:e.keyCode?e.keyCode:0;if(key==13&&this.nodeName.toLowerCase()=="input"){return true;}else if(key==13){return false;}var allow=false;if((e.ctrlKey&&key==97)||(e.ctrlKey&&key==65))return true;if((e.ctrlKey&&key==120)||(e.ctrlKey&&key==88))return true;if((e.ctrlKey&&key==99)||(e.ctrlKey&&key==67))return true;if((e.ctrlKey&&key==122)||(e.ctrlKey&&key==90))return true;if((e.ctrlKey&&key==118)||(e.ctrlKey&&key==86)||(e.shiftKey&&key==45))return true;if(key<48||key>57){if(key==45&&this.value.length==0)return true;if(key==decimal.charCodeAt(0)&&this.value.indexOf(decimal)!=-1){allow=false;}if(key!=8&&key!=9&&key!=13&&key!=35&&key!=36&&key!=37&&key!=39&&key!=46){allow=false;}else{if(typeof e.charCode!="undefined"){if(e.keyCode==e.which&&e.which!=0){allow=true;}else if(e.keyCode!=0&&e.charCode==0&&e.which==0){allow=true;}}}if(key==decimal.charCodeAt(0)&&this.value.indexOf(decimal)==-1){allow=true;}}else{allow=true;}return allow;}).blur(function(){var val=jQuery(this).val();if(val!=""){var re=new RegExp("^\\d+$|\\d*"+decimal+"\\d+");if(!re.exec(val)){callback.apply(this);}}});return this;};(
		function($){$.fn.alphanumeric=function(p){p=$.extend({ichars:"!@#$%^&*()+=[]\\\';,/{}|\":<>?~`.- ",nchars:"",allow:""},p);return this.each(function(){if(p.nocaps)p.nchars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";if(p.allcaps)p.nchars+="abcdefghijklmnopqrstuvwxyz";s=p.allow.split('');for(i=0;i<s.length;i++)if(p.ichars.indexOf(s[i])!=-1)s[i]="\\"+s[i];p.allow=s.join('|');var reg=new RegExp(p.allow,'gi');var ch=p.ichars+p.nchars;ch=ch.replace(reg,'');$(this).keypress(function(e){if(!e.charCode)k=String.fromCharCode(e.which);else k=String.fromCharCode(e.charCode);if(ch.indexOf(k)!=-1)e.preventDefault();if(e.ctrlKey&&k=='v')e.preventDefault();});$(this).bind('contextmenu',function(){return false});});};$.fn.numericnodecimal=function(p){var az="abcdefghijklmnopqrstuvwxyz";az+=az.toUpperCase();p=$.extend({nchars:az},p);return this.each(function(){$(this).alphanumeric(p);});};$.fn.alpha=function(p){var nm="1234567890";p=$.extend({nchars:nm},p);return this.each(function(){$(this).alphanumeric(p);});};})(jQuery);


jQuery.Eco =  {
	
	Lib : {
		DOM: {
                    getMaxSizes: function(items){
                    var sizes = {maxHeight: 0, maxWidth:0};
                    for(var i = 0; i < items.length; i+=1){
                        sizes.maxHeight = (items[i].clientHeight > sizes.maxHeight)? items[i].clientHeight : sizes.maxHeight;
                        sizes.maxWidth = (items[i].clientWidth > sizes.maxWidth)? items[i].clientWidth : sizes.maxWidth;
                    };
                    return sizes;
                    }
               },

		DOM: {
			getMaxSizes: function(items){
				var sizes = {maxHeight: 0, maxWidth:0};
					for(var i = 0; i < items.length; i+=1){
						sizes.maxHeight = (items[i].clientHeight > sizes.maxHeight)? items[i].clientHeight : sizes.maxHeight;
						sizes.maxWidth  = (items[i].clientWidth > sizes.maxWidth)? items[i].clientWidth : sizes.maxWidth; 
					};
				return sizes;
			}
		},
		UrlReader :  function() {
	
			var vars = {};
			var hashvars = {};
			var srchashvars = {};
			var srchashvarsM = {};
			
			this.getUriVars = function(varname){
				r();
				return  (varname)? vars[varname] || false : vars || false;
			};
	
			this.getHashVars = function(varname){
				r();
				return  (varname)? hashvars[varname] || false : hashvars || false;
			};
			
			this.getSrcHashVars = function(url, varname){
				(url || window.location.hash).replace(/^\#/, '&').replace(/[?&]+([^=&]+)=([^&]*)/gi, 
					function(m, key ,value) { 
						srchashvars[key] = (/.(\[\])/.test(key)) ? [value] : value;
					
				});
				return  (varname)? srchashvars[varname] || false : srchashvars || false;
			};
			
			this.getSrcHashVarsM = function(url, varname){
				(url || window.location.hash).replace(/^\#/, '&').replace(/[?&]+([^=&]+)=([^&]*)/gi, 
					function(m, key ,value) { 
						if(/.(\[\])/.test(key)){
							var key = key.replace('[]','');
							if(srchashvarsM.hasOwnProperty(key)){
								srchashvarsM[key].push(value);				
							}else{
								srchashvarsM[key] = [value];
							}						
						}else{ 
							srchashvarsM[key] = value;
						}
				});
				return  (varname)? srchashvarsM[varname] || false : srchashvarsM || false;
			};
			
			this.getHash = function(url){
				return  (url)? url.split('#')[1] || false : window.location.hash || location.hash;
			};
			
			this.setHash = function(hash){
				if (typeof window.location.hash !== 'undefined'){
					window.location.hash = hash;
				} else {					 
					location.hash = hash;
				}
			};
			
			this.addHashVars = function(objArray, callback){
				if(jQuery){
					if(!jQuery.Eco.Lib.isArray(objArray)){
						var objArray = [objArray];		   
					}
					if(objArray.length){
						var hv = this.getSrcHashVars();
						for(var i=0; i < objArray.length; i++){
							hv = jQuery.extend(hv, objArray[i] || {});	
						}
						this.setHash(this.serialize(hv));
						callback && callback.apply(this);
					}
				}
			};
			
			this.serialize = function(obj) {
			  var str = [];
			  for(var p in obj)
				 str.push(p + "=" + encodeURIComponent(obj[p]));
			  return str.join("&");
			};
			
			function r(){
				window.location.hash.replace(/^\#/, '&').replace(/[?&]+([^=&]+)=([^&]*)/gi, 
					function(m, key ,value) {
						hashvars[key] = value;
					});
				
				window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, 
					function(m, key, value) {
						vars[key] = value;
					});
			};
			r();
		},
		
		isArray : function(obj){
			return Object.prototype.toString.call(obj) === '[object Array]';
		}
		
		
	}
};
