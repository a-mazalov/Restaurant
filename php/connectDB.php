<?php
//    $DB = mysqli_connect("workproject", "root", "", "Restaurant") or die("Нет соединения с БД");
//        mysqli_set_charset($DB, "utf8") or die("Нет соединения");

    
//    $host = 'workproject';
//    $database   = 'Restaurant';
//    $user = 'root';
//    $pass = '';
//    $charset = 'utf8';
//
//    $dsn = "mysql:host=$host;dbname=$database;charset=$charset";
//    
//    $opt = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES   => false];
//    
//    $pdo = new PDO($dsn, $user, $pass,$opt);
//    $pdo->exec("set names utf8");


//
    $host = 'by111.atservers.net';
    $database   = 'user2027666_RestDB';
    $user = 'Rest';
    $pass = '20031998';
    $charset = 'utf8';

    $dsn = "mysql:host=$host;dbname=$database;charset=$charset";
    
    $opt = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, PDO::ATTR_EMULATE_PREPARES   => false];
    
    $pdo = new PDO($dsn, $user, $pass,$opt);
    $pdo->exec("set names utf8");

?>