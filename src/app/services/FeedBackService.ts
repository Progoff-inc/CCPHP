import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injectable } from '@angular/core';
import {User, ReportComment, FeedBack, Like} from '../services/UserService';
import {CarsService, Car, Book} from '../services/CarsService';



@Injectable()
export class FeedBackService{
  reports:FeedBack[];
  curReports:FeedBack[];
  buttons:any = [];
  number:number=0;
  //baseUrl:string='http://nomokoiw.beget.tech/back/';
  baseUrl:string='http://localhost:80/CCPHP/';

  constructor(private http: HttpClient) {
    
    
  }
  getReports(){
    this.reports=[];
    this.number=0;
    this.http.get<FeedBack[]>(this.baseUrl + 'CarsController.php?Key=get-reports').subscribe(data => {
      this.reports=data;
   
      this.reports.forEach(r => {
          r.CreatedDate = new Date(r.CreatedDate);
          r.ButtonText = "SHOW_COMMENTS";
      })
      this.number=this.reports.length;
      this.changePage(0,21);
      console.log(this.curReports);
    })
  }
  saveReport(report:ShortFeedBack){
    
    return this.http.post<FeedBack>(this.baseUrl + 'FBController.php?Key=add-report', { "UserId": report.UserId, "CarId": report.CarId, "Look":report.Look, "Comfort": report.Comfort, "Drive": report.Drive, "DateStart": new Date(report.DateStart), "Mark":((report.Look+report.Comfort+report.Drive)/3), "Text":report.Report });
  }
  changeLike(LikeId:number, IsLike){
    return this.http.post<FeedBack>(this.baseUrl + 'FBController.php?Key=change-like', { "IsLike": IsLike, "LikeId": LikeId});
  }
  deleteLike(LikeId:number){
    return this.http.delete(this.baseUrl + 'FBController.php?Key=delete-like&Id='+LikeId);
  }
  addLikeOrDislike(like:Like){
    return this.http.post<Like>(this.baseUrl + 'FBController.php?Key=add-likes', { "IsLike": like.IsLike, "CommentId": like.CommentId, "FeedBackId":like.FeedBackId, "UserId":like.UserId});
  }
  addComment(text:string, UserId:number, FeedBackId:number ){
    return this.http.post<ReportComment>(this.baseUrl + 'FBController.php?Key=add-comment',{"Text":text, "UserId":UserId, "FeedBackId":FeedBackId});
  }
  changePage(floor:number, top:number){
    this.curReports = [];
    
    for(let i = floor;i<top;i++){
      if(i<this.number){
        this.curReports.push(this.reports[i]);
        this.reports[i].ShowForm=false;
      }
      else{
        break;
      }
      
    }
  

  }
}



// export interface Report {
//     Car:Car;
//     User:User;
//     Id: number;
//     UserId: number;
//     CarId: number;
//     Mark: number;
//     Text:string;
//     CreateDate: Date;
//     ShowForm:boolean;

// }
export class ShortFeedBack{
  CarId:number=0;
  DateStart:Date;
  Look:number=0;
  Comfort:number=0;
  Drive:number=0;
  Report:string='';
  UserId:number=0;
  Clear:boolean=false;
}



