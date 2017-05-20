<?php
    header("Content-Type: text/html; charset=utf-8");
    header('Access-Control-Allow-Origin: *');
// Путь загрузки



    

    
//echo 'file_uploads: '. ini_get('file_uploads'). '<br />';
//echo 'upload_tmp_dir: '. ini_get('upload_tmp_dir'). '<br />';
//echo 'upload_max_filesize: '. ini_get('upload_max_filesize'). '<br />';
//echo 'max_file_uploads: '. ini_get('max_file_uploads'). '<br />';


//    var_dump($_SERVER);
//    var_dump($_FILES);
//    var_dump($_FILES);
//    var_dump($_GET);

//    print_r($_FILES);
   // Проверяем загружен ли файл


    $path = 'C:/OpenServer/domains/WorkProject/www/img/food/';
    if(is_uploaded_file($_FILES["file"]["tmp_name"]))
    {
     // Если файл загружен успешно, перемещаем его
     // из временной директории в конечную
        move_uploaded_file($_FILES["file"]["tmp_name"], $path.$_FILES["file"]["name"]);
    } else {
        echo("Ошибка загрузки файла");
    }

?>