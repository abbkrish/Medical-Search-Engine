var Browser = require('zombie');
var fs = require('fs');
var q = require('q');

var browser = new Browser();
browser.runScripts = false;
var contents = [];

var readContents = function() {
    var defer = q.defer();
    contents = fs.readFileSync('./dump_links.txt').toString().split("\n");
    defer.resolve();
    return defer.promise;
};

var consoleDump = function(url) {
    console.log(url);
    console.log(browser.html("#main-content"));
};

//readContents();
url = process.argv[2];
browser.visit(url, function () {
    consoleDump(url);
});
