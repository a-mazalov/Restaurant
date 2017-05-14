<?php 

    function checkEmptyInput($data, $options = []){
        $ArrayOutput = array();
        foreach ($data as $key => $value){
            
            if( empty($value) and (!in_array($key,$options)) ){
//                echo "Значение пусто: ".$key." ";
                continue;
            }else{
                $ArrayOutput[$key] = trim($value);
            }
        }
        return $ArrayOutput;
    }

?>