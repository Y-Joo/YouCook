const axios = require('axios');
const express=require('express');
const bodyParser = require('body-parser');
const app=express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended : false}));

var Youtube = require('youtube-node');
var youtube = new Youtube();

function get_views(word, it, v_id){
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
    axios.get(url).then((res)=>{
        dict = (res.data);
        var view_it=dict.items[0].statistics;
        get_subs(word, view_it, it, it["snippet"]["channelId"])
    });
    
}

function get_subs(word, view_it, it, channel_id){
    var request=require('request');

    var optionParams={
        id:channel_id,
        part:"statistics",
        key:"AIzaSyDpKrC6z9dYW69Dz9xeAR8MNqhZLar8wbM",
    };
    
    var url="https://www.googleapis.com/youtube/v3/channels?";
    for(var option in optionParams){
        url+=option+"="+optionParams[option]+"&";
    }

    //url의마지막에 붙어있는 & 정리
    url=url.substr(0, url.length-1);
    axios.get(url).then((res)=>{
        dict = (res.data);
        var title = it["snippet"]["title"];
        var channelId = it["snippet"]["channelId"];
        var thumbnails = it["snippet"]["thumbnails"]["high"]["url"];
        var channel_title = it["snippet"]["channelTitle"];
        var video_id = it["id"]["videoId"];
        var subscriberCount=dict.items[0].statistics.subscriberCount;
        var viewCount=view_it.viewCount;
        var likeCount=view_it.likeCount;
        var dislikeCount=view_it.dislikeCount;
        var commentCount=view_it.commentCount;
        var tmp_dict={title, video_id, channelId, thumbnails, channel_title, subscriberCount, viewCount, likeCount, dislikeCount, commentCount};
        console.log(tmp_dict);
        // console.log("검색어 : " + word);
        // console.log("제목 : " + title);
        // console.log("Video_id : " + video_id);
        // console.log("channel_id : " + channelId);
        // console.log("썸네일 주소 : " + thumbnails);
        // console.log("채널명 : " + channel_title);
        // console.log("구독자 수 : " + dict.items[0].statistics.subscriberCount);
        // console.log("조회 수 : " + view_it.viewCount);
        // console.log("좋아요 수 : " + view_it.likeCount);
        // console.log("싫어요 수 : " + view_it.dislikeCount);
        // console.log("댓글 수 : " + view_it.commentCount);
        // console.log("-----------");
    });
    
}


function get_search(str){
    youtube.setKey('AIzaSyDpKrC6z9dYW69Dz9xeAR8MNqhZLar8wbM'); // API 키 입력

    //// 검색 옵션 시작
    youtube.addParam('order', 'relevance'); // 관련성 순으로 정렬
    youtube.addParam('type', 'video');   // 타입 지정
    //// 검색 옵션 끝

    var word = str; // 검색어 지정
    var limit = 20;  // 출력 갯수

    youtube.search(word, limit, function (err, result) { // 검색 실행
        if (err) { console.log(err); return; } // 에러일 경우 에러공지하고 빠져나감

        
        var items = result["items"]; // 결과 중 items 항목만 가져옴
        for (var i in items) { 
            var it = items[i];
            var video_id = it["id"]["videoId"];
            get_views(word, it, video_id);
        }
    });
}
get_search('제육볶음');