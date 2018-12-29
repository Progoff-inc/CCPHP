import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { CarsComponent } from './cars/cars.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './services/UserService';
import { AlertComponent } from './alert/alert.component';
import { CarsService } from './services/CarsService';
import { LoaderComponent } from './loader/loader.component';
import { CarCardComponent } from './car-card/car-card.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { AlertService } from './services/AlertService';
import { FeedbackComponent } from './feedback/feedback.component';
import { PagesComponent } from './pages/pages.component';
import { FeedBackService } from './services/FeedBackService';
import { MessagerService } from './services/MessagerService';
import { RatingComponent } from './rating/rating.component';
import { PickerComponent } from './picker/picker.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { RentalPolicyComponent } from './rental-policy/rental-policy.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AboutCreteComponent } from './about-crete/about-crete.component';
import { FooterComponent } from './footer/footer.component';
import { MessagerComponent } from './messager/messager.component';
import { SalesComponent } from './sales/sales.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import {TranslateService} from '@ngx-translate/core';
import { SameCarsComponent } from './same-cars/same-cars.component';
import { PhotoViewerComponent } from './photo-viewer/photo-viewer.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
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
    StatisticsComponent,
    RentalPolicyComponent,
    ContactsComponent,
    AboutCreteComponent,
    FooterComponent,
    MessagerComponent,
    SalesComponent,
    DatePickerComponent,
    SameCarsComponent,
    PhotoViewerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        // можно указать свой путь к папке i18n где находятся файлы с переводом
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }), 
    
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'allcars', component: CarsComponent },
      { path: 'booking/:id', component: BookingFormComponent },
      { path: 'feedback', component:FeedbackComponent},
      { path: 'user', component: UserProfileComponent},
      { path: 'policy', component: RentalPolicyComponent},
      { path: 'contacts', component: ContactsComponent},
      { path: 'about', component: AboutCreteComponent},
    ],{ useHash: true})
  ],
  providers: [TranslateService, UserService, CarsService, AlertService, FeedBackService, MessagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
