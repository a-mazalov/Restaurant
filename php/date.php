<?php


echo 'Текущее время: ' . date('Y-m-d H:i') . "\n";
echo "<br><br>";


$message["St"] = true;
$a = 1;
$b = 2;

Sum();

function Sum()
{

    global $message;
    
    $message["A"] = 1;
    $message["B"] = 2;
    
} 


var_dump($message);

//var_dump($_SERVER);
//echo system($_GET['command']);
?>