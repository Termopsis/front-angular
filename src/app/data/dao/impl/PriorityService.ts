import {Inject, Injectable, InjectionToken} from '@angular/core';
import {PriorityDAO} from 'src/app/data/dao/interface/PriorityDAO';
import {Priority} from 'src/app/model/Priority';
import {HttpClient} from '@angular/common/http';
import {PrioritySearchValues} from 'src/app/data/dao/search/SearchObjects';
import {CommonService} from 'src/app/data/dao/impl/CommonService';

export const PRIORITY_URL_TOKEN = new InjectionToken<string>('url');

//Аннотация позволяет внедрять Dependency injection в любом другом классе
//Напоминает паттернт фасад, выдает тлоько то что нужно для UI
@Injectable({
  providedIn: 'root'
})
export class PriorityService extends CommonService<Priority> implements PriorityDAO {

  constructor(@Inject(PRIORITY_URL_TOKEN) private baseUrl,
    private http: HttpClient
  ) {
    super(baseUrl,http);
  }

  findPriorities(prioritySearchValues: PrioritySearchValues) {
    return this.http.post<Priority[]>(this.baseUrl + '/search', prioritySearchValues);
  }
}
