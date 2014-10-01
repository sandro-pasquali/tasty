var redis 	= require('redis');
var config 	= require('../config.json');

var client	= redis.createClient();
var multi;

client.auth(config.redisPass, function() {

	multi = client.multi();

	//	Create some random hits between 12pm and 1pm
	//
	var secsInHour = 3600;
	var pm12 = 43200;
	var offset;
	
	while(secsInHour) {
	
		offset = pm12 + secsInHour;
		
		multi.setbit('12to1a', offset, Math.round(Math.random(1)));
		multi.setbit('12to1b', offset, Math.round(Math.random(1)));
		multi.setbit('12to1c', offset, Math.round(Math.random(1)));
		
		--secsInHour
	}
	
	multi.exec(function() {
		client.bitop(['OR','foobar','12to1a','12to1b','12to1c'], function(err) {
			client.bitcount('foobar', function(err, count) {
				console.log('Of 3600 possible, how many seconds had at least one hit on one of the three targets --> ' + count);
				process.exit(0);
			})
		})
	})
})




