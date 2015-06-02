"use strict";


var filters = angular.module("lotos.filters", [])
    .config(function ($filterProvider, $provide) {

        /* Ôèëüòğ áóêåòîâ ïî ïîâîäó */
        $filterProvider.register("reason", ["$log", function ($log) {
            return function (input, reasonId) {
                if (reasonId && parseInt(reasonId) > 0 && input.length > 0) {
                    $log.log("reasonId = ", reasonId);
                    var bouquets = [];
                    angular.forEach(input, function (bouquet) {
                        if (bouquet.reasons.length > 0) {
                            angular.forEach(bouquet.reasons, function (reason, key) {

                            });
                        }
                    });
                    return bouquets;
                } else
                    return input;
            };
        }]);


        /* Ôèëüòğ áóêåòîâ ïî öâåòàì â ñîñòàâå */
        $filterProvider.register("flowers", ["$log", function ($log) {
            return function (input, flowers) {
                if (flowers.length > 0 && input.length > 0) {
                    $log.log("flowers = ", flowers);
                    var bouquets = [];
                    angular.forEach(input, function (bouquet) {
                        if (bouquets.powerLineId.value == parseInt(powerLineId))
                            pylons.push(pylon);
                    });
                    return pylons;
                } else
                    return input;
            };
        }]);


        /* Ôèëüòğ áóêåòîâ ïî ñòğàíèöàì ïàãèíàöèè */
        $filterProvider.register("paginator", ["$log", function ($log) {
            return function (input, limit, pageNumber) {
                if (input.length > 0 && limit !== undefined && pageNumber !== undefined) {
                    $log.log("limit = ", limit);
                    $log.log("pageNumber = ", pageNumber);
                    var bouquets = [];
                    var start = (pageNumber * limit) - limit + 1;
                    angular.forEach(input, function (bouquet, key) {
                        if (key >= start && key <= (start + limit) - 1)
                            bouquets.push(bouquet);
                    });
                    return bouquets;
                } else
                    return input;
            };
        }]);

        /* Ôèëüòğ äàòû */
        $filterProvider.register("dateview", ["$log", function ($log) {
            return function (input) {
                return moment.unix(parseInt(input)).format("DD.MM.YYYY, HH:mm");
            };
        }]);

    })
    .run(function ($log) {
        $log.log("filters module");
    });