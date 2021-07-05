const express = require('express');
const router = express.Router();
const {
    search
} = require("../models/search");
const app = express();
app.use(express.urlencoded({
    extended: false
}));
const axios = require('axios');
var Youtube = require('youtube-node');
var youtube = new Youtube();
var videoArr = [];
var numberList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

function getViews(flag, word, it, v_id, originRes) {
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
        getSubs(flag, word, viewIt, it, it["snippet"]["channelId"], originRes, desStr)
    });

}

function getSubs(flag, word, viewIt, it, channelId, originRes, description) {
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
        var title = it["snippet"]["title"];
        var channelId = it["snippet"]["channelId"];
        var thumbnails = it["snippet"]["thumbnails"]["high"]["url"];
        var channelTitle = it["snippet"]["channelTitle"];
        var videoId = it["id"]["videoId"];
        var subscriberCount = dict.items[0].statistics.subscriberCount;
        var viewCount = viewIt.viewCount;
        var likeCount = viewIt.likeCount;
        var dislikeCount = viewIt.dislikeCount;
        var commentCount = viewIt.commentCount;
        var tmpDict = {
            title,
            videoId,
            channelId,
            thumbnails,
            channelTitle,
            subscriberCount,
            viewCount,
            likeCount,
            dislikeCount,
            commentCount,
            description
        };
        if (description.length != 0) videoArr.push(tmpDict);
        if (flag) {
            const newModel = new search({
                searchWord: word,
                videos: videoArr,
            })
            videoArr = [];
            newModel.save((err, doc) => {
                if (err) {
                    // return res.json({ success: false, err });
                } else {
                    return originRes.status(200).json({
                        newModel
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
        var flag = 0

        var items = result["items"]; // 결과 중 items 항목만 가져옴
        for (var i in items) {
            if (i == items.length - 1) flag = 1;
            var it = items[i];
            var videoId = it["id"]["videoId"];
            getViews(flag, word, it, videoId, originRes);
        }
    });
}

router.post('/find', (req, res) => {
    search.findOne({
            searchWord: req.body.word + ' 레시피'
        })
        .exec((err, videos) => {
            if (err) return res.status(400).send(err)
            if (!videos) {
                getSearch(req.body.word + ' 레시피', res);
            } else {
                return res.status(200).json({
                    videos
                })
            }
        })
});

module.exports = router;