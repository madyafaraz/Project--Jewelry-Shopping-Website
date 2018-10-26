import { Component, OnInit } from '@angular/core';
import { Orders } from '../../services/orders';
import { Orderlist } from '../../services/orderlist';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {


	orders : Orders[];
	orderlist: Orderlist[];
	customerId : number = 1;
	orderID : string ;
	emptyID: boolean = false;


  constructor(private checkoutService: CheckoutService,private router : ActivatedRoute) { }

  ngOnInit() {

   if(this.router.snapshot.paramMap.get('id') === null || this.router.snapshot.paramMap.get('id') === ''){

	  this.emptyID = true;
	  this.orders = this.checkoutService.getOrders();

   }
   else{
	this.orderID = this.router.snapshot.paramMap.get('id');
	this.emptyID = false;

   }
	  this.orders = this.checkoutService.getOrdersforCustomer(this.customerId);
	  console.log(this.orders);
      //let order = this.checkLatestOrder(this.orders);

  }



}
