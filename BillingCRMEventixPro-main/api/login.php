<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    //require_once 'conn/connexion.php';  // Asegúrate de que la conexión a la base de datos esté correctamente configurada
    require_once 'jwt_utils.php';  // Incluye las funciones para manejar JWT
    require_once "conn/connexion.php";

    $input = json_decode(file_get_contents('php://input'), true);

    $user = $input["user"];
    //$pass = $input["pass"];
    $pass= password_hash($input['pass'], PASSWORD_DEFAULT);
    $response;

    $sqlSuserLogin = "SELECT users.*, roles.description AS role FROM users LEFT JOIN roles ON users.id_role = roles.id 
    WHERE users.email = '$user' AND users.password_hash = '$pass'";
    $respuesta = mysqli_query($conn,$sqlSuserLogin);
    $respuestaDatos = mysqli_fetch_assoc($respuesta);
    
    if($respuesta){
        $payload = [
            //'user_id' => $id,        
            'username' => $user,
            'role' => $respuestaDatos['role'],
            'iat' => time(),
            'exp' => time() + (60 * 240)  // El token expira en 4horas
        ];
        $jwt = create_jwt($payload);
        
        $response["mensaje"] = "Login correcto";
        $response["token"] = $jwt;    
    }else{
        $response["mensaje"] = "Login incorrecto";
        $response["token"] = false;
    }
        

    echo json_encode($response);
    /*$status = true;
    
    if($user == ""){
        $status = false;
    }
    
    if($pass == ""){
        $status = false;
    }*/

   // $input["estado"] = $status;

    //echo json_encode($jwt)
?>