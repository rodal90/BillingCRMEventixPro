<?php

      require_once "cors.php";
      require_once "conn/connexion.php";

      $method = $_SERVER['REQUEST_METHOD'];

      switch($method){

        case "GET":

            $page= isset($_GET['page']) ? intval($_GET['page']) : 1;
            $size= isset($_GET['size']) ? intval($_GET['size']) : 10;
            $offset= ($page - 1) * $size;

            $search = isset($_GET["search"]) ? $_GET["search"] : null;

            $sqlTotalRegistros= "SELECT COUNT(*) as total FROM providers_tb";
            $total_result= $conn->query($sqlTotalRegistros);
            $total_row= $total_result -> fetch_assoc();
            $total_records= $total_row['total'];
            $total_pages= ceil($total_records / $size);

            $sqlProviders= "SELECT * FROM providers_tb WHERE 1 ";
            if($search){
                $sqlProviders .= " AND providers_tb.name LIKE '%$search%' ";
            }


            $sqlProviders.= " LIMIT $size OFFSET $offset ";
            $providersResult= mysqli_query($conn, $sqlProviders);

            $providers=[];

            while($provider = mysqli_fetch_assoc($providersResult)){

                  $providers[]=$provider;

            }

            echo json_encode([

                "providers" => $providers,
                "total_records" => $total_records,
                "total_pages" => $total_pages,
                "current_pages" => $page,
                "page_size" =>  $size
            ]);
           
            break;

            case "POST":


                $newProviderData = $_POST;
                $name = $newProviderData["provider-name"];
                $cif=  $newProviderData["provider-cif"];
                $phone=  $newProviderData["provider-phone"];
                $email=  $newProviderData["provider-email"];
                $sqlProvidersNew = "INSERT INTO
                `providers_tb` (`name`,`cif`,`phone`, `email`)
                VALUES
                ('$name','$cif','$phone','$email')";

                $result= mysqli_query($conn,$sqlProvidersNew);
                if($result){

                    $last_id = $conn->insert_id;
                    echo json_encode(["id"=>$last_id,"msg"=>"Alta correcta"]);
                    
                }else{
                    echo json_encode(["Error en alta"]);
                }
                break;

        }
?>