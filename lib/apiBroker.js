module.exports = function (httpsync) {
	ApiBroker = { hostname: null };

	ApiBroker.getVersionInfo = function(options) {
		optionsString = JSON.stringify(options);
		console.log(ApiBroker.hostname);
		var requestOptions = {
			url: ApiBroker.hostname + '/api/require',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Content-Length': optionsString.length
			}
		};

		var req = httpsync.request(requestOptions);

		// write data to request body
		req.write(optionsString);

		return JSON.parse(req.end().data.toString());
	};

	ApiBroker.setHostname = function(hostname) {
		ApiBroker.hostname = hostname;
	};

	return ApiBroker;
}
