var expect = require('chai').expect;
var mockery = require('mockery');

suite('Initr', function() {
	setup(function() {
		mockery.enable();

		var Initr = require('../lib/initr.js');
		var fs = require('fs');
		var cli = require('cli');
		var childProcess = require('child_process');
		var initr = Initr(fs, cli, childProcess);
	});

	describe('getConfigOptions()', function() {
		it('should return json parsed config file', function() {

		});
	});
});
