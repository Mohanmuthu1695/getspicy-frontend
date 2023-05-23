import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidemenuComponent } from './cafe/sidemenu/sidemenu.component';
import { HomepageComponent } from './cafe/homepage/homepage.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './cage/signup/signup.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxUiLoaderModule,NgxUiLoaderConfig,SPINNER,PB_DIRECTION } from 'ngx-ui-loader';
import { ReactiveFormsModule,FormsModule,NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ForgotpasswordComponent } from './cafe/forgotpassword/forgotpassword.component';
import { LoginComponent } from './cafe/login/login.component';
import { DashboardComponent } from './cafe/dashboard/dashboard.component';
import { TokenInterceptor } from './token.interceptor';
import { LogoutComponent } from './cafe/logout/logout.component';
import { CategoryComponent } from './cafe/category/category.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { AddcategoryComponent } from './cafe/addcategory/addcategory.component';
import { EditcategoryComponent } from './cafe/editcategory/editcategory.component';
import { ProductMComponent } from './cafe/product-m/product-m.component';
import { AddProductComponent } from './cafe/add-product/add-product.component';
import { UpdateProductComponent } from './cafe/update-product/update-product.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ManageUserComponent } from './cafe/manage-user/manage-user.component';
import { ReportComponent } from './cafe/report/report.component';
import { BillComponent } from './cafe/bill/bill.component';
import { FileSaverOptions } from 'file-saver';
import { saveAs } from 'file-saver';
import { ViewBillProductComponent } from './cafe/view-bill-product/view-bill-product.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#FFFF00', // Set the color of the foreground spinner
  bgsColor: '#EEEEEE', // Set the color of the background spinner
  pbColor: '#FFFF00', // Set the color of the progress bar
  fgsType: SPINNER.rectangleBounce, // Set the type of spinner (e.g., rectangleBounce, ballBeat, etc.)
  fgsPosition:'center-center',
  pbDirection: PB_DIRECTION.leftToRight, // Set the direction of the progress bar animation
  text: 'Loading...', // Set the text displayed with the spinner
  textColor: '#FFFFFF', // Set the color of the text
  overlayColor: 'rgba(0, 0, 0, 0.7)', // Set the color and transparency of the overlay
  hasProgressBar: true, // Enable or disable the progress bar
  minTime: 0, // Set the minimum time the loader should be displayed before hiding it (in milliseconds)
  maxTime: 0, // Set the maximum time the loader should be displayed before automatically hiding it (in milliseconds)
};

@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    HomepageComponent,
    SignupComponent,
    ForgotpasswordComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    CategoryComponent,
    AddcategoryComponent,
    EditcategoryComponent,
    ProductMComponent,
    AddProductComponent,
    UpdateProductComponent,
    ManageUserComponent,
    ReportComponent,
    BillComponent,
    ViewBillProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule
    
 
  ],
  providers: [HttpClientModule,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
