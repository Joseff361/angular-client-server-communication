//Imports 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //The js file = component


import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from './menu/menu.component'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DishdetailComponent } from './dishdetail/dishdetail.component';

import { DishService } from '../app/services/dish.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component'; 

import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { LoginComponent } from './login/login.component';

import {MatDialogModule} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';


//Decorator: Is a function that modifies js classes
@NgModule({ // Allow you spcify some details about the module
  //Metadata
  declarations: [ //components, directives and pipes
    AppComponent, MenuComponent, DishdetailComponent, HeaderComponent, FooterComponent, HomeComponent, AboutComponent, ContactComponent, LoginComponent
  ],
  imports: [ //third party modules
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule
  ],
  providers: [DishService, PromotionService, LeaderService], //services
  bootstrap: [AppComponent],
  //The root Module doesn't have exports
  entryComponents: [
    LoginComponent
  ]
})
//Each module is a class
export class AppModule { }
