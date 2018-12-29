export class AlertService{
    alert:message;
    showAlert:boolean;
    timer:any;
    showA(alert:message){
        if(this.alert == undefined || this.alert.show==false){
            
            this.alert=alert;
            this.timer = setTimeout(()=>{
                this.hide();},2000);
        }
        else{
            this.hide();
            
            this.alert=alert;
            this.timer = setTimeout(()=>{
                this.hide();},2000);

        }
        this.showAlert=true;
        
    }
    hide(){
        clearTimeout(this.timer);
        this.alert.show= false;
    }
}

interface message{
    type:string;
    message:string;
    show:boolean;
  }