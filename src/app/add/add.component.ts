import { Component, OnInit } from '@angular/core';
import { NewCar, CarsService, Contains, Car, CarPrices, UploadTypes } from '../services/CarsService';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadService } from '../services/load.service';
import { HttpEventType } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  carSubmitted = false;
  showBtn= true;
  image = null;
  invalidImage = false;
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
                Model:[this.car.Model, Validators.required],
                SPrice:[this.car.SPrice, Validators.required],
                WPrice:[this.car.WPrice, Validators.required],
                BodyType:[this.car.BodyType, Validators.required],
                Passengers:[this.car.Passengers, Validators.required],
                Doors:[this.car.Doors, Validators.required],
                Groupe:[this.car.Groupe, Validators.required],
                MinAge:[this.car.MinAge, Validators.required],
                Power:[this.car.Power, Validators.required],
                Consumption:[this.car.Consumption, Validators.required],
                Transmission:[this.car.Transmission, Validators.required],
                Fuel:[this.car.Fuel, Validators.required],
                AC:[Boolean(Number(this.car.AC))],
                ABS:[Boolean(Number(this.car.ABS))],
                AirBags:[Boolean(Number(this.car.AirBags))],
                Radio:[Boolean(Number(this.car.Radio))],
                Description:[this.car.Description, Validators.required],
                Description_Eng:[this.car.Description_Eng, Validators.required]
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
      console.log(!this.car.Photo);
      
      this.showBtn = this.change.Keys.length>0;
      if(!this.car.Photo){
        this.showBtn = true;
      }
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
      this.showBtn = this.changeP.Keys.length>0;
    }
    return this.showBtn;
  }
  ngOnInit() {
    if(this.car.Model){
      
    }
    console.log(this.car);
    this.carForm = this.fb.group({
      Model:['', Validators.required],
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

    if(!this.image){
      return;
    }
    if(this.checkPrices()){
      return;
    }
    if(this.carForm.invalid){
      return;
    }
    
    this.ls.showLoad=true;
    const formData = new FormData();
    formData.append('Data', this.image);
    console.log(this.carForm.value);
    this.carsService.AddCar(this.carForm.value).subscribe((CarId)=>{
      console.log(CarId);
      forkJoin(
        this.carsService.UploadFile(CarId, UploadTypes.Car, formData),
        this.carsService.AddPrices(CarId, this.Prices),
      )
      .subscribe(([event, res2]) => {
        if(event.type == HttpEventType.Response){
          this.image=null;
          this.ls.showLoad=false;
          this.Prices = new CarPrices();
          this.carForm.reset();
          this.carSubmitted=false;
        }
      });
      // this.carsService.UploadFile(CarId, UploadTypes.Car, formData).subscribe(event=>{
      //   if(event.type == HttpEventType.UploadProgress){
      //     //this.ls.load = Math.round(event.loaded/event.total * 100);
          
      //   }
      //   else if(event.type == HttpEventType.Response){
      //     this.image=null;
      //     // this.ls.load = -1;
      //     this.ls.showLoad=false;
      //     this.carForm.reset();
      //     this.carSubmitted=false;
      //   }
        
      // })
      // this.carsService.AddPrices(CarId, this.Prices).subscribe((data)=>{
      //   this.Prices = new CarPrices();
      //   this.carForm.reset();
      //   this.ls.showLoad=false;
      //   this.carSubmitted=false;
      // })
    })
  }
  checkPrices(){
    this.g.forEach(e => {
      if(!this.Prices.WinterPrices[e] || !this.Prices.SummerPrices[e]){
        return true;
      }
      
    });
    return false;
  }
  updateCar(){
    if(!this.image && !this.car.Photo){
      return;
    }
    if(this.carForm.invalid){
      return;
    }
    for(let i = 0; i<this.changeP.Values.length; i++){
      if(this.changeP.Values[i]=='' || this.changeP.Values[i]==0){
        return;
      }
    }
    this.ls.showLoad=true;
    if(this.change.Keys.length>0){
      this.carsService.UpdateCar(this.change, this.car.Id).subscribe((data)=>{
        for(let i = 0;i<this.change.Keys.length;i++){
          this.car[this.change.Keys[i]]=this.change.Values[i];
        }
        this.change=new Change();
        this.showBtn = false;
        this.ls.showLoad=false;
      })
    }
    if(this.image){
      const formData = new FormData();
      formData.append('Data', this.image);
      this.carsService.UploadFile(this.car.Id, UploadTypes.Car, formData).subscribe(event=> {
        if(event.type == HttpEventType.Response){
          this.image=null;
          // this.ls.load = -1;
          this.car.Photo = event.body;
          this.change=new Change();
          this.showBtn = false;
          this.ls.showLoad=false;
        }
      })
    }
    if(this.changeP.Keys.length>0){
      this.carsService.UpdatePrices(this.changeP, this.car.Id).subscribe((data)=>{
        this.car.Prices = JSON.parse(JSON.stringify(this.Prices));
        this.ls.showLoad=false;
      })
    }
    
  }

  putFile(event){
    if(event.target.files[0].type=='image/jpeg'){
      this.image = <File>event.target.files[0];
      this.invalidImage = false;
    }else{
      this.invalidImage = true;
    }

    
  }
  unload(){
    this.image = null;
  }

  unloadLink(s){

    s.Photo = null;
    this.checkUpdate();
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
