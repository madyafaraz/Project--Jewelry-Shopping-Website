import { Injectable } from '@angular/core';
import { Product } from './product';
import {PRODUCT} from './mock-products';
import { HttpClient } from '@angular/common/http';
import{ Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable({
  providedIn: 'root'
})
export class ProductService {


	private pItems = PRODUCT;
	items: Array<any> ;
	update: boolean = false;
	allImages: Product[] = [];
	products: Product[] = this.getProducts();
	private _url: string ='src/assets/data/products.json';
	maxId: number;

	//GET ALL PRODUCTS
	getProducts(): Product[] {
		//return PRODUCT.slice(0);
		return PRODUCT;
	  }



  constructor( private http : HttpClient) {

	let storageData = window.localStorage.getItem("cart");
	if (storageData != null) {
		this.items = JSON.parse(storageData);
	} else {
		   this.items = [];
	}

  }


  addProductToCart(data, indx) {
	//read data from local storage and load it to variable
	let Data = window.localStorage.getItem("cart");

	//Now check if data is empty or not
	if (Data == null)
	  {
	    //add first item to cart
        let newItem: any =  {"id": indx, "name": data.name, "quantity": 1, "price": data.price, "path":"null"};
		this.items.push(newItem);
	  }
      //if LS is not empty then check if item has to be updated or not
	  else if(Data !=null)
	  {
		  //store the LS data in a variable
		  this.items = JSON.parse(Data);

		  //check if to update any item
		  for (var i = 0; i<this.items.length; i++) {
			if(this.items[i].id == indx && this.items[i].name == data.name ) {
				this.items[i].quantity = this.items[i].quantity + 1;
				this.update = true;

			} else {
                //do nothing
			 }

		   }

		   //test if item was not updated then add new item to list
		   if(!this.update){
		   let nextItem: any =  {"id": indx, "name": data.name, "quantity": 1, "price": data.price, "path":"null"};
		   this.items.push(nextItem);
		   }

		}
		//finally update the local storage
		window.localStorage.setItem("cart", JSON.stringify(this.items));

	}

  saveItemToLocalStorage(Items) {
	let data: Array<any> = Items;
	window.localStorage.setItem("cart", JSON.stringify(data));
}


getProductsFromServer(): Observable<Product[]>{
	//return observable of type product
	return this.http.get<Product[]>(this._url);
}

getProductById(id): Product{

	let item: Product;
	let data: Product[] = this.getProducts();

	item = data.find(
		p => {return (p.id == id)});

  		return Object.assign({}, item);


}

uploadImage(formData: any) {
    //const endpoint = 'C:\Users\MADYA\TermProject_Faraz\ShoppingCart\src\assets\images\products';
	//const formData: FormData = new FormData();
	//old url = 'src/assets/data/fileUpload.php';
	let url: string = 'http://localhost/src/assets/data/fileUpload.php';


    return this.http
      .post(url, formData)
	  .catch(this._errorHandler);
}

private _errorHandler(error: Response){
	console.error(error);
	return Observable.throw(error || 'Some Error on server occured.');
	}



  addProduct(data, pid): boolean {
	if(data){
	  console.log('data from the form is ');
	  console.log(data);

			//console.log('data after creating array is ');
			//console.log(pData);
			this.products.push({
				id     : pid,
				name   : data.name,
				quantity : data.quantity,
				price: data.price,
				path  : 'assets/images/products/' + data.name + '.jpg'
				});
			console.log('data after pushed into products array');
			console.log(this.products);
			//return this.products;
			/// now upload image


			return true;

	} else {

		this.maxId = 0;
        return false;
	  }
	}




  editProduct(data, pid): boolean {
	  if(data){
		this.products = this.getProducts();
		if (pid) {
		// Update existing product
		let target: Product =
      this.products.find(f => {return (f.id == pid)});
      if (target) {
		Object.assign(target, data);
		console.log('product is edited');
		console.log(this.products);
      }
		return true;

	  }
	  else{
		  return false;
	  }


  }

}

deleteProduct(id: number): void {
    let products: Product[] = this.getProducts();
    let index: number = products.findIndex(
        p => {return (p.id == id)});
    if (index >= 0) {
      products.splice(index, 1);
    }
  }






}