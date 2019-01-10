import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  search:Search = new Search();
  constructor(private formBuilder: FormBuilder){

  }
  get f() { return this.searchForm.controls; }
  ngOnInit(){
    this.searchForm = this.formBuilder.group({
      Pick: ['', Validators.required],
      Drop: ['', Validators.required]     
    });
  }
}

export class Search{
  Pick:string;
  Drop:string;
  DateStart:Date;
  DateFinish:Date;
}
