import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductListComponent } from './component/product-list/product-list.component';
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ContactComponent } from './component/contact/contact.component';
import { AboutComponent } from './component/about/about.component';
import { AdminComponent } from './component/admin/admin.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { ImageFilterPipe } from './shared/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ProductAddEditComponent } from './component/product-add-edit/product-add-edit.component';
import { OrderAddEditComponent } from './component/order-add-edit/order-add-edit.component';
import { ProductDeleteComponent } from './component/product-delete/product-delete.component';
import { AdminOrdersListComponent } from './component/admin/admin-orders-list/admin-orders-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent,
    ContactComponent,
    AboutComponent,
    AdminComponent,
	OrderListComponent,
	ImageFilterPipe,
	ProductAddEditComponent,
	OrderAddEditComponent,
	ProductDeleteComponent,
	AdminOrdersListComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule
  ],
  providers: [ImageFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
