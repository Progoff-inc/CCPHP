import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injectable } from '@angular/core';
import {User, ReportComment, FeedBack, Like, UserService} from '../services/UserService';
import {CarsService, Car, Book} from '../services/CarsService';
import { LoadService } from './load.service';



@Injectable()
export class FeedBackService{
  reports:FeedBack[];
  curReports:FeedBack[];
  buttons:any = [];
  number:number=0;
  baseUrl:string='http://client.nomokoiw.beget.tech/back/';
  //baseUrl:string='http://localhost:80/CCPHP/';

  constructor(private http: HttpClient, private ls:LoadService, private us:UserService) {
    
    
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
      this.reports.sort((a,b)=>{
        return a.CreatedDate>b.CreatedDate?-1:1
      })
      this.number=this.reports.length;
      this.changePage(0,21);
      this.ls.showLoad=false;
    })
  }
  saveReport(report:ShortFeedBack){
    
    return this.http.post<FeedBack>(this.baseUrl + 'FBController.php?Key=add-report&Token='+this.us.Token, { "UserId": report.UserId, "CarId": report.CarId, "Look":report.Look, "Comfort": report.Comfort, "Drive": report.Drive,  "Mark":((report.Look+report.Comfort+report.Drive)/3), "Text":report.Text });
  }
  changeLike(LikeId:number, IsLike){
    return this.http.post<FeedBack>(this.baseUrl + 'FBController.php?Key=change-like&Token='+this.us.Token, { "IsLike": IsLike, "LikeId": LikeId});
  }
  deleteLike(LikeId:number){
    return this.http.delete(this.baseUrl + 'FBController.php?Key=delete-like&Id='+LikeId+'&Token='+this.us.Token);
  }
  addLikeOrDislike(like){
    return this.http.post<number>(this.baseUrl + 'FBController.php?Key=add-likes&Token='+this.us.Token, { "IsLike": like.IsLike, "OwnerId": like.OwnerId, "Type":like.Type, "UserId":like.UserId});
  }
  addComment(text:string, UserId:number, FeedBackId:number ){
    return this.http.post<ReportComment>(this.baseUrl + 'FBController.php?Key=add-comment&Token='+this.us.Token,{"Text":text, "UserId":UserId, "FeedBackId":FeedBackId});
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
  UserId:number = 0;
  CarId:number = 0;
  Look:number = 0;
  Drive:number = 0;
  Comfort:number = 0;
  Mark:number = 0;
  Text:string = '';
}



