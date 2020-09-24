import {CommonDAO} from './CommonDAO';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';
import {CategorySearchValues} from 'src/app/data/dao/search/SearchObjects';

export interface CategoryDAO extends CommonDAO<Category>{

  //Поиск данных по параметрам CategorySearchValues в SearchObjects
  findCategories(categorySearchValues: CategorySearchValues): Observable<any>;

}
