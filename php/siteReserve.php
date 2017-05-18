<?php
    require('connectDB.php');
    require('tools.php');
    header('Access-Control-Allow-Origin: *');

//    var_dump($_GET);

//    $DataInput = checkEmptyInput($_GET, ["notes"]); 
    $DataInput = $_GET;


    $query = $pdo->prepare('INSERT INTO Reserve_table (ID_reserve, TypeOrder, ID_user, CheckOrdMenu, Num_desk, Date, Time, Count_guest, Name, LastName, Telephone, Notes, Data_create) VALUES (NULL, "site", NULL, 0, NULL, :date, :time, :numguest, :name, :lastName, :telephone, :notes, :data_create)');
    
    $query->execute(array(
        'date' => $DataInput["date"],
        'time' => $DataInput["time"], 
        'numguest' => $DataInput["numguest"], 
        'name' => $DataInput["name"], 
        'lastName' => $DataInput["lastName"], 
        'telephone' => $DataInput["telephone"], 
        'notes' => $DataInput["notes"],
        'data_create' => date('Y-m-d H:i')
    ));

?> 