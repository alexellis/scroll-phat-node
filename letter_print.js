var async = require('async');

var scroll = require('./scroll');
var scroller = new scroll();
scroller.initialize(function(openErr) {
	if(openErr) {
		return console.error("Can't open i2c.");
	}

	scroller.setBrightness(3, function () {
		async.series([
		 function(cb) {
		   setTimeout(function() {
		      scroller.clearPixels();
		      scroller.refresh();
		      scroller.setText("O");
                      scroller.refresh();
		      cb();
		   }, 500);
		 },
		 function(cb) {
		   setTimeout(function() {
		      scroller.clearPixels();
		      scroller.refresh();
		      scroller.setText("M");
                      scroller.refresh();
		      cb();
		   }, 500);
		 }
		]);
	});
});
