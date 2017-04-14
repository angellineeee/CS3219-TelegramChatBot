var bot = require('../bot');
var logic = require('./logic');

bot.on('message', function onMessage(msg) {
  logic.executeMessage(msg, bot);
});
