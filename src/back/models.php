<?php
class User
    {
        public $Id;
        public $Photo;
        public $Name;
        public $Email;
        public $Phone;
        public $Lang;
        public $CreatedDate;
        public $ModifiedDate;
        public $IsAdmin;
        public $Books;
        public $Topics;
        public function __construct($id, $Photo, $Name, $Email, $Phone, $Lang, $CreatedDate, $ModifiedDate, $IsAdmin, $Books, $Topics) {
            $this->Id = $id;
            $this->Photo = $Photo;
            $this->Name = $Name;
            $this->Email = $Email;
            $this->Phone = $Phone;
            $this->Topics = $Topics;
            $this->Lang = $Lang;
            $this->CreatedDate = $CreatedDate;
            $this->ModifiedDate = $ModifiedDate;
            $this->IsAdmin = $IsAdmin;
            $this->Books = $Books;
        }
    }

class Car
    {
        public $Id;
        public $Model;
        public $Photo;
        public $Passengers;
        public $Doors;
        public $BodyType;
        public $Contain;
        public $Includes;
        public $IncludesEng;
        public $AC;
        public $MinAge;
        public $Airbags;
        public $Groupe;
        public $Radio;
        public $ABS;
        public $Transmission;
        public $Fuel;
        public $Consumption;
        public $Description;
        public $Description_ENG;
        public $Price;
        public $Mark;
        public $Reports;
        public $Books;
        public $Sales;
        public function __construct($id, $Photo, $Model, $Passengers, $Doors, $BodyType, $Contain, $Includes, $IncludesEng, $AC, $MinAge, $Airbags, $Groupe, $Radio, $ABS, 
        $Transmission, $Fuel, $Consumption, $Description, $Description_ENG, $Price, $Mark, $Reports, $Books, $Sales) {
            $this->Id = $id;
            $this->Photo = $Photo;
            $this->Model = $Model;
            $this->Passengers = $Passengers;
            $this->Doors = $Doors;
            $this->BodyType = $BodyType;
            $this->Contain = $Contain;
            $this->Includes = $Includes;
            $this->IncludesEng = $IncludesEng;
            $this->AC = $AC;
            $this->MinAge = $MinAge;
            $this->Airbags = $Airbags;
            $this->Groupe = $Groupe;
            $this->Radio = $Radio;
            $this->ABS = $ABS;
            $this->Transmission = $Transmission;
            $this->Fuel = $Fuel;
            $this->Consumption = $Consumption;
            $this->Description = $Description;
            $this->Description_ENG = $Description_ENG;
            $this->Price = $Price;
            $this->Mark = $Mark;
            $this->Reports = $Reports;
            $this->Books = $Books;
            $this->Sales = $Sales;
        }
    }

class BookTimes
    {
        public $DateStart;
        public $DateFinish;

        public function __construct($ds, $df){
            $this->DateStart = $ds;
            $this->DateFinish = $df;
        }
    }

class FeedBack{
    public $Id;
    public $Look;
    public $Comfort;
    public $Drive;
    public $Mark;
    public $Text;
    public $CreatedDate;
    public $User;
    public $Car;
    public $Comments;
    public $Likes;
    public function __construct($id, $Look, $Comfort, $Drive, $CreatedDate, $Mark, $Text, $User, $Car, $Comments, $Likes) {
        $this->Id = $id;
        $this->Look = $Look;
        $this->Comfort = $Comfort;
        $this->Drive = $Drive;
        $this->Mark = $Mark;
        $this->CreatedDate = $CreatedDate;
        $this->Text = $Text;
        $this->User = $User;
        $this->Comments = $Comments;
        $this->Car = $Car;
        $this->Likes = $Likes;
    }
}

class Sale{
    public $Id;
    public $Type;
    public $DateStart;
    public $DateFinish;
    public $NewPrice;
    public $Discount;
    public $DaysNumber;
    public $Car;
    public function __construct($id, $Type, $DateStart, $DateFinish, $NewPrice, $Discount, $DaysNumber, $Car) {
        $this->Id = $id;
        $this->Type = $Type;
        $this->DateStart = $DateStart;
        $this->DateFinish = $DateFinish;
        $this->NewPrice = $NewPrice;
        $this->Discount = $Discount;
        $this->DaysNumber = $DaysNumber;
        $this->Car = $Car;
    }
}

