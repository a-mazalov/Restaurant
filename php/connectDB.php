<?php
//    $DB = mysqli_connect("workprojectmobile", "root", "", "Restaurant") or die("Нет соединения с БД");
//        mysqli_set_charset($DB, "utf8") or die("Нет соединения");

    
    $host = 'workprojectmobile';
    $database   = 'Restaurant';
    $user = 'root';
    $pass = '';
    $charset = 'utf8';

    $dsn = "mysql:host=$host;dbname=$database;charset=$charset";
    
    $opt = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    
    $pdo = new PDO($dsn, $user, $pass, $opt);
    
?>