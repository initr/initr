module.exports = function (fs, childProcess) {
	exec = childProcess.exec;

	return {
		getConfigOptions: function (configPath) {
			configPath = configPath ? configPath : 'init.json';

			console.log(configPath);
		}
	}
}
