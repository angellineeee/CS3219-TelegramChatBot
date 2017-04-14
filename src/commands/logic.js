var MESSAGE_TYPE_EMPTY = 0;
var MESSAGE_TYPE_TOP_THREE_CONTRIBUTORS = 1;
var MESSAGE_TYPE_TOP_CONTRIBUTOR_OF_RECENT_TIME = 2;
var MESSAGE_TYPE_LATEST_COMMIT_INFORMATION = 3;
var MESSAGE_TYPE_INVALID = 4;

var MESSAGE_EMPTY = "Message is empty, please try again.";
var MESSAGE_INVALID = "Message is invalid, please try again.";

var executeMessage = function(message, bot) {
  var messageParams = {"messageType": 5, "repositoryLink": "www.google.com", "timespan": '1 week'};
  var replyMessage = getReplyMessage(messageParams, "www.google.com");
  var chatId = message.chat.id;
  bot.sendMessage(chatId, replyMessage)
};

var getReplyMessage = function(messageParams) {
  switch (messageParams.messageType) {
    case MESSAGE_TYPE_EMPTY:
      return MESSAGE_EMPTY;
    case MESSAGE_TYPE_TOP_THREE_CONTRIBUTORS:
      return getTopThreeContributors(messageParams.repositoryLink);
    case MESSAGE_TYPE_TOP_CONTRIBUTOR_OF_RECENT_TIME:
      return getTopContributorOfRecentTime(messageParams.repositoryLink, messageParams.timespan);
    case MESSAGE_TYPE_LATEST_COMMIT_INFORMATION:
      return getLatestCommitInformation(messageParams);
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
  return "Called for timespan " + timespan + " on " + repositoryLink;
}

var getLatestCommitInformation = function(messageParams) {
  return "Called to get latest commit information";
}

module.exports.executeMessage = executeMessage;
module.exports.getReplyMessage = getReplyMessage;
module.exports.getTopThreeContributors = getTopThreeContributors;
module.exports.getTopContributorOfRecentTime = getTopContributorOfRecentTime;
module.exports.getLatestCommitInformation = getLatestCommitInformation;
