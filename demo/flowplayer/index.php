<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<style type="text/css">
.clips a{
    background: url(http://flash.flowplayer.org/media/img/global/gradient/h80.png);
    display: block;
    background-color: #fefeff;
    padding: 12px 15px;
    height: 46px;
    width: 195px;
    font-size: 12px;
    border: 1px outset #ccc;
    text-decoration: none;
    letter-spacing: -1px;
    color: #000;
    cursor: pointer;
}

.clips a.paused {
	background-position: 0 0;
}

.clips a.playing, .clips a.paused, .clips a.progress {
    background: url(http://flash.flowplayer.org/media/img/playlist/light.png) no-repeat 0px -69px;
    width: 225px;
    border: 0;
}
</style>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="http://releases.flowplayer.org/js/flowplayer-3.2.12.min.js"></script>
<script type="text/javascript" src="http://releases.flowplayer.org/js/flowplayer.playlist-3.2.10.min.js"></script>
</head>
<body>
<a id="player1" class="" style="display:block; height:300px; width:380px;"></a>
<div class="clips" style="float:left">
    <!-- single playlist entry as an "template" -->
    <a href="KimAronson-TwentySeconds59483.flv" class="">
        Palm trees and the sun <span>from blib.tv video sharing site</span>
        <em>20 sec</em>
    </a>
    <!-- single playlist entry as an "template" -->
    <a href="KimAronson-TwentySeconds58192.flv" class="">
        Happy feet in a car <span>from blib.tv video sharing site</span>
        <em>20 sec</em>
    </a>
    <!-- single playlist entry as an "template" -->
    <a href="KimAronson-TwentySeconds63617.flv" class="paused">
        People jogging <span>from blib.tv video sharing site</span>
        <em>20 sec</em>
    </a>
</div>
<script type="text/javascript">
// set up player normally
    $f("player1", "http://releases.flowplayer.org/swf/flowplayer-3.2.16.swf", {
        // clip properties common to all playlist entries
        clip: {
            baseUrl: 'http://stream.flowplayer.org',
            subTitle: 'from blib.tv video sharing site',
            time: '20 sec'
        },
        // our playlist
        playlist: [
            {url: 'KimAronson-TwentySeconds59483.flv',title: 'Palm trees and the sun'},
            {url: 'KimAronson-TwentySeconds58192.flv',title: 'Happy feet in a car'},
            {url: 'KimAronson-TwentySeconds63617.flv',title: 'People jogging'}
        ],
        // show playlist buttons in controlbar
        plugins: {controls: {playlist: true}}
    });
    // here comes the magic plugin. It uses first div.clips element as the
    // root for as playlist entries. loop parameter makes clips play
    // from the beginning to the end.
    $f("player1").playlist("div.clips:first", {loop:true});


</script>
</body>
</html>