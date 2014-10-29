var http = require('http');
var port = Number(process.env.PORT || 3000);


exports.server = server = http.createServer(function(request,response){
	var url = require("url");
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;

    var keywords = [];
    var keywordsO = {};
    var words = {};

    
    var ignore = {};
    var ignore2 = ['', 'is', 'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'];
    ignore2.forEach(function(w){ignore[w]='ignore';});

    response.writeHead(200, {
            'Content-Type': 'text',
        });

    if (!query.array) {
    	//could use a little more type checking
        response.end("You call that an array?! Try again.");
    } else {

    	//First implementation: need to parse data and build dictionary frequency table, and return it
    	//after getting data in, strip it of special characters and simple words
    	//Split on spaces
    	//loop over split text, increment or add word to array if it doesn't exist
     	query.array.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g," ").split(/[\s*\.*\,\;\+?\#\|:\-\/\\\[\]\(\)\{\}\"\'$%&0-9*]/).map( function(k,v){words[k.toLowerCase()]++||(words[k.toLowerCase()]=1); });

     	//response.write(words);

     	for (word in words){
     		//if(!ignoreWord(word)){ 
     			ignore[word] || words[word] <= 3 || function(keyword, instances){var tmpObj = {}; tmpObj[keyword] = instances; keywords.push(tmpObj);}(word,words[word]);
     			//(ignore[word] || words[word] <= 3 || (keywordsO[word] = words[word]));
     		//}
     	};
     	//Need to sort this list so that most frequent terms come first
     	keywords.sort(function (a, b) {
  			if (a[Object.keys(a)] < b[Object.keys(b)]) {
   			 return 1;
  			}
  			if (a[Object.keys(a)] > b[Object.keys(b)]) {
  			  return -1;
  			}
  			// a must be equal to b
 			return 0;
		});

    	//response.write(JSON.stringify(keywords));
    	keywords = {keywords : keywords};
    	response.write(JSON.stringify(keywords));
        //response.write(query.array);
        response.end();
    }


}).listen(port);