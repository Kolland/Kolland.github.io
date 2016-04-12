$(document).ready(function() { 

	var tournament = {};
	var toursGen = [];

	function getToursAndTeams () {
		var tours = 0;
		var teams = 0;

		switch(true) {
			case tournament.teamsCount == 4 :
				var tours = 2;
				var teams = 4;
				break;

			case tournament.teamsCount > 4 && tournament.teamsCount <= 8:
				var tours = 3;
				var teams = 8;
				break;

			case tournament.teamsCount > 8 && tournament.teamsCount <= 16:
				var tours = 4;
				var teams = 16;
				break;

			case tournament.teamsCount > 16 && tournament.teamsCount <= 32:
				var tours = 5;
				var teams = 32;
				break;

			case tournament.teamsCount > 32 && tournament.teamsCount <= 64:
				var tours = 6;
				var teams = 64;
				break;

			case tournament.teamsCount > 64 && tournament.teamsCount <= 128:
				var tours = 7;
				var teams = 128;
				break;

			default: 
				break;
		};

		return {
			tours: tours,
			teams: teams
		};
	};

	function tourGen () {

		var teams = tournament.teams

		for (var i = 0; i < tournament.tours; i++) {

			teams/=2;

			toursGen.push(
				{	
					title: 'Tour ' + (i + 1),
					matches: teams
				}
			)
		};
	}

	$('#generate').on('click', function() {
		toursGen.length = 0;

		tournament.title = $( '#trnm-name' ).val()
		tournament.teamsCount = $( '#team-number' ).val();
		tournament.tours = getToursAndTeams().tours;
		tournament.teams = getToursAndTeams().teams;

		tourGen()

		console.log(toursGen);

		for (var i = 0; i < tournament.tours; i++) {
			
			$('<div>').attr('id', 'tour-' + ( i + 1 ))
						.append()
						.appendTo('body');

		};

	});

	var mode = $('input[name=trnm-mode]:radio:checked').val()
	if (mode == 'single') {};

});