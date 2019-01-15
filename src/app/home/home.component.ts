import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsService, Car } from '../services/CarsService';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  times:string[] = ["01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00",
  "15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","23:50"];
  locations:string[] = ['Аэропорт Ираклиона','Андреа Папандреу','Херсонисос'];
  // tslint:disable-next-line:whitespace
  search:Search = new Search();
  workCoords:number;
  slides = [{
    Photo:'../../assets/images/manual.jpg',
    Header:'MAIN_MANUAL',
    MinPrice:22,
    Text:'MAIN_MANUAL_TEXT'
  },
  {
    Photo:'../../assets/images/automatic.jpg',
    Header:'MAIN_AUTOMATIC',
    MinPrice:28,
    Text:'MAIN_AUTOMATIC_TEXT'
  },
  {
    Photo:'../../assets/images/cabrio.jpg',
    Header:'MAIN_CABRIO',
    MinPrice:75,
    Text:'MAIN_CABRIO_TEXT'
  },
  {
    Photo:'../../assets/images/minivan.jpg',
    Header:'MAIN_MINIVAN',
    MinPrice:69,
    Text:'MAIN_MINIVAN_TEXT'
  }]
  steps = [
    {
      Icon:"../../assets/images/icons/diagnostic.svg",
      Header:"CHOOSE_CAR",
      Text:"CHOOSE_CAR_TEXT"
    },
    {
      Icon:"../../assets/images/icons/writing.svg",
      Header:"BOOK_CAR",
      Text:"BOOK_CAR_TEXT"
    },
    {
      Icon:"../../assets/images/icons/document.svg",
      Header:"CONTRACT",
      Text:"CONTRACT_TEXT"
    },
    {
      Icon:"../../assets/images/icons/car.svg",
      Header:"CLEAN_CAR",
      Text:"CLEAN_CAR_TEXT"
    },
    {
      Icon:"../../assets/images/icons/security.svg",
      Header:"SAVE_CAR",
      Text:"SAVE_CAR_TEXT"
    },
    {
      Icon:"../../assets/images/icons/24-hours.svg",
      Header:"RETURN_CAR",
      Text:"RETURN_CAR_TEXT"
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
  constructor(public translate: TranslateService, private formBuilder: FormBuilder, public service: CarsService) {

  }
  get f() { return this.searchForm.controls; }
  ngOnInit() {
    
    
    this.workCoords = document.getElementsByClassName("work")[0].getBoundingClientRect().top;
    this.searchForm = this.formBuilder.group({
      Pick: ['', Validators.required],
      Drop: ['', Validators.required],
      PickTime: ['12:00', Validators.required],
      DropTime: ['12:00', Validators.required]
    });
    this.service.GetBestCars().subscribe(data => {
      console.log(data);
      if (data.length !== 0) {

        this.bestCars = data;
      } else {

      }


    });
  }
}

export class Search {
  Pick: string;
  Drop: string;
  DateStart: Date;
  DateFinish: Date;
}
