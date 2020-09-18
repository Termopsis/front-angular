import {Inject, Injectable, InjectionToken} from '@angular/core';
import {PriorityDAO} from 'src/app/data/dao/interface/PriorityDAO';
import {Priority} from 'src/app/model/Priority';
import {Observable, of} from 'rxjs';
import {PrioritySearchValues} from 'src/app/data/dao/search/SearchObjects';
import {HttpClient} from '@angular/common/http';
import {CommonService} from 'src/app/data/dao/impl/CommonService';
import {TestData} from 'src/app/data/testData';

export const PRIORITY_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class PriorityService implements PriorityDAO{

  add(T): Observable<Priority> {
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    return undefined;
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(T): Observable<Priority> {
    return undefined;
  }

  findAll(): Observable<Priority[]> {
    return undefined;
  }

  findById(id: number): Observable<Priority> {
    return undefined;
  }

  search(title: string): Observable<Priority[]> {
    return undefined;
  }

}
