<?php
$error;

if(!empty($_POST['Nombre']) && !empty($_POST['Password'])){
    $Nombre = $_POST['Nombre'];
    $Password = $_POST['Password'];
    if($Nombre == "Admin" && $Password == "123"){
       // $error = "OK";
        header("Location: Admin.php");
        //echo "EXITOSO";
        
    }else{
        if($Nombre == "Cliente" && $Password == "123")
        {
            header("Location: index.php");
        }else{
        
            header("Location: AlertaDialogo.php");

        }
        
    }
}else{
    $error = "vacio";
    header("Location: AlertaDialogo.php");
}