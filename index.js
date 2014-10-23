var http = require('http');
var iconv = require('iconv-lite');
var fs = require('fs')

function SubtitlesServer() {
    var self = this

    self.server = http.createServer(function (req, res) {
        if (req.headers.origin) {
            res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        }

        res.writeHead(200, {
            'Content-Type': 'text/vtt'
        });
        res.end(self.subData);
    });

};

SubtitlesServer.prototype.sL = function(cb) {
    console.log("FUNCTION START LISTENING FROM SUBTITLES")
    this.httpServer = this.server.listen(8888);
}

SubtitlesServer.prototype.stopServer = function(cb) {
    var self = this
    self.httpServer.close(function () {
        if (cb) {
            cb();
        }
    });
}

SubtitlesServer.prototype.start = function (data, cb) {
        var self = this
        iconv.extendNodeEncodings();
        self.vtt = data.vtt;
        self.encoding = data.encoding;
        try {
            fs.readFile(self.vtt, {}, function (err, data) {
                self.subData = data;
                if (self.httpServer) {
                    self.stopServer(self.sL(cb));
                } else {
                    self.sL(cb);
                }
            });
        } catch (e) {
            console.log('Error Reading vtt');
        }
    }

module.exports = SubtitlesServer
