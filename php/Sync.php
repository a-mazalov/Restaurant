<?php
    require('connectDB.php');
    require('tools.php');
    header('Access-Control-Allow-Origin: *');


//    var_dump($_GET);


    $AccountList = array ();
        
    foreach($_GET as $key){
        $AccountList[] = $key["ID_dish"];
    }
    var_dump($AccountList);


    $ServerList = array ();

    $ActualDishServer = $pdo->query('SELECT ID_favorite, ID_dish, ID_user FROM Favorite_table WHERE ID_user = 14');
    $ActualDishServer = $ActualDishServer->fetchAll();

    foreach($ActualDishServer as $key){
        $ServerList[] = $key["ID_dish"];
    }
    
    var_dump($ActualDishServer);
    
//    echo $accountList;
//    INSERT INTO `Restaurant`.`Favorite_table` (ID_favorite, ID_dish, ID_user) VALUES (NULL, '8', '14');
    

//    $query = $pdo->prepare('INSERT INTO Favorite_table (ID_favorite, ID_dish, ID_user) VALUES (NULL, :dish, :account)');
//
//    
////    $pdo->beginTransaction();
////    $pdo->commit();
//
//    try {
//        $query->execute(array('telephone' => $DataInput["telephone"],'password' => password_hash($DataInput["password"],PASSWORD_DEFAULT), 'name' => $DataInput["name"], 'lastName' => $DataInput["lastName"]));
//        $registr = $query->fetchAll();
//        echo 'true';
//    } catch(PDOException $e) {
//        echo 'false';
//    }    


    ?> 