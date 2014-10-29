var http = require('http');
var port = Number(process.env.PORT || 3000);


exports.server = server = http.createServer(function(request,response){
	var url = require("url");
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;

    //var keywordsIndex = {};
    var keywords = [];
    var keywordsO = {};
    var words = {};

    var ignore = {'':'ignore','the':'ignore','a':'ignore','and':'ignore','on':'ignore','is':'ignore','of':'ignore','to':'ignore'};
    var ignoreWords = function(word){
    	ignore[word];
    };

    response.writeHead(200, {
            'Content-Type': 'text',
        });

    if (!query.array) {
    	//could use a little more array type checking
        //response.write();
        response.end("You call that an array?! Try again.");
    } else {

    	//First implementation: need to parse data and build dictionary frequency table, and return it
    	//after getting data in, strip it of special characters and simple words
    	//Split on spaces
    	//loop over split text, increment or add word to array if it doesn't exist
     	query.array.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g," ").split(/[\s*\.*\,\;\+?\#\|:\-\/\\\[\]\(\)\{\}\"\'$%&0-9*]/).map( function(k,v){words[k.toLowerCase()]++||(words[k.toLowerCase()]=1); });

     	//keywordsIndex = query.array;
     	//console.log(words);

     	for (word in words){
     		//if(!ignoreWord(word)){
     			(ignore[word] || words[word] <= 3 || keywords.push({ word : word , instances : words[word]}));
     			//(ignore[word] || words[word] <= 3 || (keywordsO[word] = words[word]));
     		//}
     	};
     	//Need to sort this list so that most frequent terms come first
     	keywords.sort(function (a, b) {
  			if (a.instances < b.instances) {
   			 return 1;
  			}
  			if (a.instances > b.instances) {
  			  return -1;
  			}
  			// a must be equal to b
 			return 0;
		});

    	//response.write(JSON.stringify(keywords));
    	keywordsO = {keywords : keywords};
    	response.write(JSON.stringify(keywordsO));
        //response.write(query.array);
        response.end();
    }


}).listen(port);