const rootURL = 'https://api.groupme.com/v3/groups';
const token = getQueryVariable("token");

var lastMsg;
var maxCount;
var currCount = 0;

channelRequest(rootURL + "/" + getQueryVariable("id") + "/messages?limit=50&" + token);

window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && currCount < maxCount) {
    channelRequest(rootURL + "/" + getQueryVariable("id") + "/messages?limit=20&before_id=" + lastMsg + "&" + token);
  }
};

function channelRequest(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var json = request.response;
    for(i in json.response) {
      populateMessages(json.response[i]);
    }
    maxCount = json.response.count;
  }
}

function populateMessages(jsonObj) {
  for (var i = 0; i < jsonObj.length; i++) {
    currCount++;
    if(jsonObj[i].attachments.length === 0) {
      var msg = document.createElement('p');
      var span = document.createElement('span');
      var b = document.createElement('b');
      
      span.textContent = jsonObj[i].text;
      b.textContent =  jsonObj[i].name + ": ";
      msg.appendChild(b);
      var group = document.getElementById("messages");
      //group.insertBefore(msg, group.childNodes[0]);
      group.appendChild(msg).appendChild(span);
      if(i === jsonObj.length - 1) {
        lastMsg = jsonObj[i].id;
      }
    }
  }
}

function getQueryVariable(variable) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(variable);
}