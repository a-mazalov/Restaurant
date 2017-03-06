<?php
    header('Access-Control-Allow-Origin: *');
    require('connectDB.php');

    $query = "SELECT `title` FROM `Menu_table`";
    $result = $DB->query($query);

    $data = array();

    foreach ($result as $row){
        $data[] = $row;
    }

    echo json_encode($data);
//    echo $result;

//    echo "TEST!!!";

?>     

