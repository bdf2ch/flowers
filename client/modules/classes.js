"use strict";


function Field (parameters) {
    this.source = "";
    this.value = 0;

    if (parameters !== undefined) {
        for (var param in parameters) {
            if (this.hasOwnProperty(param)) {
                this[param] = parameters[param];
            }
        }
    }
};


/**
 * Букет
 * @constructor
 */
function Bouquet () {
    this.id = new Field({ source: "id", value:0 });
    this.title = new Field({ source: "title", value: "" });
    this.description_short = new Field({ source: "description_short", value: "" });
    this.description_full = new Field({ source: "description_full", value: "" });
    this.price = new Field({ source: "price", value: 0 });
    this.image_url = new Field({ source: "image_url", value: "" });
    this.flowersIds = [];
    this.flowers = [];
    this.additions = [];
    this.reasons = [];
    this.addressees = [];
    this.images = [];

    this.fromJSON = function (JSONdata) {
        if (JSONdata !== undefined) {
            this.id.value = parseInt(JSONdata["id"]);
            this.title.value = JSONdata["title"];
            this.description_short.value = JSONdata["description_short"];
            this.description_full.value = JSONdata["description_full"];
            this.price.value = parseFloat(JSONdata["price"]);

            /* Инициализация массива цветов, входящих в состав букета */
            if (JSONdata["flowers"] !== undefined) {
                console.log("flowers = ", JSONdata["flowers"]);
                var length = JSONdata["flowers"].length;
                var i = 0;

                for (i = 0; i < length; i++) {
                    var flower_id = parseInt(JSONdata["flowers"][i]["flower_id"]);
                    this.flowersIds.push(flower_id);
                }
            }

            /* Инициализация массива Добавок к букету, входящих в состав букета */
            if (JSONdata["additions"] !== undefined) {
                var length = JSONdata["additions"].length;
                var i = 0;

                for (i = 0; i < length; i++) {
                    var temp_addition = new Addition();
                    temp_addition.fromJSON(JSONdata["additions"][i]);
                    this.additions.push(temp_addition);
                }
            }

            /* Инициализация массива поводов для дарения букета */
            if (JSONdata["reasons"] !== undefined) {
                var length = JSONdata["reasons"].length;
                var i = 0;

                for (i = 0; i < length; i++) {
                    var temp_reason = new Reason();
                    temp_reason.fromJSON(JSONdata["reasons"][i]);
                    this.reasons.push(temp_reason);
                }
            }

            /* Инициализация массива адресатов букета */
            if (JSONdata["addressees"] !== undefined) {
                var length = JSONdata["addressees"].length;
                var i = 0;

                for (i = 0; i < length; i++) {
                    var temp_addressee = new Addressee();
                    temp_addressee.fromJSON(JSONdata["addressees"][i]);
                    this.addressees.push(temp_addressee);
                }
            }

            /* Инициализация массива изображений букета */
            if (JSONdata["images"] !== undefined) {
                var length = JSONdata["images"].length;
                var i = 0;

                for (i = 0; i < length; i++) {
                    var temp_image = new BouquetImage();
                    temp_image.fromJSON(JSONdata["images"][i]);
                    this.images.push(temp_image);
                }
            }
        }
    };
};


/**
 * Цветок
 * @constructor
 */
function Flower () {
    this.id = new Field({ source: "id", value: 0 });
    this.title = new Field({ source: "title", value: "" });
    this.price = new Field({ source: "price", value: 0 });

    this.fromJSON = function (JSONdata) {
        if (JSONdata !== undefined) {
            this.id.value = parseInt(JSONdata["id"]);
            this.title.value = JSONdata["title"];
            this.price.value = parseFloat(JSONdata["price"]);
        }
    };
}

function User () {
    this.id = 0;
    this.surname = "";
    this.name = "";
    this.fname = "";
    this.email = "";
    this.phone = "";
    this.fio = "";

    this.fromJSON = function (JSONdata) {
        if (JSONdata !== undefined) {
            this.id = parseInt(JSONdata["id"]);
            this.surname = JSONdata["surname"];
            this.name = JSONdata["name"];
            this.fname = JSONdata["fname"];
            this.email = JSONdata["email"];
            this.phone = JSONdata["phone"];
            this.fio = this.fname + " " + this.name + " " + this.fname;
        }
    };
};

