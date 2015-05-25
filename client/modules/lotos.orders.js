"use strict";


var orders = angular.module("lotos.orders", [])
    .config(function ($provide) {
        $provide.factory("$orders", ["$log", "$http", function ($log, $http) {
            var module = {};

            module.items = [];
            module.order = new Order();


            module.add = function (order) {
                if (order !== undefined) {
                    var params = {
                        action: "add",
                        data: {
                            //userId: $session.userId,
                            customerGenderId: order.customerGenderId.value,
                            customerName: order.customerName.value,
                            customerFname: order.customerFname.value,
                            customerSurname: order.customerSurname.value,
                            customerPhone: order.customerPhone.value,
                            customerEmail: order.customerEmail.value,
                            customerIsReciever: order.customerIsReciever.value,
                            paymentMethod: order.paymentMethod.value,
                            recieverGenderId: order.recieverGenderId.value,
                            recieverName: order.recieverName.value,
                            recieverFname: order.recieverFname.value,
                            recieverSurname: order.recieverSurname.value,
                            recieverPhone: order.recieverPhone.value,
                            cityId: order.cityId.value,
                            street: order.street.value,
                            building: order.building.value,
                            buildingIndex: order.buildingIndex.value,
                            flat: order.flat.value,
                            comment: order.comment.value
                        }
                    };

                    $http.post("server/controllers/orders.php", params)
                        .success(function (data) {

                        }
                    );
                }
            };

            return module;
        }]);
    })
    .run(function ($log) {
        $log.log("orders module");
    }
);



