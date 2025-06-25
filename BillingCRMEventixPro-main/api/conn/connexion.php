<?php

include_once 'parameters.php';

$conn = mysqli_connect(HOST,USER,PASSWORD) or die ("no se puede conecta con base de datos");
mysqli_select_db($conn,DATABASE);
mysqli_set_charset($conn, "UTF8");
if($conn->connect_error){
    die("Conexion fallida: " . $conn->connect_error);
}
?>