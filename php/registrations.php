<?php

    require('connectDB.php');
    require('tools.php');
    header('Access-Control-Allow-Origin: *');

    $DataInput = checkEmptyInput($_GET); 


    $query = $pdo->prepare('INSERT INTO Accounts_table (ID_user, Telephone, Password, Name, LastName, Num_reserve, ID_favorites, Bonus) VALUES (NULL, :telephone, :password, :name, :lastName, NULL ,NULL, 0)');
    

    try {
        $query->execute(array('telephone' => $DataInput["telephone"],'password' => password_hash($DataInput["password"],PASSWORD_DEFAULT), 'name' => $DataInput["name"], 'lastName' => $DataInput["lastName"]));
        $registr = $query->fetchAll();
        echo 'true';
    } catch(PDOException $e) {
        echo 'false';
    }    

?> 