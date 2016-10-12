var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(bodyParser.json());
app.use(cors());

var fs = require("fs");

function myTimestamp() {
	  return new Date().toString();
};

var winston = require('winston')

winston.add(
  winston.transports.File, {
    filename: './logs/math.log',
    timestamp: myTimestamp,
    level: 'info',
    maxsize: 5242880, //5MB
    maxFiles: 5,
    json: false,
    eol: '\n', // for Windows, or `eol: ‘n’,` for *NIX OSs
  }
)

var tplData;
var tpl = fs.readFile( __dirname + "/" + "response_template.json", 'utf8', function (err, data) {
    tplData = JSON.parse(data);
})

var convert = require('texzilla');
var convert1 = require('mathml-to-asciimath');

app.post('/mathml_to_asciimath', function (req, res) {
   // First read existing users.
      console.log(req.body);
      winston.info("id: %s", req.body.id);
      tplData.id = req.body.id;
      tplData.mathml = req.body.mathml;
      tplData.asciimath = convert1(tplData.mathml);
      winston.info("asciimath: %s", tplData.asciimath);
      res.contentType('application/json');
      res.send( JSON.stringify(tplData));
})

app.post('/latex_to_asciimath', function (req, res) {
   // First read existing users.
      console.log(req.body);
      winston.info("id: %s", req.body.id);
      tplData.id = req.body.id;
      tplData.latex = req.body.latex;
      tplData.mathml = convert.toMathMLString(tplData.latex);
      tplData.asciimath = convert1(tplData.mathml);
      winston.info("asciimath: %s", tplData.asciimath);
      var len = tplData.asciimath.length;
      if ( tplData.asciimath.charAt(0)=='\(' && tplData.asciimath.charAt(len -1) == '\)')
          tplData.asciimath =tplData.asciimath.subString(1,len)
      winston.info("mathml: %s", tplData.mathml);
      res.contentType('application/json');
      res.send( JSON.stringify(tplData));
})

app.post('/latex_to_mathml', function (req, res) {
   // First read existing users.
   console.log(req.body);
   winston.info("id: %s", req.body.id);
   tplData.id = req.body.id;
   tplData.latex = req.body.latex;
   tplData.mathml = convert.toMathMLString(tplData.latex);
   winston.info("mathml: %s", tplData.mathml);
   res.contentType('application/json');
   res.send( JSON.stringify(tplData));
})
   //

var server = app.listen(8083, function () {
   var host = server.address().address
   var port = server.address().port

//   console.log("math format conversion app listening at http://%s:%s", host, port)
   winston.info("math format conversion app listening at http://%s:%s", host, port);
})

