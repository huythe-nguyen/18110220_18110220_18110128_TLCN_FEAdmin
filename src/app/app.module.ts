import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { SalesComponent } from './sales/sales.component';
import { BrandsComponent } from './brands/brands.component';
import { AddBrandsComponent } from './brands/add-brands/add-brands.component';
import { EditBrandsComponent } from './brands/edit-brands/edit-brands.component';
import { DataService } from './services/data.service';
import { RestApiService } from './services/rest-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { NewsComponent } from './news/news.component';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { EditNewsComponent } from './news/edit-news/edit-news.component';
import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';

import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { firebase } from "./environments/environment";
import { ImageComponent } from './image/image.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponentTest } from './dashboard/dashboardtest.component';
import { DetailProfileComponent } from './profile/detail-profile/detail-profile.component';
import { EditOderComponent } from './home/edit-oder/edit-oder.component';
import { DetailCartComponent } from './sales/detail-cart/detail-cart.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { EditDeliveryComponent } from './delivery/edit-delivery/edit-delivery.component';
import { FirebaseService } from './services/firebase.service';
import { CancelComponent } from './cancels/cancel.component';
import { DetailCancelComponent } from './cancels/detail-cancel/detail-oder.component';
import { SuceessComponent } from './order-suceess/suceess.component';
import { DetailSuceessComponent } from './order-suceess/detail-Suceess/detail-oder.component';
import { DiscountComponent } from './discount/discount.component';
import { AddDiscountComponent } from './discount/add-discount/add-discount.component';
import { EditDiscountComponent } from './discount/edit-discount/edit-discount.component';
import { MyCkEditorComponent } from './my-ck-editor/my-ck-editor.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BlogComponent } from './Blog/blog.component';
import { EditBlogComponent } from './Blog/edit-oder/edit-blog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    SidenavComponent,
    SalesComponent,
    BrandsComponent,
    AddBrandsComponent,
    EditBrandsComponent,
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    NewsComponent,
    AddNewsComponent,
    EditNewsComponent,
    LoginComponent,
    DashboardComponentTest,
    ImageComponent,
    DetailProfileComponent,
    EditOderComponent,
    DetailCartComponent,
    DeliveryComponent,
    MessageComponent,
    EditDeliveryComponent,
    CancelComponent,
    DetailCancelComponent,
    SuceessComponent,
    DetailSuceessComponent,
    DiscountComponent,
    AddDiscountComponent,
    EditDiscountComponent,
    MyCkEditorComponent,
    BlogComponent,
    EditBlogComponent

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatNativeDateModule,
    MatSliderModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule,
    CommonModule,
    IonicModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    CKEditorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [RestApiService,DataService,FirebaseService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
