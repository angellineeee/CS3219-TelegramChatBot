var bot = require('../bot');
// A case-insensitive regular expression that matches "/hello"
var commandRegex = /^\/latestcommit$/i;

var url = "https://api.github.com/repos/ejwa/gitinspector/commits";
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", url, false ); // false for synchronous request
xmlHttp.send( null );

var result = xmlHttp.responseText;

//not really sure how to access the data inside since it is not an array
var name = result[0].commit.author.name;

//still looking at how to format this
var commitDate = result[0].commit.author.date;

var githubId = result[0].committer.login;

var message = result[0].message;

//not sure how you want to display this
var print = "last commit is on the " + commitDate + " by " + name + "." + "Github user ID is " + githubId + "." + "Commit description " + message + ".";