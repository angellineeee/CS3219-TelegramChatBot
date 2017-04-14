var bot = require('../bot');
var logic = require('./logic');

bot.on('message', function onMessage(message) {
  logic.executeMessage(message, bot);
});
