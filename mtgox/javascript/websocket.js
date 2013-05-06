var websocket;

function init()
{
  if (window.MozWebSocket)
  {
    logInfo('This browser supports WebSocket using the MozWebSocket constructor.');
    window.WebSocket = window.MozWebSocket;
  }
  else if (!window.WebSocket)
  {
    logError('This browser does not have support for WebSocket.');
    return;
  }
  else
  {
    logInfo('This browser supports WebSocket.');
  }
  connectWebSocket();
}

function connectWebSocket()
{
  logInfo('Connecting to ' + uri);
  websocket = new WebSocket(uri);
  websocket.onopen = function(evt) { onOpen(evt) };
  websocket.onclose = function(evt) { onClose(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
  websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(evt)
{
  logInfo('Connected to ' + uri);
}

function onClose(evt)
{
  logInfo('Disconnected from: ' + uri);
  websocket.close();
}

function onMessage(evt)
{
  logMessage(evt);
}

function onError(evt)
{
  logError(evt.data);
}

function logInfo(message)
{
  var pre = document.createElement('div');
  pre.innerHTML = '<span style="color: blue;"><strong>Info:</strong> ' + message + '</span';
  document.getElementById('status').appendChild(pre);
}

function logError(message)
{
  var pre = document.createElement('div');
  pre.innerHTML = '<span style="color: red;"><strong>Error:</strong> ' + message + '</span>';
  document.getElementById('status').appendChild(pre);
}

function logMessage(message)
{
  var pre = document.createElement('div');
  pre.innerHTML = '<div class="message">' + JSON.stringify(message) + '</div>';
  document.getElementById('log').appendChild(pre);
}

window.addEventListener('load', init, false);
