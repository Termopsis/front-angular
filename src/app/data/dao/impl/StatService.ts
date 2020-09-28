import {Inject, Injectable, InjectionToken} from '@angular/core';
import {StatDAO} from 'src/app/data/dao/interface/StatDAO';
import {Observable} from 'rxjs';
import {Stat} from 'src/app/model/Stat';
import {HttpClient} from '@angular/common/http';

export const STAT_URL_TOKEN = new InjectionToken<string>('url');

//Аннотация позволяет внедрять Dependency injection в любом другом классе
//Напоминает паттернт фасад, выдает тлоько то что нужно для UI
@Injectable({
  providedIn: 'root'
})

// класс не реализовывает и не наследует, т.к. у него только 1 методм
export class StatService implements StatDAO {

  constructor(@Inject(STAT_URL_TOKEN) private baseUrl,
              private http: HttpClient
  ) {
  }

  // общая статистика
  getOverAllStat(): Observable<Stat> {
    return this.http.get<Stat>(this.baseUrl);
  }
}
