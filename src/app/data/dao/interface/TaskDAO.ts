import {CommonDAO} from './CommonDAO';
import {Task} from '../../../model/Task';
import {TaskSearchValues} from '../search/SearchObjects';
import {Observable} from 'rxjs';
import {Priority} from 'src/app/model/Priority';
import {Category} from 'src/app/model/Category';

export interface TaskDAO extends CommonDAO<Task>{

  //findTasks(taskSearchValues: TaskSearchValues): Observable<any>;

  search(category: Category, searchString: string, status: boolean, priority: Priority): Observable<Task[]>

  getCompletedCountInCategory(category: Category): Observable<number>;

  getUncompletedCountInCategory(category: Category): Observable<number>;

  getTotalCountIntCategory(category: Category): Observable<number>;

  getTotalCount(): Observable<number>;

}
