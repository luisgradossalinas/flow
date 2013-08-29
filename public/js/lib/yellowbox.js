

/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */
 
(function(jQuery){jQuery.each(['backgroundColor','borderBottomColor','borderLeftColor','borderRightColor','borderTopColor','color','outlineColor'],function(i,attr){jQuery.fx.step[attr]=function(fx){if(fx.state==0){fx.start=getColor(fx.elem,attr);fx.end=getRGB(fx.end);}
fx.elem.style[attr]="rgb("+[Math.max(Math.min(parseInt((fx.pos*(fx.end[0]-fx.start[0]))+fx.start[0]),255),0),Math.max(Math.min(parseInt((fx.pos*(fx.end[1]-fx.start[1]))+fx.start[1]),255),0),Math.max(Math.min(parseInt((fx.pos*(fx.end[2]-fx.start[2]))+fx.start[2]),255),0)].join(",")+")";}});function getRGB(color){var result;if(color&&color.constructor==Array&&color.length==3)
return color;if(result=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
return[parseInt(result[1]),parseInt(result[2]),parseInt(result[3])];if(result=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
return[parseFloat(result[1])*2.55,parseFloat(result[2])*2.55,parseFloat(result[3])*2.55];if(result=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
return[parseInt(result[1],16),parseInt(result[2],16),parseInt(result[3],16)];if(result=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
return[parseInt(result[1]+result[1],16),parseInt(result[2]+result[2],16),parseInt(result[3]+result[3],16)];return colors[jQuery.trim(color).toLowerCase()];}
function getColor(elem,attr){var color;do{color=jQuery.curCSS(elem,attr);if(color!=''&&color!='transparent'||jQuery.nodeName(elem,"body"))
break;attr="backgroundColor";}while(elem=elem.parentNode);return getRGB(color);};var colors={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]};})(jQuery);


/* jQuery YellowBox plugin 
 * Copyright 2010 Oscar Sobrevilla (oscar.sobrevilla@gmail.com)
 * Released under the MIT and GPL licenses.
 * version 1.5 Beta
 * Require: jquery.color.js By (John Resig)
 * CSS
 * div.ybox { background:none repeat scroll 0 0 #FFFBE2; border:1px solid #FFE222; margin:0 0 10px; padding:10px; -moz-border-radius:2px; -webkit-border-radius:2px; border-radius:2px;}
 * div.ybox p , div.parraf  { margin:0;}
 * div.ybox .close { cursor:pointer;}
*/
 (function ($) {
 $.extend($.fn, {
	// yellowBox add Plugin	
	yellowBox: function(options){
		if(this && this.length){
			var ybox = $.data(this[0], 'yellowBox');
			if(ybox){ 
				return ybox;
			}
		}
		return this.each(function(){					  
			var ybox = new $.YellowBox($(this), options);
			$.data(this, 'yellowBox', ybox);
		});	
	}
});
 
/* jQuery YellowBox plugin 
 * jquery.yellowbox by Oscar Sobrevilla 
 * version 1.5
 * Require: jquery.color.js By (John Resig)
 */
 
 
$.YellowBox = function($this, options){
	this.settings =  $.extend( true, {}, $.YellowBox.defaults, options);
	this.ybox = $this;
	this.defcolor = this.ybox.css('backgroundColor');
	this.btnsBar = $('<div class="ybox_btnbar" />'); 
	this.init();
};

$.extend($.YellowBox, { 
	/* Example use inline <div class="ylb ylb_autoshow" showin="true" autoclose="true" timetoclose="15" manualclose="true" enfasis="true"></div> */
	defaults: {
		hideFx:'slideUp',
		showFx:'fadeIn',
		onClose: false,
		timeToClose:0, // seconds
		manualClose:true,
		autoClose:false,
		speedFx:'fast',
		intervalRept:1000,
		enfasisFx: { 
			backgroundColor: '#FFE555'
		},
		enfasisCustomFx : false,  // type Function 
		autoFx:1
	},
	
	prototype:{
		
		init: function(){
			
			var this_ = this;
			this.defaults = $.YellowBox.defaults;
			$.extend(this.settings, {
				manualClose: this.ybox.attr('manualclose') || this.defaults.manualClose,
				timeToClose: this.ybox.attr('timetoclose') || this.defaults.timeToClose,
				autoFx: this.ybox.attr('autofx') || this.defaults.autoFx
			});
			
			if(this.settings.enfasisCustomFx && typeof(this.settings.enfasisCustomFx) == 'function' ){
				this.fx = this.settings.enfasisCustomFx; 	
			}
			
			if(this.settings.manualClose){
				var $closer = this.ybox.find('.close');
				if(!$closer.length)
					$closer = $('<a class="close" href="#" title="Cerrar"/>');
				this.ybox.prepend($closer.click(function(e){ 
					e.preventDefault(); 
					this_.close(); 
					this_.settings.onClose && this_.settings.onClose.apply(this_, [this]);
				}));		
			}
			
			if(this.settings.timeToClose){
				setTimeout(function(){
					this_.closer();					
				}, this.settings.timeToClose * 1000);
			}
			
			if(this.settings.autoFx){  
				this.enfasis({}, parseInt(this.settings.autoFx));	
			}
			
		},
		enfasis: function(options, numRepeat, speed){
			var this_ = this;
			var counter = 0;
			var nrepeat = numRepeat || 1;
			this_.fx(options, speed);
			var timer = setInterval(function(){
				if(counter < nrepeat - 1){ 
					this_.fx(options, speed);
					counter+=1;
				}else{
					clearInterval(timer);	
				}
				 
			}, this.settings.intervalRept);
			return this;
		},
		fx: function(options, speed){
			this.ybox
			.animate($.extend(this.settings.enfasisFx, options), speed || 800)
			.animate({ backgroundColor: this.defcolor }, speed || 500);
		},
		open: function(fx, speedFx, autoclose, timeToClose, callback){
			this.ybox[(fx)? fx : this.settings.showFx]((speedFx || this.settings.speedFx), callback);
			return this;
		},
		close: function(fx, speedFx, callback){ 
			this.ybox[(fx)? fx : this.settings.hideFx]((speedFx || this.settings.speedFx), callback);
			return this;
		},
		closer: function(timeToClose){		
			var this_ = this;
			setTimeout(function(){
				this_.close();				
			}, timeToClose || this.settings.timeToClose);	
		},
		makeBtns: function(btns){
			var list_btns = [], this_ = this;
			for(btnName in btns){
				var $btn;  
				(function(){ 
					var btn = btns[btnName];
					$btn = $('<span class="ybox_btn uibutton" />').addClass(btn.clsName).append(
					$('<input type="button" />').bind('click.ybox_btn', function(){ 
						btn.onclick && btn.onclick.apply(this_, [this]);
					}).val(btnName));
					$btn.addClass(btn.clsName);
				})(this);
				
				list_btns.push($btn.get(0));
			}
			return list_btns; 
		},
		setQuestion: function(q, btns){
			this.setMsg(q);
			this.btnsBar.show().empty().append(this.makeBtns(btns));
			this.ybox.append(this.btnsBar);
		},
		setMsg: function(m , seconds, options){
			var this_ = this;
			this.open('slideDown', 'fast').enfasis();
			this.btnsBar.hide();
			this.ybox.find('div.parraf, p').html(m);
			if($.fn.toAnchor && options){
				$.fn.toAnchor.goTarget(options);
			}
			if(seconds){
				setTimeout(function(){
					this_.close();				
				}, (seconds || 5 ) * 1000);
			}
		}
	}
});

/* jQuery toAnchor Scroll Animate plugin 
 * Copyright 2009 Oscar Sobrevilla (oscar.sobrevilla@gmail.com)
 * Released under the MIT and GPL licenses.
 * version 1.0 Beta
 */
$.fn.toAnchor = function(_options){
	var options = $.extend({ speed: 600 , animationShow:'show', animationFx: 'normal', onMove: false }, _options);
	return $.each(this, function(){
		$(this).bind('click', function(event){
			event.preventDefault();
			var target_ = $($(this).attr('href'))[options.animationShow](options.animationFx);
			var correctionpos = parseInt($($(this).attr('rel'))) || 0;
			$.fn.toAnchor.goTarget({ target: target_, speed: options.speed , cp: correctionpos, callback: callback });
			if(options.onMove)
				options.onMove($(this));
		});							 
	});
};

$.fn.toAnchor.goTarget = function(options){ 
	$('html, body').animate({scrollTop: $(options.target).offset().top + ( options.cp || 0 ) }, (options.speed || 600), options.callback);
};

})(jQuery);