function Address () {
    this.id = 0;
    this.userId = 0;
    this.street = "";
    this.building = 0;
    this.buildingIndex = "";
    this.flat = 0;
    this.address = "";


    this.fromJSON = function (JSONdata) {
        if (JSONdata !== undefined) {
            this.id = parseInt(JSONdata["id"]);
            this.userId = parseInt(JSONdata["userId"]);
            this.street = JSONdata["street"];
            this.building = parseInt(JSONdata["building"]);
            this.buildingIndex = JSONdata["buildingIndex"];
            this.flat = parseInt(JSONdata["flat"]);
            this.address = this.street + ", дом " + this.building + this.buildingIndex + ", кв. " + this.flat;
        }
    };
};


function Order () {
    this.id = new Field({ source: "id", value: 0 });
    this.paymentMethodId = new Field({ source: "payment_method_id", value: 1 });
    this.deliveryMethodId = new Field({ source: "delivery_method_id", value: 1 });
    this.userId = new Field({ source: "user_id", value: 0 });
    this.customerGenderId = new Field({ source: "customer_gender_id", value: 1 });
    this.customerName = new Field({ source: "customer_name", value: "" });
    this.customerFname = new Field({ source: "customer_fname", value: "" });
    this.customerSurname = new Field({ source: "customer_surname", value: "" });
    this.customerPhone = new Field({ source: "customer_phone", value: "" });
    this.customerEmail = new Field({ source: "customer_email", value: "" });
    this.recieverGenderId = new Field({ source: "reciever_gender_id", value: 1 });
    this.recieverName = new Field({ source: "reciever_name", value: "" });
    this.recieverFname = new Field({ source: "reciever_name", value: "" });
    this.recieverSurname = new Field({ source: "recieverSurname", value: "" });
    this.recieverPhone = new Field({ source: "reciever_phone", value: "" });
    this.cityId = new Field({ source: "address_city_id", value: 1 });
    this.street = new Field({ source: "address_street", value: "" });
    this.building = new Field({ source: "address_building", value: "" });
    this.buildingIndex = new Field({ source: "address_building_index", value: "" });
    this.flat = new Field({ source: "address_flat", value: "" });
    this.comment = new Field({ source: "comment", value: "" });
    this.customerIsReciever = new Field({ source: "customer_is_reciever", value: true });
    this.created = new Field({ source: "created", value: 0 });
    this.deliveryStart = new Field({ source: "delivery_start_period", value: 0 });
    this.deliveryEnd = new Field({ source: "delivery_end_periof", value: 0 });
    this.bouquets = [];

    this.fromJSON = function (JSONdata) {
        if (JSONdata !== undefined) {
            this.id.value = parseInt(JSONdata[this.id.source]);
            this.paymentMethodId.value = parseInt(JSONdata[this.paymentMethodId.source]);
            this.deliveryMethodId.value = parseInt(JSONdata[this.deliveryMethodId.source]);
            this.userId.value = parseInt(JSONdata[this.userId.source]);
            this.customerGenderId.value = parseInt(JSONdata[this.customerGenderId.source]);
            this.customerName.value = JSONdata[this.customerName.source];
            this.customerFname.value = JSONdata[this.customerFname.source];
            this.customerSurname.value = JSONdata[this.customerSurname.source];
            this.customerPhone.value = JSONdata[this.customerPhone.source];
            this.customerEmail.value = JSONdata[this.customerEmail.source];
            this.recieverGenderId.value = parseInt(JSONdata[this.recieverGenderId.source]);
            this.recieverName.value = JSONdata[this.recieverName.source];
            this.recieverFname.value = JSONdata[this.recieverFname.source];
            this.recieverSurname.value = JSONdata[this.recieverSurname.source];
            this.recieverPhone.value = JSONdata[this.recieverPhone.source];
            this.cityId.value = parseInt(JSONdata[this.cityId.source]);
            this.street.value = JSONdata[this.street.source];
            this.building.value = JSONdata[this.building.source];
            this.buildingIndex.value = JSONdata[this.buildingIndex.source];
            this.flat.value = JSONdata[this.flat.source];
            this.comment.value = JSONdata[this.comment.source];
            this.customerIsReciever.value = parseInt(JSONdata[this.customerIsReciever.source]) === 1 ? true : false;
            this.deliveryStart = parseInt(JSONdata[this.deliveryStart.source]);
            this.deliveryEnd = parseInt(JSONdata[this.deliveryEnd.source]);
            this.created.value = JSONdata[this.created.source];
        }
    };
};


