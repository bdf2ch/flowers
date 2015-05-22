"use strict";


var session = angular.module("lotos.session", ["ngCookies"])
    .config(function ($provide) {
        $provide.factory("$session", ["$log", "$cookies", "$http", function ($log, $cookies, $http) {
            var module = {};

            module.controller = "server/controllers/session.php";
            module.user = new User();

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