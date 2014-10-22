var subtitles_server = require("../index")

subtitles_server.start({vtt:"./test/subtitles.vtt", encoding:'utf8'}, function(){"Server closed"})
