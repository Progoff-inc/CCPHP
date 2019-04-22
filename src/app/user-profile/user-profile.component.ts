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

  changeDate:Date = new Date();
  deleteDate:Date = new Date();
  constructor(private ls:LoadService, public translate:TranslateService, public carsService:CarsService, private http: HttpClient, public userService:UserService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("currentUser")){
      this.ls.showLoad = true;
      this.changeDate.setDate(this.changeDate.getDate()+5);
      this.deleteDate.setDate(this.deleteDate.getDate()+3);
      this.userService.currentUser=JSON.parse(localStorage.getItem("currentUser"));
      
      this.userService.GetUserById(this.userService.currentUser.Id).subscribe(data => {
        data.Topics.forEach(x => {
          x.ModifyDate= new Date(x.ModifyDate);
        })
        data.Books.sort((a,b)=>{
          return a.DateStart<b.DateStart?1:-1
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
          this.users.forEach(u => {
            u.IsAdmin = Boolean(Number(u.IsAdmin));
          })
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
  DelCar(id){
    if(confirm(this.translate.currentLang=='ru'?"Удалить автомобиль?":"Delete car?")){
      alert("Удален");
      this.carsService.DeleteCar(id).subscribe(d => {
        this.cars.splice(this.cars.map(c => c.Id).indexOf(id),1)
        })
    }
    else{
      alert("Не удален");
    }
    
  }
  changeCar(id,e){
    if(e.target.name!='delete'){
      this.router.navigate(['/add'],{
          queryParams:{
              'CarId': id
          }
      })
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
    this.submittes[item]=true;
    if(type == 'Phone' && !this.carsService.checkStr(value,'phone-check')){

      return;
    }
    if(value != ''){
      this.userService.ChangeInfo(type, type == 'Phone'?this.carsService.checkStr(value,'phone'):value, this.userService.currentUser.Id).subscribe(data => {
        if(data){
          this.userService.currentUser[type]= type == 'Phone'?this.carsService.checkStr(value,'phone'):value;
          localStorage.setItem('currentUser', JSON.stringify(this.userService.currentUser));
        }
        console.log(data);
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
  addAdmin(user, isAdmin){
    this.userService.SetAdmin(user.Id, isAdmin).subscribe(data => {
      user.IsAdmin = isAdmin;
     
    })
  }
  FindUsers(name){
    this.findUsers = this.setPages(this.users.filter(
      x => ((x.Name.toUpperCase().indexOf(name.toUpperCase())>-1
      || x.Id == name
      || x.Email.toUpperCase().indexOf(name.toUpperCase())>-1)
      && x.Id!=this.userService.currentUser.Id)));
  }
  
  setPages(items, n = 10){
    let pagedItems = [];
    while(items.length>0){
        pagedItems.push(items.splice(0,n));
    }
    return pagedItems;
  }

  checkChange(b:Book){
    b.DateStart = new Date(b.DateStart);
    b.DateFinish = new Date(b.DateFinish);
    console.log(b.DateStart);
    console.log(this.changeDate)
    return b.DateStart>this.changeDate;
  }

  checkDelete(b:Book){
    b.DateStart = new Date(b.DateStart);
    b.DateFinish = new Date(b.DateFinish);
    return b.DateStart>this.deleteDate;
  }

  cancel(b:Book){
    if(confirm("Вы уверены, что хотите удалить бронь?")){
      this.carsService.DeleteBook(b.Id).subscribe((d)=> {
        console.log(d);
        this.userService.currentUser.Books.splice(this.userService.currentUser.Books.findIndex(x => x.Id == b.Id), 1);
        this.userService.Save();
      })
    }
  }
  

}
