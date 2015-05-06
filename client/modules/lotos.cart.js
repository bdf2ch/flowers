/*****
 *
 *****/

"use strict";

angular.module("lotos.cart", [])
    .config(function ($provide) {
        $provide.factory("$cart", ["$log", function ($log) {
            var module = {};

            return module;
        }]);
    })
    .run(function ($log) {
        $log.log("cart module");
    });