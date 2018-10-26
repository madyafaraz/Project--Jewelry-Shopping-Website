import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs/Observable';
import { Orders} from './orders';
import { Orderlist } from './orderlist';
import { ORDERS} from './orders-data';
import { ORDERLIST } from './orderlist-data';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

   orderId :string ;
   customerId: number;

  private oItems = ORDERS;
  private olItems = ORDERLIST;
  customerID: number = 1;
  cartItems: Array<any> =[];
  orderID : string = '';


  constructor() { }


  getOrders() : Orders[] {
	  //console.log(this.oItems);
	  return this.oItems;
  }

  getOrderlist() : Orderlist[] {
	//console.log(this.olItems);
	return this.olItems;
  }

  getOrdersforCustomer(customerId) : Orders[] {

	let result = this.oItems.filter(obj => {
		return obj.customerId === customerId;
	  });
	  return result;

  }

  getDate() : string {
	var today = new Date();
	var dd : number = today.getDate();
	var mm : number = today.getMonth()+1; //January is 0!
	var yyyy :  number = today.getFullYear();


	if(dd < 10) {
		dd = Number('0'+ dd);
	}

	if(mm < 10) {
		mm = Number('0'+ mm)
	}

	let date: string = (mm + '/' + dd + '/' + yyyy).toString();
	return date;

  }

  saveOrder(order, customerId, orderId): boolean {

	if(order){

		let orderData : Orders = {
			orderNo: orderId,
			customerId: customerId,
			sAddress: order.shipAddress,
			sCity: order.sCity,
			sState: order.sState,
			sZipcode: order.sZipcode,
			bAddress:order.bAddress,
			bCity: order.bCity,
			bState: order.bState,
			bZipcode: order.bZipcode,
			cName: order.cardName,
			cNo: order.cardNumber,
			cExpiry: order.cardExpiration,
			cCCV: order.cardCCV,
			date:this.getDate(),
			status:'New'
		};
		this.oItems.push(orderData);
		console.log(this.oItems);
		return true;
	}

	else{

		return false;
	}

  }

  createOrderItemsArray(orderId): boolean {

  // now get the items from the web storage in users cart
	let storageData = window.localStorage.getItem("cart");
	if (storageData != null) {
		this.cartItems = JSON.parse(storageData);
		for(let i = 0; i < this.cartItems.length; i++){

		  let newOrderlist : Orderlist = {
			  orderNo:orderId,
			  itemID: this.cartItems[0].id,
			  itemName: this.cartItems[0].name,
	          quantity: this.cartItems[0].quantity,
			  price: this.cartItems[0].price };

		 this.olItems.push(newOrderlist);
		 console.log(this.olItems);

		}
       return true;

	} else {
		 console.log('something went wrong');
		 return false;
	}

  }
}
