import { Component, Inject, OnInit } from '@angular/core';
import { AlertService } from '../services/AlertService';

import {User} from '../services/UserService';
import {CarsService, Car, Filter, Book} from '../services/CarsService';
import { LoadService } from '../services/load.service';

@Component({
  selector: 'cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']

})
export class CarsComponent {
  ShowFilters = window.innerWidth<992?false:true;
  SortUp = true;
  CurSorting:string;
  public user:User;
  CurFilters=[];
  // filters:Filter[] = [{Name:"Passengers", Values:['4', '5','7', '9']},{Name:"BodyType", Values:['HATCHBACK','CROSSOVER', 'CABRIOLET', 'MINIVAN']},
  // {Name:"Transmission", Values:['MT','AT']}, {Name:"Fuel", Values:['PETROL','DEISEL']}
  // ];
  filters:Filter[] = [{Name:"Passengers", Values:[]},{Name:"BodyType", Values:[]},
  {Name:"Transmission", Values:[]}, {Name:"Fuel", Values:[]}
  ];
  public alert:AlertService = new AlertService();
  public filter:Filter[]=[];
  public cars:Car[] = [];
  photos:string[];
  showPrices = false;
  showPhotos:any = {show:false};
  filteredCars:Car[];
  
  constructor(public service:CarsService, private ls:LoadService) {
    service.ngOnInit();
    this.ls.showLoad = true;
    this.service.GetCars().subscribe(data => {
      if(data.length!=0){
        
        this.cars=data;
      }
      if(this.service.DateStart && this.service.DateFinish){
        this.cars = this.cars.filter(x => {
          for(let i = 0; i<x.Books.length; i++){
            if(new Date(x.Books[i].DateStart).getTime()<=this.service.DateStart.getTime() && new Date(x.Books[i].DateFinish).getTime()>=this.service.DateStart.getTime()){
              return false;
            }else if(new Date(x.Books[i].DateStart).getTime()<=this.service.DateFinish.getTime() && new Date(x.Books[i].DateFinish).getTime()>=this.service.DateFinish.getTime()){
              return false;
            }else{
              return true;
            }
          }
          return true;
        })
        this.showPrices = true;
      }
      
      this.getFilters();
      if(this.service.CurFilters.length==0){
        this.filteredCars=this.cars;
      }
      else{
        this.CurFilters = this.service.CurFilters;
        this.Filter();
      }
      this.ls.showLoad = false;
      
    })
  }
  getFilters(){
    this.cars.forEach(car => {
      for(let i = 0; i<this.filters.length;i++){
        let prop = car[this.filters[i].Name];
        if(this.filters[i].Values.map(x => x.toUpperCase()).indexOf(prop.toUpperCase())==-1){
          this.filters[i].Values.push(prop);
        }
      }
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
  

  get f() {return this.CurFilters.map(x=>x.Value.toUpperCase())}
  addFilter(name:string,value:string){
    if(this.CurFilters.map(x=>x.Value.toUpperCase()).indexOf(value.toUpperCase())==-1){
     
      this.CurFilters.push({Name:name,Value:value});
      
      this.Filter();
    }
    else{
      this.CurFilters.splice(this.CurFilters.map(x=>x.Value.toUpperCase()).indexOf(value.toUpperCase()),1);
      if(this.CurFilters.length>0){
        this.Filter();
      }
      else{
        this.filteredCars = this.cars;
      }
    }
    
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
          return !sort?(a.Reports.length>b.Reports.length?1:-1):(a.Reports.length<b.Reports.length?1:-1);
        })
        break;
      }
      case "price":{
        var vm = this;
        this.filteredCars.sort(function(a, b){

          let a1 = Number(vm.service.getCarPrice(a));
          let b1 = Number(vm.service.getCarPrice(b));
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


