# node-Rest
Rest service to Convert different math formats: Latex to MathMl and a subset of MathML to ASCIIMathML.

# installation
## install node.js
see etc/install-node-centos.txt

## install dependency packages

```
  npm install express  
  npm install body-parser  
  npm install winston  
  npm install mathml-to-asciimath
  npm install texzilla
  npm install xmlhttprequest
  npm install cors
  nop install ascii2mathml

```
## Update local changes on mathml-to-asciimath.<br>
$ cd node_modules <br>
$ tar xvf ../mathml-to-asciimath.tar

# test NODE.js installation
test the two conversion JS packages are correctly installed<br>
% node<br>
> var convert = require('texzilla');
> var lex ='x \leq y';
> convert.toMathMLString(lex);
> var convert2 = require('mathml-to-asciimath');
> var mathml = '<math><mn>1</mn><mo>+</mo><mn>2</mn></math>';
> convert2(mathml);
>.exit

## local test<br>
There will be various REST end points for this service:<br>
/mathml_to_asciimath<br>
/latex_to_asciimath<br>
/latex_to_mathml<br>
/asciimath_mathml<br>

test Rest service from same directory, local connection:<br>
$ node client-test-latex.js <br>
$ node client-test-mathml.js<br>

## test RESTful services 
6. test REST over network to make sure firewall is open; If not open, use 'ipTables' to check
From another machine, <br>
Latex_toAsciiMath<br>
%curl -H "Content-Type: application/json;charset=UTF-8" -X POST -d '{"id":90,"asciimath":"", "mathml":"", "latex":"x \\lt y"}' http://192.168.1.156:8089/latex_to_asciimath<br>
Asccimath to MathMl<br>
%curl -H "Content-Type: application/json;charset=UTF-8" -X POST -d '{"id":90,"asciimath":"x < y", "mathml":"", "latex":""}' http://192.168.1.156:8089/asciimath_to_mathml<br>
%curl -H "Content-Type: application/json;charset=UTF-8" -X POST -d '{"id":90,"asciimath":"sqrt((A+X)/2)/2", "mathml":"", "latex":""}' http://192.168.1.156:8089/asciimath_to_mathml<br>

## Simple performance test using Apache Benchmark<br>
%echo '{"id":90,"asciimath":"", "mathml":"", "latex":"x \\lt y"}' > post_loc.txt<br>
%ab -p post_loc.txt -T application/json -c 5 -n 10 http://192.168.1.154:8083/latex_to_asciimath
