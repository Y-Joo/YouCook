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
var video_arr = [];
var number_list = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

function get_views(flag, word, it, v_id, originRes) {
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
        var des_str = []
        for (var i in str_list) {
            str = str_list[i]
            if (str[0] in number_list && str[1] == '.' ||
                str[0] in number_list && str[1] in number_list && str[2] == '.') {
                if (str[str.length - 2] in alphabet || str[2] in alphabet || str[3] in alphabet) continue;
                des_str.push(str);
            }
        }
        var view_it = dict.items[0].statistics;
        get_subs(flag, word, view_it, it, it["snippet"]["channelId"], originRes, des_str)
    });

}

function get_subs(flag, word, view_it, it, channel_id, originRes, description) {
    var request = require('request');

    var optionParams = {
        id: channel_id,
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
        var channel_title = it["snippet"]["channelTitle"];
        var video_id = it["id"]["videoId"];
        var subscriberCount = dict.items[0].statistics.subscriberCount;
        var viewCount = view_it.viewCount;
        var likeCount = view_it.likeCount;
        var dislikeCount = view_it.dislikeCount;
        var commentCount = view_it.commentCount;
        var tmp_dict = {
            title,
            video_id,
            channelId,
            thumbnails,
            channel_title,
            subscriberCount,
            viewCount,
            likeCount,
            dislikeCount,
            commentCount,
            description
        };
        if (description.length != 0) video_arr.push(tmp_dict);
        if (flag) {
            console.log(video_arr);
            const new_model = new search({
                search_word: word,
                videos: video_arr,
            })
            new_model.save((err, doc) => {
                if (err) {
                    // return res.json({ success: false, err });
                } else {
                    return originRes.status(200).json({
                        new_model
                    })
                }
            })
            video_arr = [];
        }
    });

}


function get_search(str, originRes) {
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
            var video_id = it["id"]["videoId"];
            get_views(flag, word, it, video_id, originRes);
        }
    });
}

router.post('/find', (req, res) => {
    search.findOne({
            search_word: req.body.word
        })
        .exec((err, videos) => {
            if (err) return res.status(400).send(err)
            if (!videos) {
                get_search(req.body.word + ' 레시피', res);
            } else {
                return res.status(200).json({
                    videos
                })
            }
        })
});

module.exports = router;