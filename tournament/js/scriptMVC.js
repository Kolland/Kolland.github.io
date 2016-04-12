'use strict'

function Model (teams) {
	var self = this;

	self.teams = teams;

	self.getToursAndTeams = function (teams) {

		switch(true) {
			case teams == 4 :
				var tours = 2;
				var teams = 4;
				break;

			case teams > 4 && teams <= 8:
				var tours = 3;
				var teams = 8;
				break;

			case teams > 8 && teams <= 16:
				var tours = 4;
				var teams = 16;
				break;

			case teams > 16 && teams <= 32:
				var tours = 5;
				var teams = 32;
				break;

			case teams > 32 && teams <= 64:
				var tours = 6;
				var teams = 64;
				break;

			case teams > 64 && teams <= 128:
				var tours = 7;
				var teams = 128;
				break;

			default: 
				var tours = 0;
				var teams = 0;
				break;
		};

		return {
			tours: tours,
			teams: teams
		};
	};
};


function View (model) {
	self = this;

	self.elements = {
	  title: $('#trnm-name').val(),
	  generateBtn: $('#generate')
	};

	self.generateGrid = function (tours, teams) {

		for (var i = 0; i < tours; i++) {
			
			$('<div>')	.attr('id', 'tour-' + ( i + 1 ))
						.append('<p>')
						.appendTo('body');

		};
	};

	self.renderGrid = function (tours, teams) {
	  var grid = tmpl($('#grid-template').html(), {tours: tours, teams: teams});
	  $('#grid').html(grid);
	}

};

function Controller (model, view) {
	var self = this;
	var generateBtn = $('#generate');

	self.getTeams = function() {
		return $('#team-number').val()
	}

	generateBtn.on('click', function() {

		var tours = model.getToursAndTeams(self.getTeams()).tours;
		var teams = model.getToursAndTeams(self.getTeams()).teams;

		view.renderGrid(tours, teams);

	});


};




  var model = new Model();
  var view = new View(model);
  var controller = new Controller(model, view);
 