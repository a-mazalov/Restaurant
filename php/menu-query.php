<?php
    header('Access-Control-Allow-Origin: *');
    require('connectDB.php');

    $query = "SELECT * FROM `Menu_table`";

    $result = $DB->query($query); 

//    for($i = 0; $i<20; $i++){
//            $query = "INSERT INTO `Restaurant`.`Menu_table` (`id`, `title`, `caption`) VALUES (NULL, 'title_{$i}', 'Caption_{$i}')";
//            $result = $DB->query($query);
//        echo "Цикл:"+$i;
//    }



    $data = array();
    
    foreach ($result as $row){
        $data[] = $row;
    }
//    var_dump($_POST);
    echo json_encode($data);
//    echo $result;

//    echo "TEST!!!";

?>     

