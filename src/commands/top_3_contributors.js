var bot = require('../bot');
// A case-insensitive regular expression that matches "/hello"
var commandRegex = /^\/top3contributors$/i;
bot.onText(commandRegex, function(msg, match) {

var url = "https://api.github.com/repos/ejwa/gitinspector/contributors";

var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", url, false ); // false for synchronous request
xmlHttp.send( null );

var top3 = [];

for(var i = 0; i < xmlHttp.responseText.length; i++) {
	if(top3.length <= 3) {
		top3.push([contributorsArray[i].login,contributorsArray[i].contributions]);
	}
	else {

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