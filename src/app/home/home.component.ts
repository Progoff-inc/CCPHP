import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsService, Car, Filter } from '../services/CarsService';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  times:Date[] = [];
  minTime = 0;
  locations:string[] = ['AIR_HER','AN_PAPAN','HERSONISOS'];
  // tslint:disable-next-line:whitespace
  search:Search = new Search();
  DStart:Date= new Date();
  workCoords:number;
  submitted = false;
  slides = [{
    Photo:'../../assets/images/manual.jpg',
    Header:'MAIN_MANUAL',
    MinPrice:22,
    Text:'MAIN_MANUAL_TEXT',
    FilterName:'Transmission',
    FilterValue:'MT'
  },
  {
    Photo:'../../assets/images/automatic.jpg',
    Header:'MAIN_AUTOMATIC',
    MinPrice:28,
    Text:'MAIN_AUTOMATIC_TEXT',
    FilterName:'Transmission',
    FilterValue:'AT'
  },
  {
    Photo:'../../assets/images/golf_7_1.jpg',
    Header:'MAIN_HATCHBACK',
    MinPrice:25,
    Text:'MAIN_HATCHBACK_TEXT',
    FilterName:'BodyType',
    FilterValue:'HATCHBACK'
  },
  {
    Photo:'../../assets/images/minivan.jpg',
    Header:'MAIN_MINIVAN',
    MinPrice:69,
    Text:'MAIN_MINIVAN_TEXT',
    FilterName:'BodyType',
    FilterValue:'MINIVAN'
    
  }]
  steps = [
    {
      Icon:"../../assets/images/icons/diagnostic.svg",
      Header:"ACCURATY",
      Text:"ACCURATY_TEXT"
    },
    {
      Icon:"../../assets/images/icons/writing.svg",
      Header:"AGE",
      Text:"AGE_TEXT"
    },
    {
      Icon:"../../assets/images/icons/document.svg",
      Header:"LICENSE",
      Text:"LICENSE_TEXT"
    },
    {
      Icon:"../../assets/images/icons/car.svg",
      Header:"SOBRITY",
      Text:"SOBRITY_TEXT"
    },
    {
      Icon:"../../assets/images/icons/security.svg",
      Header:"SR",
      Text:"SR_TEXT"
    },
    {
      Icon:"../../assets/images/icons/24-hours.svg",
      Header:"CARE",
      Text:"CARE_TEXT"
    }
  ]
  bestCars: Car[];
  betweenCars = false;
  showAdvs = false;
  showWork = false;
  @HostListener('document:scroll', [])
            onScroll(): void {
              if (window.pageYOffset > 53) {

                this.showAdvs = true;
              } else {
                this.showAdvs = false;
              }
              if (window.pageYOffset > 303) {

                this.betweenCars = true;


              }
              if (window.pageYOffset > this.workCoords+100) {

                this.showWork = true;
              }
              else{
                this.showWork =false;
              }

            }
  constructor(public translate: TranslateService, private router:Router, public service: CarsService) {
    this.service.CurFilters = [];
  }
  ngOnInit() {
    this.DStart.setDate(this.DStart.getDate()+1);
    this.getTimes();
    this.search.PickTime = this.times[0];
    this.search.DropTime = this.times[0];
    let date = new Date();
    date.setDate(date.getDate()+1);
    this.search.DateStart = this.service.DateStart?this.service.DateStart:new Date(date.toDateString());
    date.setDate(date.getDate()+1);
    this.search.DateFinish = this.service.DateFinish?this.service.DateFinish:date;
    this.workCoords = document.getElementsByClassName("work")[0].getBoundingClientRect().top;
    
  }
  
  showCars(n,v){
    this.service.addFilter(n,v);
    this.router.navigate(['/allcars']);
  }
  Search(){
    this.service.DateStart = this.getExtraTime(this.search.DateStart, this.search.PickTime);
    this.service.DateFinish = this.getExtraTime(this.search.DateFinish, this.search.DropTime);
    this.service.StartPoint = this.search.Pick;
    this.service.EndPoint = this.search.Drop;
    this.router.navigate(['/allcars']);
  }

  setMinTime(e){
    if(this.search.DateStart.toDateString() == this.search.DateFinish.toDateString()){
      this.minTime = this.getTimes(0).map(x => x.getHours()).indexOf(new Date(e.target.value).getHours());
    }
    else{
      this.minTime = 0;
    }
    
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

  checkDates(){
    if(this.search.DateStart.getTime()>this.search.DateFinish.getTime()){
      this.search.DateFinish = null;
    }
  }
}

export class Search {
  Pick: string = 'AIR_HER';
  Drop: string = 'AIR_HER';
  PickTime: Date;
  DropTime: Date;
  DateStart: Date = new Date();
  DateFinish: Date = new Date();
}
