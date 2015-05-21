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


cart.controller("OrderController", ["$log", "$scope", "$cart", "$bouquets", function ($log, $scope, $cart, $bouquets) {
    $scope.cart = $cart;
    $scope.bouquets = $bouquets;
    $scope.genders = [{id: 1, title: "Уважаемый"}, {id: 2, title: "Уважаемая"}];
    $scope.cities = [{id: 1, title: "Мурманск"}, {id: 2, title: "Североморск"}];
    $scope.payment_methods = [{id: 1, title: "Наличными, курьеру"}, {id: 2, title: "Банковской картой, курьеру"}];
    $scope.errors = {
        customer: {
            name: false,
            fname: false,
            surname: false,
            phone: false,
            email: false
        },
        reciever: {
            name: false,
            fname: false,
            surname: false,
            phone: false
        },
        address: {
            street: false,
            building: false,
            flat: false
        }
    };
    $scope.errorCounter = 0;

    $scope.customerGenderId = 1;
    $scope.customerName = "";
    $scope.customerFname = "";
    $scope.customerSurname = "";
    $scope.customerPhone = "";
    $scope.customerEmail = "";

    $scope.recieverGenderId = 1;
    $scope.recieverName = "";
    $scope.recieverFname = "";
    $scope.recieverSurname = "";
    $scope.recieverPhone = "";

    $scope.cityId = 1;
    $scope.street = "";
    $scope.building = "";
    $scope.buildingIndex = "";
    $scope.flat = "";

    $scope.paymentMethodId = 1;
    $scope.comment = "";
    $scope.customerIsReciever = true;

    $scope.validate = function () {
        $scope.errorCounter = 0;

        if ($scope.customerName === "") {
            $scope.errors.customer.name = true;
            $scope.errorCounter++;
        } else
            $scope.errors.customer.name = false;

        if ($scope.customerFname === "") {
            $scope.errors.customer.fname = true;
            $scope.errorCounter++;
        } else
            $scope.errors.customer.fname = false;

        if ($scope.customerSurname === "") {
            $scope.errors.customer.surname = true;
            $scope.errorCounter++;
        } else
            $scope.errors.customer.surname = false;

        if ($scope.customerPhone === "") {
            $scope.errors.customer.phone = true;
            $scope.errorCounter++;
        } else
            $scope.errors.customer.phone = false;

        if ($scope.customerEmail === "") {
            $scope.errors.customer.email = true;
            $scope.errorCounter++;
        } else
            $scope.errors.customer.email = false;

        if ($scope.customerIsReciever === false) {

            if ($scope.recieverName === "") {
                $scope.errors.reciever.name = true;
                $scope.errorCounter++;
            } else
                $scope.errors.reciever.name = false;

            if ($scope.recieverFname === "") {
                $scope.errors.reciever.fname = true;
                $scope.errorCounter++;
            } else
                $scope.errors.reciever.fname = false;

            if ($scope.recieverSurname === "") {
                $scope.errors.reciever.surname = true;
                $scope.errorCounter++;
            } else
                $scope.errors.reciever.surname = false;

            if ($scope.recieverPhone === "") {
                $scope.errors.reciever.phone = true;
                $scope.errorCounter++;
            } else
                $scope.errors.reciever.phone = false;
        }

    };

    $log.log("order controller");
}]);