var secureCb;
var wsUri;
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

  secureCb = document.getElementById("secureCb");
  secureCb.checked = false;
  secureCb.onclick = toggleTls;
  
  wsUri = document.getElementById("wsUri");
  toggleTls();

  connectButton = document.getElementById("connectButton");
  connectButton.onclick = doConnect;
  disconnectButton = document.getElementById("disconnectButton");
  disconnectButton.onclick = doDisconnect;
  disconnectButton.disabled = true;
  
  clearLogButton = document.getElementById("clearConsoleLogButton");
  clearLogButton.onclick = doClearLog;

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

function toggleTls()
{
  if (wsUri.value === "")
  {
    wsUri.value = "ws://websocket.mtgox.com/mtgox?Currency=EUR,USD,CHF";
  }
  
  if (secureCb.checked)
  {
    wsUri.value = wsUri.value.replace("ws:", "wss:");
  }
  else
  {
    wsUri.value = wsUri.value.replace ("wss:", "ws:");
  }
}

function doConnect()
{
  logInfo('Connecting to ' + wsUri.value);
  websocket = new WebSocket(wsUri.value);
  websocket.onopen = function(evt) { onOpen(evt) };
  websocket.onclose = function(evt) { onClose(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
  websocket.onerror = function(evt) { onError(evt) };
}

function doDisconnect()
{
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
  logInfo('Connected to ' + wsUri.value);
  connectButton.disabled = true;
  disconnectButton.disabled = false;
}

function onClose(evt)
{
  doDisconnect();
  logInfo('Disconnected from: ' + wsUri.value);
  connectButton.disabled = false;
  disconnectButton.disabled = true;
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
