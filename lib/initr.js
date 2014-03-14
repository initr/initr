module.exports = function (fs, cli, childProcess, asyncblock, sys) {
	passToConsole = function (error, stdout, stderr) {
		sys.puts(stdout);
	};

	return {
		getConfigOptions: function (configPath) {
			configPath = configPath ? configPath : 'initr.json';

			if (fs.existsSync(configPath)) {
				configFile = fs.readFileSync(configPath);

				this.options = JSON.parse(configFile);

				return this.options;
			} else {
				cli.error('Config file could not be found');
				process.exit(0);
			}
		},
		runCommand: function (command) {
			asyncblock(function(flow){
				childProcess.exec(command, function(error, stdout, stderr) {
					flow.add();
					passToConsole(error, stdout, stderr);
				});
				flow.wait();

				return true;
			});
		},
		runScript: function (scriptPath) {
			asyncblock(function(flow){
				if (scriptPath.indexOf('http') == 0) {
					command = "curl " + scriptPath + " | sh";
					childProcess.exec(command, function(error, stdout, stderr) {
						flow.add();
						passToConsole(error, stdout, stderr);
					});
				} else {
					if (fs.existsSync(scriptPath)) {
						command = "sh " + scriptPath;
						childProcess.exec(command, function(error, stdout, stderr) {
							flow.add();
							passToConsole(error, stdout, stderr);
						});
					}
				}

				flow.wait();
			});
		},
		runFromOptions: function (options) {
			options = options ? options : this.options;

			if (typeof options.scripts !== 'undefined') {
				for (var i = 0; i < options.scripts.length; i++) {
					this.runScript(options.scripts[i]);
				};
			}

			if (typeof options.commands !== 'undefined') {
				for (var i = 0; i < options.commands.length; i++) {
					this.runCommand(options.commands[i]);
				};
			}
		}
	}
}
