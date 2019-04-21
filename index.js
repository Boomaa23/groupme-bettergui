const rootURL = 'https://api.groupme.com/v3/groups';

mainRequest(rootURL + "?" + token);
  
function mainRequest(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var json = request.response;
    var list = document.createElement('ul');
    for(i in json.response) {
      if(document.getElementById("embed").src.split('/').reverse()[0] === "temp.txt") {
        embedChange(json.response[i]['id'], null);
      }
      populateGroup(json.response[i], list);
    }
    finishGroupPopulate(list);
  }
}

function populateGroup(jsonObj, list) {
  var title = document.createElement('li');
  title.textContent = "" + jsonObj['name'];
  var background_image;
  if(jsonObj['image_url'] + "" != 'null') {
    background_image = "" + jsonObj['image_url'];
  }
  title.onclick = function() {embedChange(jsonObj['id'], background_image)};
  list.appendChild(title);
}

function finishGroupPopulate(list) {
  document.getElementById('groupSelector').appendChild(list);
}

function embedChange(id, background_url) {
  var iframe = document.getElementById("embed")
  iframe.src = "messages.php?id=" + id + "&max=" + document.documentElement.clientWidth + "&bkg=" + background_url + "&token=" + token;
  iframe.style.backgroundColor = "transparent";
  iframe.allowTransparency="true";
}

document.getElementById("embed").height = document.documentElement.clientHeight - 40;