var bot = require('../bot');
// A case-insensitive regular expression that matches "/hello"
var commandRegex = /^\/latestcommit$/i;
bot.onText(commandRegex, function(msg, match) {