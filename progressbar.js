/*
	Dileep Singh(https://node-tricks.com)

	progressbar
	September 2017

	An extremely tiny Javascript + CSS progress bar

	License	:	MIT License
*/

function progressbar(target) {
	// default values
	var min = 0.0, max = 200.0, val=min, mode="percentage", v = "";

	// _____
	// add class
	target.className = target.className + " progressbar";

	// insert the coloured bg
	var bar = document.createElement("span");
	bar.className = "bar";
	target.appendChild(bar);

	// insert value place holder
	var barvalue = document.createElement("span");
	barvalue.className = "value";
	barvalue.innerHTML = "&nbsp;"
	target.appendChild(barvalue);

	// ___
	// render the progress values on the bar
	function renderProgress(val, perc, message) {
		bar.style.width = perc + "%";

		var display = null;
		if(mode == "percentage") {
			display = perc + "%";
		} else {
			display = val + " / " + max;
		}

		if(message) {
			display += " " + message;
		}

		barvalue.innerHTML = display;
	}

	// clamp a value to the boundaries of a min and max
	function clamp(val, min, max) {
		return Math.min(Math.max(val, min), max);
	}

	// ___ public methods
	// set values
	this.setMinMax = function(omin, omax) {
		min = omin;
		max = omax;
	};

	// set absolute number display or percentage
	this.setMode = function(omode) {
		if(omode == "absolute" || omode == "percentage") {
			mode = omode;
		}
		this.progress(val);
	}

	// progress the target
	this.progress = function(nval, message) {
		val = clamp(parseFloat(nval), min, max);

		var perc = ((val - min) / (max - min)) * 100.0;
		renderProgress(parseFloat(val.toFixed(2)), Math.floor(perc), message);

		return parseFloat(perc.toFixed(2));
	}

	// reset the bar
	this.reset = function() {
		this.progress(min);
	}

	// _________________________________
	// see if values are specified in data attributes
	v = target.getAttribute("data-min");
	min = v ? parseFloat(v) : min;

	v = target.getAttribute("data-max");
	max = v ? parseFloat(v) : max;

	// mode
	v = target.getAttribute("data-mode");
	if(v) {
		this.setMode(v);
	}

	// initialise with min
	this.reset();

	return this;
};