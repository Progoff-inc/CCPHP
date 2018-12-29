import { Component, OnInit, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css']
})
export class PickerComponent implements OnInit, OnChanges {
  @Input() items:any;
  @Input() out:any;
  @Input() prop:string;
  @Input() PropName:string = 'Model';
  activeItem:any;
  // @Output() Picked = new EventEmitter()
  @Input() open:boolean = false;
  constructor() { }

  ngOnInit() {
    this.activeItem = undefined;
  }
  ngOnChanges(changes: SimpleChanges) {
    
    if(changes.out){ 
      if(changes.out.currentValue[this.prop]==0 || changes.out.currentValue[this.prop]==null){
        this.ngOnInit();
      }
    }
    
  }
  choose(item:any){
    this.activeItem=item;
    this.out[this.prop]=item.Id;
    this.open = !this.open;
    // this.Picked.emit(item);
  }
  openCars(){
    this.open=!this.open;
  }

}
