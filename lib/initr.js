module.exports = function (fs, cli, childProcess) {
	exec = childProcess.exec;

	return {
		getConfigOptions: function (configPath) {
			configPath = configPath ? configPath : 'initr.json';

			if (fs.existsSync(configPath)) {
				configFile = fs.readFileSync(configPath);

				return JSON.parse(configFile);
			} else {
				cli.error('Config file could not be found');
			}
		}
	}
}
