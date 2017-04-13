var bot = require('../bot');
// A case-insensitive regular expression that matches "/hello"
var commandRegex = /^\/top3contributors$/i;
bot.onText(commandRegex, function(msg, match) {

var url = "https://api.github.com/repos/ejwa/gitinspector/contributors";

//function getHTTP (url) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", url, false ); // false for synchronous request
	xmlHttp.send( null );
//	return xmlHttp.responseText;
//}

var result = xmlHttp.responseText;

var contributorsArray = [];

for(var i = 0; i < result.length; i++) {
	contributorsArray.push({name:result[i].login,contribution:result[i].contributions});
}

//contributorsArray.sort(function(a,b) {return (a.contribution > b.contribution) ? 1 : ((b.contribution > a.contribution) ? -1 : 0);} );
contributorsArray.sort(function(a, b){return b.contribution-a.contribution});

var top3 = contributorsArray[0].name + "," + contributorsArray[1].name + "," + contributorsArray[2].name;	
	
var replyChatId = msg.chat.id;
if (msg.chat.type !== 'private') {
	// this is a group message, so let's ignore it
	return;
}

var messageOptions = { parse_mode: 'Markdown' };
bot.sendMessage(replyChatId, top3 ,messageOptions);
});