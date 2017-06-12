<?php
    require('connectDB.php');
    require('tools.php');
    header('Access-Control-Allow-Origin: *');

//    var_dump($_GET);

//    $DataInput = checkEmptyInput($_GET, ["notes"]); 



    $DataGET = $_GET;

//    echo $pdo->lastInsertId();
//    var_dump($DataGET);


switch($DataGET["action"]){
    
           
    case "acceptReserve":    
        $queryDelete = $pdo->prepare('UPDATE `Reserve_table` SET `Status` = "accept" WHERE `reserve_table`.`ID_reserve` = :id_reserve');  
        $queryDelete->execute(array(
            'id_reserve' => $DataGET["item"]["ID_reserve"],
        ));
            break;    
    
    case "deleteReserve":    
        $queryDelete = $pdo->prepare('DELETE FROM `Reserve_table` WHERE `ID_reserve` = :id_reserve');  
        $queryDelete->execute(array(
            'id_reserve' => $DataGET["item"]["ID_reserve"],
        ));
            break;
        
    case "update":
        $ArrayDish = $DataGET["item"];
        
//        var_dump($ArrayDish);
        $chgDate = date('Y-m-d H:i:s');
        
        
$queryUpdate = $pdo->prepare("UPDATE `Menu_table` SET `Title_dish` = :title_dish, `Caption_dish` = :caption_dish, `Price_dish` = :price_dish, `Available` = IF(:available = 'true', 1, 0), `DateСhange` = '$chgDate' WHERE `ID_dish` = :id_dish");    
            for($i = 0, $arr_l = count($ArrayDish); $i<$arr_l; $i++){
                $queryUpdate->execute(array(
                    'title_dish' => $ArrayDish[$i]["Title_dish"],
                    'caption_dish' => $ArrayDish[$i]["Caption_dish"],
                    'price_dish' => $ArrayDish[$i]["Price_dish"],
    //                    'category_dish' => $ArrayDish["Category_dish"],
    //                    'imagePath' => $ArrayDish[$i]["ImagePath"],
//                    'available' => $ArrayDish[$i]["Available"],
                    'available' => $ArrayDish[$i]["Available"],
                    'id_dish' => $ArrayDish[$i]["ID_dish"]
                ));

            }  
        echo "switch update"; 
        break;
    case "newDish":
        
        $ArrayNewDish = $DataGET["item"];
//        echo $ArrayNewDish["Image"];
        $imgSwitch = $ArrayNewDish["Image"];
        $imgSwitch = json_decode($imgSwitch);
        if($imgSwitch){
//            $querylastID = $pdo->query('SELECT max(`ID_dish`) as ID FROM Menu_table');
//            $querylastID = $pdo->query("SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'user2027666_RestDB' AND TABLE_NAME = 'Menu_table'");
            
            ///////////////
            
                //ИЗ-ЗА СМЕНЫ СЕРВЕРА НЕОБХОДИМО ИЗМЕНИТЬ БД ДЛЯ ПОЛУЧЕНИЯ ПОСЛЕДНЕГО АВТОИНКРЕМЕНТА
            
            ///////////////
            
            $querylastID = $pdo->query("SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'Restaurant' AND TABLE_NAME = 'Menu_table'");
            $querylastID = $querylastID->fetch();
//            $lastID = $querylastID["ID"]+1;
            $lastID = $querylastID["AUTO_INCREMENT"];
//            var_dump($lastID);
            $imgPath = 'img/food/id_'.$lastID.'.jpg';
//            var_dump($imgPath);
        }else{
            $imgPath = "img/food/id_default.jpg";
        }
//            $ArrayDish["ImagePath"] = "img/food/id_default.jpg";
//        var_dump($ArrayNewDish);
        
        $queryNewDish = $pdo->prepare('INSERT INTO Menu_table (ID_dish, Title_dish, Caption_dish, Price_dish, Category_dish, ImagePath, Available) VALUES (NULL,:title_dish, :caption_dish, :price_dish, :category_dish, :imgPath, "1")');
                
        $queryNewDish->execute(array(
            'title_dish' => $ArrayNewDish["Title_dish"],
            'caption_dish' => $ArrayNewDish["Caption_dish"],
            'price_dish' => $ArrayNewDish["Price_dish"],
            'category_dish' => $ArrayNewDish["Category_dish"],
            'imgPath' => $imgPath
//            'available' => $ArrayDish["Available"],
        ));
        echo $pdo->lastInsertId();
        
//        echo "switch newDish"; 
        break;
    
    case "deleteDish":
        
        $ArrayDelDish = $DataGET["item"];
        
        $queryDelDish = $pdo->prepare('DELETE FROM `Menu_table` WHERE `Menu_table`.`ID_dish` = :id_dish');  
        $queryDelDish->execute(array(
            'id_dish' => $ArrayDelDish
        ));
        
        break;
    case "checkBonus":
        
            $ID_Account = $DataGET["item"];
        
        
            $BonusSet = $pdo->prepare("SELECT `Bonus` FROM `Accounts_table` WHERE `ID_user` = :id_account");
            $BonusSet->execute(array('id_account' => $ID_Account ) );
            
            $infoOutput = $BonusSet->fetchAll();
            echo json_encode($infoOutput[0]["Bonus"]);
//            echo  $infoOutput ;   
        
        break;
    case "checkMenu":
            
//            var_dump($numDish);
        $numDish = $DataGET["item"];
        
        $queryLine = implode("," , $numDish);
$MenuCheck = $pdo->prepare("SELECT `ID_dish`, `Title_dish`, `Caption_dish`, `Price_dish`, `Category_dish`, `ImagePath`, IF(`Available` = 1, true, false) as `Available`, `DateСhange` FROM `Menu_table` WHERE `ID_dish` IN ($queryLine)");
$MenuCheck->execute();
        $infoOutput = $MenuCheck->fetchAll();
        echo json_encode($infoOutput);    
        break;
        
    case "checkListBonus":

    $ListQR= $pdo->query("SELECT * FROM `QRcodes_table` ORDER BY `QRcodes_table`.`ID_code` DESC");
    $infoOutput = $ListQR->fetchAll();
        echo json_encode($infoOutput);  
        break;
        
    case "createBonusCode":    
                
        $DataCode = $DataGET["item"];
        
        $queryCreateBonus = $pdo->prepare("INSERT INTO `QRcodes_table` (`ID_code`, `QRcode`, `Bonus`, `Type`, `Amount`) VALUES (NULL, :inpQR, :bonus, NULL, :amount)");
                
        $queryCreateBonus->execute(array(
            'inpQR' => $DataCode["inpQR"],
            'bonus' => $DataCode["bonusQR"],
            'amount' => $DataCode["amountQR"]
//            'available' => $ArrayDish["Available"],
        ));
        
        break;
    case "deleteBonusCode":
        
        $ID_BonusCode = $DataGET["item"];
        var_dump($ID_BonusCode);
        $queryDelBonus = $pdo->prepare("DELETE FROM `QRcodes_table` WHERE `qrcodes_table`.`ID_code` = :id_code");  
        $queryDelBonus->execute(array(
            'id_code' => $ID_BonusCode
        ));
        
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