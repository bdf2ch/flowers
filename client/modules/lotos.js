/*****
 *
 *****/

"use strict";

var lotos = angular.module("lotos", ["ngRoute", "lotos.filters", "lotos.sidebar", "lotos.cart", "lotos.bouquets", "lotos.orders", "lotos.misc", "lotos.session"])
    .config(function ($provide, $routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "client/templates/bouquets/bouquets.html",
                controller: "BouquetsController"})
            .when("/bouquet/:bouquetId", {
                templateUrl: "client/templates/bouquet/bouquet.html",
                controller: "BouquetController"
            })
            .when("/cart", {
                templateUrl: "client/templates/cart/cart.html",
                controller: "CartController"
            })
            .when("/order", {
                templateUrl: "client/templates/order/order.html",
                controller: "OrderController"
            })
            .when("/confirm", {
                templateUrl: "client/templates/order/confirm.html",
                controller: "ConfirmationController"
            })
            .when("/account", {
                templateUrl: "client/templates/account/account.html",
                controller: "AccountController"
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


lotos.controller("AppController", ["$log", "$scope", "$cart", "$session", function ($log, $scope, $cart, $session) {
    $scope.cart = $cart;
    $scope.session = $session;
}]);