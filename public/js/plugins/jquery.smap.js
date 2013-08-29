// JavaScript Document

(function($){

	
	
	$.fn.gooMaps = function(options){
		
		
		
		if( this && this.length ){
			var gooMaps = $.data(this[0], 'gooMaps');
			if(gooMaps){  
				return (gooMaps);
			}
		}

		return this.each(function(){ 
			var gooMaps = new $.gooMaps(this, options);
			$.data(this, 'gooMaps', gooMaps);
		});
		
	};
	
	$.gooMaps = function(dom_map, options) {
		this.s = $.extend(true, {}, $.gooMaps.defaults, options);
		this.map;
		this.markerArray = [];
		this.markerGrabber = false;
		this.pos;
		this.iterator = 0;
		this.init(dom_map);
	};
	
	/*
		markers:[{ 
				lat : -12.043517, 
				lng : -77.028322, 
				draggable:true
			}],
	
	*/
	$.extend($.gooMaps, {
		
		defaults: {
			onMarkerMove: false,
			saveMarkerPosition: false,
			scroll:true,
			controls: {
				hide:false 	
			},
			markers:false,
			dropAnimation: true,
			onIterateMarker: false,
			lat : -12.043517,
			lng : -77.028322,
			zoom: 13,
			/* Save Target Position */ 
			markerSaveTargets: { 
				lat: '#lat',
				lng: '#lng',
				zoom: '#zoom'
			}
		},
		
		prototype: {
			
			moveTo : function(lat, lng){
				var point = new GLatLng(lat, lng);
				this.map.panTo(point);
				//Map.setCenter(point);
			},
			moveMapByString: function(address, options) {
				var this_ = this;
				var defaults = {
					marker: this.markerGrabber,
					textBlob: false,
					constant: '',
					callback: false,
					zoom: 14,
					suggestText: 'Aqui?',
					moveMarker: true
				},
				opts = $.extend(defaults, options );
				
				if( this.map ) {
					var geocoder = new GClientGeocoder();
						geocoder.getLatLng(address + opts.constant, function (coords) {
						if( coords ){
							var point = new GLatLng(coords.lat(), coords.lng());
							if( point ){  
								this_.map.setCenter(point, opts.zoom);
							}
							if( opts.marker ){
								if( opts.moveMarker ){
									opts.marker.setPoint(point) && opts.marker.openInfoWindowHtml(address || opts.suggestText);	
								}
							}
							if( opts.callback ){
								opts.callback(coords);
							}
						} 
					});
				}
			},
			saveMarkerPosition : function(){
				var grabber = this.getMarkerGrabber();
				if( this.s.markerSaveTargets && grabber){
					$(this.s.markerSaveTargets.lat).val(grabber.getLatLng().lat().toFixed(6));
					$(this.s.markerSaveTargets.lng).val(grabber.getLatLng().lng().toFixed(6));
					this.saveMapZoom();
				}
			},
			
			saveMapZoom: function(){
				if( this.s.saveMarkerPosition )
					$(this.s.markerSaveTargets.zoom).val( this.map.getZoom() );			
			},
			
			moveMarker : function(marker, latLng){
				if ( marker ) { 
					marker.setPosition(latLng);	
					this.saveMarkerPosition(latLng)
				}
			},
			
			deleteOverlays: function() {
				if( this.markerArray ) {
					for ( i in this.markerArray ) {
				  		if(this.markerArray[i]){
							this.markerArray[i].setMap(null);
						}
					}
					this.markerArray = [];
			  	}
			},
			
			getMarkerGrabber: function(){
				
				if( this.grabber ){ 
					return (this.grabber);
				} else {
					if( this.markerArray ) {
						for ( i in this.markerArray ) {
							if( this.markerArray[i].grabber) {
								return ( this.grabber = this.markerArray[i]);	
							}
						}
					}	
					return ( false );						
				}
				
			},
			
			setMarkerGrabber: function(grabber) {
				return ( this.grabber = grabber );
			},
			
			addMarkers: function( markers, callback ){
				var this_ = this;
				if ( markers && markers.length ){
					for (i in markers){
						this.addMarker( markers[i]);
					};
					
					if ( callback ) {
						callback.apply(this);
					};
				}
			},
			addMarker: function(marker) {
				
				var this_ = this;
					
				if ( marker.lat && marker.lng ) {
					
					var defaults = {
						animation : google.maps.Animation.DROP,
						position  : new google.maps.LatLng( marker.lat, marker.lng ),  
						draggable : marker.draggable,
						title     : marker.title 
					};
					
					var newMarker = new google.maps.Marker(defaults);
					
				}else{
					return ;	
				}
				
				//newMarker.setMap( this.map );
				
				// Marker Grabber positions
				if( marker.grabber ){
					this.setMarkerGrabber( newMarker );
				}
				
				if( this.s.saveMarkerPosition ){
					// Bind Maker Events on Dragged
					google.maps.event.addListener(newMarker, 'dragend', function(event){
						this_.saveMarkerPosition();
						if( this_.onMarkerMove ){
							this_.onMarkerMove(event.latLng);
						}
					});
				}
				
				// iterator marker
				if( this.s.onIterateMarker ){
					this.s.onIterateMarker.apply(this, [ newMarker, marker ]);	
				}
				
				// save markers
				this.markerArray.push( newMarker );
				this.iterator+= 1;
				
			},
			
			showMarkers: function(animation){
				var iterator = 0, this_ = this;
				if ( this.markerArray ) {
					if ( animation ) {
						for (i in this.markerArray) {
							setTimeout(function(){
								this_.markerArray[iterator].setMap( this_.map );
								iterator += 1;
							}, i * animation );
						}
					}else{
						for (i in this.markerArray) {
							this.markerArray[i].setMap( this.map );
						}
					}
			  	}
			},
			
			setBounds: function(zoom){
				var bounds = this.getBounds();
				this.map.fitBounds( bounds );
				if ( zoom ) 
					this.map.setZoom( zoom );
			},
			
			getBounds: function(){
				var bounds = new google.maps.LatLngBounds();	
				try {
					for ( i = 0; i < this.markerArray.length; i++ ){
						if (this.markerArray[i]) { 
							bounds.extend(new google.maps.LatLng(this.markerArray[i].getPosition().lat(), this.markerArray[i].getPosition().lng()));
						}
					}
				}catch(e){
					return false;
				}
				return ( bounds );	
			},
			
			bindMapEvent: function(){
				var this_ = this;			
				google.maps.event.addListener(this.map, 'click', function(event){
					if( event.latLng ){
						this_.moveMarker(this_.getMarkerGrabber(), event.latLng);
						this_.saveMarkerPosition();
						if( this_.onMarkerMove ){
							this_.onMarkerMove(event.latLng);
						}
					}
				});
				
				google.maps.event.addListener(this.map, 'zoom_changed', function( event, zoom){
					this_.saveMapZoom( zoom );
				});
				
			},
			
			init : function(dom_map){
				var this_  = this;
				var centerlatlng = new google.maps.LatLng( this.s.lat , this.s.lng);
				this.map = new google.maps.Map(dom_map, { zoom: this.s.zoom, center: centerlatlng,  mapTypeId: google.maps.MapTypeId.ROADMAP  });
				
				
				// Controls
				this.map.setOptions({ disableDefaultUI : this.s.controls.hide });
				
				// Scroll
				this.map.setOptions({ disableDefaultUI : this.s.controls.scroll });
				
				// Events
				this.bindMapEvent();
				
				// Markers
				if ( this.s.markers ){ 
					this.deleteOverlays();
					for (var i = 0; i < this.s.markers.length; i++ ){
						setTimeout(function(){
							this_.addMarker( this_.s.markers[ this_.iterator ] );
						}, i * 500);
					}
				}
				
				this.iterator = 0;
			}
			
		}	  
	});

})(jQuery);