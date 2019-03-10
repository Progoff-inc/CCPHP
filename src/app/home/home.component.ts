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

  times:string[] = ["01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00",
  "15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","23:50"];
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
    
    
    this.workCoords = document.getElementsByClassName("work")[0].getBoundingClientRect().top;
    
  }
  
  showCars(n,v){
    this.service.addFilter(n,v);
    this.router.navigate(['/allcars']);
  }
  Search(){
    this.service.DateStart = this.search.DateStart;
    this.service.DateFinish = this.search.DateFinish;
    this.router.navigate(['/allcars']);
  }
}

export class Search {
  Pick: string = 'AIR_HER';
  Drop: string = 'AIR_HER';
  PickTime: string = '12:00';
  DropTime: string = '12:00';
  DateStart: Date = new Date();
  DateFinish: Date = new Date();
}
