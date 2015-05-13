<?php

    include "../config.php";

    mb_internal_encoding("UTF-8");

    $postdata = json_decode(file_get_contents('php://input'));
    $action = $postdata -> action;
    $connection = mysql_connect('mysql.lotos51.myjino.ru', 'lotos51', 'l1mpb1zk1t');
    if (!$connection) {
        die('Ошибка соединения: ' .mysql_error().mysql_errno());
    } else {
        if (!mysql_select_db($db_name, $connection)) {
            die ('Не удалось выбрать базу: ' . mysql_error());
        } else {
            mysql_query("SET NAMES 'utf8'");
        }
    }


    switch ($action) {
        case "get":
            get_bouquets($postdata);
            break;
    };

    /***  Возвращает список букетов ***/
    function get_bouquets ($postdata) {
        $result = array();
        global $connection;

        $query = mysql_query('SELECT * FROM bouquets');
        if (!$query) {
            die('Неверный запрос: ' . mysql_error());
        } else {
            while ($row = mysql_fetch_assoc($query)) {
                array_push($result, $row);
            }
        }

        echo(json_encode($result));
        
        mysql_free_result($query);
        mysql_close($connection);
    };

?>