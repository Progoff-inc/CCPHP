import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  @Input() service:any;
  pages:Page[]=[];
  curPage:number=1;
  k:number = 21;
  constructor() { 

  }

  ngOnInit() {

   for(let i = 0; i<Math.ceil(this.service.number/this.k);i++){
    this.pages.push({num:i+1,floor:i*this.k,top:i*this.k+this.k});
   }
  }
  change(curPage:number,floor:number=null,top:number=null){
    if(floor!=null){
      this.service.changePage(floor,top);
      window.scrollTo(0,500);
      this.curPage=curPage;
    }else{
      if(curPage>0 && curPage<Math.ceil(this.service.number/this.k+1)){
        this.service.changePage((curPage-1)*this.k,(curPage-1)*this.k+this.k);
        this.curPage=curPage;
        window.scrollTo(0,500);
      }
      
    }
    
  }

}

interface Page{
  num:number;
  floor:number;
  top:number;
}
