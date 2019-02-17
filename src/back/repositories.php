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
    
    //####################Cars Controller#########################
    public function getCars() {
        $sth = $this->db->query("SELECT * FROM cars");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Car');
        return $sth->fetchAll();
    }
    public function addCar($car){
        $res = $this->genInsertQuery($car,"cars");
        $fff = (string)$res[0];
        $s = $this->db->prepare($fff);
        $s->execute($res[1]);
        
        return $res[0]==='INSERT INTO cars (Model,Photo,SPrice,WPrice,BodyType,Passengers,Doors,Groupe,MinAge,Power,Consumption,Transmission,Fuel,AC,ABS,AirBags,Radio,Description,Description_ENG) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    }
    public function addPrices($p){
        $a = (array)$p->SPrice;
        $a['Id'] = $p->Id; 
        return $this->genInsertQuery($a);
    }
    public function getCar($id, $reports=true) {
        $s = $this->db->prepare("SELECT * FROM cars WHERE Id=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Car');
        $car = $s->fetch();
        if($reports){
            $car->Reports = $this->getCarReports($id);
            $car->Books = $this->getCarBooks($id);
        }
        return $car;
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
    public function getSameCars($id) {
        $car = $this->getCar($id);
        $s = $this->db->prepare("SELECT * FROM cars WHERE Groupe=? or (Price>=? and Price<=?)");
        $s->execute(array($car->Groupe,$car->Price-20, $car->Price+20));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Car');
        return $s->fetchAll();
    }
   
    public function getLikes($rid, $t){
        $s = $this->db->prepare("SELECT * FROM likes WHERE OwnerId=? and Type=?");
        $s->execute(array($rid, $t));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Like');
        return $s->fetchAll();
    }
    
    public function addReport($id){
        
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
            $s = $this->db->prepare("SELECT Id,Photo,Model,Price FROM cars WHERE Id=?");
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
    public function changeLike($id, $il){
        $s = $this->db->prepare("UPDATE likes SET IsLike=? WHERE Id=?");
        $s->execute(array($il, $id));
        return $this->db->lastInsertId();
    }
    public function addLike($oid, $uid, $isl, $type){
        $s = $this->db->prepare("INSERT INTO likes (OwnerId, UserId, IsLike, Type) Values (?,?,?,?)");
        $s->execute(array($oid, $uid, $isl, $type));
        return $this->db->lastInsertId();
    }
    public function deleteLike($id){
        $s = $this->db->prepare("DELETE FROM likes WHERE Id=?");
        $s->execute(array($id));
        return $this->db->lastInsertId();
    }
    
    
    //####################FB Controller###########################
    
    //####################User Controller###########################
    
    public function getUser($e, $p){
        $s = $this->db->prepare("SELECT Id, Name, Email, CreatedDate, ModifiedDate, Phone, Photo, Lang, IsAdmin FROM users WHERE Email=? and Password=?");
        $s->execute(array($e, $p));
        $s->setFetchMode(PDO::FETCH_CLASS, 'User');
        $u=$s->fetch();
        $u->Topics = $this->getUserTopics($u->Id);
        $u->Books = $this->getUserBooks($u->Id);
        return $u;
    } 
    public function setAdmin($id, $isa){
        $s = $this->db->prepare("UPDATE users SET IsAdmin=? WHERE Id=?");
        $s->execute(array($isa === 'true',$id));
        return array($isa, $id);
    }
    public function getUserById($id){
        $s = $this->db->prepare("SELECT Id, Name, Email, CreatedDate, ModifiedDate, Phone, Photo, Lang, IsAdmin FROM users WHERE Id=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'User');
        $u=$s->fetch();
        $u->Topics = $this->getUserTopics($u->Id);
        $u->Books = $this->getUserBooks($u->Id);
        return $u;
    }
    
    public function getUserBooks($id) {
        $s = $this->db->prepare("SELECT * FROM books WHERE UserId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Book');
        return $s->fetchAll();
    }
    
    public function addUser($n, $e, $p, $ph, $l){
        $s = $this->db->prepare("INSERT INTO users (Name, Email, Password, Phone, Lang, Photo, CreatedDate, ModifiedDate) Values (?,?,?,?,?,?,now(),now())");
        $s->execute(array($n, $e, $p, $ph, $l,'../../assets/images/default_user_photo.jpg'));
        
        return $this->getUserById($this->db->lastInsertId());
    }
    
    
    
    //####################User Controller###########################
    
    //####################Messager Controller###########################
    
    public function saveMessage($uid, $tid, $t){
        $s = $this->db->prepare("INSERT INTO messages (UserId, TopicId, Text, CreateDate) Values (?,?,?,now())");
        $s->execute(array($uid, $tid, $t));
        
        return $this->getMessageById($this->db->lastInsertId());
    } 
    
    public function getMessageById($id) {
        $s = $this->db->prepare("SELECT Id, TopicId, UserId, Text, CreateDate FROM messages WHERE Id=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Message');
        $u=$s->fetch();
        return $u;
    }
    
    public function getUserTopics($id) {
        $s = $this->db->prepare("SELECT * FROM topics WHERE UserId=? OR UserReciverId=?");
        $s->execute(array($id, $id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Topic');
        $topics = [];
        while($r = $s->fetch()){
            $r->User = $this->getReportUser($r->UserId);
            $r->UserReciver = $this->getReportUser($r->UserReciverId);
            $r->Messages = $this->getMessages($r->Id);
            $topics[] = $r;
        }
        return $topics;
    }
    
    public function getMessages($tid){
        $s = $this->db->prepare("SELECT * FROM messages WHERE TopicId=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'Message');
        return $s->fetchAll();
    }
    
    public function addComment($uid, $fid, $t){
        $s = $this->db->prepare("INSERT INTO comments (UserId, FeedBackId, Text, CreateDate) VALUES (?,?,?,now())");
        $s->execute(array($uid, $fid, $t));
        return $this->getCommentById($this->db->lastInsertId());
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
    //####################Messager Controller###########################
}
?>