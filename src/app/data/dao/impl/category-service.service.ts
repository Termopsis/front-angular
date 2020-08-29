import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CategoryDAO} from 'src/app/data/dao/interface/CategoryDAO';
import {HttpClient} from '@angular/common/http';
import {Category} from 'src/app/model/Category';
import {Observable} from 'rxjs';
import {CategorySearchValues} from 'src/app/data/dao/search/SearchObjects';
import {CommonServiceService} from 'src/app/data/dao/impl/common-service.service';

export const CATEGORY_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService extends CommonServiceService<Category> implements CategoryDAO{

  constructor(@Inject(CATEGORY_URL_TOKEN)  private baseUrl,
              private http: HttpClient) {
    super(baseUrl, http);
  }

  findCategories(categorySearchValues: CategorySearchValues): Observable<any> {
    return this.http.post<Category[]>(this.baseUrl + '/search', categorySearchValues);
  }
}
