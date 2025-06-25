<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'lib/php-jwt-main/src/JWT.php';
require_once 'lib/php-jwt-main/src/Key.php';

require_once 'lib/php-jwt-main/src/JWTExceptionWithPayloadInterface.php';
require_once 'lib/php-jwt-main/src/ExpiredException.php';
require_once 'lib/php-jwt-main/src/BeforeValidException.php';
require_once 'lib/php-jwt-main/src/SignatureInvalidException.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;
use \Firebase\JWT\ExpiredException;

// Clave secreta que utilizaremos para firmar los tokens, acá tendrías que usar tu clave secreta por razones de seguridad esa clave no esta aqui.
$secretKey = '';

function create_jwt($payload) {
    global $secretKey;
    return JWT::encode($payload, $secretKey, 'HS256');
}

function validate_jwt($jwt) {
    global $secretKey;
    try {
        // Decodifica el token y valida la firma
        $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
        return (array) $decoded; // Convertir el resultado a array si lo necesitas así
    } catch (\Firebase\JWT\ExpiredException $e) {
        header('HTTP/1.0 401 Unauthorized');
        echo json_encode(['message' => 'Token expirado.']);
        exit;
    } catch (\Firebase\JWT\SignatureInvalidException $e) {
        header('HTTP/1.0 401 Unauthorized');
        echo json_encode(['message' => 'Firma inválida.']);
        exit;
    } catch (\Exception $e) {
        header('HTTP/1.0 401 Unauthorized');
        echo json_encode(['message' => 'Token inválido.']);
        exit;
    }
}

?>
