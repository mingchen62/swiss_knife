# node-Rest
Rest service to Convert different math formats: Latex to MathMl and a subset of MathML to ASCIIMathML.

# installation
1. install node.js, see etc/install-node-centos.txt

2. install dependency packages

```
  npm install express  
  npm install body-parser  
  npm install winston  
  npm install mathml-to-asciimath
  npm install texzilla
  npm install xmlhttprequest
  npm install cors

```
3. Update local changes on mathml-to-asciimath.
$ cd node_modules
$ tar xvf ../mathml-to-asciimath.tar

# test NODE.js installation
4. test the two conversion JS packages are correctly installed
% node
> var convert = require('texzilla');
> var lex ='x \leq y';
> convert.toMathMLString(lex);
> var convert2 = require('mathml-to-asciimath');
> var mathml = '<math><mn>1</mn><mo>+</mo><mn>2</mn></math>';
> convert2(mathml);
>.exit

## local test
There will be various REST end points for this service:
/mathml_to_asciimath
/latex_to_asciimath
/latex_to_mathml
/asciimath_mathml

5. test Rest service from same directory, local connection:
$ node client-test-latex.js 
$ node client-test-mathml.js

## remote test over firewall 
6. test REST over network to make sure firewall is open; If not open, use 'ipTables' to check
From another machine, <br>
%curl -H "Content-Type: application/json;charset=UTF-8" -X POST -d '{"id":90,"asciimath":"", "mathml":"", "latex":"x \\lt y"}' http://192.168.1.154:8083/latex_to_asciimath<br>
## Simple performance test using Apache Benchmark<br>
%echo '{"id":90,"asciimath":"", "mathml":"", "latex":"x \\lt y"}' > post_loc.txt<br />
%ab -p post_loc.txt -T application/json -c 5 -n 10 http://192.168.1.154:8083/latex_to_asciimath
