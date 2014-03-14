var expect = require('chai').expect;
var sinon = require('sinon');
var mock = sinon.mock;

describe('Initr', function() {
	var Initr, fs, cli, childProcess, initr, mockJSON;

	setup(function() {
		Initr = require('../lib/initr.js');
		fs = require('fs');
		cli = require('cli');
		childProcess = require('child_process');
		initr = Initr(fs, cli, childProcess);

		mockJSON = {
			"commands": [
				"ln -s bower_components/jquery/js/jquery.js public/js/jquery.js"
			],
			"scripts": [
				"init/startup.sh",
				"https://github.com/rtablada/initr/tree/master/tests/test.sh"
			],
			"require": {
				"rtablada/gumby": "*"
			}
		};
	});

	describe('getConfigOptions()', function() {
		it('should return standard json parsed config file', function() {
			fsMock = mock(fs);
			fsMock.expects('existsSync').once().returns(true);
			fsMock.expects('readFileSync').once().withArgs('initr.json').returns(JSON.stringify(mockJSON));

			options = initr.getConfigOptions();

			assert.equal(mockJSON, options);
			fsMock.verify();
		});
	});

});
