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
        if($uid>0 && $uid != $u->Id){
            return false;
        }
        if($u->IsAdmin){
            return true;
        }
        if($admin){
            return false;
        }
        return true;
    }
    
    public function getUserByToken($token){
        $s = $this->db->prepare("SELECT * FROM users WHERE Token=?");
        $s->execute(array($token));
        $s->setFetchMode(PDO::FETCH_CLASS, 'User');
        $u=$s->fetch();
        
        return $u;
    }
    
    //####################Cars Controller#########################
    public function getCars() {
        $sth = $this->db->query("SELECT * FROM cars");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Car');
        $cars = [];
        while($car = $sth->fetch()){
            $car->Prices = $this->getCarPrices($car->Id);
            $car->Reports = $this->getCarReports($car->Id);
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
            $s = $this->db->prepare("INSERT INTO cars (Model,Photo,SPrice,WPrice,BodyType,Passengers,Doors,Groupe,MinAge,Power,Consumption,Transmission,Fuel,AC,ABS,AirBags,Radio,Description,Description_Eng) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);");
            $s->execute($res[1]);
            
            return $this->db->lastInsertId();
        }else{
            return null;
        }
            
        
    }
    public function addBooking($book){
        $res = $this->genInsertQuery($book,"books");
        $s = $this->db->prepare($res[0]);
        $s->execute($res[1]); 
        return $res;
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
        $u->User = $this->getUserById($u->UserId)[0];
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
        
        $token = md5($u->ModifiedDate.rand(1000,9999));
        
        $this->setToken($u->Id, $token);
        
        
        $u->Books = $this->getUserBooks($u->Id);
        
        return array($u,$token);
    } 
    public function setAdmin($id, $isa){
        $s = $this->db->prepare("UPDATE users SET IsAdmin=? WHERE Id=?");
        $s->execute(array($isa === 'true',$id));
        return array($isa, $id);
    }
    public function getUserById($id, $full = true){
        $s = $this->db->prepare("SELECT Id, Name, Email, CreatedDate, ModifiedDate, Phone, Photo, Lang, IsAdmin FROM users WHERE Id=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'User');
        $u=$s->fetch();
        
        $token = md5($u->ModifiedDate.rand(1000,9999));
        $this->setToken($u->Id, $token);
        if($full){
            $u->Books = $this->getUserBooks($u->Id);        
        }
        
        return array($u,$token);
    }
    
    private function getUserBooks($id) {
        $s = $this->db->prepare("SELECT * FROM books WHERE UserId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Book');
        $books =[];
        while($b = $s->fetch()){
            $b->Car = $this->getReportCar($b->CarId);
            $b->User = $this->getReportUser($b->UserId);
            $books[] = $b;
        }
        return $books;
    }
    
    public function addUser($n, $e, $p, $ph, $l){
        $p = md5(md5($p));
        $s = $this->db->prepare("INSERT INTO users (Name, Email, Password, Phone, Lang, Photo, CreatedDate, ModifiedDate) Values (?,?,?,?,?,?,now(),now())");
        $s->execute(array($n, $e, $p, $ph, $l,'../../assets/images/default_user_photo.jpg'));
        
        return $this->getUserById($this->db->lastInsertId());
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
    
    //####################User Controller###########################
    
    
}
?>