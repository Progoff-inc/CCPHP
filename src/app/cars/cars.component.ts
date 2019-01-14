import { Component, Inject, OnInit } from '@angular/core';
import { AlertService } from '../services/AlertService';

import {User} from '../services/UserService';
import {CarsService, Car, Filter, Book} from '../services/CarsService';

@Component({
  selector: 'cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']

})
export class CarsComponent {
  load:boolean=true;
  ShowFilters = window.innerWidth<992?false:true;
  public user:User;
  filters:Filter[] = [{Name:"PASSENGERS", Values:['5 чел.','7 чел.']},{Name:"BODY_TYPE", Values:['HATCHBACK','CROSSOVER', 'CABRIOLET', 'MINIVAN']},
  {Name:"TRANSMISSION", Values:['MANUAL','AUTOMATIC']}, {Name:"FUEL", Values:['PETROL','DEISEL']}, {Name:"GROUPE", Values:['ECONOMY','FULL-SIZED', 'MEDIUM', 'COMPACT']}
  ];
  public alert:AlertService = new AlertService();
  public filter:Filter[]=[];
  public cars:Car[] = [];
  photos:string[];
  showPhotos:any = {show:false};
  filteredCars:Car[];
  
  constructor(public service:CarsService) {
    service.ngOnInit();
    
    this.service.GetCars().subscribe(data => {
      console.log(data);
      if(data.length!=0){
        
        this.cars=data;
      }
      else{
        
      }
      this.filteredCars=this.cars;
      this.load=false;
      
    })
  }
  
  bookCar(car:Car){
    this.service.car=car;

    this.service.showBookingForm=true;
  }
  showFilters(){
    this.ShowFilters=!this.ShowFilters;
  }
  showCarPhotos(id:number){
    this.service.GetCarPhotos(id).subscribe(data => {
      if(data.length>0){
        this.photos=data;
        this.showPhotos.show=true;
      }
      
    })
  }
  showCarInfo(car:Car){
    this.service.car=car;

    this.service.showCarInfo=true;
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

  // get f() {return this.filters.map(x=>x.Value)}
  // addFilter(name:string,value:string){
  //   if(this.filters.map(x=>x.Value).indexOf(value)==-1){
     
  //     this.filters.push({Name:name,Value:value});
  //     this.Filter();
  //   }
  //   else{
  //     this.filters.splice(this.filters.map(x=>x.Value).indexOf(value),1);
  //     if(this.filters.length>0){
  //       this.Filter();
  //     }
  //     else{
  //       this.filteredCars = this.cars;
  //     }
  //   }
    
  // }
  
  // Filter(){
  //   this.filteredCars=this.cars.filter(x => {
  //     for(let i =0; i<this.filters.length;i++){
  //       if(x[this.filters[i].Name]==this.filters[i].Value){
  //         return x;
  //       }
  //     }
  //   });
    

  // }
}


