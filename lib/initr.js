module.exports = function (fs, childProcess) {
	exec = childProcess.exec;

	return {
		getConfigOptions: function () {
			console.log('hey')
		}
	}
}
