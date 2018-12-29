import { Component, OnInit, Input } from '@angular/core';
import {User, UserService, Book, Sale, ReportUser} from '../services/UserService';

import {Router} from '@angular/router';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'
import { NewCar, Car, CarsService, ReportCar, Contains } from '../services/CarsService';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';


@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() NewAdmin:ReportUser;
  showBooks:boolean = true;
  showAddCar:boolean = false;
  showAddNewAdmin:boolean = false;
  showAddSale:boolean = false;
  Includes:Contains = new Contains();
  cars:ReportCar[] = [];
  users:ReportUser[] = [];
  newAdmin:any = {UserId:0};
  saleErrors:any={DateStrart:true, DateFinish:true};
  newSale:Sale = new Sale();
  newCar:NewCar =new NewCar();
  carSubmitted:boolean = false;
  saleSubmitted:boolean = false;
  adminSubmitted:boolean = false;
  changes:boolean[]=[false,false,false];
  changeValues:string[]=["","",""];
  submittes:boolean[]=[false,false,false];
  constructor(public translate:TranslateService, public carsService:CarsService, private http: HttpClient, public userService:UserService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("currentUser")){
      this.userService.currentUser=JSON.parse(localStorage.getItem("currentUser"));
      this.userService.GetUserById(this.userService.currentUser.Id).subscribe(data => {
        data.Topics.forEach(x => {
          x.ModifyDate= new Date(x.ModifyDate);
        })
        this.userService.currentUser=data;
        this.changeValues[0]=data.Email;
        this.changeValues[1]=data.Phone;
        localStorage.setItem('currentUser',JSON.stringify(data));
       
      })
      if(this.userService.currentUser.IsAdmin){
        this.carsService.GetReportCars().subscribe( data => {
          this.cars=data;
      
        })
        this.userService.GetUsers().subscribe(data => {
          this.users = data;
        })
      }
    }
    else{
      this.router.navigate(['/allcars']);
    }
    
    
  }
  show(prop:string){
    this[prop] = !this[prop];
  }
  removeInclude(inc:string){
    if(this.newCar.Includes.indexOf(inc)>-1){
      this.newCar.Includes.splice(this.newCar.Includes.indexOf(inc),1);
    }
  }
  include(inc:string){
    
    if(this.newCar.Includes.indexOf(inc)==-1){
      this.newCar.Includes.push(inc);
    }
    
  }
  getSalePrice(){
    if(this.newSale.CarId!=0 && this.newSale.Discount){
      let carPrice = this.cars.find(x => x.Id == this.newSale.CarId).Price;
      let res = Math.round(carPrice*(1-this.newSale.Discount/100)*10)/10;
      if(this.newSale.NewPrice!=res){
        this.newSale.NewPrice=res;
      }
      return res;
    }
    return 0;
  }
  getStatus(book:Book){
    book.DateFinish = new Date(book.DateFinish);
    if(book.DateFinish.getTime()<new Date().getTime()){
      return "Завершено"
    }else{
      if(new Date(book.DateStart).getTime()<=new Date().getTime() && book.DateFinish.getTime()>=new Date().getTime()){
        return "Активно"
      }
      else{
        return "Ожидание"
      }
      
    }
  }
  changeInfo(item:number,type:string, value:string, t?:HTMLInputElement){
    console.log(t);
    this.submittes[item]=true;
    if(type == 'Email' && this.carsService.checkEmail(value)){
      
      return;
    }
    if(type == 'Phone' && !this.carsService.checkStr(value,'phone-check')){

      return;
    }
    if(value != ''){
      console.log(true);
      this.userService.ChangeInfo(type, this.carsService.checkStr(value,'phone'), this.userService.currentUser.Id).subscribe(data => {
        if(data){
          this.userService.currentUser[type]= this.carsService.checkStr(value,'phone');
          localStorage.setItem('currentUser', JSON.stringify(this.userService.currentUser));
        }
      })
    }
    
    this.changes[item]=false;
  }
  upload(files) {
    const formData = new FormData();
    // files[0].name = this.userService.currentUser.Id.toString()+files[0].name.split('.')[1] ;
    
    let n = this.userService.currentUser.Id.toString()+'.'+files[0].name.split('.')[1] ;
    console.log(n);
    formData.append(n, files[0]);

    this.userService.UploadPhoto(formData).subscribe(event => {
      this.userService.ChangePhoto({Id:this.userService.currentUser.Id, Photo:event.Path}).subscribe(data => {
        
      })
    });
    // this.http.post<any>(req).subscribe(event => {
        
    //     this.userService.ChangePhoto({Id:this.userService.currentUser.Id, Photo:event.Path})
    // });

      
  }
  showChangeInfo(item:number, show:boolean){

    for(let i =0; i<this.changes.length;i++){
      if(i==item){
        this.changes[i]=show;
      }
      else{
        this.changes[i]=false;
      }
      
    }
  }
  addCar(){
    this.carSubmitted =true;
    for(let i =0; i<Object.keys(this.newCar).length;i++){
      if(this.newCar[Object.keys(this.newCar)[i]]==null){
        return;
      }
    }
    this.newCar.Includes.forEach(x => {
      if(this.translate.currentLang=='ru'){
        this.newCar.Contain+=this.Includes.Includes.indexOf(x)+'/';
      }
      else{
        this.newCar.Contain+=this.Includes.IncludesEng.indexOf(x)+'/';
      }
      
    })
    this.newCar.Contain = this.newCar.Contain.slice(0,this.newCar.Contain.length-1);
    console.log(this.newCar);
    this.carsService.AddCar(this.newCar).subscribe(data => {
      this.newCar = new NewCar();
      this.carSubmitted=false;
    })
  }
  addSale(){
    this.saleSubmitted = true;
    for(let i =0; i<Object.keys(this.newSale).length;i++){
      if(this.newSale[Object.keys(this.newSale)[i]]==null){
        return;
      }
    }
    if(this.newSale.DaysNumber>0){
      this.newSale.Type=1;
    }
    this.userService.AddSale(this.newSale).subscribe(data => {
      this.newSale = new Sale();
      this.saleSubmitted = false;
    })
  }
  addAdmin(){
    this.adminSubmitted = true;
    if(this.newAdmin.UserId==0){
      return
    }
    this.NewAdmin = this.users.find(x => x.Id == this.newAdmin.UserId);
    this.NewAdmin.IsAdmin = !this.NewAdmin.IsAdmin;
    this.userService.SetAdmin(this.NewAdmin).subscribe(data => {
      this.NewAdmin = data;
      this.newAdmin={UserId:0};
      this.adminSubmitted = false;
    })
  }
  

}
