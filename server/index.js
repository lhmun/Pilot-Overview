var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + '/../client/dist'));

app.get('/info', function (req, res) {
  console.log('GOT INFO?');
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

