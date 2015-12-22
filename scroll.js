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

		done();
	});
};

scroll.prototype.setBrightness=function(val, done) {
	var that = this;

	that.wire.writeByte(i2c_address, cmd_set_brightness, Number(val), function(err) {
		done(err);
	});
};

scroll.prototype.writeNumber = function(val, done) {
	var that = this;

	var buffer = that.buffer;
	console.log(buffer)
	that.wire.writeI2cBlock(i2c_address, cmd_set_pixels, buffer.length, buffer, done);
};

scroll.prototype.setPixel=function(x, y) {
	var that = this;

    that.buffer[x] |= (1 << y)

//	that.buffer[x] =y;
}


module.exports = scroll;