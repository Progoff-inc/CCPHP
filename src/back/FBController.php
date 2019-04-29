<?php
require 'repositories.php';

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");
$db = new PDO('mysql:host=localhost;dbname=nomokoiw_cc;charset=UTF8','nomokoiw_cc','f%EO%6ta');
$ctxt = new DataBase();
if(isset($_GET['Key']))
{
    
    switch ($_GET['Key']) {
        case 'get-reports':
            echo json_encode($ctxt->getReports());
            break;
        case 'change-like':
            $b = json_decode(file_get_contents('php://input'), true);
            $book = $ctxt->changeLike($_GET['Token'], $b['LikeId'], $b['IsLike']);  
            echo json_encode($book);
            break;
        case 'delete-like':
            echo json_encode($ctxt->deleteLike($_GET['Token'], $_GET['Id']));
            break;
        case 'add-likes':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addLike($_GET['Token'], $b['OwnerId'], $b['UserId'], $b['IsLike'], $b['Type']));
            break;
        case 'add-comment':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addComment($_GET['Token'], $b['UserId'], $b['FeedBackId'], $b['Text']));
            break;
        case 'add-report':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addReport($_GET['Token'], $b));
        
    }
    
}
else
{  
    echo "Введенные данные некорректны";
}
?>