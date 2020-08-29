import {Inject, Injectable, InjectionToken} from '@angular/core';
import {PriorityDAO} from 'src/app/data/dao/interface/PriorityDAO';
import {Priority} from 'src/app/model/Priority';
import {Observable} from 'rxjs';
import {PrioritySearchValues} from 'src/app/data/dao/search/SearchObjects';
import {HttpClient} from '@angular/common/http';
import {CommonServiceService} from 'src/app/data/dao/impl/common-service.service';

export const PRIORITY_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class PriorityServiceService extends CommonServiceService<Priority> implements PriorityDAO{

  constructor(@Inject(PRIORITY_URL_TOKEN)  private baseUrl,
              private http: HttpClient) {
    super(baseUrl, http);
  }

  findPriorities(prioritySearchValues: PrioritySearchValues): Observable<any> {
    return this.http.post<Priority[]>(this.baseUrl + '/search', prioritySearchValues);
  }
}
