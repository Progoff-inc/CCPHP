import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsService, Car } from '../services/CarsService';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  search:Search = new Search();
  bestCars:Car[];
  betweenCars = false;
  showAdvs = false;
  @HostListener('document:scroll', [])
            onScroll(): void {
              if(window.pageYOffset>53){
                  
                this.showAdvs = true; 
              }
              else{
                this.showAdvs = false;
              }
              if(window.pageYOffset>303){
                
                this.betweenCars = true;
                
                  
              }
                
            }
  constructor(public translate: TranslateService, private formBuilder: FormBuilder, public service:CarsService){

  }
  get f() { return this.searchForm.controls; }
  ngOnInit(){
    this.searchForm = this.formBuilder.group({
      Pick: ['', Validators.required],
      Drop: ['', Validators.required]     
    });
    this.service.GetBestCars().subscribe(data => {
      console.log(data);
      if(data.length!=0){
        
        this.bestCars=data;
      }
      else{
        
      }
      
      
    })
  }
}

export class Search{
  Pick:string;
  Drop:string;
  DateStart:Date;
  DateFinish:Date;
}
