const rootURL = 'https://api.groupme.com/v3/';
const token = getQueryVariable("token");
const src = getQueryVariable("src");

var lastMsg;
var maxCount;
var currCount = 0;

if(src === "groups") {
  channelRequest(rootURL + "" + src + "/" + getQueryVariable("id") + "/messages?limit=50&" + token);
  window.onscroll = function(ev) {
    if (window.scrollY <= 0 && currCount < maxCount) {
      channelRequest(rootURL + "" + src + "/" + getQueryVariable("id") + "/messages?limit=20&before_id=" + lastMsg + "&" + token);
      window.scrollTo(0, 1);
    }
  };
} else {
  channelRequest(rootURL + "" + src + "&" + token);
  window.onscroll = function(ev) {
    if (window.scrollY <= 0 && currCount < maxCount) {
      channelRequest(rootURL + "" + src + "&" + token);
      window.scrollTo(0, 1);
    }
  };
}

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
    if(url.includes('before_id') === false) {
      window.scrollTo(0,document.body.scrollHeight);
    }
  }
}

function populateMessages(jsonObj) {
  for (var i = 0; i < jsonObj.length; i++) {
    currCount++;
    var container = document.createElement('p');
    var msg = document.createElement('span');
    var name = document.createElement('b');
    name.textContent = jsonObj[i].name + ": ";
    if(jsonObj[i].text !== 'null' && jsonObj[i].attachments.length === 0) {
      container.appendChild(name);
      msg.textContent = jsonObj[i].text;
      var group = document.getElementById("messages");
      if(jsonObj[i].name === "GroupMe") {
        container.style.color = "gray";
        msg.style.color = "gray";
      }
      group.insertBefore(container, group.childNodes[0]).appendChild(msg);
    }
      
    if(typeof jsonObj[i].attachments[0] !== 'undefined' && jsonObj[i].attachments[0].type === 'image'){
      container.appendChild(name);
      var img = document.createElement('a');
      img.href = "" + jsonObj[i].attachments[0].url;
      img.textContent = "IMAGE";
      img.target = "_BLANK";
      if(jsonObj[i].text !== 'null') {
        var msg = document.createElement('span');
        msg.textContent = jsonObj[i].text;
        container.appendChild(msg);
      }
      group.insertBefore(container, group.childNodes[0]).appendChild(img);
    }
    if(i === jsonObj.length - 1) {
      lastMsg = jsonObj[i].id;
    }
  }
}

function getQueryVariable(variable) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(variable);
}