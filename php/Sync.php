<?php
    require('connectDB.php');
    require('tools.php');
    header('Access-Control-Allow-Origin: *');


//    var_dump($_GET);
    $DataJS = $_GET;

    $Section = $DataJS[0]["Section"];
    $Mode = $DataJS[0]["Mode"];
    $ID_user = $DataJS[1]["id_Account"];
    $ArrayDish = $DataJS[2];
    

    if($Section == "Favorite"){
        SyncFav($ID_user,$Mode,$ArrayDish,$pdo);
    }

    function SyncFav($ID_user,$Mode,$ArrayDish,$pdo){
        
//        var_dump($ArrayDish);
        
//        $FavDishServer = $pdo->prepare('SELECT ID_dish FROM Favorite_table WHERE ID_user = :id');
        
        if($Mode == "Count"){
            $FavDishServer = $pdo->prepare('SELECT * FROM Menu_table WHERE ID_dish IN (SELECT Favorite_table.ID_dish FROM Favorite_table WHERE Favorite_table.ID_user = :id)');
            $FavDishServer->execute(array('id' => $ID_user));
            $FavDishServer = $FavDishServer->fetchAll();

            echo json_encode( [$Mode,count($FavDishServer)] );
        }
        
       
        if($Mode == "Read"){
            
            $FavDishServer = $pdo->prepare('SELECT * FROM Menu_table WHERE ID_dish IN (SELECT Favorite_table.ID_dish FROM Favorite_table WHERE Favorite_table.ID_user = :id)');
            $FavDishServer->execute(array('id' => $ID_user));
            $FavDishServer = $FavDishServer->fetchAll();

            echo json_encode([$Mode,$FavDishServer]);
            
        }
//        $ServerList = array ();
//        foreach($FavDishServer as $key){
//            $ServerList[] = $key["ID_dish"];
//        }
//
//        echo json_encode($ServerList);
//        INSERT INTO `Restaurant`.`Favorite_table` (`ID_favorite`, `ID_dish`, `ID_user`) VALUES (NULL, '4', '14');
        if($Mode == "Write"){
            
            
            $ClearData = $pdo->prepare('DELETE FROM Favorite_table WHERE ID_user = ?');
            $ClearData->execute(array($ID_user));
            
            $FavWrite = $pdo->prepare('
                INSERT INTO Favorite_table (ID_favorite, ID_dish, ID_user) VALUES (NULL, :dish, :id_user)
            ');
                    
            for($i = 0, $arr_l = count($ArrayDish); $i<$arr_l; $i++){
//                echo $ArrayDish[$i];
                
                $FavWrite->execute(array('dish' => $ArrayDish[$i], 'id_user' => $ID_user));
                
            } 
//            echo "IF TRUE WRITE";
            echo json_encode([$Mode]);
        }
        
}




        //Данные с локального хранилища аккаунта, список избранного
//        $AccountList = array ();
//
//        foreach( $ArrayDish as $key){
//            $AccountList[] = (int)$key["ID_dish"];
//        }
//        echo "sdf";
            

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
