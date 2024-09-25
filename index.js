// index.js
// where your node app starts

// init project
var express = require('express');
const bodyParser = require('body-parser');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(bodyParser.json());
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:unix", function (req, res) {
  const { unix } = req.params;

  if (!unix) {
    const currentDateUnix = Date.now();
    const currentDate = new Date(currentDateUnix);
    console.log("file: index.js:31 ~ currentDate:", currentDate)
    return res.json({ unix: currentDateUnix, utc: currentDate.toUTCString() });
  }

  if (!isNaN(unix)) {
    const miliseconds = Number(unix) * 1000;
    const date = new Date(miliseconds);
    if (!isNaN(date?.getTime())) {
      return res.json({ unix: unix, utc: date.toUTCString() });
    };
  }

  const checkDateValidation = new Date(unix);
  if (!isNaN(checkDateValidation?.getTime())) {
    return res.json({ unix: unix, utc: checkDateValidation.toUTCString() });
  }

  return res.json({ error: "invalid Date" })

})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
