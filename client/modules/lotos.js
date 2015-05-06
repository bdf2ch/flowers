/*****
 *
 *****/

"use strict";

var lotos = angular.module("lotos", ["lotos.cart"])
    .config(function ($provide) {
        $provide.factory("$lotos", [function () {
            var module =  {};

            module.items = [];
            module.totalPrice = 0;

            /*** Добавляет элемент в конец массива покупок ***/
            module.add = function (item) {
                if (item !== undefined) {
                    this.append(item);
                    module.totalPrice += item.price.value;
                }
            };

            /*** Удаляет элемнт из массива покупок ***/
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