var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res){

	var pu = url.parse(req.url, true);

	var p = pu.pathname;
	var tp = p.replace(/^\/+|\/+$/g, '');

	console.log("request recieved");

	req.on('data', function(data){

	});

	req.on('end', function(){

		console.log("handler is", handler );

		var handler = typeof(router[tp]) !== 'undefined' ? router[tp] : handler.NotFound; 



		handler(function(statuscode, payload){

			statuscode = typeof(statuscode) == 'number' ? statuscode : 200;

			payload = typeof(payload) == 'object' ? payload: {};

			var payloadString = JSON.stringify(payload);

			res.writeHead(statuscode);
			res.end(payloadString);

			console.log("Returning the response: ", statuscode, payloadString);
		});
		
	});
	
});

server.listen(3000, function(){console.log("The server is listening on port 3000")});

var  handlers= {

};

handlers.Hello = function(callback){
	callback(200, { 'Message': 'I love this course'});
}

handlers.NotFound = function(callback){
	callback(404);
}

var router = {
	'Hello': handlers.Hello
}
