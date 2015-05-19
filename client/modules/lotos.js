/*****
 *
 *****/

"use strict";

var lotos = angular.module("lotos", ["ngRoute", "lotos.filters", "lotos.sidebar", "lotos.cart", "lotos.bouquets"])
    .config(function ($provide, $routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "client/templates/bouquets/bouquets.html",
                controller: "BouquetsController"})
            .when("/bouquet/:bouquetId", {
                templateUrl: "client/templates/bouquet/bouquet.html",
                controller: "BouquetController"
            })
            .otherwise({ redirectTo: '/' });

        $provide.factory("$lotos", ["$http", function ($http) {
            var module =  {};

            module.init = function () {
                $http.post("server/controllers/init.php", {})
                    .success(function (data) {
                        if (data !== undefined) {
                            
                        }
                    }
                );
            };

            return module;
        }]);
    })
    .run(function ($log) {
        $log.log("app started");
    });


lotos.controller("AppController", ["$log", "$scope", "$cart", function ($log, $scope, $cart) {
    $scope.cart = $cart;
}]);