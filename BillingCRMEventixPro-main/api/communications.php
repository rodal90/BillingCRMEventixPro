<?php
require_once "cors.php";
require_once "conn/connexion.php";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        // Acceder a los datos enviados con FormData
        $budget = isset($_POST["id_budget"]) ? intval($_POST["id_budget"]) : null;
        $user = isset($_POST["id_user"]) ? intval($_POST["id_user"])  : null;
        $customer = isset($_POST["id_customer"]) ? intval($_POST["id_customer"]) : null;
        $provider = isset($_POST["id_provider"]) ? intval($_POST["id_provider"]) : null;        
        $body = isset($_POST["body"]) ? $_POST["body"] : null;

        // Validación de datos
        if (!$user || !$body) {
            echo json_encode(["error" => "Campos obligatorios faltantes"]);
            http_response_code(400);
            exit;
        }

        // Crear la consulta SQL

        $sqlCustomersNew = "INSERT INTO 
                            `messages_budgets`(`id_budget`, `id_user`, `id_customer`, `id_provider` , `body`) 
                            VALUES 
                            ($budget,$user,$customer,$provider,'$body')";

        // Ejecutar la consulta
        $result = mysqli_query($conn, $sqlCustomersNew);
        if ($result) {
            $last_id = $conn->insert_id;
            echo json_encode(["id" => $last_id, "msg" => "Alta correcta"]);
        } else {
            echo json_encode(["error" => "Error en alta"]);
            http_response_code(500);
        }
        break;

    default:
        echo json_encode(["error" => "Método no permitido"]);
        http_response_code(405);
        break;
}
?>