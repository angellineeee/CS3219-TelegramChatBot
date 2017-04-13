var bot = require('../bot');
// A case-insensitive regular expression that matches "/hello"
var commandRegex = /^\/topcontributorsrecent$/i;

var url = "https://api.github.com/repos/ejwa/gitinspector/stats/contributors";
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", url, false ); // false for synchronous request
xmlHttp.send( null );

var result = xmlHttp.responseText;
//var lastWeek = moment().subtract('days', 7).format('MM-DD-YYYY').unix();
var lastWeek = moment().day(-14).unix();
var contributorsArray = [];

for(var i = 0; i < result.length; i++) {
	for(var w = 0; w < result[i].weeks.length; w++) {
		if(contribution:result[i].weeks[w].w == lastWeek) {
			contributorsArray.push({name:result[i].author.login,contribution:result[i].weeks[w].c};
		}			
	}
}

//contributorsArray.sort(function(a,b) {return (a.contribution > b.contribution) ? 1 : ((b.contribution > a.contribution) ? -1 : 0);} );
contributorsArray.sort(function(a, b){return b.contribution-a.contribution});

var top = contributorsArray[0];