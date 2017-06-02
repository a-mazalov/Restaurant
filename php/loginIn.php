<?php
    require('connectDB.php');
    require('tools.php');
    header('Access-Control-Allow-Origin: *');


//    var_dump($_GET);

    $DataInput = checkEmptyInput($_GET); 
    
    $query = $pdo->prepare("SELECT Telephone,Name,LastName,Bonus,ID_user,Password,Num_reserve,ID_favorites FROM Accounts_table WHERE Telephone LIKE :telefone");

    $query->execute(array('telefone' => $DataInput["telephone"]));

    $account = $query->fetchAll();
    $infoOutput = $account[0];

    if( password_verify($DataInput["password"],$account[0]["Password"]) ){

        $infoOutput = array_splice($infoOutput,0,5);
        //Пароли совпадают, возврат данных о аккаунте.
        echo json_encode( $infoOutput );
        
    }else{
        $out = 0;
        echo $infoOutput;
    }

    ?> 