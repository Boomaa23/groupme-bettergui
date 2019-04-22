const rootURL = 'https://api.groupme.com/v3/';

var fullWidth = document.documentElement.clientWidth / 7.25;
var src = 'groups';

mainRequest(rootURL + "groups?" + token);
requestDM(rootURL + "chats?" + token);
changeLogin();

function mainRequest(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var json = request.response;
    var list = document.createElement('ul');
    list.id = "grp";
    for(i in json.response) {
      var src = 'groups';
      if(document.getElementById("embed").src.split('/').reverse()[0] === "temp.txt") {
        embedChange(json.response[i]['id'], null, src);
      }
      populateGroup(json.response[i], list, src);
    }
    finishGroupPopulate(list);
  }
}

function requestDM(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var json = request.response;
    var list = document.createElement('ul');
    list.id = "dm";
    for(i in json.response) {
      var src = 'direct_messages?other_user_id=' + json.response[i].other_user.id;
      if(document.getElementById("embed").src.split('/').reverse()[0] === "temp.txt") {
        embedChange(json.response[i].other_user.id, null, src);
      }
      populateGroup(json.response[i].other_user, list, src);
    }
    finishGroupPopulate(list);
  }
}

function populateGroup(jsonObj, list, src) {
  var title = document.createElement('li');
  title.textContent = "" + jsonObj['name'];
  var background_image;
  if(jsonObj['image_url'] + "" != 'null') {
    background_image = "" + jsonObj['image_url'];
  }
  title.onclick = function() {embedChange(jsonObj['id'], background_image, src)};
  list.appendChild(title);
}

function finishGroupPopulate(list) {
  var grp = document.getElementById('groupSelector').appendChild(list);
  grp.appendChild(document.createElement("br"));
  grp.appendChild(document.createElement("br"));
  scaleInput();
}

function embedChange(id, background_url, src) {
  var iframe = document.getElementById("embed")
  iframe.src = "messages.php?id=" + id + "&max=" + document.documentElement.clientWidth + "&bkg=" + background_url + "&token=" + token + "&src=" + src;
  iframe.style.backgroundColor = "transparent";
  iframe.allowTransparency="true";
}

function changeLogin() {
  var login = document.getElementById("login");
  if(login.textContent === "Logged in as: ") { 
    login.textContent = login.textContent + nameGlobal;
  }
  login.appendChild(document.createElement('br'));
  var dm = document.createElement('input');
  dm.type = 'checkbox';
  var a = document.createElement('a');
  a.textContent = "Display DMs";
  login.appendChild(a);
  login.appendChild(dm);
  scaleInput();
}

function scaleInput() {
  document.getElementById("embed").height = document.documentElement.clientHeight - document.getElementById("groupSelector").clientHeight - document.getElementById("msgSend").clientHeight - 20;
  document.getElementById("msgSend").size = document.documentElement.clientWidth / 7.25;
}