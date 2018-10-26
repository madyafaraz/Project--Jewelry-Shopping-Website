import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Product} from '../../services/product';
import {CheckoutService} from '../../services/checkout.service';
import {ProductService} from '../../services/product.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	cartItems: Array<any> =[] ;
	total: number;
	pData : Product[];
	pId : string;
	cartEmpty: boolean = true;

  constructor(private productService: ProductService, private checkoutService: CheckoutService, private router: Router, private route: ActivatedRoute) {

	let storageData = window.localStorage.getItem("cart");
	if (storageData != null) {
		this.cartItems = JSON.parse(storageData);
		console.log(this.cartItems);
		this.cartEmpty = false;
	} else {
		this.cartEmpty= true;
		//alert('Your cart is empty!');
	}
   }

  ngOnInit() {

  }

  removeItem(index: number) {
		this.cartItems.splice(index, 1);
        this.productService.saveItemToLocalStorage(this.cartItems);

  }


updateTotal(): number {
	this.total = 0;
  for (var i = 0; i < this.cartItems.length; i++) {
	  this.total += this.cartItems[i].quantity * this.cartItems[i].price;
	  this.productService.saveItemToLocalStorage(this.cartItems);
  }
  return this.total;

}

checkout(){

	 //this.orderID = Math.random().toString(36).substr(2, 9).toUpperCase();
	 //this.checkoutService.checkOut(this.orderID , this.customerID);
	 this.router.navigate(['checkout']);
}


}
