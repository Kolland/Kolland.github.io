<!DOCTYPE HTML>

<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>WANPOS ADMIN</title>

	<link rel="stylesheet" href="../css/style.css">
	<link rel="stylesheet" href="../css/ionicons.css">

	<script>
		function changeframe(filename){
			frames['contentframe'].location.href = filename;
			//parent.document.itemform.custid.value = custid;
			//parent.document.getElementById('custname').innerHTML = custname;
		}
	</script>
	
</head>

<body>
	<div class="container">
		<!-- HEADER -->
		<div class="toolbar">

			<header>
				<div id="top_left">
					<div id="home">
						<i class="icon ion-ios-home"></i>
					</div>
					<h1>Klientec IBeauty Manager 11</h1>
				</div>

				<div id="top_right">
					<p id="greeting" class="arrow_box">
						Hi, I'm <span>Christine</span>, from MV outlet
					</p>
					<img src="img/actress_small.jpg"/> 
					<a href="##" onclick="show_hide_menu()"><i class="ion-arrow-down-b"></i></a>
				</div>
       
				<div class="clear"></div>
			</header>

		</div>
		<!-- SIDEBAR -->
		<aside class="left_sidebar">

			<ul id="left_sidebar-top">
				<li class="left_sidebar-icons_wrap" title="New Sales" onclick="changeframe('dsp_dashboard.cfm');">
					 <i class="icon ion-social-usd"></i>
				</li>
				<li class="left_sidebar-icons_wrap" title="Activity"  onclick="left_sidebar-top-icons_wrap changeframe('dsp_adminpos.cfm');">
					<i class="icon ion-android-settings"></i>
				</li>
				<li class="left_sidebar-icons_wrap" title="Profile" id="current">
					<i class="icon ion-person"></i>
				</li>
				<li class="left_sidebar-icons_wrap" title="Sales History">
					<i class="icon ion-android-cart"></i>
				</li>
				<li class="left_sidebar-icons_wrap" title="Payment">
					<i class="icon ion-cash"></i>
				</li>
				<li class="left_sidebar-icons_wrap" title="Collection">
					<i class="icon ion-briefcase"></i>
				</li>

			</ul>
			<ul id="left_sidebar-bottom">
				<li class="left_sidebar-icons_wrap" title="Profile" id="current">
					<i class="icon ion-person"></i>
				</li>
				<li class="left_sidebar-icons_wrap" title="Sales History">
					<i class="icon ion-android-cart"></i>
				</li>
				<li class="left_sidebar-icons_wrap" title="Payment">
					<i class="icon ion-cash"></i>
				</li>
				<li class="left_sidebar-icons_wrap" title="Collection">
					<i class="icon ion-briefcase"></i>
				</li>

			</ul>
			
		</aside>
		<!-- CONTENT -->
		<div class="iframe-container">
			<iframe src="" frameborder="0" name="contentframe">Your browser is kaput!</iframe>
		</div>
	</div>
</body>
</html>
