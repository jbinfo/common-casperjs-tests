try {
	var casper = require('casper').create();
}
catch (e) {
	casper.log('This script requires casperjs (http://casperjs.org)', 'error');
	casper.exit();
}

// Just a function for importing another .js file as a module, fetching a given
// array from its exports, and checking it contains anything.
function importModuleArray(moduleName, arrayName) {
	var jsName = '`' + moduleName + '.js`';
	var imported;

	try {
		imported = require(moduleName);
	}
	catch (e) {
		casper.log('Could not find the file ' + jsName, 'error');
		casper.exit();
	}

	var array = imported[arrayName];

	if (array === undefined) {
		casper.log('Found no array in `' + jsName, 'error');
		casper.exit();
	}

	if (array.length > 0) {
		casper.log('Found ' + array.length + ' item' + (array.length > 1 ? 's' : '') + ' in ' + jsName);
	}
	else {
		casper.log('The array of urls in ' + jsName + ' is empty', 'error');
		casper.exit();
	}

	return imported;
}

var tests = importModuleArray('tests', 'functions');
var sites = importModuleArray('sites', 'urls');

casper.start();

// TODO: Spider each page to include all children recursively.
casper.each(sites.urls, function (self, url) {
	casper.thenOpen(url, function () {
		// Wait for a while to make sure resources have a chance to load.
		// TODO: This is a bit to dumb, make smarter.
		casper.wait(5000);
		casper.log('Starting testing of ' + url);
		// Loop through all available tests and run them on the page.
		casper.each(tests.functions, function (self, fn) {
			casper.then(function (page) {
				// Execute the test function with casper as `this` and the
				// current page object as parameter.
				fn.call(this, page);
			});
		});
	});
});

casper.run();
