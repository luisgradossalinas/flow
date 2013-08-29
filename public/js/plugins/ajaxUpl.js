// JavaScript Document
(function ($) {
$.extend($.fn, {
	
	ajaxUpl: {
		
		frame : function(options) {
	 
			var id = 'frm_' + Math.floor(Math.random() * 99999);
			var d = $('<div/>').html('<iframe style="display:none" src="about:blank" id="'+id+'" name="'+id+'" onload="jQuery.fn.ajaxUpl.loaded(\''+id+'\')"></iframe>');
			$('body').append(d);
			var ifrm = $('#' + id).get(0);
			if (options && typeof(options.onComplete) == 'function') {
				ifrm.onComplete = options.onComplete;
			}
	 
			return id;
		},
	 
		form : function($frm, name) {
			$frm.attr('target', name);
		},
	 
		submit : function(frm, options) {
			this.form($(frm), this.frame(options));
			if (options && typeof(options.onStart) == 'function') {
				return options.onStart();
			} else {
				return true;
			}
		},
	 
		loaded : function(id) { 
			var ifrm = $('#' + id).get(0); 
			if (ifrm.contentDocument) {
				var doc = ifrm.contentDocument;
			} else if (ifrm.contentWindow) {
				var doc = ifrm.contentWindow.document;
			} else {
				var doc = window.frames[id].document;
			}
			if (doc.location.href == "about:blank") {
				return;
			}
	 
			if (typeof(ifrm.onComplete) == 'function') {
				ifrm.onComplete(doc.body.innerHTML, $('#' + id));
			}
		}
	
	}		 
});

})(jQuery);