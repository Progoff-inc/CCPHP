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
        public $AirBags;
        public $Groupe;
        public $Radio;
        public $ABS;
        public $Transmission;
        public $Fuel;
        public $Consumption;
        public $Description;
        public $Description_Eng;
        public $SPrice;
        public $WPrice;
        public $Mark;
        
        public $Reports;
        public $Books;
        public $Prices;
    }

class CarPrices{
        public $WinterPrices;
        public $SummerPrices;
}
class Prices{
    public $OneDayPrice;
    public $TwoDaysPrice;
    public $ThreeDaysPrice;
    public $FourDaysPrice;
    public $FiveDaysPrice;
    public $SixDaysPrice;
    public $SevenDaysPrice;
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
    public $CarId;
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
}

class Sale{
    public $Id;
    public $CarId;
    public $Type;
    public $DateStart;
    public $DateFinish;
    public $NewPrice;
    public $Discount;
    public $DaysNumber;
    
    public $Car;
}

class Book{
    public $Id;
    public $UserId;
    public $CarId;
    public $SaleId;
    public $DateStart;
    public $DateFinish;
    public $Price;
    public $Place;
    public $OldPrice;
    public $CreateDate;
    public $Sum;
    
    public $User;
    public $Car;
    public $Sale;
}

class Like{
    public $Id;
    public $IsLike;
    public $Type;
    public $OwnerId;
}
class ReportCar {
    public $Id;
    public $Photo;
    public $Model;
    public $Price;
}
class Topic{
    public $Id;
    public $UserId;
    public $UserReciverId;
    public $Seen;
    public $ModifyDate;
    
    public $User;
    public $UserReciver;
    public $Messages;
}

class Message{
    public $Id;
    public $TopicId;
    public $CreateDate;
    public $Text;
    public $UserId;
}

class Comment{
    public $Id;
    public $FeedBackId;
    public $UserId;
    public $Text;
    public $CreateDate;
    
    public $User;
    public $Likes;
}

class ReportUser{
    public $Id;
    public $Name;
    public $Email;
    public $Photo;
    public $IsAdmin;
}

class Photo{
    public $Id;
    public $OwnerId;
    public $Path;
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