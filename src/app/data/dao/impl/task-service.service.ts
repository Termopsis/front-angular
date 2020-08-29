import {Inject, Injectable, InjectionToken} from '@angular/core';
import {TaskDAO} from 'src/app/data/dao/interface/TaskDAO';
import {Task} from 'src/app/model/Task';
import {Observable} from 'rxjs';
import {TaskSearchValues} from 'src/app/data/dao/search/SearchObjects';
import {HttpClient} from '@angular/common/http';
import {Priority} from 'src/app/model/Priority';
import {CommonServiceService} from 'src/app/data/dao/impl/common-service.service';
import {CategoryDAO} from 'src/app/data/dao/interface/CategoryDAO';

export const TASK_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService extends CommonServiceService<Task> implements TaskDAO{

  constructor(@Inject(TASK_URL_TOKEN)  private baseUrl,
              private http: HttpClient) {
    super(baseUrl, http);
  }

  findTasks(taskSearchValues: TaskSearchValues): Observable<any> {
    return this.http.post<Task[]>(this.baseUrl + '/search', taskSearchValues);
  }
}
