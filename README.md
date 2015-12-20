# scroll-phat-node
Work-in-progress node.js library for Pimorani's scrollPhat

### Requires:

* Node.js v4.2.3
* Raspberry PI or device with I2c support
* I2c correctly set up and functioning

### Usage:

* npm install
* node app.js

The i2c-bus library will also require a full make/gcc tool-chain to be installed.

### Details

Each of the 11 columns can be written to with binary value between 0 and 31, where 0 is off and 31 is fully on. If you need several pixels to be on at once then you need to work out what this would look like in binary. *I.e. top and bottom = 10001 = 17*

