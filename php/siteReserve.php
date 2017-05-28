<?php
    require('connectDB.php');
    require('tools.php');
    header('Access-Control-Allow-Origin: *');

//    var_dump($_GET);

//    $DataInput = checkEmptyInput($_GET, ["notes"]); 
    $DataInput = $_GET;

//
//INSERT INTO `Restaurant`.`Reserve_table` (`ID_reserve`, `TypeOrder`, `ID_user`, `CheckOrdMenu`, `Date`, `Time`, `Count_guest`, `Name`, `LastName`, `Telephone`, `Notes`, `Data_create`, `Status`, `TokenMessage`) VALUES (NULL, 'site', NULL, '0', '2017-05-24', '15:00:00', '3', 'asdf', 'sdffd', '+37345414', '325fdgh', '2017-05-20 16:18:00', 'new', NULL);


    $query = $pdo->prepare('INSERT INTO Reserve_table (ID_reserve, TypeOrder, ID_user, CheckOrdMenu, Date, Time, Count_guest, Name, LastName, Telephone, Notes, Data_create, Status, TokenMessage) VALUES (NULL, "site", NULL, 0, :date, :time, :numguest, :name, :lastName, :telephone, :notes, :data_create, "new", NULL)');
    
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