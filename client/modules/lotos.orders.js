"use strict";


var orders = angular.module("lotos.orders", [])
    .config(function ($provide) {
        $provide.factory("$orders", ["$log", "$http", "$session", function ($log, $http, $session) {
            var module = {};

            module.items = [];
            module.order = new Order();
            module.loading = false;


            module.add = function (order) {
                if (order !== undefined) {
                    var params = {
                        action: "add",
                        data: {
                            userId: $session.user.id.value,
                            customerGenderId: order.customerGenderId.value,
                            customerName: order.customerName.value,
                            customerFname: order.customerFname.value,
                            customerSurname: order.customerSurname.value,
                            customerPhone: order.customerPhone.value,
                            customerEmail: order.customerEmail.value,
                            customerIsReciever: order.customerIsReciever.value,
                            paymentMethodId: order.paymentMethod.value,
                            deliveryMethodId: order.deliveryMethodId.value,
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
                            comment: order.comment.value,
                            deliveryStart: order.deliveryStart.value,
                            bouquets: []
                        }
                    };

                    module.loading = true;
                    $http.post("server/controllers/orders.php", params)
                        .success(function (data) {
                            module.loading = false;
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
        },
        delivery: {
            date: false
        }
    };
    $scope.errorCounter = 0;

    $scope.deliveryDate = new moment().format("DD.MM.YYYY");
    $scope.deliveryHours = "17";
    $scope.deliveryMinutes = "00";
    $scope.order = $scope.orders.order;



    $scope.order.customerName.value = "Евлампий";
    $scope.order.customerFname.value = "Алибардович";
    $scope.order.customerSurname.value = "Косоглазовский";
    $scope.order.customerPhone.value = "+7 (921) 555-66-789";
    $scope.order.customerEmail.value = "fuckingemail@email.com";
    $scope.order.comment.value = "Комментарий к заказу комментарий к заказу комментарий к заказу комментарий к заказу комментарий к заказу";
    $scope.order.recieverSurname.value = "Константинопольский";
    $scope.order.recieverName.value = "Константин";
    $scope.order.recieverFname.value = "Константинович";
    $scope.order.recieverPhone.value = "+7 (921) 666-55-423";
    $scope.order.street.value = "Героев Рыбачьего";
    $scope.order.building.value = "202";
    $scope.order.buildingIndex.value = "";
    $scope.order.flat.value = "112";


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

        /* Если выбрана доставка курьером */
        if ($scope.order.deliveryMethodId.value === 2) {
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

            /* Дата и время доставки */
            if ($scope.deliveryDate === "") {
                $scope.errors.delivery.date = "Вы не указали дату доставки";
                $scope.errorCounter++;
            } else
                $scope.errors.delivery.date = false;
        }

        if ($scope.errorCounter === 0) {
            $scope.order.deliveryStart.value = parseInt(moment($scope.deliveryDate + " ," + $scope.deliveryHours + ":" + $scope.deliveryMinutes, "DD.MM.YYYY, HH:mm").unix());
            $location.url("/confirm");
        }
    };

    $log.log("order controller");
}]);


orders.controller("ConfirmationController", ["$log", "$scope", "$orders", "$cart", "$misc", "$location", function ($log, $scope, $orders, $cart, $misc, $location) {
    $scope.cart = $cart;
    $scope.orders = $orders;
    $scope.misc = $misc;


    //$scope.orders.order.customerName.value = "Евлампий";
    //$scope.orders.order.customerFname.value = "Алибардович";
    //$scope.orders.order.customerSurname.value = "Косоглазовский";
    //$scope.orders.order.customerPhone.value = "+7 (921) 555-66-789";
    //$scope.orders.order.customerEmail.value = "fuckingemail@email.com";
    //$scope.orders.order.comment.value = "Комментарий к заказу комментарий к заказу комментарий к заказу комментарий к заказу комментарий к заказу";
    //$scope.orders.order.recieverSurname.value = "Константинопольский";
    //$scope.orders.order.recieverName.value = "Константин";
    //$scope.orders.order.recieverFname.value = "Константинович";
    //$scope.orders.order.recieverPhone.value = "+7 (921) 666-55-423";
    //$scope.orders.order.street.value = "Героев Рыбачьего";
    //$scope.orders.order.building.value = "202";
    //$scope.orders.order.buildingIndex = "2";
    //$scope.orders.order.flat = "112";

    $scope.orderIsConfirmed = false;
    $scope.accountIsCreated = false;

    /* Переход к странице оформления заказа */
    $scope.gotoOrder = function () {
        $location.url("/order");
    };

}]);