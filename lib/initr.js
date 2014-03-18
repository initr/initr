module.exports = function (fs, cli, childProcess, asyncblock, sys, broker) {
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
		childProcess.exec(command, function(error, stdout, stderr) {
			passToConsole(error, stdout, stderr);

			if (callback) {
				callback();
			}
		});

		return true;
	};

	Initr.runScript = function (scriptPath, callback) {
		var command;

		if (scriptPath.indexOf('http') == 0) {
			command = "curl " + scriptPath + " | sh";
		} else {
			if (fs.existsSync(scriptPath)) {
				command = "sh " + scriptPath;
			}
		}

		childProcess.exec(command, function(error, stdout, stderr) {
			passToConsole(error, stdout, stderr);

			if (callback) {
				callback();
			}
		});

		return true;
	};

	Initr.runFromOptions = function (options) {
		options = options ? options : this.options;

		asyncblock(function(flow) {
			if (typeof options.require !== 'undefined') {
				requireResults = broker.getVersionInfo(options);

				if (options.scripts) {
					options.scripts = requireResults.require_scripts.concat(options.scripts);
				} else {
					options.scripts = requireResults.require_scripts;
				}
			}

			if (typeof options.scripts !== 'undefined') {
				console.log(options.scripts);
				for (var i = 0; i < options.scripts.length; i++) {
					Initr.runScript(options.scripts[i], flow.add());

					flow.wait();
				};

				flow.wait();
			}

			if (typeof options.commands !== 'undefined') {
				for (var i = 0; i < options.commands.length; i++) {
					Initr.runCommand(options.commands[i], flow.add());

					flow.wait();
				};
			}
		});
	};

	passToConsole = function (error, stdout, stderr) {
		sys.puts(stdout);
	};

	return Initr;
}
