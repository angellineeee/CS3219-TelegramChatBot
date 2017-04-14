var bot = require('../bot');
var logic = require('./logic');

// Available Commands,

// Top 3 Contributors of Repo -
// top3contributors https://github.com/tungnk1993/scrapy

// Top Contributor of Recent Time of Repo -
// topcontributor today https://github.com/tungnk1993/scrapy
// topcontributor yesterday https://github.com/tungnk1993/scrapy
// topcontributor lastweek https://github.com/tungnk1993/scrapy

// Latest Commit information
// latestcommit name https://github.com/tungnk1993/scrapy
// latestcommit date https://github.com/tungnk1993/scrapy


bot.on('message', function onMessage(message) {
  logic.executeMessage(message, bot);
});
