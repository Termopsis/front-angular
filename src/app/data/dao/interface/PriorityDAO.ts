import {CommonDAO} from './CommonDAO';
import {Priority} from '../../../model/Priority';
import {CategorySearchValues, PrioritySearchValues} from '../search/SearchObjects';
import {Observable} from 'rxjs';
import {Category} from 'src/app/model/Category';

export interface PriorityDAO extends CommonDAO<Priority>{

  //findPriorities(prioritySearchValues: PrioritySearchValues): Observable<any>;

  search(title: string): Observable<Priority[]>

}
