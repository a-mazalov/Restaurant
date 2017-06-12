<?php
    header("Content-Type: text/html; charset=utf-8");
    header('Access-Control-Allow-Origin: *');
// Путь загрузки



    

//    
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

//file_check($_FILES);

//  function file_check($_FILES) {
//    global $messages;
//    $expansion = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
//    $finfo = finfo_open(FILEINFO_MIME_TYPE); 
//    $mime = finfo_file($finfo, $_FILES['file']['tmp_name']);
//
//    $allow_expansion = array (
//      "bmp" => "image/bmp",  
//      "jpeg" => "image/jpeg", 
//      "jpg" => "image/jpeg", 
//      "png" => "image/png"
//    );
//
//    if ($mime !== $_FILES['file']['type']) {
//      $messages[] = 'Ваш файл не прошел проверку';
//      return false;
//    } else {
//      foreach ($allow_expansion as $key => $value) {
//        if($value == $mime){
//          if ($key == $expansion) {
//            return true;
//          }
//        }
//      }
//      $messages[] = 'Ваш файл не прошел проверку';
//    }
//  }

//$extensions = array('jpeg', 'jpg', 'png', 'gif','mp3','mp4','xls');
//$max_size = 5000;
// 
//if ($_FILES['file']['size'] > $max_size){
//               echo 'файл больше допустимого размера';
//}
//else{
//    $ext = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
//    if (in_array($ext, $extensions)){
//        $name =  uniqid() . '.' . $ext;
//            $path = 'C:/OpenServer/domains/WorkProject/www/img/food/';
//            if(is_uploaded_file($_FILES["file"]["tmp_name"]))
//            {
//             // Если файл загружен успешно, перемещаем его
//             // из временной директории в конечную
//                move_uploaded_file($_FILES["file"]["tmp_name"], $path.$_FILES["file"]["name"]);
//            } else {
//                echo("Ошибка загрузки файла");
//            }
//    }
//    else{
//        echo 'недопусримае расширение файла';
//    }


//    var_dump($_FILES["file"]["type"]);

//    echo $_FILES["file"]["name"];
//    echo $_FILES["file"]["tmp_name"];
          
    $messages["Status"] = false;
    can_upload($_FILES["file"]);

function can_upload($file){
    global $messages;
    // если имя пустое, значит файл не выбран
    if($file['name'] == ''){
        $messages["Message"] = 'Вы не выбрали файл';
    }

    /* если размер файла 0, значит его не пропустили настройки 
    сервера из-за того, что он слишком большой */
    if($file['size'] == 0){
        $messages["Message"] = 'Файл слишком большой';
    }

    // разбиваем имя файла по точке и получаем массив
    $getMime = explode('.', $file['name']);
    $mime = strtolower(end($getMime));
    // массив допустимых расширений
    $types = array('jpg', 'png', 'bmp', 'jpeg');
    $file_mime_types = array('image/png', 'image/jpeg', 'image/bmp');    
    
    
    // если расширение не входит в список допустимых 
    if(!in_array($mime, $types)){
        $messages["Message"] = 'Недопустимое расширение файла';
    }
    
    if(!in_array($file['type'], $file_mime_types)){
        $messages["Message"] = 'Недопустимое тип файла.';
    }else{
        uploadImg();
    }

}

    function uploadImg(){
        global $messages;
        $path = 'C:/OpenServer/domains/WorkProject/www/img/food/';
        
        //СЕРВЕР
//        $path = 'http://home/user2027666/www/restaurant.atservers.net/companyLogo/img/food/';
        
        
        if(is_uploaded_file($_FILES["file"]["tmp_name"]))
        {
            move_uploaded_file($_FILES["file"]["tmp_name"], $path.$_FILES["file"]["name"]);
            $messages["Status"] = true;

        } else {
            $messages["Message"] = "Ошибка загрузки файла";
        }

    }
echo json_encode($messages);





?>