<!DOCTYPE HTML>

<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>ADMIN POS</title>
    <link rel="stylesheet" href="../css/ionicons.css">

	<style>
		html, body {
			margin: 0;
			padding: 0;
			height: 100%;
		}
	
		div, iframe {
			margin: 0;
			padding: 0;
			border: 0;
		}
	
		.container {
			position: relative;
			width: 100%;
			height: 100%;
			background: #222;
		}
		
		.left-container {
			position: absolute;
			/*height: 50px;*/
			left: 0px;
			top: 0px;
			bottom: 0;
			width: 200px;
			background: #fff;
		}
		
		.left-container iframe {
			position: absolute;
			width: 100%;
			height: 100%;
		}
		
		.right-container {
			position: absolute;
			/*height: 50px;*/
			left: 200px;
			top: 0px;
			bottom: 0;
			right: 0;
			/*width: 100%;*/
			background: #555;
			overflow-y: hidden;
		}
	
		.right-container iframe {
			position: absolute;
			width: 100%;
			height: 100%;
		}
		
		
		
	</style>
</head>

<body>
	<div class="container">
		<div class="left-container">
			<iframe src="master/dsp_masterpos.cfm" frameborder="0">Your browser is kaput!</iframe>
		</div>
		
		<div class="right-container">
			<iframe src="../../crm_final/chart_r1/index.cfm?thispagenumber=1" frameborder="0">Your browser is kaput!</iframe>
		</div>
	</div>
</body>
</html>
