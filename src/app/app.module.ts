import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CompaniesComponent } from './companies/companies.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { DetailsComponent } from './details/details.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { ContactComponent } from './contact/contact.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { ReportsComponent } from './reports/reports.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BookingsComponent } from './bookings/bookings.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material-module';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';
// import {NgxUiLoaderModule,NgxUiLoaderConfig, SPINNER,PB_DIRECTION} from 'ngx-ui-loader';

// const ngxUiLoaderConfig: NgxUiLoaderConfig = {
//   text:"Loading...",
//   textColor:"#FFFFFF",
//   textPosition:"center-center",
//   pbColor: "red",
//   bgsColor: "red",
//   fgsColor: "red",
//   fgsType: SPINNER.ballSpinClockwise,
//   fgsSize: 100,
//   pbDirection: PB_DIRECTION.leftToRight,
//   pbThickness: 5
// }

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    CompaniesComponent,
    CustomersComponent,
    ProductsComponent,
    DetailsComponent,
    BookingDetailsComponent,
    ContactComponent,
    FeedbacksComponent,
    ReportsComponent,
    NotFoundComponent,
    BookingsComponent,
    SignupComponent,
    ForgotPasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    // NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  // providers: [HttpClientModule, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true}],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
