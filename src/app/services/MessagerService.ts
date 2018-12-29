import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, Injectable } from '@angular/core';
import {User, ReportUser} from '../services/UserService';

export class MessagerService{
    //baseUrl:string='http://nomokoiw.beget.tech/back/';
    baseUrl:string='http://localhost:80/CCPHP/';
    constructor(private http: HttpClient) {
    
    
    }
    saveMessage(mess:Message){
    
        return this.http.post<Message>(this.baseUrl + 'MessagerController.php?Key="save-message"', mess);
    }
    createTopic(top:any){
    
        return this.http.post<Topic>(this.baseUrl + 'MessagerController.php?Key="create-topic"', top);
    }
    sendMessage(mess:any){
    
        return this.http.post<Topic[]>(this.baseUrl + 'MessagerController.php?Key="send-message"', mess);
    }
    changeSeen(TopicId:number){
        let params = new HttpParams().set('Id',TopicId.toString());
        return this.http.post(this.baseUrl + 'MessagerController.php?Key="change-topic-seen"', params);
    }
    getTopics(UserId:number){
        return this.http.get<Topic[]>(this.baseUrl + 'MessagerController.php?Key="get-user-topics"&Id='+UserId);
    }
}

export interface Message{
    Id:number;
    CreateDate:Date;
    Text:string;
    UserId:number;
    TopicId:number;
}

export interface Topic{
    Id:number;
    UserId:number;
    UserReciverId:number;
    ModifyDate:Date;
    User:ReportUser;
    Messages:Message[];
    Seen:boolean;
}