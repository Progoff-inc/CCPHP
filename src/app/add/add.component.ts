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
  
  Includes:Contains = new Contains();
  
  constructor(private fb:FormBuilder, private carsService:CarsService, public translate:TranslateService) { }

  ngOnInit() {
    this.carForm = this.fb.group({
      Model:['', Validators.required],
      Photo:['', Validators.required],
      PriceS:['', Validators.required],
      PriceW:['', Validators.required],
      BodyType:['', Validators.required],
      Passengers:['', Validators.required],
      Doors:['', Validators.required],
      Group:['', Validators.required],
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
    if(this.carForm.invalid){
      return;
    }
    console.log(this.carForm.value);
  }
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
