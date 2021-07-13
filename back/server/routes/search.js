const express = require('express');
const router = express.Router();
const {
    videos,
    ingredients,
    keyWord
} = require("../models/search");
const app = express();
app.use(express.urlencoded({
    extended: false
}));
const axios = require('axios');
var Youtube = require('youtube-node');
var youtube = new Youtube();
var videoIdArr = [];
var videoArr = [];
var numberList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
var funcCount = -1;
var flag = 0;


function getViews(videoCount, word, it, v_id, originRes) {
    var request = require('request');

    var optionParams = {
        id: v_id,
        part: "snippet, statistics",
        key: "AIzaSyDpKrC6z9dYW69Dz9xeAR8MNqhZLar8wbM",
    };

    var url = "https://www.googleapis.com/youtube/v3/videos?";
    for (var option in optionParams) {
        url += option + "=" + optionParams[option] + "&";
    }

    //url의마지막에 붙어있는 & 정리
    url = url.substr(0, url.length - 1);
    var dict = {};
    axios.get(url).then((res) => {
        dict = (res.data);
        var str_list = dict.items[0].snippet.description.split('\n');
        var desStr = []
        for (var i in str_list) {
            str = str_list[i]
            if (str[0] in numberList && str[1] == '.' ||
                str[0] in numberList && str[1] in numberList && str[2] == '.') {
                if (str[str.length - 2] in alphabet || str[2] in alphabet || str[3] in alphabet || str[4] in alphabet) continue;
                desStr.push(str);
            }
        }
        var viewIt = dict.items[0].statistics;
        getSubs(videoCount, word, viewIt, it, it["snippet"]["channelId"], originRes, desStr)
    });

}

function getSubs(videoCount, word, viewIt, it, channelId, originRes, _description) {
    var request = require('request');

    var optionParams = {
        id: channelId,
        part: "statistics",
        key: "AIzaSyDpKrC6z9dYW69Dz9xeAR8MNqhZLar8wbM",
    };

    var url = "https://www.googleapis.com/youtube/v3/channels?";
    for (var option in optionParams) {
        url += option + "=" + optionParams[option] + "&";
    }
    
    //url의마지막에 붙어있는 & 정리
    url = url.substr(0, url.length - 1);
    axios.get(url).then((res) => {
        dict = (res.data);
        var _title = it["snippet"]["title"];
        var _channelId = it["snippet"]["channelId"];
        var _thumbnails = it["snippet"]["thumbnails"]["high"]["url"];
        var _channelTitle = it["snippet"]["channelTitle"];
        var _videoId = it["id"]["videoId"];
        var _subscriberCount = dict.items[0].statistics.subscriberCount;
        var _viewCount = viewIt.viewCount;
        var _likeCount = viewIt.likeCount;
        var _dislikeCount = viewIt.dislikeCount;
        var _commentCount = viewIt.commentCount;
        funcCount += 1;
        if (funcCount == videoCount){
            flag = 1
        }
        if (_description.length != 0){
            const newModel = new videos({
                videoId : _videoId,
                channelId : _channelId, 
                thumbnails : _thumbnails, 
                title : _title, 
                channelTitle : _channelTitle, 
                subscriberCount : _subscriberCount,
                viewCount : _viewCount,
                likeCount : _likeCount,
                dislikeCount : _dislikeCount,
                commentCount : _commentCount,
                description : _description
            })
            newModel.save((err, doc) => {
                if (err) {
                    // return res.json({ success: false, err });
                } else {
                    videoArr.push(newModel);
                    videoIdArr.push(newModel._id);
                    if (flag){
                        return originRes.status(200).json({
                            videoArr
                        })
                    }
                    keyWord.updateOne({keyWord:word}, {videoIds:videoIdArr}, {upsert:true})
                    .then((result) => {
                        //console.log(result);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                }
            })
        }
    });

}


function getSearch(str, originRes) {
    youtube.setKey('AIzaSyDpKrC6z9dYW69Dz9xeAR8MNqhZLar8wbM'); // API 키 입력

    //// 검색 옵션 시작
    youtube.addParam('order', 'relevance'); // 관련성 순으로 정렬
    youtube.addParam('type', 'video'); // 타입 지정
    //// 검색 옵션 끝

    var word = str; // 검색어 지정
    var limit = 20; // 출력 갯수

    youtube.search(word, limit, function(err, result) { // 검색 실행
        if (err) {
            console.log(err);
            return;
        } // 에러일 경우 에러공지하고 빠져나감

        var items = result["items"]; // 결과 중 items 항목만 가져옴
        for (var i in items) { 
            var it = items[i];
            var videoId = it["id"]["videoId"];
            getViews(items.length - 1, word, it, videoId, originRes);
        }
    });
}

router.post('/find', (req, res) => {
    videoArr = [];
    keyWord.findOne({
            keyWord: req.body.word + ' 레시피'
        })
        .exec((err, data) => {
            if (err) return res.status(400).send(err)
            if (!data) {
                getSearch(req.body.word + ' 레시피', res);
            } else {
                var videoList = [];
                for (const i in data.videoIds){
                    var id = data.videoIds[i];
                    videos.findById(id)
                    .exec((err, video) => {
                        videoList.push(video);
                        if (i == data.videoIds.length - 1){
                            return res.status(200).json({
                                videoList
                            })
                        }
                    })
                }
            }
        })
});

module.exports = router;