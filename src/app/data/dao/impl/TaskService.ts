import {TaskDAO} from 'src/app/data/dao/interface/TaskDAO';
import {Task} from 'src/app/model/Task';
import {Observable} from 'rxjs';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TaskSearchValues} from 'src/app/data/dao/search/SearchObjects';
import {CommonService} from 'src/app/data/dao/impl/CommonService';

export const TASK_URL_TOKEN = new InjectionToken<string>('url');

//Аннотация позволяет внедрять Dependency injection в любом другом классе
//Напоминает паттернт фасад, выдает тлоько то что нужно для UI
@Injectable({
  providedIn: 'root'
})
export class TaskService extends CommonService<Task> implements TaskDAO {

  constructor(@Inject(TASK_URL_TOKEN) private baseUrl,
              private http: HttpClient) {
    super(baseUrl, http);
  }

  findTasks(taskSearchValues: TaskSearchValues): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/search', taskSearchValues);
  }

}

