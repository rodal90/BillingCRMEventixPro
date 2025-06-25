<?php

require_once "cors.php";
require_once "conn/connexion.php";

$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "POST" :
        $idCustomer = $_POST["id_customer"];
        $contactName = $_POST["contact-name"];
        $contactPhone = $_POST["contact-phone"];
        $contactEmail = $_POST["contact-email"];
        $contactObservations = $_POST["contact-observations"];

        if(isset($_POST["id_contacto"])&&$_POST["id_contacto"]!=""){
            $idContacto = $_POST["id_contacto"];
            $sqlUpdate = "UPDATE `customers_contacts_tb` 
            SET     
            `name`='$contactName',
            `phone`='$contactPhone',
            `email`='$contactEmail',
            `observations`='$contactObservations'
             WHERE id = $idContacto";
            $result = mysqli_query($conn,$sqlUpdate);

            if($result){
                echo json_encode(["msg"=>"Modificacion de contacto correcta"]);
            }else{
                echo json_encode(["msg"=>"Error en la modificación de contacto"]);
            }
        }else{
    
            $sql = "INSERT INTO `customers_contacts_tb`
            ( `id_customer`, `name`, `phone`, `email`, `observations`) 
            VALUES 
            ('$idCustomer','$contactName','$contactPhone','$contactEmail','$contactObservations')";
            $result = mysqli_query($conn,$sql);
            if($result){
                echo json_encode(["msg"=>"Nuevo contacto insertado"]);
            }else{
                echo json_encode(["msg"=>"No se ha podido guardar el contacto"]);
            }
        }
       
    break;
}
?>