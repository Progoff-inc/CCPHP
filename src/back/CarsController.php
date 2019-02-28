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
        case 'get-cars':
            echo json_encode($ctxt->getCars());
            break;
        
        case 'get-ip':
            $ip =  $_SERVER['REMOTE_ADDR'];
            echo json_encode($ip);
            break;
        case 'get-same-cars':
            echo json_encode($ctxt->getSameCars($_GET['Id']));
            break;
        case 'get-reports':
            echo json_encode($ctxt->getReports());
            break;
        case 'get-report-cars':
            echo json_encode($ctxt->getReportCar(-1));
            break;
        case 'get-user':
            $q = $db->query("SELECT * FROM users where Id=8");
            $res = [];
            $s = $q->fetch();
            $user = new User($s['Id'], $s['Photo'], $s['Name'], $s['Email'],
            $s['Phone'], $s['Lang'], $s['CreateDate'], $s['ModifiedDate'], $s['IsAdmin'], [], []);
            
            echo json_encode($user);
            break;
        case 'get-car':
            echo json_encode($ctxt->getCar($_GET['Id'],true));
            break;
        case 'add-car':
            $b = json_decode(file_get_contents('php://input'), true);  
            echo json_encode($ctxt->addCar($b));
            break;
        case 'add-price':
            $b = json_decode(file_get_contents('php://input'), true);  
            echo json_encode($ctxt->addPrices($_GET['Id'],$b));
            break;
        case 'add-booking':
            $b = json_decode(file_get_contents('php://input'), true); 
            echo json_encode($ctxt->addBooking($b));
            break;
        default:
            echo "Введенный ключ несуществует";
        
    }
    
}
else
{  
    echo "Введенные данные некорректны";
}
// if(isset($_GET['Key']))
// {
    
//     $q = $db->query('SELECT * FROM exam_marks');
//     $res = [];
//     while ($row = $q->fetch()) {
//         $res[] = new Entree($row['MARK']*1, $row['EXAM_DATE']);
        
//     }
//     echo json_encode($res,true);
// }
// else
// {  
//     echo "Введенные данные некорректны";
// }
?>