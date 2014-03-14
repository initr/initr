module.exports = function (fs, cli, childProcess, asyncblock) {
	return {
		getConfigOptions: function (configPath) {
			configPath = configPath ? configPath : 'initr.json';

			if (fs.existsSync(configPath)) {
				configFile = fs.readFileSync(configPath);

				this.options = JSON.parse(configFile);

				return this.options;
			} else {
				cli.error('Config file could not be found');
			}
		},
		runCommand: function (command) {
			asyncblock(function(flow){
				childProcess.exec(command, function() {
					flow.add()
				});
				flow.wait();

				return true;
			});
		},
		runScript: function (scriptPath) {
			if (scriptPath.indexOf('http') == 0) {
				command = "curl " + scriptPath + " | sh";
				childProcess.exec(command, function() {
					flow.add()
				});
			} else {
				if (fs.existsSync(scriptPath)) {
					command = "sh " + scriptPath;
					childProcess.exec(command, function() {
						flow.add()
					});
				}
			}
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
