import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'rental-policy',
  templateUrl: './rental-policy.component.html',
  styleUrls: ['./rental-policy.component.css']
})
export class RentalPolicyComponent implements OnInit {
  items: Rules[] = [
    {
      Name: "Book specific car, not category",
      Description: "What car model you choose - you will take on arrival.",
      NameEng: "Book specific car, not category",
      DescriptionEng: "What car model you choose - you will take on arrival.",
    },
    {
      Name: "No Prepayment on site",
      Description: "Reservation is free and no prepayment on the website is necessary. The payment is carried out after the contract is signed. We accept payments with cash, Visa/Master credit cards.",
      NameEng: "No Prepayment on site",
      DescriptionEng: "Reservation is free and no prepayment on the website is necessary. The payment is carried out after the contract is signed. We accept payments with cash, Visa/Master credit cards.",
    },
    {
      Name: "Free Cancellation",
      Description: "Becase we do not take eny deposit for booking car, be responsible to tell us for cansellation 5 days before arrival date.",
      NameEng: "Free Cancellation",
      DescriptionEng: "Becase we do not take eny deposit for booking car, be responsible to tell us for cansellation 5 days before arrival date.",
    },
    {
      Name: "Final price & NO Extra payment",
      Description: "You see the FINAL car rental price with our company. No hidden taxes and extra insuranses. Our rates include 24% VAT, Full Insurance, unlimited Mileage, 24 hours road Assistance all over Crete.",
      NameEng: "Final price & NO Extra payment",
      DescriptionEng: "You see the FINAL car rental price with our company. No hidden taxes and extra insuranses. Our rates include 24% VAT, Full Insurance, unlimited Mileage, 24 hours road Assistance all over Crete.",
    },
    {
      Name: "Full Insurance without EXCESS",
      Description: "<div ><ul class='d-block' ><li>Full coverage insurance (FCDW)</li><li>Personal accident insurance (PAI)</li><li>Theft & Fire insurance</li><li>Liability Insurance (LI)</li></ul></div>",
      NameEng: "Full Insurance without EXCESS",
      DescriptionEng: "Full coverage insurance (FCDW)<br>Personal accident insurance (PAI)<br>Theft & Fire insurance<br>Liability Insurance (LI)",
    }
  ];

  conditions: Condition[] = [
    {
      Name: "Unlimited Mileage",
      Description: "No extra charge for kilometers driven",
      NameEng: "Unlimited Mileage",
      DescriptionEng: "No extra charge for kilometers driven",
    },
    {
      Name: "Detailed Crete map and navigator",
      Description: "Crete Map comes with each rental car for free. GPS will cost 5 euros per day.",
      NameEng: "Detailed Crete map and navigator",
      DescriptionEng: "Crete Map comes with each rental car for free. GPS will cost 5 euros per day.",
    },
    {
      Name: "Child / Baby Seat",
      Description: "One child seat or booster for free. Additional seats will cost 2 euros a day each.",
      NameEng: "Child / Baby Seat",
      DescriptionEng: "One child seat or booster for free. Additional seats will cost 2 euros a day each.",
    },
    {
      Name: "Fuel policy",
      Description: "There are two possibilities. 1 You return the car with the same amount of fuel as received. 2 For an additional fee, we can bring a car with a full tank, you return it empty.",
      NameEng: "Fuel policy",
      DescriptionEng: "There are two possibilities. 1 You return the car with the same amount of fuel as received. 2 For an additional fee, we can bring a car with a full tank, you return it empty.",
    },
    {
      Name: "Additional Drivers",
      Description: "Additional driver free of charge.",
      NameEng: "Additional Drivers",
      DescriptionEng: "Additional driver free of charge.",
    },
    {
      Name: "No additional charges on flight delays",
      Description: "Be sure that we will wait for your arrival even if the plane is delayed at no extra charge. Usually we monitor the arrival of the aircraft online.",
      NameEng: "No additional charges on flight delays",
      DescriptionEng: "Be sure that we will wait for your arrival even if the plane is delayed at no extra charge. Usually we monitor the arrival of the aircraft online.",
    }
    
  ];

  constructor(public Translate:TranslateService) { }

  ngOnInit() {
  }

}

export interface Rules {
  Name: string;
  Description: string;
  NameEng: string;
  DescriptionEng: string;
}

export interface Condition {
  Name: string;
  Description: string;
  NameEng: string;
  DescriptionEng: string;
}
