"use strict";


var session = angular.module("lotos.session", ["ngCookies"])
    .config(function ($provide) {
        $provide.factory("$session", ["$log", "$cookies", "$http", function ($log, $cookies, $http) {
            var module = {};

            module.controller = "server/controllers/session.php";
            module.user = new User();
            module.inLoginMode = false;
            module.username = "";
            module.password = "";
            module.username_error = "";
            module.password_error = "";

            module.getUserById = function (userId) {
                if (userId !== undefined) {
                    var params = {
                        action: "getUserById",
                        data: {
                            userId: userId
                        }
                    };

                    $http.post(module.controller, params)
                        .success(function (data) {
                            module.user.fromJSON(data);
                        }
                    );
                }
            };

            module.loginMode = function () {
                module.inLoginMode = !module.inLoginMode;
                module.username = "";
                module.password = "";
                module.username_error = "";
                module.password_error = "";
            };

            module.login = function () {
                $log.log("login");

                module.username_error = "";
                module.password_error = "";

                if (module.username === "") {
                    module.username_error = "Вы не указали имя пользователя";
                }

                if (module.password === "") {
                    module.password_error = "Вы не указали пароль";
                }
            };

            return module;
        }])
    })
    .run(function ($log, $cookies, $session) {
        $log.log("session module");
        if ($cookies.user_id !== undefined) {
            $session.user.id.value = parseInt($session.user_id);
            $session.getUserById($session.user.id.value);
            $log.log("user id from cookies = ", parseInt($cookies.user_id));
        }
    }
);


session.controller("AccountController", ["$log", "$scope", "$session", function ($log, $scope, $account) {
    $scope.account = $account;
    $scope.tabs = [
        {
            id: 1,
            title: "О Вас",
            template: "client/templates/account/account_about.html",
            selected: true
        },
        {
            id: 2,
            title: "Ваши заказы",
            template: "client/templates/account/account_orders.html",
            selected: false
        }
    ];
    $scope.activeTab = $scope.tabs[0];

    /* Выбор вкладки */
    $scope.selectTab = function (tabId) {
        if (tabId !== undefined) {
            angular.forEach($scope.tabs, function (tab) {
                if (tab.id === tabId) {
                    tab.selected = true;
                    $scope.activeTab = tab;
                } else {
                    tab.selected = false;
                }
            });
        }
    };
}]);