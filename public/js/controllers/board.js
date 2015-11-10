

bulletinApp


//main page (board) controller
.controller('boardCntrl', function ($scope, $rootScope, $http, $location) {
    
    $scope.$watch('$parent.users', function (n,o) { 
        $scope.users = $scope.$parent.users;
    });
    
    
    $scope.statusEnum = [
        {
            name: "empty",
            displayName: "--",
            width: "0"
        },
        {
            name: "lateArrival",
            displayName: "Late Arrival",
            width: "25"
        },
        {
            name: "1HalfDayOff",
            displayName: "1st Half Day Off",
            width: "50"
        },
        {
            name: "2HalfDayOff",
            displayName: "2nd Half Day Off",
            width: "50"
        },
        {
            name: "leavingEarly",
            displayName: "Leaving Early",
            width: "25"
        },
        {
            name: "notWorking",
            displayName: "Not Working",
            width: "100"
        },
        {
            name: "vacation",
            displayName: "Vacation",
            width: "100"
        },
        {
            name: "workingFromHome",
            displayName: "Working From Home",
            width: "100"
        },
        {
            name: "sick",
            displayName: "Sick",
            width: "100"
        },
        {
            name: "other",
            displayName: "Other",
            width: "100"
        }
    ];
    
    
    
    $scope.getEnumWidth = function (name) {
        if (!name)
            return 0;
        
        //updatedData($scope.calendar.value);
        
        for (var i = 0; i < $scope.statusEnum.length; i++) {
            if ($scope.statusEnum[i].name == name) {
                return $scope.statusEnum[i].width;
            }
            
        }
    }

    //Setting the float of the selected option    
    $scope.setFloat = function (select) {
        
        if (select == '1HalfDayOff' || select == '2HalfDayOff' || select == 'leavingEarly')
            return select == '1HalfDayOff' ? 'left' : 'right';
        
        return 'none';

    }

    
    //Changing users status (Leave early/1st half of the day/etc)
    $scope.selectedStatus = function (statusName, user) {
        
        //Enter only if user changes his selection
        console.log('statusName: ', statusName);
        console.log('user: ',user);
        console.log('$scope.getDateFormat(): ', $scope.$parent.getDateFormat());
            

        var log = {
            status : statusName,
            date : $scope.$parent.getDateFormat(),
            userId : user
        }

        $http.post(window.location.origin + '/api/addLog', { logToBeSent : log }).
            success(function (data, status, headers, config) {
            if (data == null) {
                console.log('(addLog == null)', data);
            } else {
                console.log('(addLog != null in api/addLog)', data);
            }

        }).
            error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('Error : data', data);
            console.log('Error : status', status);
            console.log('Error : headers', headers);
            console.log('Error : config', config);
        });
    }
    
    $scope.getNotWorkingWidth = function (userSelectedOption){
        if (userSelectedOption != 'notWroking')
            return;
        return 75;
    }
    
    //Randomaly chaning border color
    $scope.getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    
})
