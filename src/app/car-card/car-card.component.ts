import { Component, OnInit, Input } from '@angular/core';
import { Car, CarsService } from '../services/CarsService';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent implements OnInit {
  @Input() service:CarsService;
  showPrices = false;
  constructor(public translate: TranslateService) { }

  ngOnInit() {
    if(this.service.DateStart && this.service.DateFinish){
      this.showPrices = true;
    }
  }
  
}
