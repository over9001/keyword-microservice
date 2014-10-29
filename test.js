//Takes an http request of an array of strings, returns an array of keyword strings
var assert = require('assert'),
	http = require('http'),
	app = require('./server.js');

var options = {
  host: 'radiant-depths-3841.herokuapp.com/',
  path: '/?word=lol'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
    assert.equal('{["Hello World"]}',str);
  });
}

http.request(options, callback).end();