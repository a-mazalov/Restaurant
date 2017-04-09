<?php
    require('connectDB.php');
    header('Access-Control-Allow-Origin: *');

    $loginIn = $_GET;
    var_dump($loginIn);
//    echo "PHP";
//    $test = password_hash($loginIn["password"],PASSWORD_DEFAULT);
    
//    $sql = ';
    $telephone = $loginIn["telephone"];
    $query = $pdo->prepare("SELECT * FROM `Accounts_table` WHERE `Telephone` LIKE :telefone");
    $query->execute(array('telefone' => $loginIn["telephone"]));
    $account = $query->fetchAll();
    
    echo json_encode($account);
//    $query = "SELECT * FROM `Accounts_table` WHERE `Telephone` LIKE '{$loginIn["telephone"]}'' OR '_{$loginIn["telephone"]}' OR '______{$loginIn["telephone"]}' LIMIT 1";
//
//    $result = $DB->query($query); 
////    echo $result["num_rows"];
//    foreach ($query as $row){
//        $data[] = $row;
//    }
//    echo json_encode($data);


//    if(password_verify())

//$query = "INSERT INTO `Restaurant`.`Reserve_table` (`Num_reserve`, `Num_desk`, `Date`, `Time`, `Count_guest`, `Name`, `LastName`, `Telephone`, `Notes`) VALUES (NULL, '0', '2017-03-22', '03:00:00', '5', 'Laala', 'ydtdh', '5674567', 'gjfgh');";

//    $query = "INSERT INTO `Reserve_table`
//        (`Num_reserve`, `Num_desk`, `Date`, `Time`, `Num_guest`, `Name`, `LastName`, `Telephone`, `Notes`) VALUES ('NULL','0','{$Reserve["date"]}','{$Reserve["time"]}','{$Reserve["numguest"]}','{$Reserve["name"]}','{$Reserve["lastName"]}','{$Reserve["telephone"]}','{$Reserve["notes"]}')";
//    
//  $query = "INSERT INTO `Restaurant`.`Reserve_table` (`Num_reserve`, `Num_desk`, `Date`, `Time`, `Count_guest`, `Name`, `LastName`, `Telephone`, `Notes`) VALUES (NULL,'0','{$Reserve["date"]}','{$Reserve["time"]}',{$Reserve["numguest"]},'{$Reserve["name"]}','{$Reserve["lastName"]}','{$Reserve["telephone"]}','{$Reserve["notes"]}')";

//SELECT * FROM `Reserve_table`
//    $query = "SELECT * FROM `{$test}` ";
////
////    echo $query;
//    
//
//    $data = array();
//    

    ?> 