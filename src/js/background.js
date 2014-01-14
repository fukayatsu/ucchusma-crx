var setStatus = function() {
  $.ajax({
    url: "https://ucchusma.herokuapp.com/api/v1/rooms/1.json",
    success: function(res) {
      var imgPaths = {
        "vacant":   "../img/unlock_48.png",
        "occupied": "../img/lock_48.png",
      };

      var imgPath = imgPaths[res.status];
      var dateStr = moment(res.created_at).format("YYYY-MM-DD HH:mm:ss");

      chrome.browserAction.setIcon({path: imgPath});
      chrome.browserAction.setTitle({title: 'checked at ' + dateStr});
    },
    error: function(xhr, status, error) {
      chrome.browserAction.setIcon({path: imgPaths['vacant']});
      chrome.browserAction.setTitle({title: "can't get status."});
    }
  });
};

chrome.browserAction.onClicked.addListener(function(tab){
  // chrome.tabs.create({"url": "https://ucchusma.herokuapp.com/"});
  setStatus();
});

$(function() {
  setStatus();
  setInterval(setStatus, 60 * 1000);
});