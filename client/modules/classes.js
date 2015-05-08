"use strict";


function Bouquet () {
    this.id = 0;
    this.title = "";
    this.price = 0;

    this.fromJSON = function (JSONdata) {
        if (JSONdata !== undefined) {
            this.id = parseInt(JSONdata["id"]);
            this.title = JSONdata["title"];
            this.price = parseFloat(JSONdata["price"]);
        }
    };
};

function Flower () {
    this.id = 0;
    this.title = "";
    this.price = 0;

    this.formJSON = function (JSONdata) {
        if (JSONdata !== undefined) {
            this.id = parseInt(JSONdata["id"]);
            this.title = JSONdata["title"];
            this.price = parseFloat(JSONdata["price"]);
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
    this.id = 0;
    this.userId = 0;
    this.date = 0;
    this.items = [];
    this.totalPrice = 0;
};