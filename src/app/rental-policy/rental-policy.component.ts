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
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Полный отказ от повреждений при столкновении с нулевым избытком (FDW & WUG)",
      Description: "Арендатор застрахованного не обязан доплачивать за ущерб, причиненный дну автомобиля, стеклу, шинам и двигателю. Это может также упоминаться как super collision damage waiver (SCDW) или full damage insurance (CDW) или wheel, bottom and glass insurance (GWP).",
      NameEng: "Full collision damage waiver with ZERO EXCESS (FDW & WUG)",
      DescriptionEng: "The renter is insured for damages caused to the underside of the vehicle, glass, tires and engine with no obligation to pay any excess. It may also be referred as Super Collision damage waiver (SCDW) or Full collision damage waiver (FCDW) or Wheels under side and glass insurance (WUG).",
    },
    {
      Name: "Защита от кражи с нулевым превышением (TP)",
      Description: "Арендатор застрахован на случай угона автомобиля, за исключением случаев, когда угон происходит по неосторожности. Любые украденные вещи в салоне автомобиля (например. камеры, дорожные сумки или мобильные телефоны) не покрываются какой-либо страховкой.",
      NameEng: "Theft Protection with ZERO EXCESS (TP)",
      DescriptionEng: "The renter is insured in case the vehicle is stolen, except if theft occurs because of negligence. Any stolen belongings in the interior of the car (eg. cameras, travel bags or cell-phones) are not covered by any insurance.",
    },
    {
      Name: "Страхование гражданской ответственности (PL)",
      Description: "Ответственность арендатора распространяется до €1.000.000 за смерть и телесные повреждения и €1.000.000 за материальный ущерб. Может также именоваться PLI.",
      NameEng: "Public Liability Insurance (PL)",
      DescriptionEng: "The renter’s liability is covered to a maximum of €1.000.000 for death and bodily injuries and €1.000.000 for material damages. May also referred as PLI.",
    },
    {
      Name: "Страхование от несчастных случаев (PAI)",
      Description: "Пассажиры автомобиля застрахованы в случае смерти или телесных повреждений в случае аварии максимум €1.000.000. Водитель застрахован на сумму €15.000.",
      NameEng: "Personal accident insurance (PAI)",
      DescriptionEng: "Passengers of the rental vehicle are insured for death or bodily injuries in case of accident to a maximum of €1.000.000. Driver is insured to the amount of €15.000.",
    }
  ];

  conditions: Condition[] = [
    {
      Name: "Age.",
      Description: "The drivers must be a minimum of 21 years of age for car categories A,B,23 for C, C1, D, D1, K, K1, K2 and 25 for the rest.",
      NameEng: "Age",
      DescriptionEng: "The drivers must be a minimum of 21 years of age for car categories A, B, 23 for C, C1, D, D1, K, K1, K2 and 25 for the rest.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
    },
    {
      Name: "Отказ от повреждений при столкновении с нулевым избытком (CDW).",
      Description: "Арендатор застрахован на/от аренду автомобиля, поврежденного в результате аварии без обязательств по уплате !сверхплаты!",
      NameEng: "Collision damage waiver with ZERO EXCESS (CDW)",
      DescriptionEng: "The renter is insured for the rental vehicle damaged by accident with no obligation to pay any excess.",
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
