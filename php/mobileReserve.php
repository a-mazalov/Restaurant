<?php
    require('connectDB.php');
    require('tools.php');
    header('Access-Control-Allow-Origin: *');

//    var_dump($_GET);

//    $DataInput = checkEmptyInput($_GET, ["notes"]); 
    $DataReserve = $_GET;
//    var_dump($_GET);

//    var_dump($DataReserve);

    $ID_Account = $DataReserve["ID_account"];
    $DataInput = $DataReserve["InfoReserve"];
    $Token = $DataReserve["Token"];

    
    $Order = $DataReserve["Order"];
//    var_dump($Order);



//    echo $ID_Account;  
//    echo $DataInput;
//    var_dump($DataInput);
//    var_dump($Order);
//    echo $Order;






    if ( isset($Order) ){
        $CheckOrder = true;
    }else{
        $CheckOrder = false;
    }

    $query = $pdo->prepare('INSERT INTO Reserve_table (ID_reserve, TypeOrder, ID_user, CheckOrdMenu, Date, Time, Count_guest, Name, LastName, Telephone, Notes, Data_create, TokenMessage) VALUES (NULL, "mobile", :id_account, :checkOrdMenu, :date, :time, :numguest, :name, :lastName, :telephone, :notes, :data_create, :token)');
    
    $query->execute(array(
        'id_account' => $ID_Account,
        'checkOrdMenu' => $CheckOrder,
        'date' => $DataInput["date"],
        'time' => $DataInput["time"], 
        'numguest' => $DataInput["numguest"], 
        'name' => $DataInput["name"], 
        'lastName' => $DataInput["lastName"], 
        'telephone' => $DataInput["telephone"], 
        'notes' => $DataInput["notes"],
        'data_create' => date('Y-m-d H:i'),
        'token' => $Token
    ));

    if ($CheckOrder){
        
//        var_dump($Order);
        
        $ID_reserve = $pdo->lastInsertId();
        
        $ResMenu = $pdo->prepare('INSERT INTO ReserveMenu_table (ID_resMenu, ID_reserve, ID_dish, Amount_dish) VALUES (NULL, :id_reserve, :id_dish, :amount_dish)');
           
        for($i = 0, $arr_l = count($Order); $i<$arr_l; $i++){
            
//            echo $Order[$i]["Amount"];
            
            $ResMenu->execute(array(
                'id_dish' => $Order[$i]["ID_dish"],
                'amount_dish' => $Order[$i]["Amount"],
                'id_reserve' => $ID_reserve
            ));
//            print_r($Order[$i]["Amount"]);
        }
    }












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