module.exports = function (fs, cli, childProcess, asyncblock) {
	return {
		getConfigOptions: function (configPath) {
			configPath = configPath ? configPath : 'initr.json';

			if (fs.existsSync(configPath)) {
				configFile = fs.readFileSync(configPath);

				return JSON.parse(configFile);
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
		}
	}
}
