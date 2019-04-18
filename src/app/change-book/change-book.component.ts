import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../services/UserService';
import { CarsService, Book } from '../services/CarsService';
import { ActivatedRoute } from '@angular/router';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'app-change-book',
  templateUrl: './change-book.component.html',
  styleUrls: ['./change-book.component.css']
})
export class ChangeBookComponent implements OnInit {
  bookingForm:FormGroup;
  user:User;
  times = [];
  book:Book;
  errors:any;
  minDate:Date;
  invalidIntarvals:any;
  submitted:any;
  locations:string[] = ['AIR_HER','AN_PAPAN','HERSONISOS'];
  constructor(private formBuilder:FormBuilder, private service:CarsService, private route:ActivatedRoute, private ls:LoadService) { }

  ngOnInit() {
    this.ls.showLoad = true;
      this.errors={DateStrart:true, DateFinish:true};
      this.minDate = new Date();
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
        console.log(data);
        data.DateStart = new Date(data.DateStart);
        data.DateFinish = new Date(data.DateFinish);
        this.book = data;
        this.bookingForm = this.formBuilder.group({
          Name: [data.User.Name, Validators.required],
          Email: [data.Email, [Validators.required, Validators.email]],
          Tel: [data.Tel],
          Place:[data.Place, Validators.required],
          PlaceOff:[data.PlaceOff, Validators.required],
          Time:[new Date(1,1,1,data.DateStart.getHours())],
          TimeOff:[new Date(1,1,1,data.DateFinish.getHours())],
          Coment:['']
        });
        this.ls.showLoad = false;
      });
      
    }
    
  }
  getSum(){
    if(this.book.DateStart && this.book.DateFinish){
      let ds = new Date(this.book.DateStart.getFullYear(), this.book.DateStart.getMonth(), this.book.DateStart.getDate());
      let df = new Date(this.book.DateFinish.getFullYear(), this.book.DateFinish.getMonth(), this.book.DateFinish.getDate());
      console.log(ds);
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
  getTimes(){
    let t  = new Date(1,1,1,0);
    for(let i = 0; i<12; i++){
      
      this.times.push(new Date(t.getTime()+i*3600000+12*3600000))
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

}
