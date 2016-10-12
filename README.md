# node-rest
rest service to Convert subset of MathML to ASCIIMathML.

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
test at current dir:

$ node
> var convert = require('texzilla');
> var latex ='x<y';
> convert.toMathMLString(latex);
> convert = require('mathml-to-asciimath');
> var mathml = '<math><mn>1</mn><mo>+</mo><mn>2</mn></math>';
> convert(mathml); // => '1 + 2' test
>.exit

test rest service:
$ node client-test-latex.js 
$ node client-test-mathml.js
