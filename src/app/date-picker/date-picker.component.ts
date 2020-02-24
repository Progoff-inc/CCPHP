import { Component, OnInit, Input, SimpleChange, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less']
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input() MinDate:Date = new Date(0);
  @Input() MaxDate:Date = new Date(3000, 0);
  @Input() Intervals:any = [];
  @Input() Limitted = false;
  @Input() DateStart:Date;
  @Input() DateFinish:Date;
  @Input() ChoosedDate:Date;
  @Output() change = new EventEmitter<Date>();
  showPicker:boolean = false;
  firstDate:Date; 
  currentMonth:string;
  currentMonthNum:number;
  currentYear:number;
  weekStart:number;
  calendar:Date[][]=[];
  week:string[] = ["MON","TUE","WED","THU","FRI","SUT","SUN"];
  weekEng:string[] = ["SUN","MON","TUE","WED","THU","FRI","SUT"];
  constructor( public translate:TranslateService) { 
   
  }

  ngOnChanges(ch:SimpleChanges){
    this.DateStart = this.getDate(this.DateStart);
    this.DateFinish = this.getDate(this.DateFinish);
    this.ChoosedDate = this.getDate(this.ChoosedDate);
    this.MinDate = this.getDate(this.MinDate);
    this.MaxDate = this.getDate(this.MaxDate);
    if(ch.DateStart && ch.DateStart.currentValue){
      if(this.Limitted){
        this.setMax();
      }
      
    }
    
  }

  getDate(d:Date){
    if(d){
      return new Date(d.toDateString());
    }else{
      return null;
    }
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
  
  ngOnInit() {
    let date = new Date();
    this.DateStart = this.getDate(this.DateStart);
    this.DateFinish = this.getDate(this.DateFinish);
    this.ChoosedDate = this.getDate(this.ChoosedDate);
    this.MinDate = this.getDate(this.MinDate);
    this.MaxDate = this.getDate(this.MaxDate);
    if(this.ChoosedDate){
      date = this.ChoosedDate;
    } 
    if(this.translate.currentLang=="ru"){
      this.weekStart=1;
    }
    else{
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

  show(){
    this.showPicker = !this.showPicker;
  }

  pick(date:Date){
    if(this.getClass(date).indexOf('invalid-date')==-1){
      this.ChoosedDate=date;
      this.change.emit(date);
      if(this.Limitted && this.DateStart){
        this.setMax();
      }
      this.show();
    }
    
  }

  setMax(){
    this.MaxDate =  new Date(3000, 0);
    let minP = Number.MAX_VALUE;
    for(let i =0; i<this.Intervals.length;i++){
      
      if(this.Intervals[i].DateStart.getTime()>this.DateStart.getTime()){
        if(this.Intervals[i].DateStart.getTime()-this.DateStart.getTime()<minP){
          minP = this.Intervals[i].DateStart.getTime()-this.DateStart.getTime();
          this.MaxDate=this.Intervals[i].DateStart;
        }
      }
    }
  }

  getClass(date:Date){
    let res = {};
    if(this.ChoosedDate && date.getTime() == this.ChoosedDate.getTime()){
      res['choosed-date']=1;
    }
    if(date.getMonth() !== this.currentMonthNum){
      res['bg-light'] = 1;
    }
    if(this.MinDate && date.getTime()<this.MinDate.getTime() || this.MaxDate && date.getTime()>this.MaxDate.getTime()){
      res['invalid-date'] = 1;
      
    }
    if(this.Intervals.length>0){
      for(let i =0; i<this.Intervals.length; i++){
        let ds = new Date(this.Intervals[i].DateStart.toDateString());
        let df = new Date(this.Intervals[i].DateFinish.toDateString());
        if(ds.getTime()<=date.getTime() && df.getTime()>=date.getTime()){
          res['invalid-date']=1;
          break;
        }
      }
    }
    if(this.DateStart && date.getTime() == this.DateStart.getTime()){
      res['choosed-date']=1;
    }
    if(this.DateFinish && date.getTime() == this.DateFinish.getTime()){
      res['choosed-date']=1;
    }
    if(this.DateStart && this.DateFinish){
      if(date.getTime()>=this.DateStart.getTime() && date.getTime() <= this.DateFinish.getTime()){
        res['choosed-date']=1;
        res['opposite-choose']=1;
      }
      if(date.getTime()==this.DateStart.getTime()){
        res['choosed-start']=1;
      }
      if(date.getTime()==this.DateFinish.getTime()){
        res['choosed-finish']=1;
      }
    }
    
    return Object.keys(res).join(' ');
  }

  checkStr(str:string, s:string){
    return str.indexOf(s)>-1
  }
  
}

 export class Ex{
   DateStart:Date;
 }