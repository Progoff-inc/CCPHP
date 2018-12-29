import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Sale } from '../services/UserService';
import { CarsService } from '../services/CarsService';
import { Router} from '@angular/router';

@Component({
  selector: 'sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit{
  slides:Sale[][] = [];
  showCarousel:boolean = false;
  currentSlide:number=0;
  
  constructor(public service:CarsService, private router: Router) { }
  ngOnInit() {
    if(window.innerWidth>767){
      this.showCarousel = true;
    }
    
    this.service.GetSales().subscribe(data => {
      let size = 3; //размер подмассива
      //let subarray = []; //массив в который будет выведен результат.
      for (let i = 0; i <Math.ceil(data.length/size); i++){
          this.slides[i] = data.slice((i*size), (i*size) + size);
      }
    })
  }
  next(){
    this.currentSlide = this.currentSlide==this.slides.length-1?this.currentSlide:this.currentSlide+1;
    
  }
  
  prev(){
    this.currentSlide = this.currentSlide==0?this.currentSlide:this.currentSlide-1;
  
  }
  showSale(sale:Sale){
    this.router.navigate(
      ['/booking', sale.CarId], 
      {
          queryParams:{
              'saleId': sale.Id
          }
      }
  );
  }

}

