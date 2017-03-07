<?php
    $DB = mysqli_connect("workproject", "root", "", "Restaurant") or die("Нет соединения с БД");
        mysqli_set_charset($DB, "utf8") or die("Нет соединения");
?>