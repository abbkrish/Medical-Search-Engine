var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ngCookies','ui.map', 'ui.event']);

app.config(function ($routeProvider) {
    $routeProvider.when('/showSearch    ', {
        templateUrl: '/show_search.html',
        controller: 'ListCtrl' }).when('/addPost/title/:title/year/:year', {
            templateUrl: '/add_order.html',
            controller: 'AddCtrl'
        }).when('/search/q/:query', {
            templateUrl: '/sparky.html',
            controller: 'SearchHandleCtrl'
        }).when('/recent', {
            templateUrl: '/recent_display.html',
            controller: 'RecentHandleCtrl'
        }).when('/nearby', {
            templateUrl: '/nearby_healthcare.html',
            controller: 'MapCtrl'
        });

});


app.controller('RecentHandleCtrl', RecentHandleCtrl);
app.controller('MapCtrl', MapCtrl)
app.controller('BreadCtrl', BreadCtrl);
app.controller('ModalCtrl', ModalCtrl);
app.controller('SearchCtrl', SearchCtrl);
app.controller('SearchHandleCtrl', SearchHandleCtrl);
app.controller('FormCtrl', FormCtrl);
app.controller('ListCtrl', ListCtrl);
app.controller('AddCtrl', AddCtrl);
app.controller('UpdateCtrl', UpdateCtrl);
app.controller('DeleteCtrl', DeleteCtrl);

app.directive('keyNavigation', function($timeout) {
  return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
            var max = $(".filtered").length;
            if (event.which === 38) {
                scope.searchInput.tto -= 1;
                if(scope.searchInput.tto < 0) {
                    scope.searchInput.tto = max-1;
                    //console.log('meee');
                }
                event.preventDefault();
            }
            if (event.which === 40) {
                scope.searchInput.tto += 1;
                if(scope.searchInput.tto >= max) {
                    scope.searchInput.tto = 0;
                    //console.log('hee');
                }
                event.preventDefault();
            }
            if (event.which === 8) {
                if(scope.searchInput.query.length < 2) {
                    scope.searchInput.tto = -1;
                }
            }
                $('.btk').each(function() {
                    if($(this).attr('id') === ('blk-' + scope.searchInput.tto)) {
                        $(this).css('background-color', '#B2D3D3');
                    }
                    else {
                        $(this).css('background-color', '#32383e');
                    }
                });

        });
    };
});

function MapCtrl ($scope, mySearchInfo) {
        $scope.hideSearch = true;
        $scope.lat = "0";
        $scope.lng = "0";
        $scope.accuracy = "0";
        $scope.error = "";
        $scope.model = { myMap: undefined };
        $scope.myMarkers = [];
        var marker, latlng;

        mySearchInfo.hideButton();


        $scope.showResult = function () {
            return $scope.error == "";
        }

        $scope.mapOptions = {
            center: new google.maps.LatLng($scope.lat, $scope.lng),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };


        $scope.showPosition = function (position) {
            $scope.lat = position.coords.latitude;
            $scope.lng = position.coords.longitude;
            $scope.accuracy = position.coords.accuracy;
            $scope.$apply();

            latlng = new google.maps.LatLng($scope.lat, $scope.lng);
            marker = new google.maps.Marker({ map: $scope.model.myMap, position: latlng})

            $scope.model.myMap.setCenter(latlng);
            //$scope.myMarkers.push(marker);
            setMarker($scope.model.myMap, latlng, "Current Location", "This is your current location");

              var request = {
                location: latlng,
                radius: 1000,
                keyword: ['healthcare', 'hospitals', 'doctors']
            };
                infowindow = new google.maps.InfoWindow();
                var service = new google.maps.places.PlacesService($scope.model.myMap);
                service.nearbySearch(request, callback);
        }

        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
                 }
            }
        }


        function createMarker(place) {
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                 map: $scope.model.myMap,
                 position: place.geometry.location
                });

                google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open($scope.model.myMap, this);
            });
        }




          // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var infoWindow;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                color: 'blue',
            };

            marker = new google.maps.Marker(markerOptions);
            $scope.myMarkers.push(marker); // add marker to array

            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }

        $scope.showError = function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.error = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.error = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    $scope.error = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.error = "An unknown error occurred."
                    break;
            }
            $scope.$apply();
        }



        $scope.getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
            }
            else {
                $scope.error = "Geolocation is not supported by this browser.";
            }
        }

        $scope.getLocation();
    }

