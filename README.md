common-casperjs-tests
=====================

Run common test on a collection of websites using CasperJS.

About
-----
This is a collection of [CasperJS](http://casperjs.org/) tests that are useful
for any website, such as checking for page status, JavaScript errors, and more.
Simply by adding your websites to an array, all tests will be run for all of
them. Since CasperJS is entirely headless, this test collection can be set up as
a cron job, effectively providing automated light-weight “browser” testing.

Usage
-----
1. Install CasperJS
2. Copy the file `sites.template.js` to `sites.js` and edit it
3. Run `casperjs run.js --verbose`

TODO
----
There are just a few tests right now, since I wanted to get the infrastructure
in place before extending them. The most important improvement to be done is to
recursively check all websites, if a certain flag is passed to the script.