orders.controller("OrderController", ["$log", "$scope", "$cart", "$bouquets", "$misc", "$orders", "$location", function ($log, $scope, $cart, $bouquets, $misc, $orders, $location) {
    $scope.cart = $cart;
    $scope.bouquets = $bouquets;
    $scope.misc = $misc;
    $scope.orders = $orders;

    $scope.cities = [{id: 1, title: "Мурманск"}, {id: 2, title: "Североморск"}];
    $scope.payment_methods = [{id: 1, title: "Наличными, курьеру"}, {id: 2, title: "Банковской картой, курьеру"}];
    $scope.errors = {
        customer: {
            name: false,
            fname: false,
            surname: false,
            phone: false,
            email: false
        },
        reciever: {
            name: false,
            fname: false,
            surname: false,
            phone: false
        },
        address: {
            street: false,
            building: false,
            flat: false
        }
    };
    $scope.errorCounter = 0;

    $scope.customerGenderId = 1;
    $scope.customerName = "";
    $scope.customerFname = "";
    $scope.customerSurname = "";
    $scope.customerPhone = "";
    $scope.customerEmail = "";

    $scope.recieverGenderId = 1;
    $scope.recieverName = "";
    $scope.recieverFname = "";
    $scope.recieverSurname = "";
    $scope.recieverPhone = "";

    $scope.cityId = 1;
    $scope.street = "";
    $scope.building = "";
    $scope.buildingIndex = "";
    $scope.flat = "";

    $scope.paymentMethodId = 1;
    $scope.comment = "";
    $scope.customerIsReciever = true;

    $scope.order = $scope.orders.order;

    /* Переход на главную страницу */
    $scope.gotoMain = function () {
        $location.url("/");
    };

    /*** Валидация формы заказа ***/
    $scope.validate = function () {
        $scope.errorCounter = 0;
        /* Имя заказчика */
        if ($scope.order.customerName.value === "") {
            $scope.errors.customer.name = "Вы не указали Ваше имя";
            $scope.errorCounter++;
        } else
            $scope.errors.customer.name = false;

        /* Отчество заказчика */
        if ($scope.order.customerFname.value === "") {
            $scope.errors.customer.fname = "Вы не указали Ваше отчество";
            $scope.errorCounter++;
        } else
            $scope.errors.customer.fname = false;

        /* Фамилия заказчика */
        if ($scope.order.customerSurname.value === "") {
            $scope.errors.customer.surname = "Вы не указали Вашу фамилию";
            $scope.errorCounter++;
        } else
            $scope.errors.customer.surname = false;

        /* Контактный телефон заказчика */
        if ($scope.order.customerPhone.value === "") {
            $scope.errors.customer.phone = "Вы не указали Ваш контактный телефон";
            $scope.errorCounter++;
        } else
            $scope.errors.customer.phone = false;

        /* Электронная почта заказчика */
        if ($scope.order.customerEmail.value === "") {
            $scope.errors.customer.email = "Вы не указали Ваш e-mail";
            $scope.errorCounter++;
        } else
            $scope.errors.customer.email = false;

        /* Если заказчик и получатель - это одно лицо */
        if ($scope.order.customerIsReciever.value === false) {

            /* Имя получателя */
            if ($scope.order.recieverName.value === "") {
                $scope.errors.reciever.name = "Вы не указали имя получателя";
                $scope.errorCounter++;
            } else
                $scope.errors.reciever.name = false;

            /* Отчетчво заказчика */
            if ($scope.order.recieverFname.value === "") {
                $scope.errors.reciever.fname = "Вы не указали отчество получателя";
                $scope.errorCounter++;
            } else
                $scope.errors.reciever.fname = false;

            /* Фамилия заказчика */
            if ($scope.order.recieverSurname.value === "") {
                $scope.errors.reciever.surname = "Вы не указали фамилию получателя";
                $scope.errorCounter++;
            } else
                $scope.errors.reciever.surname = false;

            /* Контактный телефон заказчика */
            if ($scope.order.recieverPhone.value === "") {
                $scope.errors.reciever.phone = "Вы не указали контактный телефон получателя";
                $scope.errorCounter++;
            } else
                $scope.errors.reciever.phone = false;
        }

        /* Адрес доставки - улица */
        if ($scope.order.street.value === "") {
            $scope.errors.address.street = "Вы не указали улицу";
            $scope.errorCounter++;
        } else
            $scope.errors.address.street = false;

        /* Адрес доставки - дом */
        if ($scope.order.building.value === "") {
            $scope.errors.address.building = "Вы не указали номер дома";
            $scope.errorCounter++;
        } else
            $scope.errors.address.building = false;

        /* Адрес доставки - квартира */
        if ($scope.order.flat.value === "") {
            $scope.errors.address.flat = "Вы не указали номер квартиры";
            $scope.errorCounter++;
        } else
            $scope.errors.address.flat = false;

        if ($scope.errorCounter === 0) {
            $location.url("/confirm");
        }
    };

    $log.log("order controller");
}]);


orders.controller("ConfirmationController", ["$log", "$scope", "$orders", "$cart", "$misc", "$location", function ($log, $scope, $orders, $cart, $misc, $location) {
    $scope.cart = $cart;
    $scope.orders = $orders;
    $scope.misc = $misc;


    $scope.orders.order.customerName.value = "Евлампий";
    $scope.orders.order.customerFname.value = "Алибардович";
    $scope.orders.order.customerSurname.value = "Косоглазовский";
    $scope.orders.order.customerPhone.value = "+7 (921) 555-66-789";
    $scope.orders.order.customerEmail.value = "fuckingemail@email.com";
    $scope.orders.order.comment.value = "Комментарий к заказу комментарий к заказу комментарий к заказу комментарий к заказу комментарий к заказу";
    $scope.orders.order.recieverSurname.value = "Константинопольский";
    $scope.orders.order.recieverName.value = "Константин";
    $scope.orders.order.recieverFname.value = "Константинович";
    $scope.orders.order.recieverPhone.value = "+7 (921) 666-55-423";
    $scope.orders.order.street.value = "Героев Рыбачьего";
    $scope.orders.order.building.value = "202";
    $scope.orders.order.buildingIndex = "2";
    $scope.orders.order.flat = "112";

    $scope.orderIsConfirmed = false;
    $scope.accountIsCreated = false;

    /* Переход к странице оформления заказа */
    $scope.gotoOrder = function () {
        $location.url("/order");
    };

}]);