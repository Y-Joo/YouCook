var request=require('request');
const express=require('express');
const bodyParser = require('body-parser');
const app=express();

app.use(bodyParser.json());

var optionParams={
	id:"3AGVlD8US0w",
	part:"statistics",
	key:"AIzaSyDpKrC6z9dYW69Dz9xeAR8MNqhZLar8wbM",
 };
//그냥 간단하게 확인하기 쉽게하려고 maxResults 2로 했음
var url="https://www.googleapis.com/youtube/v3/videos?";
for(var option in optionParams){
	url+=option+"="+optionParams[option]+"&";
}

//url의마지막에 붙어있는 & 정리
url=url.substr(0, url.length-1);

request(url, function(err, res, body){
	console.log(JSON.parse(body).items);
});