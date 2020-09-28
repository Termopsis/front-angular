import {CategoryDAO} from 'src/app/data/dao/interface/CategoryDAO';
import {Category} from 'src/app/model/Category';
import {Observable} from 'rxjs';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CategorySearchValues} from 'src/app/data/dao/search/SearchObjects';
import {HttpClient} from '@angular/common/http';
import {CommonService} from 'src/app/data/dao/impl/CommonService';

export const CATEGORY_URL_TOKEN = new InjectionToken<string>('url');

//Аннотация позволяет внедрять Dependency injection в любом другом классе
//Напоминает паттернт фасад, выдает тлоько то что нужно для UI
@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CommonService<Category> implements CategoryDAO{

  constructor(@Inject(CATEGORY_URL_TOKEN) private baseUrl,
              private http: HttpClient) {
    super(baseUrl,http);
  }

  findCategories(categorySearchValues: CategorySearchValues): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/search', categorySearchValues);
  }

}
