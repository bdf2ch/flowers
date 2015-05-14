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

    $query_reasons = mysql_query("SELECT * FROM reasons");
    if (!$query_reasons) {
        die('Неверный запрос: ' . mysql_error());
    } else {
        while ($row = mysql_fetch_assoc($query_reasons)) {
            array_push($reasons, $row);
        }
    }
    $result["reasons"] = $reasons;

    $query_addressees = mysql_query("SELECT * FROM addressees");
    if (!$query_addressees) {
        die('Неверный запрос: ' . mysql_error());
    } else {
        while ($row = mysql_fetch_assoc($query_addressees)) {
            array_push($addressees, $row);
        }
    }
    $result["addressees"] = $addressees;

    $query_bouquets = mysql_query("SELECT * FROM bouquets");
    if (!$query_bouquets) {
        die('Неверный запрос: ' . mysql_error());
    } else {
        while ($row = mysql_fetch_assoc($query_bouquets)) {
            array_push($bouquets, $row);
        }
    }
    $result["bouquets"] = $bouquets;

    echo(json_encode($result));

    mysql_free_result($query_reasons);
    mysql_free_result($query_addressees);
    mysql_close($connection);
?>