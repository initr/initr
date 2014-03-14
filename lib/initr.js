module.exports = function (fs, cli, childProcess) {
	exec = childProcess.exec;

	return {
		getConfigOptions: function (configPath) {
			configPath = configPath ? configPath : 'init.json';

			if (fs.existsSync(configPath)) {
				configFile = fs.readFileSync(configPath);

				return JSON.parse(configPath);
			} else {
				cli.error('Config file could not be found');
			}
		}
	}
}
