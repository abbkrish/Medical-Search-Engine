var Browser = require('zombie');
var fs = require('fs');
var q = require("q");

var browser = new Browser();
browser.runScripts = false;
var arr = [];
var arr_depth_two = [];
var startUrl = 'http://www.mayoclinic.org/diseases-conditions';

var bV = function (url) {
    var defer = q.defer();
    browser.visit(url, defer.makeNodeResolver());
    return defer.promise;
};

var bV2 = function (tmp_browser, url) {
    var defer = q.defer();
    tmp_browser.visit(url, defer.makeNodeResolver());
    return defer.promise;
};

var getLinks = function(callback) {
    query = browser.queryAll("ol > li > a");
    arr = [];
    for (var i in query) {
        val = query[i];
        var href = val.href;
        if(href.indexOf('diseases') > -1 && href.indexOf('#') == -1)
            arr.push(href);
    }
    callback();
}

var getLinks2 = function(tmp_browser, callback) {
    //console.log(tmp_browser.location.href);
    query = tmp_browser.queryAll("#index > ol > li > a");
    arr_depth_two = [];
    for (var i in query) {
        console.log(query[i].href);
        arr_depth_two.push(query[i].href);
    }
    callback();
}

var getLetters = function () {
    var defer = q.defer();
    getLinks(defer.makeNodeResolver());
    return defer.promise;
 };

var getSubs = function () {
    var defer = q.defer();
    promises = [];

    var j = function(tmp_browser, i) {
        var defer_two = q.defer();
        var val = 2;
        promises.push(defer_two.promise);
        bV2(tmp_browser, arr[i]).done(function() {
            getLinks2(tmp_browser, defer_two.makeNodeResolver());
            return;
        });
    };

    var k = function() {
        for (var i in arr) {
            tmp_k = new Browser();
            tmp_k.runScripts = false;
            j(tmp_k, i);
        }
        q.allSettled(promises).then(function(results) {
            results.forEach(function (result) {
                if (result.state === "fulfilled") {
                    var value = result.value;
                } else {
                    var reason = result.reason;
                }
            });
            defer.resolve();
        });
    };

    k();

    return defer.promise;
};

var finishUp = function () {
    //console.log('Wrapping up');
    browser.close();
};

var combine = function() {
    bV(startUrl).done(function() {
        getLetters().done(function() {
            getSubs().done(function() {
                //console.log(arr_depth_two);
                finishUp();
            }, function () {
            });
        }, function() {
        });
    }, function() {
        console.log('boo');
        getLetters().done(function() {
            console.log('yay2');
            console.log(arr);
            getSubs().done(function() {
                console.log('yay3');
                console.log(arr_depth_two);
            }, function () {
                console.log('boo3');
            });
        }, function() {
            console.log('boo2');
        });
    });
}

combine();
//var bO = q.nfbind(Browser);
//var bV = q.nfbind(Browser.visit);
//bO.done(function(browser) {

/*
bV(startUrl, { debug: true }).done(function(e, browser) {
    console.log('yay');
}, function(e, browser) {
    console.log('well f..');
    console.log(browser);
});
//});
*/

/*
var bV = q.nbind(Browser.visit);
bV(startUrl, { debug: true }).done(function(e, browser) {
    console.log('yay');
}, function(e, browser) {
    console.log('well f..');
    console.log(e);
    console.log(browser);
});


var readFile = q.nfbind(fs.readFile);

readFile("./Mayo_Parse/dumpFile.txt", "utf-8").done(function (text) {
    console.log('hi');
});
*/

/*
getLetters.done(function(result) {
    console.log('success');
}, function(result) {
        console.log('failed');
});
*/

/*
var arr = [];
browser = new Browser();
browser.visit('http://www.mayoclinic.org/diseases-conditions', function() {
    //var toDump = browser.html("#main-content");
    //console.log(toDump);
    //browser.close();
    query = browser.queryAll("ol > li > a");
    for (var i in query) {
        val = query[i];
        arr.push(val.href);
    }
    for (var i in arr) {
        var arr_depth_two = [];
        if((arr[i].indexOf('diseases') > -1) && arr[i].indexOf('#') == -1) {
            var done = 0;
            browser.visit(arr[i], function() {
                console.log('found something!');
                query = browser.queryAll("ol > li > a");
                for (var i in query) {
                    val = query[i];
                    arr_depth_two.push(val.href);
                }
            });
        }
    }
    browser.close();
});
*/
