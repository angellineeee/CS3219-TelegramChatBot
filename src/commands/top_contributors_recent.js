var bot = require('../bot');
// A case-insensitive regular expression that matches "/hello"
var commandRegex = /^\/topcontributorsrecent$/i;

var url = "https://api.github.com/repos/ejwa/gitinspector/stats/contributors";
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", url, false ); // false for synchronous request
xmlHttp.send( null );

var result = xmlHttp.responseText;
//var lastWeek = moment().subtract('days', 7).format('MM-DD-YYYY').unix();
//not really sure if the time is correct. should get 2 weeks ago sunday date if im not wrong
var lastWeek = moment().day(-14).unix();
var contributorsArray = [];

for(var i = 0; i < result.length; i++) {
	for(var j = 0; j < result[i].weeks.length; j++) {
		if(contribution:result[i].weeks[j].w == lastWeek) {
			//not sure if this is the correct way of accessing the login name
			contributorsArray.push({name:result[i].author.login,contribution:result[i].weeks[j].c};
		}			
	}
}

//contributorsArray.sort(function(a,b) {return (a.contribution > b.contribution) ? 1 : ((b.contribution > a.contribution) ? -1 : 0);} );
contributorsArray.sort(function(a, b){return b.contribution-a.contribution});

var top = contributorsArray[0];