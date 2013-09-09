<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>Examples</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link href="" rel="stylesheet">
<script type="text/javascript" src="jquery-1.9.1.min.js"></script>
<script type="text/javascript">
window.twttr = (function (d,s,id) {
  var t, js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
  js.src="https://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
  return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
}(document, "script", "twitter-wjs"));
$(function(){
	twttr.widgets.createTimeline(
	  '339337373328486400',
	  document.getElementById('timeline'),
	  function (el) {
	    console.log("Embedded a timeline.")
	  },
	  {
	    width: '450',
	    height: '700',
	    related: 'benward,endform,brianellin'
	  }
	);
});

</script>
</head>
<body>
	<div id="content">
		<!-- <a class="twitter-timeline" data-dnt="true" href="https://twitter.com/PearsonCatalyst" data-widget-id="339337373328486400">Tweets by @PearsonCatalyst</a> -->
		<a class="twitter-timeline" width="400" height="500" href="https://twitter.com/PearsonCatalyst" data-list-owner-screen-name="pearsonplc,PearsonAsiaPac,PearsonThinkTk">Tweets by @PearsonCatalyst</a>
    	<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
	</div>
	<div id="response">
		
	</div>
	<div id="timeline">
		
	</div>
	<input type="text" id="url" />
	<input type="button" id="go" value="go" />
<script type="text/javascript">
$('#go').click(function(){
	var url = $('#url').val();
	$.getJSON("https://api.twitter.com/1.1/lists/statuses.json?slug=teams&owner_screen_name=kasimzero&count=1",function(res){
			if(res){
				$('response').html(res);
				console.log(res);
			}else{
				alert("error");
			}
	});
});

</script>
</body>
</html>