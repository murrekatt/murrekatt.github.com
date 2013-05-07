var consoleLog;
var clearLogButton;
var connectButton;
var disconnectButton;
var websocket;

function init()
{
  consoleLog = document.getElementById("consoleLog");

  clearLogButton = document.getElementById("clearConsoleLogButton");
  clearLogButton.onclick = doClearLog;
      
  connectBut = document.getElementById("connectButton");
  connectBut.onclick = doConnect;
  disconnectBut = document.getElementById("disconnectButton");
  disconnectBut.onclick = doDisconnect;
  
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
}

function doConnect()
{
  logInfo('Connecting to ' + uri);
  websocket = new WebSocket(uri);
  websocket.onopen = function(evt) { onOpen(evt) };
  websocket.onclose = function(evt) { onClose(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
  websocket.onerror = function(evt) { onError(evt) };
}

function doDisconnect()
{
  logInfo('Disconnected from: ' + uri);
  websocket.close();
}

function clearLog()
{
	while (consoleLog.childNodes.length > 0)
	{
		consoleLog.removeChild(consoleLog.lastChild);
	}
}

function logToConsole()
{
  var pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = JSON.stringify(message);
  consoleLog.appendChild(pre);

  consoleLog.scrollTop = consoleLog.scrollHeight;
}

function onOpen(evt)
{
  logInfo('Connected to ' + uri);
}

function onClose(evt)
{
  doDisconnect();
}

function onMessage(evt)
{
  logToConsole(evt);
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

window.addEventListener('load', init, false);
