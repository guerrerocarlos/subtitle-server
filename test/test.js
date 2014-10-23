var subtitles_server = new (require("../index"))()

subtitles_server.start({vtt:"./test/subtitles.vtt", encoding:'utf8'}, function(){"Server closed"})


