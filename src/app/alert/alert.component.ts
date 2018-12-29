import { Component, Input  } from '@angular/core';
import { timer } from 'rxjs';
import { AlertService } from '../services/AlertService';


@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() alert:AlertService;

  constructor() { }

  
  

}