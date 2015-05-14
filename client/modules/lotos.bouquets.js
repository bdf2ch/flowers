var bouquets = angular.module("lotos.bouquets", [])
    .config(function ($provide) {
        $provide.factory("$bouquets", ["$log", "$http", function ($log, $http) {
            var module = {};

            /* Наборы данных */
            module.items = [];
            module.reasons = [];
            module.addressees = [];

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

            module.init = function () {
                $http.post("server/controllers/init.php", {})
                    .success(function (data) {
                        if (data !== undefined) {
                            $log.log(data);
                            if (data["reasons"] !== undefined) {
                                angular.forEach(data["reasons"], function (reason) {
                                    var temp_reason = new Reason();
                                    temp_reason.fromJSON(reason);
                                    module.reasons.push(temp_reason);
                                });
                            }
                            if (data["addressees"] !== undefined) {
                                angular.forEach(data["addressees"], function (addressee) {
                                    var temp_addressee = new Addressee();
                                    temp_addressee.fromJSON(addressee);
                                    module.addressees.push(temp_addressee);
                                });
                            }
                            if (data["bouquets"] !== undefined) {
                                angular.forEach(data["bouquets"], function (bouquet) {
                                    var temp_bouquet = new Bouquet();
                                    temp_bouquet.fromJSON(bouquet);
                                    module.items.push(temp_bouquet);
                                });
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


bouquets.controller("BouquetsController", ["$log", "$scope", "$bouquets", function ($log, $scope, $bouquets) {
    $scope.bouquets = $bouquets;

    //if ($scope.bouquets.items.length === 0) {
    //    $scope.bouquets.get();
   // }
}]);
