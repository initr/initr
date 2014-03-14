Initr
---

[![Build Status](https://travis-ci.org/initr/initr.png?branch=master)](https://travis-ci.org/initr/initr)

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

Installing Locally
===

If you are developing on initr, you will likely want to run the development version of initr for manual testing.
To do this, from your cloned initr directory, just run `npm link` and you will now have a global symlink to your development version of initr.

Running the Tests.
===

To run the tests, first run `npm install` and then `npm test` will run the test suite.

License
===

The MIT License (MIT)

Copyright (c) 2014 Ryan Tablada

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
