import {CommonDAO} from './CommonDAO';
import {Priority} from '../../../model/Priority';
import {PrioritySearchValues} from 'src/app/data/dao/search/SearchObjects';
import {Observable} from 'rxjs';

export interface PriorityDAO extends CommonDAO<Priority>{

  //Поиск данных по параметрам PrioritySearchValues в SearchObjects
  findPriorities(prioritySearchValues: PrioritySearchValues): Observable<any>;

}
