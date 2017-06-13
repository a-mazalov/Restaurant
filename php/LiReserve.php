<?php
    header('Access-Control-Allow-Origin: *');
    require('connectDB.php');
//        $query = "SELECT * FROM `Reserve_table` ORDER BY `Reserve_table`.`ID_reserve` DESC";
$query = "SELECT 
	`ID_reserve`, 
	`TypeOrder`, 
	`ID_user`, 
	`CheckOrdMenu`, 
	`Date`, 
    TIME_FORMAT(`Time`, '%H:%i') as `Time`,
	`Count_guest`, 
	`Name`, 
	`LastName`, 
	`Telephone`, 
	`Notes`, 
	DATE_FORMAT(`Data_create`, '%Y-%m-%d %H:%i') as `Data_create`,
    Status,
    IF(`UseBonus` = 1, true, false) as UseBonus,
    Bonus,
    TokenMessage
FROM 
	`Reserve_table` 
ORDER BY 
	`Reserve_table`.`ID_reserve` DESC";
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
//        var_dump($row);
        if( ($row["TypeOrder"] == "mobile") && ($row["CheckOrdMenu"] == '1') ){
            
$query = $pdo->prepare('SELECT Title_dish,Caption_dish,Price_dish,Amount_dish FROM Menu_table LEFT JOIN ReserveMenu_table ON Menu_table.ID_dish = ReserveMenu_table.ID_dish WHERE ReserveMenu_table.ID_reserve = :id_reserve');

// $query = $pdo->prepare('SELECT Title_dish,Caption_dish,Price_dish,Amount_dish FROM Menu_table LEFT JOIN ReserveMenu_table ON Menu_table.ID_dish = ReserveMenu_table.ID_dish WHERE ReserveMenu_table.ID_reserve = :id_reserve');
       
//$query = $pdo->prepare('SELECT mt.Title_dish, mt.Caption_dish, mt.Price_dish, pmt.Amount_dish FROM Menu_table mt LEFT JOIN ReserveMenu_table pmt ON mt.ID_dish = pmt.ID_dish WHERE pmt.ID_reserve = :id_reserve');

 //    $query->execute(array('id_reserve' => $row["ID_reserve"]));
           
 $query->execute(array('id_reserve' => $row["ID_reserve"]));
            $row["dishes"] = $query->fetchAll();
            
        }
        $data[] = $row;
  
    }
        echo json_encode($data, JSON_NUMERIC_CHECK);
//var_dump($data);
?>     