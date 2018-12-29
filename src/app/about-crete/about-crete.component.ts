import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'about-crete',
  templateUrl: './about-crete.component.html',
  styleUrls: ['./about-crete.component.css']
})
export class AboutCreteComponent implements OnInit {
  items:About[]=[
    {
      Name: "KOURNAS_LAKE",
      DescriptionEng: "The main attraction of Crete is the breathtaking scenery that relaxes and appeases. No matter what time of year you come, lake Kurna is equally beautiful, and even in winter you can enjoy the wonderful views of the snow-covered majestic mountains reflected in the clear waters.",
      Description2Eng: "You will find an equipped beach with sun loungers and parasols, changing cabins. Striking variety of swaying on the waves of catamarans. They are presented in several versions: two - and four-seater, stylized retro cars and designs with a slide, where it is so nice to slide into warm water. Some ships have a sunshade to protect them from the sun. Many tourists go away from human eyes to be alone with each other and plenty to swim, because next to the shore to make it difficult because of the large number of tourists.",
      RoadEng: "It is necessary to go to the East on the route E75, and in 40 kilometers the small town of Georgioupolis near which there is a sight will seem.",
      Description:"Главная достопримечательность Крита изумляет восхитительным пейзажем, который расслабляет и умиротворяет. В какое время года вы бы ни приехали, озеро Курна одинаково прекрасно, и даже зимой можно наслаждаться чудесными видами покрытых снегом величественных гор, отражающихся в прозрачных водаx.",
      Description2:"Вас ждет оборудованный пляж с шезлонгами и зонтиками, кабинками для переодевания. Поражает разнообразие покачивающихся на волнах катамаранов. Они представлены в нескольких модификациях: двух- и четырехместные, стилизованные под ретромобили и конструкции с горкой, откуда так приятно скатиться в теплую воду. На некоторых суднах имеется навес, защищающий от солнечных лучей. Многие туристы отправляются подальше от людских глаз, чтобы побыть наедине друг с другом и вволю поплавать, поскольку рядом с берегом сделать это сложно из-за большого количества отдыхающих.",
      Road:"Ехать придется на восток по трассе Е75, и через 40 километров покажется небольшой городок Георгиуполи, рядом с которым находится достопримечательность.",
      Rating:4.5,
      Img:"../../assets/images/lake.jpg"
      
    },
    {
      Name: "BALI_VILLAGE",
      DescriptionEng: "Bali is a Greek resort / village / village located in the North of the island of Crete, approximately in the middle between Heraklion and Rethymno. The resort is attractive for lovers of relaxing holidays and couples with children. But the young people here will be bored, as a little nightlife. The town is very popular with Russian tourists and if you come alone, you will always find a company of compatriots.",
      Description2Eng: "The resort has 4 beaches and a few small semi-wild areas of the coast and bays. The beaches are both sandy and pebbly. All are equipped with sun loungers, showers, toilets, etc.There are water activities, including diving, Canoeing, fishing.",
      RoadEng: "The resort is 45 km from Heraklion airport. From there, you can get to Bali on a budget bus, but you will have to change at the bus station of Heraklion, because there is no direct connection. Buses run every hour.",
      Description:"Бали - греческий курорт/деревня/поселок, расположенный на севере острова Крит, примерно посередине между Ираклионом и Ретимно. Курорт привлекателен для любителей спокойного отдыха и семейных пар с детьми. А вот молодежи тут будет скучно, так как ночных развлечений немного. Городок очень популярен у русских туристов и если вы приехали один, то всегда найдете себе компанию соотечественников.",
      Description2:"На курорте имеется сразу 4 пляжа и еще несколько небольших полудиких участков побережья и бухт. Пляжи есть как песчаные, так и галечные. Все оборудованы шезлонгами, душевыми, туалетами и т.п. Имеются водные развлечения, в том числе дайвинг, прокат каноэ, рыбалка.",
      Road:"Курорт расположен в 45 км от аэропорта Ираклиона. Оттуда бюджетно можно добраться до Бали на автобусе, но придется сделать пересадку на автовокзале Ираклиона, поскольку прямого сообщения нет. Автобусы ходят раз в час.",
      Rating:4,
      Img:"../../assets/images/bali.jpg"
      
    },
    {
      Name: "CHURCH_PREVELI",
      DescriptionEng: "The Holy Stavropol Patriarchal monastery of Preveli is located 33 km from the city of Rethymno, in the South of the island of Crete. The monastery of Preveli is highly revered throughout Crete for its rich past and the active participation of the monks in the national liberation struggle. The peculiarity of the Holy monastery is that it consists of two parts: the Lower Monastery of Kato Preveli in honor of John the Baptist and the Upper Monastery of Piso Preveli in honor of John the theologian and the Annunciation.",
      Description2Eng: "The monastery Museum houses about 100 rare ancient icons that once adorned the cathedrals and chapels of the upper And Lower monasteries of Preveli. The image Dating from 1600 to 1900, Among them there are icons of St. George, the Evangelist, All Saints, St. Onuphrius, of the prophet Isaiah, Melchizedek and Abraham, etc.",
      RoadEng: "Нижний Монастырь Като Превели находится в 32 км к югу от Ираклиона, а Верхний Монастырь Писо Превели расположен в 33 км к югу от Ираклиона. До Монастырей Превели можно доехать на автобусе, на такси или на арендованном автомобиле.",
      Description:"Святой Ставропигиальный Патриарший Монастырь Превели расположен в 33 км от города Ретимно, на юге острова Крит. Монастырь Превели очень почитаем на всем Крите за его богатое прошлое и активное участие монахов в национальной освободительной борьбе. Особенность святой обители состоит в том, что она состоит из двух частей: Нижний Монастырь Като Превели в честь Иоанна Крестителя и Верхний Монастырь Писо Превели в честь Иоанна Богослова и Благовещения.",
      Description2:"В монастырском музее хранится около 100 редких старинных икон, некогда украшавших соборы и часовни Верхнего и Нижнего Монастырей Превели. Образа датированы периодами с 1600 до 1900 гг. Среди них есть иконы Святого Георгия, Богослова, Всех Святых, Святого Онуфрия, пророка Исаии, Мелхиседека и Авраама  и др.",
      Road:"Нижний Монастырь Като Превели находится в 32 км к югу от Ираклиона, а Верхний Монастырь Писо Превели расположен в 33 км к югу от Ираклиона. До Монастырей Превели можно доехать на автобусе, на такси или на арендованном автомобиле.",
      Rating:4.5,
      Img:"../../assets/images/monastir.jpg"
      
    },
    {
      Name: "KNOSS_PALACE",
      DescriptionEng: "It is no exaggeration to say that the main attraction of Crete is the Palace of Knossos. It is surrounded by a halo of myths and mysteries, many famous personalities of ancient epics are somehow connected with it. See for yourself: it was built by the father of Icarus – Daedalus in the labyrinth lived the Minotaur, slain by Theseus, with the help of Princess Ariadne.",
      Description2Eng: "Currently, the Palace is the remains of ancient ruins and reconstructed buildings.",
      RoadEng: "Knossos Palace is located near the city of Heraklion, you can get there by bus from the bus station and from the fountain in Lviv square. A visit to the Palace is paid, tickets cost 15 euros. Hours of operation 8:00 - 20:00 from June to October, the operation mode in the rest of the time - 8:00 - 15:00.",
      Description:"Можно без преувеличения сказать, что главной достопримечательностью Крита является Кносский дворец. Его окружает ореол мифов и загадок, многие знаменитые личности древних эпосов так или иначе связаны с ним. Смотрите сами: его построил отец Икара – Дедал, в запутанном лабиринте жил Минотавр, убитый Тесеем, при помощи принцессы Ариадны.",
      Description2:"В настоящее время дворец представляет собой остатки древних руин и реконструированные постройки.",
      Road:"Кносский дворец находится недалеко от города Ираклион, добраться туда можно на автобусе с автовокзала и от фонтана на площади Львов. Посещение дворца платное, стоимость билетов - 15 евро. Часы работы 8:00 - 20:00 с июня по октябрь, режим работы в остальное время - 8:00 - 15:00.",
      Rating:4.5,
      Img:"../../assets/images/palace.jpg"
      
    }
  ];
  constructor(public Translate: TranslateService) { }

  ngOnInit() {
  }

}

export interface About{
  Name:string;
  Description: string;
  DescriptionEng: string;
  Description2?: string;
  Description2Eng?: string;
  Road: string;
  RoadEng: string;
  Rating:number;
  Img:string;
}