class Book{
    public $Id;
    public $DateStart;
    public $ExtraDateStart;
    public $DateFinish;
    public $Price;
    public $Place;
    public $OldPrice;
    public $CreateDate;
    public $Sum;
    public $User;
    public $Car;
    public $Sale;
    public function __construct($id, $DateStart, $DateFinish, $ExtraDateStart, $Price, $Place, $OldPrice, $CreateDate, $Sum, $User, $Car, $Sale) {
        $this->Id = $id;
        $this->DateStart = $DateStart;
        $this->DateFinish = $DateFinish;
        $this->ExtraDateStart = $ExtraDateStart;
        $this->Price = $Price;
        $this->Place = $Place;
        $this->OldPrice = $OldPrice;
        $this->CreateDate = $CreateDate;
        $this->Sum = $Sum;
        $this->User = $User;
        $this->Car = $Car;
        $this->Sale = $Sale;
    }
}

class Like{
    public $Id;
    public $IsLike;
    public $Comment;
    public $Report;
    public function __construct($id, $IsLike, $Comment, $Report) {
        $this->Id = $id;
        $this->IsLike = $IsLike;
        $this->Comment = $Comment;
        $this->Report = $Report;
    }
}
class ReportCar {
    public $Id;
    public $Photo;
    public $Model;
    public $Price;
    public function __construct($id, $Photo, $Model, $Price) {
        $this->Id = $id;
        $this->Photo = $Photo;
        $this->Model = $Model;
        $this->Price = $Price;
    }
}
class Topic{
    public $Id;
    public $Seen;
    public $ModifyDate;
    public $User;
    public $UserReciver;
    public $Messages;
    public function __construct($id, $Seen, $ModifyDate, $User, $UserReciver, $Messages) {
        $this->Id = $id;
        $this->Seen = $Seen;
        $this->ModifyDate = $ModifyDate;
        $this->User = $User;
        $this->UserReciver = $UserReciver;
        $this->Messages = $Messages;
    }
}

class Message{
    public $Id;
    public $CreateDate;
    public $Text;
    public $UserId;
    public function __construct($id, $CreateDate, $Text, $UserId) {
        $this->Id = $id;
        $this->CreateDate = $CreateDate;
        $this->Text = $Text;
        $this->UserId = $UserId;
    }
}

class Comment{
    public $Id;
    public $FeedBackId;
    public $Text;
    public $CreatedDate;
    public $User;
    public $Likes;
    public function __construct($id, $FeedBackId, $Text, $CreatedDate, $User, $Likes) {
        $this->Id = $id;
        $this->FeedBackId = $FeedBackId;
        $this->CreatedDate = $CreatedDate;
        $this->Text = $Text;
        $this->User = $User;
        $this->Likes = $Likes;
    }
}

class ReportUser{
    public $Id;
    public $Name;
    public $Email;
    public $Photo;
    public $IsAdmin;
    public function __construct($id, $Name, $Email, $Photo, $IsAdmin) {
        $this->Id = $id;
        $this->Name = $Name;
        $this->Email = $Email;
        $this->Photo = $Photo;
        $this->IsAdmin = $IsAdmin;

    }
}

class Photo{
    public $Id;
    public $PhotoOwnerId;
    public $Path;
    public function __construct($id, $PhotoOwnerId, $Path) {
        $this->Id = $id;
        $this->PhotoOwnerId = $PhotoOwnerId;
        $this->Path = $Path;
    }
}

class Includes
    {
        public static $Items  = ["Полностью комбинированное страхование",
            "Неограниченный километраж",
            "Второй водитель бесплатно",
            "Доставка/возврат в любое время",
            "Дорожная карта в подарок",
            "Доставка в аэропорт Ираклиона",
            "Аренда машины на Крите без франшизы"];

        public static $ItemsEng = ["Fully comprehensive insurance",
            "Unlimited mileage",
            "Second driver free of charge",
            "Delivery/return at any time",
            "Road map as a gift",
            "Delivery to Heraklion airport",
            "Rent a car in Crete with no excess"];


    }
?>