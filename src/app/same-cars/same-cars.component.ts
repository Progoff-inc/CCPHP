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
  constructor(private service:CarsService) { }

  ngOnInit() {
    this.service.GetSameCars(this.CarId).subscribe(data => {
      console.log(data);
      this.filteredCars = data;
    })

  }
  
  

}
