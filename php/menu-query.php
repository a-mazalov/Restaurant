<?php
    require('connectDB.php');
    header('Access-Control-Allow-Origin: *');


$query = "SELECT `ID_dish`, `Title_dish`, `Caption_dish`, `Price_dish`, `Category_dish`, `ImagePath`, IF(`Available` = 1, true, false) as `Available` FROM `Menu_table`";
        $result = $pdo->query($query); 

    //var_dump($result);

    $data = array();
    $i = 0;
    foreach ($result as $row){
          //var_dump($row);
//        if($row["Category_dish"] == "Десерт"){
//            $data["Dessert"][++$i] = $row;
//            
//        }
//        if($row["Category_dish"] == "Суп"){
//            $data["Sup"][++$i] = $row;
//            
//        }  
//        Запись в массив по категориям
        $category = $row["Category_dish"];
        $data[$category][++$i] = $row;
  
    }
        //var_dump($data);
        echo json_encode($data);
//echo json_last_error();
//        echo $data;

?>     

