import { Component, OnInit, Input } from '@angular/core';
import {User, UserService, Book, Sale, ReportUser} from '../services/UserService';

import {Router} from '@angular/router';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'
import { NewCar, Car, CarsService, ReportCar, Contains } from '../services/CarsService';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { LoadService } from '../services/load.service';


@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
  @Input() NewAdmin:ReportUser;
  showBooks:boolean = false;
  showAddCar:boolean = false;
  showAddNewAdmin:boolean = false;
  showAddSale:boolean = false;
  Includes:Contains = new Contains();
  cars:ReportCar[] = [];
  users:ReportUser[] = [];
  findUsers = [];
  curUserPage = 0;
  newAdmin:any = {UserId:0, IsAdmin:null};
  saleErrors:any={DateStrart:true, DateFinish:true};
  newSale:Sale = new Sale();
  newCar:NewCar =new NewCar();
  carSubmitted:boolean = false;
  saleSubmitted:boolean = false;
  adminSubmitted:boolean = false;
  changes:boolean[]=[false,false,false];
  changeValues:string[]=["","",""];
  submittes:boolean[]=[false,false,false];
  constructor(private ls:LoadService, public translate:TranslateService, public carsService:CarsService, private http: HttpClient, public userService:UserService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("currentUser")){
      this.ls.showLoad = true;
      this.userService.currentUser=JSON.parse(localStorage.getItem("currentUser"));
      
      this.userService.GetUserById(this.userService.currentUser.Id).subscribe(data => {
        data.Topics.forEach(x => {
          x.ModifyDate= new Date(x.ModifyDate);
        })
        console.log(data);
        data.IsAdmin = Boolean(Number(data.IsAdmin));
        this.userService.currentUser=data;
        this.changeValues[0]=data.Email;
        this.changeValues[1]=data.Phone;
        localStorage.setItem('currentUser',JSON.stringify(data));
        this.ls.showLoad=false;
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
  addCar(){
    this.router.navigate(['/add'])
  }
  changeCar(id){
    this.router.navigate(['/add'],{
      queryParams:{
          'CarId': id
      }
  })
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

  changePage(p){
    this.curUserPage=p;
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
    if(this.newAdmin.UserId==0 || this.newAdmin.IsAdmin==null){
      return
    }
    
    this.NewAdmin = this.users.find(x => x.Id == this.newAdmin.UserId);
    this.NewAdmin.IsAdmin = this.newAdmin.IsAdmin==='true';
    this.userService.SetAdmin(this.NewAdmin.Id, this.NewAdmin.IsAdmin).subscribe(data => {
      this.NewAdmin = data;
      this.newAdmin={UserId:0, IsAdmin:null};
      this.adminSubmitted = false;
    })
  }
  FindUsers(name){
    this.findUsers = this.setPages(this.users.filter(x => x.Name.indexOf(name)>-1));
  }
  
  setPages(items, n = 1){
    let pagedItems = [];
    while(items.length>0){
        pagedItems.push(items.splice(0,n));
    }
    return pagedItems;
}
  

}