app.directive('myMap', function() {

    var lat ="0", lng ="0"; //curr latitudue and longitude

    var mapOptions;
    // directive link function
    var link = function(scope, element, attrs) {
        var map, infoWindow;
        var markers = [];


        // init the map
        var initMap = function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }

        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array

            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }

            var showPosition = function (position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
            var latlng = new google.maps.LatLng(lat,lng);
            var accuracy = position.coords.accuracy;

             // map config
            mapOptions = {
            center: new google.maps.LatLng(lat,lng),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
             };


            initMap();
            console.log(lat,lng);

        }

        var showError = function (error) {
            /*switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.error = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.error = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    $scope.error = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.error = "An unknown error occurred."
                    break;
            }
            $scope.$apply();*/
        }

        var getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            }
            else {
               var error = "Geolocation is not supported by this browser.";
            }
        }

        getLocation();


        // show the map and place some markers
        initMap();

        setMarker(map, new google.maps.LatLng(lat, lng));
        //setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
        //setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
    };

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
});



/* trigger updates from search url change */
app.factory('myUrlInfo', function($rootScope) {
    var urlInfo = {};
    urlInfo.currUrl = '';
    urlInfo.triggerUpdate = function (newUrl) {
        urlInfo.currUrl = newUrl;
        $rootScope.$broadcast('changeUrl');
    }
    return urlInfo;
});

/* trigger search from recents */
app.factory('mySearchInfo', function($rootScope) {
    var searchInfo = {};
    searchInfo.query = '';
    searchInfo.triggerSearch = function (query) {
        searchInfo.query = query;
        $rootScope.$broadcast('doSearch');
    }
    searchInfo.hideButton = function(query) {
        $rootScope.$broadcast('hideSearch');
    }
    return searchInfo;
});

