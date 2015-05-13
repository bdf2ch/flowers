var bouquets = angular.module("lotos.bouquets", [])
    .config(function ($provide) {
        $provide.factory("$bouquets", ["$log", "$http", function ($log, $http) {
            var module = {};

            module.items = [];
            module.limit = 12;
            module.last = 0;

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
                        }
                    }
                );
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
