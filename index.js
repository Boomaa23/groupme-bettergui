const rootURL = 'https://api.groupme.com/v3/';

var fullWidth = document.documentElement.clientWidth / 7.25;
var src = 'groups';

if(typeof token === 'undefined' || typeof ip === 'undefined') {
  //window.location.href = "login.php?notoken";
}

getIP();
mainRequest(rootURL + "groups?" + token);
requestDM(rootURL + "chats?" + token);
requestName(rootURL + "users/me?" + token);

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
        embedChange(json.response[0].id, null, src);
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
    list.style.display = "none";
    for(i in json.response) {
      var src = 'direct_messages?other_user_id=' + json.response[i].other_user.id;
      populateGroup(json.response[i].other_user, list, src);
    }
    finishGroupPopulate(list);
  }
}

function requestName(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    if (request.readyState == 4 && request.status == 200) {
      var nameTemp = JSON.stringify(request.response.response.name);
      nameTemp = nameTemp.substring(1, nameTemp.length - 1);
      var login = document.getElementById("login");
      login.textContent = login.textContent + nameTemp;
      changeLogin();
    }
  }
}

function getIP() {
  var request = new XMLHttpRequest();
  request.open('GET', "http://httpbin.org/ip");
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var chk = request.status;
    while(chk !== 200) {
      chk = request.status;
    }
    if (request.readyState == 4) {
      var resp = JSON.stringify(request.response.origin).split(',');
      var lastip = resp[resp.length-1].substring(1, resp[resp.length-1].length).trim();
      if(lastip != ip) {
        window.location.href = "login.php?badip=" + ip + "&goodip=" + lastip;
      }
    }
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
  login.appendChild(document.createElement('br'));
  var dm = document.createElement('input');
  dm.type = 'checkbox';
  var a = document.createElement('a');
  a.textContent = "Display DMs";
  login.appendChild(a);
  login.appendChild(dm);
  
  dm.addEventListener( 'change', function() {
    if(this.checked) {
      document.getElementById("dm").style.display = "";
      scaleInput();
    } else {
      document.getElementById("dm").style.display = "none";
      scaleInput();
    }
  });
  
  var logoutPost = document.createElement('input');
  logoutPost.style.display = 'none';
  logoutPost.type = 'text';
  logoutPost.name = 'logout';
  logoutPost.value = 'yes';
  
  var logout = document.createElement('input');
  logout.type = 'submit';
  logout.value = 'Logout';
  
  var logoutForm = document.createElement('form');
  logoutForm.action = 'login.php';
  logoutForm.style.display = 'inline';
  logoutForm.method = 'post';
  logoutForm.appendChild(logout);
  logoutForm.appendChild(logoutPost);
  login.appendChild(logoutForm);
  scaleInput();
}

function scaleInput() {
  document.getElementById("embed").height = document.documentElement.clientHeight - document.getElementById("groupSelector").clientHeight - document.getElementById("msgSend").clientHeight - 20;
  document.getElementById("msgSend").size = document.documentElement.clientWidth / 7.25;
}