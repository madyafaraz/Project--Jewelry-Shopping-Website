import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about/about.component';
import { ContactComponent } from './component/contact/contact.component';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { AdminComponent } from './component/admin/admin.component';
import { ProductAddEditComponent } from './component/product-add-edit/product-add-edit.component';
import { ProductDeleteComponent } from './component/product-delete/product-delete.component';
import { OrderAddEditComponent } from './component/order-add-edit/order-add-edit.component';
import { AdminOrdersListComponent } from './component/admin/admin-orders-list/admin-orders-list.component';


const routes: Routes = [
	{ path: '',   redirectTo: '/home', pathMatch: 'full'},
	{ path: 'home',     component: HomeComponent },
	{ path: 'product-list',     component: ProductListComponent},
	{ path: 'about',     component: AboutComponent },
	{ path: 'contact',     component: ContactComponent },
	{ path: 'cart',     component: CartComponent },
	{ path: 'checkout',     component: CheckoutComponent },
	{ path: 'order-list',     component: OrderListComponent },
	{ path: 'order-list/:id',     component: OrderListComponent },
	{ path: 'admin',     component: AdminComponent,
	children: [
		{ path: 'edit/:id', component: ProductAddEditComponent },
		{ path: 'delete/:id', component: ProductDeleteComponent },
		{ path: 'add', component: ProductAddEditComponent },
		{ path: 'admin-orders-list', component: AdminOrdersListComponent },
		{ path: 'admin-orders-list/:id', component: AdminOrdersListComponent },
		{ path: 'customers', component: ProductAddEditComponent },
		{ path: 'products', component: ProductAddEditComponent }
	   ]

	},


];


@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }
