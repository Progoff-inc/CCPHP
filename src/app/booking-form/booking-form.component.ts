import { Component, OnInit, OnChanges,  SimpleChange, SimpleChanges, Input,  ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsService, Car, Book } from '../services/CarsService';
import { AlertService } from '../services/AlertService';
import {User, ShowSale} from '../services/UserService';
import { ActivatedRoute, Route, Router, NavigationEnd } from "@angular/router";
import {TranslateService} from '@ngx-translate/core';
import {Observable, Subscription} from 'rxjs';

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
  public book:Book = new Book();
  public user:User;
  photos:string[];
  showPhotos:any = {show:false};
  
  
  constructor(public translate: TranslateService,private formBuilder: FormBuilder,private router:Router, private route: ActivatedRoute, public service:CarsService, public alert:AlertService) { 
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
      console.log(this.bookingForm.controls);
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
      
      if(localStorage.getItem("currentUser")){
        
        this.book = {
          Id:0,
          CarId:this.service.car.Id,
          UserId:this.user.Id,
          SalesId:this.sale.Id,
          Sum:this.book.Sum,
          DateStart:this.book.DateStart,
          ExtraDateStart:this.getExtraTime(),
          DateFinish:this.book.DateFinish,
          Price:this.sale.Id==0?this.service.car.Price:this.sale.NewPrice,
          Place:"Iraklion airport",
          Tel:this.service.checkStr(this.bookingForm.value.Tel,'phone'),
          Comment:this.service.checkStr(this.bookingForm.value.Comment)
        }
        this.service.BookCar(this.book).subscribe(data => {
          this.bookingForm = this.formBuilder.group({
            Name: [this.user?this.user.Name:'', Validators.required],
            Email: [this.user?this.user.Email:'', Validators.required],
            Password: [this.user?'пароль':'', Validators.required],
            Tel: [this.user?(this.user.Phone?this.user.Phone:''):''],
            Place:['', Validators.required],
            Time:['12:00'],
            Comment:['']
          });
          this.invalidIntarvals.push({DateStart:this.book.DateStart, DateFinish:this.book.DateFinish});
          this.book = new Book();
          
          this.submitted = false;
          this.clearSales();
          this.alert.showA({type:'success',message:'Время успешно забронированно.',show:true});
         
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
        this.book = {
          Id:0,
          CarId:this.service.car.Id,
          UserId:0,
          SalesId:this.sale.Id,
          Sum:this.book.Sum,
          DateStart:this.book.DateStart,
          ExtraDateStart:this.getExtraTime(),
          DateFinish:this.book.DateFinish,
          Price:this.sale.Id==0?this.service.car.Price:this.sale.NewPrice,
          Place:"Iraklion airport",
          Email:this.bookingForm.value.Email,
          Password:this.bookingForm.value.Password,
          Name:this.bookingForm.value.Name,
          Tel:this.bookingForm.value.Tel,
          Comment:this.bookingForm.value.Comment

        }
        this.service.BookCarNew(this.book).subscribe(data => {
          this.showBook=true;
          this.clearSales();
          this.bookingForm = this.formBuilder.group({
            Name: [this.user?this.user.Name:'', Validators.required],
            Email: [this.user?this.user.Email:'', Validators.required],
            Password: [this.user?'пароль':'', Validators.required],
            Tel: [this.user?(this.user.Phone?this.user.Phone:''):''],
            Place:['', Validators.required],
            Time:['12:00'],
            Comment:['']
          });
          this.submitted = false;
          this.alert.showA({type:'success',message:'Время успешно забронированно.',show:true});
          
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
          }
        }
        )
      }
    }
    getTimes(){
      
      for(let i = 0; i<12; i++){
        this.times.push(new Date(this.book.DateStart.getTime()+i*3600000+12*3600000))
      }
      return this.times;
    }
    getExtraTime(){
      if(this.bookingForm.value.Time!='12:00'){
        let t = this.book.DateStart;
        let e = new Date(this.bookingForm.value.Time);
        return new Date(t.getFullYear(), t.getMonth(), t.getDate(), e.getHours())
      }
      else{
        let t = this.book.DateStart;
        
        return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 12)
      }
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
          this.book.Sum = (this.book.DateFinish.getTime()-this.book.DateStart.getTime())/86400000*(this.sale.Id==0?this.service.car.Price:this.sale.NewPrice);
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
        this.res+=element[type];
      });
      this.res = this.res/car.Reports.length/5*100*2;
      this.rating[type]=this.res;
      return Math.round(this.res).toString()+'px';
    }
    
    ngOnInit() {
      
      if(localStorage.getItem("currentUser")){
        this.user=JSON.parse(localStorage.getItem("currentUser"));
      }
      this.service.car=null;
      this.bookingForm = this.formBuilder.group({
        Name: [this.user?this.user.Name:'', Validators.required],
        Email: [this.user?this.user.Email:'', Validators.required],
        Password: [this.user?'пароль':'', Validators.required],
        Tel: [this.user?(this.user.Phone?this.user.Phone:''):''],
        Place:['', Validators.required],
        Time:['12:00'],
        Comment:['']
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
        this.service.car.Sales.forEach(r => {
          r.DateStart=new Date(r.DateStart);
          r.DateFinish=new Date(r.DateFinish);
        })
        this.service.car.Books.forEach(b => {
          b.DateStart = new Date(b.DateStart);
          b.DateFinish = new Date(b.DateFinish);
          this.invalidIntarvals.push({DateStart:b.DateStart, DateFinish:b.DateFinish});
        })
        this.sales = this.service.car.Sales.map(x =>{
          return {Discount:x.Discount, Id:x.Id, NewPrice:x.NewPrice, Checked:false, DaysNumber:x.DaysNumber}
        })
        this.route.queryParamMap.subscribe(data => this.chooseNewSale(Number(data.get('saleId'))));
       
      }})
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
