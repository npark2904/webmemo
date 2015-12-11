<!doctype html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<html>
<head>
<link rel="stylesheet" type="text/css" href="copierStyle.css">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
<script src="jquery-1.11.2.js"></script>
<script src="copierJS.js"></script>
</head>
<body style="margin:0; padding:0">
<div class="wraper">
    <div class="notice">※ HTML 및 javascript, jquery 입력 가능 </div>
	<form action="" onsubmit="return vaildCheck();" >
	<div class="inputPane">
		<div class="inputSubj"> Subject </div>
		<input id="titleField" type="text" name="Title">
		<div class="inputSubj"> data </div>
		<textarea id="dataField" rows=6 name="Data"></textarea>
		<div><input class="submitBtn" type="submit" value="Save"></div>
	</div>
	</form>

	<div id="listPane">
	</div>
	<div style="clear:both;"></div>
</div>

</body>
</html>