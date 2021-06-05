const express=require('express');
const bodyParser = require('body-parser');
const app=express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended : false}));

var Youtube = require('youtube-node');
var youtube = new Youtube();


var word = '제육볶음'; // 검색어 지정
var limit = 10;  // 출력 갯수

function get_views(v_id){
    var request=require('request');

    var optionParams={
        id:v_id,
        part:"statistics",
        key:"AIzaSyDpKrC6z9dYW69Dz9xeAR8MNqhZLar8wbM",
    };
    
    var url="https://www.googleapis.com/youtube/v3/videos?";
    for(var option in optionParams){
        url+=option+"="+optionParams[option]+"&";
    }

    //url의마지막에 붙어있는 & 정리
    url=url.substr(0, url.length-1);
    var dict={};
    request(url, function(err, res, body){
        dict = JSON.parse(body);
        console.log(dict.items);
    });
}

youtube.setKey('AIzaSyDpKrC6z9dYW69Dz9xeAR8MNqhZLar8wbM'); // API 키 입력

//// 검색 옵션 시작
youtube.addParam('order', 'relevance'); // 관련성 순으로 정렬
youtube.addParam('type', 'video');   // 타입 지정
//// 검색 옵션 끝

youtube.search(word, limit, function (err, result) { // 검색 실행
    if (err) { console.log(err); return; } // 에러일 경우 에러공지하고 빠져나감

    //console.log(JSON.stringify(result, null, 2)); // 받아온 전체 리스트 출력

    var items = result["items"]; // 결과 중 items 항목만 가져옴
    for (var i in items) { 
        var it = items[i];
        var title = it["snippet"]["title"];
        var channelId = it["snippet"]["channelId"];
        var thumbnails = it["snippet"]["thumbnails"]["high"]["url"];
        var channel_title = it["snippet"]["channelTitle"];
        var video_id = it["id"]["videoId"];
        console.log("제목 : " + title);
        console.log("Video_id : " + video_id);
        console.log("channel_id : " + channelId);
        console.log("썸네일 주소 : " + thumbnails);
        console.log("채널명 : " + channel_title);
        console.log("-----------");
        console.log(get_views(video_id));
    }
});