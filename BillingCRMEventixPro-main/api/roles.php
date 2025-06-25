<?php

      require_once "cors.php";
      require_once "conn/connexion.php";

      $method = $_SERVER['REQUEST_METHOD'];

      switch($method){
        case 'GET':
            $sqlRoles = "SELECT roles.* FROM roles ";
            $respuestaRoles = mysqli_query($conn,$sqlRoles);
            $roles = [];
            while($role = mysqli_fetch_assoc($respuestaRoles)){
                $roles[]= $role;
            }
            echo json_encode($roles);
        break;
        default :
        break;
      }

?>