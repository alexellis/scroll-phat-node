var i2c = require('i2c-bus');

var i2c_address = 0x60;
var cmd_set_mode = 0x00;
var cmd_set_brightness = 0x19;
var cmd_set_pixels = 0x01;
var mode_5x11 = "00000011";
var total_lines = 11;
var line_length = 5;

// Terminate the block with 0xff.
var end_marker = 255;

function scroll() {
	this.buffer = new Uint8Array(total_lines + 1);
	for(var n = 0;n<total_lines; n++) {
		this.buffer[n] = 0;
	}
	this.buffer[this.buffer.length] = end_marker;
}

scroll.prototype.initialize = function(done) {
	var that = this;
	that.wire = i2c.open(1, function(err) {
		that.wire.writeByte(i2c_address, cmd_set_mode, parseInt(mode_5x11, 2), function(){
			done(err);
		});
	});
};

scroll.prototype.setBrightness=function(val, done) {
	var that = this;

	that.wire.writeByte(i2c_address, cmd_set_brightness, Number(val), function(err) {
		done(err);
	});
};

scroll.prototype.refresh = function(done) {
	var that = this;

	var buffer = that.buffer;
	console.log(buffer)
	var callback = done ? done : that.refreshDone;

	that.wire.writeI2cBlock(i2c_address, cmd_set_pixels, buffer.length, buffer, callback);
};

scroll.prototype.refreshDone = function() {

}
scroll.prototype.clearPixels = function() {
	var that = this;
	for (var i = 0; i < this.buffer.length; i++) {
		this.buffer[i] = 0;
	};
};

scroll.prototype.setPixel = function(x, y, value) {
	var that = this;
	if(value) {
 	   that.buffer[x] |= (1 << y)
	} else {
 	   that.buffer[x] &= ~(1 << y)
	}
};

scroll.prototype.close = function() {
	var that = this;
	that.wire.closeSync();
};

module.exports = scroll;
