var input = document.getElementById("msgSend");

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    mainRequest(rootURL + "groups/" + idGlobal + "/messages?" + token);
  }
});

function mainRequest(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader("Content-type", "application/json");
  var data = getSendData();
  xhr.send(data);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 201) {
      location.reload(true);
    }
  }
}

function getSendData() {
  var uuid = getUUID();
  var text = input.value;
  return JSON.stringify({ "message": { "source_guid": uuid, "text": text, "attachments": []}});
}

function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

function getUUID() {
  return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}