/**
 * Повод
 * @constructor
 */
function Reason () {
    this.id = new Field({ source: "id", value: 0 });
    this.title = new Field({source: "title", value: ""});
    this.isActive = false;

    this.fromJSON = function (JSONdata) {
        if (JSONdata !== undefined) {
            this.id.value = parseInt(JSONdata["id"]);
            this.title.value = JSONdata["title"];
        }
    };
};


/**
 * Адресат
 * @constructor
 */
function Addressee () {
    this.id = new Field({ source: "id", value: 0 });
    this.title = new Field({ source: "title", value: "" });

    this.fromJSON = function (JSONdata) {
        if (JSONdata !== undefined) {
            this.id.value = parseInt(JSONdata["id"]);
            this.title.value = JSONdata["title"];
        }
    };
};


/**
 * Добавки к букеты
 * @constructor
 */
function Addition () {
    this.id = new Field({ source: "id", value: 0 });
    this.title = new Field({ source: "title", value: "" });
    this.description = new Field({ source: "description", value: "" });

    this.fromJSON = function (JSONdata) {
        if (JSONdata !== undefined) {
            this.id.value = parseInt(JSONdata[this.id.source]);
            this.title.value = JSONdata[this.title.source];
            this.description.value = JSONdata[this.description.source];
        }
    };
};


/**
 * Изображение букета
 * @constructor
 */
function BouquetImage () {
    this.id = new Field({ source: "id", value: 0 });
    this.bouquetId = new Field({ source: "bouquet_id", value: 0 });
    this.url = new Field ({ source: "url", value: "" });

    this.fromJSON = function (JSONdata) {
        if (JSONdata !== undefined) {
            this.id.value = parseInt(JSONdata[this.id.source]);
            this.bouquetId.value = parseInt(JSONdata[this.bouquetId.source]);
            this.url = JSONdata[this.url.source];
        }
    };
};


/**
 * Способ оплаты
 * @constructor
 */
function PaymentMethod () {
    this.id = new Field({ source: "id", value: 0 });
    this.title = new Field({ source: "title", value: "" });

    this.fromJSON = function (JSONdata) {
        if (JSONdata !== undefined) {
            this.id.value = parseInt(JSONdata[this.id.source]);
            this.title.value = JSONdata[this.title.source];
        }
    };
};


/**
 * Способ доставки
 * @constructor
 */
function DeliveryMethod () {
    this.id = new Field({ source: "id", value: 0 });
    this.title = new Field ({ source: "title", value: "" });
    this.price = new Field({ source: "price", value: 0 });

    this.fromJSON = function (JSONdata) {
        if (JSONdata !== undefined) {
            this.id.value = parseInt(JSONdata[this.id.source]);
            this.title.value = JSONdata[this.title.source];
            this.price.value = parseFloat(JSONdata[this.price.source]);
        }
    };
};


/**
 * Город
 * @constructor
 */
function City () {
    this.id = new Field({ source: "id", value: 0 });
    this.title = new Field ({ source: "title", value: "" });

    this.fromJSON = function (JSONdata) {
        if (JSONdata !== undefined) {
            this.id.value = parseInt(JSONdata[this.id.source]);
            this.title.value = JSONdata[this.title.source];
        }
    };
};