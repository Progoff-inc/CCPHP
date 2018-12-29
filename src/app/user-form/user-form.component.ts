import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../services/UserService';
import { AlertService } from '../services/AlertService';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() service: UserService;
  @Input() alert:AlertService;

  userForm: FormGroup;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder) {
    
  }
  get f() { return this.userForm.controls; }
  
  onSubmit() {
    this.submitted=true;
    if (this.userForm.invalid) {
      if(this.service.type==1){
        return;
      }
      if(this.f.Password.errors || this.f.Email.errors ){
        return;
      }
      
    }
    if(this.service.type==1){
      this.service.AddUser(this.userForm.value).subscribe(data=>{
        this.service.currentUser=data;

        localStorage.setItem('currentUser',JSON.stringify(data));
     
        this.alert.showA({type:'success',message:'Пользователь успешно зарегистрирован',show:true});
        this.service.ShowForm();
      },error => {
        this.alert.showA({type:'wrong',message:'Пользователь уже зарегистрирован',show:true});
        this.submitted=false;
        this.userForm.reset();
      })
    }

    if(this.service.type==0){
      this.service.GetUser(this.userForm.value).subscribe(data=>{
        this.service.currentUser=data;
        this.service.currentUser.Books.forEach(x =>{
          x.DateFinish=new Date(x.DateFinish);
          x.CreateDate=new Date(x.CreateDate);
          x.DateStart=new Date(x.DateStart);
        })
        this.service.currentUser.Reports.forEach(x =>{
          
          x.CreatedDate=new Date(x.CreatedDate);
          
        })
        localStorage.setItem('currentUser',JSON.stringify(data));
        location.reload();
        this.alert.showA({type:'success',message:'Вы успешно вошли',show:true});
        this.service.ShowForm();
      },error => {
        console.clear();
        if(error.status==500){
          this.alert.showA({type:'wrong',message:'Пользователь не найден',show:true});
          this.submitted=false;
          this.userForm.reset();
        }
        else{
          this.alert.showA({type:'wrong',message:'Неверный пароль',show:true});
          this.submitted=false;
        }
      })
    }
    
  }
  changeType(type:number){
    this.service.type=type;
    this.submitted=false;
  } 
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      Tel:[''],
      Lang:['']      
    });

  }

}
