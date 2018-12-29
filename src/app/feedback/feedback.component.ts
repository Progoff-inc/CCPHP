import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../services/AlertService';

import { CarsService, ReportCar } from '../services/CarsService';
import { FeedBackService, ShortFeedBack } from '../services/FeedBackService';
import { ReportComment, UserService, FeedBack, Like } from '../services/UserService';

@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
  
})
export class FeedbackComponent implements OnInit, OnChanges {
  autorized:boolean=false;
  registerForm: FormGroup;
  choosedCar:ReportCar;
  commentForm: FormGroup;
  errors:string[]=[];
  Errors:any = {DateStart:true}; //Потом объединить c errors
  submitted = false;
  cars:ReportCar[]=[];
  feedBack:ShortFeedBack= new ShortFeedBack();
  
  @Input() reports:FeedBack[]=[];
  @Input() type:string='all';

  buttons:boolean[] = [];
  alertService = new AlertService(); 
  
  constructor(private carsService:CarsService, private formBuilder: FormBuilder, public feedBackService:FeedBackService, public userService:UserService){}

  ngOnChanges(ch:SimpleChanges){
    if(ch.reports){
      this.reports = ch.reports.currentValue;
      this.feedBackService.reports=this.reports;
      this.feedBackService.number=this.reports.length;
 
      this.feedBackService.changePage(0,21);
    }
  }
  ngOnInit() {

    
    
    if(localStorage.getItem("currentUser")){

      this.autorized=true;
    }
    this.carsService.GetReportCars().subscribe( data => {
      this.cars=data;
  
    })
    if(this.type=='all'){
      this.feedBackService.getReports();
      
    
    }
    if(this.type=='car'){
      this.feedBackService.reports=this.reports;
      this.feedBackService.number=this.reports.length;
 
      this.feedBackService.changePage(0,21);
    }
    
    
    this.registerForm = this.formBuilder.group({
      Report: ['', [Validators.required]]
    });
    this.commentForm = this.formBuilder.group({
      report:['', Validators.required]
    });
  }
  getLikes(com:any, islike:boolean){
    let res = com.Likes.filter(x => x.IsLike == islike).length;
    return res;
  }
  getUserLike(com:any, islike:boolean = true){
    if(localStorage.getItem('currentUser')){
      return com.Likes.filter(x => x.UserId == this.userService.currentUser.Id)[0];
    }
    else{
      return false;
    }
    
    
  }
  changeLike(like:Like, IsLike:boolean, com:any){
    if(like.IsLike!=IsLike){
      
      this.feedBackService.changeLike(like.Id, IsLike).subscribe(() =>{
        like.IsLike = IsLike;
      })
    }
    else{
      this.feedBackService.deleteLike(like.Id).subscribe((res) =>{
        com.Likes = com.Likes.filter(x => x.Id!=like.Id);
      })
    }
  }
  addLikes(report:any, IsLike:boolean, comment?:any){
    if(this.autorized){
      var like = this.getUserLike(comment?comment:report);
      if(like){
        this.changeLike(like,IsLike, comment?comment:report)
      }
      else{
        let like = {Id:0,UserId: this.userService.currentUser.Id, FeedBackId:report.Id, CommentId:comment?comment.Id:0,IsLike:IsLike};
        this.feedBackService.addLikeOrDislike(like).subscribe((data) =>{
          if(comment){
            comment.Likes.push(data);
          }
          else{
            report.Likes.push(data);
          }
        })
      }
    }
    else{
      this.userService.ShowForm(0);
    }
    
    
  }
  showComments(com:FeedBack){
    if(com.ShowComments){
      com.ShowComments=!com.ShowComments;
      com.ButtonText="SHOW_COMMENTS";
    }
    else{
      com.ShowComments=!com.ShowComments;
      com.ButtonText="CLOSE_COMMENTS";
    }

  }
  showForm(com:FeedBack){
    if(this.autorized){
      this.userService.currentUser=JSON.parse(localStorage.getItem("currentUser"));
      com.ShowForm=!com.ShowForm;
    }
    else{
      this.userService.ShowForm(0);
    }
    this.submitted=false;
    
  }
  addComment(text:string, report:FeedBack){
    this.submitted = true;
    
    if (this.commentForm.invalid) { 
        return;
    }
    this.feedBackService.addComment(this.carsService.checkStr(text), this.userService.currentUser.Id, report.Id).subscribe(data =>{
      report.ShowForm=!report.ShowForm;
      this.commentForm.reset();
      report.Comments.push(data);
    })
    this.submitted=false;
  }
  get f() { return this.registerForm.controls; }
  get f1() { return this.commentForm.controls; }
 
    onSubmit() {
        // stop here if form is invalid
      this.submitted = true;
      if(this.feedBack.CarId==0){
        this.errors.push("carid");
      }
      else{
        if(this.errors.indexOf("carid")>-1){
          this.errors.splice(this.errors.indexOf("carid"),1);
        }

      }
      if(this.feedBack.Look==0){
        this.errors.push("look");
      }
      else{
        if(this.errors.indexOf("look")>-1){
          this.errors.splice(this.errors.indexOf("look"),1);
        }
      }
      if(this.feedBack.Comfort==0){
        this.errors.push("comfort");
      }
      else{
        if(this.errors.indexOf("comfort")>-1){
          this.errors.splice(this.errors.indexOf("comfort"),1);
        }
      }
      if(this.feedBack.Drive==0){
        this.errors.push("drive");
      }
      else{
        if(this.errors.indexOf("drive")>-1){
          this.errors.splice(this.errors.indexOf("drive"),1);
        }
      }
      if (this.registerForm.invalid) {  
         return;
      }
      if(this.errors.length>0){
        return;
      }
      if(this.Errors.DateStart){
        return;
      }
      this.feedBack.UserId=this.userService.currentUser.Id;
      
      this.feedBack.Report= this.carsService.checkStr(this.registerForm.value.Report);
   
      
      this.feedBackService.saveReport(this.feedBack).subscribe(data => {
        if(data) {
          this.feedBackService.getReports();
          this.feedBack = new ShortFeedBack();
          this.alertService.showA({type:'success',message:'Комментарий успешно оставлен.',show:true});
        }
        this.registerForm.reset();
      },error => console.log(error))
      
      
      this.submitted=false;
        
        
       
    }

}





