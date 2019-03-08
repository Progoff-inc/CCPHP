import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, ViewRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessagerService, Topic } from '../services/MessagerService';
import { Router, ActivatedRoute } from '@angular/router';
import { User, ReportUser, UserService } from '../services/UserService';
import { AlertService } from '../services/AlertService';
import { CarsService } from '../services/CarsService';

@Component({
  selector: 'messager',
  templateUrl: './messager.component.html',
  styleUrls: ['./messager.component.css']
})
export class MessagerComponent implements OnInit, OnChanges {
  showMess:boolean=false;
  message:string = "";
  topicDate:Date;
  alert:AlertService = new AlertService();
  @Input() showAll:boolean = false;
  @Input() userProfile:boolean = false;
  
  @Input() topics:Topic[] = [];

  @ViewChild('messages')
  public m:ElementRef;
  showTopics:boolean = false;
  messageForm: FormGroup;
  userId:number = 0;
  user:User;
  currentTopic:Topic = null;
  submitted = false;
  
  constructor(private us:UserService, public cService:CarsService, private messagerService: MessagerService, private formBuilder: FormBuilder, private router: Router, private ARouter: ActivatedRoute){
   
    
   }
  get f() { return this.messageForm.controls; }
  get v() { return this.messageForm.value; }
  ngOnInit() {
    if(localStorage.getItem('currentUser')){
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.userId = this.user.Id;
      this.user.IsAdmin = Boolean(Number(this.user.IsAdmin));
    }
    
    if(this.topics.length==1){
      this.showTopic(this.topics[0]);
    }
    
    this.messageForm = this.formBuilder.group({
      Name: [this.user?this.user.Name:''],
      Email: [this.user?this.user.Email:'', Validators.required],
      Message: ['', Validators.required]
         
    });
    if(!this.userProfile && !this.showAll){
      
      if(this.user?this.user.Id==6:false){
        this.send(true);
      }
    }
  }
  showDate(i){
    if(this.currentTopic){
      let mes:Message = this.currentTopic.Messages[i];
      mes.ShowDate = false;
      if(i == 0){
        mes.ShowDate=true;
        return true;
      }
      
      let prevMes:Message = this.currentTopic.Messages[i-1];
      mes.ShowDate = mes.CreateDate.toDateString() != prevMes.CreateDate.toDateString();
      
    }
    
    return true;
    
    

  }
  showTopic(top?:Topic){
    
    if(this.currentTopic){
      this.currentTopic = null;
    }
    else{
      this.currentTopic = top;
      console.log(this.currentTopic);
      if(this.user){
        if(!top.Seen && this.user.Id == top.UserReciverId){
          this.messagerService.changeSeen(top.Id).subscribe(data => {
            if(data){
              
              top.Seen = true;
            }
          })
        }
      }
      
    }
  }
  ngOnChanges(ch:SimpleChanges){
    if(ch.topics){
      this.topics.forEach(t => {
        t.Messages.forEach(m => {
          m.CreateDate = new Date(m.CreateDate);
        })
        
      })
      if(this.currentTopic){
        this.currentTopic = ch.topics.currentValue.find(x => x.Id = this.currentTopic.Id);
        console.log(this.currentTopic.Messages);
        this.currentTopic.Messages.sort(function(a,b){
          return a.CreateDate.getTime()>b.CreateDate.getTime()?-1:1
        })
        console.log(this.currentTopic.Messages);
      }
    }
    

  }
  sendButton(event:KeyboardEvent, message:HTMLInputElement){
    
    if(event.key=="Enter"){
      this.sendMessage(message)
    }

  }
  show(show:boolean){
    
    if(!show){
      this.submitted=false;
      this.showMess=!this.showMess;
      if(this.userProfile ){
        window.scrollTo(0,100);
      }
      
      
      
    }
    
  }
  showScroll(x:number, y:number, c?:boolean){
    if(c){
      if(window.innerWidth>940){
        window.scrollTo(x,y);
      }
      else{
        window.scrollTo(x,y+150);
      }
      
    }
    
  }
  send(admin?:boolean){
    if(!admin){
      this.submitted=true;
      if(this.messageForm.invalid){
        return;
      }
    
      this.us.AddUser({Name:this.messageForm.value.Name, Email:this.messageForm.value.Email, Tel:'', Password:this.us.GenPassword()}).subscribe(userid => {
        this.userId = userid.Id;
        this.messagerService.createTopic({
          Id:0,
          UserId:userid.Id,
          UserReciverId:0,
          ModifyDate: new Date()
        }).subscribe(topics => {
          console.log(topics);
          let m = {
            Id:0,
            UserId:userid.Id,
            TopicId: topics[0].Id,
            Text:this.messageForm.value.Message,
            CreateDate: new Date()
          };
          this.messagerService.saveMessage(
            m
          ).subscribe(data => {
            topics.forEach(x => {x.ModifyDate = new Date(x.ModifyDate)});
            data.CreateDate= new Date(data.CreateDate);
            this.topics = topics;
            this.topics[0].Messages.push(data);
            this.showTopic(this.topics[0]);
            this.showTopics=true;
          })
        })
          
        })
        
        
        
      }
      else{
        
        if(this.topics.length==0){
          this.messagerService.getTopics(this.userId).subscribe(data =>{
            
            data.forEach(x => {
              x.ModifyDate = new Date(x.ModifyDate);
            })
            this.topics = data;
            this.showTopics=true;
          })
        }
          
      }
  }
  CreateTopic(){
    this.messagerService.createTopic({
      Id:0,
      UserId:this.userId,
      UserReciverId:0,
      ModifyDate: new Date()
    }).subscribe(data => {
      data.forEach(x => {x.ModifyDate = new Date(x.ModifyDate)});
      
      this.topics = data;
      this.showTopic(this.topics[0]);
    })
  }
  sendMessage(message:HTMLInputElement){
    let topicId = this.currentTopic?this.currentTopic.Id:0;
    this.messagerService.saveMessage({
      Id:0,
      UserId:this.userId,
      TopicId: topicId,
      Text:message.value,
      CreateDate: new Date()
    }).subscribe(data => {
      this.m.nativeElement.scrollTo(0,0);
      data.CreateDate= new Date(data.CreateDate);
      let topic = this.topics.find(x => x.Id == topicId);
      topic.ModifyDate = data.CreateDate;
      topic.Messages.unshift(data);
      if(this.currentTopic.Id == topicId){
        this.currentTopic=topic;
      }
      this.topics.sort(function(a, b) {
        return a.ModifyDate>b.ModifyDate ? -1 : a.ModifyDate<b.ModifyDate ? 1 : 0;
      });
      
      
      message.value="";

    })
    
  }
  getSeen(){
    var res =false;
    if(this.topics){
      this.topics.forEach(x => {
        if(!x.Seen && this.userId == x.UserReciverId){
          res = true;
        }
      })
    }
    return res;
  }

}
