import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/services/product';
import { Router, ActivatedRoute } from '@angular/router';
import {ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

	product: Product;

  constructor(private route: ActivatedRoute,
	private router: Router,
	private productService: ProductService) { }

  ngOnInit() {
	let id = this.route.snapshot.params['id'];
	if (id) {
	  this.product = this.productService.getProductById(id);
	  if (this.product == undefined)
		  this.router.navigate(['admin']);
  } else {
	  this.router.navigate(['/']);
	  }
  }

  deleteProduct() {
	if (this.product) {
		this.productService.deleteProduct(this.product.id);
		this.router.navigate(['admin']);
	}
}

}
