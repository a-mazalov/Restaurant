<?php

    require('connectDB.php');
    require('tools.php');
    header('Access-Control-Allow-Origin: *');

    $DataInput = checkEmptyInput($_GET); 

//    var_dump($DataInput);
    $query = $pdo->prepare('INSERT INTO Accounts_table (ID_user, Telephone, Password, Name, LastName, Num_reserve, ID_favorites, Bonus) VALUES (NULL, :telephone, :password, :name, :lastName, NULL ,NULL, 0)');
    

    $query->execute(array('telephone' => $DataInput["telephone"],'password' => password_hash($DataInput["password1"],PASSWORD_DEFAULT), 'name' => $DataInput["name"], 'lastName' => $DataInput["lastName"]));
    $registr = $query->fetchAll();

    echo $pdo->lastInsertId();

//    $querylastID = $pdo->query("SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'Restaurant' AND TABLE_NAME = 'Accounts_table'");
//    $querylastID = $querylastID->fetch();
//    $lastID = $querylastID["AUTO_INCREMENT"];
//
//    echo $lastID;

?> 