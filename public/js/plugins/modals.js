function Alert(options){
	var $ = jQuery;
	new iModal(
		$.extend(true, options, { 
			buttons: { 
				Aceptar : { 
					onclick: function(){ 
						$.colorbox.close() ;
					}
			} 
	}})).init();
}
function Confirm(options, okCallback, noCallback){
	var $ = jQuery;
	new iModal(
		$.extend(true, options, { 
			buttons: { 
				Aceptar : { 
					onclick: function(){ 
						okCallback && okCallback();
					}
				},
				Cancelar: {
					onclick: function(){
						noCallback && noCallback();
						$.colorbox.close();
					},
					clsName : 'uicancel'
				} 
	}})).init();
}

function iModal(options){
	var $ = jQuery;
	var $this = this;	
	this.defaults = {
		title: 'publicación - Información',
		text: 'Ingrese un mensaje, para el usuario',
		buttons: {
			Aceptar: {
				clsName : 'uiprimary',
				onclick: function(){					
				}
			}
		},
		template: '<div><div id="imodal"><div class="modal"><h3>{1}</h3><div class="content"></div><div class="buttons"></div></div></div>'
	}
	
	$.extend($this, {			 
		init: function(){
			this.settings = $.extend(true, {}, this.defaults, options);
			this.mt = $(this.settings.template);
			this.mt.find('h3').html(this.settings.title);
			this.mt.find('.content').html( this.settings.parraf ? this.settings.text : '<p>'+ this.settings.text +'</p>');
			this.buttonsbar = this.mt.find('div.buttons');
			this.buttonsbar.empty().append(this.makeBtns(this.settings.buttons));
			$.colorbox({ html: this.mt, overlayClose:false });
		},
		makeBtns: function(btns){
			var list_btns = [], this_ = this;
			for (btnName in btns){
				var $btn;  
				(function(){ 
					var btn = btns[btnName];
					$btn = $('<span class="uibutton" />').addClass(btn.clsName).append(
					$('<input type="button" />').val(btnName)).bind('click.imodal', function(){ 
						btn.onclick && btn.onclick.apply(this_, [this]);
					});
				})(this);
				
				list_btns.push($btn.get(0));
			}
			return list_btns; 
		}
	});
}