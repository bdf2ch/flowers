/*****
 *
 *****/

"use strict";

var lotos = angular.module("lotos", ["lotos.sidebar", "lotos.cart"])
    .config(function ($provide) {
        $provide.factory("$lotos", ["$rootScope", "$sidebar", function ($rootScope, $sidebar) {
            var module =  {};

            module.items = [];
            module.totalPrice = 0;
            module.test = "dhjfyjhjhj";

            $rootScope.sidebar = $sidebar;

            /*** ��������� ������� � ����� ������� ������� ***/
            module.add = function (item) {
                if (item !== undefined) {
                    this.append(item);
                    module.totalPrice += item.price.value;
                }
            };

            /*** ������� ������ �� ������� ������� ***/
            module.delete = function (id) {
                if (id !== undefined) {
                    angular.forEach(module.items, function (item, key) {
                        if (item.id.value === id) {
                            module.items.splice(key, 1);
                            module.totalPrice -= item.price.value;
                        }
                    });
                }
            };

            return module;
        }]);
    })
    .run(function ($log) {
        $log.log("app started");
    });