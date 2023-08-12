import { NgModule } from '@angular/core';



import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AddProductComponent } from './components/add-product/add-product.component';

import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { ProductsListComponent } from './components/products-list/products-list.component';

import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';

import { HomeComponent } from './home/home.component';

import { ProfileComponent } from './profile/profile.component';

import { BoardAdminComponent } from './board-admin/board-admin.component';

import { BoardModeratorComponent } from './board-moderator/board-moderator.component';

import { BoardUserComponent } from './board-user/board-user.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ViewappointmentComponent } from './viewappointment/viewappointment.component';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';







@NgModule({

  declarations: [

    AppComponent,

    AddProductComponent,

    ProductDetailsComponent,

    ProductsListComponent,

    LoginComponent,

    RegisterComponent,

    HomeComponent,

    ProfileComponent,

    BoardAdminComponent,

    BoardModeratorComponent,

    BoardUserComponent,

    ContactComponent,

    ServicesComponent,
    
    AppointmentComponent,

    ViewappointmentComponent,
    
    AppointmentDetailsComponent

  ],

  imports: [

    BrowserModule,

    AppRoutingModule,

    FormsModule,

    HttpClientModule

  ],

  providers: [httpInterceptorProviders],

  bootstrap: [AppComponent]

})

export class AppModule { }
