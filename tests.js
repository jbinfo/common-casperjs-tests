function logError(casper, errorString) {
	casper.log('Found an error on ' + casper.getCurrentUrl() + ':\n' + errorString, 'error');
}

// List of the test functions to run on each site. The value of `this` will
// always be the global casper object.
exports.functions = [

	// Make sure the page is available and returns HTTP status OK.
	function (page) {
		if (page.status !== 200) {
			logError(this, 'Status code !== 200');
		}
	},

	// Check for any JavaScript errors.
	function () {
		this.on('page.error', function (message) {
			logError(this, 'JavaScript error: ' + message);
		});
	},

	// Check that all resources load properly.
	function () {
		this.on('resource.error', function (error) {
			logError(this, 'Could not load resource `' + error.url + '`: ' + error.errorString);
		});
	}

	// TODO: Add more tests.

];
