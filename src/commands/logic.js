var MESSAGE_TYPE_EMPTY = 0;
var MESSAGE_TYPE_TOP_THREE_CONTRIBUTORS = 1;
var MESSAGE_TYPE_TOP_CONTRIBUTOR_OF_RECENT_TIME = 2;
var MESSAGE_TYPE_LATEST_COMMIT_INFORMATION = 3;
var MESSAGE_TYPE_INVALID = 4;

var MESSAGE_EMPTY = "Message is empty, please try again.";
var MESSAGE_INVALID = "Message is invalid, please try again.";

var executeMessage = function(message, bot) {
  var messageParams = getMessageParams(message);
  var replyMessage = getReplyMessage(messageParams, "www.google.com");
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

  // Latest Commit information
  // latestcommit name https://github.com/tungnk1993/scrapy
  // latestcommit date https://github.com/tungnk1993/scrapy

  var messageText = message.text;
  var messagePartsArray = messageText.split(" ");

  var messageParams = {
    "messageType": -1,
    "repositoryLink": "",
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
      // Checks that link is not empty and contains github.com/
      if (messagePartsArray[1] && messagePartsArray[1].indexOf("github.com/") !== -1) {
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
      if (messagePartsArray[1] && (messagePartsArray[1].indexOf("today") !== -1 || messagePartsArray[1].indexOf("yesterday") !== -1 || messagePartsArray[1].indexOf("lastweek") !== -1)) {
        messageParams.timespan = messagePartsArray[1];
      } else {
        messageParams.messageType = 4;
        return messageParams;
      }
      // Checks that link is not empty and contains github.com/
      if (messagePartsArray[2] && messagePartsArray[2].indexOf("github.com/") !== -1) {
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
      // Checks that link is not empty and contains github.com/
      if (messagePartsArray[2] && messagePartsArray[2].indexOf("github.com/") !== -1) {
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

  return messageParams;
}

var getReplyMessage = function(messageParams) {
  switch (messageParams.messageType) {
    case MESSAGE_TYPE_EMPTY:
      return MESSAGE_EMPTY;
    case MESSAGE_TYPE_TOP_THREE_CONTRIBUTORS:
      return getTopThreeContributors(messageParams.repositoryLink);
    case MESSAGE_TYPE_TOP_CONTRIBUTOR_OF_RECENT_TIME:
      return getTopContributorOfRecentTime(messageParams.repositoryLink, messageParams.timespan);
    case MESSAGE_TYPE_LATEST_COMMIT_INFORMATION:
      return getLatestCommitInformation(messageParams.repositoryLink, messageParams.commitType);
    case MESSAGE_TYPE_INVALID:
      return MESSAGE_INVALID;
    default:
      return MESSAGE_INVALID;
  }
};

var getTopThreeContributors = function(repositoryLink) {
  return "Called to get top 3 contributors for " + repositoryLink;
};

var getTopContributorOfRecentTime = function(repositoryLink, timespan) {
  return "Called for top contributor for " + timespan + " for " + repositoryLink;
}

var getLatestCommitInformation = function(repositoryLink, commitType) {
  return "Called to get latest commit information for " + commitType + " for " + repositoryLink ;
}

module.exports.executeMessage = executeMessage;
module.exports.getMessageParams = getMessageParams;
module.exports.getReplyMessage = getReplyMessage;
module.exports.getTopThreeContributors = getTopThreeContributors;
module.exports.getTopContributorOfRecentTime = getTopContributorOfRecentTime;
module.exports.getLatestCommitInformation = getLatestCommitInformation;
