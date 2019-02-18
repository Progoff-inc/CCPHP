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
      Name: "Платите за конкретный автомобиль, а не за случайный из категории",
      Description: "Какую машину Вы забронировали - такую мы Вам и выдадим по прибытии",
      NameEng: "Book specific car, not category",
      DescriptionEng: "What car model you choose - you will take on arrival",
    },
    {
      Name: "Никаких предоплат",
      Description: "Бронирование бесплатно и предоплата на сайте не требуется. Оплата осуществляется после подписания договора. Мы принимаем к оплате как наличные, так и кредитные карты Visa / Master Card",
      NameEng: "No Prepayment on site",
      DescriptionEng: "Reservation is free and no prepayment on the website is necessary. The payment is carried out after the contract is signed. We accept payments with cash, Visa/Master credit cards",
    },
    {
      Name: "Бесплатная отмена бронирования",
      Description: "Поскольку мы не берем предоплату за бронирование автомобиля, пожалуйста, сообщите нам об отмене бронирования за 5 дней до даты Вашего прибытия",
      NameEng: "Free Cancellation",
      DescriptionEng: "Becase we do not take eny deposit for booking car, be responsible to tell us for cansellation 5 days before arrival date",
    },
    {
      Name: "Единая стоимость без доплат",
      Description: "Вы видите окончательную цену проката автомобиля нашей компании. Никаких скрытых налогов и дополнительных страховок. Наши цены включают 24% НДС, полную страховку, неограниченный пробег, круглосуточную помощь на дороге по всему Криту",
      NameEng: "Final price & NO Extra payment",
      DescriptionEng: "You see the FINAL car rental price with our company. No hidden taxes and extra insuranses. Our rates include 24% VAT, Full Insurance, unlimited Mileage, 24 hours road Assistance all over Crete",
    },
    {
      Name: "Полная страховка без излишеств",
      Description: "<div ><ul class='d-block' ><li>КАСКО с полным покрытием (FCDW)</li><li>Страхование от несчастных случаев (PAI)</li><li>Страховка на случай кражи или пожара</li><li>Полис ОСАГО (LI)</li></ul></div>",
      NameEng: "Full Insurance without EXCESS",
      DescriptionEng: "Full coverage insurance (FCDW)<br>Personal accident insurance (PAI)<br>Theft & Fire insurance<br>Liability Insurance (LI)",
    }
  ];

  conditions: Condition[] = [
    {
      Name: "Неограниченный пробег",
      Description: "Никаких наценок за пройденный километраж",
      NameEng: "Unlimited Mileage",
      DescriptionEng: "No extra charge for kilometers driven",
    },
    {
      Name: "Подробная карта Крита и навигационная система",
      Description: "Карта Крита поставляется с каждым арендованным автомобилем бесплатно. За систему GPS необходимо доплачивать 5 евро в день",
      NameEng: "Detailed Crete map and navigator",
      DescriptionEng: "Crete Map comes with each rental car for free. GPS will cost 5 euros per day",
    },
    {
      Name: "Детское кресло или бустер",
      Description: "Одно детское кресло или бустер бесплатно. Дополнительные кресла/бустеры обойдутся в 2 евро в день",
      NameEng: "Child / Baby Seat",
      DescriptionEng: "One child seat or booster for free. Additional seats will cost 2 euros a day each",
    },
    {
      Name: "Топливная политика",
      Description: "Вы выбираете одно из двух решений. Либо Вы возвращаете автомобиль с тем же количеством топлива, с которым получили. Либо за дополнительную плату мы можем привезти автомобиль с полным баком, а вы возвращаете его пустым",
      NameEng: "Fuel policy",
      DescriptionEng: "There are two possibilities. 1 You return the car with the same amount of fuel as received. 2 For an additional fee, we can bring a car with a full tank, you return it empty",
    },
    {
      Name: "Второй водитель",
      Description: "Вы можете вписать в договор помимо себя ещё одного водителя бесплатно",
      NameEng: "Additional Drivers",
      DescriptionEng: "Additional driver free of charge",
    },
    {
      Name: "Никаких дополнительных сборов за задержку рейса",
      Description: "Мы не взимаем штрафы за задержку Вашего рейста, так как обычно мы отслеживаем прибытие самолета онлайн, и, в случае задержки, доставляем автомобиль к измененному времени",
      NameEng: "No additional charges on flight delays",
      DescriptionEng: "Be sure that we will wait for your arrival even if the plane is delayed at no extra charge. Usually we monitor the arrival of the aircraft online",
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
