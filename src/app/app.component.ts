import { Component, OnInit, HostListener  } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';
import {MyTranslateService} from './services/MyTranslateService';
import {CarsService, Book} from './services/CarsService'
import { UserService } from './services/UserService';
import { LoadService } from './services/load.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'CAR4CRETE';
  showMes:boolean = true;
  CarId:number=0;
  service:MyTranslateService ;
  showButtonUp:boolean = false;
  showSameCars:boolean = false;
  user = null;
  constructor(private router:Router, private translate: TranslateService, private ls:LoadService, public us:UserService, private s:CarsService){
    this.service = new MyTranslateService(translate);
    
  }
  @HostListener('document:scroll', [])
    onScroll(): void {
         if(window.pageYOffset>500){
           this.showButtonUp = true;
         }
         else{
          this.showButtonUp = false;
         }
    }

  ngOnInit(){
    if(localStorage.getItem("currentUser")){
      this.us.GetUser({Email:JSON.parse(localStorage.getItem("currentUser")).Email, Password:JSON.parse(localStorage.getItem("currentUser")).Password}).subscribe(user => {
        this.us.Token=user[1];
        this.us.currentUser=user[0];
        if(this.us.currentUser.Lang){
          if(!sessionStorage.getItem('curLang')){
            sessionStorage.setItem('curLang', this.us.currentUser.Lang=="RU"?'ru':'en');
            this.service.changeLang(this.us.currentUser.Lang=="RU"?'ru':'en');
          }else{
            this.service.changeLang(sessionStorage.getItem('curLang'));

          }
          
          
  
        }
        this.ls.showLoad = false;
      })
      
      
    }
    window.scrollTo(0, 0);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      if(evt.url=='/user'){
        this.showMes=false;
      }
      else{
        this.showMes=true;
      }
      if(evt.url.indexOf('booking')>-1){
        this.showSameCars=true;
        this.CarId=Number(evt.url.split('/')[2].split('?')[0]);
      }
      else{
        this.showSameCars=false;
      }
      window.scrollTo(0, 0)
     });
  }
  scroll(){
    window.scrollTo(0, 0);
  }
  test(){
    this.s.BookCar({Id:23, Date: new Date(), Place:'Iraklion'}).subscribe(d => {
    });
  }

  get curUser() {return localStorage.getItem('currentUser')};
}
