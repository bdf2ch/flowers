var bouquets = angular.module("lotos.bouquets", [])
    .config(function ($provide) {
        $provide.factory("$bouquets", ["$log", "$http", "$misc", function ($log, $http, $misc) {
            var module = {};

            /* Наборы данных */
            module.items = [];
            module.reasons = [];
            module.addressees = [];
            module.flowers = [];
            module.additions = [];
            module.images = [];

            /* Пагинация */
            module.pages = 0;
            module.limit = 12;
            module.currentPage = 1;

            /* Фильтры */
            module.activeReasonsId = 0;
            module.activeAddresseId = 0;

            /* Получает список всех букетов */
            module.get = function () {
                var params = {
                    action: "get",
                    data: {

                    }
                };

                $http.post("server/controllers/bouquets.php", params)
                    .success(function (data) {
                        if (data !== undefined) {
                            angular.forEach(data, function (bouquet) {
                                var temp_bouquet = new Bouquet();
                                temp_bouquet.fromJSON(bouquet);
                                module.items.push(temp_bouquet);
                            });
                            module.pages = Math.ceil(module.items.length / module.limit);
                        }
                    }
                );
            };

            /* РџРµСЂРµС…РѕРґ РЅР° РїСЂРµРґС‹РґСѓС‰СѓСЋ СЃС‚СЂР°РЅРёС†Сѓ СЃ Р±СѓРєРµС‚Р°РјРё */
            module.prevPage = function () {
                if (module.currentPage > 1 ) {
                    module.currentPage--;
                }
            };

            /* РџРµСЂРµС…РѕРґ РЅР° СЃР»РµРґСѓСЋС‰СѓСЋ СЃС‚СЂР°РЅРёС†Сѓ СЃ Р±СѓРєРµС‚Р°РјРё */
            module.nextPage = function () {
                if (module.currentPage < module.pages) {
                    module.currentPage++;
                }
            };

            /* РџРµСЂРµС…РѕРґ РЅР° СѓРєР°Р·Р°РЅРЅСѓСЋ СЃС‚СЂР°РЅРёС†Сѓ СЃ Р±СѓРєРµС‚Р°РјРё */
            module.setPage = function (pageNumber) {
                if (pageNumber !== undefined && pageNumber > 0) {
                    module.currentPage = pageNumber;
                    $log.log("currentPage = ", module.currentPage);
                }
            };

            /* Выбор активного повода для подарка букета */
            module.setReason = function (reasonId) {
                if (reasonId !== undefined) {
                    $log.log("id = ", reasonId);
                    angular.forEach(module.reasons, function (reason) {
                        if (reason.id.value === reasonId) {
                            if (reason.isActive === false) {
                                reason.isActive = true;
                                module.activeReasonId = reason.id.value;
                                $log.log("reasonId = ", module.activeReasonsId);
                            } else {
                                reason.isActive = false;
                                module.activeReasonId = 0;
                            }
                        } else {
                            reason.isActive = false;
                        }
                    });
                }
            };

            /* Р’С‹Р±РѕСЂ Р°РґСЂРµСЃР°С‚Р° */
            module.setAddressee = function (addresseeId) {
                if (addresseeId !== undefined) {
                    angular.forEach(module.addressees, function (addressee) {
                        if (addressee.id.value === addresseeId) {
                            if (addressee.isActive === false) {
                                addressee.isActive = true;
                                module.activeAddresseeId = addressee.id.value;
                            } else {
                                addressee.isActive = false;
                                module.activeAdresseeId = 0;
                            }
                        }
                    });
                }
            };

            /**
             * Инициализация наборов данных
             */
            module.init = function (onsuccess) {
                $http.post("server/controllers/init.php", {})
                    .success(function (data) {
                        if (data !== undefined) {
                            $log.log(data);

                            /* Инициализация массива поводов */
                            if (data["reasons"] !== undefined) {
                                angular.forEach(data["reasons"], function (reason) {
                                    var temp_reason = new Reason();
                                    temp_reason.fromJSON(reason);
                                    module.reasons.push(temp_reason);
                                });
                            }

                            /* Инициализация массива адресатов */
                            if (data["addressees"] !== undefined) {
                                angular.forEach(data["addressees"], function (addressee) {
                                    var temp_addressee = new Addressee();
                                    temp_addressee.fromJSON(addressee);
                                    module.addressees.push(temp_addressee);
                                });
                            }

                            /* Инициализация массива цветов, входящих в состав букета */
                            if (data["flowers"] !== undefined) {
                                angular.forEach(data["flowers"], function (flower) {
                                    var temp_flower = new Flower();
                                    temp_flower.fromJSON(flower);
                                    module.flowers.push(temp_flower);
                                });
                            }

                            /* Инициализация массива добавок к букету */
                            if (data["additions"] !== undefined) {
                                angular.forEach(data["additions"], function (addition) {
                                    var temp_addition = new Addition();
                                    temp_addition.fromJSON(addition);
                                    module.additions.push(temp_addition);
                                });
                            }

                            /* Инициализация массива изображений букетов */
                            if (data["images"] !== undefined) {
                                angular.forEach(data["images"], function (image) {
                                    var temp_image = new BouquetImage();
                                    temp_image.fromJSON(image);
                                    module.images.push(temp_image);
                                });
                            }

                            /* Инициализация массива букетов */
                            if (data["bouquets"] !== undefined) {
                                angular.forEach(data["bouquets"], function (bouquet) {
                                    var temp_bouquet = new Bouquet();
                                    temp_bouquet.fromJSON(bouquet);
                                    module.items.push(temp_bouquet);
                                });
                                module.pages = Math.ceil(module.items.length / module.limit);
                            }

                            /* Инициализация массива способов оплаты */
                            if (data["payment_methods"] !== undefined) {
                                angular.forEach(data["payment_methods"], function (payment_method) {
                                    var temp_payment_method = new PaymentMethod();
                                    temp_payment_method.fromJSON(payment_method);
                                    $misc.paymentMethods.push(temp_payment_method);
                                });
                            }

                            /* Инициализация массива способов доставки */
                            if (data["delivery_methods"] !== undefined) {
                                angular.forEach(data["delivery_methods"], function (delivery_method) {
                                    var temp_delivery_method = new DeliveryMethod();
                                    temp_delivery_method.fromJSON(delivery_method);
                                    $misc.deliveryMethods.push(temp_delivery_method);
                                });
                            }

                            /* Инициализация массива городов */
                            if (data["cities"] !== undefined) {
                                angular.forEach(data["cities"], function (city) {
                                    var temp_city = new City();
                                    temp_city.fromJSON(city);
                                    $misc.cities.push(temp_city);
                                });
                            }


                            if (onsuccess !== undefined) {
                                onsuccess();
                            }
                        }
                    }
                );
            };

            return module;
        }]);
    })
    .run(function ($bouquets) {
        $bouquets.init();
    });


