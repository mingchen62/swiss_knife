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
Update local changes on mathml-to-asciimath.
$ cd node_modules
$ tar xvf mathml-to-asciimath.tar

test rest service:
$ node client-test-latex.js 
$ node client-test-mathml.js
