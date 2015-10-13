var bulletinApp = angular.module('bulletinApp', ['ngRoute']);



bulletinApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider.
        when('/' , {
            templateUrl: 'templates/login.html',
            controller: 'boardCntrl'
        }).
        when('/board', {
            templateUrl: 'templates/board.html',
            controller: 'boardCntrl'
        })
    }]);




/**     Controllers    **/


bulletinApp.controller('bulletinCntrl', function ($scope, $rootScope, $http, $location) {
    
    $scope.users = {};

    $scope.calendar = {
        value : moment()
    }
    
    $scope.getDateFormat = function () {
        
        if (!$scope.calendar.value)
            return null;
        
        // if format already exists. return calendar.value


        return moment($scope.calendar.value).format("DD/MM/YYYY");
    }

    $scope.changeDate = function () {
        console.log('changeDate - moment($scope.calendar.value).format("DD/MM/YYYY") : ', moment($scope.calendar.value).format("DD/MM/YYYY"));
        
        updatedData($scope.getDateFormat());
    }
    
    //Changing the URL path
    $scope.changeURL = function (url) {
        $location.path(url);
    };
    
    $(document).ready(function () {
        
        /* API CALL  */
        
        //getting all users with their logs -- UPDATED
        console.log('Document ready date: ', $scope.getDateFormat());
        updatedData($scope.getDateFormat());
    });

    var updatedData = function (updatedDate) {
        $http.post(window.location.origin + '/api/getupdatedData', { date : updatedDate }).
            success(function (data, status, headers, config) {
            if (data == null) {
                console.log('(getupdatedData == null)', data);
            } else {
                console.log('(getupdatedData != null in api/getupdatedData)', data);
                $scope.users = data;
            }

        }).
            error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('Error : data', data);
            console.log('Error : status', status);
            console.log('Error : headers', headers);
            console.log('Error : config', config);
                            // Redirect user back to login page
                            //$location.path('signup');
        });
    }
    
    $scope.pass = '';

    //Checking password for enterence
    $scope.checkPassword = function (password) {
        if (password == '123')
            $scope.changeURL('board');
    };

});



/*************************  Logs    ********************************/

var logsApp = angular.module('logsApp', ['ngRoute']);

logsApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider.
        when('/' , {
            templateUrl: 'index.html',
            controller: 'logsCntrl'
        })
    }]);

logsApp.controller('logsCntrl', function ($scope, $rootScope, $http, $location) {
    
    $scope.logs = {};

    $(document).ready(function () {
        
        //getting all users with their logs -- UPDATED
        console.log('Document ready : ');

        $http.post(window.location.origin + '/api/getLog').
            success(function (data, status, headers, config) {
            if (data == null) {
                console.log('(getLog == null)', data);
            } else {
                console.log('(getLog != null in api/getLog)', data);
                $scope.logs = data;
                angular.forEach($scope.logs, function (log) {
                    log.dateCreated = $scope.convertTimestampToDate(log.dateCreated);
                    //log.userId = log.userId.populate;
                });
            }

        }).
            error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('Error : data', data);
            console.log('Error : status', status);
            console.log('Error : headers', headers);
            console.log('Error : config', config);
                            // Redirect user back to login page
                            //$location.path('signup');
        });
        
    });

    //Convert time stamp from DB to humen date
    $scope.convertTimestampToDate = function (timestamp) {
        var theDate = new Date(timestamp * 1000);
        var dateString = theDate.toGMTString();
        console.log('Inside convert : date.prototype.toDateString()', dateString);

        return dateString;//=> Example [2011/3/25 - 23:0:0]
    }

    
});