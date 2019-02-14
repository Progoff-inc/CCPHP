import { Component, OnInit } from '@angular/core';
import { NewCar, CarsService, Contains } from '../services/CarsService';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newCar:NewCar =new NewCar();
  carSubmitted = false;
  carForm:FormGroup;
  Prices:carPrices=new carPrices();
  
  Includes:Contains = new Contains();
  
  constructor(private fb:FormBuilder, private carsService:CarsService, public translate:TranslateService) { }

  ngOnInit() {
    this.carForm = this.fb.group({
      Model:['', Validators.required],
      Photo:['', Validators.required],
      SPrice:['', Validators.required],
      WPrice:['', Validators.required],
      BodyType:['', Validators.required],
      Passengers:['', Validators.required],
      Doors:['', Validators.required],
      Groupe:['', Validators.required],
      MinAge:['', Validators.required],
      Power:['', Validators.required],
      Consumption:['', Validators.required],
      Transmission:['', Validators.required],
      Fuel:['', Validators.required],
      AC:[false],
      ABS:[false],
      Airbags:[false],
      Radio:[false],
      Description:['', Validators.required],
      Description_ENG:['', Validators.required]
    })
  }
  addCar(){
    this.carSubmitted=true;

    
    if(this.checkPrices()){
      console.log(this.Prices);
      return;
    }
    if(this.carForm.invalid){
      return;
    }
    
    console.log(this.carForm.value);
    this.carsService.AddCar(this.carForm.value).subscribe((CarId)=>{
      this.Prices.Id=CarId;
      console.log(CarId);
      // this.carsService.AddPrices(this.Prices).subscribe(()=>{
      //   this.Prices = new carPrices();
      //   this.carForm.reset();
      // })
    })
  }
  checkPrices(){
    this.g.forEach(e => {
      console.log(!!this.Prices.WPrice[e])
      if(!this.Prices.WPrice[e] || !this.Prices.SPrice[e]){
        console.log(e);
        return true;
      }
      
    });
    return false;
  }
  get g() { return Object.keys(this.Prices.SPrice); }
  get f() { return this.carForm.controls; }
  date=[{
    HEADER:'ONE_DAY',
    TEXT:'ONE_DAY_INPUT',
  },
  {
    HEADER:'TWO_DAY',
    TEXT:'TWO_DAY_INPUT',
  },
  {
    HEADER:'THREE_DAY',
    TEXT:'THREE_DAY_INPUT',
  },
  {
    HEADER:'FOUR_DAY',
    TEXT:'FOUR_DAY_INPUT',
  },
  {
    HEADER:'FIVE_DAY',
    TEXT:'FIVE_DAY_INPUT',
  },
  {
    HEADER:'SIX_DAY',
    TEXT:'SIX_DAY_INPUT',
  },
  {
    HEADER:'SEVEN_DAY',
    TEXT:'SEVEN_DAY_INPUT',
  }]
}

export class carPrices{
  constructor(){
    this.WPrice=new Price();
    this.SPrice=new Price();
  }
  Id:number;
  WPrice:Price;
  SPrice:Price;
}

export class Price{
  OneDay:number = undefined;
  TwoDays:number = undefined;
  ThreeDays:number = undefined;
  FourDays:number = undefined;
  FiveDays:number = undefined;
  SixDays:number = undefined;
  SevenDays:number = undefined;
}