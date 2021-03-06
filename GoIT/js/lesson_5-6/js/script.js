var time = 0;
var running = false;
var timer = {
	createElement: function (tagParams) {
		var elem = document.createElement(tagParams.tagName);
		elem.className = tagParams.tagClass;
		elem.innerHTML = tagParams.tagContent;
		tagParams.tagParrent.appendChild(elem);
	}
}
// Bootstrap greed and buttons generation
var body = document.querySelector('body');
body.className = "bg-primary";
for (var i = 0; i < 2; i++) {
	timer.createElement({
	tagName: 'div',
	tagClass: 'row',
	tagContent: '',
	tagParrent: body
})
};
var btnsRow = document.querySelectorAll('.row')[1];
timer.createElement({
	tagName: 'div',
	tagClass: 'col-md-12 h1 text-center counterDisplay',
	tagContent: '00 : 00 : 00 : 00',
	tagParrent: document.querySelectorAll('.row')[0]
});
timer.createElement({
	tagName: 'div',
	tagClass: 'col-xs-2',
	tagContent: '',
	tagParrent: btnsRow
});
timer.createElement({
	tagName: 'div',
	tagClass: 'col-xs-3 btn btn-success startBtn',
	tagContent: '',
	tagParrent: btnsRow
});
timer.createElement({
	tagName: 'h1',
	tagClass: 'h1 startText',
	tagContent: 'Start',
	tagParrent: document.querySelector('.btn-success')
});
timer.createElement({
	tagName: 'div',
	tagClass: 'col-xs-2',
	tagContent: '',
	tagParrent: btnsRow
});
timer.createElement({
	tagName: 'div',
	tagClass: 'col-xs-3 btn btn-danger clearBtn',
	tagContent: '',
	tagParrent: btnsRow
});
timer.createElement({
	tagName: 'h1',
	tagClass: 'h1',
	tagContent: 'Clear',
	tagParrent: document.querySelector('.btn-danger')
});
timer.createElement({
	tagName: 'div',
	tagClass: 'col-xs-2',
	tagContent: '',
	tagParrent: btnsRow
});
var startBtn = document.querySelector('.startBtn');
var clearBtn = document.querySelector('.clearBtn');
var counterDisplay = document.querySelector('.counterDisplay');
counterDisplay.style.fontSize="190px";

var milliseconds = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var timer;
var time;
var millisecondsText;
var secondsText;
var minutesText;
var hoursText;

function displayTimer() {
	// Counter logic
	milliseconds = milliseconds + 1;
	if (milliseconds === 100) {
		seconds++;
	};
	if (milliseconds === 100) {
		milliseconds = 0;
	};
	if (seconds === 60) {
		seconds = 0;
		minutes++;
	};
	if (minutes === 60) {
		minutes = 0;
		hours++;
	};
	// Counter text format
	if (milliseconds < 10) {
		millisecondsText = '0' + milliseconds;
	} else {
		millisecondsText = milliseconds;
		};
	if (seconds < 10) {
		secondsText = '0' + seconds;
	} else {
		secondsText = seconds;
	};
	if (minutes < 10) {
		minutesText = '0' + minutes;
	} else {
		minutesText = minutes;
	};
	if (hours < 10) {
		hoursText = '0' + hours;
	} else {
		hoursText = hours;
	};

	time = hoursText + ' : ' + minutesText + ' : ' + secondsText + ' : ' + millisecondsText;
	counterDisplay.innerHTML = time;
}
var counter = {

	start: function() {
		document.querySelector('.startText').innerHTML = 'Pause';
		timer = setInterval (displayTimer, 10);
		startBtn.removeEventListener ("click", counter.start);
		startBtn.addEventListener ("click", counter.pause);
	},

	pause: function() {
		document.querySelector('.startText').innerHTML = 'Continue';
		clearInterval(timer);
		counterDisplay.innerHTML = time;
		startBtn.removeEventListener ("click", counter.pause);
		startBtn.addEventListener ("click", counter.start);
	},

	reset: function() {
		document.querySelector('.startText').innerHTML = 'Start';
		counterDisplay.innerHTML = '00 : 00 : 00 : 00';
		clearInterval (timer);
		startBtn.removeEventListener ("click", counter.pause);
		startBtn.addEventListener ("click", counter.start);
		milliseconds = 0;
		seconds = 0;
		minutes = 0;
		hours = 0;
	}
}

startBtn.addEventListener ("click", counter.start);
clearBtn.addEventListener ("click", counter.reset);




