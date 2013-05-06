var conn = io.connect(uri);

conn.on('connect', function() {
  var e = document.getElementById('status');
  e.innerHTML = e.innerHTML + '<div class="notice">Connected to ' + uri + '</div>';
});

conn.on('message', function(data) {
    var e = document.getElementById('log');
    e.innerHTML = e.innerHTML + '<div class="message">' + JSON.stringify(data) + '</div>';
});

conn.on('error', function(data) {
  var e = document.getElementById('status');
  e.innerHTML = e.innerHTML + '<div class="error">ERROR: ' + data + '</div>';
});
