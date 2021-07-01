const express = require('express');
const router = express.Router();
const { search } = require("../models/search");
const app=express();
app.use(express.urlencoded({extended : false}));
const axios = require('axios');
var Youtube = require('youtube-node');
var youtube = new Youtube();
var video_arr=[];

async function get_views(flag, word, it, v_id){
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
    await axios.get(url).then((res)=>{
        dict = (res.data);
        var view_it=dict.items[0].statistics;
        get_subs(flag, word, view_it, it, it["snippet"]["channelId"])
    });
    
}

async function get_subs(flag, word, view_it, it, channel_id){
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
    await axios.get(url).then((res)=>{
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
        video_arr.push(tmp_dict);
        if (flag){
            console.log(video_arr);
            const new_model=new search({
                search_word: word,
                videos:video_arr,
            })
            new_model.save((err, doc) => {
                if(err) {
                    return res.json({ success: false, err });
                } else {
                    console.log("save성공");
                    return res.status(200).json({
                        models: new_model
                    });
                } 
            }
            )
            video_arr=[];
        }
    });
    
}


async function get_search(str){
    youtube.setKey('AIzaSyDpKrC6z9dYW69Dz9xeAR8MNqhZLar8wbM'); // API 키 입력

    //// 검색 옵션 시작
    youtube.addParam('order', 'relevance'); // 관련성 순으로 정렬
    youtube.addParam('type', 'video');   // 타입 지정
    //// 검색 옵션 끝

    var word = str; // 검색어 지정
    var limit = 20;  // 출력 갯수

    await youtube.search(word, limit, function (err, result) { // 검색 실행
        if (err) { console.log(err); return; } // 에러일 경우 에러공지하고 빠져나감
        var flag=0
        
        var items = result["items"]; // 결과 중 items 항목만 가져옴
        for (var i in items) { 
            if (i==items.length - 1) flag=1;
            var it = items[i];
            var video_id = it["id"]["videoId"];
            get_views(flag, word, it, video_id);
        }
    });
}

router.post('/find', (req, res) => {
    search.findOne({ search_word: req.body.word })
        .exec((err, videos) => {
            if (err) return res.status(400).send(err)
            if(!videos) {
                get_search(req.body.word);
                search.findOne({ search_word: req.body.word })
                    .exec((err, data) => {
                        if(err) return res.status(400).send(err)
                        return res.status(200).json({ data })
        })

            }
            else{
            return res.status(200).json({ videos })
            }
        })
});

module.exports = router;