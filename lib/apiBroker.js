module.exports = function (httpsync, cli) {
	ApiBroker = { hostname: null };

	ApiBroker.isJsonString = function (str) {
	    try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
	    return true;
	}

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
		body = req.end().data.toString();

		if (ApiBroker.isJsonString(body)) {
			return JSON.parse(body);
		} else {
			cli.error('There was an issue with the server reponse.');
			process.exit();
		}
	};

	ApiBroker.setHostname = function(hostname) {
		ApiBroker.hostname = hostname;
	};

	return ApiBroker;
}
