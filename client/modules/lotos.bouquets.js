var bouquets = angular.module("lotos.bouquets", [])
    .config(function ($provide) {
        $provide.factory("$bouquets", ["$log", "$http", function ($log, $http) {
            var module = {};

            /* Наборы данных */
            module.items = [];
            module.reasons = [
                "Юбилей", "Свадьба", "День рождения", "Комплимент"
            ];
            module.addressees = [
                "Женщине/девушке", "Мужчине", "Семье", "Коллективу", "Деловому партнеру"
            ];

            /* Пагинация */
            module.pages = 0;
            module.limit = 12;
            module.currentPage = 1;

            /* Фильтры */
            module.activeReasonsId = 0;
            module.activeAddresseId = 0;

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

                                module.items.push(temp_bouquet);
                            });
                            module.pages = Math.ceil(module.items.length / module.limit);
                        }
                    }
                );
            };

            /* Переход на предыдущую страницу с букетами */
            module.prevPage = function () {
                if (module.currentPage > 1 ) {
                    module.currentPage--;
                }
            };

            /* Переход на следующую страницу с букетами */
            module.nextPage = function () {
                if (module.currentPage < module.pages) {
                    module.currentPage++;
                }
            };

            /* Переход на указанную страницу с букетами */
            module.setPage = function (pageNumber) {
                if (pageNumber !== undefined && pageNumber > 0) {
                    module.currentPage = pageNumber;
                    $log.log("currentPage = ", module.currentPage);
                }
            };

            /* Выбор повода */
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
                        }
                    });
                }
            };

            /* Выбор адресата */
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

            return module;
        }]);
    });


bouquets.controller("BouquetsController", ["$log", "$scope", "$bouquets", function ($log, $scope, $bouquets) {
    $scope.bouquets = $bouquets;

    if ($scope.bouquets.items.length === 0) {
        $scope.bouquets.get();
    }
}]);
