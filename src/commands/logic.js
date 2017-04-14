var executeMessage = function(msg, bot) {
  // var msgParams = parser.parsecMessage (receivedMsg);  //an array or object that stores arguments of the message, e.g messageType, repoLink, timespan, etc
  var msgParams = {"msgType": 0, "repoLink": "www.google.com"};
  var replyMessage = getReplyMessage(msgParams, "www.google.com");
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, replyMessage)
};

var getReplyMessage = function(msgParams, repoLink) {
  var MSG_INVALID = 0;
  var MSG_TYPE_TOP_3 = 1;
  var MSG_TYPE_TOP_CONTRIBUTOR = 2;
  switch (msgParams.msgType) {
    case MSG_INVALID:
      return "Message is invalid"; //this should not be a magic string!
    case MSG_TYPE_TOP_3:
      return getTopContributors(repoLink, 3);
    case MSG_TYPE_TOP_CONTRIBUTOR:
      return getTopContributorOfRecentTime(repoLink, timespan);
  }
};

var getTopContributors = function(repoLink, numberOfContributors) {
  return "Called to get top " + numberOfContributors + " contributors for " + repoLink;
};

var getTopContributorOfRecentTime = function(repoLink, timespan) {
  return "Called for timespan " + timespan + " on " + repoLink;
}

module.exports.executeMessage = executeMessage;
module.exports.getReplyMessage = getReplyMessage;
module.exports.getTopContributors = getTopContributors;
module.exports.getTopContributorOfRecentTime = getTopContributorOfRecentTime;
