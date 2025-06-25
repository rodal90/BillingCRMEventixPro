<?php

require_once "cors.php";
require_once "conn/connexion.php";

$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case 'GET':
        $sqlUsers = "SELECT users.*  FROM users";
        $respuestaUsers = mysqli_query($conn, $sqlUsers);
        $usuarios=[];
        while($usuario = mysqli_fetch_assoc($respuestaUsers)){
            $usuarios[]=$usuario;
        }
        echo json_encode($usuarios);
        break;

    case 'POST':
       
        $role = isset($_POST['role']) ? (int)$_POST['role'] : null;
        $username = isset($_POST['username']) ? trim($_POST['username']) : null;
        $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) : null;
        $password = isset($_POST['password']) ? password_hash($_POST['password'], PASSWORD_DEFAULT) : null;
        
        $sqlInsertUser = "INSERT INTO users (id_role, username,  email, password_hash, created_at) VALUES ('$role', '$username', '$email', '$password',NOW())";
        
        $respuestaInsertUser = mysqli_query($conn, $sqlInsertUser);
 
        if($respuestaInsertUser){
            echo json_encode(["mensaje"=>"Insertado correctamente"]);
        }else{
            echo json_encode(["mensaje"=>"Error en creacion de usuario"]);
        }

    break;
}

?>