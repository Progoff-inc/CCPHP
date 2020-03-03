import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { CarsComponent } from "./cars/cars.component";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { UserFormComponent } from "./user-form/user-form.component";
import { UserService } from "./services/UserService";
import { AlertComponent } from "./alert/alert.component";
import { CarsService } from "./services/CarsService";
import { LoaderComponent } from "./loader/loader.component";
import { CarCardComponent } from "./car-card/car-card.component";
import { BookingFormComponent } from "./booking-form/booking-form.component";
import { AlertService } from "./services/AlertService";
import { FeedbackComponent } from "./feedback/feedback.component";
import { PagesComponent } from "./pages/pages.component";
import { FeedBackService } from "./services/FeedBackService";
import { MessagerService } from "./services/MessagerService";
import { RatingComponent } from "./rating/rating.component";
import { PickerComponent } from "./picker/picker.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { RentalPolicyComponent } from "./rental-policy/rental-policy.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { AboutCreteComponent } from "./about-crete/about-crete.component";
import { FooterComponent } from "./footer/footer.component";
import { DatePickerComponent } from "./date-picker/date-picker.component";
import { TranslateService } from "@ngx-translate/core";
import { SameCarsComponent } from "./same-cars/same-cars.component";
import { PhotoViewerComponent } from "./photo-viewer/photo-viewer.component";
import { AddComponent } from "./add/add.component";
import { LoadComponent } from "./load/load.component";
import { LoadService } from "./services/load.service";
import { ChangeBookComponent } from "./change-book/change-book.component";
import { InputDatepickerRangeComponent } from "./input-datepicker-range/input-datepicker-range.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "../assets/i18n/", ".json");
}
export function HttpLoaderFactory1(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    CarsComponent,
    UserFormComponent,
    AlertComponent,
    LoaderComponent,
    CarCardComponent,
    BookingFormComponent,
    FeedbackComponent,
    PagesComponent,
    RatingComponent,
    PickerComponent,
    UserProfileComponent,
    RentalPolicyComponent,
    ContactsComponent,
    AboutCreteComponent,
    FooterComponent,
    DatePickerComponent,
    SameCarsComponent,
    PhotoViewerComponent,
    AddComponent,
    LoadComponent,
    ChangeBookComponent,
    InputDatepickerRangeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        // можно указать свой путь к папке i18n где находятся файлы с переводом
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    FormsModule,
    RouterModule.forRoot(
      [
        {
          path: "",
          component: HomeComponent,
          pathMatch: "full",
          data: {
            title:
              "Cheap Rent a car Crete / Car Hire in Crete with CAR4CRETE / Heraklion / Rethymnon / Chania ",
            description: "Rent a car in Crete /Full insurance against all risks 100% no excess/ Free delivery at airport Heraklion and oll ower Crete",
            keywords: "rent a car crete, rent a car heraklion, rent a car Rethymnon, rent a car Chania, crete car hire, rent a car heraklion crete, rent a car heraklion airport crete, rent a car heraklion port, rent a car heraklion greece, car rental in Crete Heraklion Airport "
          }
        },
        {
          path: "allcars",
          component: CarsComponent,
          data: {
            title:
              "Car Hire in Heraklion airport Crete / Сhoose your car model with CAR4CRETE",
            description: "Crete: Rent cars of different brands, horsepower and configuration to adapt to your needs whether you are travelling as a couple, family or a group of friends",
            keywords: "Hire car heraklion airport, Hire cars crete - heraklion airport, Best car hire heraklion airport, Cheap car hire crete heraklion airport, Hire a car in Crete, Car hire in crete greece, Car hire in crete hersonissos, Car hire in crete airport"
          }
        },
        { path: "booking/:id", component: BookingFormComponent },
        { path: "change-book/:id", component: ChangeBookComponent },
        {
          path: "feedback",
          component: FeedbackComponent,
          data: {
            title:
              "Car hire Crete reviews ",
            description: "Rent a car in Crete with CAR4CRETE - best cars for holiday! Local rental company with new cars, good price and friendly staff.",
            keywords: "Hire car heraklion airport reviews, Hire cars crete - heraklion airport reviews, Best car hire heraklion airport reviews, Cheap car hire crete heraklion airport reviews, Car hire heraklion airport reviews, Hire a car in Crete reviews, Car hire in crete greece reviews, Car hire in crete hersonissos reviews, Car hire in crete airport reviews, Car hire in crete heraklion reviews"
          }
        },
        { path: "user", component: UserProfileComponent },
        { path: "policy", component: RentalPolicyComponent },
        {
          path: "contacts",
          component: ContactsComponent,
          data: {
            title:
              "Car rental company in Crete - CAR4CRETE",
            description: "Booking a car in Crete with CAR4CRETE is very easy. Write online chat, call on telephone or Whats up, mail us. Rent a car Heraklion airport Crete, rent a car Heraklion port Crete. We are in touch 24/7.+30 69 4936 7278 info@carcrete24.com ",
            keywords: "Rent a car heraklion crete, rent a car heraklion airport crete, rent a car heraklion port, rent a car heraklion greece, car rental in Crete Heraklion Airport / rent a car deals with CAR4CRETE"
          }
        },
        {
          path: "about",
          component: AboutCreteComponent,
          data: {
            title:
              "What to see in Crete",
            description: "Holiday in Crete with car",
            keywords: "Crete car rental, Crete car hire"
          }
        },
        { path: "add", component: AddComponent }
      ],
      { useHash: true }
    )
  ],
  providers: [
    TranslateService,
    UserService,
    CarsService,
    AlertService,
    FeedBackService,
    MessagerService,
    HttpClient,
    LoadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
