var scroll = require('./scroll');

var scroller = new scroll();
scroller.initialize(function() {

	for(var i =0; i< 11;i++) {
		scroller.setPixel(i, i%5);
	}

	scroller.setBrightness(10, function() {
		scroller.setBrightness(3, function() {
			scroller.writeNumber(17, function (){
				console.log("Top and bottom row lit (10001) = 17");
			})
		});
	});
});