"use strict";


var filters = angular.module("lotos.filters", [])
    .config(function ($filterProvider, $provide) {

        /* Фильтр букетов по поводу */
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


        /* Фильтр букетов по цветам в составе */
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

    })
    .run(function ($log) {
        $log.log("filters module");
    });