import { Component, OnInit } from '@angular/core';
import { NewCar, CarsService, Contains, Car, CarPrices } from '../services/CarsService';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  carSubmitted = false;
  showBtn= true;
  carForm:FormGroup;
  Prices:CarPrices=new CarPrices();
  car:Car = new Car();
  
  Includes:Contains = new Contains();
  
  constructor(private fb:FormBuilder, private route:ActivatedRoute, private carsService:CarsService, public translate:TranslateService) { 
    this.route.queryParams.subscribe(
      (queryParam: any) => {
          this.car.Id = queryParam['CarId'];
          if(this.car.Id>0){
            this.showBtn=false;
            this.carsService.GetCar(this.car.Id.toString()).subscribe(data => {
              console.log(data);
              this.car = data;
              this.carForm = this.fb.group({
                Model:[this.car.Model],
                Photo:[this.car.Photo],
                SPrice:[this.car.SPrice],
                WPrice:[this.car.WPrice],
                BodyType:[this.car.BodyType],
                Passengers:[this.car.Passengers],
                Doors:[this.car.Doors],
                Groupe:[this.car.Groupe],
                MinAge:[this.car.MinAge],
                Power:[this.car.Power],
                Consumption:[this.car.Consumption],
                Transmission:[this.car.Transmission],
                Fuel:[this.car.Fuel],
                AC:[Boolean(Number(this.car.AC))],
                ABS:[Boolean(Number(this.car.ABS))],
                AirBags:[Boolean(Number(this.car.AirBags))],
                Radio:[Boolean(Number(this.car.Radio))],
                Description:[this.car.Description],
                Description_ENG:[this.car.Description_Eng]
              });
              this.Prices = data.Prices;
              this.carForm.valueChanges.subscribe(data => {
                console.log(data);
              })
            })
          }else{
            
          }
      }
    );
  }

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
      AirBags:[false],
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
      
      console.log(CarId);
      // this.carsService.AddPrices(CarID, this.Prices).subscribe(()=>{
      //   this.Prices = new carPrices();
      //   this.carForm.reset();
      // })
    })
  }
  checkPrices(){
    this.g.forEach(e => {
      console.log(!!this.Prices.WinterPrices[e])
      if(!this.Prices.WinterPrices[e] || !this.Prices.SummerPrices[e]){
        console.log(e);
        return true;
      }
      
    });
    return false;
  }
  get g() { return Object.keys(this.Prices.SummerPrices); }
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
