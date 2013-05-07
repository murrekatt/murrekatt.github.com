var statusLog;
var consoleLog;
var clearLogButton;
var connectButton;
var disconnectButton;
var websocket;

function init()
{
  statusLog = document.getElementById('statusLog');
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

function doClearLog()
{
	while (consoleLog.childNodes.length > 0)
	{
		consoleLog.removeChild(consoleLog.lastChild);
	}
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
  logToConsole(evt.data);
}

function onError(evt)
{
  logError(evt.data);
}

function logToConsole(message)
{
  var pre = document.createElement("p");
  pre.innerHTML = message;
  consoleLog.appendChild(pre);

  consoleLog.scrollTop = consoleLog.scrollHeight;
}

function logInfo(message)
{
  log('blue', 'Info', message);
}

function logError(message)
{
  log('red', 'Error', message);
}

function log(color, category, message)
{
  var pre = document.createElement('div');
  pre.innerHTML = '<span style="color: ' + color + ';"><strong>' + category + ':</strong> ' + message + '</span>';
  statusLog.appendChild(pre);
  statusLog.scrollTop = statusLog.scrollHeight;
}

window.addEventListener('load', init, false);
