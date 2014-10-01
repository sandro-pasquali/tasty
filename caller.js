function like() {
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://69.41.161.46:8080/like', true);
	
	xhr.onload = function() {
		var response = xhr.responseText;

		if(!$("#panel-container").length) {
			$(document.body).prepend('\
				<div id="panel-container">\
					<div id="tasty-count"></div>\
				</div>');
		} 
		
		$("#tasty-count")
			.html('<div id="tasty-message">This page has been liked <b>' + xhr.responseText + '</b> times today!</div>');
			
		$("#panel-container")
			.slideDown(500)

		
	};
	
	xhr.onerror = function() {
		alert('network error');
		// do something on network errors
		//
	};
	
	xhr.send(document.location.href);
}
