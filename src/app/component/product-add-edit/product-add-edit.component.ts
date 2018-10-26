import { Component, OnInit,ElementRef } from '@angular/core';
import { Product } from '../../services/product';
import { Router, ActivatedRoute } from '@angular/router';
import {ProductService } from '../../services/product.service';
import {HttpClient} from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent implements OnInit {

	product : Product;
	products: Product[];
	newProduct: Array<any>;
	title : string;
	url: string;
	selectedFile : File = null;
	pID: number ;


  constructor(private route: ActivatedRoute,
	private router: Router, private elem: ElementRef,
		private productService: ProductService, private http: HttpClient) { }

  ngOnInit() {

	let id = this.route.snapshot.params['id'];
    if (id) {
		this.title = 'Edit Product';
		this.pID = this.route.snapshot.params['id'];
        this.product = this.productService.getProductById(id);
    } else {
    	this.title = "Add Product";
		this.product = new Product();
		this.products = this.productService.getProducts();
		if(this.products.length>0){
			//check for maximum value of id in the array and add 1 to it to get the new id
		 this.product.id = Math.max.apply(Math, this.products.map(function(o) { return o.id; })) + 1;
		 console.log('max id in the array is ');
		 console.log(this.product.id);
		}
		else{
			this.product.id = 0;
		}
		}


  }

  private isComplete() {
    let p: Product = this.product;
    if (p.name && p.name.length > 0 &&
        p.price && p.price != 0 &&
        p.quantity && p.quantity != 0) {
      return true;
    } else {
      return false;
    }
  }


  SaveProduct(productForm : NgForm){

	if (this.isComplete()) {

		let productsData = productForm.value;
		//get uploaded file data
		let files = this.elem.nativeElement.querySelector('#uploadImage').files;
		let formData = new FormData();
		let file = files[0];
		formData.append('uploadFile', file, file.name);
		this.productService.uploadImage(formData).subscribe();


		//check for edit or new data
		if(this.title === 'Add Product'){
		  let result1 = this.productService.addProduct(productsData, this.product.id);
		  if(result1){
            this.router.navigate(['admin']);
			console.log('New Product Added from add edit component');
			console.log(this.products);

		  }

		  else{
			  alert('Error adding new product');
			  console.log(this.product);
		  }
		}
		else if(this.title === 'Edit Product') {
			//edit product

			let result2: boolean = this.productService.editProduct(productsData, this.pID);
			if(result2){

				this.router.navigate(['admin']);
				console.log('Product edited');
			    console.log(this.product);
			}

			else{
				alert('Error editing product');
			  console.log(this.product);

			}

		}


	  }

}


}
