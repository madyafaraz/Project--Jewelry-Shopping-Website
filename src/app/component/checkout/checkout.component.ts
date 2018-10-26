import { Component, OnInit } from '@angular/core';
import { Product } from '../../services/product';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Orders } from '../../services/orders';
import { Orderlist } from '../../services/orderlist';
import { FormBuilder, FormGroup,FormControl, NgForm } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';
import { renderStyling } from '@angular/core/src/render3/styling';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

	stateInvalid: boolean = true;
	states: Array<any> = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
	orders : Orders;
	orderlist: Orderlist[];
	customerID: number = 1;
	cartItems: Array<any> =[];
	orderID : string = '';
	userForm: NgForm;
	newOrder :boolean = false;

constructor(private checkoutService: CheckoutService, private router: Router, private route: ActivatedRoute, fb: FormBuilder) { }

  ngOnInit() {
	  this.orders = new Orders();
	 // console.log(this.orders);


  }


  validateState(value){
   if(value === 'default'){
	   this.stateInvalid = true;
   } else{
	   this.stateInvalid = false;
   }
  }

  onSubmit(myForm : NgForm){

	//generate an order number for this current item as key
	this.orderID = Math.random().toString(36).substr(2, 9).toUpperCase();

	//get the items list for the cart in orders list array
	let result1: boolean = this.checkoutService.createOrderItemsArray(this.orderID);

	//now save the order and its items details in orders array
	let orderData = myForm.value;
	let result2: boolean = this.checkoutService.saveOrder(orderData, this.customerID, this.orderID);

	//check if order is successfully placed
	if(result1 === true && result2 == true) {
		// clear the webstorage
		window.localStorage.clear();

		//set newOrder variable to true
		this.newOrder = true;
        //redirect user to orders page after successful completion
	    this.router.navigate(['order-list', this.orderID]);

	}

	else{
		console.log("Order can not be placed rightnow");
	}

  }


}
