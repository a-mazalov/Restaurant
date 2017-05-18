<?php
    require('connectDB.php');
    require('tools.php');
    header('Access-Control-Allow-Origin: *');

//    var_dump($_GET);

//    $DataInput = checkEmptyInput($_GET, ["notes"]); 



    $DataGET = $_GET;


//    var_dump($DataGET);


switch($DataGET["action"]){
    case "delete":    
        $queryDelete = $pdo->prepare('DELETE FROM `Reserve_table` WHERE `ID_reserve` = :id_reserve');  
        $queryDelete->execute(array(
            'id_reserve' => $DataGET["item"],
        ));
        var_dump($DataGET["item"]);
            echo "switch delete"; 
            break;
        
    case "update":
        $ArrayDish = $DataGET["item"];
        $queryUpdate = $pdo->prepare('UPDATE `Restaurant`.`Menu_table` SET `Title_dish` = :title_dish, `Caption_dish` = :caption_dish, `Price_dish` = :price_dish, `Available` = :available WHERE `ID_dish` = :id_dish');    
            for($i = 0, $arr_l = count($ArrayDish); $i<$arr_l; $i++){
                $queryUpdate->execute(array(
                    'title_dish' => $ArrayDish[$i]["Title_dish"],
                    'caption_dish' => $ArrayDish[$i]["Caption_dish"],
                    'price_dish' => $ArrayDish[$i]["Price_dish"],
    //                    'category_dish' => $ArrayDish["Category_dish"],
    //                    'imagePath' => $ArrayDish[$i]["ImagePath"],
                    'available' => $ArrayDish[$i]["Available"],
                    'id_dish' => $ArrayDish[$i]["ID_dish"],
                ));

            }  
        echo "switch update"; 
        break;
    case "newDish":
        
        $ArrayNewDish = $DataGET["item"];
//        var_dump();
        $queryNewDish = $pdo->prepare('INSERT INTO Restaurant.Menu_table (ID_dish, Title_dish, Caption_dish, Price_dish, Category_dish, ImagePath, Available) VALUES (NULL,:title_dish, :caption_dish, :price_dish, :category_dish, "img/food/id_default", "1")');
                
        $queryNewDish->execute(array(
            'title_dish' => $ArrayNewDish["Title_dish"],
            'caption_dish' => $ArrayNewDish["Caption_dish"],
            'price_dish' => $ArrayNewDish["Price_dish"],
            'category_dish' => $ArrayNewDish["Category_dish"]
//                    'imagePath' => $ArrayDish[$i]["ImagePath"],
//            'available' => $ArrayDish["Available"],
        ));

        
        
        echo "switch newDish"; 
        break;

}


//DELETE FROM `Reserve_table` WHERE `ID_reserve` = 70


////    var_dump($_GET);
//
////    var_dump($DataReserve);
//
//    $ID_Account = $DataReserve["ID_account"];
//    $DataInput = $DataReserve["InfoReserve"];
//
//    
//    $Order = $DataReserve["Order"];
////    var_dump($Order);
//
//
//
////    echo $ID_Account;  
////    echo $DataInput;
////    var_dump($DataInput);
////    var_dump($Order);
////    echo $Order;
//
//
//
//
//
//
//
//    if ( isset($Order) ){
//        $CheckOrder = true;
//    }else{
//        $CheckOrder = false;
//    }
//
//    $query = $pdo->prepare('INSERT INTO Reserve_table (ID_reserve, TypeOrder, ID_user, CheckOrdMenu, Num_desk, Date, Time, Count_guest, Name, LastName, Telephone, Notes) VALUES (NULL, "mobile", :id_account, :checkOrdMenu, NULL, :date, :time, :numguest, :name, :lastName, :telephone, :notes)');
//    
//    $query->execute(array(
//        'id_account' => $ID_Account,
//        'checkOrdMenu' => $CheckOrder,
//        'date' => $DataInput["date"],
//        'time' => $DataInput["time"], 
//        'numguest' => $DataInput["numguest"], 
//        'name' => $DataInput["name"], 
//        'lastName' => $DataInput["lastName"], 
//        'telephone' => $DataInput["telephone"], 
//        'notes' => $DataInput["notes"] 
//    ));
//
//    if ($CheckOrder){
//        
////        var_dump($Order);
//        
//        $ID_reserve = $pdo->lastInsertId();
//        
//        $ResMenu = $pdo->prepare('INSERT INTO ReserveMenu_table (ID_resMenu, ID_reserve, ID_dish, Amount_dish) VALUES (NULL, :id_reserve, :id_dish, :amount_dish)');
//           
//        for($i = 0, $arr_l = count($Order); $i<$arr_l; $i++){
//            
////            echo $Order[$i]["Amount"];
//            
//            $ResMenu->execute(array(
//                'id_dish' => $Order[$i]["ID_dish"],
//                'amount_dish' => $Order[$i]["Amount"],
//                'id_reserve' => $ID_reserve
//            ));
////            print_r($Order[$i]["Amount"]);
//        }
//    }












//            for($i = 0, $arr_l = count($Order); $i<$arr_l; $i++){
////                echo $ArrayDish[$i];
//                
//                $FavWrite->execute(array('dish' => $Order[$i], 'id_user' => $ID_Account));
//                
             

//    var_dump($DataInput);
//    echo json_encode($data);
    
//    function test($d,$opt){
////        if( isset($opt[$d]) ){
////            echo "true";
////        }
////        
//      var_dump(in_array($d, $opt));
//        
////        echo $opt;
//    }
//    
//    test("date",["notes","date"]);

//    if(isset($_GET))
//        $Reserve = $_GET;
//


//        
//    $data = $query->fetchAll();

    
//SELECT * FROM `Reserve_table`
//    $query = "SELECT * FROM `{$test}` ";
////
////    echo $query;
//    
//
//    $data = array();
//    
//    echo json_encode($data);

    ?> 