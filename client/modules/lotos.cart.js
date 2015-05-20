/*****
 *
 *****/

"use strict";

var cart = angular.module("lotos.cart", [])
    .config(function ($provide) {
        $provide.factory("$cart", ["$log", "$bouquets", function ($log, $bouquets) {
            var module = {};

            module.items = [];
            module.totalPrice = 0;


            /**
             *
             * @param bouquetId
             */
            module.add = function (bouquetId) {
                if (bouquetId !== undefined) {
                    angular.forEach($bouquets.items, function (bouquet) {
                        if (bouquet.id.value === bouquetId) {
                            module.items.push(bouquet);
                            module.totalPrice += bouquet.price.value;
                            $log.log("total price = ", module.totalPrice);
                        }
                    });
                }
            };


            /**
             * Удаляет все элементы из массива покупок
             */
            module.clear = function () {
                module.items.splice(0, module.items.length);
                module.totalPrice = 0;
            };


            /**
             *
             * @param bouquetId
             * @returns {number}
             */
            module.getAmount = function (bouquetId) {
                if (bouquetId !== undefined) {
                    var amount = 0;
                    angular.forEach(module.items, function (bouquet) {
                        if (bouquet.id.value === bouquetId) {
                            amount++;
                        }
                    });
                    return amount;
                }
            };

            return module;
        }]);
    })
    .run(function ($log) {
        $log.log("cart module");
    });



cart.controller("CartController", ["$log", "$scope", "$cart", "$bouquets", function ($log, $scope, $cart, $bouquets) {
    $scope.cart = $cart;
    $scope.bouquets = $bouquets;

    $log.log("cart controller");
}]);