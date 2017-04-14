var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var moment = require('moment');

var MESSAGE_TYPE_EMPTY = 0;
var MESSAGE_TYPE_TOP_THREE_CONTRIBUTORS = 1;
var MESSAGE_TYPE_TOP_CONTRIBUTOR_OF_RECENT_TIME = 2;
var MESSAGE_TYPE_LATEST_COMMIT_INFORMATION = 3;
var MESSAGE_TYPE_INVALID = 4;

var MESSAGE_EMPTY = "Message is empty, please try again.";
var MESSAGE_INVALID = "Message is invalid, please try again.";

var executeMessage = function(message, bot) {
  var messageParams = getMessageParams(message);
  var replyMessage = getReplyMessage(messageParams);
  var chatId = message.chat.id;
  bot.sendMessage(chatId, replyMessage)
};

// Parser
var getMessageParams = function(message) {

  // Available Commands,
  // Top 3 Contributors of Repo -
  // top3contributors https://github.com/tungnk1993/scrapy

  // Top Contributor of Recent Time of Repo -
  // topcontributor today https://github.com/tungnk1993/scrapy
  // topcontributor yesterday https://github.com/tungnk1993/scrapy
  // topcontributor lastweek https://github.com/tungnk1993/scrapy
  // topcontributor lastmonth https://github.com/tungnk1993/scrapy

  // Latest Commit information
  // latestcommit name https://github.com/tungnk1993/scrapy
  // latestcommit date https://github.com/tungnk1993/scrapy

  var messageText = message.text;
  var messagePartsArray = messageText.split(" ");

  var messageParams = {
    "messageType": -1,
    "repositoryLink": "",
    "repositoryUser": "",
    "repositoryName": "",
    "timespan": "",
    "commitType": "",
  };

  switch (messagePartsArray[0]) {
    // Empty String
    case "":
      messageParams.messageType = 0;
      break;

    // Top 3 Contributors of Repo
    case "top3contributors":
      messageParams.messageType = 1;
      // Checks that link is not empty and contains https://github.com/
      if (messagePartsArray[1] && messagePartsArray[1].indexOf("https://github.com/") !== -1) {
        messageParams.repositoryLink = messagePartsArray[1];
      } else {
        messageParams.messageType = 4;
        return messageParams;
      }
      break;

    // Top Contributor of Recent Time of Repo
    case "topcontributor":
      messageParams.messageType = 2;
      // Checks that timespan is not empty and contains either today, yesterday or lastweek
      if (messagePartsArray[1] && (messagePartsArray[1].indexOf("today") !== -1 || messagePartsArray[1].indexOf("yesterday") !== -1 || messagePartsArray[1].indexOf("lastweek") !== -1 || messagePartsArray[1].indexOf("lastmonth") !== -1)) {
        messageParams.timespan = messagePartsArray[1];
      } else {
        messageParams.messageType = 4;
        return messageParams;
      }
      // Checks that link is not empty and contains https://github.com/
      if (messagePartsArray[2] && messagePartsArray[2].indexOf("https://github.com/") !== -1) {
        messageParams.repositoryLink = messagePartsArray[2];
      } else {
        messageParams.messageType = 4;
        return messageParams;
      }
      break;

    // Latest Commit information
    case "latestcommit":
      messageParams.messageType = 3;
      // Checks that commitType is not empty and contains either name or date
      if (messagePartsArray[1] && (messagePartsArray[1].indexOf("name") !== -1 || messagePartsArray[1].indexOf("date") !== -1)) {
        messageParams.commitType = messagePartsArray[1];
      } else {
        messageParams.messageType = 4;
        return messageParams;
      }
      // Checks that link is not empty and contains https://github.com/
      if (messagePartsArray[2] && messagePartsArray[2].indexOf("https://github.com/") !== -1) {
        messageParams.repositoryLink = messagePartsArray[2];
      } else {
        messageParams.messageType = 4;
        return messageParams;
      }
      break;

    // Invalid Commands
    default:
      messageParams.messageType = 4;
      return messageParams;
  }

  var repositoryArray = (messageParams.repositoryLink).split("https://github.com/");
  if (repositoryArray[1]) {
    var repositoryPartsArray = repositoryArray[1].split("/");
    if (repositoryPartsArray[0] && repositoryPartsArray[1]) {
      messageParams.repositoryUser = repositoryPartsArray[0];
      messageParams.repositoryName = repositoryPartsArray[1];
    } else {
      messageParams.messageType = 4;
      return messageParams;
    }
  } else {
    messageParams.messageType = 4;
    return messageParams;
  }

  return messageParams;
}

var getReplyMessage = function(messageParams) {
  switch (messageParams.messageType) {
    case MESSAGE_TYPE_EMPTY:
      return MESSAGE_EMPTY;
    case MESSAGE_TYPE_TOP_THREE_CONTRIBUTORS:
      return getTopThreeContributors(messageParams.repositoryUser, messageParams.repositoryName, messageParams.repositoryLink);
    case MESSAGE_TYPE_TOP_CONTRIBUTOR_OF_RECENT_TIME:
      return getTopContributorOfRecentTime(messageParams.repositoryUser, messageParams.repositoryName, messageParams.timespan, messageParams.repositoryLink);
    case MESSAGE_TYPE_LATEST_COMMIT_INFORMATION:
      return getLatestCommitInformation(messageParams.repositoryUser, messageParams.repositoryName, messageParams.commitType);
    case MESSAGE_TYPE_INVALID:
      return MESSAGE_INVALID;
    default:
      return MESSAGE_INVALID;
  }
};

