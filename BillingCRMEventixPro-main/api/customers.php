<?php

require_once "cors.php";
require_once "conn/connexion.php";

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case "GET": 
       
        
        $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $size = isset($_GET['size']) ? intval($_GET['size']) : 10;
        $offset = ($page - 1) * $size;

        $search = isset($_GET['search']) ? $_GET['search'] : null;

        $sqlTotalRegistros = "SELECT COUNT(*) AS total FROM customers_tb";
        $total_result = $conn->query($sqlTotalRegistros);
        $total_row = $total_result->fetch_assoc();
        $total_records = $total_row['total'];
        $total_pages = ceil($total_records / $size);

        
        $sqlCustomers = " SELECT * FROM `customers_tb` ";
    
        if($search){
            $sqlCustomers .=  " WHERE name LIKE '%".$search."%' ";
        }
        $sqlCustomers .= " LIMIT $size OFFSET $offset ";
        $customersResult = mysqli_query($conn , $sqlCustomers);

        $customers = [];

        while($customer = mysqli_fetch_assoc($customersResult)){
            $contacts = [];

            $sqlContacts = "SELECT * FROM customers_contacts_tb 
                            WHERE id_customer = ". $customer['id'];
            
            $contactsResult = mysqli_query($conn,$sqlContacts);

            while($contact = mysqli_fetch_assoc($contactsResult)){
                $contacts[]=$contact;
            }
            $customer["contacts"] = $contacts;
            $customers[] = $customer;
        }
        echo json_encode([
            "customers" => $customers,
            "total_records" => $total_records,
            "total_pages" => $total_pages,
            "current_page" => $page,
            "page_size" => $size
        ]);
        break;
        
    case "POST":
        $newClientData = $_POST;
        $name = $newClientData["customer-name"];
        $address = $newClientData["customer-address"];
        $phone = $newClientData["customer-phone"];
        $vatNumber = $newClientData["customer-vatnumber"];
        $sqlCustomersNew = "INSERT INTO 
                            `customers_tb`( `name`, `vat_number`, `address`, `phone`) 
                            VALUES 
                            ('$name','$vatNumber','$address','$phone')";
        $result = mysqli_query($conn,$sqlCustomersNew);
        if($result){
            $last_id = $conn->insert_id;
            echo json_encode(["id"=>$last_id,"msg"=>"Alta correcta"]);
        }else{
            echo json_encode(["Error en alta"]);
        }

        break;
}
?>