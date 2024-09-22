// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var root = path.dirname(require.main.filename);
var qs = require('querystring');
var comments = [];

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname === '/') {
        var filepath = path.join(root, 'index.html');
        fs.createReadStream(filepath).pipe(res);
    } else if (pathname === '/comment') {
        var data = '';
        req.on('data', function (chunk) {
            data += chunk;
        }).on('end', function () {
            var comment = qs.parse(data).comment;
            comments.push(comment);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('success');
        });
    } else if (pathname === '/getComments') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end(comments.join('\n'));
    }
}).listen(3000);
console.log('Server running at http://')