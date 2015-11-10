logsApp.filter('datePicker', function () {
    return function (logs, dateFrom, dateUntil) {
        
        if ((dateFrom === null || dateFrom === '') || (dateUntil === null || dateUntil === '')) {
            return logs;
        }

        dateFrom = moment(dateFrom).format("DD/MM/YYYY") || null;
        dateUntil = moment(dateUntil).format("DD/MM/YYYY") || null;
        
        var filtered = [];
        angular.forEach(logs, function (log) {
            if ((log.date >= dateFrom) & (log.date <= dateUntil)) {
                filtered.push(log);
            }
        });
        
        return filtered;
    };
});