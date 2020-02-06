<?php
require 'models.php';
class DataBase {
    //$this->db = new PDO('mysql:host=localhost;dbname=nomokoiw_portal;charset=UTF8','nomokoiw_portal','KESRdV2f');
    public $db;
    public function __construct()
    {
        //$this->db = new PDO('mysql:host=localhost;dbname=myblog;charset=UTF8','nlc','12345');
        $this->db = new PDO('mysql:host=localhost;dbname=nomokoiw_cc;charset=UTF8','nomokoiw_cc','f%EO%6ta');
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
    private function genInsertQuery($ins, $t){
        $res = array('INSERT INTO '.$t.' (',array());
        $q = '';
        for ($i = 0; $i < count(array_keys($ins)); $i++) {
            $res[0] = $res[0].array_keys($ins)[$i].',';
            $res[1][]=$ins[array_keys($ins)[$i]];
            $q=$q.'?,';
            
        }
        $res[0]=rtrim($res[0],',');
        $res[0]=$res[0].') VALUES ('.rtrim($q,',').');';
        
        return $res;
        
    }
    private function genUpdateQuery($keys, $values, $t, $id){
        $res = array('UPDATE '.$t.' SET ',array());
        $q = '';
        for ($i = 0; $i < count($keys); $i++) {
            $res[0] = $res[0].$keys[$i].'=?, ';
            $res[1][]=$values[$i];
            
        }
        $res[0]=rtrim($res[0],', ');
        $res[0]=$res[0].' WHERE Id = '.$id;
        
        return $res;
        
    }
    
    private function checkToken($token, $uid=0, $admin=false){
        $u = $this->getUserByToken($token);
        if($u->IsAdmin){
            return true;
        }
        if($uid>0 && $uid != $u->Id){
            return false;
        }
        
        if($admin){
            return false;
        }
        return true;
    }
    
    private function getUserByToken($token){
        $s = $this->db->prepare("SELECT * FROM users WHERE Token=?");
        $s->execute(array($token));
        $s->setFetchMode(PDO::FETCH_CLASS, 'User');
        $u=$s->fetch();
        
        return $this->getUserById($u->Id);
    }
    
    public function uploadFile($token, $pid, $files, $t){
        if($this->checkToken($token, 0, true)){
            $img=$this->getImage($pid, $t);
            if($img){
                $this->removeFile($img);
            }
            $url = "http://client.nomokoiw.beget.tech/back/";
            $n = basename($t."_".$pid."_".$files['Data']['name']);
            $tid="Id";
            $t .="s";
            $d = "Files/$n";
            if(file_exists("Files")){
                
                if(move_uploaded_file($files['Data']['tmp_name'], $d)){
                    $s = $this->db->prepare("UPDATE $t SET Photo=? WHERE $tid=?");
                    $s->execute(array($url.$d, $pid));
                    return($url.$d);
                }else{
                    return($_FILES['Data']['tmp_name']);
                }
            }else{
                mkdir("Files");
                if(move_uploaded_file($files['Data']['tmp_name'], $d)){
                    $s = $this->db->prepare("UPDATE $t SET Photo=? WHERE $tid=?");
                    $s->execute(array($url.$d, $pid));
                    return($url.$d);
                }else{
                    return($_FILES['Data']['tmp_name']);
                }
            }
            
            return false;
        }else{
            return false;
        }
        
    }
    
    public function getImage($id, $t){
        //$tid=ucfirst($t)."Id";
        $t .="s";
        $s = $this->db->prepare("SELECT Photo FROM $t WHERE Id=?");
        $s->execute(array($id));
        return $s->fetch()['Photo'];
    }
    
    private function removeFile($filelink){
        $path = explode('back/',$filelink);
        if($path[1]){
            unlink($path[1]);
        }else{
            $path[0] = ltrim($path[0],'../');
            unlink($path[0]);
        }
        
        
    }
    
    //####################Cars Controller#########################
    public function getCars() {
        $sth = $this->db->query("SELECT * FROM cars");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Car');
        $cars = [];
        while($car = $sth->fetch()){
            $car->Prices = $this->getCarPrices($car->Id);
            $car->Reports = $this->getCarReports($car->Id);
            $car->Books = $this->getCarBooks($car->Id);
            $cars[] = $car;
        }
        return $cars;
    }
    
    public function getBooks($token) {
        if($this->checkToken($token, 0, true)){
            $sth = $this->db->query("SELECT * FROM books");
            $sth->setFetchMode(PDO::FETCH_CLASS, 'Book');
            $books = [];
            while($book = $sth->fetch()){
                $book->User = $this->getUserById($book->UserId, false);
                $book->Car = $this->getCar($book->CarId, false);
                $book->DateStart= date("Y/m/d H:00:00",strtotime($book->DateStart));
                $book->DateFinish= date("Y/m/d H:00:00",strtotime($book->DateFinish));
                $book->CreateDate= date("Y/m/d H:00:00",strtotime($book->CreateDate));
                $books[] = $book;
            }
            return $books;
        }else{
            return null;
        }
        
    }
    
    public function addCar($token, $car){
        if($this->checkToken($token, 0, true)){
            $res = $this->genInsertQuery($car,"cars");
            $s = $this->db->prepare($res[0]);
            if($res[1][0]!=null){
                $s->execute($res[1]);
            }
            
            return $this->db->lastInsertId();
        }else{
            return null;
        }
            
        
    }
    public function addBooking($book, $lang){
        $res = $this->genInsertQuery($book,"books");
        $car = $this->getCar($book['CarId'], false);
        $user = $this->getUserById($book['UserId'], false);
        $s = $this->db->prepare($res[0]);
        $s->execute($res[1]); 
        $subject = "Бронирование автомобиля"; 
        $message = '';
        if($lang == 'ru'){
            $message = "<h2>Вы успешно забронировали автомобиль на сайте <a href='http://car4crete.com/'>www.car4crete.com</a>!</h2>
            </br> <p>Наш менеджер свяжется с вами для подтверждения наличия автомобиля. Бронь вы можете просмотреть в личном кабинете на сайте. Там же есть возможность изменить бронь за неделю до начала аренды или отменить её за три дня до начала аренды.</p></br>
            <p></br></br><h3>Детали бронирования:</h3></p> </br>
            <p>Автомобиль: ".$car->Model."</p></br>
            <p>Дата начала аренды: ".date("d.m.Y H:i",strtotime($book['DateStart']))."</p></br>
            <p>Дата конца аренды: ".date("d.m.Y H:i",strtotime($book['DateFinish']))."</p></br>
            <p></br>Сумма заказа: ".$book['Sum']."€</p></br>";
        } else {
            $message = "<h2>You have successfully booked a car on <a href='http://car4crete.com/'>www.car4crete.com</a>!</h2>
            </br> <p>Our manager will contact you to confirm the presence of the car. You can view the reservation in your personal office on the site. There is also an opportunity to change the reservation a week before the start of the lease or to cancel it three days before the start of the lease.</p></br>
            <p></br></br><h3>Booking details:</h3></p> </br>
            <p>Car: ".$car->Model."</p></br>
            <p>Lease start date: ".date("d.m.Y H:i",strtotime($book['DateStart']))."</p></br>
            <p>Lease end date: ".date("d.m.Y H:i",strtotime($book['DateFinish']))."</p></br>
            <p></br>Order value: ".$book['Sum']."€</p></br>";
        }   
        
        
        $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        
        mail($user->Email, $subject, $message, $headers);
        return true;
    }
    public function addPrices($token, $id,$p){
        if($this->checkToken($token, 0, true)){
            $a = (array)$p['SummerPrices'];
            $a['Id'] = $id; 
            $q = $this->genInsertQuery($a,"summer_prices");
            $s = $this->db->prepare("INSERT INTO summer_prices (OneDayPrice,TwoDaysPrice,ThreeDaysPrice,FourDaysPrice,FiveDaysPrice,SixDaysPrice,SevenDaysPrice,Id) VALUES (?,?,?,?,?,?,?,?);");
            $s->execute($q[1]);
            $w = (array)$p['WinterPrices'];
            $w['Id'] = $id; 
            $q = $this->genInsertQuery($w,"winter_prices");
            
            $s = $this->db->prepare("INSERT INTO winter_prices (OneDayPrice,TwoDaysPrice,ThreeDaysPrice,FourDaysPrice,FiveDaysPrice,SixDaysPrice,SevenDaysPrice,Id) VALUES (?,?,?,?,?,?,?,?);");
            $s->execute($q[1]);
            return $q[0];
        }else{
            return null;
        }
        
    }
    public function getCar($id, $reports=true) {
        $s = $this->db->prepare("SELECT * FROM cars WHERE Id=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Car');
        $car = $s->fetch();
        $car->Prices = $this->getCarPrices($id);
        if($reports){
            $car->Reports = $this->getCarReports($id);
            $car->Books = $this->getCarBooks($id);
            
        }
        return $car;
    }
    
    public function getBook($token, $id) {
        $s = $this->db->prepare("SELECT * FROM books WHERE Id=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Book');
        $book = $s->fetch();
        
        if($this->checkToken($token, $book->UserId)){
            $book->User = $this->getUserById($book->UserId, false);
            $book->Car = $this->getCar($book->CarId, false);
            $book->Car->Books = $this->getCarBooks($book->CarId);
            $book->DateStart= date("Y/m/d H:00:00",strtotime($book->DateStart));
            $book->DateFinish= date("Y/m/d H:00:00",strtotime($book->DateFinish));
            $book->CreateDate= date("Y/m/d H:00:00",strtotime($book->CreateDate));
            return $book;
        }
        else{
            return null;
        }
        
    }
    
    private function getBookUserId($id){
        $s = $this->db->prepare("SELECT UserId FROM books WHERE Id=?");
        $s->execute(array($id));
        return $s->fetch()['UserId'];
    }
    
    private function getLikeUserId($id){
        $s = $this->db->prepare("SELECT UserId FROM likes WHERE Id=?");
        $s->execute(array($id));
        return $s->fetch()['UserId'];
    }
    
    public function deleteBook($token, $id) {
        if($this->checkToken($token, $this->getBookUserId($id))){
            $s = $this->db->prepare("DELETE FROM books WHERE Id=?");
            $s->execute(array($id));
            return array($id);
        }else{
            return null;
        }
        
    }
    
    public function getCarReports($id) {
        $s = $this->db->prepare("SELECT * FROM feedbacks WHERE CarId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'FeedBack');
        $reports = [];
        while($r = $s->fetch()){
            $r->Likes = $this->getLikes($r->Id, 1);
            $r->Comments = $this->getReportComments($r->Id);
            $r->User = $this->getReportUser($r->UserId);
            $r->Car = $this->getReportCar($r->CarId);
            $reports[] = $r;
        }
        return $reports;
    }
    public function getCarBooks($id) {
        $s = $this->db->prepare("SELECT * FROM books WHERE CarId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Book');
        return $s->fetchAll();
    }
    public function getCarPrices($id) {
        $res = new CarPrices();
        $res->WinterPrices = $this->getPrices($id,true);
        $res->SummerPrices = $this->getPrices($id,false);
        return $res;
    }
    public function getPrices($id, $t) {
        if($t){
             $s = $this->db->prepare("SELECT * FROM winter_prices WHERE Id=?");
            $s->execute(array($id));
            $s->setFetchMode(PDO::FETCH_CLASS, 'Prices');
            return $s->fetch();
        }else{
             $s = $this->db->prepare("SELECT * FROM summer_prices WHERE Id=?");
            $s->execute(array($id));
            $s->setFetchMode(PDO::FETCH_CLASS, 'Prices');
            return $s->fetch();
        }
       
    }
    public function getSameCars($id) {
        $car = $this->getCar($id);
        $s = $this->db->prepare("SELECT * FROM cars WHERE Groupe=? or (SPrice>=? and SPrice<=?)");
        $s->execute(array($car->Groupe,$car->SPrice-10, $car->SPrice+10));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Car');
        return $s->fetchAll();
    }
   
    public function getLikes($rid, $t){
        $s = $this->db->prepare("SELECT * FROM likes WHERE OwnerId=? and Type=?");
        $s->execute(array($rid, $t));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Like');
        return $s->fetchAll();
    }
    
    public function addReport($token, $r){
        if($this->checkToken($token, $r['UserId'])){
            $a = $this->genInsertQuery($r, "feedbacks");
            $s = $this->db->prepare($a[0]);
            $s->execute($a[1]);
            $s = $this->db->prepare("UPDATE cars SET Mark=? WHERE Id=?");
            $s->execute(array($this->getNewMark($r['CarId'], 0+$r['Mark']),$r['CarId']));
            return array($this->getNewMark($r['CarId'], 0+$r['Mark']),$r['CarId']);
        }else{
            return null;
        }
        
    }
    
    private function getNewMark($cid, $mark){
        $l = count($this->getCarReports($cid));
        return ($this->getCarMark($cid)*$l+$mark)/($l);
    }
    
    private function getCarMark($cid){
        $s = $this->db->prepare("SELECT Mark FROM cars WHERE Id=?");
        $s->execute(array($cid));
        return $s->fetch['Mark'];
    }
    
    public function updateCar($token, $c, $id){
        if($this->checkToken($token, 0, true)){
            $a = $this->genUpdateQuery($c['Keys'], $c['Values'], "cars", $id);
            $s = $this->db->prepare($a[0]);
            $s->execute($a[1]);
            return $a;
        }else{
            return false;
        }
        
    }
    public function updateBook($token, $c, $id){
        if($this->checkToken($token, $this->getBookUserId($id))){
            $a = $this->genUpdateQuery($c['Keys'], $c['Values'], "books", $id);
            $s = $this->db->prepare($a[0]);
            $s->execute($a[1]);
            return $a;
        }else{
            return null;
        }
        
    }
    public function updatePrices($token, $c, $id){
        if($this->checkToken($token, 0, true)){
            $a = array();
            for ($i = 0; $i < count($c['Keys']); $i++) {
                if($c['Keys'][$i]=='SummerPrices'){
                    $a=$this->genUpdateQuery(array_keys($c['Values'][$i]), array_values($c['Values'][$i]), "summer_prices", $id);
                    $s = $this->db->prepare($a[0]);
                    $s->execute($a[1]);
                }
                if($c['Keys'][$i]=='WinterPrices'){
                    $a=$this->genUpdateQuery(array_keys($c['Values'][$i]), array_values($c['Values'][$i]), "winter_prices", $id);
                    $s = $this->db->prepare($a[0]);
                    $s->execute($a[1]);
                }
                
            }
            
            
            return $c;
        }else{
            return null;
        }
        
    }
    
    public function getReportComments($rid){
        $s = $this->db->prepare("SELECT * FROM comments WHERE FeedBackId=?");
        $s->execute(array($rid));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Comment');
        $comments = [];
        while($c = $s->fetch()){
            $c->Likes = $this->getLikes($c->Id, 2);
            $c->User = $this->getReportUser($c->UserId);
            $comments[] = $c;
        }
        return $comments;
    } 
    public function getReportUser($id){
        
        if($id>-1){
            $s = $this->db->prepare("SELECT Id,Name,Email,Photo,IsAdmin FROM users WHERE Id=?");
            $s->execute(array($id));
            $s->setFetchMode(PDO::FETCH_CLASS, 'ReportUser');
            return $s->fetch();
        }else{
            $s = $this->db->query("SELECT Id,Name,Email,Photo,IsAdmin FROM users");
            $s->setFetchMode(PDO::FETCH_CLASS, 'ReportUser');
            return $s->fetchAll();    
        }
    } 
    public function getReportCar($id){
        
        if($id>0){
            
            $s = $this->db->prepare("SELECT Id,Photo,Model FROM cars WHERE Id=?");
            $s->execute(array($id));
            $s->setFetchMode(PDO::FETCH_CLASS, 'ReportCar');
            return $s->fetch();
        }
        else{
            $s = $this->db->query("SELECT Id,Photo,Model,SPrice as Price FROM cars");
            $s->setFetchMode(PDO::FETCH_CLASS, 'ReportCar');
            return $s->fetchAll();
        }
        
    }
    
    public function deleteCar($token, $id) {
        if($this->checkToken($token, 0, true)){
            $img=$this->getImage($id, 'car');
            if($img){
                $this->removeFile($img);
            }
            $s = $this->db->prepare("DELETE FROM cars WHERE Id=?");
            $s->execute(array($id));
            return array($id);
        }else{
            return null;
        }
        
    }
    
    //####################Cars Controller#########################
    
    //####################FB Controller###########################
    
    public function getReports() {
        $sth = $this->db->query("SELECT * FROM feedbacks");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'FeedBack');
        $reports = [];
        while($r = $sth->fetch()){
            $r->Likes = $this->getLikes($r->Id, 1);
            $r->Comments = $this->getReportComments($r->Id);
            $r->User = $this->getReportUser($r->UserId);
            $r->Car = $this->getReportCar($r->CarId);
            $reports[] = $r;
        }
        return $reports;
    }
    public function changeLike($token, $id, $il){
        if($this->checkToken($token, $this->getLikeUserId($id))){
            $s = $this->db->prepare("UPDATE likes SET IsLike=? WHERE Id=?");
            $s->execute(array($il, $id));
            return $this->db->lastInsertId();
        }else{
            return null;
        }
        
    }
    public function addLike($token, $oid, $uid, $isl, $type){
        if($this->checkToken($token, $uid)){
            $s = $this->db->prepare("INSERT INTO likes (OwnerId, UserId, IsLike, Type) Values (?,?,?,?)");
            $s->execute(array($oid, $uid, $isl, $type));
           
            return $this->db->lastInsertId();
        }else{
            return null;
        }
        
    }
    public function deleteLike($token, $id){
        if($this->checkToken($token, $this->getLikeUserId($id))){
            $s = $this->db->prepare("DELETE FROM likes WHERE Id=?");
            $s->execute(array($id));
            return $this->db->lastInsertId();
        }else{
            return null;
        }
        
    }
    
    public function deleteReport($token, $id){
        if($this->checkToken($token, 0, true)){
            $s = $this->db->prepare("DELETE FROM feedbacks WHERE Id=?");
            $s->execute(array($id));
            return $this->db->lastInsertId();
        }else{
            return null;
        }
        
    }
    
    public function deleteComment($token, $id){
        if($this->checkToken($token, 0, true)){
            $s = $this->db->prepare("DELETE FROM comments WHERE Id=?");
            $s->execute(array($id));
            return $this->db->lastInsertId();
        }else{
            return null;
        }
        
    }
    
    public function addComment($token, $uid, $fid, $t){
        if($this->checkToken($token, $uid)){
            $s = $this->db->prepare("INSERT INTO comments (UserId, FeedBackId, Text, CreateDate) VALUES (?,?,?,now())");
            $s->execute(array($uid, $fid, $t));
            return $this->getCommentById($this->db->lastInsertId());
        }else{
            return null;
        }
    }
    
    public function getCommentById($id){
        $s = $this->db->prepare("SELECT Id, FeedBackId, UserId, Text, CreateDate FROM comments WHERE Id=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Comment');
        $u=$s->fetch();
        $u->User = $this->getUserById($u->UserId);
        $u->Likes = $this->getLikes($u->Id,2);
        return $u;
    }
    
    
    //####################FB Controller###########################
    
    //####################User Controller###########################
    
    private function setToken($uid, $token){
        $s = $this->db->prepare('UPDATE users SET Token=? WHERE Id=?');
        $s->execute(array($token, $uid));
    }
    
    public function getUser($e, $p){
        $p = md5(md5($p));
        $s = $this->db->prepare("SELECT Id, Name, Email, CreatedDate, ModifiedDate, Phone, Photo, Lang, IsAdmin FROM users WHERE Email=? and Password=?");
        $s->execute(array($e, $p));
        $s->setFetchMode(PDO::FETCH_CLASS, 'User');
        $u=$s->fetch();
        
        
        
        return $this->getUserById($u->Id, true, true);
    } 
    public function setAdmin($token, $id, $isa){
        if($this->checkToken($token, 0, true)){
            $s = $this->db->prepare("UPDATE users SET IsAdmin=? WHERE Id=?");
            $s->execute(array($isa === 'true',$id));
            return array($isa, $id);
        }else{
            return null;
        }
    }
    private function getUserById($id, $full = true, $token = false){
        $s = $this->db->prepare("SELECT Id, Name, Email, CreatedDate, ModifiedDate, Phone, Photo, Lang, IsAdmin FROM users WHERE Id=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'User');
        $u=$s->fetch();
        $u->CreatedDate = date("Y/m/d",strtotime($u->CreatedDate));
        if($token){
            $token = md5($u->ModifiedDate.rand(1000,9999));
            $this->setToken($u->Id, $token);
        }
        
        if($full){
            $u->Books = $this->getUserBooks($u->Id);        
        }
        if($token){
            return array($u,$token);
        }else{
            return $u;
        }
        
    }
    
    private function getUserBooks($id) {
        $s = $this->db->prepare("SELECT * FROM books WHERE UserId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Book');
        $books =[];
        while($b = $s->fetch()){
            $b->Car = $this->getReportCar($b->CarId);
            $b->User = $this->getReportUser($b->UserId);
            $b->DateStart= date("Y/m/d H:00:00",strtotime($b->DateStart));
            $b->DateFinish= date("Y/m/d H:00:00",strtotime($b->DateFinish));
            $b->CreateDate= date("Y/m/d H:00:00",strtotime($b->CreateDate));
            $books[] = $b;
        }
        return $books;
    }
    
    public function addUser($n, $e, $p, $ph, $l){
        if($this->checkEmail($e)){
            $s = $this->db->prepare("INSERT INTO users (Name, Email, Password, Phone, Lang, Photo, CreatedDate, ModifiedDate) Values (?,?,?,?,?,?,now(),now())");
            $s->execute(array($n, $e, md5(md5($p)), $ph, $l,'../../assets/images/default_user_photo.jpg'));
            $subject = "Регистрация на портале"; 
                
            $message = "<h2>Вы зарегистрированы на сайте <a href='http://car4crete.com/'>www.car4crete.com</a>!</h2>
            </br> <p><b>Ваш логин: </b>$e<b></br></p><p>Ваш пароль: </b>$p</br></p></br>
            <p>В личном кабинете вы можете просмотреть, изменить и отменить текущие заявки на бронирование автомобилей.</p> </br>";
            
            $headers  = "Content-type: text/html; charset=utf-8 \r\n";
            
            mail($e, $subject, $message, $headers);
            
            return $this->getUserById($this->db->lastInsertId(), false, true);
        }else{
            return null;
        }
        
    }
    
    public function changeInfo($token, $t, $v, $uid){
        if($this->checkToken($token, $uid)){
            $s = $this->db->prepare("UPDATE users SET $t=?, ModifiedDate=now() WHERE Id=?");
            $s->execute(array($v, $uid));
       
           return (array($t, $v, $uid));
        }else{
            return null;
        }
    }
    
    public function deleteUser($token, $id){
        if($this->checkToken($token, 0, true)){
            $s = $this->db->prepare("DELETE * FROM users WHERE UserId=?");
            $s->execute(array($id));
            
            return $id;
        }else{
            return null;
        }
    }
    
    public function checkEmail($e){
        $s = $this->db->prepare("SELECT * FROM users WHERE Email=?");
        $s->execute(array($e));
        return count($s->fetchAll())==0;
    }
    
    //####################User Controller###########################
    
    
}
?>