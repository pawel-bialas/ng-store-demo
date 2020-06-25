import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: AngularFireList<any>;
  products$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { }

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  getAllProducts() {
    this.products = this.db.list('/products');
    return this.products$ = this.products.snapshotChanges()
      .pipe(map(value => value.map(product => ({key: product.payload.key, ...product.payload.val()}))));
  }

  findById(productId) {
    return this.db.object('/products/' + productId);
  }

  delete(productId) {
    return this.db.object('products/' + productId).remove();
  }
}
