// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


// GET: /api/:date?
app.get("/api/:date?", function (req, res) {
  let date;

  // get reqDate from request
  let reqDate = req.params.date;

  // if reqDate is empty, set date to current date
  if (!reqDate) {
    date = new Date();
  }

  // if reqDate is a number in Unix format, convert to date
  if (!isNaN(reqDate)) {
    date = new Date(parseInt(reqDate));
  }

  // if reqDate is a string, convert to date
  if (isNaN(date)) {
    date = new Date(reqDate);
  }

  // if reqDate is invalid, return error
  if (isNaN(date)) {
    res.json({ error: "Invalid Date" });
  }

  // return date in JSON format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
