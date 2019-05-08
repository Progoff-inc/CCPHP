import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, UserService } from '../services/UserService';
import { CarsService, Book } from '../services/CarsService';
import { ActivatedRoute } from '@angular/router';
import { LoadService } from '../services/load.service';
import { Change } from '../add/add.component';

@Component({
  selector: 'app-change-book',
  templateUrl: './change-book.component.html',
  styleUrls: ['./change-book.component.css']
})
export class ChangeBookComponent implements OnInit {
  bookingForm:FormGroup;
  showBtn=false;
  change:Change = new Change();
  user:User;
  times = [];
  book:Book;
  errors:any;
  minDate:Date;
  maxDate:Date;
  ds:Date;
  df:Date;
  invalidIntarvals:any;
  submitted:any;
  minTime = 0;
  locations:string[] = ['AIR_HER','AN_PAPAN','HERSONISOS'];
  constructor(public us:UserService, private formBuilder:FormBuilder, private service:CarsService, private route:ActivatedRoute, private ls:LoadService) { }

  ngOnInit() {
    this.ls.showLoad = true;
      this.errors={DateStrart:true, DateFinish:true};
      this.minDate = new Date();
      this.minDate.setDate(this.minDate.getDate()+1);
      
      this.invalidIntarvals = [];
      //this.sales;
      this.submitted = false;
      //sale:ShowSale = new ShowSale();
      //salesError:boolean = false;
      this.times = [];
      this.getTimes();
    this.bookingForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Tel: [''],
      Place:['', Validators.required],
      PlaceOff:['', Validators.required],
      Time:[null],
      TimeOff:[null],
      Coment:['']
    });
    if(localStorage.getItem("currentUser")){
      this.user=JSON.parse(localStorage.getItem("currentUser"));
      this.getTimes();
      this.service.GetBook(this.route.snapshot.paramMap.get("id")).subscribe(data => {
        if(data && (data.UserId==this.user.Id || this.user.IsAdmin)){
          data.DateStart = new Date(data.DateStart.replace('-','/','g'));
          data.DateFinish = new Date(data.DateFinish);
          data.DateFinish.setHours(data.DateFinish.getHours()+3);
          data.DateStart.setHours(data.DateStart.getHours()+3);
          this.minDate = new Date();
          this.minDate.setDate(this.minDate.getDate()+5);
          this.ds = data.DateStart;
          this.df = data.DateFinish;
          this.book = data;
          this.book.Car.Books.forEach(b => {
            b.DateStart = new Date(b.DateStart);
            b.DateFinish = new Date(b.DateFinish);
            this.invalidIntarvals.push({DateStart:b.DateStart, DateFinish:b.DateFinish});
          })
          this.bookingForm = this.formBuilder.group({
            Name: [data.User.Name, Validators.required],
            Email: [data.User.Email, [Validators.required, Validators.email]],
            Tel: [data.User.Phone],
            Place:[data.Place, Validators.required],
            PlaceOff:[data.PlaceOff, Validators.required],
            Time:[new Date(1,1,1,data.DateStart.getHours())],
            TimeOff:[new Date(1,1,1,data.DateFinish.getHours())],
            Coment:[data.Description]
          });
          this.bookingForm.valueChanges.subscribe(data => {
            this.checkUpdate();
          })
          this.ls.showLoad = false;
        }else{
          this.ls.showLoad = false;
          window.history.back();
        }
        
      });
      
    }else{
      window.history.back();
    }
    
  }
  getSum(){
    if(this.book.DateStart && this.book.DateFinish){
      let ds = new Date(this.book.DateStart.getFullYear(), this.book.DateStart.getMonth(), this.book.DateStart.getDate());
      let df = new Date(this.book.DateFinish.getFullYear(), this.book.DateFinish.getMonth(), this.book.DateFinish.getDate());
      
      if(this.book){
        this.book.Sum = (df.getTime()-ds.getTime())/86400000*(this.getPrice());
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

  setMinTime(e){
    if(this.book.DateStart.toDateString() == this.book.DateFinish.toDateString()){
      this.minTime = this.getTimes(0).map(x => x.getHours()).indexOf(new Date(e.target.value).getHours());
    }
    else{
      this.minTime = 0;
    }
    
  }
  getMinDate(){
    
    return this.minDate.getTime()>new Date(this.book.DateStart).getTime()?this.minDate:new Date(this.book.DateStart)
  }
  getTimes(n = 0){
    this.times = [];
    let t  = new Date(1,1,1,0);
    for(let i = n; i<18; i++){
      
      this.times.push(new Date(t.getTime()+i*3600000+6*3600000))
    }
    return this.times;
  }
  getExtraTime(t, time){
    
      let e = new Date(time);
      return new Date(t.getFullYear(), t.getMonth(), t.getDate(), e.getHours())
   
  }
  getPrice(){
    if(this.book){
      return this.book.Car.SPrice;
    }
    
  }
  Round(k:number){
    let res = Math.round(k*100)/100;
    
    return res.toFixed(2)
  }
  checkDates(){
    if(this.book.DateStart && this.book.DateFinish && this.book.DateStart.getTime()>this.book.DateFinish.getTime()){
      this.book.DateFinish = null;
    }
  }
  checkUpdate(){
    if(!!this.book){
      this.change.clear();
      
      Object.keys(this.book).forEach(c => {
        if( this.bookingForm.value[c]!=undefined && this.book[c] != this.bookingForm.value[c] ){
          this.change.add(c, this.bookingForm.value[c]);
        }
      })
      this.book.DateStart=this.getExtraTime(this.book.DateStart, this.bookingForm.value.Time);
      this.book.DateFinish=this.getExtraTime(this.book.DateFinish, this.bookingForm.value.TimeOff);
      if(this.book.DateStart!=this.ds){
        this.change.add('DateStart', this.book.DateStart);
      }
      if(this.book.DateFinish!=this.df){
        this.change.add('DateFinish', this.book.DateFinish);
      }
      this.showBtn = this.change.Keys.length>0;
    }
    return this.showBtn;
    
  }

  onSubmit(){
    this.submitted = true;
    
    if(this.bookingForm.invalid){
      return;
    }
    this.ls.showLoad=true;
    if(this.change.Keys.length>0){
      this.service.UpdateBook(this.change, this.book.Id).subscribe((data)=>{
        for(let i = 0;i<this.change.Keys.length;i++){
          this.book[this.change.Keys[i]]=this.change.Values[i];
        }
        this.change=new Change();
        this.showBtn = false;
        this.submitted = false;
        this.ls.showLoad=false;
      })
    }
  }
  get f() { return this.bookingForm.controls; }
  get v() { return this.bookingForm.value; }

}
