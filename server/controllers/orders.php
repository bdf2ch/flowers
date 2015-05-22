<?php
    include "../config.php";

    $postdata = json_decode(file_get_contents('php://input'));
    $action = $postdata -> action;
    $connection = mysql_connect($db_host, $db_user, $db_password);
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
        case "add":
            add_order($postdata);
            break;
    };



    function add_order ($postdata) {
        global $connection;
        $current_time = time();
        $result;

        $query = mysql_query(
            'INSERT INTO orders (
                user_id,
                customer_name,
                customer_fname,
                customer_surname,
                customer_phone,
                customer_email,
                payment_method_id,
                customer_gender_id,
                reciever_gender_id,
                reciever_name,
                reciever_fname,
                reciever_surname,
                reciever_phone,
                address_city_id,
                address_street,
                address_building,
                address_building_index,
                address_flat,
                comment,
                customer_is_reciever,
                created
            ) VALUES (
                $postdata -> userId,
                $postdata -> customerName,
                $postdata -> customerFname,
                $postdata -> customerSurname,
                $postdata -> customerPhone,
                $postdata -> customerEmail,
                $postdata -> paymentMethodId,
                $postdata -> customerGenderId,
                $postdata -> recieverGenderId,
                $postdata -> recieverName,
                $postdata -> recieverFname,
                $postdata -> recieverSurname,
                $postdata -> recieverPhone,
                $postdata -> addressCityId,
                $postdata -> addressStreet,
                $postdata -> addressBuilding,
                $postdata -> addressBuildingIndex,
                $postdata -> addressFlat,
                $postdata -> comment,
                $postdata -> customerIsReciever,
                $currentTime
            )'
        );
        if (!$query) {
            die('Неверный запрос: ' . mysql_error());
        } else {
            $order_id = mysql_insert_id();
            $query_order = mysql_query("SELECT * FROM orders WHERE order_id = $order_id");

            if (!$query_order) {
                die('Неверный запрос: ' . mysql_error());
            } else {
                $row = mysql_fetch_assoc($query))
            }
        }

        echo(json_encode($result));

        mysql_free_result($query);
        mysql_close($connection);
    }
?>