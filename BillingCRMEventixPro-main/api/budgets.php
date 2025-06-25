<?php

    require_once "cors.php";
    require_once "conn/connexion.php";

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {


        case 'GET':
           

           /* if(isset($_GET['search'])){
                $search= "WHERE title LIKE '%".$_GET['search']."%' ";
            }*/

            //header('Content-Type: application/json');

            //paginacion

            $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
            $size = isset($_GET['size']) ? intval($_GET['size']) : 10;
            $offset = ($page - 1) * $size;
            $search= isset($_GET['search']) ? $_GET['search']: null;

            $sqlTotalRegistros = "SELECT COUNT(*) as total FROM budgets";
            $total_result = $conn -> query($sqlTotalRegistros);
            $total_row = $total_result -> fetch_assoc();
            $total_records = $total_row['total'];
            $total_pages =  ceil($total_records / $size);

            /*

            $sqlBudgets = "SELECT * FROM budgets WHERE 1 ";
            $sqlBudgets.= " LIMIT $size OFFSET $offset ";

            */

            $sqlBudgets = " SELECT budgets.*, 
                            customers_tb.name AS customer_name,
                            budgets_stats_tb.name AS state_name,
                            customers_contacts_tb.name AS contact_name,
                            customers_contacts_tb.phone AS contact_phone,
                            customers_contacts_tb.email AS contact_email
            FROM budgets 
            LEFT JOIN customers_tb on budgets.id_customer = customers_tb.id
            LEFT JOIN budgets_stats_tb on budgets.id_current_status = budgets_stats_tb.id 
            LEFT JOIN customers_contacts_tb on budgets.id_customer_contact = customers_contacts_tb.id ";
               if($search){
                $sqlBudgets.= " WHERE title LIKE '%".$search."%' ";
            }
            $sqlBudgets.= " LIMIT $size OFFSET $offset ";

            $budgetsResult = mysqli_query($conn, $sqlBudgets);

            $budgets = [];

            while($budget =  mysqli_fetch_assoc($budgetsResult)) {

                $budgets[] = $budget;

            }

            echo json_encode([

                "budgets" => $budgets,
                "total_records" => $total_records,
                "total_pages" => $total_pages,
                "current_pages" => $page,
                "page_size" => $size
            ]);

            break;

            case "POST":
                //echo json_encode($_FILES['documento-pdf']);
                $newBudgetData = $_POST;
                $title = $newBudgetData["budget-title"] ?? null;
                $currentAmount = $newBudgetData["budget-current-amount"] ?? null ;
                $description = $newBudgetData["budget-description"] ?? null;
                $file = $newBudgetData["budget-file"] ?? null;
                $date_start = $newBudgetData["budget-date-start"] ?? null;
                $date_sent = $newBudgetData["budget-date-sent"] ?? null;
                $date_state = $newBudgetData["budget-date-state"] ?? null;

                $id_budget = $newBudgetData["id-budget"] ?? null;
                $documentoURL = NULL;

                if (isset($_FILES['documento-pdf']) && $_FILES['documento-pdf']['error'] === UPLOAD_ERR_OK) {
                    $documentoURL = handleFileUpload('documento-pdf', $title, '../app/assets/documentos/');
                }

                if($id_budget){
                    $sqlBudgetsUpdate = "UPDATE `budgets` SET
                         `title` = '$title', 
                         `current_amount` = '$currentAmount', 
                         `description` = '$description',
                         `file` = '$documentoURL'
                         WHERE `id` = '$id_budget'";

                    $result = mysqli_query($conn, $sqlBudgetsUpdate);

                    if ($result) {
                        echo json_encode(["msg" => "Alta Correcta"]);
                    } else {
                        echo json_encode(["Error" => "Error en la actualización"]);
                    }               

                }else{
                    $sqlBudgetsNew =  "INSERT INTO budgets (id_user, id_customer, id_customer_contact, id_current_status, title, current_amount, description, file, date_start, date_send, date_state) 
                    VALUES (1, 1, 1, 1, '$title', $currentAmount, '$description', '$documentoURL', CURDATE(), NULL, CURDATE())";

                    $result = mysqli_query($conn, $sqlBudgetsNew);
                    if ($result) {
                        echo json_encode(["msg" => "Alta Correcta"]);
                    } else {
                        echo json_encode(["Error en Alta"]);
                    }
                }

            break;
    }

function handleFileUpload($fileInputName, $nombreArchivo, $uploadDir)
{
    $fileTmpPath = $_FILES[$fileInputName]['tmp_name'];
    $fileName = $_FILES[$fileInputName]['name'];
    $fileSize = $_FILES[$fileInputName]['size'];
    $fileType = $_FILES[$fileInputName]['type'];

    $fileNameCmps = explode(".", $fileName);

    $fileExtension = strtolower(end($fileNameCmps));

    $allowedfileExtensions = array('pdf','jpg', 'png');

    if (in_array($fileExtension, $allowedfileExtensions)) {
        $newFileName = str_replace(' ', '_', $nombreArchivo) . '_' . time() . '.' . $fileExtension;
        $dest_path = $uploadDir . $newFileName;

        if (move_uploaded_file($fileTmpPath, $dest_path)) {
            return $newFileName;
        } else {
            echo json_encode(["message" => "Hubo un error moviendo el archivo subido."]);
            exit;
        }
    } else {
        echo json_encode(["message" => "Solo se permiten archivos PDF y JPG."]);
        exit;
    }
    return null;
}
?>