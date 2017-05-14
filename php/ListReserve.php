<?php
    header('Access-Control-Allow-Origin: *');
    require('connectDB.php');
        $query = "SELECT * FROM `Reserve_table`";
        $result = $pdo->query($query); 

    $data = array();
    $i = 0;
    foreach ($result as $row){
//        if($row["Category_dish"] == "Десерт"){
//            $data["Dessert"][++$i] = $row;
//            
//        }
//        if($row["Category_dish"] == "Суп"){
//            $data["Sup"][++$i] = $row;
//            
//        }  
//        Запись в массив по категориям
//        $category = $row["Category_dish"];
//        $data[$category][++$i] = $row;
        $data[] = $row;
  
    }
        echo json_encode($data);


?>     

