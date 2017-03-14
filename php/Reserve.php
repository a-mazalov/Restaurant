<?php
    require('connectDB.php');
//    header('Access-Control-Allow-Origin: *');

    $Reserve = $_GET;
//    echo $Reserve["numguest"];


$query = "INSERT INTO `Reserve_table`
        (`Num_reserve`, `Num_desk`, `Date`, `Time`, `Num_guest`, `Name`, `LastName`, `Telephone`, `Notes`) VALUES ('','NULL','{$Reserve["date"]}','{$Reserve["time"]}','{$Reserve["numguest"]}','{$Reserve["name"]}','{$Reserve["lastName"]}','{$Reserve["telephone"]}','{$Reserve["notes"]}')";
    


//SELECT * FROM `Reserve_table`
//    $query = "SELECT * FROM `{$test}` ";
////
    $result = $DB->query($query); 
////    echo $query;
//    
//
//    $data = array();
//    
//    foreach ($result as $row){
//        $data[] = $row;
//    }
//    echo json_encode($data);

    ?> 