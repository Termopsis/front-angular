import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CategoryDAO} from 'src/app/data/dao/interface/CategoryDAO';
import {HttpClient} from '@angular/common/http';
import {Category} from 'src/app/model/Category';
import {Observable, of} from 'rxjs';
import {CategorySearchValues} from 'src/app/data/dao/search/SearchObjects';
import {CommonService} from 'src/app/data/dao/impl/CommonService';
import {TestData} from 'src/app/data/testData';

// export const CATEGORY_URL_TOKEN = new InjectionToken<string>('url');
//
// @Injectable({
//   providedIn: 'root'
// })
export class CategoryService implements CategoryDAO{

  findAll(): Observable<Category[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Observable<Category> {
        throw new Error("Method not implemented.");
    }

  get(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }


  add(category: Category): Observable<Category> {
    return undefined;
  }

  delete(id: number): Observable<Category> {
    return undefined;
  }

  update(category: Category): Observable<Category> {
    return undefined;
  }


  search(title: string): Observable<Category[]> {
    return undefined;
  }

}
