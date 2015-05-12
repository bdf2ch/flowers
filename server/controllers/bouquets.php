<?php

    include "../config.php";

    $postdata = file_get_contents('php://input');
    $action = $postdata -> action;
    $connection = mysql_connect($dbhost, $dbuser, $dbpassword);
    if (!$connection) {
        die('Ошибка соединения: ' . mysql_error());
    } else {
        if (!mysql_select_db('lotos51', $connection)) {
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