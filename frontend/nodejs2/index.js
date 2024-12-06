//wrapper function      //relative, absolute útvonal fogalom
//function (__dirname, __filename) {
 
console.log(__dirname);
console.log(__filename);
 
const add = require ('./calculator');
 
console.log(add(2, 3));
 
const http = require('http');
 
const server = http.createServer(function (req, res)
{
    res.writeHead(200)
    res.end('Hello, World!')
});
 
server.listen(8080)
 
// }
 