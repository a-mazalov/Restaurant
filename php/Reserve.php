<?php
    require('connectDB.php');
    header('Access-Control-Allow-Origin: *');

    $Reserve = $_GET;
//    echo $Reserve["numguest"];


//$query = "INSERT INTO `Restaurant`.`Reserve_table` (`Num_reserve`, `Num_desk`, `Date`, `Time`, `Count_guest`, `Name`, `LastName`, `Telephone`, `Notes`) VALUES (NULL, '0', '2017-03-22', '03:00:00', '5', 'Laala', 'ydtdh', '5674567', 'gjfgh');";

//    $query = "INSERT INTO `Reserve_table`
//        (`Num_reserve`, `Num_desk`, `Date`, `Time`, `Num_guest`, `Name`, `LastName`, `Telephone`, `Notes`) VALUES ('NULL','0','{$Reserve["date"]}','{$Reserve["time"]}','{$Reserve["numguest"]}','{$Reserve["name"]}','{$Reserve["lastName"]}','{$Reserve["telephone"]}','{$Reserve["notes"]}')";
    
  $query = "INSERT INTO `Restaurant`.`Reserve_table` (`Num_reserve`, `Num_desk`, `Date`, `Time`, `Count_guest`, `Name`, `LastName`, `Telephone`, `Notes`) VALUES (NULL,'0','{$Reserve["date"]}','{$Reserve["time"]}',{$Reserve["numguest"]},'{$Reserve["name"]}','{$Reserve["lastName"]}','{$Reserve["telephone"]}','{$Reserve["notes"]}')";

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