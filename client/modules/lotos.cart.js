/*****
 *
 *****/

"use strict";

var cart = angular.module("lotos.cart", [])
    .config(function ($provide) {
        $provide.factory("$cart", ["$log", "$bouquets", function ($log, $bouquets) {
            var module = {};

            module.items = [];
            module.totalAmount = 0;
            module.totalPrice = 0;


            /**
             *
             * @param bouquetId
             */
            module.add = function (bouquetId) {
                if (bouquetId !== undefined) {
                    var temp_bouquet = new Bouquet();
                    angular.forEach($bouquets.items, function (bouquet) {
                        if (bouquet.id.value === bouquetId) {
                            temp_bouquet = bouquet;
                            var counter = 0;

                            angular.forEach(module.items, function (item) {
                                if (item.id.value === bouquetId) {
                                    counter++;
                                    temp_bouquet = item;
                                }
                            });

                            if (counter === 0) {
                                temp_bouquet.amount = 1;
                                module.items.push(temp_bouquet);
                                module.totalPrice += bouquet.price.value;
                                module.totalAmount++;
                            } else {
                                if (temp_bouquet.amount === undefined)
                                    temp_bouquet.amount = 2;
                                else
                                    temp_bouquet.amount += 1;

                                module.totalPrice += temp_bouquet.price.value;
                                module.totalAmount++;
                            }



                            $log.log("total price = ", module.totalPrice);
                            $log.log(module.items);
                        }
                    });
                }
            };


            /**
             * РЈРґР°Р»СЏРµС‚ РІСЃРµ СЌР»РµРјРµРЅС‚С‹ РёР· РјР°СЃСЃРёРІР° РїРѕРєСѓРїРѕРє
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

            /**
             * Увеличивает количество товара на единицу
             * @param bouquetId
             */
            module.decreaseAmount = function (bouquetId) {
                if (bouquetId !== undefined) {
                    angular.forEach(module.items, function (bouquet, key) {
                        if (bouquet.id.value === bouquetId) {
                            if (bouquet.amount > 1)
                                bouquet.amount--;
                            else
                                module.items.splice(key, 1);
                            module.totalAmount--;
                        }
                    });
                }
            };

            /**
             * Уменьшает количество товара на единицу
             * @param bouquetId
             */
            module.increaseAmount = function (bouquetId) {
                if (bouquetId !== undefined) {
                    angular.forEach(module.items, function (bouquet) {
                        if (bouquet.id.value === bouquetId) {
                            bouquet.amount++;
                        }
                    });
                    module.totalAmount++;
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