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
		sys = require('sys');
		initr = Initr(fs, cli, childProcess, asyncblock, sys);

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
		var fsMock;

		setup(function() {
			fsMock = mock(fs);
			fsMock.expects('existsSync').once().returns(true);
		});

		test('should return object from default JSON file', function() {
			fsMock.expects('readFileSync').once().withArgs('initr.json').returns(JSON.stringify(mockJSON));

			options = initr.getConfigOptions();

			expect(JSON.stringify(options)).equal(JSON.stringify(mockJSON));
		});

		test('should return object from specified JSON file', function() {
			fsMock.expects('readFileSync').once().withArgs('testfile.json').returns(JSON.stringify(mockJSON));

			options = initr.getConfigOptions('testfile.json');

			expect(JSON.stringify(options)).equal(JSON.stringify(mockJSON));
		});

		teardown(function() {
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

	suite('runScript()', function() {
		var fsMock, childProcessMock;

		setup(function() {
			fsMock = mock(fs);
			fsMock.expects('existsSync').returns(true);
			childProcessMock = mock(childProcess);
		});

		test('should run sh on local file', function() {
			childProcessMock.expects('exec').withArgs('sh ' + mockJSON.scripts[0]).once().returns(true);

			initr.runScript(mockJSON.scripts[0]);
		});

		test('should curl if file is http or https', function() {
			childProcessMock.expects('exec').withArgs('curl ' + mockJSON.scripts[1] + ' | sh').once().returns(true);

			initr.runScript(mockJSON.scripts[1]);
		});

		teardown(function() {
			childProcessMock.verify();
			fsMock.restore();
		});
	});

	suite('runFromOptions()', function() {
		var initrMock;

		setup(function() {
			initrMock = mock(initr);
		});

		test('should call runScript() for each script', function() {
			var testFilePath = 'file.md';
			initrMock.expects('runScript').once().withArgs(testFilePath).returns(true);

			initr.runFromOptions({scripts: [testFilePath]});
		});

		test('should call runCommand() for each script', function() {
			var testCommand = 'echo \'command\'';
			initrMock.expects('runCommand').once().withArgs(testCommand).returns(true);

			initr.runFromOptions({commands: [testCommand]});
		});

		teardown(function() {
			initrMock.verify();
		});
	});

});
