import { Component, OnInit } from '@angular/core';
import { NewCar, CarsService, Contains, Car, CarPrices } from '../services/CarsService';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadService } from '../services/load.service';

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
  change:Change = new Change();
  changeP:Change = new Change();
  constructor(private ls:LoadService, private fb:FormBuilder, private route:ActivatedRoute, private carsService:CarsService, public translate:TranslateService) { 
    this.route.queryParams.subscribe(
      (queryParam: any) => {
          this.car.Id = queryParam['CarId'];
          if(this.car.Id>0){
            this.showBtn=false;
            this.ls.showLoad=true;
            this.carsService.GetCar(this.car.Id.toString()).subscribe(data => {
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
                Description_Eng:[this.car.Description_Eng]
              });
              this.Prices = JSON.parse(JSON.stringify(this.car.Prices));
              this.carForm.valueChanges.subscribe(data => {
                this.checkUpdate();
              })
              this.ls.showLoad=false;
            })
          }else{
            
          }
      }
    );
  }
  checkUpdate(){
    if(!!this.car.Model){
      this.change.clear();
      
      Object.keys(this.car).forEach(c => {
        if(this.car[c] != this.carForm.value[c] && this.carForm.value[c]!=undefined){
          this.change.add(c, this.carForm.value[c]);
        }
      })
      console.log(this.change);
      this.showBtn = this.change.Keys.length>0;
    }
    return this.showBtn;
    
  }
  checkUpdateP(){
    if(!!this.car.Model){
      this.changeP.clear();
      
      Object.keys(this.car.Prices).forEach(c => {
        Object.keys(this.car.Prices[c]).forEach(p => {
          if(this.car.Prices[c][p] != this.Prices[c][p] ){
            if(this.changeP.Keys.indexOf(c)<0) this.changeP.add(c, this.Prices[c]);
          }
        })
        
      })
      console.log(this.changeP);
      this.showBtn = this.changeP.Keys.length>0;
    }
    return this.showBtn;
  }
  ngOnInit() {
    if(this.car.Model){
      
    }
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
      Description_Eng:['', Validators.required]
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
    
    this.ls.showLoad=true;
    this.carsService.AddCar(this.carForm.value).subscribe((CarId)=>{
      
      console.log(CarId);
      this.carsService.AddPrices(CarId, this.Prices).subscribe((data)=>{
        console.log(data);
        this.Prices = new CarPrices();
        this.carForm.reset();
        this.ls.showLoad=false;
        this.carSubmitted=false;
      })
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
  updateCar(){
    console.log(this.car.Id);
    this.ls.showLoad=true;
    if(this.change.Keys.length>0){
      this.carsService.UpdateCar(this.change, this.car.Id).subscribe((data)=>{
        console.log(data);
        for(let i = 0;i<this.change.Keys.length;i++){
          this.car[this.change.Keys[i]]=this.change.Values[i];
        }
        this.change=new Change();
        this.showBtn = false;
        this.ls.showLoad=false;
      })
    }
    if(this.changeP.Keys.length>0){
      this.carsService.UpdatePrices(this.changeP, this.car.Id).subscribe((data)=>{
        console.log(data);
        this.car.Prices = JSON.parse(JSON.stringify(this.Prices));
        this.ls.showLoad=false;
      })
    }
    
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

export class Change{
  Keys:string[] = [];
  Values:any[] = [];

  clear(){
    this.Keys = [];
    this.Values = [];
  }
  add(k, v){
    this.Keys.push(k);
    this.Values.push(v);
  }
}
