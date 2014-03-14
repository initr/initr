Initr
---

Installing initr
===

Installing initr is as easy as running `npm install -g initr`.

Running initr
===

Currently, you can run initr by simply running `initr` in a terminal.
By default initr reads your configuration from `initr.json` although you can change this by passing the flag `--configPath` and specifying your JSON file.

initr.json Schema
===

Your initr.json file can specify script files to run and raw command strings to run.
The listed script files are always run before your string commands.
The file looks like this:

```json
	{
		"commands": [
			"sleep 2 && echo 'hello world'",
			"echo 'hello world 2'"
		],
		"scripts": [
			"test.sh"
		]
	}

```

Running the Tests.
===

To run the tests, first run `npm install` and then `npm test` will run the test suite.
