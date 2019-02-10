import { Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {FeedBack, Sale} from './UserService';

@Injectable()
export class CarsService implements OnInit {
    showCarInfo = false;
    showBookingForm = false;
    bookings: BookTimes[];
    public car: Car = null;
    baseUrl:string='http://client.nomokoiw.beget.tech/back/';
    //baseUrl = 'http://localhost:80/CCPHP/';
    constructor(private http: HttpClient ) {


    }
    GetCars() {
        return this.http.get<Car[]>(this.baseUrl + 'CarsController.php?Key=get-cars');
    }
    GetBestCars() {
        return this.http.get<Car[]>(this.baseUrl + 'CarsController.php?Key=get-best-cars');
    }
    GetSameCars(id) {
        return this.http.get<Car[]>(this.baseUrl + 'CarsController.php?Key=get-same-cars&Id=' + id);
    }
    GetCar(id: string) {
        return this.http.get<Car>(this.baseUrl + 'CarsController.php?Key=get-car&Id=' + id);
    }
    GetCarPhotos(id: number) {
        return this.http.get<string[]>(this.baseUrl + 'CarsController.php?Key=get-photos&Id=' + id);
    }
    GetReportCars() {
        return this.http.get<ReportCar[]>(this.baseUrl + 'CarsController.php?Key=get-report-cars');
    }
    AddCar(car: NewCar) {

        return this.http.post<NewCar>(this.baseUrl + 'CarsController.php?Key=add-car', car);
    }

    BookCar(book: any) {
        // tslint:disable-next-line:max-line-length
        // return this.http.post<Book>(this.baseUrl + 'CarsController.php?Key=add-booking',{"Id":123,"DateStart":book.DateStart, "ExtraDateStart":book.ExtraDateStart, "DateFinish":book.DateFinish, "UserId":book.UserId, "CarId":book.CarId, "Price":book.Price, "Place":book.Place, "Comment":book.Comment, "SalesId":book.SalesId});
        return this.http.post(this.baseUrl + 'CarsController.php?Key=add-booking', book);
    }
    BookCarNew(book: Book) {
        // tslint:disable-next-line:max-line-length
        return this.http.post<Book>(this.baseUrl + 'CarsController.php?Key=add-booking-new', {'DateStart': book.DateStart, 'DateFinish': book.DateFinish,  'CarId': book.CarId, 'Price': book.Price, 'Place': book.Place, 'PlaceOff': book.PlaceOff, 'Email': book.Email,  'Name': book.Name, 'SalesId': book.SalesId, 'Phone': book.Tel, 'Comment': book.Comment});
    }
    GetSales() {
        return this.http.get<Sale[]>(this.baseUrl + 'CarsController.php?Key=get-sales');
    }

    ngOnInit() {

    }
    checkStr(str: string, type?: string) {
        if (!type) {
            // tslint:disable-next-line:max-line-length
            const reg = /(\s??хер|[а-я]*ху[ей]+|пид[оа]р[а-я]*|суч?ка|[пзд]?[оа]?[ел]б[ауеоё][еёлчнтмш][а-я]*|бл[яе]а?[тдь]{0,2}|[расзпо]*пизд[ецаитьуняй]*)/gi;
            str = str.replace(reg, '***');

        }
        if (type = 'phone') {
            const reg = /\D/g;

            str = str.replace(reg, '');
        }
        if (type = 'phone-check') {
            // tslint:disable-next-line:max-line-length
            const reg = /(^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$|^((\+?7|8)[ \-] ?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$)/g;

            str = str.replace(/\D/g, '');
            console.log(str.match(reg));
            return str.match(reg) ? str.match(reg)[0] : null;
        }
        return str;
    }
    checkEmail(str: string) {
        return !str.match(/[a-z]+@[a-z]+\.[a-z]+/ig);
    }
}

export interface Car {
    Id: number;
    Model: string;
    Photo: string;
    Passengers: number;
    Doors: number;
    Transmission: string;
    Fuel: string;
    Consumption: number;
    BodyType: string;
    FilterProp: number;
    AC: boolean;
    ABS: boolean;
    Radio: boolean;
    Airbags: boolean;
    Description: string;
    Description_ENG: string;
    Price: number;

    Mark: number;
    Reports: FeedBack[];
    Books: Book[];
    Sales: Sale[];
    Includes: string[];
    IncludesEng: string[];
}
export class NewCar {
    Id = 0;
    Model: string = null;
    Photo: string = null;
    Contain = '';
    Passengers: number = null;
    Doors: number = null;
    Transmission: string = null;
    Fuel: string = null;
    Consumption = 0;
    BodyType: string = null;
    FilterProp = 0;
    AC = false;
    ABS = false;
    Radio = false;
    Airbags = false;
    Description: string = null;
    Description_ENG: string = null;
    Price: number = null;
    Includes: string[] = [];
}
export interface BookTimes {
    CarId: number;
    DateStart: Date;
    DateFinish: Date;
}
export class Book {
    Id: number;
    DateStart: Date;
    DateFinish: Date;
    Sum: number;
    UserId: number;
    CarId: number;
    SalesId?: number;
    OldPrice?: number;
    Price: number;
    Place: string;
    PlaceOff: string;
    Email?: string;
    Tel?: string;
    Comment?: string;
    Name?: string;
}

export interface ReportCar {
    Id: number;
    Photo: string;
    Model: string;
    Price: number;
}
export interface Filter {
    Name: string;
    Values: string[];
}

export class Contains {
    public Includes: string[] = ['Полностью комбинированное страхование',
    'Неограниченный километраж',
    'Второй водитель бесплатно',
    'Доставка/возврат в любое время',
    'Дорожная карта в подарок',
    'Доставка в аэропорт Ираклиона',
    'Аренда машины на Крите без франшизы'];
    public IncludesEng: string[] = ['Fully comprehensive insurance',
    'Unlimited mileage',
    'Second driver free of charge',
    'Delivery/return at any time',
    'Road map as a gift',
    'Delivery to Heraklion airport',
    'Rent a car in Crete with no excess'];
}
