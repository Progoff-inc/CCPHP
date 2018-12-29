import { Component, OnInit } from '@angular/core';
import {User, Statistics, UserService, Book} from '../services/UserService';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent implements OnInit {
  stat:Statistics;
  zoom:number = 1;
  maxHeight:number = 0;
  height:number;
  months:Month[] = [
    {Days:31,Number:0,Name:"Jan"},
    {Days:28,Number:1,Name:"Feb"},
    {Days:31,Number:2,Name:"Mar"},
    {Days:30,Number:3,Name:"Apr"},
    {Days:31,Number:4,Name:"May"},
    {Days:30,Number:5,Name:"Jun"},
    {Days:31,Number:6,Name:"Jul"},
    {Days:31,Number:7,Name:"Aug"},
    {Days:30,Number:8,Name:"Sep"},
    {Days:31,Number:9,Name:"Oct"},
    {Days:30,Number:10,Name:"Nov"},
    {Days:31,Number:11,Name:"Dec"}
    
  ]
  curMonths:CurMonth[]=[];
  year:number=new Date().getFullYear();
  constructor(private userService:UserService) {
      
  }

  ngOnInit() {
    this.userService.GetStatistics().subscribe(data =>{
      this.stat=data;
      
      this.stat.Books.forEach(b => {
        b.CreateDate=new Date(b.CreateDate);
        b.DateStart=new Date(b.DateStart);
        b.DateFinish=new Date(b.DateFinish);
      })
      this.getZoom();
    })
    this.setCurMonths(new Date().getMonth());
    
  }
  setCurMonths(n:number){
    var k = 0;
    while(k<12){
      let month;
      if(n-k>=0){
        month=n-k;
      }
      else{
        month=12+(n-k);
        if(this.year==new Date().getFullYear()){
          this.year-=1;
        }
      }
      
      this.curMonths.unshift({DateStart:new Date(this.year,month,1), DateFinish:new Date(this.year,month,this.months[month].Days), MNum:month})
      k++;
    }
  }
  getZoom(){
    this.curMonths.forEach(m => {
      let res = [];
    
      this.stat.Books.forEach(c=>{
        if(c.CreateDate>=m.DateStart && c.CreateDate<=m.DateFinish){
          
          res.push(c);
        }
      })
      if(res.length>this.maxHeight){
        this.maxHeight=res.length;
        this.zoom = Math.round(200/this.maxHeight);
      }
    })
  }
  getHeight(){
    let h=[];
    for(let i =0; i<200/this.zoom;i++){
      h.push(i);
    }
    return h
  }
  getTrans(type:string, m:CurMonth){
    let res = [];
    this.stat.Books.forEach(c=>{
      if(c.CreateDate>=m.DateStart && c.CreateDate<=m.DateFinish && c.Car.Transmission==type){
        
        res.push(c);
      }
    })
    return res.length;
  }

}
export interface Month{
  Days:number;
  Number:number;
  Name:string;
}
export interface CurMonth{
  DateStart:Date;
  DateFinish:Date;
  MNum:number;
}