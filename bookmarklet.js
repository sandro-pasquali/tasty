(function(data){

	window.Bookmarklet = {};

	var start = function() {

		var cur;
		var fin = data.js.length;
		var cnt = 0;

		$.each(data.css, function(i, val){
			$('<link>').attr({
				href: val,
				rel: 'stylesheet'
			}).appendTo('head');
		});

		while(cur = data.js.shift()) {
			$.getScript(cur, function() {
				if(++cnt === fin) {
					data.ready();
				}
			})
		}
	};

	if(!window.jQuery) {

		var jq = document.createElement('script');

		jq.type 	= "text/javascript";
		jq.src 		= "https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";
		jq.onload 	= start;

		return document.body.appendChild(jq);

	}

	start();

})({

	css : ['http://69.41.161.46:8080/css'],
	js  : ['http://69.41.161.46:8080/set'],
	ready : function(){
		
		like();
	}
});

/*

60889
60890
60890
60890
60897
60909

*/