var websocket;
var uri = 'wss://websocket.mtgox.com/mtgox';

function init()
{
  if (window.MozWebSocket)
  {
    logToStatus('<span style="color: orange;"><strong>Info:</strong> This browser supports WebSocket using the MozWebSocket constructor</span>');
    window.WebSocket = window.MozWebSocket;
  }
  else if (!window.WebSocket)
  {
    logToStatus('<span style="color: red;"><strong>Error:</strong> This browser does not have support for WebSocket</span>');
    return;
  }
  else
  {
    logToStatus('<span style="color: blue;"><strong>Info:</strong> This browser supports WebSocket</span>');
  }
  connectWebSocket();
}

function connectWebSocket()
{
  logToStatus('<span style="color: blue;"><strong>Info:</strong> Connecting to ' + uri + '</span>');
  websocket = new WebSocket(uri);
  websocket.onopen = function(evt) { onOpen(evt) };
  websocket.onclose = function(evt) { onClose(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
  websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(evt)
{
  logToStatus('<span style="color: blue;"><strong>Info:</strong> Connected to ' + uri + '</span>');
}

function onClose(evt)
{
  logToStatus('<span style="color: blue;"><strong>Info:</strong> Disconnected from: ' + uri + '</span>');
  websocket.close();
}

function onMessage(evt)
{
  writeToLog('<span class="message">' + evt.data + '</span>');
}

function onError(evt)
{
  logToStatus('<span style="color: red;"><strong>Error:</strong> ' + evt.data + '</span>');
}

function logToStatus(message)
{
  var pre = document.createElement('div');
  pre.innerHTML = message;
  document.getElementById('status').appendChild(pre);
}

function writeToLog(message)
{
  var pre = document.createElement('div');
  pre.innerHTML = message;
  document.getElementById('log').appendChild(pre);
}

window.addEventListener('load', init, false);
