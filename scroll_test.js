var scroll = require('./scroll');

var scroller = new scroll();
scroller.initialize(function() {
	scroller.setBrightness(10, function() {
		scroller.setBrightness(3, function() {
			scroller.writeNumber(17, function (){
				console.log("Top and bottom row lit (10001) = 17");
			})
		});
	});
});