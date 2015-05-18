<?php
    include "../config.php";

    $connection = mysql_connect($db_host, $db_user, $db_password);
    if (!$connection) {
        die('Ошибка соединения: ' .mysql_error());
    } else {
        if (!mysql_select_db($db_name, $connection)) {
            die ('Не удалось выбрать базу: ' . mysql_error());
        } else {
            mysql_query("SET NAMES 'utf8'");
        }
    }

    $result = array();
    $reasons = array();
    $bouquets = array();
    $addressees = array();
    $images = array();
    $flowers = array();
    $additions = array();

    /* Заполнение массива поводов */
    $query_reasons = mysql_query("SELECT * FROM reasons");
    if (!$query_reasons) {
        die('Неверный запрос: ' . mysql_error());
    } else {
        while ($row = mysql_fetch_assoc($query_reasons)) {
            array_push($reasons, $row);
        }
    }
    $result["reasons"] = $reasons;

    /* Заполнение массива адресатов */
    $query_addressees = mysql_query("SELECT * FROM addressees");
    if (!$query_addressees) {
        die('Неверный запрос: ' . mysql_error());
    } else {
        while ($row = mysql_fetch_assoc($query_addressees)) {
            array_push($addressees, $row);
        }
    }
    $result["addressees"] = $addressees;

    /* Заполнение массива букетов */
    $query_bouquets = mysql_query("SELECT * FROM bouquets");
    if (!$query_bouquets) {
        die('Неверный запрос: ' . mysql_error());
    } else {
        while ($row = mysql_fetch_assoc($query_bouquets)) {
            array_push($bouquets, $row);
        }
    }
    $result["bouquets"] = $bouquets;

    /* Заполнение массива изображений букетов */
    $query_images = mysql_query("SELECT * FROM bouquet_images");
    if (!$query_images) {
        die('Неверный запрос: ' . mysql_error());
    } else {
        while ($row = mysql_fetch_assoc($query_images)) {
            array_push($images, $row);
        }
    }
    $result["images"] = $images;

    /* Заполнение массива изображений букетов */
    $query_flowers = mysql_query("SELECT * FROM flowers");
    if (!$query_flowers) {
        die('Неверный запрос: ' . mysql_error());
    } else {
        while ($row = mysql_fetch_assoc($query_flowers)) {
            array_push($flowers, $row);
        }
    }
    $result["flowers"] = $flowers;

    /* Заполнение массива добавок у букету */
    $query_additions = mysql_query("SELECT * FROM additions");
    if (!$query_additions) {
        die('Неверный запрос: ' . mysql_error());
    } else {
        while ($row = mysql_fetch_assoc($query_additions)) {
            array_push($additions, $row);
        }
    }
    $result["additions"] = $additions;

    echo(json_encode($result));

    mysql_free_result($query_reasons);
    mysql_free_result($query_addressees);
    mysql_close($connection);
?>