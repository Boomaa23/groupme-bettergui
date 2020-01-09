const rootURL = 'https://api.groupme.com/v3/';
const token = getQueryVariable("token");
const src = getQueryVariable("src");

var members;
var group;
var currUrl;
var lastMsg;
var maxCount;
var currCount = 0;

var currGroupOrDM = getQueryVariable("id");
var isDM = src.includes("direct_messages");
var isGroup = src.includes("group");

if(isGroup) {
  channelRequest(rootURL + src + "/" + getQueryVariable("id") + "/messages?limit=50&" + token, false);
  window.onscroll = function(ev) {
    if (window.scrollY <= 0 && currCount < maxCount) {
      channelRequest(rootURL + src + "/" + getQueryVariable("id") + "/messages?limit=20&before_id=" + lastMsg + "&" + token, false);
      window.scrollTo(0, 1);
    }
  };
} else if(isDM) {
  channelRequest(rootURL + src + "&limit=50&" + token, false);
  window.onscroll = function(ev) {
    if (window.scrollY <= 0 && currCount < maxCount) {
      channelRequest(rootURL + src + "&limit=20&before_id=" + lastMsg + "&" + token, false);
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

function channelRequest(url, forMembers) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    currUrl = url;
    var json = request.response;
    if(!forMembers) {
      maxCount = json.response.count;
      for(i in json.response) {
        populateMessages(json.response[i]);
      }
    } else if(isDM) {
        members = [];
    } else {
        members = json.response.members;
    }
  }
}

async function populateMessages(jsonObj) {
  for (var i = 0; i < jsonObj.length; i++) {
    currCount++;
    var container = document.createElement('p');
    var msg = document.createElement('span');
    var a = document.createElement('a');
    var name = document.createElement('b');
    name.textContent = jsonObj[i].name + ": ";
    for(var j = 0;j < jsonObj[i].favorited_by.length;j++) {
      while(typeof members === 'undefined') {
        if(isDM) {
          channelRequest(rootURL + src + "&" + token, true);
        } else {
          channelRequest(rootURL + "groups/" + getQueryVariable("id") + "?" + token, true);
        }
        await sleep(250);
      }
      for(var k = 0;k < members.length;k++) {
        if(members[k].user_id === jsonObj[i].favorited_by[j]) {
          if(name.title === "") {
            name.title = "Liked by: " + members[k].name;
          } else {
            name.title = name.title + ", " + members[k].name;
          }
        }
      }
    }
    if(jsonObj[i].text !== 'null' && jsonObj[i].attachments.length === 0) {
      container.appendChild(name);
      msg.textContent = jsonObj[i].text;
      group = document.getElementById("messages");
      if(jsonObj[i].name === "GroupMe") {
        container.style.color = "gray";
        msg.style.color = "gray";
      }
      
      var msgText = msg.textContent;
      var linkStart = msgText.indexOf('http');
      var linkEnd = msgText.indexOf(' ', linkStart + 1);
      var rtnLinkEnd = msgText.indexOf('\n', linkStart + 1);
      if(rtnLinkEnd < linkEnd) {
        linkEnd = rtnLinkEnd;
      }
      
      if(linkStart != -1) {
        if(linkEnd == -1) {
          linkEnd = msgText.length;
          msg.textContent = " " + msg.textContent;
        }
        var linkText = msgText.substring(linkStart, linkEnd);
        a.href = linkText;
        a.textContent = linkText;
        msg.textContent = msgText.substring(0, linkStart);
        
        group.insertBefore(container, group.childNodes[0]).appendChild(msg);
        group.insertBefore(container, group.childNodes[0]).appendChild(a);
        
        var endMsg = document.createElement('span');
        endMsg.textContent = msgText.substring(linkEnd, msgText.length);
        group.insertBefore(container, group.childNodes[0]).appendChild(endMsg);
      } else {
        group.insertBefore(container, group.childNodes[0]).appendChild(msg);
      }
    }
      
    if(typeof jsonObj[i].attachments[0] !== 'undefined' && jsonObj[i].attachments[0].type === 'image'){
      container.appendChild(name);
      if(jsonObj[i].text !== 'null') {
        var msg = document.createElement('span');
        msg.textContent = jsonObj[i].text;
        container.appendChild(msg);
      }
      container.appendChild(document.createElement("br"));
      var img = document.createElement('img');
      img.href = "" + jsonObj[i].attachments[0].url;
      img.src = jsonObj[i].attachments[0].url;
      img.width = document.documentElement.clientWidth / 3;
      
      group.insertBefore(container, group.childNodes[0]).appendChild(img);
    }
    if(i === jsonObj.length - 1) {
      lastMsg = jsonObj[i].id;
    }
  }
  if(currUrl.includes('before_id') === false) {
    console.log(currUrl);
    window.scrollTo(0, document.body.scrollHeight);
  }
}

function getQueryVariable(variable) {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(variable);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}