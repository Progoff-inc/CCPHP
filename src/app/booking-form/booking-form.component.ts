import { Component, OnInit, OnChanges,  SimpleChange, SimpleChanges, Input,  ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsService, Car, Book, NewBook } from '../services/CarsService';
import { AlertService } from '../services/AlertService';
import {User, ShowSale, UserService} from '../services/UserService';
import { ActivatedRoute, Route, Router, NavigationEnd, ChildActivationStart } from "@angular/router";
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
  minTime = 0;
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
  locations:string[] = ['AIR_HER','AN_PAPAN','HERSONISOS'];
  
  
  constructor(private ls:LoadService, public translate: TranslateService,private formBuilder: FormBuilder,private router:Router, private route: ActivatedRoute, public service:CarsService, private us:UserService, public alert:AlertService) { 
    this.sale.Id = 0;
    
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
      if (this.bookingForm.invalid) {
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
          Sum:Math.ceil(this.service.getCarPrice(this.service.car, this.book.DateStart, this.book.DateFinish)),
          DateStart:this.getExtraTime(this.book.DateStart, this.bookingForm.value.Time),
          DateFinish:this.getExtraTime(this.book.DateFinish, this.bookingForm.value.TimeOff),
          Price:0,
          Place:this.bookingForm.value.Place,
          PlaceOff:this.bookingForm.value.PlaceOff,
          Tel:this.service.checkStr(this.bookingForm.value.Tel,'phone'),
          Coment:this.service.checkStr(this.bookingForm.value.Coment)
        }
        this.service.BookCar(this.book).subscribe(data => {
          this.service.clearDates();
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
        let p = this.us.GenPassword();
        this.us.AddUser({Name:this.bookingForm.value.Name, Email:this.bookingForm.value.Email, Tel:this.bookingForm.value.Tel, Password:p}).subscribe(data => {
          data['Password']=p;
          this.us.currentUser = data[0];
          this.us.Token = data[1];
          this.us.Save();
          this.book = {
            CarId:this.service.car.Id,
            UserId:data[0].Id,
            Sum:Math.ceil(this.service.getCarPrice(this.service.car, this.book.DateStart, this.book.DateFinish)),
            DateStart:this.getExtraTime(this.book.DateStart, this.bookingForm.value.Time),
            DateFinish:this.getExtraTime(this.book.DateFinish, this.bookingForm.value.TimeOff),
            Price:0,
            Place:this.bookingForm.value.Place,
            PlaceOff:this.bookingForm.value.PlaceOff,
            Tel:this.bookingForm.value.Tel,
            Coment:this.bookingForm.value.Coment
          }
          this.service.BookCar(this.book).subscribe(data => {
            this.service.clearDates();
            this.ngOnInit();
            
          });
        })
        
      }
    }
    getTimes(n=0){
      this.times = [];
      let t  = new Date(1,1,1,0);
      for(let i = n; i<18; i++){
        
        this.times.push(new Date(t.getTime()+i*3600000+6*3600000))
      }
      return this.times;
    }
    setMinTime(e){
      if(this.book.DateStart.toDateString() == this.book.DateFinish.toDateString()){
        this.minTime = this.getTimes(0).map(x => x.getHours()).indexOf(new Date(e.target.value).getHours());
      }
      else{
        this.minTime = 0;
      }
      
    }
    getExtraTime(t, time){
      
        let e = new Date(time);
        return new Date(t.getFullYear(), t.getMonth(), t.getDate(), e.getHours())
     
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
      this.minDate.setDate(this.minDate.getDate()+1);
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
      this.book.DateFinish = this.service.DateFinish?this.service.DateFinish:null;
      this.book.DateStart = this.service.DateStart?this.service.DateStart:null;
      this.getTimes();
      //photos:string[];
      //showPhotos:any = {show:false};
      if(localStorage.getItem("currentUser")){
        this.user=JSON.parse(localStorage.getItem("currentUser"));
      }
      this.service.car=null;
      this.bookingForm = this.formBuilder.group({
        Name: [this.user?this.user.Name:'', Validators.required],
        Email: [this.user?this.user.Email:'', [Validators.required, Validators.email]],
        Tel: [this.user?(this.user.Phone?this.user.Phone:''):''],
        Place:[this.service.StartPoint?this.service.StartPoint:'', Validators.required],
        PlaceOff:[this.service.EndPoint?this.service.EndPoint:'', Validators.required],
        Time:[this.service.DateStart?new Date(1,1,1,this.service.DateStart.getHours()):this.times[0]],
        TimeOff:[this.service.DateFinish?new Date(1,1,1,this.service.DateFinish.getHours()):this.times[0]],
        Coment:['']
      });
      this.route.paramMap.subscribe(x=>{
        this.getCar(x.get('id'))
      });
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        if(evt.url.indexOf('booking')>-1){
          if(this.service.car.Id!=Number(evt.url.split('/')[2].split('?')[0])){
            this.getCar(Number(evt.url.split('/')[2].split('?')[0]));
          }
        }
      });
        
    this.bookingForm.valueChanges.subscribe(data => {
      this.checkSale();
    })
      
  }
  getCar(id){
    this.service.GetCar(id).subscribe(data => {
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

  checkDates(){
    if(this.book.DateStart && this.book.DateFinish && this.book.DateStart.getTime()>this.book.DateFinish.getTime()){
      this.book.DateFinish = null;
    }
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
