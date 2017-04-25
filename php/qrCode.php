<?php
    require('connectDB.php');
    require('tools.php');
    header('Access-Control-Allow-Origin: *');


//    var_dump($_GET);


    
//    $DataInput = checkEmptyInput($_GET); 
    $DataCode = $_GET[0]["ValueCode"];
    $ID_Account = $_GET[0]["ID_account"];

    //Получение данных о коде
    $query = $pdo->prepare("SELECT ID_code,Bonus, Type, Amount FROM `QRcodes_table` WHERE QRcode = :code ");
    $query->execute(array('code' => $DataCode) );
    $DataDB = $query->fetchAll();

    //Если код существует, тогда
    if( ( count($DataDB) > 0 ) && ($DataDB != NULL) ){
        //Если код существует, проверить на доступность
        if($DataDB[0]["Amount"] > 0){
            
            $chekAccount = $pdo->prepare("SELECT * FROM UsedCode_table WHERE ID_code = :id_code AND ID_user = :id_account");
            $chekAccount->execute(array('id_code' => $DataDB[0]["ID_code"], 'id_account' => $ID_Account) );
            $chekAccount = $chekAccount->fetchAll();
            
            if(count($chekAccount) < 1){
                
                //Добавить в таблицу использованых кодов
                $UseCode = $pdo->prepare("INSERT INTO UsedCode_table (ID_UsedCode, ID_code, ID_user) VALUES (NULL, :id_code, :id_account)");
                $UseCode->execute(array('id_code' => $DataDB[0]["ID_code"], 'id_account' => $ID_Account) );
                
                    //Начислить бонусы на аккаунт
                    $BonusSet = $pdo->prepare("UPDATE Accounts_table SET Bonus = Bonus + :Bonus WHERE ID_user = :id_account");
                    $BonusSet->execute(array('Bonus' => $DataDB[0]["Bonus"], 'id_account' => $ID_Account ) );
                
                        //Уменьшить количество кодов
                        $Amount = $pdo->prepare("UPDATE QRcodes_table SET Amount = Amount -1  WHERE ID_code = :ID_code");
                        $Amount->execute( array('ID_code' => $DataDB[0]["ID_code"]) );
                
//                    $Amount = $pdo->prepare("UPDATE QRcodes_table SET Amount = Amount -1  WHERE ID_code = :ID_code");
                    
                echo json_encode( array('status' => true, 'data' => $DataDB[0]["Bonus"], 'message' => "Код активирован") ) ;
            }else{
                //Код уже был активирован на данном аккаунте
                echo json_encode( array('status' => false, 'data' => true, 'message' => "Вы уже активировали код") );
            }
        
        }else{
            //Код был, но количество использований превышено.
            echo json_encode( array('status' => false, 'data' => null, 'message' => "Данный код более не действителен") );
        }
        
    }else{
        //Если код не существует
        echo json_encode( array('status' => false, 'data' => null, 'message' => "Данный код не существует") );
    }

    
    

//    var_dump($DataDB);
//    echo count($DataDB);
//    echo $DataDB[0]["Amount"];
//    echo $DataDB[0][2];11

//    echo $Data;
//
//    $Data = $DataDB[0];
//    echo "DataDB";





//
//    if( password_verify($DataInput["password"],$account[0]["Password"]) ){
//
//        $infoOutput = array_splice($infoOutput,0,5);
//        //Пароли совпадают, возврат данных о аккаунте.
//        echo json_encode( $infoOutput );
//    }else{
//        $out = 0;
//        echo $infoOutput;
//    }

    ?> 