module.exports = function (fs, cli, childProcess, asyncblock, sys) {
	Initr = {};

	Initr.getConfigOptions = function (configPath) {
		configPath = configPath ? configPath : 'initr.json';

		if (fs.existsSync(configPath)) {
			configFile = fs.readFileSync(configPath);

			this.options = JSON.parse(configFile);

			return this.options;
		} else {
			cli.error('Config file could not be found');
			process.exit(0);
		}
	};

	Initr.runCommand = function (command, callback) {
		asyncblock(function(flow){
			childProcess.exec(command, function(error, stdout, stderr) {
				flow.add();
				passToConsole(error, stdout, stderr);
			});
			flow.wait();

			if (callback) {
				callback();
			}

			return true;
		});
	};

	Initr.runScript = function (scriptPath, callback) {
		asyncblock(function(flow){
			var command;

			if (scriptPath.indexOf('http') == 0) {
				command = "curl " + scriptPath + " | sh";
			} else {
				if (fs.existsSync(scriptPath)) {
					command = "sh " + scriptPath;
				}
			}

			childProcess.exec(command, function(error, stdout, stderr) {
				flow.add();
				passToConsole(error, stdout, stderr);
			});

			flow.wait();

			if (callback) {
				callback();
			}

			return true;
		});
	};

	Initr.runFromOptions = function (options) {
		options = options ? options : this.options;

		if (typeof options.scripts !== 'undefined') {
			for (var i = 0; i < options.scripts.length; i++) {
				asyncblock(function(flow) {
					Initr.runScript(options.scripts[i], function() {
						flow.add();
					});
					flow.wait();
				})
			};
		}

		if (typeof options.commands !== 'undefined') {
			for (var i = 0; i < options.commands.length; i++) {
				asyncblock(function(flow) {
					Initr.runCommand(options.commands[i], function() {
						flow.add();
					});
					flow.wait();
				})
			};
		}
	};

	passToConsole = function (error, stdout, stderr) {
		sys.puts(stdout);
	};

	return Initr;
}
