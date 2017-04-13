var bot = require('../bot');
// A case-insensitive regular expression that matches "/hello"
var commandRegex = /^\/latestcommit$/i;

var url = "https://api.github.com/repos/ejwa/gitinspector/commits";
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", url, false ); // false for synchronous request
xmlHttp.send( null );

var result = xmlHttp.responseText;

var name = result[0].commit.author.name