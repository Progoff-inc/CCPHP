import { Component, OnInit, Input } from '@angular/core';
import { Car, CarsService } from '../services/CarsService';

@Component({
  selector: 'same-cars',
  templateUrl: './same-cars.component.html',
  styleUrls: ['./same-cars.component.css']
})
export class SameCarsComponent implements OnInit {
  @Input() CarId:number;
  filteredCars:Car[] = [];
  constructor(private carsService:CarsService) { }

  ngOnInit() {
    this.carsService.GetSameCars(this.CarId).subscribe(data => {
      this.filteredCars = data;
    })

  }
  getCarPrice(car:Car, discount:boolean){
    if(car.Sales.length>0){
      if(discount){
        return Math.max.apply( Math, car.Sales.map(x => x.Discount) );
      }
      else{
        return Math.min.apply( Math, car.Sales.map(x => x.NewPrice) );
      }
      
    }
  }
  

}
