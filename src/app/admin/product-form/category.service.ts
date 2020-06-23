import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class CategoryService {

  categories: AngularFireList<any>;
  categories$: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.categories = db.list('/categories', query => {
      return query.orderByChild('name');
    });

    this.categories$ = this.categories.snapshotChanges()
      .pipe(map(value => value.map(category => ({key: category.payload.key, ...category.payload.val()}))));
  }

  getCategories() {
    return this.categories$;
  }
}
