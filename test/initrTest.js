var expect = require('chai').expect;
var sinon = require('sinon');
var mock = sinon.mock;

suite('Initr', function() {
	var Initr, fs, cli, childProcess, initr, mockJSON;

	setup(function() {
		Initr = require('../lib/initr.js');
		fs = require('fs');
		cli = require('cli');
		childProcess = require('child_process');
		asyncblock = require('asyncblock');
		initr = Initr(fs, cli, childProcess, asyncblock);

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

	suite('getConfigOptions()', function() {
		test('should return object from default JSON file', function() {
			var fsMock = mock(fs);
			fsMock.expects('existsSync').once().returns(true);
			fsMock.expects('readFileSync').once().withArgs('initr.json').returns(JSON.stringify(mockJSON));

			options = initr.getConfigOptions();

			expect(JSON.stringify(options)).equal(JSON.stringify(mockJSON));
			fsMock.verify();
		});

		test('should return object from specified JSON file', function() {
			var fsMock = mock(fs);
			fsMock.expects('existsSync').once().returns(true);
			fsMock.expects('readFileSync').once().withArgs('testfile.json').returns(JSON.stringify(mockJSON));

			options = initr.getConfigOptions('testfile.json');

			expect(JSON.stringify(options)).equal(JSON.stringify(mockJSON));
			fsMock.verify();
		});
	});

	suite('runCommand()', function() {
		test('should run a single command when we call runCommand()', function() {
			var childProcessMock = mock(childProcess);
			childProcessMock.expects('exec').withArgs(mockJSON.commands[0]).once().returns(true);

			initr.runCommand(mockJSON.commands[0]);

			childProcessMock.verify();
		});
	});

});
