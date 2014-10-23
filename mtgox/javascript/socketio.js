var conn = io.connect(uri);

conn.on('connect', function() {
  logInfo('Connected to ' + uri);
});

conn.on('disconnect', function() {
  logInfo('Disconnected from ' + uri);
});

conn.on('message', function(evt) {
  logMessage(evt);
});

conn.on('error', function(evt) {
  logError(evt.data);
});

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
