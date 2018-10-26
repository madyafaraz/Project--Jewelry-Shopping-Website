import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/services/product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	 products: Product[];
	 ShowAdminNav: string ;

  constructor(private productService: ProductService) {


   }

  ngOnInit() {
	this.ShowAdminNav = 'true';

	this.products = this.productService.getProducts();
	console.log("this is admin products list");
    console.log(this.products);
	   //this.productService.getProductsFromServer()
		  //.subscribe(data => this.products = data);


  }

}
