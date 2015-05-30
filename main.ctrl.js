angular.module('app').controller("MainController", function($scope, $location, $resource, $routeParams, $http) {
    var vm = this;
    vm.title = 'AngularJS Tut Example';
    vm.searchInput = '';
    vm.shows = [
        {
            title: 'got',
            year: 2011,
            fav: true
        },
        {
            title: 'wd',
            year: 2010,
            fav: false
        },
        {
            title: 'b',
            year: 2013,
            fav: true
        },
        {
            title: 'ga',
            year: 2005,
            fav: false
        }
    ];
    vm.orders = [
    {
        id: 1,
        title: 'Year Ascending',
        key: 'year',
        reverse: false
    },
    {
        id: 2,
        title: 'Year Descending',
        key: 'year',
        reverse: true
    },
    {
        id: 3,
        title: 'Title Ascending',
        key: 'title',
        reverse: false
    },
    {
        id: 4,
        title: 'Title Descending',
        key: 'title',
        reverse: true
    }
    ];
    vm.order = vm.orders[0];
    vm.new = {};
    vm.addShow = function() {
        vm.shows.push(vm.new);
        vm.new = {};
    };

    vm.addShow2 = function() {
        /*
        console.log('xabpu');
        var showDb = $resource("/api/shows/:id", {id: "@_id"});
        var new_show = new showDb({
            title: 'A good Movie',
            year: '2012'
        });

        new_show.$save(function(save_the_show) {
            console.log('saved', save_the_show);
        });
        */
        /*
        $http.put('/api/shows',
            {
                title: 'A good Movie',
                year: 2012
            });
        */
        /*
        showDb.get({title: 'The Hobbit'}, function(show) {
            console.log(show.title);
            vm.title = show.title;
        });
        */
        
    };

    //vm.sampleUser = SampleUser.$get({'title': 'The Hobbit'} );   
    

//});

});
