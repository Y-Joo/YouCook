var Youtube = require('youtube-node');
var youtube = new Youtube();

var word = '제육볶음'; // 검색어 지정
var limit = 10;  // 출력 갯수

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
        var it = items[i]['snippet'];
        // var title = it["snippet"]["title"];
        // var video_id = it["id"]["videoId"];
        // var url = "https://www.youtube.com/watch?v=" + video_id;
        // console.log("제목 : " + title);
        // console.log("URL : " + url);
        // console.log("-----------");
        console.log(it);
    }
});