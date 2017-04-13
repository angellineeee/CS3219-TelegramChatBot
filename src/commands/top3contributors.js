var bot = require('../bot');
// A case-insensitive regular expression that matches "/hello"
var commandRegex = /^\/top3contributors$/i;
bot.onText(commandRegex, function(msg, match) {

var url = "https://api.github.com/repos/ejwa/gitinspector/stats/contributors";

function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
	
function processData() {
	var contributorsArray = JSON.parse(xmlHttp.responseText.toString());

	for(var i = 0; i < contributorsArray.length; i++) {
		
	}
}	
	
var replyChatId = msg.chat.id;
if (msg.chat.type !== 'private') {
	// this is a group message, so let's ignore it
	return;
}

var messageOptions = { parse_mode: 'Markdown' };
bot.sendMessage(replyChatId, "Oh hello *there*!",messageOptions);
});