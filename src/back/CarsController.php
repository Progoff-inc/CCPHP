<?php
require 'models.php';
class Entree {
    public $Id;
    public $Date;
    public $Place;
    public function __construct($i, $d, $p) {
        $this->Id = $i;
        $this->Date = $d;
        $this->Place = $p;
    }
}
class Lecturer {
    public $Name;
    public $Email;
    public $Password;
}

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");
//$db = new PDO('mysql:host=localhost;dbname=nomokoiw_nlc;charset=UTF8','nomokoiw_nlc','9GeRox%c');
$db = new PDO('mysql:host=localhost;dbname=carscrete;charset=UTF8','nlc','12345');
//$user = json_decode(file_get_contents('php://input'), true);
// if(isset($user['Name']))
// {
//     $u = new Lecturer;
//     $u -> Name = $user['Name'];
//     $u -> Email = $user['Email'];
//     $u -> Password = $user['Password'];
//     //$stmt = $db->prepare('INSERT INTO dishes (dish_name, price, is_spicy) VALUES (?,?,?)');
//     $result = $db->prepare('INSERT INTO users (NAME, EMAIL, PASSWORD) VALUES (?,?,?)');
//     $result->execute(array($u -> Name, $u -> Email, $u -> Password));
//     //$stmt->execute(array($_POST['new_dish_name'], $_POST['new_price'], $_POST('is_spicy']));
//     //$result = $db->exec("INSERT INTO lecturer (NAME, SURNAME, CITY, UNIV_ID) VALUES ('Ivan', 'Ivanov', 'Voronezh', 22)");
//     echo json_encode($u);
// }
// else
// {  
//     echo "веденные данные некорректны";
// }
if(isset($_GET['Key']))
{
    
    switch ($_GET['Key']) {
        case 'get-cars':
            $q = $db->query("SELECT * FROM cars");

            $res = [];
            while ($s = $q->fetch()) {
                $res[] = new Car($s['Id'], $s['Photo'], $s['Model'], $s['Passengers'],
                $s['Doors'], $s['BodyType'], $s['Contain'], [], [], $s['AC'], $s['MinAge'], $s['AirBags'], $s['Groupe'], $s['Radio'], $s['ABS'], 
                $s['Transmission'], $s['Fuel'], $s['Consumption'], $s['Description'], $s['Description_Eng'], $s['Price'], $s['Mark'], [], [], []);
                        
            }
            echo json_encode($res);
            break;
        case 'get-reports':
            $q = $db->query("SELECT * FROM feedbacks");

            $res = [];
            while ($s = $q->fetch()) {
                //$user = $db->query("SELECT * FROM users WHERE id=8")->fetch(PDO::FETCH_CLASS, User);
                $res[] = new FeedBack($s['Id'], $s['Look'], $s['Comfort'], $s['Drive'],
                $s['CreateDate'], $s['Mark'], $s['Text'], $s['UserId'], $s['CarId'], [], []);
                        
            }
            echo json_encode($res);
            break;
        case 'get-user':
            $q = $db->query("SELECT * FROM users where Id=8");

            $res = [];
            $s = $q->fetch();
            $user = new User($s['Id'], $s['Photo'], $s['Name'], $s['Email'],
            $s['Phone'], $s['Lang'], $s['CreateDate'], $s['ModifiedDate'], $s['IsAdmin'], [], []);
            
            echo json_encode($user);
            break;
        case 'get-best-cars':
            $q = $db->query("SELECT * FROM cars");

            $res = [];
            $i = 0;
            while ($i<3) {
                $s = $q->fetch();
                $i+=1;
                $res[] = new Car($s['Id'], $s['Photo'], $s['Model'], $s['Passengers'],
                $s['Doors'], $s['BodyType'], $s['Contain'], [], [], $s['AC'], $s['MinAge'], $s['AirBags'], $s['Groupe'], $s['Radio'], $s['ABS'], 
                $s['Transmission'], $s['Fuel'], $s['Consumption'], $s['Description'], $s['Description_Eng'], $s['Price'], $s['Mark'], [], [], []);
                        
            }
            echo json_encode($res);
            break;
        
        case 'add-booking':
            $b = json_decode(file_get_contents('php://input'), true);
            $book = new Entree($b['Id'], $b['Date'], $b['Place']);  
            echo json_encode($book);
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