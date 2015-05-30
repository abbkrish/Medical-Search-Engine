var Browser = require('zombie');
var fs = require('fs');
var q = require('q');

browser = new Browser();
browser.runScripts = false;

var contents = [];
var promises = [];
var urls = [];
var pages = ['definition', 'symptoms', 'causes', 'treatment']

var bV = function (url) {
    var defer = q.defer();
    browser.visit(url).then(function() {
        console.log("##################################################################");
        //console.log(url);
        //console.log(e);
        browser.wait(3000, function() {
            console.log(browser.location.href);
            defer.makeNodeResolver();
        });
        //console.log(browser.html("#main-content"));
    });
    return defer.promise;
};

var readContents = function() {
    var defer = q.defer();
    contents = fs.readFileSync('./dump_links.txt').toString().split("\n");
    defer.resolve();
    return defer.promise;
};

var finishUp = function (){
    browser.close();
};

var farmUrls = function(i) {
    var url = contents[i];
    //urls = [];
    var lead = url.split('definition')[0];
    var tail = url.split('definition')[1];
    for(var k in pages) {
        urls.push(lead+pages[k]+tail);
    }
};

var pullData = function(num, callback) {
    var toDump = browser.html("#main-content");
    console.log("##################################################################");
    //console.log(browser.location.href);
    //console.log(toDump);
    callback();
};

var goTo = function() {
    var promises = [];
    var promises2 = [];
    var deferOut = q.defer();

    /*

    var j = function(i) {
        promises = [];
        var deferIn = q.defer();
        farmUrls(i);
        flag = 0;
        for (var m in urls) {
            var defer_two = q.defer();
            promises.push(defer_two.promise);
            var k = urls[m];
            //console.log(k);
            bV(k).done(function() {
                //console.log(browser.location.href);
                //pullData(m, defer_two.makeNodeResolver());
            });
        }
    };

    var k = function(lower, upper) {
        var defer = q.defer();
        for (var i in contents) {
            if(i > lower && i < upper) {
                j(i);
            }
        }
        q.allSettled(promises).then(function(results) {
            defer.resolve();
        });
        return defer.promise;
    };

    var t = function(callback) {
        var len = contents.length;
        var lower = 0;
        k(lower, len-1).done(function() {
            callback();
        });
    }

    t(deferOut.makeNodeResolver());
    */

    var consoleDump = function(url, callback) {
        console.log("##################################################################");
        console.log(url);
        console.log(browser.html("#main-content"));
        callback();
    };

    var j = function(promise) {
        //console.log(urls);
        if (!urls.length) {
            if(promise)
                promise.resolve();
            return; // W're done!
        }

        var url = urls.pop();
        //console.log(url);
        browser.visit(url, function () {
            consoleDump(url, function() {
                process.nextTick(j);
            });
            // yada yada
        });
        /*
        for(var url in urls) {
            console.log(urls[url]);
            var tmp = new Browser();
            tmp.runScripts = false;
            var ko = urls[url];
            tmp.visit(ko, function(e, bowser, status) {
                //console.log(contents[m]);
                //console.log(e);
                //console.log(tmp);
                console.log("##################################################################");
                console.log(tmp.location.href);
                try{
                    //console.log(tmp.html("#main-content"));
                }
                catch(e){
                    console.log("err");
                    console.log(tmp.location.href);
                }
                //tmp.close();
            });
            console.log(ko);
        }
        */
        //callback();
    };

    var k = function(lower, upper, callback) {
        //var defer = q.defer();
        for (var i in contents) {
            if(i >= lower && i < upper) {
                var defer_two = q.defer();
                promises.push(defer_two);
                farmUrls(i);
                j(defer_two);
                //j(i, defer_two.makeNodeResolver);
            }
        }
        q.allSettled(promises).then(function(results) {
            //console.log('please');
            //defer.resolve();
            callback();
        });
        //return defer.promise;
    };

    var t = function(callback) {
        var f = 0;
        var m = 0;
        //for(var i = 0; i < 20; i+=20) {
        cap = parseInt(process.argv[2]);
        var defer = q.defer();
        promises2.push(defer);
        k(cap, cap+2, defer.makeNodeResolver());
        q.allSettled(promises2).then(function(results) {
            //console.log(m);
            callback();
        });
        //console.log(m);
        //}
        //}
    };
    /*
    for (var m in contents) {
        if(m < 20) {
            var defer_two = q.defer();
            promises.push(defer_two.promise);
            k(m, defer_two.makeNodeResolver());
        }
    }
    */

    /*
    q.allSettled(promises).then(function(results) {
        deferOut.resolve();
    });
    */
    t(deferOut.makeNodeResolver());
    return deferOut.promise;
};

var combine = function () {
    readContents().done(function() {
        goTo().done(function() {
            //finishUp();
        });
    }, function() {
        console.log('err');
    });
};


combine();
