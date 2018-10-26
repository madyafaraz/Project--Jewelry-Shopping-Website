import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Product } from '../../services/product';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

	products: Product[];
	searchTerm: string ='';
	searchedProducts : Product[] =[];
	//allProducts : Product[] =[];
	notShow: boolean = false;
	constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {

	this.products = this.productService.getProducts();
	if(this.products.length > 0 || this.products != null) {
		 this.products = this.products;
	} else {
		//this.notShow = true;
	}


  }

   addToCart(data: Product, ID: number){
	//increment id so that the first id starts from 1 and not zero.
	 let id = ID+1;
     this.productService.addProductToCart(data, id);
	 this.router.navigate(['cart']);
  }

  getItems(term: string){

	this.searchedProducts = this.productService.getProducts();
	if(this.searchedProducts.length > 0 || this.searchedProducts != null) {
		//this.show = true;
		this.products = this.searchedProducts;
		console.log(this.products);
		console.log('only showing searched products');
   } else {
	   this.notShow = true;
	   console.log(this.products + 'value of not show is : '+this.notShow);

   }
  }

}
