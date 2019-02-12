import { Component, OnInit } from '@angular/core';
import { NewCar, CarsService, Contains } from '../services/CarsService';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newCar:NewCar =new NewCar();
  carSubmitted = false;
  Includes:Contains = new Contains();
  
  constructor(private carsService:CarsService, public translate:TranslateService) { }

  ngOnInit() {
  }
  addCar(){
    this.carSubmitted =true;
    for(let i =0; i<Object.keys(this.newCar).length;i++){
      if(this.newCar[Object.keys(this.newCar)[i]]==null){
        return;
      }
    }
    this.newCar.Includes.forEach(x => {
      if(this.translate.currentLang=='ru'){
        this.newCar.Contain+=this.Includes.Includes.indexOf(x)+'/';
      }
      else{
        this.newCar.Contain+=this.Includes.IncludesEng.indexOf(x)+'/';
      }
      
    })
    this.newCar.Contain = this.newCar.Contain.slice(0,this.newCar.Contain.length-1);
    console.log(this.newCar);
    this.carsService.AddCar(this.newCar).subscribe(data => {
      this.newCar = new NewCar();
      this.carSubmitted=false;
    })
  }
}