function RecentHandleCtrl($scope, $cookies, $cookieStore, mySearchInfo) {
    $scope.recent_searches = [];
    $scope.hasResult = true;

    //Collapse Result
    $scope.isCollapsed = false;

    mySearchInfo.hideButton();

    /* try to pull cookie and set up vals */
    var currCookie = $cookieStore.get('recent_searches');
    if(currCookie === undefined){
        $scope.hasResult = false;
    }
    else {
        $scope.hasResult = true;
        var splitz = currCookie.split('\n');
        for (var i = 0; i < splitz.length; i++) {
            if ($scope.recent_searches.indexOf(splitz[i]) == -1)
                $scope.recent_searches.push(splitz[i]);
        }
    }

    $scope.doSearch = function (query)  {
        mySearchInfo.triggerSearch(query);
    }
}
function BreadCtrl($scope, $location, myUrlInfo, mySearchInfo) {
    $scope.home=true;
    $scope.tags = [];
    $scope.hideSearch = false;
    /* control breadcrumb displays */
    $scope.$on('changeUrl', function() {
        $scope.tags = [];
        var url = myUrlInfo.currUrl;
        //console.log('emememe');
        var splitz = url.split('/').slice(1);
        for(var i = 0; i < splitz.length; i++) {
            if(splitz[i] !== 'q' && splitz[i] !== 'search') {
                $scope.tags.push(splitz[i]);
            }
        }
    });

    /* recent searches trigger */
    $scope.handleClick = function() {
        $location.path('/recent');
    }
    /*nearby healthcare trigger*/
     $scope.handleClickNearby = function() {
        $location.path('/nearby');
    }

}
function ModalCtrl($scope, $http, $location, myUrlInfo) {
    $scope.modalShow = false;
    $scope.userShow = false;

    /* update breadcrumbs */
    $scope.$on('changeUrl', function() {
        $scope.url = myUrlInfo.currUrl;
    });

    /* show additional buttons */
    $scope.toggleModal = function() {
        $scope.modalShow = !$scope.modalShow;
        $scope.userShow = false;
        console.log('Modal: ' + $scope.modalShow);
    };

    /* show user buttons */
    $scope.toggleUser = function() {
        $scope.userShow = !$scope.userShow;
        $scope.modalShow = false;
        console.log('User: ' + $scope.userShow);
    };
}
function SearchHandleCtrl($scope, $http, $location, $routeParams) {
    $scope.url = '/api/searchList/' + $routeParams.query;

    /* perform api call */
    $http.get($scope.url).
        success(function(data, status, headers, config) {
            if(data.length !== 0) {
                $scope.name = data[0].name;
                $scope.description = (data[0].description == undefined || data[0].description.length == 0)?'NA':data[0].description;
                $scope.symptoms = (data[0].symptoms == undefined || data[0].symptoms.length == 0)?'NA':data[0].symptoms;
                $scope.conditions = (data[0].conditions == undefined || data[0].conditions.length == 0)?'NA':data[0].conditions;
                $scope.treatments = (data[0].treatments == undefined ||data[0].treatments.length == 0)?'NA':data[0].treatments;
                $scope.sources = (data[0].sources == undefined ||data[0].sources.length == 0)?'NA':data[0].sources;

                $scope.updated = data[0].updated;
            }
            else {
                $scope.name = 'Absolutely Nothing.. try searching again?';
                $scope.description = 'NA';
                $scope.symptoms = 'NA';
                $scope.conditions = 'NA';
                $scope.treatments = 'NA';
                $scope.updated = 'NA';
                $scope.sources = 'NA';
            }
        });

    $scope.query = $routeParams.query;
}
function SearchCtrl($scope, $location, $http, $cookies, $cookieStore, myUrlInfo, mySearchInfo) {
    /* read terms */
    $http.get('/term_stash.txt').
        success(function(data, status, headers, config) {
                $scope.potential_terms = data;
        });

    /* do the search */
    $scope.submitSearch = function($event) {
        if($scope.searchInput.tto !== -1 && $scope.searchInput.checkFlag == true) {
            var id_name = '#blk-'+$scope.searchInput.tto;
            $scope.searchInput.query = $(id_name).find("a").text();
        }

        var flag = 0;
        for(var i = 0; i < $scope.potential_terms.length; i++) {
            if($scope.potential_terms[i].name === $scope.searchInput.query) {
                flag = 1;
                break;
            }
        }

        if(flag == 0) {
            return;
        }

        $location.path('/');

        /* update cookie */
        var currCookie = $cookieStore.get('recent_searches');
        var updatedCookie = '';
        if(currCookie !== undefined) {
            var splitz = currCookie.split('\n');
            if(splitz.length === 5) {
                currCookie = splitz.slice(0, 4).join('\n');
            }
            updatedCookie = $scope.searchInput.query + '\n' + currCookie;
        }

        /* new cookie */
        else{
            updatedCookie = $scope.searchInput.query;
        }

        /* store cookie */
        $cookieStore.put('recent_searches', updatedCookie);
        currCookie = $cookieStore.get('recent_searches');

        /* update scope cookie */
        $scope.recent_searches = [];
        var splitz = currCookie.split('\n');
        for (var i = 0; i < splitz.length; i++) {
            $scope.recent_searches.push(splitz[i]);
        }

        /* actual search */
        var pathStr = '/search/q/' + $scope.searchInput.query;
        $location.path(pathStr);
        $scope.searchInput.query = '';
        $scope.searchInput.tto = -1;
        $scope.searchInput.checkFlag = true;
        myUrlInfo.triggerUpdate(pathStr);
    };

    /* initialize search data */
    $scope.searchInput = {
        query: '',
        tto: -1,
        checkFlag: true,
        recent_searches: [],
        hideButton: false
    };

    /* unused? */
    $scope.updateSearch = function($event) {
        $scope.searchInput.query = $event.target.text;
        $scope.searchInput.checkFlag = false;
        $scope.submitSearch();
    }

    /* search from recent */
    $scope.$on('doSearch', function() {
        $scope.searchInput.query = mySearchInfo.query;
        $scope.searchInput.checkFlag = true;
        $scope.submitSearch();
    });

    $scope.$on('hideSearch', function() {
        $scope.searchInput.hideSearch = true;
    });

}
function FormCtrl($scope, $location) {
    $scope.showForm = false;
    $scope.blockCheck = true;
    $scope.toggleForm = function() {
        $scope.showForm = !$scope.showForm;
        console.log('ok');
    };
    $scope.submitForm = function() {
        $location.path('/');
        console.log($location.path());
        var pathStr = '/addPost/title/' + $scope.data.title + '/year/' + $scope.data.year;
        $location.path(pathStr);
        $scope.blockCheck = false;
    };
    $scope.data = {
        title:  '',
        year: ''
    }
}
function ListCtrl($scope, $http, $resource, $location) {
    $http.get('/api/searchList').
        success(function(data, status, headers, config) {
            $scope.message = data;
            //$location.path('/');
        });
}

function AddCtrl($scope, $http, $location, $routeParams) {
    console.log($routeParams);
    $scope.data = {
        title:  $routeParams.title,
        year:   $routeParams.year
    };
    if($routeParams.title && $routeParams.year) {
        $http.post('/api/postAdd', $scope.data).
            success(function(data) {
                $scope.message = data;
                //$location.path('/');
            });
    }

}

function UpdateCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.post;
    });

  $scope.editPost = function () {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/readPost/' + $routeParams.id);
      });
  };
}

function DeleteCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });

  $scope.deletePost = function () {
    $http.delete('/api/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}
