var i2c = require('i2c-bus');

var i2c_address = 0x60;
var cmd_set_mode = 0x00;
var cmd_set_brightness = 0x19;
var cmd_set_pixels = 0x01;
var mode_5x11 = "00000011";

function scroll() {

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

	var buffer = [];
	var size = 11;

	for (var n=0; n< size; n++) {
	    buffer.push(0);
	}

	var uint = new Uint8Array(buffer.length+1);
	for (var i = 0 ; i < uint.length; i++) {
	    buffer[i]=val;
	    uint[i] = buffer[i];
	}

	// Terminate the block with 0xff.
	uint[uint.length] = 255;

	that.wire.writeI2cBlock(i2c_address, cmd_set_pixels, buffer.length, uint,done);
};

module.exports = scroll;