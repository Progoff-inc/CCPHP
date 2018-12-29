import { Component, Input, OnInit } from '@angular/core';
import {MyTranslateService} from '../services/MyTranslateService';
import {UserService} from '../services/UserService';
import { AlertService } from '../services/AlertService';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  @Input() service: MyTranslateService;
 
  alertService:AlertService = new AlertService();
  isExpanded = false;
  constructor(public userService:UserService){
    
  }

  collapse() {
    this.isExpanded = false;
  }
  Exit(){
    this.userService.currentUser=null;
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem('curLang')
    location.reload();
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  changePage(page:string){
    
  }
  ngOnInit(){
    if(localStorage.getItem("currentUser")){
      this.userService.currentUser=JSON.parse(localStorage.getItem("currentUser"));
      if(this.userService.currentUser.Lang){

        this.service.changeLang(this.userService.currentUser.Lang=="RU"?'ru':'en');
        

      }
    }
  }
}
