import { Component, OnInit, OnChanges,  SimpleChange, SimpleChanges, Input,  ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsService, Car, Book, NewBook } from '../services/CarsService';
import { AlertService } from '../services/AlertService';
import {User, ShowSale, UserService} from '../services/UserService';
import { ActivatedRoute, Route, Router, NavigationEnd } from "@angular/router";
import {TranslateService} from '@ngx-translate/core';
import {Observable, Subscription} from 'rxjs';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit, OnChanges {


  errors:any={DateStrart:true, DateFinish:true};
  showBook:boolean = false;
  minDate:Date = new Date();
  invalidIntarvals:any = [];
  showPickers:ShowPickers = new ShowPickers();
  bookingForm: FormGroup;
  wrongEmail:boolean = false;
  public sales:ShowSale[];
  submitted = false;
  sale:ShowSale = new ShowSale();
  salesError:boolean = false;
  res:number=0;
  times:Date[] = [];
  rating:Raiting = {Look:0, Comfort:0, Drive:0};
  public book:NewBook = new NewBook();
  public user:User;
  photos:string[];
  showPhotos:any = {show:false};
  locations:string[] = ['Аэропорт Ираклиона','Андреа Папандреу','Херсонисос'];
  
  
  constructor(private ls:LoadService, public translate: TranslateService,private formBuilder: FormBuilder,private router:Router, private route: ActivatedRoute, public service:CarsService, private us:UserService, public alert:AlertService) { 
    this.sale.Id = 0;
    this.book.DateFinish = null;
    this.book.DateStart =null;
  }
  get f() { return this.bookingForm.controls; }
  get v() { return this.bookingForm.value; }
  Round(k:number){
    let res = Math.round(k*100)/100;
    
    return res.toFixed(2)
  }
  ngOnChanges(ch:SimpleChanges){
  }
  
    onSubmit(ds:HTMLInputElement, df:HTMLInputElement) {
      this.submitted=true;
      if (this.bookingForm.invalid || this.service.checkEmail(this.v.Email)) {
        if(!this.book.DateStart){
          
          this.errors.DateStart = true;
          
        }
        if(!this.book.DateFinish){
          this.errors.DateFinish = true;
         
        }
        return
        
      }
      
      if(!this.checkSale()){
        return
      }
      if(!this.book.DateStart){
        this.errors.DateStart = true;
        return
      }
      if(!this.book.DateFinish){
        this.errors.DateFinish = true;
        return
      }
      this.ls.showLoad = true;
      if(localStorage.getItem("currentUser")){
        
        this.book = {
          CarId:this.service.car.Id,
          UserId:this.user.Id,
          Sum:Math.ceil(this.book.Sum),
          DateStart:this.getExtraTime(this.book.DateStart, this.bookingForm.value.Time),
          DateFinish:this.getExtraTime(this.book.DateFinish, this.bookingForm.value.TimeOff),
          Price:this.getPrice(),
          Place:this.bookingForm.value.Place,
          PlaceOff:this.bookingForm.value.PlaceOff,
          Tel:this.service.checkStr(this.bookingForm.value.Tel,'phone'),
          Coment:this.service.checkStr(this.bookingForm.value.Coment)
        }
        console.log(this.book);
        this.service.BookCar(this.book).subscribe(data => {
          this.ngOnInit();
         
        },error => {
          console.clear();
          if(error.status==501){

            this.alert.showA({type:'wrong',message:'Время забронированно',show:true});
            this.submitted=false;
            df.value="";
            ds.value="";
            this.bookingForm.value.DateStart="";
            this.bookingForm.value.DateFinish="";
            
          }
          else if(error.status==502){
            this.alert.showA({type:'wrong',message:'Неверный пароль',show:true});
            this.submitted=false;
          }
          else if(error.status==503 || error.status==500){
            this.alert.showA({type:'wrong',message:'Некорректные данные',show:true});
            this.submitted=false;
          }})
      }
      else{
        
        this.us.AddUser({Name:this.bookingForm.value.Name, Email:this.bookingForm.value.Email, Tel:this.bookingForm.value.Tel, Password:this.us.GenPassword()}).subscribe(data => {
          this.book = {
            CarId:this.service.car.Id,
            UserId:data.Id,
            Sum:Math.ceil(this.book.Sum),
            DateStart:this.getExtraTime(this.book.DateStart, this.bookingForm.value.Time),
            DateFinish:this.getExtraTime(this.book.DateFinish, this.bookingForm.value.TimeOff),
            Price:this.getPrice(),
            Place:this.bookingForm.value.Place,
            PlaceOff:this.bookingForm.value.PlaceOff,
            Tel:this.service.checkStr(this.bookingForm.value.Tel,'phone'),
            Coment:this.service.checkStr(this.bookingForm.value.Coment)
          }
          console.log(this.book);
          this.service.BookCar(this.book).subscribe(data => {
            this.ngOnInit();
           
          });
        })
        
      }
    }
    getTimes(){
      
      for(let i = 0; i<12; i++){
        this.times.push(new Date(this.book.DateStart.getTime()+i*3600000+12*3600000))
      }
      return this.times;
    }
    getExtraTime(t, time){
      
        let e = new Date(time);
        return new Date(t.getFullYear(), t.getMonth(), t.getDate(), e.getHours())
     
    }
    getPrice(){
      return this.service.car.SPrice;
    }
    hide(){
      this.service.showBookingForm=false;
    }
    showCarPhotos(){
      this.service.GetCarPhotos(this.service.car.Id).subscribe(data => {
        if(data.length>0){
          this.photos=data;
          this.showPhotos.show=true;
        }
      })
    }
    getSum(){
      if(this.book.DateStart && this.book.DateFinish){
        if(this.service.car){
          this.book.Sum = (this.book.DateFinish.getTime()-this.book.DateStart.getTime())/86400000*(this.getPrice());
          return this.book.Sum;
        }
        else{
          return 0;
        }
      }
      else{
        return 0
      }
    }
    getProgress(type:string, car:Car){
      if(car.Reports.length==0){
        
        this.rating[type]=0;
        return 0;
      }
      this.res=0;
      car.Reports.forEach(element => {
        this.res+=Number(element[type]);
      });
      this.res = this.res/car.Reports.length/5*100*2;
      this.rating[type]=this.res;
      return Math.round(this.res).toString()+'px';
    }
    
    ngOnInit() {
      this.ls.showLoad = true;
      this.errors={DateStrart:true, DateFinish:true};
      this.showBook = false;
      this.minDate = new Date();
      this.invalidIntarvals = [];
      this.showPickers = new ShowPickers();
      this.wrongEmail= false;
      //this.sales;
      this.submitted = false;
      //sale:ShowSale = new ShowSale();
      //salesError:boolean = false;
      this.res=0;
      this.times = [];
      this.rating = {Look:0, Comfort:0, Drive:0};
      this.book = new NewBook();
      this.user;
      //photos:string[];
      //showPhotos:any = {show:false};
      this.locations = ['Аэропорт Ираклиона','Андреа Папандреу','Херсонисос'];
      if(localStorage.getItem("currentUser")){
        this.user=JSON.parse(localStorage.getItem("currentUser"));
      }
      this.service.car=null;
      this.bookingForm = this.formBuilder.group({
        Name: [this.user?this.user.Name:'', Validators.required],
        Email: [this.user?this.user.Email:'', Validators.required],
        Tel: [this.user?(this.user.Phone?this.user.Phone:''):''],
        Place:['', Validators.required],
        PlaceOff:['', Validators.required],
        Time:['12:00'],
        TimeOff:['12:00'],
        Coment:['']
      });
      
      this.getCar();
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        if(evt.url.indexOf('booking')>-1){
          if(this.service.car.Id!=Number(evt.url.split('/')[2].split('?')[0])){
            this.getCar();
          }
        }
      });
        
    this.bookingForm.valueChanges.subscribe(data => {
      this.checkSale();
    })
      
  }
  getCar(){
    this.service.GetCar(this.route.snapshot.paramMap.get("id")).subscribe(data => {
      if(data){
      
        this.service.car=data;
        this.service.car.Reports.forEach(r => {
          r.CreatedDate=new Date(r.CreatedDate);
          r.ButtonText= "SHOW_COMMENTS";
        })
        // this.service.car.Sales.forEach(r => {
        //   r.DateStart=new Date(r.DateStart);
        //   r.DateFinish=new Date(r.DateFinish);
        // })
        this.service.car.Books.forEach(b => {
          b.DateStart = new Date(b.DateStart);
          b.DateFinish = new Date(b.DateFinish);
          this.invalidIntarvals.push({DateStart:b.DateStart, DateFinish:b.DateFinish});
        })
        // this.sales = this.service.car.Sales.map(x =>{
        //   return {Discount:x.Discount, Id:x.Id, NewPrice:x.NewPrice, Checked:false, DaysNumber:x.DaysNumber}
        // })
        this.route.queryParamMap.subscribe(data => this.chooseNewSale(Number(data.get('saleId'))));
        
      }
      this.ls.showLoad = false;
    })
  }
  chooseSale(sale:any){
    if(!sale.Checked){
      this.clearSales();
      sale.Checked = !sale.Checked;
      this.sale=sale;
      
      
    }
    else{
      sale.Checked = !sale.Checked;
      this.sale= new ShowSale();
      if(this.submitted){
        this.salesError = !this.checkSale();
      }
    }
    if(this.submitted){
      this.salesError = !this.checkSale();
    }
    
    
    
  }
  chooseNewSale(id:number){
    if(id){
      this.sale=this.sales.filter(x => x.Id == id)[0];
      if(this.sale){
        this.sale.Checked=true;
      }
      
    }
    
  }
  checkSale(){
    if(this.sale && this.sale.Id!=0 && this.sale.DaysNumber!=0){
      if(this.book.DateStart && this.book.DateFinish){
        if((new Date(this.book.DateFinish).getTime()-new Date(this.book.DateStart).getTime())/86400000<this.sale.DaysNumber){
          this.salesError = true;
          return false
        }
        else{
          this.salesError = false;
          return true
        }
      }
      else{
        this.salesError = true;
        return false;
      }
      
    }
    else{
      return true
    }
  }
  clearSales(){
    this.sales.forEach(x => {x.Checked = false});
  }

}
export interface Raiting{
  Look:number;
  Comfort:number;
  Drive:number;
}
export interface BookSale{
  SalesId:number;
}

export class ShowPickers{
  DateStart:boolean = false;
  DateFinish:boolean = false;
}
