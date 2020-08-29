import {Inject, inject, Injectable, InjectionToken} from '@angular/core';
import {StatDAO} from 'src/app/data/dao/interface/StatDAO';
import {Observable} from 'rxjs';
import {Stat} from 'src/app/model/Stat';
import {HttpClient} from '@angular/common/http';

export const STAT_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class StatServiceService implements StatDAO {

  constructor(@Inject(STAT_URL_TOKEN) private baseUrl,
              private http: HttpClient
  ) {
  }

  getOverAllStat(): Observable<Stat> {
    return this.http.get<Stat>(this.baseUrl);
  }
}
