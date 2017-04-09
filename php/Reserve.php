<?php
    require('connectDB.php');
    require('tools.php');
    header('Access-Control-Allow-Origin: *');

//    var_dump($_GET);

    $DataInput = checkEmptyInput($_GET, ["notes"]); 
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

    $query = $pdo->prepare('INSERT INTO Reserve_table (Num_reserve, Num_desk, Date, Time, Count_guest, Name, LastName, Telephone, Notes) VALUES (NULL, "0", :date, :time, :numguest, :name ,:lastName, :telephone,:notes)');
    
    $query->execute(array('date' => $DataInput["date"],'time' => $DataInput["time"], 'numguest' => $DataInput["numguest"], 'name' => $DataInput["name"], 'lastName' => $DataInput["lastName"], 'telephone' => $DataInput["telephone"], 'notes' => $DataInput["notes"] ));
        
    $data = $query->fetchAll();

    
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