var getTopThreeContributors = function(repositoryUser, repositoryName, repositoryLink) {
  var apiUrl = "https://api.github.com/repos/" + repositoryUser + "/" + repositoryName + "/contributors";
  var xhr = new XMLHttpRequest();
  xhr.open( "GET", apiUrl, false ); // false for synchronous request
  xhr.send(null);
  var result = JSON.parse(xhr.responseText);

  var contributorsArray = [];

  for (var i = 0; i < result.length; i++) {
  	contributorsArray.push({
      "name": result[i].login,
      "contribution": result[i].contributions
    });
  }

  contributorsArray.sort(function(a, b) {
    return b.contribution - a.contribution;
  });

  var topThreeContributors = "Top 3 Contributors for " + repositoryLink + " - \n" +
                             "1. " + contributorsArray[0].name + " (" +  contributorsArray[0].contribution + " commits), \n" +
                             "2. " +contributorsArray[1].name + " (" +  contributorsArray[1].contribution + " commits), \n"  +
                             "3. " +contributorsArray[2].name + " (" +  contributorsArray[2].contribution + " commits) \n";

  return topThreeContributors;
};

var getTopContributorOfRecentTime = function(repositoryUser, repositoryName, timespan, repositoryLink) {
  var apiUrl = "https://api.github.com/repos/" + repositoryUser + "/" + repositoryName + "/stats/contributors";
  var xhr = new XMLHttpRequest();
  xhr.open( "GET", apiUrl, false ); // false for synchronous request
  xhr.send(null);
  var result = JSON.parse(xhr.responseText);

  var now = moment().unix();
  var today = moment().startOf('day').unix();
  var yesterday = moment().subtract(1, 'days').startOf('day').unix();
  var lastWeek = moment().subtract(7, 'days').startOf('day').unix();
  var lastMonth = moment().subtract(1, 'months').startOf('day').unix();

  var contributorsArray = [];

  for (var i = 0; i < result.length; i++) {
    for (var j = 0; j < result[i].weeks.length; j++) {
      // Within Today
      if (timespan == "today"){
        if (result[i].weeks[j].w >= today && result[i].weeks[j].w <= now) {
          contributorsArray.push({
            "name": result[i].author.login,
            "contribution": result[i].weeks[j].c
          });
        }
      }
      // Within Yesterday
      if (timespan == "yesterday"){
        if (result[i].weeks[j].w >= yesterday && result[i].weeks[j].w <= now) {
          contributorsArray.push({
            "name": result[i].author.login,
            "contribution": result[i].weeks[j].c
          });
        }
      }
      // Within Last Week
      if (timespan == "lastweek"){
        if (result[i].weeks[j].w >= lastWeek && result[i].weeks[j].w <= now) {
          contributorsArray.push({
            "name": result[i].author.login,
            "contribution": result[i].weeks[j].c
          });
        }
      }
      // Within Last Month
      if (timespan == "lastmonth"){
        if (result[i].weeks[j].w >= lastMonth && result[i].weeks[j].w <= now) {
          contributorsArray.push({
            "name": result[i].author.login,
            "contribution": result[i].weeks[j].c
          });
        }
      }
  	}
  }

  contributorsArray.sort(function(a, b) {
    return b.contribution - a.contribution;
  });

  if (contributorsArray.length == 0 || contributorsArray[0].contribution == 0) {
    if (timespan == "lastweek") {
      var topContributor = "No contributors within " + "last week. Please try again.";
    } else if (timespan == "lastmonth") {
      var topContributor = "No contributors within " + "last month. Please try again.";
    } else {
      var topContributor = "No contributors within " + timespan + ". Please try again.";
    }
  } else {
    if (timespan == "lastweek") {
      var topContributor = "Top Contributor for " + repositoryLink + " last week - \n" +
                           "1. " + contributorsArray[0].name + " (" +  contributorsArray[0].contribution + " commits) \n";
    } else if (timespan == "lastmonth") {
      var topContributor = "Top Contributor for " + repositoryLink + " last month - \n" +
                           "1. " + contributorsArray[0].name + " (" +  contributorsArray[0].contribution + " commits) \n";
    } else {
      var topContributor = "Top Contributor for " + repositoryLink + " "  + timespan + " - \n" +
                           "1. " + contributorsArray[0].name + " (" +  contributorsArray[0].contribution + " commits) \n";
    }
  }

  return topContributor;
}

var getLatestCommitInformation = function(repositoryUser, repositoryName, commitType) {
  return "Called to get latest commit information for " + commitType + " for " + repositoryUser + " "+ repositoryName;
}

module.exports.executeMessage = executeMessage;
module.exports.getMessageParams = getMessageParams;
module.exports.getReplyMessage = getReplyMessage;
module.exports.getTopThreeContributors = getTopThreeContributors;
module.exports.getTopContributorOfRecentTime = getTopContributorOfRecentTime;
module.exports.getLatestCommitInformation = getLatestCommitInformation;
