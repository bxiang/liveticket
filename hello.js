console.log("Hello world!");

var test;
console.log(test);
// var _ = require('./node_modules/lodash/dist/lodash.underscore');
var _ = require('lodash');

var getLatitude = function() {
	return (43 + (_.random(750000, 800000) /1000000)).toPrecision(8);
}

var getLongitude = function() {
	return (-79 - (_.random(360000, 450000) /1000000)).toPrecision(8);
}

for (var i = 0; i < 20; i++) {
	console.log(getLatitude() + ', ' + getLongitude());
};

