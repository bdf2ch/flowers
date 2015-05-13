/*****
 *
 *****/

"use strict";

var lotos = angular.module("lotos", ["ngRoute", "lotos.sidebar", "lotos.cart", "lotos.bouquets"])
    .config(function ($provide, $routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "client/templates/bouquets/bouquets.html",
                controller: "BouquetsController"})
            .otherwise({ redirectTo: '/' });

        $provide.factory("$lotos", ["$routeProvider", "$rootScope", "$sidebar", function ($routeProvider, $rootScope, $sidebar) {
            var module =  {};

            module.items = [];
            module.totalPrice = 0;
            module.test = "dhjfyjhjhj";

            $rootScope.sidebar = $sidebar;

            /*** Добавляет элемент в конец массива покупок ***/
            module.add = function (item) {
                if (item !== undefined) {
                    this.append(item);
                    module.totalPrice += item.price.value;
                }
            };

            /*** Удаляет элемнт из массива покупок ***/
            module.delete = function (id) {
                if (id !== undefined) {
                    angular.forEach(module.items, function (item, key) {
                        if (item.id.value === id) {
                            module.items.splice(key, 1);
                            module.totalPrice -= item.price.value;
                        }
                    });
                }
            };



            return module;
        }]);
    })
    .run(function ($log) {
        $log.log("app started");
    });


lotos.controller("AppController", ["$log", "$scope", "$sidebar", function ($log, $scope, $sidebar) {
    $scope.sidebar = $sidebar;
}]);