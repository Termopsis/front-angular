import {CommonDAO} from './CommonDAO';
import {Task} from '../../../model/Task';
import {Observable} from 'rxjs';
import {TaskSearchValues} from 'src/app/data/dao/search/SearchObjects';

export interface TaskDAO extends CommonDAO<Task>{

  //Поиск данных по параметрам TaskSearchValues в SearchObjects
  findTasks(taskSearchValues: TaskSearchValues): Observable<any>;

}
