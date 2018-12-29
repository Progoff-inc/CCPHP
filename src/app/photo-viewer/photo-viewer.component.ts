import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.css']
})
export class PhotoViewerComponent implements OnInit {
  slides:string[][] = [];
  currentSlide:number=0;
  showAll:boolean=false;
  @Input() items:string[];
  @Input() show:any;
  currentItem:number = 0; 

  constructor() { 
  

  }

  ngOnInit() {
    let size = 4; //размер подмассива
    //let subarray = []; //массив в который будет выведен результат.
    for (let i = 0; i <Math.ceil(this.items.length/size); i++){
        this.slides[i] = this.items.slice((i*size), (i*size) + size);
    }
  }
  choosePhoto(photo:string){
    this.currentItem=this.items.indexOf(photo);
    console.log(photo);
  }
  next(){
    if(this.currentItem!=this.items.length-1){
      this.currentItem+=1;
      if(this.currentItem==4*(this.currentSlide+1)){
        this.nextSlide();
      }
      
    }
  }
  prev(){
    if(this.currentItem!=0){
      this.currentItem-=1;
    }
    if(this.currentItem==4*(this.currentSlide)-1){
      this.prevSlide();
    }
  }
  nextSlide(){
    if(this.currentSlide!=this.slides.length-1){
      this.currentSlide+=1;
    }
  }
  prevSlide(){
    if(this.currentSlide!=0){
      this.currentSlide-=1;
    }
  }
  close(){
    this.show.show=false;
    this.show;
  }

}
