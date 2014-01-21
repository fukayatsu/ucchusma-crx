var imgPaths = {
  "vacant":   "../img/unlock_128.png",
  "occupied": "../img/lock_128.png",
  "unknown": "../img/unknown_128.png",
};

var setStatus = function() {
  $.ajax({
    url: "https://ucchusma.herokuapp.com/api/v1/rooms/1.json",
    success: function(res) {
      var updatedAt = moment(res.updated_at);
      var dateStr   = updatedAt.format("YYYY-MM-DD HH:mm:ss");

      if ((Date.now() - updatedAt) / (1000 * 60) > 10) {
        // 最終更新から10分以上経過
        chrome.browserAction.setIcon({path: imgPaths['unknown']});
        chrome.browserAction.setTitle({title: 'api is down?  fchecked at ' + dateStr});
      } else {
        chrome.browserAction.setIcon({path: imgPaths[res.status]});
        chrome.browserAction.setTitle({title: 'checked at ' + dateStr});
      }
    },
    error: function(xhr, status, error) {
      chrome.browserAction.setIcon({path: imgPaths['unknown']});
      chrome.browserAction.setTitle({title: "can't get status."});
    }
  });
};

chrome.browserAction.onClicked.addListener(function(tab){
  // chrome.tabs.create({"url": "https://ucchusma.herokuapp.com/"});
  chrome.browserAction.setIcon({path: imgPaths['unknown']});
  chrome.browserAction.setTitle({title: "checking status..."});
  setStatus();
});

$(function() {
  setStatus();
  setInterval(setStatus, 15 * 1000);
});