<?php
    include "server/libs/xtemplate/xtemplate.class.php";
    $template = new XTemplate("server/templates/index.html");



    $template -> parse("main");
    $template -> out("main");
?>