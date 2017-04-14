var bot = require('../bot');
var logic = require('./logic');

// Available Commands,

// Top 3 Contributors of Repo -
// top3contributors https://github.com/tungnk1993/scrapy

// Top Contributor of Recent Time of Repo -
// topcontributor today https://github.com/rebekahlow-jy/nus-nextbus-prototype
// topcontributor yesterday https://github.com/rebekahlow-jy/nus-nextbus-prototype
// topcontributor lastweek https://github.com/rebekahlow-jy/nus-nextbus-prototype
// topcontributor lastmonth https://github.com/rebekahlow-jy/nus-nextbus-prototype

// Latest Commit information
// latestcommit name https://github.com/tungnk1993/scrapy
// latestcommit date https://github.com/tungnk1993/scrapy
// latestcommit message https://github.com/tungnk1993/scrapy
// latestcommit all https://github.com/tungnk1993/scrapy


bot.on('message', function onMessage(message) {
  logic.executeMessage(message, bot);
});