bouquets.controller("BouquetsController", ["$log", "$scope", "$bouquets", "$cart", "$session", function ($log, $scope, $bouquets, $cart, $session) {
    $scope.bouquets = $bouquets;
    $scope.cart = $cart;
    $scope.session = $session;

    //if ($scope.bouquets.items.length === 0) {
    //    $scope.bouquets.get();
   // }
}]);


bouquets.controller("BouquetController", ["$log", "$scope", "$routeParams", "$bouquets", "$cart", function ($log, $scope, $routeParams, $bouquets, $cart) {
    $scope.bouquets = $bouquets;
    $scope.cart = $cart;
    $scope.bouquet = undefined;
    $scope.samePrice = [];
    $scope.sameFlowers = [];

    if ($scope.bouquets.items.length === 0) {
        $scope.bouquets.init(function () {
            if ($routeParams.bouquetId !== undefined) {
                $log.log($routeParams);
                angular.forEach($scope.bouquets.items, function (bouquet) {
                    if (bouquet.id.value === parseInt($routeParams.bouquetId))
                        $scope.bouquet = bouquet;
                });
            }

            if ($scope.bouquet !== undefined) {
                $log.log($scope.bouquet);

                /* Отбираем букеты по схожей цене */
                angular.forEach($scope.bouquets.items, function (bouquet) {
                    if (bouquet.price.value <= $scope.bouquet.price.value + 500 && bouquet.price.value >= $scope.bouquet.price.value - 500) {
                        $scope.samePrice.push(bouquet);
                    }
                });
            }

        });
    } else {
        if ($routeParams.bouquetId !== undefined) {
            $log.log($routeParams);
            angular.forEach($scope.bouquets.items, function (bouquet) {
                if (bouquet.id.value === parseInt($routeParams.bouquetId)) {
                    $scope.bouquet = bouquet;
                    if ($scope.bouquet.flowers.length > 0) {
                        angular.forEach($scope.bouquet.flowersIds, function (flowerId) {
                            var temp_flower = new Flower();
                            angular.forEach($scope.bouquets.flowers, function (flower) {
                                if (flower.id.value === flowerId) {
                                    temp_flower = flower;
                                    $scope.bouquet.flowers.push(temp_flower);
                                }
                            });
                        });
                    }
                }
            });
        }

        if ($scope.bouquet !== undefined) {
            $log.log($scope.bouquet);

            /* Отбираем букеты по схожей цене */
            angular.forEach($scope.bouquets.items, function (bouquet) {
                if (bouquet.price.value <= $scope.bouquet.price.value + 500 && bouquet.price.value >= $scope.bouquet.price.value - 500) {
                    $scope.samePrice.push(bouquet);
                }
            });
        }
    }

}]);
