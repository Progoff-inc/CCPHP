import { Component, OnInit, Input, SimpleChange, SimpleChanges, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input() Out:any = new Ex();
  @Input() Errors:any;
  @Input() Prop:string = "DateStart";
  @Input() MinDate:Date = new Date(0);
  @Input() MaxDate:Date = null;
  @Input() Intervals:any = [];
  @Input() DateStart:Date;
  @Input() DateFinish:Date;
  showPicker:boolean = false;

  firstDate:Date; 
  currentMonth:string;
  currentMonthNum:number;
  currentYear:number;
  weekStart:number;
  calendar:Date[][]=[];
  week:string[] = ["MON","TUE","WED","THU","FRI","SUT","SUN"];
  constructor( public translate:TranslateService) { }
  ngOnChanges(ch:SimpleChanges){
    if(ch.DateStart || ch.DateFinish){
      let date = new Date();
      if(ch.DateFinish && this.Prop=='DateFinish'){
        date = ch.DateFinish.currentValue;
        if(date){
          
          
          this.currentMonth=date.toLocaleString("en-us", {month:"short"});
          this.currentMonthNum = date.getMonth();
          this.currentYear = date.getFullYear();
          
          this.setMonth(0);
        }
      }
      if(ch.DateStart){
        this.MaxDate = undefined;
        date = ch.DateStart.currentValue;
        if(date){
          if(this.Prop=="DateFinish"){
            this.MinDate=ch.DateStart.currentValue;
            let minP = Number.MAX_VALUE;
            for(let i =0; i<this.Intervals.length;i++){
              
              if(this.Intervals[i].DateStart.getTime()>date.getTime()){
                if(this.Intervals[i].DateStart.getTime()-date.getTime()<minP){
                  minP = this.Intervals[i].DateStart.getTime()-date.getTime();
                  this.MaxDate=this.Intervals[i].DateStart;
                }
              }
            }
          }
          if(this.DateFinish && date.getTime()>this.DateFinish.getTime()){
            this.Out.DateFinish=undefined;
            this.DateFinish=undefined;
          }
          if(this.DateFinish && this.MaxDate){
            if(this.DateFinish.getTime()>this.MaxDate.getTime()){
              this.Out.DateFinish=undefined;
              this.DateFinish=undefined;
            }
          }
          
          
          
          this.currentMonth=date.toLocaleString("en-us", {month:"short"});
          this.currentMonthNum = date.getMonth();
          this.currentYear = date.getFullYear();
          
          this.setMonth(0);
        }
      }
      
      
      
    }
    
  }
 
  shooseProgress(day:Date, leave:boolean){
    if(this.DateStart){
      if(this.Prop=='DateFinish'){
        if(leave && this.checkDate(day) && day.getTime()>this.MinDate.getTime()){
          this.DateFinish=day;
        }
        if(!leave){
          this.DateFinish=this.Out[this.Prop];
        }
      }
    }
  }
  ngOnInit() {
    let date = new Date();
    if(this.DateStart){
      date = this.DateStart;
    }
    if(this.DateFinish){
      date = this.DateFinish
    } 
    if(this.translate.currentLang=="ru"){
      this.weekStart=1;
      this.week = ["MON","TUE","WED","THU","FRI","SUT","SUN"];
    }
    else{
      this.week = ["SUN","MON","TUE","WED","THU","FRI","SUT"]
      this.weekStart=0;
    }
    date = new Date(date.getFullYear(),date.getMonth());
    this.currentMonth=date.toLocaleString("en-us", {month:"short"});
    this.currentMonthNum = date.getMonth();
    this.currentYear = date.getFullYear();
    
    if(date.getDay()!=this.weekStart){
      
      date = new Date(date.getTime()-(date.getDay()-this.weekStart)*86400000);
    }
    this.firstDate = date;
    this.fillCalendar();
    this.translate.onLangChange.subscribe(d => {
      if(d.lang=="ru"){
        this.weekStart=1;
        this.week = ["MON","TUE","WED","THU","FRI","SUT","SUN"];
      }
      else{
        this.week = ["SUN","MON","TUE","WED","THU","FRI","SUT"]
        this.weekStart=0;
      }
      this.setMonth(0);
      
    })
    

  }
  getClass(day:Date){
    return day.getMonth()==this.currentMonthNum;
  }
  next(){
    this.setMonth(1);
  }
  fillCalendar(){
    
    this.calendar=[];
    for(let i =0; i<5;i++){
      let d = [];
      for(let j = 0; j<7;j++){
        d.push(new Date(this.firstDate.getTime()+86400000*i*7+86400000*j));
      }
      this.calendar.push(d);
    }
  }
  prev(){
    this.setMonth(-1);
  }
  setMonth(c:number){
    let date = new Date(this.currentYear,this.currentMonthNum+c);
    this.currentMonth=date.toLocaleString("en-us", {month:"short"});
    this.currentMonthNum = date.getMonth();
    this.currentYear = date.getFullYear();
    if(date.getDay()!=this.weekStart){
      date = new Date(date.getTime()-(date.getDay()-this.weekStart)*86400000);
    }
    
    this.firstDate = date;
    this.fillCalendar();
  }
  pick(date:Date){
    if(date.getTime()>this.MinDate.getTime() && this.checkDate(date)){
      if(this.DateStart && this.Out.DateFinish){
        if(date.getTime()!=this.DateStart.getTime() && date.getTime()!=this.Out.DateFinish.getTime()){
          this.Out[this.Prop]=date;
          
          this.Errors[this.Prop]=false;
          //this.hide();
        }
      }
      else{
        this.Out[this.Prop]=date;
          
          this.Errors[this.Prop]=false;
          //this.hide();
      }
      
    }
    
  }

  hide(){
    this.showPicker = !this.showPicker;
  }
  checkChoose(d:Date){
    if(this.Out[this.Prop]){
      return this.Out[this.Prop].getTime()==d.getTime();
    }
    else{
      return false;
    }
    
  }
  checkDate(date:Date){
    let res = true;
    this.Intervals.forEach(e => {
      if(e.DateStart.getTime()<=date.getTime() && e.DateFinish.getTime()>=date.getTime()){
        res =false;
      }
    });
    
    return res;
  }
  checkOppositeChoose(day:Date){
    if(this.DateStart && this.DateFinish){
      if(day.getTime()>this.DateStart.getTime() && day.getTime()<this.DateFinish.getTime()){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }
  getChoosed(day:Date, IsStart:boolean){
    let res = false;
    if(IsStart){
      if(this.DateStart && this.DateFinish){
        if(day.getTime() == this.DateStart.getTime()){
          res = true;
        }
      }
    }
    else{
      if(this.DateStart && this.DateFinish){
        if(day.getTime() == this.DateFinish.getTime()){
          res = true;
        }
      }
    }
    return res;
  }
}

 export class Ex{
   DateStart:Date;
 }