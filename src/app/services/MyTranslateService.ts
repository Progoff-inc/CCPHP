import {TranslateService} from '@ngx-translate/core';

export class MyTranslateService {
    lang:string;
    constructor(private translate: TranslateService){
        if(sessionStorage.getItem('curLang')){
            let l = sessionStorage.getItem('curLang')
            this.translate.setDefaultLang(l);
            this.changeLang(l);
        }
        else{
            this.translate.setDefaultLang('ru');
            this.changeLang('ru');
        }
        
      }
  
    changeLang(lang:string){
        sessionStorage.setItem('curLang',lang);
        this.lang=lang;
        this.translate.use(lang);
     
       
    }
  }