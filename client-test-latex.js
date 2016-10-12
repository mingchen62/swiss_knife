var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var fs = require("fs");
var req = new XMLHttpRequest();
//req.open('POST', 'http://127.0.0.1:8083/latex_to_mathml');
req.open('POST', 'http://127.0.0.1:8083/latex_to_asciimath');
req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


var mathml;
var tpl = fs.readFile( __dirname + "/" + "latex.json", 'utf8', function (err, data) {
	mathml = JSON.parse(data);
	console.log("============> send out: ")
	console.log(mathml);
	req.send(JSON.stringify(mathml));
})

req.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var response = this.responseText;
    // use response in here.
    console.log("<============ get back response:");
    console.log(response);
  }
}

/*
var mathml= {
      "mathml" : "mathml",
      "asciimath" : "password4",
      "id": "4"
};
*/


