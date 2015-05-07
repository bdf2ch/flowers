/*****
 *
 *****/


"use strict";

angular.module("lotos.sidebar", [])
    .config(function ($provide) {
        $provide.factory("$sidebar", [function () {
            var module = {};

            module.template = "client/templates/sidebar/filter.html";

            return module;
        }]);
    })
    .controller("SidebarController", ["$log", "$scope", "$sidebar", function ($log, $scope, $sidebar) {
        $scope.sidebar = $sidebar;

        $log.log("sidebar controller");
    }]);