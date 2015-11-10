logsApp.filter('datePicker', function () {
    return function (logs, date1, date2) {
        console.log("logs:", logs);
        
        
        date1 = moment(date1).format("DD/MM/YYYY");
        date2 = moment(date2).format("DD/MM/YYYY");
        
        console.log("date1:", date1);
        console.log("date2:", date2);
        
        var filtered = [];
        
        if ((date1 === null || date1 === '') || (date2 === null || date2 === '') ) {
            return logs;
        }
        
        angular.forEach(logs, function (log) {
            if ((log.date >= date1) & (log.date <= date2)) {
                filtered.push(log);
            }
        });
        
        return filtered;
    };
});