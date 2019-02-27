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
  SortUp = true;
  CurSorting:string;
  public user:User;
  CurFilters=[];
  filters:Filter[] = [{Name:"Passengers", Values:['4', '5','7', '9']},{Name:"BodyType", Values:['HATCHBACK','CROSSOVER', 'CABRIOLET', 'MINIVAN']},
  {Name:"Transmission", Values:['MT','AT']}, {Name:"Fuel", Values:['PETROL','DEISEL']}
  ];
  public alert:AlertService = new AlertService();
  public filter:Filter[]=[];
  public cars:Car[] = [];
  photos:string[];
  showPrices = false;
  showPhotos:any = {show:false};
  filteredCars:Car[];
  
  constructor(public service:CarsService) {
    service.ngOnInit();
    
    this.service.GetCars().subscribe(data => {
      console.log(data);
      if(data.length!=0){
        
        this.cars=data;
      }
      if(this.service.DateStart && this.service.DateFinish){
        this.showPrices = true;
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
    if(this.showPrices){
      console.log(this.service.DateStart.getMonth());
      if(this.service.DateStart.getMonth()>4 && this.service.DateStart.getMonth()<8){
        return car.SPrice;
      }
      else{
        return car.WPrice;
      }
    }
  }

  get f() {return this.CurFilters.map(x=>x.Value)}
  addFilter(name:string,value:string){
    if(this.CurFilters.map(x=>x.Value.toUpperCase()).indexOf(name=='Passengers'?value[0]:value.toUpperCase())==-1){
     
      this.CurFilters.push({Name:name,Value:name=='Passengers'?value[0]:value});
      
      this.Filter();
    }
    else{
      this.CurFilters.splice(this.CurFilters.map(x=>x.Value.toUpperCase()).indexOf(name=='Passengers'?value[0]:value.toUpperCase()),1);
      if(this.CurFilters.length>0){
        this.Filter();
      }
      else{
        this.filteredCars = this.cars;
      }
    }
    console.log(this.CurFilters);
    
  }
  Sort(order:string, s = false){
    let sort = this.SortUp;
    if(this.CurSorting == order && !s){
      this.CurSorting=null;
      return;
    }
    switch(order){
      case "popularity":{
        this.filteredCars.sort(function(a, b){
          console.log(a.Reports);
          return !sort?(a.Reports.length>b.Reports.length?1:-1):(a.Reports.length<b.Reports.length?1:-1);
        })
        break;
      }
      case "price":{
        this.filteredCars.sort(function(a, b){

          let a1 = Number(this.getCarPrice(a));
          let b1 = Number(this.getCarPrice(b));
          return sort?(a1>b1?1:-1):(a1<b1?1:-1);
        })
        break;
      }
      case "raiting":{
        this.filteredCars.sort(function(a, b){
          a.Mark = Number(a.Mark);
          b.Mark = Number(b.Mark);
          return sort?(a.Mark>b.Mark?1:-1):(a.Mark<b.Mark?1:-1);
        })
        break;
      }
    }
    console.log(this.filteredCars);
    this.CurSorting=order;
  }
  ChangeSort(){
    this.SortUp = !this.SortUp;
    this.Sort(this.CurSorting, true);
  }
  Filter(){
   
    this.filteredCars=this.cars.filter(x => {
      let res =true;
      for(let i =0; i<this.CurFilters.length;i++){
        if(x[this.CurFilters[i].Name].toUpperCase()!=this.CurFilters[i].Value.toUpperCase()){
          if(this.CurFilters.map(x=>x.Value.toUpperCase()).indexOf(x[this.CurFilters[i].Name].toUpperCase())==-1){
            res = false;
          }
          
          
        }
        
      }
      if(res){
        return x;
      }
    });
    

  }
}


